import { cache } from 'react';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { QueryParams } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-01';
const hasSanityConfig = Boolean(projectId);

export const client = hasSanityConfig
  ? createClient({
      projectId: projectId as string,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
      perspective: 'published',
      stega: { enabled: false },
    })
  : null;

type FetchOptions = { next?: { revalidate?: number; tags?: string[] } };

export const cachedFetch = cache(
  async <TResult = unknown>(
    query: string,
    params: QueryParams = {},
    options?: FetchOptions
  ): Promise<TResult> => {
    if (!client) {
      throw new Error(
        'Sanity client is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID or run in demo mode.'
      );
    }

    return client.fetch<TResult>(query, params, options);
  }
);

const builder = client ? imageUrlBuilder(client) : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    throw new Error('Sanity image builder is unavailable in demo mode.');
  }

  return builder.image(source);
}

export const REVALIDATE_TAGS = {
  models: 'models',
  model: (slug: string) => `model-${slug}`,
} as const;
