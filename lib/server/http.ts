import { NextResponse } from 'next/server';

export function jsonOk<T extends Record<string, unknown>>(payload: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, ...payload }, init);
}

export function jsonError(message: string, status = 400, extra?: Record<string, unknown>) {
  return NextResponse.json({ ok: false, error: message, ...(extra ?? {}) }, { status });
}

export function parsePagination(searchParams: URLSearchParams) {
  const limit = Number(searchParams.get('limit') ?? 25);
  const offset = Number(searchParams.get('offset') ?? 0);
  return {
    limit: Number.isFinite(limit) ? limit : 25,
    offset: Number.isFinite(offset) ? offset : 0,
  };
}

