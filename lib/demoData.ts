import type { Model } from './types';

/**
 * Données de démo réalistes pour le MVP
 * Realistic demo data for the MVP prototype
 *
 * Les images utilisent placehold.co avec des couleurs variées
 * Images use placehold.co with varied color palettes
 */

// Helper pour créer des images portfolio fictives
// Helper to create fake portfolio images
function fakePortfolio(name: string, count: number) {
  const palettes = [
    { bg: '1a1a1a', fg: 'ffffff' },
    { bg: '2c2c2c', fg: 'e0e0e0' },
    { bg: '0d0d0d', fg: 'cccccc' },
    { bg: '1f1f2e', fg: 'c8c8ff' },
    { bg: '2e1f1f', fg: 'ffc8c8' },
  ];
  return Array.from({ length: count }, (_, i) => ({
    _type: 'image' as const,
    asset: {
      _ref: `portfolio-${name.toLowerCase().replace(/\s/g, '-')}-${i}`,
      _type: 'reference' as const,
    },
    // Metadata used by demo mode rendering
    _demoUrl: `https://placehold.co/800x${i % 2 === 0 ? '1200' : '800'}/${palettes[i % palettes.length]?.bg ?? '1a1a1a'}/${palettes[i % palettes.length]?.fg ?? 'ffffff'}?text=${encodeURIComponent(name + ' #' + (i + 1))}&font=montserrat`,
  }));
}

export const DEMO_MODELS: Model[] = [
  {
    _id: 'demo-1',
    name: 'Amara Diallo',
    slug: { current: 'amara-diallo' },
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
    portfolio: fakePortfolio('Amara Diallo', 5),
    polaroids: [],
    coverImage: {
      _type: 'image',
      asset: { _ref: 'placeholder', _type: 'reference' },
    },
  },
  {
    _id: 'demo-2',
    name: 'Luca Bianchi',
    slug: { current: 'luca-bianchi' },
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
    portfolio: fakePortfolio('Luca Bianchi', 4),
    polaroids: [],
    coverImage: {
      _type: 'image',
      asset: { _ref: 'placeholder', _type: 'reference' },
    },
  },
  {
    _id: 'demo-3',
    name: 'Yuki Tanaka',
    slug: { current: 'yuki-tanaka' },
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
    portfolio: fakePortfolio('Yuki Tanaka', 4),
    polaroids: [],
    coverImage: {
      _type: 'image',
      asset: { _ref: 'placeholder', _type: 'reference' },
    },
  },
  {
    _id: 'demo-4',
    name: 'Elias Nordström',
    slug: { current: 'elias-nordstrom' },
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
    portfolio: fakePortfolio('Elias Nordström', 5),
    polaroids: [],
    coverImage: {
      _type: 'image',
      asset: { _ref: 'placeholder', _type: 'reference' },
    },
  },
  {
    _id: 'demo-5',
    name: 'Zara Okonkwo',
    slug: { current: 'zara-okonkwo' },
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
    portfolio: fakePortfolio('Zara Okonkwo', 5),
    polaroids: [],
    coverImage: {
      _type: 'image',
      asset: { _ref: 'placeholder', _type: 'reference' },
    },
  },
  {
    _id: 'demo-6',
    name: 'Milo Fontaine',
    slug: { current: 'milo-fontaine' },
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
    portfolio: fakePortfolio('Milo Fontaine', 4),
    polaroids: [],
    coverImage: {
      _type: 'image',
      asset: { _ref: 'placeholder', _type: 'reference' },
    },
  },
  {
    _id: 'demo-7',
    name: 'Ines Morel',
    slug: { current: 'ines-morel' },
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
    portfolio: fakePortfolio('Ines Morel', 3),
    polaroids: [],
    coverImage: {
      _type: 'image',
      asset: { _ref: 'placeholder', _type: 'reference' },
    },
  },
  {
    _id: 'demo-8',
    name: 'Kwame Asante',
    slug: { current: 'kwame-asante' },
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
    portfolio: fakePortfolio('Kwame Asante', 5),
    polaroids: [],
    coverImage: {
      _type: 'image',
      asset: { _ref: 'placeholder', _type: 'reference' },
    },
  },
  {
    _id: 'demo-9',
    name: 'Sasha Volkov',
    slug: { current: 'sasha-volkov' },
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
    portfolio: fakePortfolio('Sasha Volkov', 4),
    polaroids: [],
    coverImage: {
      _type: 'image',
      asset: { _ref: 'placeholder', _type: 'reference' },
    },
  },
  {
    _id: 'demo-10',
    name: 'Léa Dubois',
    slug: { current: 'lea-dubois' },
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
    portfolio: fakePortfolio('Léa Dubois', 4),
    polaroids: [],
    coverImage: {
      _type: 'image',
      asset: { _ref: 'placeholder', _type: 'reference' },
    },
  },
];

/**
 * Helper pour obtenir un modèle par slug
 * Helper to get a model by slug
 */
export function getDemoModelBySlug(slug: string): Model | undefined {
  return DEMO_MODELS.find((model) => model.slug.current === slug);
}

/**
 * Helper pour vérifier si on est en mode démo
 * Helper to check if we're in demo mode
 */
export function isDemoMode(): boolean {
  return process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'demo-project';
}
