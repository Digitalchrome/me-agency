import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { urlFor } from '@/lib/sanity';
import { dataService } from '@/lib/data-service';
import ModelPageClient from '@/components/ModelPageClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const model = await dataService.getModelBySlug(slug);

  if (!model) {
    return { title: 'Model Not Found' };
  }

  const isDemoMode = dataService.isDemoMode();
  const ogImageUrl = isDemoMode
    ? `https://placehold.co/1200x630/1a1a1a/ffffff?text=${encodeURIComponent(model.name)}`
    : urlFor(model.coverImage).width(1200).height(630).url();

  return {
    title: `${model.name} - ${model.category} Model`,
    description: `View ${model.name}'s portfolio at ME Modeling Agency.`,
    openGraph: {
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: model.name }],
    },
  };
}

export default async function ModelPage({ params }: PageProps) {
  const { slug } = await params;
  const model = await dataService.getModelBySlug(slug);

  if (!model) {
    notFound();
  }

  return <ModelPageClient model={model} />;
}
