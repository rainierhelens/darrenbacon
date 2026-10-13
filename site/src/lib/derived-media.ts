import fs from 'node:fs';
import path from 'node:path';

/**
 * Lookup for the motion derivatives produced by `scripts/encode-media.mjs`:
 * MP4 replacements for GIFs and poster frames for every video. Reads
 * `images/_derived/manifest.json` once at build time. Everything degrades to
 * "no derivative" if the manifest is missing, so a fresh clone still builds.
 */

type ManifestEntry = {
  video?: string;
  poster: string;
  width: number;
  height: number;
  duration: number;
};

const IMAGES_ROOT = path.resolve(process.cwd(), '../images');
const MANIFEST_PATH = path.join(IMAGES_ROOT, '_derived', 'manifest.json');

const manifest: Record<string, ManifestEntry> = fs.existsSync(MANIFEST_PATH)
  ? JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'))
  : {};

function keyFor(src: string): string | null {
  const clean = src.split(/[?#]/)[0] ?? '';
  if (!clean.startsWith('/images/')) return null;
  try {
    return decodeURIComponent(clean.slice('/images/'.length));
  } catch {
    return null;
  }
}

function toPublicUrl(relative: string): string {
  return `/images/${relative.split('/').map((part) => encodeURIComponent(part)).join('/')}`;
}

export type GifVideo = {
  src: string;
  poster: string;
  width: number;
  height: number;
};

/** MP4 + poster for a GIF public URL, if one was generated. */
export function gifVideoFor(src: string): GifVideo | undefined {
  const key = keyFor(src);
  if (!key || !/\.gif$/i.test(key)) return undefined;
  const entry = manifest[key];
  if (!entry?.video) return undefined;
  return {
    src: toPublicUrl(entry.video),
    poster: toPublicUrl(entry.poster),
    width: entry.width,
    height: entry.height,
  };
}

/** Poster frame for a video public URL, if one was generated. */
export function posterFor(src: string): string | undefined {
  const key = keyFor(src);
  const entry = key ? manifest[key] : undefined;
  return entry ? toPublicUrl(entry.poster) : undefined;
}

export function isGif(src: string): boolean {
  return /\.gif(?:[?#]|$)/i.test(src);
}

/**
 * What the lightbox should open for a gallery item: the MP4 for a GIF that has
 * one (so a click doesn't pull a multi-megabyte GIF), otherwise the original.
 */
export function lightboxTarget(src: string): { src: string; type: 'image' | 'video' } {
  const video = gifVideoFor(src);
  return video ? { src: video.src, type: 'video' } : { src, type: 'image' };
}
