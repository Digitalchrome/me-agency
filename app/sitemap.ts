import type { MetadataRoute } from 'next';
import { dataService } from '@/lib/data-service';
import { JOURNAL_POSTS } from '@/lib/journalData';
import { INDEXED_PAGES } from '@/lib/siteIndex';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://me-agency.com';

  const staticRoutes = INDEXED_PAGES.filter(
    (page) => page.indexable && !page.path.startsWith('/journal/')
  ).map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page.path === '/' ? 1 : page.path === '/discover' ? 0.5 : 0.8,
  }));

  const journalRoutes = JOURNAL_POSTS.map((post) => ({
    url: `${baseUrl}/journal/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const models = await dataService.getAllModels();
  const modelRoutes = models.map((model) => ({
    url: `${baseUrl}/${model.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...journalRoutes, ...modelRoutes];
}

