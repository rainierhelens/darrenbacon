// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

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
  integrations: [sitemap({ filter: isIndexablePage })],
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
