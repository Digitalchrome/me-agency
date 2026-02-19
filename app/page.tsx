import { dataService } from '@/lib/data-service';
import HomePageClient from '@/components/HomePageClient';

export default async function HomePage() {
  const models = await dataService.getAllModels();
  
  return <HomePageClient models={models} />;
}
