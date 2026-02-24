import { exportBookingsCsv } from '@/lib/submissions';
import { requireAdminAccess } from '@/lib/server/admin-auth';
import { jsonError } from '@/lib/server/http';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const auth = requireAdminAccess(request);
  if (!auth.ok) return auth.response;

  try {
    const url = new URL(request.url);
    const format = url.searchParams.get('format') === 'mega-db' ? 'mega-db' : 'internal';
    const csv = await exportBookingsCsv(format);
    return new Response(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="bookings-${format}.csv"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('GET /api/admin/exports/bookings.csv failed', error);
    return jsonError('Server error', 500);
  }
}

