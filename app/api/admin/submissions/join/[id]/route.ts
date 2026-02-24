import { joinStatusUpdateSchema, updateJoinApplicationStatus } from '@/lib/submissions';
import { requireAdminAccess } from '@/lib/server/admin-auth';
import { jsonError, jsonOk } from '@/lib/server/http';

export const runtime = 'nodejs';

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteProps) {
  const auth = requireAdminAccess(request);
  if (!auth.ok) return auth.response;

  try {
    const body = await request.json();
    const parsed = joinStatusUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? 'Invalid payload', 400, {
        issues: parsed.error.flatten(),
      });
    }

    const { id } = await params;
    const updated = await updateJoinApplicationStatus(id, parsed.data);
    if (!updated) return jsonError('Submission not found', 404);

    return jsonOk({ item: updated });
  } catch (error) {
    console.error('PATCH /api/admin/submissions/join/[id] failed', error);
    return jsonError('Server error', 500);
  }
}

