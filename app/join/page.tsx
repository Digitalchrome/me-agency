import type { Metadata } from 'next';
import Image from 'next/image';
import JoinApplicationForm from '@/components/forms/JoinApplicationForm';

export const metadata: Metadata = {
  title: 'Become a Model',
  description: 'Apply to join ME Modeling Agency — we celebrate every face, every story, every human.',
};

const PERKS = [
  {
    icon: '◆',
    title: 'Global Representation',
    desc: 'Access to bookings in Paris, Milan, London, and beyond — powered by our international network.',
  },
  {
    icon: '◇',
    title: 'Personal Development',
    desc: 'Coaching, workshops, and mentorship to build your portfolio and your confidence.',
  },
  {
    icon: '▸',
    title: 'Fair & Transparent',
    desc: 'Clear contracts, competitive rates, and a team that truly advocates for your career.',
  },
];

const PROCESS = [
  { step: '01', title: 'Apply', desc: 'Submit your application with basic info and photos.' },
  { step: '02', title: 'Review', desc: 'Our talent team reviews every single application personally.' },
  { step: '03', title: 'Meet', desc: 'Shortlisted candidates are invited for a casual meet & test shoot.' },
  { step: '04', title: 'Welcome', desc: 'Join the ME family and start your journey with us.' },
];

export default function JoinPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      {/* Hero */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-32">
        <div className="md:col-span-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-electric-blue mb-4 font-bold">
            Join the Movement
          </p>
          <h1 className="font-editorial text-7xl md:text-9xl font-bold mb-8 uppercase tracking-tighter leading-[0.85]">
            Become <br /> a Model
          </h1>
          <p className="font-mono text-sm uppercase tracking-[0.2em] leading-loose text-gray-700 dark:text-gray-300 mb-8">
            We are always looking for new faces. No matter your height, age, or background. 
            We value uniqueness above everything else.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {['All Ages', 'All Sizes', 'All Backgrounds', 'All Stories'].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 border-2 border-black dark:border-white font-mono text-xs uppercase tracking-widest"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-6">
          <div className="aspect-[3/4] overflow-hidden border-3 border-black dark:border-white shadow-brutal">
            <Image
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1100&fit=crop"
              alt="Join ME Agency"
              width={800}
              height={1100}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Why Join ME */}
      <section className="mb-32">
        <div className="flex items-center gap-8 mb-16">
          <h2 className="font-editorial text-5xl md:text-7xl font-bold uppercase tracking-tighter">
            Why ME
          </h2>
          <div className="flex-grow h-1 bg-black dark:bg-white" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PERKS.map((perk) => (
            <div
              key={perk.title}
              className="p-8 md:p-10 border-3 border-black dark:border-white hover:shadow-brutal hover:-translate-y-2 transition-all duration-300 group"
            >
              <span className="text-4xl text-electric-blue mb-6 block group-hover:scale-110 transition-transform">
                {perk.icon}
              </span>
              <h3 className="font-editorial text-2xl font-bold mb-4">{perk.title}</h3>
              <p className="font-mono text-xs uppercase tracking-widest leading-loose opacity-60 group-hover:opacity-100 transition-opacity">
                {perk.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mb-32">
        <div className="flex items-center gap-8 mb-16">
          <div className="flex-grow h-1 bg-black dark:bg-white" />
          <h2 className="font-editorial text-5xl md:text-7xl font-bold uppercase tracking-tighter">
            The Process
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-3 border-black dark:border-white">
          {PROCESS.map((item) => (
            <div
              key={item.step}
              className="p-8 md:p-10 border-r-2 border-b-2 last:border-r-0 border-black/20 dark:border-white/20 group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
            >
              <span className="font-editorial text-5xl md:text-6xl font-bold italic text-electric-blue group-hover:text-white dark:group-hover:text-black block mb-4 transition-colors">
                {item.step}
              </span>
              <h3 className="font-editorial text-2xl font-bold mb-2">{item.title}</h3>
              <p className="font-mono text-xs uppercase tracking-widest leading-loose opacity-60 group-hover:opacity-100">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-5 flex flex-col justify-center">
          <h2 className="font-editorial text-4xl md:text-5xl font-bold mb-6">
            Start Your Journey
          </h2>
          <p className="font-mono text-sm uppercase tracking-[0.2em] leading-loose text-gray-700 dark:text-gray-300 mb-6">
            Fill out the form and our talent team will review your application within 48 hours.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You can also email your polaroids directly to:{' '}
            <a href="mailto:applications@me-agency.com" className="font-bold underline hover:text-electric-blue transition-colors">
              applications@me-agency.com
            </a>
          </p>
        </div>

        <div className="md:col-span-7">
          <JoinApplicationForm />
        </div>
      </section>
    </div>
  );
}
