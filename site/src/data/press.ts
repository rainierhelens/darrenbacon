export type PressItem = {
  title: string;
  outlet: string;
  /** e.g. 'Interview', 'Talk', 'Award', 'Feature' */
  kind: string;
  year?: string;
  href?: string;
};

// Speaking engagements and press. Add hrefs (GDC Vault, article links) as you
// find them — the section renders fine without them.
export const press: PressItem[] = [
  {
    title: 'Killer Art Portfolio or Portfolio Killer, Part 1: Advice from Industry Artists',
    outlet: 'Game Developers Conference (GDC)',
    kind: 'Speaker',
    year: '2026',
    href: 'https://gdcvault.com/play/1035894/Killer-Art-Portfolio-or-Portfolio',
  },
  {
    title: 'Killer Portfolio or Portfolio Killer: Advice from Industry Artists',
    outlet: 'Game Developers Conference (GDC)',
    kind: 'Speaker',
    year: '2018',
    href: 'https://www.gdcvault.com/play/1024973/Killer-Portfolio-or-Portfolio-Killer',
  },
  {
    title: 'Killer Portfolio or Portfolio Killer, Part 2',
    outlet: 'Game Developers Conference (GDC)',
    kind: 'Speaker',
    year: '2017',
  },
  {
    title: 'Killer Portfolio or Portfolio Killer',
    outlet: 'Game Developers Conference (GDC)',
    kind: 'Speaker',
    year: '2015',
  },
  {
    title: 'Interview: Darren Bacon (pp. 34–41)',
    outlet: 'ImagineFX',
    kind: 'Interview',
    year: '2019',
  },
  {
    title: 'Tilting Reality',
    outlet: 'ImagineFX',
    kind: 'Feature',
    year: '2016',
  },
  {
    title: 'The Best Video Game Concept Art of 2015',
    outlet: 'Kotaku',
    kind: 'Feature',
    year: '2016',
  },
  {
    title: 'This “Halo 5” Concept Art is Downright Gorgeous',
    outlet: 'Tech Insider',
    kind: 'Feature',
    year: '2015',
  },
];
