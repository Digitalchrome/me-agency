import { cache } from 'react';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

/**
 * Configuration Sanity avec validation des variables d'environnement
 * Sanity configuration with environment variable validation
 */
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-01';

if (!projectId) {
  throw new Error(
    'NEXT_PUBLIC_SANITY_PROJECT_ID manquant / NEXT_PUBLIC_SANITY_PROJECT_ID is missing. ' +
      'Veuillez créer un fichier .env.local / Please create a .env.local file.'
  );
}

/**
 * Client Sanity configuré pour Next.js 15
 * Sanity client configured for Next.js 15
 *
 * GDPR Note: Toutes les données sont stockées via Sanity CMS
 * GDPR Note: All data is stored via Sanity CMS
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
  // Next.js 15: Désactiver le cache par défaut, utiliser revalidate explicitement
  // Next.js 15: Disable default caching, use explicit revalidate
  stega: {
    enabled: false,
  },
});

/**
 * Version cachée du fetch Sanity pour dédupliquer les appels dans une même requête
 * Cached version of Sanity fetch to deduplicate calls within the same request
 */
export const cachedFetch = cache(client.fetch.bind(client));

const builder = imageUrlBuilder(client);

/**
 * Helper pour construire les URLs d'images Sanity
 * Helper to build Sanity image URLs
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Tags de revalidation pour ISR
 * Revalidation tags for ISR
 */
export const REVALIDATE_TAGS = {
  models: 'models',
  model: (slug: string) => `model-${slug}`,
} as const;
