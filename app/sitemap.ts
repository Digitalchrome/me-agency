import type { MetadataRoute } from 'next';
import { dataService } from '@/lib/data-service';

/**
 * Générateur de sitemap dynamique pour Next.js 15
 * Dynamic sitemap generator for Next.js 15
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://me-agency.com';

  // Routes statiques
  const staticRoutes = [
    '',
    '/agency',
    '/journal',
    '/about',
    '/join',
    '/booking',
    '/contact',
    '/gdpr',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Routes dynamiques pour les modèles
  const models = await dataService.getAllModels();
  const modelRoutes = models.map((model) => ({
    url: `${baseUrl}/${model.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...modelRoutes];
}
