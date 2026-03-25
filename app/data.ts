// ── MARQUEE ──

export const MARQUEE_TEXT =
  "CONCERT ARTIST · TBILISI · LONDON · VIENNA · BERLIN · PARIS · NEW YORK · TOKYO · AMSTERDAM · ";

// ── ABOUT / BIOGRAPHY ──

export interface BioChapterData {
  label: string;
  text: string;
}

export const bioChapters: BioChapterData[] = [
  {
    label: "Early Life",
    text: "Born in Tbilisi, Georgia, in 1997, Lizi Ramishvili began her journey with the cello at the tender age of seven. Under the guidance of Professor Tamara Gabarashvili at the Paliashvili Central Music School, she quickly showcased her prodigious talent, delivering her first public performance just over a year into her studies.",
  },
  {
    label: "Education",
    text: "Lizi's dedication led her to the Pre-College division of the Kronberg Academy in Germany, studying under the esteemed cellist Frans Helmerson, and later to the Haute École de Musique de Genève in Switzerland. In 2017, she was accepted into the Reina Sofía School of Music in Madrid under Professor Jens Peter Maintz, supported by a scholarship from the Fundación Albéniz and a Fernando Solar González instrument scholarship.",
  },
  {
    label: "Competitions & Awards",
    text: "Lizi's talent has been recognised in numerous international competitions. She secured the First Prize and Golden Nutcracker at the Nutcracker International TV Competition in Russia, and the Grand Prize at the Renaissance International Competition in Armenia. In 2012 she represented Georgia at the Classical Eurovision Competition. In 2017 she received the Zhvania Tsinandali Award for Young Scholars and Artists, and has held full scholarships from the foundations of Mstislav Rostropovich, Nikolai Miaskovsky, Boris Pergamenschikov, and Boris Ustinov.",
  },
  {
    label: "Performances & Festivals",
    text: "Her performance career spans the world's most prestigious venues — Carnegie Hall in New York, the Berlin Konzerthaus, and countless international festivals including the Rheingau Music Festival, Ruhr Piano Festival, Musica Mundi, Young Euro Classic, Kronberg Academy Festival, Schubertiade Festival, Al Bustan, and the International Mstislav Rostropovich Festival, among many others.",
  },
  {
    label: "Collaborations",
    text: "Lizi has collaborated with Ivry Gitlis, Yuri Bashmet, Renaud Capuçon, Khatia Buniatishvili, Gvantsa Buniatishvili, Kazuki Yamada, Gianandrea Noseda, and Pietari Inkinen. She has performed with the Deutsche Radio Philharmonie Saarbrücken Kaiserslautern, Real Filharmonía de Galicia, Tbilisi Symphony Orchestra, Georgian Philharmonic Orchestra, National Chamber Orchestra of Armenia, National Symphony Orchestra of Azerbaijan, Novaya Rossiya State Symphony Orchestra, and the Tchaikovsky Symphony Orchestra, among others.",
  },
];

export const BIO_IMAGES = [
  "/images/biography/bio1.jpg",
  "/images/biography/bio2.jpg",
  "/images/biography/bio3.jpg",
  "/images/biography/bio4.jpg",
];

// ── RECOGNITION ──

export interface CompetitionData {
  numeral: string;
  prize: string;
  name: string;
  year: string | null;
  location: string;
}

export const competitions: CompetitionData[] = [
  {
    numeral: "I",
    prize: "First Prize · Golden Nutcracker",
    name: "Nutcracker International TV Competition",
    year: "2010",
    location: "Russia",
  },
  {
    numeral: "I",
    prize: "Grand Prix",
    name: "Renaissance International Competition",
    year: null,
    location: "Armenia",
  },
  {
    numeral: "✦",
    prize: "National Winner — International Final",
    name: "Classical Eurovision Competition",
    year: "2012",
    location: "Georgia",
  },
  {
    numeral: "✦",
    prize: "Special Finalist Prize · €1,000",
    name: "Classic Strings Cello Competition",
    year: null,
    location: "International",
  },
];

export interface HonourData {
  year: string;
  name: string;
  detail: string;
}

export const honours: HonourData[] = [
  {
    year: "2017",
    name: "Zhvania Tsinandali Award",
    detail: "For Young Scholars and Artists · Georgia",
  },
  {
    year: "2021",
    name: "Forbes Georgia — 30 Under 30",
    detail: "Culture & Style Category",
  },
];

export interface ScholarshipData {
  name: string;
  note: string;
}

export const scholarships: ScholarshipData[] = [
  {
    name: "Fundación Albéniz",
    note: "Full scholarship + Fernando Solar González cello · Reina Sofía School, Madrid",
  },
  { name: "Mstislav Rostropovich Foundation", note: "Full scholarship" },
  { name: "Nikolai Miaskovsky Foundation", note: "Full scholarship" },
  { name: "Boris Pergamenschikov Foundation", note: "Full scholarship" },
  { name: "Boris Ustinov Foundation", note: "Full scholarship" },
];

// ── STAGES ──

export const STAGES_ALSO =
  "Barbican London · Musica Mundi · Al Bustan Festival · Kronberg Academy · Ruhr Piano Festival · Casals Festival · ";

export interface StageData {
  id: string;
  name: string;
  location: string;
  festival: string | null;
  image: string | null;
}

export const stages: StageData[] = [
  {
    id: "carnegie",
    name: "Carnegie Hall",
    location: "New York, USA",
    festival: null,
    image: "/images/stages/carnegie-hall.jpg",
  },
  {
    id: "kloster",
    name: "Kloster Eberbach",
    location: "Rheingau, Germany",
    festival: "Rheingau Musik Festival",
    image: "/images/stages/kloster-eberbach.jpg",
  },
  {
    id: "tbilisi",
    name: "Tbilisi Conservatoire",
    location: "Tbilisi, Georgia",
    festival: "International Rostropovich Festival",
    image: "/images/stages/tbilisi-conservatoire.jpg",
  },
  {
    id: "berlin",
    name: "Konzerthaus Berlin",
    location: "Berlin, Germany",
    festival: "Young Euro Classic",
    image: null,
  },
  {
    id: "schubertiade",
    name: "Schubertiade",
    location: "Schwarzenberg, Austria",
    festival: "Schubertiade Festival",
    image: null,
  },
  {
    id: "gstaad",
    name: "Sommets Musicaux",
    location: "Gstaad, Switzerland",
    festival: "Sommets Musicaux de Gstaad",
    image: null,
  },
];

// ── REPERTOIRE ──

export interface RepertoireItemData {
  piece: string;
  composer: string;
  opus: string;
}

export const repertoire: RepertoireItemData[] = [
  {
    piece: "Cello Concerto in B minor",
    composer: "Antonín Dvořák",
    opus: "Op. 104",
  },
  {
    piece: "Cello Concerto in E minor",
    composer: "Edward Elgar",
    opus: "Op. 85",
  },
  {
    piece: "Cello Concerto No. 1",
    composer: "Dmitri Shostakovich",
    opus: "Op. 107",
  },
  {
    piece: "Six Suites for Solo Cello",
    composer: "Johann Sebastian Bach",
    opus: "BWV 1007–1012",
  },
  {
    piece: "Cello Sonata in A major",
    composer: "Ludwig van Beethoven",
    opus: "Op. 69",
  },
  {
    piece: "Cello Concerto in A minor",
    composer: "Camille Saint-Saëns",
    opus: "Op. 33",
  },
  {
    piece: "Don Quixote",
    composer: "Richard Strauss",
    opus: "Op. 35",
  },
];

export const fullRepertoire: RepertoireItemData[] = [
  { piece: "Cello Concerto in B minor", composer: "Antonín Dvořák", opus: "Op. 104" },
  { piece: "Cello Concerto in E minor", composer: "Edward Elgar", opus: "Op. 85" },
  { piece: "Cello Concerto No. 1", composer: "Dmitri Shostakovich", opus: "Op. 107" },
  { piece: "Six Suites for Solo Cello", composer: "Johann Sebastian Bach", opus: "BWV 1007–1012" },
  { piece: "Cello Sonata in A major", composer: "Ludwig van Beethoven", opus: "Op. 69" },
  { piece: "Cello Concerto in A minor", composer: "Camille Saint-Saëns", opus: "Op. 33" },
  { piece: "Don Quixote", composer: "Richard Strauss", opus: "Op. 35" },
  { piece: "Cello Concerto No. 2", composer: "Dmitri Shostakovich", opus: "Op. 126" },
  { piece: "Variations on a Rococo Theme", composer: "Pyotr Ilyich Tchaikovsky", opus: "Op. 33" },
  { piece: "Cello Concerto", composer: "Robert Schumann", opus: "Op. 129" },
  { piece: "Kol Nidrei", composer: "Max Bruch", opus: "Op. 47" },
  { piece: "Cello Sonata No. 1", composer: "Johannes Brahms", opus: "Op. 38" },
  { piece: "Cello Sonata No. 2", composer: "Johannes Brahms", opus: "Op. 99" },
  { piece: "Cello Sonata in D minor", composer: "Claude Debussy", opus: "L. 135" },
  { piece: "Cello Sonata", composer: "Sergei Prokofiev", opus: "Op. 119" },
  { piece: "Cello Concerto No. 1", composer: "Camille Saint-Saëns", opus: "Op. 33" },
  { piece: "Pezzo Capriccioso", composer: "Pyotr Ilyich Tchaikovsky", opus: "Op. 62" },
  { piece: "Arpeggione Sonata", composer: "Franz Schubert", opus: "D. 821" },
];

// ── PRESS & MEDIA ──

export interface PressCellData {
  /** Index-keyed grid class name (resolved in PressSection against CSS module) */
  gridKey: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  imageSizes: string;
  label: string;
  lines: string[];
  /** Extra CSS module class key for the text element (resolved in PressSection) */
  textClassKey: string;
}

export const pressCells: PressCellData[] = [
  {
    gridKey: "gi1",
    href: "https://georgiatoday.ge/three-people-two-centuries-one-hall-a-chamber-music-night-at-the-tbilisi-conservatoire/",
    imageSrc: "/images/lizi-press.jpg",
    imageAlt: "Lizi Ramishvili performance",
    imageSizes: "(max-width:860px) 100vw, 58vw",
    label: "— Georgia Today",
    lines: ["\u201cThe cello seemed", "to sing as Brahms", "intended\u201d"],
    textClassKey: "",
  },
  {
    gridKey: "gi2",
    href: "http://georgiatoday.ge/news/4572/Georgian-Musicians-to-Perform-at-Carnegie-Hall",
    imageSrc: "/images/stages/carnegie-hall.jpg",
    imageAlt: "Carnegie Hall",
    imageSizes: "(max-width:860px) 100vw, 42vw",
    label: "Carnegie Hall, NYC",
    lines: ["US", "Debut"],
    textClassKey: "gcLargeNum",
  },
  {
    gridKey: "gi3",
    href: "https://agenda.ge/en/news/2017/1776",
    imageSrc: "/images/stages/kloster-eberbach.jpg",
    imageAlt: "Kloster Eberbach, Rheingau",
    imageSizes: "(max-width:860px) 100vw, 42vw",
    label: "Kloster Eberbach",
    lines: ["Georgian", "Overtones"],
    textClassKey: "",
  },
  {
    gridKey: "gi4",
    href: "https://www.facebook.com/khatiabuniatishvili/photos/1268180713234781/",
    imageSrc: "/images/biography/bio2.jpg",
    imageAlt: "Lizi Ramishvili",
    imageSizes: "(max-width:860px) 100vw, 33vw",
    label: "— Khatia Buniatishvili",
    lines: ["\u201cAn amazing", "talent\u201d"],
    textClassKey: "",
  },
  {
    gridKey: "gi5",
    href: "https://www.liziramishvili.com/",
    imageSrc: "/images/biography/bio4.jpg",
    imageAlt: "Lizi Ramishvili",
    imageSizes: "(max-width:860px) 100vw, 33vw",
    label: "Forbes Georgia",
    lines: ["30 Under", "30 \u00b7 2021"],
    textClassKey: "",
  },
  {
    gridKey: "gi6",
    href: "https://www.sommets-musicaux.com/artist/lizi-ramishvili/?lang=en",
    imageSrc: "/images/biography/bio1.jpg",
    imageAlt: "Lizi Ramishvili at festival",
    imageSizes: "(max-width:860px) 100vw, 33vw",
    label: "Kronberg \u00b7 Gstaad \u00b7 Rheingau",
    lines: ["Festival", "Artist"],
    textClassKey: "",
  },
];

// ── SCHEDULE ──

export interface ScheduleEventData {
  id: number;
  day: string;
  month: string;
  year: string;
  time: string;
  venue: string;
  city: string;
  programme: string;
  status: "tickets" | "enquire" | "sold-out";
  link: string;
}

// Schedule data is now managed via MongoDB.
// Use the seed script to populate: npx ts-node scripts/seed-schedule.ts

// ── CONTACT ──

export interface ContactDetailData {
  label: string;
  value: string;
}

export const contactDetails: ContactDetailData[] = [
  { label: "Management", value: "management@liziramishvili.com" },
  { label: "Bookings", value: "bookings@liziramishvili.com" },
  { label: "Press & Media", value: "press@liziramishvili.com" },
];
