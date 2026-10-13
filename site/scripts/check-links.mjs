import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Verify that every internal URL in the built site resolves to a file in dist/.
 *
 * Scans href, src, srcset, poster, and data-src attributes in every HTML page.
 * External URLs, mailto:, tel:, and in-page anchors are ignored. Exits non-zero
 * and lists each broken reference with the page it appears on.
 */

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(siteRoot, 'dist');

if (!fs.existsSync(dist)) {
  console.error(`[check-links] dist not found: ${dist}. Run the build first.`);
  process.exit(1);
}

function* htmlFiles(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (full === path.join(dist, 'images') || full === path.join(dist, '_astro')) continue;
      yield* htmlFiles(full);
    } else if (entry.name.endsWith('.html')) {
      yield full;
    }
  }
}

const ATTR = /\s(href|src|srcset|poster|data-src)="([^"]*)"/g;

function urlsFrom(attr, value) {
  if (attr === 'srcset') {
    return value
      .split(',')
      .map((part) => part.trim().split(/\s+/)[0])
      .filter(Boolean);
  }
  return [value];
}

function isInternal(url) {
  if (!url || url.startsWith('#')) return false;
  if (/^[a-z][a-z0-9+.-]*:/i.test(url) || url.startsWith('//')) return false;
  return true;
}

const existsCache = new Map();
function resolves(pathname) {
  if (existsCache.has(pathname)) return existsCache.get(pathname);
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    existsCache.set(pathname, false);
    return false;
  }
  const target = path.join(dist, ...decoded.split('/').filter(Boolean));
  let ok = false;
  if (fs.existsSync(target)) {
    ok = fs.statSync(target).isFile() || fs.existsSync(path.join(target, 'index.html'));
  } else if (!path.extname(target)) {
    ok = fs.existsSync(`${target}.html`);
  }
  existsCache.set(pathname, ok);
  return ok;
}

const broken = [];
let checked = 0;

for (const file of htmlFiles(dist)) {
  const page = `/${path.relative(dist, file).split(path.sep).join('/')}`;
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(ATTR)) {
    const [, attr, value] = match;
    for (const raw of urlsFrom(attr, value.replace(/&amp;/g, '&'))) {
      if (!isInternal(raw)) continue;
      const url = new URL(raw, `https://site.invalid${page}`);
      checked += 1;
      if (!resolves(url.pathname)) broken.push({ page, attr, url: url.pathname });
    }
  }
}

if (broken.length > 0) {
  console.error(`[check-links] ${broken.length} broken reference(s) out of ${checked}:`);
  for (const { page, attr, url } of broken) console.error(`  ${page}  ${attr}=${url}`);
  process.exit(1);
}

console.log(`[check-links] ${checked} internal reference(s) OK.`);
