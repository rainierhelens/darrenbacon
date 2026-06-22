export const shippedGames = [
  { title: 'Marathon', platform: 'PlayStation / Xbox / Windows', year: '2026', credit: 'Commerce & Events Art Lead', company: 'Bungie / Sony', href: 'https://www.mobygames.com/person/310938/darren-bacon/' },
  { title: 'Halo Infinite - Multiplayer', platform: 'Xbox Series / Windows', year: '2021', credit: 'Associate Art Director', company: '343 Industries / Microsoft', href: 'https://www.mobygames.com/game/175521/halo-infinite-multiplayer/' },
  { title: 'Halo Infinite - Campaign', platform: 'Xbox Series / Windows', year: '2021', credit: 'Associate Art Director', company: '343 Industries / Microsoft', href: 'https://www.mobygames.com/game/176543/halo-infinite-campaign/' },
  { title: 'Halo: Fireteam Raven', platform: 'Arcade', year: '2018', credit: 'Special Thanks', company: '343 Industries / Microsoft', href: 'https://www.mobygames.com/game/112604/halo-fireteam-raven/' },
  { title: 'Halo 5: Forge', platform: 'Windows', year: '2016', credit: 'Concept Art Lead', company: '343 Industries / Microsoft', href: 'https://www.mobygames.com/game/80652/halo-5-forge/' },
  { title: 'Halo 5: Guardians', platform: 'Xbox One', year: '2015', credit: 'Concept Art Lead', company: '343 Industries / Microsoft', href: 'https://www.mobygames.com/game/75503/halo-5-guardians/' },
  { title: 'Destiny', platform: 'Xbox One', year: '2015', credit: 'Senior Concept Artist', company: 'Bungie', href: 'https://www.mobygames.com/game/68327/destiny/' },
  { title: 'Command & Conquer: Red Alert 3', platform: 'Windows', year: '2008', credit: 'Concept Artist', company: 'Electronic Arts', href: 'https://www.mobygames.com/game/37216/command-conquer-red-alert-3/' },
  { title: "Command & Conquer: Kane's Wrath", platform: 'Windows', year: '2008', credit: 'Concept Artist', company: 'Electronic Arts', href: 'https://www.mobygames.com/game/33390/command-conquer-3-kanes-wrath/' },
  { title: 'Close Quarters Conflict', platform: 'Windows', year: '2006', credit: 'Artist', company: 'Zombie Studios', href: 'https://www.mobygames.com/game/33182/close-quarters-conflict/' },
] as const;

export const experience = [
  {
    role: 'Bungie — Commerce & Events Art Lead',
    period: '2025–present',
    summary:
      'Shaping visual strategy for cosmetics, earnables, live-service events, and commerce in Marathon.',
    shipped: ['Marathon (2026)'],
  },
  {
    role: 'Midnight Society — Art Director',
    period: '2022–2025',
    summary: 'Art direction for DEADROP and studio visual development.',
  },
  {
    role: 'Microsoft (Halo) — Art Director / Associate Art Director',
    period: '2019–2022',
    summary: 'Multiplayer and live team art direction for Halo Infinite.',
    shipped: ['Halo Infinite (2021)', 'Halo: Fireteam Raven — Special Thanks (2018)'],
  },
  {
    role: 'Microsoft (Halo) — Lead Concept Artist',
    period: '2014–2019',
    summary: 'Led the concept art team across Halo 5, Halo Wars 2, and Halo Infinite.',
    shipped: ['Halo 5: Guardians (2015)', 'Halo 5: Forge (2016)'],
  },
  {
    role: 'Industrial Light & Magic — Concept Artist',
    period: '2014',
    summary: 'Concept art and illustration for Star Wars projects.',
    shipped: ["Star Wars: Galaxy's Edge (2019)"],
  },
  {
    role: 'Bungie — Senior Concept Artist',
    period: '2011–2014',
    summary: 'Visual development for Destiny characters, environments, and props.',
    shipped: ['Destiny (2014)'],
  },
  {
    role: 'Walt Disney Television Animation — Concept Artist',
    period: '2011',
    summary: 'Background painting and concept art in the production style.',
    shipped: ['TRON: Uprising (2012)'],
  },
  {
    role: "Disney's ImageMovers Digital — Concept Artist",
    period: '2008–2010',
    summary: 'Concept art with production designer Doug Chiang.',
    shipped: ["Mars Needs Moms! (2011)", "Disney's A Christmas Carol (2009)"],
  },
  {
    role: 'Electronic Arts — Concept Artist',
    period: '2007–2008',
    summary: 'Concept art for Command & Conquer titles.',
    shipped: ['Command & Conquer: Red Alert 3 (2008)', "Command & Conquer: Kane's Wrath (2008)"],
  },
] as const;
