import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(siteRoot, 'dist');
const site = 'https://www.darrenbacon.com';

/** Slashless aliases that should land on the matching /path/ page. */
const pages = [
  'about',
  'contact',
  'brief',
  'art-direction',
  'art-direction/halo',
  'art-direction/deadrop',
  'art-direction/marathon',
  'concept',
  'concept/halo',
  'concept/destiny',
  'concept/disney',
  'concept/deadrop',
  'concept/other',
];

if (!fs.existsSync(dist)) {
  console.warn(`[write-slash-redirects] Dist not found: ${dist}`);
  process.exit(0);
}

for (const page of pages) {
  const target = `/${page}/`;
  const file = path.join(dist, `${page}.html`);
  const index = path.join(dist, page, 'index.html');
  if (!fs.existsSync(index)) {
    console.warn(`[write-slash-redirects] Skip ${page} — missing ${index}`);
    continue;
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(
    file,
    `<!doctype html><title>Redirecting to ${target}</title>` +
      `<meta http-equiv="refresh" content="0;url=${target}">` +
      `<link rel="canonical" href="${site}${target}">` +
      `<a href="${target}">Continue to ${target}</a>\n`,
  );
}
