import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Agency',
  description: 'ME Modeling Agency — Redefining beauty standards from Lille to the world. Learn about our mission, team, and philosophy.',
};

const STATS = [
  { value: '10+', label: 'Models' },
  { value: '6', label: 'Cities' },
  { value: '2026', label: 'Founded' },
  { value: '∞', label: 'Perspectives' },
];

const TEAM = [
  { name: 'Gabriel Laurent', role: 'Founder & Creative Director', city: 'Lille' },
  { name: 'Camille Dubois', role: 'Head of Talent', city: 'Paris' },
  { name: 'Marcus Williams', role: 'Booking Director', city: 'London' },
  { name: 'Sofia Rossi', role: 'Digital Strategy', city: 'Milan' },
];

export default function AgencyPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      {/* Hero */}
      <h1 className="font-editorial text-7xl md:text-[12vw] font-bold mb-16 leading-[0.8] uppercase tracking-tighter">
        The <br /> Agency
      </h1>

      {/* Mission */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-32">
        <div className="md:col-span-7">
          <p className="font-editorial text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Redefining beauty standards from the{' '}
            <span className="text-electric-blue">Hauts-de-France</span> to the world.
          </p>
          <div className="space-y-6 font-mono text-sm uppercase tracking-widest leading-loose text-gray-700 dark:text-gray-300">
            <p>
              Founded in 2026, ME Agency is a platform for authenticity. We don&apos;t just
              represent models; we represent individuals with a story, a soul, and a unique
              presence.
            </p>
            <p>
              Our mission is to bridge the gap between editorial excellence and human diversity.
              Based in Lille, we operate globally with a boutique approach to talent management.
            </p>
          </div>
        </div>

        <div className="md:col-span-5 flex flex-col gap-8">
          {/* Agency photo placeholder */}
          <div className="aspect-[4/3] border-3 border-black dark:border-white overflow-hidden shadow-brutal">
            <Image
              src="https://placehold.co/800x600/1a1a1a/ffffff?text=ME+Agency+HQ&font=montserrat"
              alt="ME Agency Headquarters in Lille"
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="border-3 border-black dark:border-white p-8 bg-black text-white dark:bg-white dark:text-black shadow-brutal">
            <h3 className="font-mono text-xl font-bold mb-4 uppercase">Our Philosophy</h3>
            <ul className="space-y-4 text-xs tracking-widest">
              <li>• HUMAN-CENTRIC MANAGEMENT</li>
              <li>• DIVERSITY AS A CORE STRENGTH</li>
              <li>• TRANSPARENT REPRESENTATION</li>
              <li>• GLOBAL REACH, LOCAL ROOTS</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-3 border-black dark:border-white mb-32">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="p-8 md:p-12 border-r-3 border-b-3 border-black dark:border-white last:border-r-0 text-center group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
          >
            <p className="font-editorial text-5xl md:text-7xl font-bold mb-2">{stat.value}</p>
            <p className="font-mono text-xs uppercase tracking-[0.3em] opacity-60 group-hover:opacity-100">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Team */}
      <section className="mb-32">
        <div className="flex items-center gap-8 mb-16">
          <h2 className="font-editorial text-5xl md:text-7xl font-bold uppercase tracking-tighter">
            The Team
          </h2>
          <div className="flex-grow h-1 bg-black dark:bg-white" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="group border-3 border-black dark:border-white overflow-hidden hover:shadow-brutal transition-all duration-300 hover:-translate-y-2"
            >
              <div className="aspect-square overflow-hidden bg-light-grey dark:bg-dark-grey">
                <Image
                  src={`https://placehold.co/600x600/2c2c2c/ffffff?text=${encodeURIComponent(member.name.split(' ')[0] ?? member.name)}&font=montserrat`}
                  alt={member.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6 bg-white dark:bg-dark-grey group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300">
                <h3 className="font-editorial text-xl font-bold">{member.name}</h3>
                <p className="font-mono text-xs uppercase tracking-widest opacity-60 mt-1">
                  {member.role}
                </p>
                <p className="font-mono text-xs uppercase tracking-widest opacity-40 mt-1">
                  {member.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cities */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t-3 border-black dark:border-white pt-12">
        {['Paris', 'Lille', 'London', 'Milan'].map((city) => (
          <div
            key={city}
            className="font-editorial text-3xl font-bold uppercase tracking-widest"
          >
            {city}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-32 text-center border-y-3 border-black dark:border-white py-20 bg-black text-white dark:bg-white dark:text-black">
        <p className="font-editorial text-4xl md:text-6xl font-bold mb-8 italic">
          Ready to work with us?
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <Link href="/join" className="btn-brutal bg-white text-black dark:bg-black dark:text-white border-white dark:border-black">
            Become a Model
          </Link>
          <Link href="/booking" className="btn-brutal border-white dark:border-black text-white dark:text-black">
            Book a Model
          </Link>
        </div>
      </div>
    </div>
  );
}
