import type { ArtIndexChapter, ArtIndexTocLink } from './types';

/** Coarse chapter groups for the sticky nav. */
export const artIndexChapters: ArtIndexChapter[] = [
  { id: 'cover', label: 'Cover', spreads: [1] },
  { id: 'legal', label: 'Legal', spreads: [2] },
  { id: 'contents', label: 'Contents', spreads: [3] },
  { id: 'pillars', label: 'Project Pillars', spreads: [4, 5, 6] },
  { id: 'zeta', label: 'Zeta Halo', spreads: [7, 8, 9, 10, 11, 12, 13] },
  { id: 'banished', label: 'Banished', spreads: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23] },
  { id: 'unsc', label: 'UNSC', spreads: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33] },
  { id: 'forerunner', label: 'Forerunner', spreads: [34, 35, 36, 37, 38] },
  { id: 'rendering', label: 'Pillars in Action', spreads: [39, 40] },
  { id: 'credits', label: 'Credits', spreads: [41, 42] },
];

export const artIndexNav = artIndexChapters.filter((chapter) =>
  ['contents', 'pillars', 'zeta', 'banished', 'unsc', 'forerunner', 'rendering', 'credits'].includes(
    chapter.id,
  ),
);

/** Deep-link anchors for the original contents page (1-based spread index). */
export const artIndexAnchors: { id: string; spread: number }[] = [
  { id: 'cover', spread: 1 },
  { id: 'legal', spread: 2 },
  { id: 'contents', spread: 3 },
  { id: 'pillars', spread: 4 },
  { id: 'overview', spread: 6 },
  { id: 'legacy', spread: 6 },
  { id: 'zeta', spread: 7 },
  { id: 'ring', spread: 7 },
  { id: 'hex', spread: 9 },
  { id: 'refugia', spread: 12 },
  { id: 'open-world', spread: 13 },
  { id: 'banished', spread: 14 },
  { id: 'invasion', spread: 14 },
  { id: 'modules', spread: 16 },
  { id: 'hard-surface', spread: 18 },
  { id: 'character', spread: 23 },
  { id: 'unsc', spread: 24 },
  { id: 'environment', spread: 25 },
  { id: 'armor', spread: 28 },
  { id: 'weapons', spread: 32 },
  { id: 'pelican', spread: 33 },
  { id: 'forerunner', spread: 34 },
  { id: 'examples', spread: 35 },
  { id: 'rendering', spread: 39 },
  { id: 'credits', spread: 41 },
];

export const artIndexTocLinks: ArtIndexTocLink[] = [
  { match: 'Project Pillars', href: '#pillars' },
  { match: 'Overview', href: '#overview' },
  { match: 'Legacy', href: '#legacy' },
  { match: 'Halo ring', href: '#ring' },
  { match: 'Hex', href: '#hex' },
  { match: 'Refugia', href: '#refugia' },
  { match: 'Open world', href: '#open-world' },
  { match: 'vision', href: '#open-world' },
  { match: 'zeta', href: '#zeta' },
  { match: 'banished', href: '#banished' },
  { match: 'Invasion', href: '#invasion' },
  { match: 'Modules', href: '#modules' },
  { match: 'Hard Surface', href: '#hard-surface' },
  { match: 'Character', href: '#character' },
  { match: 'unsc', href: '#unsc' },
  { match: 'Intro', href: '#unsc' },
  { match: 'Enviro', href: '#environment' },
  { match: 'Armor Design', href: '#armor' },
  { match: 'Weapon Design', href: '#weapons' },
  { match: 'E3 Pelican', href: '#pelican' },
  { match: 'Theory', href: '#forerunner' },
  { match: 'Examples', href: '#examples' },
  { match: 'Pillars in Action', href: '#rendering' },
  { match: 'forerunner', href: '#forerunner' },
  { match: 'rendering', href: '#rendering' },
];

export function chapterForSpread(index: number): ArtIndexChapter | undefined {
  return artIndexChapters.find((chapter) => chapter.spreads.includes(index));
}

export function anchorsForSpread(index: number): string[] {
  return artIndexAnchors.filter((anchor) => anchor.spread === index).map((anchor) => anchor.id);
}

export function tocHrefForText(text: string): string | undefined {
  const normalized = text.replace(/\s+/g, ' ').trim();
  const hit = artIndexTocLinks.find((link) =>
    normalized.toLowerCase().includes(link.match.toLowerCase()),
  );
  return hit?.href;
}

export function fontFamilyFor(font: string): 'cond' | 'serif' | 'sans' {
  if (/cond/i.test(font)) return 'cond';
  if (/garamond|minion|georgia/i.test(font)) return 'serif';
  return 'sans';
}

export function fontWeightFor(font: string): number {
  if (/black/i.test(font)) return 900;
  if (/bold/i.test(font)) return 700;
  if (/medium|med/i.test(font)) return 500;
  if (/light/i.test(font)) return 300;
  return 400;
}

export function isItalicFont(font: string, flags: number): boolean {
  return /it/i.test(font) || (flags & 2) === 2;
}

/** Visible replacements on rasterized spreads (covers the original PDF type). */
export const artIndexTextOverrides: {
  spread: number;
  match: string;
  text: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  tone?: 'hide' | 'body';
}[] = [
  {
    spread: 41,
    match: 'C O N T A C T',
    text: '',
    x: 57,
    y: 6,
    width: 18,
    height: 6.5,
    tone: 'hide',
  },
  {
    spread: 41,
    match: 'C O N C E P T L E A D',
    text: 'Associate Art Director / Art Director, Multiplayer & Live Teams',
    width: 40,
    height: 3.4,
  },
  {
    spread: 41,
    match: 'dbacon@microsoft.com',
    text: '',
    x: 82.5,
    y: 33.8,
    width: 10,
    height: 2.4,
    tone: 'hide',
  },
  {
    spread: 41,
    match: 'Mabel McGrail',
    text: '',
    x: 57.5,
    y: 41.3,
    width: 42,
    height: 5.5,
    tone: 'hide',
  },
  {
    spread: 41,
    match: 'Mabel McGrail, editing',
    text: 'Howard Coulby, content',
    width: 14,
    height: 4,
    tone: 'body',
  },
];

const artIndexHiddenText = new Set([
  'S E N I O R P R O D U C E R',
  'mabels@microsoft.com',
  'Howard Coulby, content',
]);

export function textOverrideFor(spreadIndex: number, text: string) {
  return artIndexTextOverrides.find(
    (item) => item.spread === spreadIndex && item.match === text,
  );
}

export function isArtIndexHidden(spreadIndex: number, text: string) {
  return spreadIndex === 41 && artIndexHiddenText.has(text);
}
