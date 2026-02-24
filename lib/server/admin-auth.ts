import 'server-only';

import { jsonError } from '@/lib/server/http';

const DEFAULT_DEMO_ADMIN_TOKEN = 'demo-admin';

export function getAdminTokenFromRequest(request: Request) {
  const url = new URL(request.url);
  const queryToken = url.searchParams.get('token');
  const headerToken =
    request.headers.get('x-admin-token') ||
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ||
    null;
  return queryToken || headerToken || null;
}

export function getExpectedAdminToken() {
  return process.env.ADMIN_ACCESS_TOKEN || DEFAULT_DEMO_ADMIN_TOKEN;
}

export function isAdminTokenValid(token?: string | null) {
  return Boolean(token) && token === getExpectedAdminToken();
}

export function requireAdminAccess(request: Request) {
  const token = getAdminTokenFromRequest(request);
  if (!isAdminTokenValid(token)) {
    return {
      ok: false as const,
      response: jsonError('Unauthorized admin access', 401),
    };
  }
  return { ok: true as const, token };
}

