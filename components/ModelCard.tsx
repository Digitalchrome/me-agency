'use client';

import type { Model } from '@/lib/types';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import { motion } from 'framer-motion';

export interface ModelCardProps {
  model: Model;
  index?: number;
}

/**
 * Carte de modèle avec effet 3D brutaliste
 * Model card with brutalist 3D effect
 */
export default function ModelCard({ model, index = 0 }: ModelCardProps) {
  // Rotation aléatoire subtile pour l'effet anti-grille
  // Subtle random rotation for anti-grid effect
  const rotation = (index % 3) - 1; // -1, 0, or 1 degree

  // Mode démo : utiliser une image placeholder améliorée
  // Demo mode: use enhanced placeholder image
  const isDemoMode = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'demo-project';
  
  // Couleurs variées pour les placeholders
  const colors = ['1a1a1a', '2d2d2d', '1f1f1f', '252525', '1c1c1c', '232323'];
  const bgColor = colors[index % colors.length];
  
  const imageUrl = isDemoMode
    ? `https://placehold.co/800x1200/${bgColor}/ffffff?text=${encodeURIComponent(model.name)}&font=montserrat`
    : urlFor(model.coverImage).width(800).height(1200).url();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: (index % 4) * 0.1,
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      <Link
        href={`/${model.slug.current}`}
        className="block"
        style={{ '--rotation': rotation } as React.CSSProperties}
      >
        <article className="model-card group">
          {/* Image with 3D transform / Image avec transformation 3D */}
          <div className="relative aspect-[2/3] overflow-hidden bg-light-grey dark:bg-dark-grey">
            <Image
              src={imageUrl}
              alt={`${model.name} - ${model.category} model`}
              width={800}
              height={1200}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading={index < 4 ? 'eager' : 'lazy'}
              priority={index < 4}
            />

            {/* Gradient overlay / Superposition avec dégradé */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Status badge / Badge de statut */}
            <div className="absolute top-4 right-4 z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-x-2">
              <Badge status={model.status} />
            </div>
            
            {/* Hover info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-white font-editorial text-3xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {model.name}
              </p>
              <p className="text-white/70 font-mono text-sm uppercase tracking-widest translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-200">
                View Portfolio →
              </p>
            </div>
          </div>

          {/* Info section / Section d'informations - Refined for AD 2.0 */}
          <div className="p-6 bg-white dark:bg-dark-grey border-t-3 border-black dark:border-white transition-colors duration-300 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h3
                    className="font-editorial text-2xl font-bold leading-tight"
                  >
                    {model.name}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100">
                    {model.category}
                  </p>
               </div>
               <span className="font-editorial text-2xl italic font-light">{model.height}</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100">
              <span>{model.location}</span>
              <span>Ref: {model._id.slice(-4)}</span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
