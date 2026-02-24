import { seedFakeSubmissions } from '@/lib/submissions';
import { jsonError, jsonOk } from '@/lib/server/http';

export const runtime = 'nodejs';

export async function POST() {
  try {
    const result = await seedFakeSubmissions({ joinCount: 2, bookingCount: 2 });
    return jsonOk({ message: 'Fake submissions created', ...result });
  } catch (error) {
    console.error('POST /api/demo/seed-submissions failed', error);
    return jsonError('Server error', 500);
  }
}
