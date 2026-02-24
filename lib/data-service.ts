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
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    return !projectId || projectId === 'demo-project';
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
      const models = await cachedFetch<Model[]>(query, {}, { next: { revalidate: 3600, tags: ['models'] } });
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
      const model = await cachedFetch<Model | null>(
        query,
        { slug },
        { next: { revalidate: 3600, tags: [`model-${slug}`] } }
      );
      return model;
    } catch (error) {
      console.error(`Error fetching model ${slug} from Sanity:`, error);
      return null;
    }
  }
};

// --- additional helpers for forms/back-end logic ---
export interface Application {
  name: string;
  email: string;
  location: string;
  instagram?: string;
  about: string;
  submittedAt: string;
}

const APPLICATIONS_FILE = 'data/applications.json';
const MODELS_FILE = 'data/models.json';

/**
 * Persists an application to disk (demo mode) or to Sanity in production
 */
export async function saveApplication(app: Application) {
  if (!dataService.isDemoMode()) {
    // TODO: wire up to a real database or sanity mutation
    console.warn('saveApplication called in non-demo mode, no-op');
    return;
  }

  const fs = await import('fs/promises');
  const path = await import('path');
  const filePath = path.join(process.cwd(), APPLICATIONS_FILE);
  let existing: Application[] = [];
  try {
    const content = await fs.readFile(filePath, 'utf8');
    existing = JSON.parse(content);
  } catch {
    // ignore if file doesn't exist yet
  }
  existing.push(app);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(existing, null, 2));
}

/**
 * Adds a model to the demo list (useful for new signups during development)
 */
export async function addDemoModel(model: Model) {
  if (!dataService.isDemoMode()) {
    console.warn('addDemoModel called in non-demo mode, no-op');
    return;
  }
  const fs = await import('fs/promises');
  const path = await import('path');
  const filePath = path.join(process.cwd(), MODELS_FILE);
  let existing: Model[] = [];
  try {
    const content = await fs.readFile(filePath, 'utf8');
    existing = JSON.parse(content);
  } catch {
    // no file yet
  }
  existing.push(model);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(existing, null, 2));
}

