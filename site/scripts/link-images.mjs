import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imagesSource = path.resolve(siteRoot, '../images');
const imagesLink = path.join(siteRoot, 'public', 'images');

if (!fs.existsSync(imagesSource)) {
  console.warn(`[link-images] Source not found: ${imagesSource}`);
  process.exit(0);
}

if (fs.existsSync(imagesLink)) {
  process.exit(0);
}

fs.mkdirSync(path.dirname(imagesLink), { recursive: true });
fs.symlinkSync(imagesSource, imagesLink, 'junction');

console.log(`[link-images] Linked ${imagesLink} -> ${imagesSource}`);
