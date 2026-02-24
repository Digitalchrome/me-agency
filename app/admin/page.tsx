import Link from 'next/link';
import AdminGuard from '@/components/admin/AdminGuard';
import { getSubmissionStats } from '@/lib/submissions';

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const token = first(sp.token) ?? null;
  const stats = await getSubmissionStats();

  return (
    <AdminGuard token={token}>
      <div className="container mx-auto px-4 py-16 space-y-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-electric-blue mb-3">Admin</p>
            <h1 className="font-editorial text-5xl md:text-7xl font-bold uppercase tracking-tighter">
              Submission Ops
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`/api/admin/exports/join.csv?token=${encodeURIComponent(token ?? '')}`}
              className="btn-brutal"
            >
              Export Join CSV
            </a>
            <a
              href={`/api/admin/exports/bookings.csv?format=mega-db&token=${encodeURIComponent(token ?? '')}`}
              className="btn-brutal-primary"
            >
              Export Bookings (MEGA DB)
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-3 border-black dark:border-white p-6 bg-light-grey dark:bg-zinc-900 shadow-brutal">
            <p className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2">Join Applications</p>
            <p className="font-editorial text-5xl font-bold mb-4">{stats.join.total}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(stats.join.countsByStatus).map(([status, count]) => (
                <span key={status} className="px-2 py-1 border-2 border-black dark:border-white font-mono text-[10px] uppercase tracking-widest">
                  {status}: {count}
                </span>
              ))}
            </div>
            <Link href={`/admin/submissions/join?token=${encodeURIComponent(token ?? '')}`} className="btn-brutal-primary">
              Open Join Queue
            </Link>
          </div>

          <div className="border-3 border-black dark:border-white p-6 bg-light-grey dark:bg-zinc-900 shadow-brutal">
            <p className="font-mono text-xs uppercase tracking-widest opacity-60 mb-2">Booking Requests</p>
            <p className="font-editorial text-5xl font-bold mb-4">{stats.bookings.total}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(stats.bookings.countsByStatus).map(([status, count]) => (
                <span key={status} className="px-2 py-1 border-2 border-black dark:border-white font-mono text-[10px] uppercase tracking-widest">
                  {status}: {count}
                </span>
              ))}
            </div>
            <Link href={`/admin/submissions/bookings?token=${encodeURIComponent(token ?? '')}`} className="btn-brutal-primary">
              Open Booking Queue
            </Link>
          </div>
        </div>

        <div className="border-3 border-black dark:border-white p-6">
          <h2 className="font-editorial text-3xl font-bold mb-3">Seed Demo Data</h2>
          <p className="font-mono text-xs uppercase tracking-widest opacity-60 mb-4">
            Create fake submissions via the API route (admin token required).
          </p>
          <code className="block text-xs font-mono break-all">
            POST /api/admin/demo/seed?token={token ?? 'demo-admin'}
          </code>
        </div>
      </div>
    </AdminGuard>
  );
}

