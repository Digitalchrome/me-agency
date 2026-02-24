import { JOURNAL_IMAGES } from '@/lib/demoImages';

export interface JournalPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
  excerpt: string;
  image: string;
  content: string[];
}

export const JOURNAL_POSTS: JournalPost[] = [
  {
    id: 1,
    slug: 'future-inclusive-fashion',
    title: 'The Future of Inclusive Fashion',
    date: 'FEB 2026',
    category: 'THOUGHTS',
    author: 'Gabriel Laurent',
    readTime: '5 min',
    excerpt:
      'How the industry is finally embracing what we have always believed: beauty has no single definition.',
    image: JOURNAL_IMAGES[1] ?? '',
    content: [
      'Inclusive fashion is no longer a side conversation. It is becoming the central creative and commercial strategy for brands that want cultural relevance.',
      'What changes outcomes is not only broader casting, but also broader decision-making: stylists, photographers, creative directors, and clients aligned on representation from the first brief.',
      'At ME Agency, we focus on presence, narrative, and emotional range. The strongest campaigns now feel human before they feel polished.',
    ],
  },
  {
    id: 2,
    slug: 'lille-new-creative-hub',
    title: 'Lille: A New Creative Hub',
    date: 'FEB 2026',
    category: 'CULTURE',
    author: 'Camille Dubois',
    readTime: '4 min',
    excerpt:
      'Why the capital of the Hauts-de-France is becoming the next epicenter of European creative talent.',
    image: JOURNAL_IMAGES[2] ?? '',
    content: [
      'Lille offers a rare mix: strong design culture, cross-border access, and a pace that allows creative teams to build real ecosystems rather than temporary scenes.',
      'Production budgets stretch further here than in traditional capitals, which means more experimentation and more opportunities for emerging talent.',
      'The city is becoming a serious launchpad for fashion, image-making, and independent production.',
    ],
  },
  {
    id: 3,
    slug: 'behind-the-scenes-summer-26',
    title: 'Behind the Scenes: Summer 26',
    date: 'JAN 2026',
    category: 'EDITORIAL',
    author: 'Marcus Williams',
    readTime: '3 min',
    excerpt: 'A raw look at our latest editorial campaign. No retouching, no compromises.',
    image: JOURNAL_IMAGES[3] ?? '',
    content: [
      'The Summer 26 shoot was built around movement, texture, and available light. We kept the set lean to preserve spontaneity.',
      'The strongest frames came between setups when talent stopped performing and simply occupied space.',
      'That is the direction we continue to push: honest image-making with high craft and low artifice.',
    ],
  },
  {
    id: 4,
    slug: 'brutalist-aesthetic-fashion',
    title: 'The Brutalist Aesthetic in Fashion',
    date: 'JAN 2026',
    category: 'DESIGN',
    author: 'Sofia Rossi',
    readTime: '6 min',
    excerpt:
      'Exploring the intersection of architectural brutalism and contemporary fashion photography.',
    image: JOURNAL_IMAGES[4] ?? '',
    content: [
      'Brutalism in fashion imagery is not about harshness for its own sake. It is about structure, honesty of materials, and visible intention.',
      'Typography, composition, and lighting can all carry this language without sacrificing elegance.',
      'When used carefully, brutalist references create a visual framework that gives more power to the model, not less.',
    ],
  },
  {
    id: 5,
    slug: 'diversity-report-2026',
    title: 'Diversity Report 2026',
    date: 'JAN 2026',
    category: 'DATA',
    author: 'ME Agency',
    readTime: '8 min',
    excerpt:
      'Our first annual report on diversity, inclusion, and representation across the fashion industry.',
    image: JOURNAL_IMAGES[5] ?? '',
    content: [
      'The report tracks representation across campaign types, decision roles, and geographic markets. Progress exists, but it is uneven and often seasonal.',
      'Brands that outperform are the ones with repeat commitments, not one-off inclusive statements.',
      'We publish this report to make discussions more specific and to encourage measurable standards.',
    ],
  },
  {
    id: 6,
    slug: 'what-makes-a-model-in-2026',
    title: 'What Makes a Model in 2026',
    date: 'DEC 2025',
    category: 'THOUGHTS',
    author: 'Gabriel Laurent',
    readTime: '4 min',
    excerpt:
      'It is not about measurements anymore. It is about energy, presence, and the courage to be yourself.',
    image: JOURNAL_IMAGES[6] ?? '',
    content: [
      'Technical standards still matter, but they are no longer enough. Presence is now the differentiator brands remember.',
      'Models are expected to collaborate, interpret direction, and contribute to the emotional quality of an image.',
      'The future belongs to people who can hold attention without pretending to be someone else.',
    ],
  },
];

export function getJournalPostBySlug(slug: string) {
  return JOURNAL_POSTS.find((post) => post.slug === slug);
}

