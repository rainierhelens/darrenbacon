# Darren Bacon — Astro Portfolio

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

## Deploy (GitHub Pages)

The workflow in `.github/workflows/deploy-site.yml` builds the Astro site and publishes `site/dist` to GitHub Pages. Point your custom domain (`CNAME`) at GitHub Pages when ready to switch from the legacy static HTML.

## Legacy site

The original HTML/CSS site remains in the repo root (`index.html`, etc.) until you cut over to the Astro build.
