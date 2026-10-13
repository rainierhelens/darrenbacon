// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.darrenbacon.com',
  // Canonical URLs use a trailing slash. GitHub Pages already 301s /page → /page/
  // for directory output. Do not add Astro `redirects` for those aliases — they
  // overwrite path/index.html with a self-redirect. Slashless .html aliases are
  // written after the build (see scripts/write-slash-redirects.mjs).
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
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
