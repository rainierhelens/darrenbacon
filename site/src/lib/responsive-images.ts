import type { ImageMetadata } from 'astro';

/**
 * Build-time index of every static image under the repo-root `images/` folder,
 * keyed by its public URL path (`/images/halo/halo1.jpg`).
 *
 * Pages keep referring to images by public URL (the strings already in the data
 * files). `ResponsiveImage` looks the URL up here and, when it finds a match,
 * hands the imported asset to Astro's image service so the build emits resized
 * WebP derivatives with intrinsic dimensions. Anything not in the index (GIFs,
 * ignored folders, external URLs) falls back to a plain `<img>`.
 *
 * Folders that are git-ignored or already optimised are excluded so local builds
 * don't spend time on media that production never ships.
 */
const modules = import.meta.glob<{ default: ImageMetadata }>(
  [
    '../../../images/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
    '!../../../images/art-index/**',
    '!../../../images/_derived/**',
    '!../../../images/halo-styleguide/**',
    '!../../../images/deadrop-ad/screenshots/**',
    '!../../../images/Marathon/S1/**',
    '!../../../images/Marathon/S2/**',
  ],
  { eager: true },
);

const PREFIX = '../../../images/';

const index = new Map<string, ImageMetadata>();
for (const [key, mod] of Object.entries(modules)) {
  if (!key.startsWith(PREFIX)) continue;
  index.set(key.slice(PREFIX.length), mod.default);
}

function normalize(src: string): string | null {
  const withoutQuery = src.split(/[?#]/)[0] ?? '';
  if (!withoutQuery.startsWith('/images/')) return null;
  try {
    return decodeURIComponent(withoutQuery.slice('/images/'.length));
  } catch {
    return null;
  }
}

/** Resolve a `/images/...` public URL to its imported asset, or `undefined`. */
export function resolveImage(src: string): ImageMetadata | undefined {
  const key = normalize(src);
  return key ? index.get(key) : undefined;
}

/**
 * Pick the srcset widths to generate for an image: every requested width that
 * is smaller than the original, plus the original width itself when at least
 * one requested width exceeded it (so large tiles still get the sharpest copy
 * the source can provide without upscaling).
 */
export function pickWidths(requested: readonly number[], original: number): number[] {
  const fit = requested.filter((w) => w < original);
  if (fit.length < requested.length) fit.push(original);
  return [...new Set(fit)].sort((a, b) => a - b);
}

/** Common `sizes` presets matching the site's grid breakpoints. */
export const SIZES = {
  /** Full-bleed hero / backdrop. */
  full: '100vw',
  /** 2 / 3 / 4 column thumbnail grid that runs full-bleed (concept galleries). */
  grid: '(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw',
  /** Same grid inside the max-w-7xl container (case study media). */
  gridContained: '(min-width: 1280px) 320px, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw',
  /** Two-up "wide" layout at lg, single column below. */
  wide: '(min-width: 1024px) 640px, 100vw',
  /** Three-up tile row (concept galleries on the home page). */
  tile3: '(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw',
  /** Two-up tile row (art direction case study cards). */
  tile2: '(min-width: 1024px) 640px, 100vw',
} as const;

/** Default srcset widths per preset. */
export const WIDTHS = {
  full: [960, 1600, 2400],
  grid: [320, 640, 960, 1280],
  gridContained: [320, 640, 960],
  wide: [640, 1280, 1920],
  tile3: [480, 960, 1440],
  tile2: [640, 1280, 1920],
} as const;

export type ImagePreset = keyof typeof SIZES;
