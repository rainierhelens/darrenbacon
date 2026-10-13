import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Keep src/data/gallery-captions.json in step with src/data/galleries.json.
 *
 * Adds an empty { title, alt } entry for every gallery image that doesn't have
 * one yet and drops entries for images no longer in any gallery. Existing text
 * is never overwritten. Run after adding or removing gallery images:
 *
 *   npm run sync-captions
 */

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const galleriesPath = path.join(siteRoot, 'src', 'data', 'galleries.json');
const captionsPath = path.join(siteRoot, 'src', 'data', 'gallery-captions.json');

const galleries = JSON.parse(fs.readFileSync(galleriesPath, 'utf8'));
const existing = fs.existsSync(captionsPath) ? JSON.parse(fs.readFileSync(captionsPath, 'utf8')) : {};

const next = {};
let added = 0;
for (const images of Object.values(galleries)) {
  for (const src of images) {
    if (next[src]) continue;
    if (existing[src]) {
      next[src] = existing[src];
    } else {
      next[src] = { title: '', alt: '' };
      added += 1;
    }
  }
}

const removed = Object.keys(existing).filter((src) => !next[src]).length;
fs.writeFileSync(captionsPath, `${JSON.stringify(next, null, 2)}\n`);

const filled = Object.values(next).filter((entry) => entry.title || entry.alt).length;
console.log(
  `[sync-captions] ${Object.keys(next).length} image(s): ${filled} captioned, ` +
    `${added} added, ${removed} removed.`,
);
