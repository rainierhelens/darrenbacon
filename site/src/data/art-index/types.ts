export type ArtIndexTextRegion = {
  type: 'text';
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
  font: string;
  size: number;
  color: string;
  flags: number;
};

export type ArtIndexImageRegion = {
  type: 'image';
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  pixelWidth: number;
  pixelHeight: number;
};

export type ArtIndexSpread = {
  index: number;
  id: string;
  width: number;
  height: number;
  aspect: number;
  src: string;
  preview: string;
  regions: ArtIndexTextRegion[];
  images: ArtIndexImageRegion[];
};

export type ArtIndexData = {
  source: string;
  title: string;
  version: string;
  pageCount: number;
  spreads: ArtIndexSpread[];
};

export type ArtIndexChapter = {
  id: string;
  label: string;
  spreads: number[];
};

export type ArtIndexTocLink = {
  match: string;
  href: string;
};
