import captions from '../data/gallery-captions.json';

/**
 * Per-image text for the concept galleries, keyed by `/images/...` path.
 *
 * - `title` is shown as the lightbox caption and names the image for screen
 *   readers (e.g. "Banished Dropship, Halo Infinite").
 * - `alt` describes what's in the image for people who can't see it and for
 *   image search. Falls back to `title` when empty.
 *
 * Blank strings mean "not written yet"; components fall back to numbered labels.
 */
type Caption = { title: string; alt: string };

const table = captions as Record<string, Caption>;

export function captionFor(src: string): { title?: string; alt?: string } {
  const entry = table[src];
  const title = entry?.title.trim() || undefined;
  const alt = entry?.alt.trim() || title;
  return { title, alt };
}
