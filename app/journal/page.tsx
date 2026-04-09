import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { JOURNAL_POSTS } from '@/lib/journalData';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Stories, editorials, and observations from ME Modeling Agency.',
};

const POSTS = JOURNAL_POSTS;

export default function JournalPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      {/* Header */}
      <div className="flex justify-between items-end mb-20 border-b-3 border-black dark:border-white pb-8">
        <h1 className="font-editorial text-7xl md:text-9xl font-bold uppercase tracking-tighter">
          Journal
        </h1>
        <div className="font-mono text-xs uppercase tracking-widest text-right hidden md:block">
          <p>Stories &amp; Observations</p>
          <p className="text-gray-500">Volume 01 / Issue 01</p>
        </div>
      </div>

      {/* Featured Post */}
      {(() => {
        const featured = POSTS[0];
        if (!featured) return null;
        return (
          <article className="mb-20 group">
            <Link href={`/journal/${featured.slug}`} className="grid grid-cols-1 md:grid-cols-12 gap-8 border-3 border-black dark:border-white overflow-hidden hover:shadow-brutal transition-all duration-300">
              <div className="md:col-span-7 aspect-[16/9] md:aspect-auto overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  width={800}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="md:col-span-5 p-8 md:p-12 flex flex-col justify-center">
                <span className="font-mono text-xs font-bold tracking-[0.3em] text-electric-blue mb-4">
                  {featured.category} — {featured.date}
                </span>
                <h2 className="font-editorial text-4xl md:text-5xl font-bold uppercase mb-6 leading-tight">
                  {featured.title}
                </h2>
                <p className="font-mono text-sm uppercase tracking-widest opacity-60 mb-6 leading-loose">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest opacity-40">
                  <span>{featured.author}</span>
                  <span>•</span>
                  <span>{featured.readTime} read</span>
                </div>
              </div>
            </Link>
          </article>
        );
      })()}

      {/* Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {POSTS.slice(1).map((post) => (
          <article
            key={post.id}
            className="group border-3 border-black dark:border-white overflow-hidden hover:shadow-brutal hover:-translate-y-2 transition-all duration-300"
          >
            <Link href={`/journal/${post.slug}`}>
              <div className="aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={800}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300">
                <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-electric-blue group-hover:text-white dark:group-hover:text-black">
                  {post.category} — {post.date}
                </span>
                <h3 className="font-editorial text-2xl font-bold uppercase mt-2 mb-3 leading-tight">
                  {post.title}
                </h3>
                <p className="font-mono text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100 leading-loose line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest opacity-40 group-hover:opacity-100 mt-4">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Instagram CTA */}
      <div className="border-3 border-black dark:border-white p-12 md:p-20 text-center bg-black text-white dark:bg-white dark:text-black">
        <p className="font-editorial text-3xl md:text-5xl font-bold italic mb-4">Follow the story</p>
        <p className="font-mono text-xs uppercase tracking-[0.3em] opacity-60 mb-8">
          Stories, editorials, and announcements — follow us on Instagram
        </p>
        <a
          href="https://www.instagram.com/me_modelingagency"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 bg-white text-black dark:bg-black dark:text-white border-3 border-white dark:border-black font-mono text-sm font-bold uppercase tracking-[0.3em] hover:bg-electric-blue hover:text-white hover:border-electric-blue transition-colors"
        >
          @me_modelingagency
        </a>
      </div>
    </div>
  );
}
