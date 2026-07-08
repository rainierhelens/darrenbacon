import {
  dedupeSeasonSections,
  discoverMediaSections,
  firstKeyArtFromFolder,
  flatMediaSections,
  type MarathonMedia,
  type MarathonMediaSection,
} from '../../lib/marathon-media';

export type MarathonCategory = {
  id: string;
  title: string;
  description: string;
  prominence: 'primary' | 'secondary';
  layout: 'wide' | 'grid';
  subsections: MarathonMediaSection[];
};

export type MarathonSeason = {
  id: string;
  label: string;
  title: string;
  period?: string;
  summary: string;
  story: string[];
  categories: MarathonCategory[];
};

type MarathonCategoryDefinition = Omit<MarathonCategory, 'subsections'> & {
  resolveSubsections: () => MarathonMediaSection[];
};

type MarathonSeasonDefinition = Omit<MarathonSeason, 'categories'> & {
  categoryDefinitions: MarathonCategoryDefinition[];
};

export const MARATHON_LOGO = '/images/Marathon/Marathon_Logo_WordMark_Green_TRANSPARENT.png';

export const MARATHON_COVER =
  firstKeyArtFromFolder('S2/Paid/Runners/Thief/Kasha Yokai') ??
  firstKeyArtFromFolder('S1/paid/runners/Assassin/Arata Vectus Assassin') ??
  firstKeyArtFromFolder('S2/Paid/Runners/Recon/White Rabbit') ??
  MARATHON_LOGO;

const seasonDefinitions: MarathonSeasonDefinition[] = [
  {
    id: 'season-1',
    label: '1',
    title: 'Launch season foundations',
    period: 'Season 1',
    summary:
      'Establishing Marathon\'s commerce visual language - paid runner lines and the first seasonal themes players would recognize in the store and in-game.',
    story: [
      'Season 1 was about building repeatable systems: how a runner skin reads in the store, on a key art card, and in motion on the customization screen. Each paid line needed a clear visual hook that could carry from marketing through to the equip screen.',
      'The work clustered around strong thematic hooks - Midnight Decay, Acid Abyss, Cyber Red, and Arata Vectus - each with its own palette, silhouette read, and key art frame. Each set started with a breif expanded into in-game assets.',
    ],
    categoryDefinitions: [
      {
        id: 'runners',
        title: 'Runners',
        description:
          'Paid runner cosmetics:',
        prominence: 'primary',
        layout: 'wide',
        resolveSubsections: () =>
          discoverMediaSections('S1/paid/runners', { maxDepth: 3, layout: 'wide' }),
      },
    ],
  },
  {
    id: 'season-2',
    label: '2',
    title: 'Expanding the seasonal catalog',
    period: 'Season 2',
    summary:
      'A broader content slate - new runner classes, earned cosmetics, and themed collections spanning Vox Nocturna, Retro Remix, White Rabbit, Kasha Yokai, and Arachne.',
    story: [
      'Season 2 scaled the commerce pipeline: more runner classes, parallel paid and earned tracks, and distinct collection identities that fulfilled a player fantasy.',
    ],
    categoryDefinitions: [
      {
        id: 'runners',
        title: 'Runners',
        description:
          'Paid and earned runner cosmetics:',
        prominence: 'primary',
        layout: 'wide',
        resolveSubsections: () => [
          ...discoverMediaSections('S2/Paid/Runners', { maxDepth: 3, layout: 'wide' }),
          ...discoverMediaSections('S2/Earned/Runners', { maxDepth: 2, layout: 'wide' }),
        ],
      },
      {
        id: 'tchotchkes',
        title: 'Tchotchkes',
        description: 'Charm and collectible lines supporting each Season 2 collection.',
        prominence: 'secondary',
        layout: 'grid',
        resolveSubsections: () =>
          discoverMediaSections('S2/Paid/Tchotchkes', { maxDepth: 2, layout: 'grid' }),
      },
      {
        id: 'weapons',
        title: 'Weapons',
        description: 'Weapon skin sets aligned to Season 2 collection themes.',
        prominence: 'secondary',
        layout: 'grid',
        resolveSubsections: () =>
          discoverMediaSections('S2/Paid/Weapons', { maxDepth: 2, layout: 'grid' }),
      },
    ],
  },
];

function resolveSeason(season: MarathonSeasonDefinition): MarathonSeason {
  const categoriesWithSections = season.categoryDefinitions.map(({ resolveSubsections, ...category }) => ({
    ...category,
    subsections: resolveSubsections(),
  }));

  const dedupedSections = dedupeSeasonSections(
    categoriesWithSections.flatMap((category) => category.subsections),
  );
  const sectionsByFolder = new Map(dedupedSections.map((section) => [section.mediaFolder, section]));

  return {
    ...season,
    categories: categoriesWithSections
      .map((category) => ({
        ...category,
        subsections: category.subsections
          .map((section) => sectionsByFolder.get(section.mediaFolder))
          .filter((section): section is MarathonMediaSection => section !== undefined),
      }))
      .filter((category) => category.subsections.length > 0),
  };
}

export const marathonArtDirection = {
  slug: 'marathon',
  title: 'Marathon',
  studio: 'Bungie',
  role: 'Commerce & Events Art Lead',
  year: '2024–2026',
  credit: 'Cosmetics, earnables, live-service events & commerce',
  hero: MARATHON_COVER,
  preview: MARATHON_LOGO,
  summary:
    'Shaping visual strategy for cosmetics, earnables, live-service events, and commerce in Marathon.',
  intro: [
    
    'As Commerce & Events Art Lead, I own the visual strategy for paid runner cosmetics, Battle Pass earnables, store and event presentation, and the thematic through-lines that make each season feel like one deliberate drop rather than disconnected SKUs.',
    'The work below is organized season by season - Runners first, where most of the narrative and marketing weight lives, followed by supporting tchotchkes and weapon lines that extend each collection\'s palette into the rest of the catalog.',
  ],
  approach: {
    title: 'Seasonal commerce art direction',
    paragraphs: [
      'Live-service art leadership at this layer is part brand design, part production systems. Each season needs a clear visual hook - a palette, a silhouette language, and a mood that can scale across runner classes, earnables, store pages, and event beats without losing identity.',
      'I work from thematic brief through key art and in-engine capture, partnering with character, UI, and marketing teams so what ships in the store matches what players see on their runners in-game. That consistency is what makes a season feel premium and what keeps players engaged across the free and paid tracks.',
    ],
    pillars: [
      'Define seasonal visual hooks that scale across runner classes and earnable tiers',
      'Direct art from concept pitches through in-game presentation for paid cosmetics',
      'Shape Battle Pass and store framing so progression reads clearly at a glance',
      'Extend collection themes into charms, weapons, and supporting commerce surfaces',
      'Align live-service event art with the same seasonal story as the store catalog',
    ],
  },
  get seasons(): MarathonSeason[] {
    return seasonDefinitions.map(resolveSeason);
  },
};

export type { MarathonMedia };
