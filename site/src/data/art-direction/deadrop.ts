import { loadFolderMedia, type DeadropMedia } from '../../lib/deadrop-media';

export type DeadropImage = DeadropMedia;

export type LiveEvent = {
  title: string;
  location: string;
  date: string;
  description: string;
  href?: string;
};

export type SnapshotVideo = {
  title: string;
  description: string;
  youtubeId: string;
  url: string;
};

export type SnapshotBeforeAfter = {
  title: string;
  description?: string;
  mediaFolder: string;
  media: DeadropMedia[];
};

export type SnapshotMediaSection = {
  title: string;
  mediaFolder: string;
  layout?: 'wide' | 'grid';
  media: DeadropMedia[];
  beforeAfter?: SnapshotBeforeAfter;
};

export type SnapshotEntry = {
  id: string;
  numeral: string;
  title: string;
  build: string;
  released: string;
  summary: string;
  story: string[];
  highlights: string[];
  liveEvent?: LiveEvent;
  video?: SnapshotVideo;
  artDirection?: string[];
  galleryLayout: 'wide' | 'grid';
  mediaFolder: string;
  media: DeadropMedia[];
  mediaSections?: SnapshotMediaSection[];
};

type SnapshotBeforeAfterDefinition = Omit<SnapshotBeforeAfter, 'media'>;
type SnapshotMediaSectionDefinition = Omit<SnapshotMediaSection, 'media' | 'beforeAfter'> & {
  beforeAfter?: SnapshotBeforeAfterDefinition;
  filenamePattern?: string;
};
type SnapshotDefinition = Omit<SnapshotEntry, 'media' | 'mediaSections'> & {
  mediaSections?: SnapshotMediaSectionDefinition[];
};

export const DEADROP_COVER = '/images/deadrop-ad/HighresScreenshot00455_3840x2160-2.jpg';

export const deadropArtDirection = {
  slug: 'deadrop',
  title: 'DEADROP',
  studio: 'Midnight Society',
  role: 'Art Director',
  year: '2022–2025',
  credit: 'Vertical Extraction Shooter · Snapshots I–VII',
  hero: DEADROP_COVER,
  preview: DEADROP_COVER,
  styleGuide: '/images/deadrop/maker_art_style_guide_3k.jpg',
  summary:
    'Art direction for Midnight Society\'s DEADROP — from the first firing-range Snapshot through Sector 3, Cleaners, Midnight Ride, and a 2024 showcase trailer built from in-engine captures.',
  intro: [
    'Midnight Society was built on a radical idea: ship playable builds early, show the messy middle of game development, and let a community of Founders help steer a new competitive shooter. DEADROP — codename Project Moon — was pitched as the world\'s first Vertical Extraction Shooter: arena-shooter readability at battle-royale scale, with extraction-session stakes layered on top.',
    'Co-founded by Robert Bowling, Quinn DelHoyo, and Guy "Dr. Disrespect" Beahm, the studio assembled veterans from Call of Duty, Halo, and Fortnite. I joined as Art Director to define the visual language of the Refiner States — neon-noir towers where Space Dust is harvested from the stratosphere — and to keep art production aligned as Snapshots landed every few months.',
    'The timeline below follows Snapshots I through VII — from a single weapon and three firing ranges to PvE Cleaners, squad play, vehicular Midnight Ride insertions, and a final 2024 trailer assembled from production footage I captured in-engine.',
  ],
  founding: {
    title: 'Founding Midnight Society',
    paragraphs: [
      'The studio launched in 2021 with transparency as a product feature. Founders Access Pass holders — later joined by Tower Key holders — became "Variants," playing in-development builds and filing Snapshot Debriefs that fed directly into production.',
      'DEADROP\'s pitch was specific: climb a Refiner State tower, fight players and AI Cleaners, extract with loot, or risk everything for the Deadrop — a mega payout for the last combatant standing. Art had to sell verticality, legibility at distance, and an "80s never ended" retro-future tone without drowning players in noise.',
    ],
    pillars: [
      'Open development — playable Snapshots shipped to Founders from the first weapon onward',
      'Community feedback loops via Snapshot Debriefs and live reveal events',
      'Unreal Engine 5 production targeting PC first, with console ambitions',
      'Art direction balancing Dredd-like density with competitive readability',
    ],
  },
  liveEventsOverview: [
    {
      title: 'DEADROP Reveal · Snapshot I',
      location: 'Los Angeles, CA',
      date: 'July 29, 2022',
      description:
        'The first in-person Founders event. Project Moon became DEADROP on stage; Variants played Snapshot CL 1859 — the firing ranges and Player Hideout — while industry and creators watched the studio\'s transparent dev model in action.',
      href: 'https://midnightsociety.news/intercept/snapshot-cl-1859/',
    },
    {
      title: 'Snapshot V Reveal · SSV "Enter the Tower"',
      location: 'Arlington, TX (Dallas–Fort Worth)',
      date: 'March 17, 2023',
      description:
        'Midnight Society partnered with OpTic Gaming to unveil Snapshot V at Esports Stadium Arlington. Three live matches showcased Sector 3: Cold Storage, the Rising Freeze mechanic, and extraction gameplay to a packed arena and a global livestream.',
      href: 'https://www.sportskeeda.com/esports/news-optic-dr-disrespect-collaborate-host-gaming-event-new-deadrop-gameplay-showcased',
    },
    {
      title: 'Snapshot VII Reveal · Midnight Ride',
      location: 'Las Vegas, NV · HyperX Arena, Luxor',
      date: 'October 20, 2023',
      description:
        'The HyperX Arena event at the Luxor debuted vehicular Midnight Ride insertions — Founders raced from Hideout garages into live matches on stage while the studio streamed to a global audience, closing the trilogy of LA, Dallas, and Vegas reveals.',
      href: 'https://decrypt.co/202701/dr-disrespect-deadrop-shooter-unveils-cars-racing-battles-vegas-event',
    },
  ] as LiveEvent[],
};

const snapshotDefinitions: SnapshotDefinition[] = [
    {
      id: 'snapshot-i',
      mediaFolder: 'SSI',
      numeral: 'I',
      title: 'First blood — firing ranges & Player Hideout',
      build: 'Snapshot 1.0 · CL 1859',
      released: 'July 29, 2022',
      summary:
        '1,859 team check-ins distilled into one weapon, three firing ranges, and the first glimpse of Player Hideout overlooking a storm-soaked Refiner State.',
      story: [
        'Snapshot I was deliberately narrow. Midnight Society needed to prove feel before scope: core movement, one assault rifle, dedicated server auth, and a lobby space that would eventually anchor the full game.',
        'Player Hideout opened onto a rain-lashed city vista — the Refiner State in silhouette — with interconnected prep areas leading to three distinct firing ranges. Variants tested recoil, strafe speed, and ADS transitions while the art team validated material response under storm lighting.',
        'The Los Angeles reveal made this build public in the most literal sense: Founders in the room and online watched the first honest slice of DEADROP, rough edges included. Robert Bowling\'s promise from the stage set the cadence — the next Snapshot would be bigger, tighter, and faster.',
      ],
      highlights: [
        'Player Hideout pre-game lobby with Refiner State overlook',
        'Three firing ranges for weapon and movement validation',
        'First weapon pipeline and authentication / profile systems',
        'Foundation for future multiplayer Hideout networking',
      ],
      liveEvent: {
        title: 'Los Angeles Founders Reveal',
        location: 'Los Angeles, CA',
        date: 'July 29, 2022',
        description:
          'DEADROP name, logo, and first gameplay debuted at an invite-only LA event streamed to the broader Founders community.',
      },
      artDirection: [
        'Established storm-soaked exterior lighting for the Hideout vista',
        'Art-directed firing range layouts for readable target lanes at multiple distances',
        'Before/after environment passes on interior Hideout spaces (hallways, lower decks, exterior ranges)',
      ],
      galleryLayout: 'wide',
      mediaSections: [
        {
          title: 'Concept & production',
          mediaFolder: 'SSI',
          layout: 'wide',
          filenamePattern: '\\.(jpg|jpeg|png|gif|webp)$',
        },
        {
          title: 'Motion & capture',
          mediaFolder: 'SSI',
          layout: 'wide',
          filenamePattern: '\\.(mp4|mov|webm|mkv)$',
        },
      ],

    },
    {
      id: 'snapshot-ii',
      mediaFolder: 'SSII',
      numeral: 'II',
      title: 'Proving Grounds — PVP, loot, and the Garage',
      build: 'Snapshot 2.0 · CL 3184',
      released: 'September 20, 2022',
      summary:
        'Eleven new weapons, inventory and looting, the Proving Grounds PVP map, extraction logic, and the first Garage — DEADROP became a game, not a range.',
      story: [
        'Six weeks became nine as the team absorbed Snapshot I feedback, but CL 3184 landed with real stakes. Proving Grounds introduced PVP combat across interior and exterior lanes, loot containers with a twelve-weapon arsenal, and the extraction / Deadrop win condition — much of it still in whitebox while mechanics proved out.',
        'The Hideout expanded with a Garage — a prestige space for vehicle color customization that would become central by Snapshot VII. Snapshot 3184.1 followed quickly with car paint rarities, lootable paints, and the Garage camera flow Founders would recognize for years.',
        'Art direction shifted from "does the gun feel good?" to "can you read an enemy at 40 meters in this lane?" — pushing contrast, silhouette, and prop clutter rules before Sector work began.',
      ],
      highlights: [
        'Proving Grounds — first PVP map with extraction flow',
        '11 additional weapons and looting / inventory systems',
        'Garage introduction and vehicle color customization',
        'Deadrop win condition, controller support, and audio options',
      ],
      artDirection: [
        'Proving Grounds blockout-to-production art direction for readable lanes',
        'Weapon silhouette pass across expanded arsenal',
        'Garage space as brand-forward prestige environment',
      ],
      galleryLayout: 'wide',

    },
    {
      id: 'snapshot-iii',
      mediaFolder: 'SSIII',
      numeral: 'III',
      title: 'Movement verbs & weapon attachments',
      build: 'Snapshot 3.0 · CL 4461',
      released: 'November 8, 2022',
      summary:
        'True player view, sliding, climbing, ziplines, ladders, and optic attachments — DEADROP\'s moment-to-moment identity took shape.',
      story: [
        'Snapshot III was the traversal Snapshot. Separate view models gave way to true player view; movement added slide, climb, zip, and ladder verbs that had to read clearly against busy vertical architecture.',
        'Optic attachments arrived as the first armory-adjacent customization — a preview of the deeper modularity Snapshot IV would expand. Proving Grounds received map updates to stress-test vertical routes and sightlines.',
        'This is where art direction and design locked arms: every new verb needed predictable visual telegraphing — hand holds, zip lines, and ledge silhouettes tuned so players could plan routes under pressure.',
      ],
      highlights: [
        'True player view (unified first-person body)',
        'Slide, climb, zipline, and ladder traversal',
        'Weapon optic attachments',
        'Proving Grounds layout and verticality updates',
      ],
      artDirection: [
        'Traversal read passes on zip lines, ladders, and climbable pipe language',
        'Attachment optics art direction for HUD clarity and weapon readability',
        'Character paper-doll callouts for gear silhouette consistency',
        'Drift and environment paintovers for vertical lane composition',
      ],
      galleryLayout: 'wide',
      mediaSections: [
        {
          title: 'Paintovers & environment',
          mediaFolder: 'SSIII',
          layout: 'wide',
          filenamePattern: '^(Synth|PO |Fender_)',
        },
        {
          title: 'In-engine screenshots',
          mediaFolder: 'SSIII',
          layout: 'wide',
          filenamePattern: '^(lowres|image\\s*\\()',
        },
      ],

    },
    {
      id: 'snapshot-iv',
      mediaFolder: 'SSIV',
      numeral: 'IV',
      title: 'The Armory — deep weapon customization',
      build: 'Snapshot 4.0 · CL 7287',
      released: 'December 20, 2022',
      summary:
        'Proximity comms, sniper rifle, shimmy movement, and a full Armory with barrels, gadgets, sights, stocks, chips, and magazines — customization became gameplay.',
      story: [
        'Snapshot IV turned attachments into stats, not cosmetics. Lasers, barrels, and stocks changed handling; the Armory UI let players drag-and-drop mods onto weapons with immediate feedback.',
        'A sniper rifle widened engagement distances; proximity voice comms added social tension. Shimmy movement gave players another defensive verb for peeking cover on narrow tower floors.',
        'Art direction for the Armory meant treating every legendary weapon as a hero asset — distinct silhouette, readable muzzle flash, and brand-forward naming that could survive crate drops and marketing beats.',
      ],
      highlights: [
        'Full Armory mod system — barrel, gadget, sight, stock, chip, magazine',
        'Gameplay stat differences per attachment (Snapshot 4.1 tuning)',
        'Sniper rifle and proximity voice communications',
        'Shimmy movement mechanic',
      ],
      artDirection: [
        'Legendary weapon art direction — hero silhouettes, readable muzzle flash, and brand-forward naming',
        'Armory UI visual language and attachment iconography',
        'Sniper readability passes for glint, scope, and counter-play clarity',
      ],
      galleryLayout: 'wide',
      mediaSections: [
        {
          title: 'Weapon showcases',
          mediaFolder: 'SSIV',
          layout: 'wide',
          filenamePattern: '\\.(mp4|mov|webm|mkv)$',
        },
        {
          title: 'Legendary weapons & ammo',
          mediaFolder: 'SSIV',
          layout: 'wide',
          filenamePattern: '\\.(jpg|jpeg|png|gif|webp)$',
        },
      ],

    },
    {
      id: 'snapshot-v',
      mediaFolder: 'SSV',
      numeral: 'V',
      title: 'Enter the Tower — Sector 3 & the SSV event',
      build: 'Snapshot 5.0 · CL 11111',
      released: 'March 17, 2023',
      summary:
        'Sector 3: Cold Storage, armor and helmets, healing, smoke grenades, VisorCortex — and the SSV live reveal in Arlington with OpTic Gaming.',
      story: [
        'Snapshot V was the tower Snapshot. Sector 3: Cold Storage introduced Space Dust refinement floors, a Rising Freeze that climbed the map floor-by-floor, and extraction pressure unlike Proving Grounds.',
        'Armor, helmets, consumable healing, and smoke grenades made loadouts matter. Tower Keys opened the build to new players beyond Founders — the community finally grew faster than the access list.',
        'SSV — the Snapshot V reveal — landed at Esports Stadium Arlington on March 17, 2023. Midnight Society and OpTic hosted "Enter the Tower": live matches, drag-and-drop Armory demos on stage, and Doc winning the final showcase match. Dallas wasn\'t a trailer; it was proof the vertical extraction loop worked in front of a crowd.',
      ],
      highlights: [
        'Sector 3: Cold Storage — first full tower sector',
        'Rising Freeze mechanic climbing the map vertically',
        'Armor, helmet, healing, and smoke systems',
        'VisorCortex in-game UI and Tower Key expanded access',
        'SSV live event with OpTic at Esports Stadium Arlington',
      ],
      liveEvent: {
        title: 'SSV · Enter the Tower',
        location: 'Arlington, TX · Esports Stadium',
        date: 'March 17, 2023',
        description:
          'Snapshot V reveal event co-hosted with OpTic Gaming — three live matches, global livestream, and the public debut of Sector 3 extraction gameplay.',
        href: 'https://www.sportskeeda.com/esports/news-optic-dr-disrespect-collaborate-host-gaming-event-new-deadrop-gameplay-showcased',
      },
      artDirection: [
        'Sector 3 art direction — cold storage industrial language and freeze readability',
        'Cleaner faction visual identity (CLAW, RAT) for PvE pressure',
        'Sector 2 proxy environments — market, alley, and waste passes',
        'Marketing and event art for the SSV beat',
      ],
      galleryLayout: 'wide',
      mediaSections: [
        {
          title: 'Sector 3 & SSV',
          mediaFolder: 'SSV',
          layout: 'wide',
          filenamePattern: '\\.(jpg|jpeg|png|gif|webp)$',
        },
        {
          title: 'Motion & capture',
          mediaFolder: 'SSV',
          layout: 'wide',
          filenamePattern: '\\.(mp4|mov|webm|mkv)$',
        },
      ],

    },
    {
      id: 'snapshot-vi',
      mediaFolder: 'SSVI',
      numeral: 'VI',
      title: 'Cleaners, squads & the Vendor',
      build: 'Snapshot 6.0 · CL 15447',
      released: 'July 11, 2023',
      summary:
        'PvE Cleaners scavenged the tower, three-player squads changed the social layer, and the Vendor turned Space Dust into an economy — DEADROP became a living ecosystem.',
      story: [
        'After 200,000+ hours in Sector 3, the Refiner State pushed back. Cleaners — three-man NPC teams of Scout, Harvester, and Guard — arrived to loot bodies and erase evidence of conflict. Players could fight them for bags or let them work and slip away.',
        'Squads of up to three Variants finally dropped together, with follow/join systems, squad tracking in-tower, and push-to-talk options layered on top of proximity voice. The Vendor — a Cleaner running an underground market — let players buy, sell, insure gear with Dust, and recover tagged items from Lost and Found.',
        'A new Proving Ground sector expanded vertical routes with openable/closable hatches. Frag grenades added another tactical layer. Art direction focused on making Cleaners readable at a glance — faction silhouettes, gear, and behavior telegraphs that read under Cold Storage stress.',
      ],
      highlights: [
        'Cleaners PvE — Scout, Harvester, and Guard squad behavior',
        'Three-player squads with follow, join, and comms options',
        'Vendor marketplace — buy, sell, insure, and recover tagged gear',
        'New Proving Ground sector with hatch traversal',
        'Frag grenades and expanded Sector 3 layout updates',
      ],
      artDirection: [
        'Cleaner faction identity — CLAW and RAT visual language in production',
        'Vendor UI and underground market tone',
        'Sector 2 environment passes — market, alley, and waste zones',
        'Squad readability and in-tower player tracking UX art support',
      ],
      galleryLayout: 'wide',

    },
    {
      id: 'snapshot-vii',
      mediaFolder: 'SSVII',
      numeral: 'VII',
      title: 'Midnight Ride — cars meet extraction',
      build: 'Snapshot 7.0 · CL 20789',
      released: 'October 20, 2023',
      summary:
        'Vehicular Midnight Ride insertions from Hideout garages, driving combat into Sector 3, and a Las Vegas reveal at the HyperX Arena — the Garage from Snapshot II finally mattered.',
      story: [
        'Founders had asked about the Garage since Snapshot II. Snapshot VII answered: Midnight Ride — a pre-match vehicular gauntlet where lobby players race, fight, and jockey for spawn position before boots hit the tower floor. Driving insertion into Sector 3 wired cars into the core loop, not just marketing.',
        'The reveal landed at the HyperX Arena inside the Luxor in Las Vegas — the same live-event energy as LA and Dallas, now showcasing a game loop nobody expected from an extraction shooter. Robert Bowling framed cars as part of a broader DEADROP platform vision, including future Creative Mode racing.',
        'Art direction covered vehicle wraps, road insertion environments, garage-to-tower transitions, and keeping FPS readability intact after a racing segment — a strange design problem that needed a cohesive neon-noir look end to end.',
      ],
      highlights: [
        'Midnight Ride — pre-match vehicular combat and spawn jockeying',
        'Driving insertion into Sector 3: Cold Storage',
        'New sector proxy map and additional game modes',
        'Drivers Key packages and expanded vehicle customization',
        'Snapshot VII live reveal at HyperX Arena, Las Vegas',
      ],
      liveEvent: {
        title: 'Snapshot VII Reveal · Midnight Ride',
        location: 'Las Vegas, NV · HyperX Arena, Luxor',
        date: 'October 20, 2023',
        description:
          'Live event debuting vehicular Midnight Ride insertions — Founders played the new loop on stage while the studio streamed to a global audience.',
        href: 'https://decrypt.co/202701/dr-disrespect-deadrop-shooter-unveils-cars-racing-battles-vegas-event',
      },
      video: {
        title: 'Midnight Ride — gameplay trailer',
        description:
          'The official Midnight Ride trailer — vehicular combat from Hideout garages into tower insertions, revealed alongside Snapshot VII.',
        youtubeId: 'Io0ptzjAQOs',
        url: 'https://www.youtube.com/watch?v=Io0ptzjAQOs',
      },
      artDirection: [
        'Vehicle art direction — wraps, license plates, and garage presentation',
        'Midnight Ride road environment and insertion transition lighting',
        'Character customization — RAT faction armor, helmets, and variant identity',
        'Sector 2 environment and weapon showcase capture direction',
        'Marketing trailer support and in-engine capture direction',
      ],
      galleryLayout: 'wide',
      mediaSections: [
        {
          title: 'Drive to the Tower',
          mediaFolder: 'SSVII/drive to tower',
          layout: 'wide',
        },
        {
          title: 'Character',
          mediaFolder: 'SSVII/character',
          layout: 'wide',
        },
        {
          title: 'Sector 2',
          mediaFolder: 'SSVII/sector 2',
          layout: 'wide',
          beforeAfter: {
            title: 'Before & after — milestone progress',
            description:
              'Sector 2 environment passes across the Snapshot VII milestone — from early blockout and proxy lighting to production-ready market, alley, and waste spaces the team shipped before Las Vegas.',
            mediaFolder: 'SSVII/sector 2/before after',
          },
        },
      ],

    },
] as SnapshotDefinition[];

function resolveMediaSections(
  sections: SnapshotMediaSectionDefinition[],
): SnapshotMediaSection[] {
  return sections.map((section) => {
    const filter = section.filenamePattern
      ? (name: string) => new RegExp(section.filenamePattern!, 'i').test(name)
      : undefined;

    return {
      ...section,
      media: loadFolderMedia(section.mediaFolder, filter),
      beforeAfter: section.beforeAfter
        ? {
            ...section.beforeAfter,
            media: loadFolderMedia(section.beforeAfter.mediaFolder),
          }
        : undefined,
    };
  });
}

Object.assign(deadropArtDirection, {
  get snapshots(): SnapshotEntry[] {
    return snapshotDefinitions.map((snapshot) => ({
      ...snapshot,
      media: snapshot.mediaSections ? [] : loadFolderMedia(snapshot.mediaFolder),
      mediaSections: snapshot.mediaSections
        ? resolveMediaSections(snapshot.mediaSections)
        : undefined,
    }));
  },
  get epilogueMedia(): DeadropMedia[] {
    return loadFolderMedia('Studio_Closure');
  },
  finalTrailer: {
    title: '2024 DEADROP showcase trailer',
    subtitle: 'In-engine captures · art-directed footage',
    description:
      'The final trailer we assembled in 2024 — built from high-resolution in-engine footage I captured across sectors, combat, and tower atmospherics. This is the clearest expression of DEADROP\'s visual direction at production scale: verticality, Cleaner pressure, weapon readability, and Refiner State mood in motion.',
    paragraphs: [
      'Where Snapshots showed incremental truth, the 2024 trailer was a curated argument — proof that the art direction held up when cut together at marketing pace. Every frame came from the live build, not pre-rendered bullshots.',
      'Directing capture meant choosing angles that sold scale, freeze, and faction identity while staying honest to what players actually saw in-game. That constraint — show the real thing, make it look inevitable — was the through-line of Midnight Society\'s open development promise.',
    ],
    youtubeId: 'TD6QNkpg31Y',
    url: 'https://youtu.be/TD6QNkpg31Y',

  },
  epilogue: {
    title: 'Studio closure',
    paragraphs: [
      'Midnight Society continued Snapshots through 2024 — including Creator Mode tooling in Snapshot 7.5 — before closing in January 2025. The experiment in transparent AAA development ended without a full commercial launch, but the record remains: seven major Snapshots, three live cities, and a visual direction that grew from a firing range to a tower worth extracting from.',
    ],
  },
});
