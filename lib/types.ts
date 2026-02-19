import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { z } from 'zod';

/**
 * Type pour le statut d'un modèle
 * Type for model status
 */
export type ModelStatus = 'Available' | 'Travel' | 'Unavailable';

/**
 * Type pour le genre d'un modèle
 * Type for model gender
 */
export type ModelGender = 'Male' | 'Female' | 'Non-Binary';

/**
 * Type pour la catégorie d'un modèle
 * Type for model category
 */
export type ModelCategory = 'Mainboard' | 'Development' | 'Classic';

/**
 * Interface principale pour un modèle
 * Main interface for a model
 */
export interface Model {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  status: ModelStatus;
  gender: ModelGender;
  category: ModelCategory;
  location: string;
  height: number; // en cm / in cm
  bust: number; // en cm / in cm
  waist: number; // en cm / in cm
  hips: number; // en cm / in cm
  shoe: number; // Pointure EU / EU size
  hair: string;
  eyes: string;
  portfolio: SanityImageSource[];
  polaroids: SanityImageSource[];
  coverImage: SanityImageSource;
}

/**
 * Schéma Zod pour validation runtime
 * Zod schema for runtime validation
 */
export const ModelSchema = z.object({
  _id: z.string(),
  name: z.string().min(1),
  slug: z.object({
    current: z.string().min(1),
  }),
  status: z.enum(['Available', 'Travel', 'Unavailable']),
  gender: z.enum(['Male', 'Female', 'Non-Binary']),
  category: z.enum(['Mainboard', 'Development', 'Classic']),
  location: z.string().min(1),
  height: z.number().positive(),
  bust: z.number().positive(),
  waist: z.number().positive(),
  hips: z.number().positive(),
  shoe: z.number().positive(),
  hair: z.string().min(1),
  eyes: z.string().min(1),
  portfolio: z.array(z.any()),
  polaroids: z.array(z.any()),
  coverImage: z.any(),
});

/**
 * Type pour les paramètres de filtrage
 * Type for filter parameters
 */
export interface FilterParams {
  gender?: ModelGender | 'all';
  category?: ModelCategory | 'all';
  location?: string | 'all';
  search?: string;
}

/**
 * Type pour les paramètres de recherche URL
 * Type for URL search parameters
 */
export interface SearchParams {
  gender?: string;
  category?: string;
  location?: string;
  search?: string;
}
