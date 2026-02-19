'use client';

import { motion } from 'framer-motion';
import type { Model } from '@/lib/types';
import ModelCard from '@/components/ModelCard';

interface HomePageClientProps {
  models: Model[];
}


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

export default function HomePageClient({ models }: HomePageClientProps) {
  return (
    <div className="min-h-screen brutal-grid">
      <div className="fixed inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden opacity-[0.02] dark:opacity-[0.05]">
        <h2 className="text-[40vw] font-editorial font-bold leading-none select-none">
          ME
        </h2>
      </div>

      <div className="container mx-auto px-4 py-12">
        <section className="min-h-[70vh] flex flex-col justify-center mb-32 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl"
          >
            <div className="flex flex-col md:flex-row md:items-end gap-6 mb-8">
              <h1 className="font-editorial text-[20vw] md:text-[15vw] font-bold leading-[0.85] glitch-text" data-text="ME">
                ME
              </h1>
              <div className="pb-4">
                <p className="font-mono text-xl md:text-2xl uppercase tracking-[0.2em] font-bold border-l-4 border-electric-blue pl-6 py-2">
                  EST. 2026
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
              <div className="md:col-span-8">
                <p className="font-editorial text-4xl md:text-6xl font-bold leading-tight mb-8">
                  Humanity's <span className="text-electric-blue underline decoration-4 underline-offset-8">Modeling</span> Agency
                </p>
                <div className="flex flex-wrap gap-6 pt-4">
                  {['Inclusive', 'Authentic', 'Bold', 'Diverse'].map((tag) => (
                    <motion.div
                      key={tag}
                      whileHover={{ scale: 1.05, backgroundColor: '#000', color: '#fff' }}
                      className="px-6 py-2 border-3 border-black dark:border-white font-mono text-sm uppercase tracking-widest cursor-default transition-colors duration-200"
                    >
                      {tag}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-4 flex flex-col justify-between h-full pt-4">
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed italic border-t-2 border-black/20 dark:border-white/20 pt-6">
                  "Celebrating the raw, authentic beauty of every human being. Making our differences our greatest strength."
                </p>
                <div className="mt-8">
                  <motion.button
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 group"
                  >
                    <span className="font-mono text-sm uppercase tracking-widest font-bold group-hover:text-electric-blue transition-colors">Discover the roster</span>
                    <div className="w-12 h-3 border-b-2 border-black dark:border-white group-hover:border-electric-blue group-hover:w-16 transition-all"></div>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <div className="flex justify-between items-end mb-16 border-b-3 border-black dark:border-white pb-6">
          <h2 className="font-editorial text-5xl md:text-7xl font-bold uppercase tracking-tighter">Selected <br/> Individuals</h2>
          <div className="hidden md:block font-mono text-sm uppercase tracking-widest text-right">
            <p>Portfolio Vol. 01</p>
            <p className="text-gray-500">Global Management</p>
          </div>
        </div>

        <ModelGrid models={models} />

        <section className="mt-40 mb-20">
          <div className="border-y-3 border-black dark:border-white py-12 overflow-hidden flex whitespace-nowrap bg-black text-white dark:bg-white dark:text-black">
             <div className="animate-marquee flex gap-20">
                {Array.from({ length: 10 }).map((_, i) => (
                   <span key={i} className="font-editorial text-4xl italic font-bold uppercase tracking-widest">
                    Diversity is Power • Authenticity is Key • Difference is Strength •
                  </span>
                ))}
             </div>
          </div>
        </section>
      </div>
    </div>
  );
}
