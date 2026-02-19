'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import type { Model } from '@/lib/types';
import Stats from '@/components/Stats';

interface ModelPageClientProps {
  model: Model;
}

function ImageGallery({ images, modelName }: { images: any[]; modelName: string }) {
  if (!images || images.length === 0) {
    return (
      <div className="text-center py-20 border-3 border-black dark:border-white bg-light-grey dark:bg-dark-grey">
        <p className="font-mono text-lg uppercase tracking-wider opacity-60">
          Portfolio Under Construction
        </p>
      </div>
    );
  }

  const isDemoMode = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'demo-project';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
      {images.map((image, index) => {
        const imageUrl = isDemoMode
          ? ((image as any)._demoUrl || `https://placehold.co/800x${index % 2 === 0 ? '1200' : '800'}/1a1a1a/ffffff?text=${encodeURIComponent(modelName + ' ' + (index + 1))}`)
          : urlFor(image).width(800).height(index % 2 === 0 ? 1200 : 800).url();

        const rotations = [-1, 1, 0, 2, -2];
        const rotation = rotations[index % rotations.length];
        const marginTop = (index % 3 === 1) ? 'mt-12' : (index % 3 === 2) ? 'mt-24' : 'mt-0';

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`relative overflow-hidden border-3 border-black dark:border-white group bg-light-grey dark:bg-dark-grey ${marginTop}`}
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <div className={`aspect-[${index % 2 === 0 ? '2/3' : '1/1'}] overflow-hidden`}>
              <Image
                src={imageUrl}
                alt={`${modelName} - Image ${index + 1}`}
                width={800}
                height={index % 2 === 0 ? 1200 : 800}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
              P_0{index + 1}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function ModelPageClient({ model }: ModelPageClientProps) {
  const isDemoMode = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'demo-project';
  const coverImageUrl = isDemoMode
    ? `https://placehold.co/1200x1800/1a1a1a/ffffff?text=${encodeURIComponent(model.name)}`
    : urlFor(model.coverImage).width(1200).height(1800).url();

  return (
    <div className="min-h-screen brutal-grid pt-12">
      <div className="fixed top-20 left-0 w-full pointer-events-none -z-10 opacity-[0.03] dark:opacity-[0.05] overflow-hidden">
        <h2 className="text-[20vw] font-editorial font-bold leading-none select-none whitespace-nowrap">
          {model.name} {model.name} {model.name}
        </h2>
      </div>

      <div className="container mx-auto px-4">
        <div className="relative mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-4 lg:sticky lg:top-32"
            >
              <div className="mb-12">
                <h1 className="font-editorial text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.8] mb-6 tracking-tighter group">
                  <span className="inline-block hover:translate-x-4 transition-transform duration-500">{model.name.split(' ')[0]}</span>
                  <br/>
                  <span className="inline-block text-electric-blue hover:-translate-x-4 transition-transform duration-500">{model.name.split(' ')[1] || ''}</span>
                </h1>
                <p className="font-mono text-xl uppercase tracking-[0.3em] font-bold opacity-60">
                   Portfolio Vol. {model.height}
                </p>
              </div>

              <div className="space-y-4 border-l-4 border-black dark:border-white pl-8">
                <div className="flex flex-col">
                  <span className="font-mono text-xs uppercase tracking-widest opacity-40">Height</span>
                  <span className="font-editorial text-3xl font-bold italic">{model.height}cm</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-xs uppercase tracking-widest opacity-40">Location</span>
                  <span className="font-editorial text-3xl font-bold italic">{model.location}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-xs uppercase tracking-widest opacity-40">Category</span>
                  <span className="font-editorial text-3xl font-bold italic">{model.category}</span>
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                 <button className="btn-brutal bg-black text-white dark:bg-white dark:text-black">Book {model.name.split(' ')[0]}</button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="aspect-[3/4] overflow-hidden border-3 border-black dark:border-white shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] dark:shadow-[20px_20px_0px_0px_rgba(255,255,255,1)]">
                <Image
                  src={coverImageUrl}
                  alt={model.name}
                  width={1200}
                  height={1600}
                  className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-110"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-electric-blue text-white px-8 py-4 z-10 border-3 border-black dark:border-white font-mono font-bold uppercase tracking-widest shadow-brutal">
                 In View
              </div>
            </motion.div>

            <div className="lg:col-span-3 lg:pt-48 space-y-12">
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5 }}
                 className="p-8 border-3 border-dashed border-black/30 dark:border-white/30 rotate-3 hover:rotate-0 transition-transform duration-500"
               >
                 <p className="font-editorial text-xl italic leading-relaxed">
                   "Celebrating humanity through unique expression and authentic presence."
                 </p>
               </motion.div>
            </div>
          </div>
        </div>

        <div className="space-y-40 mb-40">
           <section>
              <div className="flex items-center gap-8 mb-12">
                 <h2 className="font-editorial text-5xl md:text-7xl font-bold uppercase tracking-tighter">Specs</h2>
                 <div className="flex-grow h-1 bg-black dark:bg-white"></div>
              </div>
              <Stats model={model} />
           </section>

           <section>
              <div className="flex items-center gap-8 mb-12">
                 <div className="flex-grow h-1 bg-black dark:bg-white"></div>
                 <h2 className="font-editorial text-5xl md:text-7xl font-bold uppercase tracking-tighter">Folio</h2>
              </div>
              <ImageGallery images={model.portfolio} modelName={model.name} />
           </section>
        </div>
      </div>
    </div>
  );
}
