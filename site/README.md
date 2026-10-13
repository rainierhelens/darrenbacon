# Darren Bacon: Astro Portfolio

Dark, modern portfolio site built with [Astro](https://astro.build) and Tailwind CSS v4.

## Development

```bash
cd site
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build

```bash
npm run build
npm run preview
```

Static output is written to `site/dist/`.

Before pushing, `npm run check` type-checks the project and `npm run check-links` (after a build) verifies every internal `href`, `src`, `srcset` and `poster` in `dist/` points at a real file. Both run on pull requests via `.github/workflows/pr-checks.yml`; the deploy workflow also runs the link check.

## Images

Gallery images live in the repo root `images/` folder and are linked into `site/public/images` via a directory junction. If the junction is missing on a new machine:

```powershell
New-Item -ItemType Junction -Path "site/public/images" -Target "../images"
```

### Responsive derivatives

Render images with `<ResponsiveImage src="/images/..." alt="..." preset="grid" />` (`src/components/ResponsiveImage.astro`) instead of a raw `<img>`. The build resolves the public URL through `src/lib/responsive-images.ts`, which indexes every JPG/PNG/WebP under `images/`, and emits a WebP `srcset` with intrinsic `width`/`height` into `dist/_astro/`. Presets (`full`, `grid`, `gridContained`, `wide`, `tile2`, `tile3`) set sensible `widths` and `sizes`; override either prop when a layout differs. GIFs and anything not in the index fall back to a plain `<img>`. Keep passing the original `/images/...` path to lightbox `data-src` so full-resolution viewing still works.

Generated derivatives are cached in `node_modules/.astro`, so only new or changed images are re-encoded on later builds. `scripts/prune-unused-assets.mjs` runs after the build to delete the source copies Vite places in `dist/_astro/`, since those are already served from `/images/`.

### Video and GIF derivatives

After adding or replacing a GIF or MP4 under `images/`, run `npm run encode-media` (needs `ffmpeg` and `ffprobe` on `PATH`, or set `FFMPEG` / `FFPROBE` to their locations). It writes to `images/_derived/`, mirroring the source path:

- every GIF (except the tiny header icons) gets an H.264 MP4 plus a poster frame;
- every MP4 gets a poster frame;
- `manifest.json` records paths and dimensions.

Commit the output; CI does not run ffmpeg. `ResponsiveImage` serves a GIF as a muted looping `<video>` when its MP4 exists, gallery items open the MP4 in the lightbox, and `posterFor()` from `src/lib/derived-media.ts` supplies `poster` attributes. Pass `--reencode` (optionally `--min-mb N`, default 8) to also re-encode large MP4s in place at CRF 23 / max 1080p; a file is only replaced when the result is at least 15% smaller.

### Gallery captions and alt text

Concept gallery images (listed in `src/data/galleries.json`) get their text from `src/data/gallery-captions.json`, keyed by image path. `title` becomes the lightbox caption and the screen-reader label; `alt` describes the image (falls back to `title`). Blank entries fall back to numbered labels. After adding or removing gallery images, run `npm run sync-captions` to add empty entries for new images and drop removed ones without touching existing text.

## Deploy (GitHub Pages)

The workflow in `.github/workflows/deploy-site.yml` builds the Astro site and publishes `site/dist` to GitHub Pages. Custom domain is set via `site/public/CNAME`.
