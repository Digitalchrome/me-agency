'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { Model } from '@/lib/types';
import ModelCard from '@/components/ModelCard';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/AnimatedSection';
import CountUp from '@/components/CountUp';
import Link from 'next/link';
import Image from 'next/image';
import { MODEL_COVERS } from '@/lib/demoImages';

interface HomePageClientProps {
  models: Model[];
}

/* ─── CONSTANTS / CONSTANTES ─── */
const BRAND_TAGS = ['Inclusive', 'Authentic', 'Bold', 'Diverse', 'Global'];

const STATS = [
  { value: 10, suffix: '+', label: 'Models', sublabel: 'Worldwide' },
  { value: 6, suffix: '', label: 'Cities', sublabel: 'Global Reach' },
  { value: 3, suffix: '', label: 'Continents', sublabel: 'Representation' },
  { value: 2026, suffix: '', label: 'Founded', sublabel: 'Est. Lille, FR' },
];

const CLIENTS = ['Vogue', 'Dior', 'Balenciaga', 'Jacquemus', 'Off-White', 'Acne Studios', 'Kenzo', 'Ami Paris'];

const TESTIMONIALS = [
  {
    quote: "ME Agency represents the future of fashion — authentic, bold, and unapologetically human.",
    author: "Marie Tessier",
    role: "Fashion Director, Vogue France",
  },
  {
    quote: "Working with ME was refreshing. Their talent doesn't just model — they tell stories.",
    author: "Liam Chen",
    role: "Creative Director, Studio Lumière",
  },
];

/* ─── HERO SECTION / SECTION HÉRO ─── */
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, 100]);

  return (
    <motion.section
      ref={heroRef}
      style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      className="relative min-h-[100vh] flex flex-col justify-center hero-gradient text-white overflow-hidden -mx-4 -mt-12 px-4 md:px-12 lg:px-20"
    >
      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-10"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto w-full">
        {/* Tagline / Sur-titre */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-sm md:text-base uppercase tracking-[0.4em] text-white/60 mb-6 border-l-4 border-electric-blue pl-4"
        >
          EST. 2026 — Lille, France
        </motion.p>

        {/* Main headline / Titre principal */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-editorial text-[14vw] md:text-[10vw] lg:text-[8vw] font-bold leading-[0.85] mb-8 tracking-tighter"
        >
          <span className="block text-gradient">HUMANITY&apos;S</span>
          <span className="block mt-2">MODELING</span>
          <span className="block mt-2">AGENCY</span>
        </motion.h1>

        {/* Subheadline + Tags */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mt-8">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="md:col-span-5 text-lg md:text-xl text-white/70 leading-relaxed italic font-editorial"
          >
            &ldquo;Celebrating the raw, authentic beauty of every human being. 
            Making our differences our greatest strength.&rdquo;
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="md:col-span-7 flex flex-wrap gap-3"
          >
            {BRAND_TAGS.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                whileHover={{ scale: 1.05, backgroundColor: 'hsl(210, 100%, 50%)', borderColor: 'hsl(210, 100%, 50%)' }}
                className="px-5 py-2 border-2 border-white/30 text-white/80 font-mono text-xs uppercase tracking-[0.2em] cursor-default transition-all duration-200 hover:text-white"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* CTA / Bouton d'action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-16 flex flex-wrap gap-6"
        >
          <a
            href="#roster"
            className="group flex items-center gap-4"
          >
            <span className="font-mono text-sm uppercase tracking-[0.2em] font-bold group-hover:text-electric-blue transition-colors">
              Discover the Roster
            </span>
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-12 h-[2px] bg-white group-hover:bg-electric-blue group-hover:w-16 transition-all"
            />
          </a>
          <Link
            href="/agency"
            className="font-mono text-sm uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
          >
            Learn More →
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator / Indicateur de défilement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-8 bg-gradient-to-b from-white/60 to-transparent"
        />
      </motion.div>
    </motion.section>
  );
}

/* ─── ABOUT TEASER / TEASER DE PRÉSENTATION ─── */
function AboutTeaser() {
  return (
    <AnimatedSection className="py-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-electric-blue mb-6 font-bold">
            Our Philosophy
          </p>
          <h2 className="font-editorial text-4xl md:text-6xl font-bold leading-tight mb-8">
            We don&apos;t just represent models.{' '}
            <span className="text-electric-blue">We represent individuals</span> with a story, 
            a soul, and a unique presence.
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mb-8">
            Founded in Lille, ME Agency bridges editorial excellence with human diversity.
            We operate globally with a boutique approach to talent management, 
            celebrating what makes each person extraordinary.
          </p>
          <Link
            href="/about"
            className="animated-underline font-mono text-sm uppercase tracking-[0.2em] font-bold hover:text-electric-blue transition-colors"
          >
            Read Our Story →
          </Link>
        </div>

        <AnimatedSection direction="right" delay={0.2} className="md:col-span-5">
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden border-3 border-black dark:border-white shadow-brutal">
              <Image
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=1100&fit=crop"
                alt="ME Agency editorial fashion"
                width={800}
                height={1100}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-black dark:bg-white text-white dark:text-black px-8 py-4 border-3 border-black dark:border-white font-mono text-xs font-bold uppercase tracking-widest shadow-brutal">
              Since 2026
            </div>
          </div>
        </AnimatedSection>
      </div>
    </AnimatedSection>
  );
}

/* ─── STATS SECTION / SECTION STATISTIQUES ─── */
function StatsSection() {
  return (
    <AnimatedSection className="py-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-3 border-black dark:border-white">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="p-8 md:p-12 text-center border-r-2 border-b-2 last:border-r-0 border-black/20 dark:border-white/20 group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
          >
            <CountUp
              end={stat.value}
              suffix={stat.suffix}
              duration={2 + i * 0.3}
              className="font-editorial text-4xl md:text-6xl font-bold block mb-1"
            />
            <p className="font-mono text-xs uppercase tracking-[0.3em] font-bold opacity-80 group-hover:opacity-100">
              {stat.label}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-40 group-hover:opacity-80 mt-1">
              {stat.sublabel}
            </p>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}

/* ─── MODEL GRID / GRILLE DE MODÈLES ─── */
function ModelGrid({ models }: { models: Model[] }) {
  if (!models || models.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="font-editorial text-4xl font-bold mb-4">No Models Found</h2>
      </div>
    );
  }

  return (
    <div className="anti-grid">
      {models.map((model, index) => (
        <ModelCard key={model._id} model={model} index={index} />
      ))}
    </div>
  );
}

/* ─── FEATURED MODEL STRIP / BANDE MODÈLE EN VEDETTE ─── */
function FeaturedModelStrip({ models }: { models: Model[] }) {
  const featured = models.slice(0, 4);
  const isDemoMode = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'demo-project';

  return (
    <AnimatedSection className="py-20 overflow-hidden">
      <div className="flex items-center gap-8 mb-12">
        <h2 className="font-editorial text-3xl md:text-5xl font-bold uppercase tracking-tighter whitespace-nowrap">
          Featured Faces
        </h2>
        <div className="flex-grow h-[2px] bg-black/20 dark:bg-white/20" />
        <Link
          href="/#roster"
          className="font-mono text-xs uppercase tracking-widest text-electric-blue hover:underline whitespace-nowrap"
        >
          View All →
        </Link>
      </div>
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {featured.map((model, i) => {
          const imageUrl = isDemoMode
            ? (MODEL_COVERS[model.slug.current] ??
              `https://placehold.co/560x840/1a1a1a/ffffff?text=${encodeURIComponent(model.name)}`)
            : '';
          return (
            <AnimatedSection key={model._id} delay={i * 0.15} className="flex-shrink-0 w-[280px]">
              <Link href={`/${model.slug.current}`} className="block group">
                <div className="aspect-[2/3] overflow-hidden border-3 border-black dark:border-white relative">
                  <Image
                    src={imageUrl}
                    alt={model.name}
                    width={560}
                    height={840}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div>
                      <p className="text-white font-editorial text-xl font-bold">{model.name}</p>
                      <p className="text-white/70 font-mono text-xs uppercase tracking-widest">{model.location}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          );
        })}
      </div>
    </AnimatedSection>
  );
}

/* ─── CLIENTS MARQUEE / DÉFILEMENT CLIENTS ─── */
function ClientsMarquee() {
  return (
    <AnimatedSection className="py-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-center opacity-40 mb-8">
        Trusted By Industry Leaders
      </p>
      <div className="border-y-3 border-black dark:border-white overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee py-8">
          {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => (
            <span
              key={`${client}-${i}`}
              className="font-editorial text-3xl md:text-5xl italic font-bold uppercase tracking-wider mx-12 opacity-20 hover:opacity-100 transition-opacity duration-300"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─── TESTIMONIALS / TÉMOIGNAGES ─── */
function Testimonials() {
  return (
    <AnimatedSection className="py-24">
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.2}>
        {TESTIMONIALS.map((t, i) => (
          <StaggerItem key={i}>
            <div className="p-10 md:p-12 border-3 border-black dark:border-white bg-light-grey dark:bg-dark-grey hover:shadow-brutal hover:-translate-y-2 transition-all duration-300">
              <p className="font-editorial text-xl md:text-2xl italic leading-relaxed mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t-2 border-black/20 dark:border-white/20 pt-4">
                <p className="font-mono text-sm font-bold uppercase tracking-widest">{t.author}</p>
                <p className="font-mono text-xs uppercase tracking-widest opacity-50 mt-1">{t.role}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </AnimatedSection>
  );
}

/* ─── CTA SECTION / SECTION D'APPEL À L'ACTION ─── */
function CTASection() {
  return (
    <AnimatedSection className="py-20">
      <div className="border-3 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black p-12 md:p-20 text-center relative overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] opacity-50 mb-4">
            Join the Movement
          </p>
          <h2 className="font-editorial text-4xl md:text-7xl font-bold italic mb-6">
            Ready to redefine beauty?
          </h2>
          <p className="font-mono text-sm uppercase tracking-widest opacity-60 mb-12 max-w-lg mx-auto">
            Whether you&apos;re a model, a brand, or a creative — there&apos;s a place for you at ME.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/join"
              className="btn-brutal bg-white text-black dark:bg-black dark:text-white border-white dark:border-black hover:bg-electric-blue hover:text-white hover:border-electric-blue transition-colors"
            >
              Become a Model
            </Link>
            <Link
              href="/booking"
              className="btn-brutal border-white dark:border-black text-white dark:text-black hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
            >
              Book a Model
            </Link>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─── MARQUEE BAND / BANDE DÉFILANTE ─── */
function ManifestoMarquee() {
  return (
    <section className="py-8">
      <div className="border-y-3 border-black dark:border-white py-10 overflow-hidden flex whitespace-nowrap bg-black text-white dark:bg-white dark:text-black">
        <div className="animate-marquee flex gap-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="font-editorial text-3xl md:text-4xl italic font-bold uppercase tracking-widest">
              Diversity is Power • Authenticity is Key • Difference is Strength •
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── MAIN PAGE / PAGE PRINCIPALE ─── */
export default function HomePageClient({ models }: HomePageClientProps) {
  return (
    <div className="min-h-screen">
      {/* Hero — Cinematic full-viewport intro */}
      <HeroSection />

      <div className="container mx-auto px-4">
        {/* About Teaser — Brand story */}
        <AboutTeaser />

        {/* Stats — Key numbers */}
        <StatsSection />

        {/* Featured Faces — Top models strip */}
        <FeaturedModelStrip models={models} />

        {/* Clients — Industry trust */}
        <ClientsMarquee />
      </div>

      {/* Manifesto Marquee */}
      <ManifestoMarquee />

      <div className="container mx-auto px-4">
        {/* Testimonials */}
        <Testimonials />

        {/* Full Roster */}
        <AnimatedSection className="py-20" id="roster">
          <div className="flex justify-between items-end mb-16 border-b-3 border-black dark:border-white pb-6">
            <h2 className="font-editorial text-5xl md:text-7xl font-bold uppercase tracking-tighter">
              Selected <br /> Individuals
            </h2>
            <div className="hidden md:block font-mono text-sm uppercase tracking-widest text-right">
              <p>Portfolio Vol. 01</p>
              <p className="text-gray-500">Global Management</p>
            </div>
          </div>
          <ModelGrid models={models} />
        </AnimatedSection>

        {/* CTA */}
        <CTASection />
      </div>
    </div>
  );
}
