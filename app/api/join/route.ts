import { joinApplicationSchema, saveJoinApplication } from '@/lib/submissions';
import { jsonError, jsonOk } from '@/lib/server/http';
import { sendJoinNotification } from '@/lib/server/email';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = joinApplicationSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return jsonError(firstIssue?.message ?? 'Invalid payload', 400, { issues: parsed.error.flatten() });
    }

    const record = await saveJoinApplication(parsed.data);

    // Fire-and-forget — don't block the response on email
    sendJoinNotification({
      fullName: record.fullName,
      email: record.email,
      location: record.location,
      instagram: record.instagram,
      about: record.about,
    }).catch((err) => console.error('[email] join notification failed:', err));

    return jsonOk({
      id: record.id,
      createdAt: record.createdAt,
      message: 'Application received. Our talent team will review it shortly.',
    });
  } catch (error) {
    console.error('POST /api/join failed', error);
    return jsonError('Server error', 500);
  }
}
