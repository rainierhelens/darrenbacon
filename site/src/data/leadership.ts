// Leadership positioning content.
//
// "50M+ players reached" is a deliberately conservative, sourced sum of the
// headline reach of shipped titles Darren contributed to (lowest well-sourced
// figure for each, rounded down; smaller/older titles excluded):
//   - Halo Infinite      20M+  players     (Microsoft, Jan 2022; F2P + Game Pass)
//   - Destiny            25M+  registered  (Activision, 2015; ~30M by 2016)
//   - Halo 5: Guardians   5M+  units       (343 Industries, first 3 months)
//   - Marathon          2.2M+  players     (Ampere Analysis, 2026 launch month)
//   - C&C: Red Alert 3    1M+  owners      (SteamSpy 1-2M + console)
//   => ~53M total, stated as "50M+".
// Excludes Kane's Wrath, Fireteam Raven, Halo 5: Forge, Close Quarters Conflict,
// and Halo Infinite's later cumulative growth. Adjust if you get official numbers.
export const impactStats = [
  { value: '20+', label: 'Years leading game & film art' },
  { value: '3', label: 'AAA franchises shipped — Halo, Destiny, Marathon' },
  { value: '50M+', label: 'Players reached across shipped titles' },
  { value: '6', label: 'Studios — Bungie, 343, Midnight Society, Disney, ILM, EA' },
] as const;

// Studio credential row. Add a `logo` path (under /images/logos) later to swap
// the text chips for logos.
export const credentialStudios = [
  { name: 'Bungie' },
  { name: '343 Industries' },
  { name: 'Microsoft' },
  { name: 'Midnight Society' },
  { name: 'Walt Disney' },
  { name: 'Industrial Light & Magic' },
  { name: 'Electronic Arts' },
] as const;

// Formal leadership training and credentials — evidence of people-leadership
// and program-management capability beyond the art craft.
export type Credential = {
  title: string;
  issuer: string;
  year?: string;
  note?: string;
};

export const leadershipCredentials: Credential[] = [
  {
    title: 'Managing at Microsoft I',
    issuer: 'Microsoft',
    note: 'Microsoft’s foundational people-management program — leading individuals, setting clear expectations, and building high-trust teams.',
  },
  {
    title: 'Managing at Microsoft II: Deliver Results Through Teams',
    issuer: 'Microsoft',
    note: 'Advanced manager training focused on driving outcomes at scale — leading through others, cross-team delivery, and organizational impact.',
  },
  {
    title: 'CompTIA Project+ (Project Management)',
    issuer: 'CompTIA',
    year: '2015',
    note: 'Industry certification in project lifecycle and cross-functional delivery — earned through study of Organizational Behavior and Leadership.',
  },
];

// A single, high-signal endorsement featured on the About page. Kept deliberately
// singular (not a wall of peer testimonials) so it reads as prestige, not résumé.
export const featuredRecommendation = {
  quote:
    'Darren is a highly skilled designer with a keen sense of form and lighting… he has proven his ability to understand and implement art direction and is innovative in solving artistic problems. It is without reservation that I recommend Darren.',
  // Tighter version for the homepage, where an exec skims in seconds.
  shortQuote:
    'He has proven his ability to understand and implement art direction and is innovative in solving artistic problems. It is without reservation that I recommend Darren.',
  name: 'Doug Chiang',
  title:
    'Academy Award-winning Production Designer; VP & Executive Creative Director, Lucasfilm',
  context: 'Worked with Darren as EVP at Disney’s ImageMovers Digital',
  letterHref: '/images/about/doug-chiang-letter.jpg',
} as const;

// Skimmable "senior roles + scale" line for directly under the hero — answers
// "is this a leader?" before the visitor scrolls.
export const signatureCredentials = [
  'Studio Art Director — DEADROP',
  'Art Director — Halo Infinite',
  'Author — Halo Infinite Art Index',
  'Commerce & Events Art Lead — Marathon',
  '~400-artist program · $5B franchise',
] as const;

// Operator proof for the homepage — the "can this person run a studio?" answer.
// Concrete outcomes, not philosophy.
export const leadershipHighlights = [
  {
    title: 'Built and ran a studio art team',
    body: 'Stood up and led a 15-person art team plus external co-developers at Midnight Society, driving DEADROP from concept through seven pre-alpha releases and three major esports and showcase events.',
  },
  {
    title: 'Stewarded $5B franchises',
    body: 'Authored the Halo Infinite Art Index — the franchise’s art bible — and directed art across a ~400-artist program while shipping Destiny, evolving beloved worlds through vision, style guides, and consumer products without breaking the promise fans fell in love with.',
  },
  {
    title: 'Drives live-service & commerce',
    body: 'Leads commerce, earnables, and live-events art on Marathon — a creative leader fluent in seasonal cadence, monetization, and the business of a live game, not just its visuals.',
  },
] as const;

// Short leadership philosophy shown on the About page.
export const leadershipPhilosophy = [
  {
    title: 'Vision that survives production',
    body: 'A visual target only matters if it holds up at gameplay distance, in a live build, months after the pitch. I set direction that teams can actually execute — and defend it through the messy middle where great games are won or lost.',
  },
  {
    title: 'One language, many hands',
    body: 'At franchise scale the job is alignment: dozens of artists, parallel productions, and seasons of live content all reading as one world. I build the style guides, review loops, and shared vocabulary that keep everyone pointed at the same north star.',
  },
  {
    title: 'Steward the world, respect the fans',
    body: 'Beloved IP is a trust. I direct with deep fluency in what makes a universe feel like itself, evolving the look without breaking the promise players fell in love with.',
  },
] as const;
