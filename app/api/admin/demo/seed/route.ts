import { seedFakeSubmissions } from '@/lib/submissions';
import { requireAdminAccess } from '@/lib/server/admin-auth';
import { jsonError, jsonOk } from '@/lib/server/http';
import { z } from 'zod';

export const runtime = 'nodejs';

const seedSchema = z.object({
  joinCount: z.number().int().min(0).max(100).optional(),
  bookingCount: z.number().int().min(0).max(100).optional(),
  replace: z.boolean().optional(),
});

export async function POST(request: Request) {
  const auth = requireAdminAccess(request);
  if (!auth.ok) return auth.response;

  try {
    const raw = await request.json().catch(() => ({}));
    const parsed = seedSchema.safeParse(raw);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload', 400, {
        issues: parsed.error.flatten(),
      });
    }

    const result = await seedFakeSubmissions(parsed.data);
    return jsonOk({ message: 'Fake submissions created', ...result });
  } catch (error) {
    console.error('POST /api/admin/demo/seed failed', error);
    return jsonError('Server error', 500);
  }
}

