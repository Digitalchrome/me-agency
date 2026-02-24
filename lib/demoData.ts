import type { Model, ModelCategory, ModelGender, ModelStatus } from './types';

type DemoImage = {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  _demoUrl: string;
};

type DemoSeed = {
  id: string;
  name: string;
  slug: string;
  status: ModelStatus;
  gender: ModelGender;
  category: ModelCategory;
  location: string;
  height: number;
  bust: number;
  waist: number;
  hips: number;
  shoe: number;
  hair: string;
  eyes: string;
  portfolioCount: number;
  polaroidCount?: number;
};

const PORTFOLIO_PALETTES = [
  { bg: '1a1a1a', fg: 'ffffff' },
  { bg: '2c2c2c', fg: 'e0e0e0' },
  { bg: '101820', fg: 'f7f7f7' },
  { bg: '1f1f2e', fg: 'c8c8ff' },
  { bg: '2e1f1f', fg: 'ffc8c8' },
  { bg: '1a2e25', fg: 'ccffe8' },
];

const POLAROID_PALETTES = [
  { bg: 'f4f4f4', fg: '111111' },
  { bg: 'efefef', fg: '1a1a1a' },
  { bg: 'f8f0ea', fg: '222222' },
];
const DEFAULT_PORTFOLIO_PALETTE = PORTFOLIO_PALETTES[0]!;
const DEFAULT_POLAROID_PALETTE = POLAROID_PALETTES[0]!;

function makeDemoImage(label: string, refPrefix: string, index: number, width: number, height: number, palette: { bg: string; fg: string }): DemoImage {
  return {
    _type: 'image',
    asset: {
      _ref: `${refPrefix}-${index}`,
      _type: 'reference',
    },
    _demoUrl: `https://placehold.co/${width}x${height}/${palette.bg}/${palette.fg}?text=${encodeURIComponent(label)}&font=montserrat`,
  };
}

function fakePortfolio(name: string, count: number): DemoImage[] {
  return Array.from({ length: count }, (_, i) =>
    makeDemoImage(
      `${name} Portfolio ${i + 1}`,
      `portfolio-${name.toLowerCase().replace(/\s+/g, '-')}`,
      i,
      800,
      i % 2 === 0 ? 1200 : 800,
      PORTFOLIO_PALETTES[i % PORTFOLIO_PALETTES.length] ?? DEFAULT_PORTFOLIO_PALETTE
    )
  );
}

function fakePolaroids(name: string, count: number): DemoImage[] {
  return Array.from({ length: count }, (_, i) =>
    makeDemoImage(
      `${name} Polaroid ${i + 1}`,
      `polaroid-${name.toLowerCase().replace(/\s+/g, '-')}`,
      i,
      900,
      1200,
      POLAROID_PALETTES[i % POLAROID_PALETTES.length] ?? DEFAULT_POLAROID_PALETTE
    )
  );
}

function makeModel(seed: DemoSeed): Model {
  return {
    _id: seed.id,
    name: seed.name,
    slug: { current: seed.slug },
    status: seed.status,
    gender: seed.gender,
    category: seed.category,
    location: seed.location,
    height: seed.height,
    bust: seed.bust,
    waist: seed.waist,
    hips: seed.hips,
    shoe: seed.shoe,
    hair: seed.hair,
    eyes: seed.eyes,
    portfolio: fakePortfolio(seed.name, seed.portfolioCount),
    polaroids: fakePolaroids(seed.name, seed.polaroidCount ?? 3),
    coverImage: {
      _type: 'image',
      asset: { _ref: `cover-${seed.slug}`, _type: 'reference' },
    },
  };
}

const DEMO_SEEDS: DemoSeed[] = [
  {
    id: 'demo-1',
    name: 'Amara Diallo',
    slug: 'amara-diallo',
    status: 'Available',
    gender: 'Female',
    category: 'Mainboard',
    location: 'Paris, France',
    height: 178,
    bust: 84,
    waist: 60,
    hips: 89,
    shoe: 39,
    hair: 'Black',
    eyes: 'Brown',
    portfolioCount: 5,
  },
  {
    id: 'demo-2',
    name: 'Luca Bianchi',
    slug: 'luca-bianchi',
    status: 'Available',
    gender: 'Male',
    category: 'Mainboard',
    location: 'Milan, Italy',
    height: 188,
    bust: 98,
    waist: 78,
    hips: 93,
    shoe: 43,
    hair: 'Brown',
    eyes: 'Green',
    portfolioCount: 4,
  },
  {
    id: 'demo-3',
    name: 'Yuki Tanaka',
    slug: 'yuki-tanaka',
    status: 'Travel',
    gender: 'Female',
    category: 'Development',
    location: 'Tokyo, Japan',
    height: 172,
    bust: 80,
    waist: 58,
    hips: 86,
    shoe: 37,
    hair: 'Black',
    eyes: 'Dark Brown',
    portfolioCount: 4,
  },
  {
    id: 'demo-4',
    name: 'Elias Nordstrom',
    slug: 'elias-nordstrom',
    status: 'Available',
    gender: 'Male',
    category: 'Mainboard',
    location: 'Stockholm, Sweden',
    height: 191,
    bust: 100,
    waist: 80,
    hips: 95,
    shoe: 44,
    hair: 'Blonde',
    eyes: 'Blue',
    portfolioCount: 5,
  },
  {
    id: 'demo-5',
    name: 'Zara Okonkwo',
    slug: 'zara-okonkwo',
    status: 'Available',
    gender: 'Female',
    category: 'Mainboard',
    location: 'London, UK',
    height: 180,
    bust: 86,
    waist: 62,
    hips: 90,
    shoe: 40,
    hair: 'Braids',
    eyes: 'Brown',
    portfolioCount: 5,
  },
  {
    id: 'demo-6',
    name: 'Milo Fontaine',
    slug: 'milo-fontaine',
    status: 'Available',
    gender: 'Male',
    category: 'Classic',
    location: 'Lille, France',
    height: 184,
    bust: 96,
    waist: 76,
    hips: 92,
    shoe: 42,
    hair: 'Dark Brown',
    eyes: 'Hazel',
    portfolioCount: 4,
  },
  {
    id: 'demo-7',
    name: 'Ines Morel',
    slug: 'ines-morel',
    status: 'Travel',
    gender: 'Female',
    category: 'Development',
    location: 'Marseille, France',
    height: 175,
    bust: 82,
    waist: 59,
    hips: 87,
    shoe: 38,
    hair: 'Auburn',
    eyes: 'Green',
    portfolioCount: 3,
  },
  {
    id: 'demo-8',
    name: 'Kwame Asante',
    slug: 'kwame-asante',
    status: 'Available',
    gender: 'Male',
    category: 'Mainboard',
    location: 'New York, USA',
    height: 186,
    bust: 99,
    waist: 79,
    hips: 94,
    shoe: 43,
    hair: 'Black',
    eyes: 'Dark Brown',
    portfolioCount: 5,
  },
  {
    id: 'demo-9',
    name: 'Sasha Volkov',
    slug: 'sasha-volkov',
    status: 'Unavailable',
    gender: 'Non-Binary',
    category: 'Development',
    location: 'Berlin, Germany',
    height: 177,
    bust: 85,
    waist: 64,
    hips: 88,
    shoe: 40,
    hair: 'Platinum',
    eyes: 'Grey',
    portfolioCount: 4,
  },
  {
    id: 'demo-10',
    name: 'Lea Dubois',
    slug: 'lea-dubois',
    status: 'Available',
    gender: 'Female',
    category: 'Classic',
    location: 'Paris, France',
    height: 176,
    bust: 83,
    waist: 61,
    hips: 88,
    shoe: 39,
    hair: 'Chestnut',
    eyes: 'Blue',
    portfolioCount: 4,
  },
  {
    id: 'demo-11',
    name: 'Noah Ben Salem',
    slug: 'noah-ben-salem',
    status: 'Available',
    gender: 'Male',
    category: 'Development',
    location: 'Casablanca, Morocco',
    height: 187,
    bust: 97,
    waist: 77,
    hips: 91,
    shoe: 43,
    hair: 'Black',
    eyes: 'Amber',
    portfolioCount: 4,
  },
  {
    id: 'demo-12',
    name: 'Aisha Rahman',
    slug: 'aisha-rahman',
    status: 'Travel',
    gender: 'Female',
    category: 'Mainboard',
    location: 'Dubai, UAE',
    height: 179,
    bust: 85,
    waist: 61,
    hips: 90,
    shoe: 40,
    hair: 'Black',
    eyes: 'Brown',
    portfolioCount: 5,
  },
  {
    id: 'demo-13',
    name: 'Mateo Alvarez',
    slug: 'mateo-alvarez',
    status: 'Available',
    gender: 'Male',
    category: 'Classic',
    location: 'Madrid, Spain',
    height: 183,
    bust: 95,
    waist: 75,
    hips: 90,
    shoe: 42,
    hair: 'Dark Brown',
    eyes: 'Brown',
    portfolioCount: 3,
  },
  {
    id: 'demo-14',
    name: 'Eden Park',
    slug: 'eden-park',
    status: 'Available',
    gender: 'Non-Binary',
    category: 'Mainboard',
    location: 'Seoul, South Korea',
    height: 181,
    bust: 87,
    waist: 63,
    hips: 90,
    shoe: 40,
    hair: 'Jet Black',
    eyes: 'Dark Brown',
    portfolioCount: 5,
  },
  {
    id: 'demo-15',
    name: 'Chloe Martin',
    slug: 'chloe-martin',
    status: 'Unavailable',
    gender: 'Female',
    category: 'Classic',
    location: 'Montreal, Canada',
    height: 174,
    bust: 82,
    waist: 60,
    hips: 87,
    shoe: 38,
    hair: 'Blonde',
    eyes: 'Blue',
    portfolioCount: 4,
  },
  {
    id: 'demo-16',
    name: 'Tariq Johnson',
    slug: 'tariq-johnson',
    status: 'Available',
    gender: 'Male',
    category: 'Mainboard',
    location: 'Los Angeles, USA',
    height: 189,
    bust: 101,
    waist: 81,
    hips: 96,
    shoe: 44,
    hair: 'Black',
    eyes: 'Brown',
    portfolioCount: 5,
  },
  {
    id: 'demo-17',
    name: 'Mina Kovac',
    slug: 'mina-kovac',
    status: 'Travel',
    gender: 'Female',
    category: 'Development',
    location: 'Belgrade, Serbia',
    height: 177,
    bust: 84,
    waist: 60,
    hips: 89,
    shoe: 39,
    hair: 'Copper',
    eyes: 'Green',
    portfolioCount: 4,
  },
  {
    id: 'demo-18',
    name: 'Sam Rivera',
    slug: 'sam-rivera',
    status: 'Available',
    gender: 'Non-Binary',
    category: 'Classic',
    location: 'Mexico City, Mexico',
    height: 178,
    bust: 88,
    waist: 66,
    hips: 91,
    shoe: 41,
    hair: 'Dark Brown',
    eyes: 'Hazel',
    portfolioCount: 4,
  },
];

export const DEMO_MODELS: Model[] = DEMO_SEEDS.map(makeModel);

export function getDemoModelBySlug(slug: string): Model | undefined {
  return DEMO_MODELS.find((model) => model.slug.current === slug);
}

export function isDemoMode(): boolean {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  return !projectId || projectId === 'demo-project';
}
