import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MODEL_COVERS } from '@/lib/demoImages';
import { DEMO_MODELS } from '@/lib/demoData';
import BookingRequestForm from '@/components/forms/BookingRequestForm';
import { dataService } from '@/lib/data-service';
import { urlFor } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Book a Model',
  description: 'Book professional models from ME Agency for editorial, fashion, commercial, and event projects.',
};

const PROJECT_TYPES = [
  {
    type: 'Editorial',
    desc: 'Fashion editorials, magazine features, brand storytelling',
    icon: '📰',
  },
  {
    type: 'Commercial',
    desc: 'Advertising campaigns, product photography, lookbooks',
    icon: '📷',
  },
  {
    type: 'Catwalk',
    desc: 'Runway shows, fashion weeks, live events',
    icon: '🎭',
  },
  {
    type: 'Event',
    desc: 'Brand activations, launches, experiential marketing',
    icon: '⚡',
  },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Submit Request', desc: 'Tell us about your project and requirements.' },
  { step: '02', title: 'Review & Match', desc: 'We match you with the perfect talent from our roster.' },
  { step: '03', title: 'Book & Create', desc: 'Confirm the booking, and let the magic happen.' },
];

export default async function BookingPage() {
  const models = await dataService.getAllModels();
  const usingDemoModels = models.length === 0;
  const previewModels = (usingDemoModels ? DEMO_MODELS : models).slice(0, 6);
  const isDemoMode = dataService.isDemoMode() || usingDemoModels;

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Hero */}
      <div className="mb-32">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-electric-blue mb-4 font-bold">
          Work With Us
        </p>
        <h1 className="font-editorial text-7xl md:text-9xl font-bold mb-8 uppercase tracking-tighter leading-[0.85]">
          Book a <br /> Model
        </h1>
        <p className="font-mono text-sm uppercase tracking-[0.2em] leading-loose text-gray-700 dark:text-gray-300 max-w-2xl">
          Professional booking for editorial, fashion, commercial, and event projects.
          Our team responds within 24 hours with availability and rates.
        </p>
      </div>

      {/* Model Preview Strip */}
      <section className="mb-32">
        <div className="flex items-center gap-8 mb-12">
          <h2 className="font-editorial text-3xl md:text-5xl font-bold uppercase tracking-tighter">
            Available Talent
          </h2>
          <div className="flex-grow h-[2px] bg-black/20 dark:bg-white/20" />
          <Link
            href="/#roster"
            className="font-mono text-xs uppercase tracking-widest text-electric-blue hover:underline whitespace-nowrap"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {previewModels.map((model) => {
            const imageUrl = isDemoMode
              ? (MODEL_COVERS[model.slug.current] ??
                `https://placehold.co/300x450/1a1a1a/ffffff?text=${encodeURIComponent(model.name)}`)
              : urlFor(model.coverImage).width(300).height(450).url();
            return (
              <Link key={model._id} href={`/${model.slug.current}`} className="group">
                <div className="aspect-[2/3] overflow-hidden border-2 border-black dark:border-white relative">
                  <Image
                    src={imageUrl}
                    alt={model.name}
                    width={300}
                    height={450}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white font-mono text-xs uppercase tracking-widest">{model.name}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Project Types */}
      <section className="mb-32">
        <div className="flex items-center gap-8 mb-16">
          <div className="flex-grow h-1 bg-black dark:bg-white" />
          <h2 className="font-editorial text-5xl md:text-7xl font-bold uppercase tracking-tighter">
            Project Types
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-3 border-black dark:border-white">
          {PROJECT_TYPES.map((pt) => (
            <div
              key={pt.type}
              className="p-8 md:p-10 border-r-2 border-b-2 last:border-r-0 border-black/20 dark:border-white/20 group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
            >
              <span className="text-3xl block mb-4">{pt.icon}</span>
              <h3 className="font-editorial text-2xl font-bold mb-3">{pt.type}</h3>
              <p className="font-mono text-xs uppercase tracking-widest leading-loose opacity-60 group-hover:opacity-100">
                {pt.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-32">
        <div className="flex items-center gap-8 mb-16">
          <h2 className="font-editorial text-5xl md:text-7xl font-bold uppercase tracking-tighter">
            How It Works
          </h2>
          <div className="flex-grow h-1 bg-black dark:bg-white" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((item) => (
            <div
              key={item.step}
              className="p-8 md:p-10 border-3 border-black dark:border-white hover:shadow-brutal hover:-translate-y-2 transition-all duration-300 group"
            >
              <span className="font-editorial text-6xl font-bold italic text-electric-blue block mb-4">{item.step}</span>
              <h3 className="font-editorial text-2xl font-bold mb-3">{item.title}</h3>
              <p className="font-mono text-xs uppercase tracking-widest leading-loose opacity-60 group-hover:opacity-100">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Form */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-5 flex flex-col justify-center">
          <h2 className="font-editorial text-4xl md:text-5xl font-bold mb-6">
            Request a Booking
          </h2>
          <p className="font-mono text-sm uppercase tracking-[0.2em] leading-loose text-gray-700 dark:text-gray-300 mb-6">
            Fill out the form with your project details and we&apos;ll match you with the perfect talent.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            For urgent requests, email{' '}
            <a href="mailto:bookings@me-agency.com" className="font-bold underline hover:text-electric-blue transition-colors">
              bookings@me-agency.com
            </a>
          </p>
        </div>

        <div className="md:col-span-7">
          <BookingRequestForm />
        </div>
      </section>
    </div>
  );
}
