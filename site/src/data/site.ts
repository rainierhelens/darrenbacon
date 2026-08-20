export const site = {
  name: 'Darren Bacon',
  tagline: 'Creative Director / Art Director',
  email: 'darren@darrenbacon.com',
  url: 'https://www.darrenbacon.com',
  handle: '@artofbacon',
  description:
    'Creative director and art director shaping franchise visual strategy at scale, from Halo and Destiny to Marathon. Leading art teams and stewarding beloved game worlds from vision through live operations.',
  jobTitle: 'Creative Director / Art Director',
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
  { label: 'Work', href: '/art-direction' },
  { label: 'Concept', href: '/concept' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

/** Homepage concept strip — franchise craft only; full set lives on /concept. */
export const homepageConceptGalleries = ['halo', 'destiny', 'deadrop'] as const;

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
    role: 'Lead Concept Artist → Art Director',
    period: '2014–2022',
    whyItMattered:
      'I led the visuals of the franchise for nearly a decade, from concept leadership through Art Director on Halo Infinite multiplayer and live.',
  },
  {
    slug: 'destiny',
    label: 'Destiny',
    description: "Visual development for Bungie's Destiny.",
    preview: '/images/destiny/destiny1.jpg',
    role: 'Senior Concept Artist',
    period: '2011–2014',
    whyItMattered:
      'I helped build the foundation of the Destiny universe: characters, environments, and props that defined how a new world would look and feel.',
  },
  {
    slug: 'disney',
    label: 'Disney',
    description: 'Film and theme park concept work.',
    preview: '/images/disney/SW_001i.jpg',
    role: 'Concept Artist',
    period: '2008–2014',
    whyItMattered:
      'Film and theme-park concept work across Disney and ILM, including Star Wars and animation, where craft and world-building had to hold up on the biggest stages.',
  },
  {
    slug: 'deadrop',
    label: 'DEADROP',
    description: 'Art direction and concept for DEADROP.',
    preview: '/images/deadrop/deadrop1.jpg',
    role: 'Studio Art Director',
    period: '2022–2025',
    whyItMattered:
      'I built the art and the team from the ground up, standing up a studio art department and directing the look from first vision through open development.',
  },
  {
    slug: 'other',
    label: 'Other',
    description: 'Personal and freelance explorations.',
    preview: '/images/other/Kovalai_Vector_Refinery.jpg',
    role: 'Personal & freelance',
    period: 'Ongoing',
    whyItMattered:
      'Explorations outside franchise production: space to push ideas, form language, and personal craft beyond a shipping schedule.',
  },
] as const;

export const galleryKeyMap: Record<string, string> = {
  halo: 'HALO',
  destiny: 'DESTINY',
  disney: 'DISNEY',
  deadrop: 'DEADROP',
  other: 'OTHER',
};
