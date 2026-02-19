import { cachedFetch } from './sanity';
import type { Model } from './types';

/**
 * Service de données centralisé pour ME Modeling Agency
 * Centralized data service for ME Modeling Agency
 */
export const dataService = {
  /**
   * Vérifie si le mode démo est activé
   */
  isDemoMode(): boolean {
    return process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'demo-project';
  },

  /**
   * Récupère tous les modèles
   * Fetches all models
   */
  async getAllModels(): Promise<Model[]> {
    if (this.isDemoMode()) {
      const { DEMO_MODELS } = await import('./demoData');
      return DEMO_MODELS;
    }

    const query = `*[_type == "model"] | order(name asc)`;
    try {
      const models = await cachedFetch(query, {}, { next: { revalidate: 3600, tags: ['models'] } });
      return models;
    } catch (error) {
      console.error('Error fetching models from Sanity:', error);
      // Fallback to empty array to prevent crash
      return [];
    }
  },

  /**
   * Récupère un modèle par son slug
   * Fetches a model by slug
   */
  async getModelBySlug(slug: string): Promise<Model | null> {
    if (this.isDemoMode()) {
      const { getDemoModelBySlug } = await import('./demoData');
      return getDemoModelBySlug(slug) || null;
    }

    const query = `*[_type == "model" && slug.current == $slug][0]`;
    try {
      const model = await cachedFetch(query, { slug }, { next: { revalidate: 3600, tags: [`model-${slug}`] } });
      return model;
    } catch (error) {
      console.error(`Error fetching model ${slug} from Sanity:`, error);
      return null;
    }
  }
};
