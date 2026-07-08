import galleries from '../data/galleries.json';
import { galleryKeyMap } from '../data/site';

const STATIC_IMAGE = /\.(jpe?g|png|webp)$/i;
const ROTATION_LIMIT = 12;

export function getGalleryRotationImages(slug: string): string[] {
  const key = galleryKeyMap[slug];
  if (!key) return [];

  const all = galleries[key as keyof typeof galleries] ?? [];
  const images = all.filter((src) => STATIC_IMAGE.test(src));
  if (images.length <= ROTATION_LIMIT) return images;

  const step = images.length / ROTATION_LIMIT;
  return Array.from({ length: ROTATION_LIMIT }, (_, index) => images[Math.floor(index * step)]!);
}
