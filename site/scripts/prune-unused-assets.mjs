import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Remove source images that Vite copied into dist/_astro but nothing references.
 *
 * `src/lib/responsive-images.ts` imports every file under images/ so the build
 * can generate WebP derivatives. Vite emits each imported original into
 * dist/_astro as a side effect, even though every <img> points at a derivative
 * and the originals are already served from /images/ for the lightbox. Left in
 * place they would double the deployed image weight.
 *
 * Only files that no HTML/CSS/JS in dist mentions are deleted, so anything that
 * does end up referenced (a future <Image format="jpg">, for example) survives.
 */

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(siteRoot, 'dist');
const assetsDir = path.join(dist, '_astro');

const CANDIDATE_EXT = new Set(['.jpg', '.jpeg', '.png']);
const TEXT_EXT = new Set(['.html', '.css', '.js', '.mjs', '.xml', '.json', '.txt']);

if (!fs.existsSync(assetsDir)) {
  console.warn(`[prune-unused-assets] Assets dir not found: ${assetsDir}`);
  process.exit(0);
}

const candidates = fs
  .readdirSync(assetsDir)
  .filter((name) => CANDIDATE_EXT.has(path.extname(name).toLowerCase()));

if (candidates.length === 0) {
  console.log('[prune-unused-assets] Nothing to prune.');
  process.exit(0);
}

/** Collect every text file in dist (skipping the assets folder's own images). */
function* walkText(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isSymbolicLink()) continue;
    if (entry.isDirectory()) {
      if (full === path.join(dist, 'images')) continue;
      yield* walkText(full);
    } else if (TEXT_EXT.has(path.extname(entry.name).toLowerCase())) {
      yield full;
    }
  }
}

const referenced = new Set();
const pending = new Set(candidates);

for (const file of walkText(dist)) {
  if (pending.size === 0) break;
  const text = fs.readFileSync(file, 'utf8');
  for (const name of pending) {
    if (text.includes(name)) {
      referenced.add(name);
      pending.delete(name);
    }
  }
}

let bytes = 0;
for (const name of pending) {
  const full = path.join(assetsDir, name);
  bytes += fs.statSync(full).size;
  fs.unlinkSync(full);
}

console.log(
  `[prune-unused-assets] Removed ${pending.size} unreferenced source image(s) ` +
    `(${(bytes / 1024 / 1024).toFixed(1)} MB) from dist/_astro; kept ${referenced.size} referenced.`,
);
