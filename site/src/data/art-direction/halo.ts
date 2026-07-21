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
  role: 'Art Director',
  team: 'Multiplayer & Live',
  year: '2019–2022',
  credit: 'Shipped Halo Infinite Multiplayer (2021)',
  hero: adImage('halo-ad-1.jpg'),
  preview: adImage('halo-ad-5.jpg'),
  summary:
    'Art direction for Halo Infinite multiplayer and live content — style guides, visual targets, production review, and shipped seasonal updates.',
  intro: [
    'Halo is the franchise I know from the inside out. My career runs straight through these universes — senior concept work at Bungie, Art Director on Halo Infinite at 343 Industries, and back at Bungie today — which means I direct Halo with lived fluency in what makes it feel like itself.',
    'On the multiplayer and live team, my work sat between franchise vision and what millions of players see every match: defining how maps, weapons, and seasonal content should look, then guiding dozens of artists through production until it held up in-game, season after season.',
  ],
  scaleImpact: {
    title: 'Scale & impact',
    intro:
      'Halo Infinite launched free-to-play — the widest audience in franchise history — and my remit spanned art direction across Shooter, Multiplayer, Sandbox, UI, FX, and Character teams, plus consumer-products oversight. Keeping a $5B franchise visually cohesive across parallel productions and live seasons was the core of the job.',
    stats: [
      { value: '$5B', label: 'Franchise stewarded across Halo Infinite' },
      { value: '~400', label: 'Artists whose content I helped orchestrate program-wide' },
      { value: 'Free-to-play', label: 'Launch model — the broadest audience in Halo history' },
      { value: 'Multi-season', label: 'Cohesion sustained from launch through live operations' },
    ],
  },
  multiplayerDirection: {
    title: 'Art directing Halo Infinite multiplayer',
    paragraphs: [
      'Multiplayer art direction at this scale is less about a single hero painting and more about systems — keeping dozens of artists, maps, and live drops aligned to one readable visual language while the game evolves season to season.',
      'I set that language by authoring the Infinite Art Index — the franchise’s art style guide — along with visual targets for core maps and hands-on review of environment, prop, and weapon passes. When work landed in engine, I pushed clarity through before-and-after notes so lighting, materials, and composition read the way we intended at gameplay distance.',
      'That loop — guide, target, review, refine — is how we kept Infinite multiplayer cohesive from launch through live operations.',
    ],
    highlights: [
      'Orchestrated art content across a ~400-artist program spanning Shooter, Multiplayer, Sandbox, UI, FX, and Character teams',
      'Authored the Infinite Art Index — the franchise’s living art style guide — aligning a ~400-artist program and external partners around one visual language',
      'Authored visual targets for core multiplayer maps including Interlock and Rockridge',
      'Directed art reviews on weapons, props, and in-game screenshots before they shipped to players',
      'Oversaw consumer-products art — Mattel (Mega Bloks, BoomCo.), McFarlane collectibles, apparel, and brand style guides — protecting brand integrity',
      'Partnered with design, lighting, and environment teams to resolve issues found in production builds',
    ],
  },
  video: {
    title: 'Halo Infinite multiplayer in motion',
    description:
      'A look at the shipped multiplayer experience — the environments, readability, and visual tone the art team was working toward throughout production and live development.',
    youtubeId: '4i86Ckj8xKk',
    url: 'https://www.youtube.com/watch?v=4i86Ckj8xKk',
  },
  closing: {
    title: 'Stewarding the look',
    paragraphs: [
      'Halo is recognizable in a single silhouette — a discipline of shape, palette, and restraint that took the franchise decades to earn. The job of directing it is protecting that legibility while still giving each season something fresh to say.',
      'Having helped hold that line through Infinite\'s live years, I have a clear point of view on where the craft goes next: sharpening the readable, iconic Halo language for a live-service cadence, and keeping a growing team of artists aligned to it as the world expands. It is the kind of long-horizon stewardship I am built to lead.',
    ],
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
