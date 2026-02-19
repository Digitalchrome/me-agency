import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about ME Modeling Agency — our mission, vision, timeline, and the values that drive us.',
};

const TIMELINE = [
  { year: '2026', title: 'Founded in Lille', desc: 'ME Agency launches with a vision to celebrate authentic diversity.' },
  { year: '2026', title: 'First Roster', desc: '10 inaugural models representing 6 countries and 3 continents.' },
  { year: '2026', title: 'Digital Platform', desc: 'Launch of our brutalist-editorial web experience.' },
  { year: '2027', title: 'Global Expansion', desc: 'Partnerships with agencies in Milan, London, and New York.' },
];

const CLIENTS = ['Vogue', 'Dior', 'Balenciaga', 'Jacquemus', 'Off-White', 'Acne Studios'];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      {/* Hero */}
      <div className="max-w-5xl mb-32">
        <h1 className="font-editorial text-7xl md:text-9xl font-bold mb-16 leading-[0.8] tracking-tighter">
          WE ARE <br /> ME.
        </h1>
        <p className="font-editorial text-4xl md:text-6xl font-bold mb-12 border-l-8 border-electric-blue pl-8">
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
        <div className="aspect-[21/9] overflow-hidden border-3 border-black dark:border-white shadow-brutal">
          <Image
            src="https://placehold.co/1400x600/0d0d0d/ffffff?text=ME+AGENCY+—+HUMANITY'S+MODELING+AGENCY&font=montserrat"
            alt="ME Agency brand image"
            width={1400}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-6 -right-6 bg-electric-blue text-white px-8 py-4 border-3 border-black font-mono font-bold uppercase tracking-widest shadow-brutal text-xs">
          EST. 2026
        </div>
      </div>

      {/* Timeline */}
      <section className="mb-32">
        <div className="flex items-center gap-8 mb-16">
          <h2 className="font-editorial text-5xl md:text-7xl font-bold uppercase tracking-tighter">
            Our Story
          </h2>
          <div className="flex-grow h-1 bg-black dark:bg-white" />
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

      {/* Clients */}
      <section className="mb-32">
        <p className="font-mono text-xs uppercase tracking-[0.3em] mb-8 opacity-40">
          Trusted By
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 border-3 border-black dark:border-white">
          {CLIENTS.map((client) => (
            <div
              key={client}
              className="p-8 flex items-center justify-center border-r-2 border-b-2 border-black/20 dark:border-white/20 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
            >
              <span className="font-editorial text-xl md:text-2xl font-bold italic tracking-wider">
                {client}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center py-20">
        <p className="font-editorial text-3xl md:text-5xl font-bold mb-8">
          Want to join the movement?
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <Link href="/agency" className="btn-brutal-primary">
            Explore the Agency
          </Link>
          <Link href="/join" className="btn-brutal-secondary">
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}
