import { bookingRequestSchema, saveBookingRequest } from '@/lib/submissions';
import { jsonError, jsonOk } from '@/lib/server/http';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bookingRequestSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return jsonError(firstIssue?.message ?? 'Invalid payload', 400, { issues: parsed.error.flatten() });
    }

    const record = await saveBookingRequest(parsed.data);

    return jsonOk({
      id: record.id,
      createdAt: record.createdAt,
      message: 'Booking request received. We typically respond within 24 hours.',
    });
  } catch (error) {
    console.error('POST /api/bookings failed', error);
    return jsonError('Server error', 500);
  }
}
