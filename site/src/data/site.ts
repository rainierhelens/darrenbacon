export const site = {
  name: 'Darren Bacon',
  tagline: 'Art & Creative Director',
  email: 'darren@darrenbacon.com',
  url: 'https://www.darrenbacon.com',
  handle: '@artofbacon',
  description:
    'Art and creative director shaping franchise visual strategy at scale — from Halo and Destiny to Marathon. Two decades leading art teams and stewarding beloved game worlds from vision through live operations.',
  jobTitle: 'Art & Creative Director',
  lookingFor: 'Open to creative & art director leadership — franchise or studio.',
} as const;

/** Homepage hero background rotation — add or reorder paths to change the slideshow. */
export const heroBackgrounds = [
  '/images/halo/halo10.jpg',
  '/images/ad-halo/halo-ad-26.jpg',
  '/images/deadrop/deadrop1.jpg',
  '/images/halo/halo7.jpg',
  '/images/halo/halo20.jpg',
  '/images/halo/halo45.jpg',
  '/images/destiny/destiny1.jpg',
] as const;

export const nav = [
  { label: 'Work', href: '/concept' },
  { label: 'Art Direction', href: '/art-direction' },
  { label: 'About', href: '/about' },
  { label: 'Perspective', href: '/perspective' },
  { label: 'Contact', href: '/contact' },
] as const;

export const socialLinks = [
  { label: 'ArtStation', href: 'https://www.artstation.com/darrenbacon' },
  { label: 'Instagram', href: 'https://www.instagram.com/artofbacon/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/darrenbacon/' },
  { label: 'YouTube', href: 'https://www.youtube.com/conceptdepartment' },
  { label: 'X', href: 'https://x.com/artofbacon' },
] as const;

export const conceptGalleries = [
  {
    slug: 'halo',
    label: 'Halo',
    description: 'Concept art from the Halo franchise.',
    preview: '/images/halo/halo1.jpg',
  },
  {
    slug: 'destiny',
    label: 'Destiny',
    description: 'Visual development for Bungie\'s Destiny.',
    preview: '/images/destiny/destiny1.jpg',
  },
  {
    slug: 'disney',
    label: 'Disney',
    description: 'Film and theme park concept work.',
    preview: '/images/disney/SW_001i.jpg',
  },
  {
    slug: 'deadrop',
    label: 'DEADROP',
    description: 'Art direction and concept for DEADROP.',
    preview: '/images/deadrop/deadrop1.jpg',
  },
  {
    slug: 'other',
    label: 'Other',
    description: 'Personal and freelance explorations.',
    preview: '/images/other/unnamed.jpg',
  },
] as const;

export const galleryKeyMap: Record<string, string> = {
  halo: 'HALO',
  destiny: 'DESTINY',
  disney: 'DISNEY',
  deadrop: 'DEADROP',
  other: 'OTHER',
};
