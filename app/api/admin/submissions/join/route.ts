import { JOIN_STATUSES, listJoinApplications } from '@/lib/submissions';
import { requireAdminAccess } from '@/lib/server/admin-auth';
import { jsonError, jsonOk, parsePagination } from '@/lib/server/http';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const auth = requireAdminAccess(request);
  if (!auth.ok) return auth.response;

  try {
    const url = new URL(request.url);
    const statusParam = url.searchParams.get('status');
    const q = url.searchParams.get('q') ?? '';
    const { limit, offset } = parsePagination(url.searchParams);

    const status = statusParam && JOIN_STATUSES.includes(statusParam as (typeof JOIN_STATUSES)[number])
      ? (statusParam as (typeof JOIN_STATUSES)[number])
      : undefined;

    const result = await listJoinApplications({ status, q, limit, offset });
    return jsonOk(result);
  } catch (error) {
    console.error('GET /api/admin/submissions/join failed', error);
    return jsonError('Server error', 500);
  }
}

