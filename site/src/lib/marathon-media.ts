import fs from 'node:fs';
import path from 'node:path';

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);
const VIDEO_EXT = new Set(['.mp4', '.webm', '.mov', '.m4v', '.mkv']);
const KEY_ART_PATTERN = /key[\s._-]*art|keyart/i;

export type MarathonMedia = {
  src: string;
  caption?: string;
  type: 'image' | 'video';
  hero?: boolean;
};

const MARATHON_ROOT = path.resolve(process.cwd(), '../images/Marathon');

function folderPath(folder: string): string {
  return path.join(MARATHON_ROOT, ...folder.split('/'));
}

function mediaUrl(folder: string, filename: string): string {
  const parts = [...folder.split('/'), filename].map((part) => encodeURIComponent(part));
  return `/images/Marathon/${parts.join('/')}`;
}

function captionFromFilename(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function mediaType(filename: string): MarathonMedia['type'] | null {
  const ext = path.extname(filename).toLowerCase();
  if (IMAGE_EXT.has(ext)) return 'image';
  if (VIDEO_EXT.has(ext)) return 'video';
  return null;
}

function isKeyArt(filename: string): boolean {
  return KEY_ART_PATTERN.test(filename);
}

function sortFilenames(a: string, b: string): number {
  const aKey = isKeyArt(a);
  const bKey = isKeyArt(b);
  if (aKey !== bKey) return aKey ? -1 : 1;

  const aType = mediaType(a);
  const bType = mediaType(b);
  if (aType !== bType) {
    if (aType === 'image') return -1;
    if (bType === 'image') return 1;
  }

  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

function mapFolderFilenames(folder: string, filenames: string[]): MarathonMedia[] {
  let heroAssigned = false;

  return filenames.sort(sortFilenames).map((filename) => {
    const type = mediaType(filename)!;
    const hero = type === 'image' && !heroAssigned && isKeyArt(filename);
    if (hero) heroAssigned = true;

    return {
      src: mediaUrl(folder, filename),
      caption: captionFromFilename(filename),
      type,
      ...(hero ? { hero: true } : {}),
    };
  });
}

export function loadFolderMedia(
  folder: string,
  filter?: (filename: string) => boolean,
): MarathonMedia[] {
  const dir = folderPath(folder);
  if (!fs.existsSync(dir)) return [];

  const filenames = fs
    .readdirSync(dir)
    .filter((name) => {
      const fullPath = path.join(dir, name);
      if (!fs.statSync(fullPath).isFile() || mediaType(name) === null) return false;
      if (filter && !filter(name)) return false;
      return true;
    });

  return mapFolderFilenames(folder, filenames);
}

export function firstKeyArtFromFolder(folder: string): string | undefined {
  return loadFolderMedia(folder).find((item) => item.hero)?.src;
}

export function firstImageFromFolder(folder: string): string | undefined {
  return loadFolderMedia(folder).find((item) => item.type === 'image')?.src;
}

export type MarathonMediaSection = {
  title: string;
  mediaFolder: string;
  layout?: 'wide' | 'grid';
  media: MarathonMedia[];
};

function titleFromPathParts(parts: string[]): string {
  return parts.join(' · ');
}

function walkMediaSections(
  relativePath: string,
  titleParts: string[],
  maxDepth: number,
  currentDepth: number,
  layout: 'wide' | 'grid' | undefined,
  sections: MarathonMediaSection[],
): void {
  const dir = folderPath(relativePath);
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir);
  const subdirs = entries
    .filter((name) => fs.statSync(path.join(dir, name)).isDirectory())
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

  const directMedia = loadFolderMedia(relativePath);

  if (directMedia.length > 0) {
    sections.push({
      title: titleParts.length > 0 ? titleFromPathParts(titleParts) : path.basename(relativePath),
      mediaFolder: relativePath,
      layout,
      media: directMedia,
    });
  }

  if (currentDepth >= maxDepth || subdirs.length === 0) return;

  for (const subdir of subdirs) {
    walkMediaSections(
      `${relativePath}/${subdir}`,
      [...titleParts, subdir],
      maxDepth,
      currentDepth + 1,
      layout,
      sections,
    );
  }
}

/** Discover leaf and branch folders that contain media, grouped by folder path. */
export function discoverMediaSections(
  rootFolder: string,
  options: { maxDepth?: number; layout?: 'wide' | 'grid' } = {},
): MarathonMediaSection[] {
  const sections: MarathonMediaSection[] = [];
  walkMediaSections(rootFolder, [], options.maxDepth ?? 3, 0, options.layout, sections);
  return sections.filter((section) => section.media.length > 0);
}

export function flatMediaSections(
  folders: { folder: string; title: string; layout?: 'wide' | 'grid' }[],
): MarathonMediaSection[] {
  return folders
    .map(({ folder, title, layout }) => ({
      title,
      mediaFolder: folder,
      layout,
      media: loadFolderMedia(folder),
    }))
    .filter((section) => section.media.length > 0);
}

export function dedupeSeasonSections(sections: MarathonMediaSection[]): MarathonMediaSection[] {
  const seen = new Set<string>();

  return sections
    .map((section) => ({
      ...section,
      media: section.media.filter((item) => {
        if (seen.has(item.src)) return false;
        seen.add(item.src);
        return true;
      }),
    }))
    .filter((section) => section.media.length > 0);
}
