import { bookingRequestSchema, saveBookingRequest } from '@/lib/submissions';
import { jsonError, jsonOk } from '@/lib/server/http';
import { sendBookingNotification } from '@/lib/server/email';

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

    // Fire-and-forget — don't block the response on email
    sendBookingNotification({
      clientName: record.clientName,
      email: record.email,
      projectType: record.projectType,
      projectDate: record.projectDate,
      projectDetails: record.projectDetails,
      budgetRange: record.budgetRange,
      preferredModels: record.preferredModels,
    }).catch((err) => console.error('[email] booking notification failed:', err));

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
