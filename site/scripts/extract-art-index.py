"""Extract Infinite Art Index PDF into web spreads, assets, and JSON.

Reads the gitignored source PDF and writes publishable assets:
  images/art-index/spreads/{n}.webp
  images/art-index/assets/{page}-{i}.webp
  site/src/data/art-index/spreads.json
  site/src/data/art-index/fonts.json
"""

from __future__ import annotations

import json
import sys
from collections import Counter
from pathlib import Path

import fitz
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
PDF_PATH = ROOT / "images" / "halo-styleguide" / "Infinite_Art_Index_v0.6b.pdf"
OUT_IMAGES = ROOT / "images" / "art-index"
SPREAD_DIR = OUT_IMAGES / "spreads"
ASSET_DIR = OUT_IMAGES / "assets"
DATA_DIR = ROOT / "site" / "src" / "data" / "art-index"

LONG_EDGE = 2560
WEBP_QUALITY = 82
MIN_EMBED_PX = 80


def pct_box(bbox: tuple[float, float, float, float], width: float, height: float) -> dict[str, float]:
    x0, y0, x1, y1 = bbox
    return {
        "x": round(100 * x0 / width, 3),
        "y": round(100 * y0 / height, 3),
        "w": round(100 * (x1 - x0) / width, 3),
        "h": round(100 * (y1 - y0) / height, 3),
    }


def rgb_from_span(color: int) -> str:
    r = (color >> 16) & 255
    g = (color >> 8) & 255
    b = color & 255
    return f"#{r:02x}{g:02x}{b:02x}"


def extract_text_regions(page: fitz.Page, width: float, height: float) -> list[dict]:
    regions: list[dict] = []
    data = page.get_text("dict")
    for block in data.get("blocks", []):
        if block.get("type") != 0:
            continue
        for line in block.get("lines", []):
            spans = line.get("spans", [])
            if not spans:
                continue
            text = "".join(span.get("text", "") for span in spans).strip()
            if not text:
                continue
            bbox = line.get("bbox") or spans[0]["bbox"]
            primary = max(spans, key=lambda span: span.get("size", 0))
            regions.append(
                {
                    "type": "text",
                    **pct_box(bbox, width, height),
                    "text": text,
                    "font": primary.get("font", ""),
                    "size": round(primary.get("size", 0), 2),
                    "color": rgb_from_span(int(primary.get("color", 0))),
                    "flags": int(primary.get("flags", 0)),
                }
            )
    return regions


def save_pixmap_webp(pix: fitz.Pixmap, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    png_bytes = pix.tobytes("png")
    from io import BytesIO

    image = Image.open(BytesIO(png_bytes)).convert("RGB")
    image.save(dest, "WEBP", quality=WEBP_QUALITY, method=6)


def extract_embedded_images(doc: fitz.Document, page: fitz.Page, page_index: int) -> list[dict]:
    assets: list[dict] = []
    seen: set[int] = set()
    width, height = page.rect.width, page.rect.height

    for img_index, img in enumerate(page.get_images(full=True), start=1):
        xref = img[0]
        if xref in seen:
            continue
        seen.add(xref)
        try:
            pix = fitz.Pixmap(doc, xref)
        except Exception:
            continue
        if pix.n >= 5:
            pix = fitz.Pixmap(fitz.csRGB, pix)
        if pix.width < MIN_EMBED_PX or pix.height < MIN_EMBED_PX:
            continue
        name = f"{page_index:02d}-{img_index:02d}.webp"
        dest = ASSET_DIR / name
        save_pixmap_webp(pix, dest)

        rects = page.get_image_rects(xref)
        box = pct_box(rects[0], width, height) if rects else {"x": 0, "y": 0, "w": 0, "h": 0}
        assets.append(
            {
                "type": "image",
                "src": f"/images/art-index/assets/{name}",
                **box,
                "pixelWidth": pix.width,
                "pixelHeight": pix.height,
            }
        )
    return assets


def main() -> int:
    if not PDF_PATH.exists():
        print(f"PDF not found: {PDF_PATH}", file=sys.stderr)
        return 1

    SPREAD_DIR.mkdir(parents=True, exist_ok=True)
    ASSET_DIR.mkdir(parents=True, exist_ok=True)
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    doc = fitz.open(PDF_PATH)
    fonts: Counter[str] = Counter()
    spreads: list[dict] = []

    for index, page in enumerate(doc, start=1):
        width, height = page.rect.width, page.rect.height
        scale = LONG_EDGE / max(width, height)
        matrix = fitz.Matrix(scale, scale)
        pix = page.get_pixmap(matrix=matrix, alpha=False)
        spread_name = f"{index:02d}.webp"
        save_pixmap_webp(pix, SPREAD_DIR / spread_name)

        regions = extract_text_regions(page, width, height)
        for region in regions:
            if region.get("font"):
                fonts[region["font"]] += 1

        images = extract_embedded_images(doc, page, index)
        preview = next((text["text"] for text in regions if len(text["text"]) > 12), "")

        spreads.append(
            {
                "index": index,
                "id": f"spread-{index:02d}",
                "width": round(width, 2),
                "height": round(height, 2),
                "aspect": round(width / height, 5),
                "src": f"/images/art-index/spreads/{spread_name}",
                "preview": preview[:160],
                "regions": regions,
                "images": images,
            }
        )
        print(f"spread {index:02d}/{len(doc)}  {pix.width}x{pix.height}  text={len(regions)}  images={len(images)}")

    payload = {
        "source": "Infinite_Art_Index_v0.6b.pdf",
        "title": "Infinite Art Index",
        "version": "0.6b",
        "pageCount": len(spreads),
        "spreads": spreads,
    }
    (DATA_DIR / "spreads.json").write_text(json.dumps(payload, indent=2), encoding="utf-8")
    (DATA_DIR / "fonts.json").write_text(
        json.dumps({"fonts": fonts.most_common()}, indent=2),
        encoding="utf-8",
    )
    print(f"wrote {len(spreads)} spreads -> {DATA_DIR / 'spreads.json'}")
    print("fonts:", ", ".join(f"{name} ({count})" for name, count in fonts.most_common(12)))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
