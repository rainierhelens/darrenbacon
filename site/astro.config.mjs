// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { artIndexPublic } from './src/config/features.ts';

const SITE = 'https://www.darrenbacon.com';
const distDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');

/**
 * Keep redirect stubs (e.g. the Marathon case study while unpublished) and the
 * 404 page out of the sitemap. Runs after pages are written, so it inspects
 * the built HTML instead of duplicating feature flags here.
 */
/** @param {string} page */
function isIndexablePage(page) {
  const { pathname } = new URL(page);
  if (pathname.startsWith('/404')) return false;
  const file = path.join(distDir, ...pathname.split('/').filter(Boolean), 'index.html');
  if (!fs.existsSync(file)) return true;
  const head = fs.readFileSync(file, 'utf8').slice(0, 2000);
  return !/http-equiv="refresh"/i.test(head);
}

/**
 * `public/images` is a link to the whole repo-root `images/` folder, so every
 * image is copied into the build. Remove the private Art Index assets.
 * @returns {import('astro').AstroIntegration}
 */
function stripPrivateImages() {
  return {
    name: 'strip-private-images',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        if (artIndexPublic) return;
        const outDir = fs.realpathSync(fileURLToPath(dir));
        const target = path.join(outDir, 'images', 'art-index');
        if (!fs.existsSync(target)) return;
        if (!fs.realpathSync(target).startsWith(outDir + path.sep)) {
          throw new Error(`Refusing to delete ${target}: it links outside the build output.`);
        }
        fs.rmSync(target, { recursive: true, force: true });
        logger.info('Removed images/art-index (Art Index is private).');
      },
    },
  };
}

export default defineConfig({
  site: SITE,
  // Canonical URLs use a trailing slash. GitHub Pages already 301s /page → /page/
  // for directory output. Do not add Astro `redirects` for those aliases — they
  // overwrite path/index.html with a self-redirect. Slashless .html aliases are
  // written after the build (see scripts/write-slash-redirects.mjs).
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [sitemap({ filter: isIndexablePage }), stripPrivateImages()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      fs: {
        allow: ['..'],
      },
      watch: {
        ignored: ['!**/images/**'],
      },
    },
  },
});
