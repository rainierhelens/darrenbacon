// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

/** Slashless aliases → canonical trailing-slash URLs (GitHub Pages + directory output). */
const trailingSlashRedirects = Object.fromEntries(
  [
    '/about',
    '/contact',
    '/brief',
    '/art-direction',
    '/art-direction/halo',
    '/art-direction/deadrop',
    '/art-direction/marathon',
    '/concept',
    '/concept/halo',
    '/concept/destiny',
    '/concept/disney',
    '/concept/deadrop',
    '/concept/other',
  ].map((path) => [path, `${path}/`]),
);

export default defineConfig({
  site: 'https://www.darrenbacon.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  redirects: trailingSlashRedirects,
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
