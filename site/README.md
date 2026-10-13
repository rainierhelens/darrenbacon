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

## Images

Gallery images live in the repo root `images/` folder and are linked into `site/public/images` via a directory junction. If the junction is missing on a new machine:

```powershell
New-Item -ItemType Junction -Path "site/public/images" -Target "../images"
```

### Responsive derivatives

Render images with `<ResponsiveImage src="/images/..." alt="..." preset="grid" />` (`src/components/ResponsiveImage.astro`) instead of a raw `<img>`. The build resolves the public URL through `src/lib/responsive-images.ts`, which indexes every JPG/PNG/WebP under `images/`, and emits a WebP `srcset` with intrinsic `width`/`height` into `dist/_astro/`. Presets (`full`, `grid`, `gridContained`, `wide`, `tile2`, `tile3`) set sensible `widths` and `sizes`; override either prop when a layout differs. GIFs and anything not in the index fall back to a plain `<img>`. Keep passing the original `/images/...` path to lightbox `data-src` so full-resolution viewing still works.

Generated derivatives are cached in `node_modules/.astro`, so only new or changed images are re-encoded on later builds. `scripts/prune-unused-assets.mjs` runs after the build to delete the source copies Vite places in `dist/_astro/`, since those are already served from `/images/`.

## Deploy (GitHub Pages)

The workflow in `.github/workflows/deploy-site.yml` builds the Astro site and publishes `site/dist` to GitHub Pages. Custom domain is set via `site/public/CNAME`.
