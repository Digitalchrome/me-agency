import Link from 'next/link';
import AdminGuard from '@/components/admin/AdminGuard';
import StatusBadge from '@/components/admin/StatusBadge';
import StatusUpdateForm from '@/components/admin/StatusUpdateForm';
import SubmissionFilters from '@/components/admin/SubmissionFilters';
import SubmissionsTable from '@/components/admin/SubmissionsTable';
import { JOIN_STATUSES, listJoinApplications } from '@/lib/submissions';

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminJoinQueuePage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const token = first(sp.token) ?? null;
  const q = first(sp.q) ?? '';
  const status = first(sp.status) ?? '';
  const limit = Number(first(sp.limit) ?? 25);
  const offset = Number(first(sp.offset) ?? 0);

  const data = await listJoinApplications({
    q,
    status: JOIN_STATUSES.includes(status as (typeof JOIN_STATUSES)[number])
      ? (status as (typeof JOIN_STATUSES)[number])
      : undefined,
    limit,
    offset,
  });

  return (
    <AdminGuard token={token}>
      <div className="container mx-auto px-4 py-12 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-electric-blue mb-2">Admin Queue</p>
            <h1 className="font-editorial text-4xl md:text-6xl font-bold uppercase tracking-tighter">Join Applications</h1>
          </div>
          <div className="flex gap-3">
            <Link href={`/admin?token=${encodeURIComponent(token ?? '')}`} className="btn-brutal">
              Dashboard
            </Link>
            <a href={`/api/admin/exports/join.csv?token=${encodeURIComponent(token ?? '')}`} className="btn-brutal-primary">
              Export CSV
            </a>
          </div>
        </div>

        <SubmissionFilters
          token={token ?? ''}
          action="/admin/submissions/join"
          q={q}
          status={status}
          statuses={JOIN_STATUSES}
          countsByStatus={data.countsByStatus}
        />

        <p className="font-mono text-xs uppercase tracking-widest opacity-60">
          Showing {data.items.length} of {data.total} submissions
        </p>

        <SubmissionsTable headers={['Date', 'Name', 'Email', 'Location', 'Status', 'Review']}>
          {data.items.map((item) => (
            <tr key={item.id} className="border-t border-black/10 dark:border-white/10 align-top">
              <td className="px-4 py-4 font-mono text-xs whitespace-nowrap">
                {new Date(item.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-4">
                <p className="font-editorial text-xl font-bold">{item.fullName}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest opacity-60">
                  {item.instagram || 'No IG'}
                </p>
              </td>
              <td className="px-4 py-4 font-mono text-xs break-all">{item.email}</td>
              <td className="px-4 py-4">
                <p className="font-mono text-xs uppercase tracking-widest">{item.location}</p>
                <p className="text-sm opacity-70 mt-2">{item.about}</p>
              </td>
              <td className="px-4 py-4">
                <StatusBadge status={item.status} />
                {item.source ? (
                  <p className="font-mono text-[10px] uppercase tracking-widest opacity-50 mt-2">
                    {item.source}
                  </p>
                ) : null}
              </td>
              <td className="px-4 py-4 min-w-[260px]">
                <StatusUpdateForm
                  token={token ?? ''}
                  endpoint={`/api/admin/submissions/join/${item.id}`}
                  statuses={JOIN_STATUSES}
                  currentStatus={item.status}
                  currentNotes={item.notes}
                />
              </td>
            </tr>
          ))}
        </SubmissionsTable>
      </div>
    </AdminGuard>
  );
}

