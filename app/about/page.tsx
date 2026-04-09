import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND_IMAGES } from '@/lib/demoImages';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about ME Modeling Agency — our mission, vision, timeline, and the values that drive us.',
};

const TIMELINE = [
  { year: '2026', title: 'Founded in Lille', desc: 'ME Agency launches with a vision to celebrate authentic diversity.' },
  { year: '2026', title: 'First Roster', desc: '10 inaugural models representing 6 countries and 3 continents.' },
  { year: '2026', title: 'Digital Platform', desc: 'Launch of our brutalist-editorial web experience.' },
];

const VALUES = [
  { icon: '◆', title: 'Authenticity', desc: 'Real people, real stories, no retouching of identity.' },
  { icon: '◇', title: 'Diversity', desc: 'Every background, every body, every face has value.' },
  { icon: '▸', title: 'Transparency', desc: 'Fair contracts, open communication, genuine partnerships.' },
  { icon: '●', title: 'Excellence', desc: 'World-class talent management with a personal touch.' },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      {/* Hero */}
      <div className="max-w-5xl mb-32">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-electric-blue mb-6 font-bold">
          Our Story
        </p>
        <h1 className="font-editorial text-7xl md:text-9xl font-bold mb-16 leading-[0.8] tracking-tighter">
          WE ARE <br /> ME.
        </h1>
        <p className="font-editorial text-4xl md:text-6xl font-bold mb-12 border-l-8 border-electric-blue pl-8 leading-tight">
          A collective of visionaries dedicated to authentic representation.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-mono text-sm leading-relaxed uppercase tracking-widest py-16 border-y-3 border-black dark:border-white mb-32">
        <div>
          <h3 className="text-xl font-bold mb-4 text-electric-blue">Our Mission</h3>
          <p>
            To disrupt the traditional modeling landscape by prioritizing character and diversity
            over antiquated standards. We provide our clients with talent that resonates with the
            real world.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 text-electric-blue">Our Vision</h3>
          <p>
            To be the premier destination for editorial and commercial talent that embodies the
            spirit of humanity&apos;s beautiful differences.
          </p>
        </div>
      </div>

      {/* Featured Image */}
      <div className="mb-32 relative">
        <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden border-3 border-black dark:border-white shadow-brutal">
          <Image
            src={BRAND_IMAGES.aboutHero}
            alt="ME Agency brand image"
            width={1400}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-6 -right-6 bg-electric-blue text-white px-8 py-4 border-3 border-black dark:border-white font-mono font-bold uppercase tracking-widest shadow-brutal text-xs">
          EST. 2026
        </div>
      </div>

      {/* Core Values */}
      <section className="mb-32">
        <div className="flex items-center gap-8 mb-16">
          <h2 className="font-editorial text-5xl md:text-7xl font-bold uppercase tracking-tighter">
            Our Values
          </h2>
          <div className="flex-grow h-1 bg-black dark:bg-white" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="p-8 border-3 border-black dark:border-white hover:shadow-brutal hover:-translate-y-2 transition-all duration-300 group"
            >
              <span className="text-3xl text-electric-blue mb-4 block group-hover:scale-110 transition-transform">{v.icon}</span>
              <h3 className="font-editorial text-xl font-bold mb-3">{v.title}</h3>
              <p className="font-mono text-xs uppercase tracking-widest leading-loose opacity-60 group-hover:opacity-100 transition-opacity">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-32">
        <div className="flex items-center gap-8 mb-16">
          <div className="flex-grow h-1 bg-black dark:bg-white" />
          <h2 className="font-editorial text-5xl md:text-7xl font-bold uppercase tracking-tighter">
            Our Story
          </h2>
        </div>
        <div className="space-y-0">
          {TIMELINE.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-12 gap-8 border-b-2 border-black/20 dark:border-white/20 py-8 group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300 px-4"
            >
              <div className="col-span-2 md:col-span-1">
                <span className="font-editorial text-3xl font-bold italic">{item.year}</span>
              </div>
              <div className="col-span-10 md:col-span-3">
                <h3 className="font-editorial text-2xl font-bold">{item.title}</h3>
              </div>
              <div className="col-span-12 md:col-span-8">
                <p className="font-mono text-sm uppercase tracking-widest opacity-60 group-hover:opacity-100">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="border-3 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black p-12 md:p-20 text-center">
        <p className="font-editorial text-4xl md:text-6xl font-bold mb-8 italic">
          Want to join the movement?
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <Link href="/agency" className="btn-brutal bg-white text-black dark:bg-black dark:text-white border-white dark:border-black">
            Explore the Agency
          </Link>
          <Link href="/join" className="btn-brutal border-white dark:border-black text-white dark:text-black">
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}
