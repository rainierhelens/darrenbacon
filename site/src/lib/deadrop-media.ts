import fs from 'node:fs';
import path from 'node:path';

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);
const VIDEO_EXT = new Set(['.mp4', '.webm', '.mov', '.m4v', '.mkv']);

export type DeadropMedia = {
  src: string;
  caption?: string;
  type: 'image' | 'video';
};

const DEADROP_AD_ROOT = path.resolve(process.cwd(), '../images/deadrop-ad');

export const SNAPSHOT_FOLDERS: Record<string, string> = {
  'snapshot-i': 'SSI',
  'snapshot-ii': 'SSII',
  'snapshot-iii': 'SSIII',
  'snapshot-iv': 'SSIV',
  'snapshot-v': 'SSV',
  'snapshot-vi': 'SSVI',
  'snapshot-vii': 'SSVII',
};

function folderPath(folder: string): string {
  return path.join(DEADROP_AD_ROOT, ...folder.split('/'));
}

function mediaUrl(folder: string, filename: string): string {
  const parts = [...folder.split('/'), filename].map((part) => encodeURIComponent(part));
  return `/images/deadrop-ad/${parts.join('/')}`;
}

function captionFromFilename(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function mediaType(filename: string): DeadropMedia['type'] | null {
  const ext = path.extname(filename).toLowerCase();
  if (IMAGE_EXT.has(ext)) return 'image';
  if (VIDEO_EXT.has(ext)) return 'video';
  return null;
}

function sortMedia(a: string, b: string): number {
  const aType = mediaType(a);
  const bType = mediaType(b);
  if (aType !== bType) {
    if (aType === 'image') return -1;
    if (bType === 'image') return 1;
  }
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

export function loadFolderMedia(
  folder: string,
  filter?: (filename: string) => boolean,
): DeadropMedia[] {
  const dir = folderPath(folder);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((name) => {
      const fullPath = path.join(dir, name);
      if (!fs.statSync(fullPath).isFile() || mediaType(name) === null) return false;
      if (filter && !filter(name)) return false;
      return true;
    })
    .sort(sortMedia)
    .map((filename) => ({
      src: mediaUrl(folder, filename),
      caption: captionFromFilename(filename),
      type: mediaType(filename)!,
    }));
}

export function firstImageFromFolder(folder: string): string | undefined {
  return loadFolderMedia(folder).find((item) => item.type === 'image')?.src;
}
