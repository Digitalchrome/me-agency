import type { Metadata } from 'next';
import Link from 'next/link';
import { INDEXED_PAGES, INDEXED_SCRIPTS } from '@/lib/siteIndex';

export const metadata: Metadata = {
  title: 'Discover',
  description: 'Index of public pages, journal articles, and useful development scripts for ME Agency.',
};

export default function DiscoverPage() {
  const publicPages = INDEXED_PAGES.filter((page) => page.indexable);
  const adminPages = INDEXED_PAGES.filter((page) => !page.indexable);

  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      <header className="border-b-3 border-black dark:border-white pb-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-electric-blue mb-3">Index</p>
        <h1 className="font-editorial text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-4">
          Discover
        </h1>
        <p className="font-mono text-xs uppercase tracking-widest opacity-60 max-w-3xl">
          Human-readable route and script index. Public pages are indexable; admin pages are intentionally excluded from SEO indexing.
        </p>
      </header>

      <section className="space-y-6">
        <div className="flex items-center gap-6">
          <h2 className="font-editorial text-4xl md:text-5xl font-bold uppercase tracking-tighter">Public Pages</h2>
          <div className="h-[2px] flex-grow bg-black/20 dark:bg-white/20" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publicPages.map((page) => (
            <Link
              key={page.path}
              href={page.path}
              className="border-3 border-black dark:border-white p-5 hover:shadow-brutal hover:-translate-y-1 transition-all"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-electric-blue mb-2">
                {page.section}
              </p>
              <p className="font-editorial text-2xl font-bold">{page.title}</p>
              <p className="font-mono text-xs uppercase tracking-widest opacity-60 mt-2">{page.path}</p>
              <p className="text-sm opacity-70 mt-3">{page.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-6">
          <h2 className="font-editorial text-4xl md:text-5xl font-bold uppercase tracking-tighter">Admin Pages</h2>
          <div className="h-[2px] flex-grow bg-black/20 dark:bg-white/20" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {adminPages.map((page) => (
            <div key={page.path} className="border-3 border-dashed border-black/30 dark:border-white/30 p-5">
              <p className="font-editorial text-2xl font-bold">{page.title}</p>
              <p className="font-mono text-xs uppercase tracking-widest opacity-60 mt-2">{page.path}</p>
              <p className="text-sm opacity-70 mt-3">{page.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-6">
          <h2 className="font-editorial text-4xl md:text-5xl font-bold uppercase tracking-tighter">Scripts & Ops</h2>
          <div className="h-[2px] flex-grow bg-black/20 dark:bg-white/20" />
        </div>
        <div className="space-y-4">
          {INDEXED_SCRIPTS.map((script) => (
            <div key={script.name} className="border-3 border-black dark:border-white p-5">
              <div className="flex flex-wrap justify-between gap-3">
                <p className="font-editorial text-2xl font-bold">{script.name}</p>
                <code className="font-mono text-xs uppercase tracking-widest opacity-70">{script.command}</code>
              </div>
              <p className="text-sm opacity-70 mt-2">{script.purpose}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

