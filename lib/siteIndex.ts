import { JOURNAL_POSTS } from '@/lib/journalData';

export type IndexedPage = {
  title: string;
  path: string;
  section: 'Public' | 'Legal' | 'Journal' | 'Admin';
  description: string;
  indexable: boolean;
};

export type IndexedScript = {
  name: string;
  command: string;
  purpose: string;
};

export const INDEXED_PAGES: IndexedPage[] = [
  { title: 'Home', path: '/', section: 'Public', description: 'Roster, brand story, featured models, and calls to action.', indexable: true },
  { title: 'Agency', path: '/agency', section: 'Public', description: 'Agency services, team positioning, and brand approach.', indexable: true },
  { title: 'About', path: '/about', section: 'Public', description: 'Story and philosophy of the agency.', indexable: true },
  { title: 'Journal', path: '/journal', section: 'Journal', description: 'Editorial and agency articles.', indexable: true },
  { title: 'Join', path: '/join', section: 'Public', description: 'Model application page and submission form.', indexable: true },
  { title: 'Booking', path: '/booking', section: 'Public', description: 'Client booking request page and form.', indexable: true },
  { title: 'Contact', path: '/contact', section: 'Public', description: 'Contact details and inquiry form.', indexable: true },
  { title: 'Privacy', path: '/privacy', section: 'Legal', description: 'Privacy policy.', indexable: true },
  { title: 'Terms', path: '/terms', section: 'Legal', description: 'Terms of service.', indexable: true },
  { title: 'GDPR', path: '/gdpr', section: 'Legal', description: 'GDPR compliance information.', indexable: true },
  { title: 'Discover', path: '/discover', section: 'Public', description: 'Human-readable index of pages and scripts.', indexable: true },
  { title: 'Admin Dashboard', path: '/admin', section: 'Admin', description: 'Submission ops dashboard (token protected).', indexable: false },
  { title: 'Admin Join Queue', path: '/admin/submissions/join', section: 'Admin', description: 'Join applications review queue.', indexable: false },
  { title: 'Admin Booking Queue', path: '/admin/submissions/bookings', section: 'Admin', description: 'Booking requests review queue.', indexable: false },
  ...JOURNAL_POSTS.map((post) => ({
    title: post.title,
    path: `/journal/${post.slug}`,
    section: 'Journal' as const,
    description: post.excerpt,
    indexable: true,
  })),
];

export const INDEXED_SCRIPTS: IndexedScript[] = [
  { name: 'dev', command: 'npm run dev', purpose: 'Start Next.js development server.' },
  { name: 'build', command: 'npm run build', purpose: 'Create production build.' },
  { name: 'start', command: 'npm run start', purpose: 'Run production build locally.' },
  { name: 'lint', command: 'npm run lint', purpose: 'Run ESLint checks.' },
  { name: 'type-check', command: 'npm run type-check', purpose: 'Run TypeScript typecheck.' },
  { name: 'generate:demo', command: 'npm run generate:demo -- --count=18 --seed=20260224', purpose: 'Generate reproducible fake demo profiles.' },
  { name: 'admin seed api', command: 'POST /api/admin/demo/seed?token=demo-admin', purpose: 'Seed fake join and booking submissions.' },
];

