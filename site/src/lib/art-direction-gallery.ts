import fs from 'node:fs';
import path from 'node:path';

import { haloArtDirection } from '../data/art-direction/halo';
import { discoverMediaSections } from './marathon-media';

const IMAGES_ROOT = path.resolve(process.cwd(), '../images');
const STATIC_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const ROTATION_LIMIT = 12;
const EXCLUDED_DIRS = new Set(['screenshots', 'all_screenshots']);

function sampleImages(images: string[]): string[] {
  const unique = [...new Set(images)];
  if (unique.length <= ROTATION_LIMIT) return unique;

  const step = unique.length / ROTATION_LIMIT;
  return Array.from({ length: ROTATION_LIMIT }, (_, index) => unique[Math.floor(index * step)]!);
}

function toPublicUrl(absPath: string): string {
  const relative = path.relative(IMAGES_ROOT, absPath).split(path.sep).join('/');
  return `/images/${relative.split('/').map((part) => encodeURIComponent(part)).join('/')}`;
}

function collectFolderImages(rootFolder: string, maxDepth = 4): string[] {
  const absRoot = path.join(IMAGES_ROOT, ...rootFolder.split('/'));
  const images: string[] = [];

  function walk(absDir: string, depth: number): void {
    if (!fs.existsSync(absDir) || depth > maxDepth) return;

    for (const name of fs.readdirSync(absDir).sort()) {
      if (EXCLUDED_DIRS.has(name)) continue;

      const absPath = path.join(absDir, name);
      const stat = fs.statSync(absPath);

      if (stat.isDirectory()) {
        walk(absPath, depth + 1);
        continue;
      }

      if (STATIC_EXT.has(path.extname(name).toLowerCase())) {
        images.push(toPublicUrl(absPath));
      }
    }
  }

  walk(absRoot, 0);
  return images;
}

export function getHaloArtDirectionImages(): string[] {
  const fromFolder = collectFolderImages('ad-halo', 0);
  const fromData = haloArtDirection.allImages;
  return sampleImages([...fromData, ...fromFolder]);
}

export function getDeadropArtDirectionImages(): string[] {
  return sampleImages(collectFolderImages('deadrop-ad', 4));
}

export function getMarathonArtDirectionImages(): string[] {
  const sections = [
    ...discoverMediaSections('S1/paid/runners', { maxDepth: 3 }),
    ...discoverMediaSections('S2/Paid/Runners', { maxDepth: 3 }),
    ...discoverMediaSections('S2/Earned/Runners', { maxDepth: 2 }),
  ];

  const images = sections.flatMap((section) =>
    section.media.filter((item) => item.type === 'image').map((item) => item.src),
  );

  return sampleImages(images);
}
