export type Publication = {
  title: string;
  role: string;
  publisher: string;
  year: string;
  /** Cover image filename in /images/book_publications (encoded at render). */
  image: string;
  /** Purchase / publisher link. */
  href?: string;
};

// Sorted most-recent first so the prestige franchise art books (Star Wars,
// Halo Infinite) lead. Add new titles anywhere; keep the year accurate.
export const publications: Publication[] = [
  {
    title: 'The Art of Star Wars: Galaxy’s Edge',
    role: 'Artist',
    publisher: 'Abrams Books',
    year: '2021',
    image: 'The-Art-of-Star-Wars_Galaxys-Edge.jpg',
    href: 'https://www.amazon.com/dp/1419750127',
  },
  {
    title: 'Art of Halo Infinite',
    role: 'Featured Artist',
    publisher: '343 Industries',
    year: '2021',
    image: 'Art of Halo Infinite.jpg',
    href: 'https://www.amazon.com/dp/1506720080',
  },
  {
    title: 'Nuthin’ But Mech 4',
    role: 'Contributing Artist',
    publisher: 'Design Studio Press',
    year: '2018',
    image: 'Nuthin But Mech 4.jpg',
    href: 'https://www.amazon.com/dp/1624650384',
  },
  {
    title: 'Halo Warfleet',
    role: 'Contributing Artist / Special Thanks',
    publisher: '343 Industries',
    year: '2017',
    image: 'Halo-Warfleet.jpg',
    href: 'https://www.amazon.com/dp/1681198320',
  },
  {
    title: 'Halo Mythos: A Guide to the Story of Halo',
    role: 'Contributing Artist / Special Thanks',
    publisher: '343 Industries',
    year: '2016',
    image: 'Halo Mythos A Guide to the Story of Halo.jpg',
    href: 'https://www.amazon.com/dp/1681194775',
  },
  {
    title: 'Robota',
    role: 'Contributing Artist',
    publisher: 'Dover Publications',
    year: '2016',
    image: 'Robota.jpg',
    href: 'https://a.co/d/0cdk0lUA',
  },
  {
    title: 'The Art of Halo 5: Guardians',
    role: 'Contributing Artist / Interviewee',
    publisher: 'Insight Editions',
    year: '2015',
    image: 'The Art of Halo 5 Guardians.jpg',
    href: 'https://www.amazon.com/dp/1405281839',
  },
  {
    title: 'Nuthin’ But Mech 3',
    role: 'Contributing Artist',
    publisher: 'Design Studio Press',
    year: '2015',
    image: 'Nuthin But Mech 3.jpg',
    href: 'https://a.co/d/09jNxLPc',
  },
  {
    title: 'The Art of Destiny',
    role: 'Artist',
    publisher: 'Insight Editions',
    year: '2014',
    image: 'The Art of Destiny.jpg',
    href: 'https://a.co/d/0hvQgvWs',
  },
  {
    title: 'Blast: Spaceship Sketches and Renderings',
    role: 'Guest Artist',
    publisher: 'Design Studio Press',
    year: '2012',
    image: 'blast.jpg',
    href: 'https://designstudiopress.com/products/blast',
  },
  {
    title: 'The Art of Disney’s A Christmas Carol',
    role: 'Contributing Artist',
    publisher: 'Disney Editions',
    year: '2009',
    image: 'The Art of Disneys A Christmas Carol.jpg',
    href: 'https://a.co/d/0fE2bV57',
  },
  {
    title: 'In the Future…',
    role: 'Co-author',
    publisher: 'Design Studio Press',
    year: '2006',
    image: 'in-the-future.png',
    href: 'https://designstudiopress.com/products/in-the-future',
  },
];
