import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getJournalPostBySlug, JOURNAL_POSTS } from '@/lib/journalData';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return JOURNAL_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);
  if (!post) return { title: 'Article Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image, alt: post.title }],
      type: 'article',
    },
  };
}

export default async function JournalPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);
  if (!post) notFound();

  const related = JOURNAL_POSTS.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-10">
        <Link href="/journal" className="font-mono text-xs uppercase tracking-[0.3em] text-electric-blue hover:underline">
          Back to Journal
        </Link>
      </div>

      <article className="max-w-5xl mx-auto">
        <header className="mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-electric-blue mb-4">
            {post.category} - {post.date}
          </p>
          <h1 className="font-editorial text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.9] mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-4 font-mono text-xs uppercase tracking-widest opacity-60">
            <span>{post.author}</span>
            <span>{post.readTime} read</span>
          </div>
        </header>

        <div className="aspect-[16/9] overflow-hidden border-3 border-black dark:border-white shadow-brutal mb-12">
          <Image
            src={post.image}
            alt={post.title}
            width={1400}
            height={800}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        <div className="border-l-4 border-black dark:border-white pl-6 md:pl-10 space-y-6 mb-16">
          {post.content.map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed text-gray-800 dark:text-gray-200">
              {paragraph}
            </p>
          ))}
        </div>

        <section className="border-t-3 border-black dark:border-white pt-10">
          <div className="flex items-center justify-between mb-8 gap-4">
            <h2 className="font-editorial text-3xl md:text-5xl font-bold uppercase tracking-tighter">
              More from the Journal
            </h2>
            <Link href="/journal" className="font-mono text-xs uppercase tracking-widest text-electric-blue hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/journal/${item.slug}`}
                className="border-3 border-black dark:border-white p-5 hover:shadow-brutal hover:-translate-y-1 transition-all"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest opacity-60 mb-2">
                  {item.category}
                </p>
                <h3 className="font-editorial text-2xl font-bold leading-tight mb-2">{item.title}</h3>
                <p className="font-mono text-xs uppercase tracking-widest opacity-50">{item.readTime}</p>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}

