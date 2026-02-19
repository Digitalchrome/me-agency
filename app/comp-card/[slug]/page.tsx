import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { dataService } from '@/lib/data-service';
import PrintButton from '@/components/PrintButton';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const model = await dataService.getModelBySlug(slug);

  if (!model) return { title: 'Model Not Found' };

  return {
    title: `Comp Card - ${model.name}`,
    description: `Professional comp card for ${model.name}`,
  };
}

export default async function CompCardPage({ params }: PageProps) {
  const { slug } = await params;
  const model = await dataService.getModelBySlug(slug);

  if (!model) {
    notFound();
  }

  const isDemoMode = dataService.isDemoMode();

  const getImageUrl = (image: any) => {
    if (!image) return '';
    return isDemoMode 
      ? `https://placehold.co/800x1200/1a1a1a/ffffff?text=${encodeURIComponent(model.name)}` 
      : urlFor(image).url();
  };

  return (
    <div className="bg-gray-200 dark:bg-zinc-900 min-h-screen p-8 print:p-0 print:bg-white text-black">
      <div className="w-[5.5in] h-[8.5in] bg-white shadow-lg mx-auto p-4 print:shadow-none flex flex-col gap-4">
        <div className="grid grid-cols-2 grid-rows-4 flex-grow gap-4 h-full">
          <div className="col-span-2 row-span-2 relative border-2 border-black">
            <Image
              src={getImageUrl(model.coverImage)}
              alt={model.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative border-2 border-black">
            {model.portfolio?.[0] && (
              <Image
                src={getImageUrl(model.portfolio[0])}
                alt={model.name}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="relative border-2 border-black">
            {model.portfolio?.[1] && (
              <Image
                src={getImageUrl(model.portfolio[1])}
                alt={model.name}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="flex flex-col justify-between py-2">
            <div>
              <h1 className="font-editorial text-4xl font-bold leading-none mb-4">{model.name}</h1>
              <div className="space-y-1 font-mono text-[10px] uppercase tracking-wider">
                <p>Height: {model.height} cm</p>
                <p>Bust: {model.bust} cm</p>
                <p>Waist: {model.waist} cm</p>
                <p>Hips: {model.hips} cm</p>
                <p>Shoe: {model.shoe} EU</p>
                <p>Hair: {model.hair}</p>
                <p>Eyes: {model.eyes}</p>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-end pb-2">
            <h2 className="font-editorial text-3xl font-bold italic text-electric-blue">ME Agency</h2>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-12 no-print flex justify-center gap-4">
        <PrintButton />
        <a 
           href={`/${model.slug.current}`}
           className="btn-brutal bg-white text-black px-8 py-3"
        >
          Back to Portfolio
        </a>
      </div>
    </div>
  );
}
