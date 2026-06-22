const base = '/images/ad-halo';

function adImage(filename: string) {
  return `${base}/${encodeURIComponent(filename)}`;
}

function sortAdImages(filenames: string[]) {
  return filenames
    .map((name) => ({
      name,
      src: adImage(name),
      num: Number(name.match(/halo-ad-(\d+)/)?.[1] ?? 0),
    }))
    .sort((a, b) => a.num - b.num)
    .map(({ name, src }) => ({ name, src, caption: captionFor(name) }));
}

function captionFor(filename: string): string | undefined {
  const captions: Record<string, string> = {
    'interlock_visual_target_BEFORE-AFTER.jpg': 'Interlock — visual target before & after',
    'rockridge_vis_target_BEFORE-AFTER.jpg': 'Rockridge — visual target before & after',
    'frag1_BEFORE-AFTER.jpg': 'Fragmentation grenade — production polish',
    'frag2_BEFORE-AFTER.jpg': 'Fragmentation grenade — alternate angle',
    'screenshot06-POc-4k-2-BEFORE-AFTER.jpg': 'In-game screenshot — art direction pass',
    'Game _ 18228 _ W_24024 _ T_2333 2_4_2021 8_55_48 PM-BEFORE-AFTER.jpg':
      'Live multiplayer environment — before & after',
  };
  return captions[filename];
}

const adFilenames = Array.from({ length: 26 }, (_, i) => `halo-ad-${i + 1}.jpg`);

export const haloArtDirection = {
  slug: 'halo',
  title: 'Halo Infinite',
  studio: '343 Industries / Microsoft',
  role: 'Associate Art Director',
  team: 'Multiplayer & Live',
  year: '2019–2022',
  credit: 'Shipped Halo Infinite Multiplayer (2021)',
  hero: adImage('halo-ad-1.jpg'),
  preview: adImage('halo-ad-5.jpg'),
  summary:
    'Art direction for Halo Infinite multiplayer and live content — style guides, visual targets, production review, and shipped seasonal updates.',
  intro: [
    'On the multiplayer and live team, my work sat between franchise vision and what millions of players see every match: defining how maps, weapons, and seasonal content should look, then guiding art through production until it held up in-game.',
  ],
  multiplayerDirection: {
    title: 'Art directing Halo Infinite multiplayer',
    paragraphs: [
      'Multiplayer art direction at this scale is less about a single hero painting and more about systems — keeping dozens of artists, maps, and live drops aligned to one readable visual language while the game evolves season to season.',
      'I helped set that language through the Infinite Art Index style guide, visual targets for core maps, and hands-on review of environment, prop, and weapon passes. When work landed in engine, I pushed clarity through before-and-after notes so lighting, materials, and composition read the way we intended at gameplay distance.',
      'That loop — guide, target, review, refine — is how we kept Infinite multiplayer cohesive from launch through live operations.',
    ],
    highlights: [
      'Co-developed the Infinite Art Index, an internal style guide for franchise consistency across multiplayer content',
      'Authored visual targets for core multiplayer maps including Interlock and Rockridge',
      'Directed art reviews on weapons, props, and in-game screenshots before they shipped to players',
      'Partnered with design, lighting, and environment teams to resolve issues found in production builds',
      'Supported seasonal live content with the same visual standards applied to launch maps',
    ],
  },
  video: {
    title: 'Halo Infinite multiplayer in motion',
    description:
      'A look at the shipped multiplayer experience — the environments, readability, and visual tone the art team was working toward throughout production and live development.',
    youtubeId: '4i86Ckj8xKk',
    url: 'https://www.youtube.com/watch?v=4i86Ckj8xKk',
  },
  styleGuide: {
    title: 'Infinite Art Index',
    subtitle: 'Halo Infinite style guide',
    description:
      'The Infinite Art Index was an internal reference I helped build and maintain for the multiplayer and live teams. It codified palette, material language, shape vocabulary, and UI-adjacent art rules so map teams, weapon artists, and seasonal content could stay aligned to one Halo Infinite look — even as scope grew across parallel productions.',
    pdf: '/images/halo-styleguide/Infinite_Art_Index_v0.6b.pdf',
    filename: 'Infinite_Art_Index_v0.6b.pdf',
    version: 'v0.6b',
  },
  sections: [
    {
      id: 'visual-targets',
      title: 'Visual targets',
      description:
        'Map and environment targets used to align lighting, materials, and composition before final production passes.',
      layout: 'wide' as const,
      images: [
        'interlock_visual_target_BEFORE-AFTER.jpg',
        'rockridge_vis_target_BEFORE-AFTER.jpg',
      ].map((name) => ({
        src: adImage(name),
        caption: captionFor(name),
      })),
    },
    {
      id: 'production-polish',
      title: 'Production polish',
      description:
        'Before-and-after comparisons showing art-direction notes applied to weapons, props, and in-game screenshots.',
      layout: 'wide' as const,
      images: [
        'frag1_BEFORE-AFTER.jpg',
        'frag2_BEFORE-AFTER.jpg',
        'screenshot06-POc-4k-2-BEFORE-AFTER.jpg',
        'Game _ 18228 _ W_24024 _ T_2333 2_4_2021 8_55_48 PM-BEFORE-AFTER.jpg',
      ].map((name) => ({
        src: adImage(name),
        caption: captionFor(name),
      })),
    },
    {
      id: 'direction-samples',
      title: 'Art direction samples',
      description:
        'Production art-direction work across multiplayer environments, seasons, and live content.',
      layout: 'grid' as const,
      images: sortAdImages(adFilenames),
    },
  ],
  allImages: [] as string[],
};

haloArtDirection.allImages = haloArtDirection.sections.flatMap((section) =>
  section.images.map((image) => image.src),
);

export type ArtDirectionImage = {
  src: string;
  caption?: string;
  name?: string;
};

export type ArtDirectionSection = {
  id: string;
  title: string;
  description: string;
  layout: 'wide' | 'grid';
  images: ArtDirectionImage[];
};
