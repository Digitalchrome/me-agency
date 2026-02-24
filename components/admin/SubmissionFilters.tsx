type CountMap = Record<string, number>;

export default function SubmissionFilters({
  token,
  action,
  q,
  status,
  statuses,
  countsByStatus,
}: {
  token: string;
  action: string;
  q?: string;
  status?: string;
  statuses: readonly string[];
  countsByStatus: CountMap;
}) {
  return (
    <form method="get" action={action} className="border-3 border-black dark:border-white p-4 md:p-6 bg-light-grey dark:bg-zinc-900">
      <input type="hidden" name="token" value={token} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="flex flex-col gap-2">
          <label htmlFor="q" className="font-mono text-[10px] uppercase tracking-widest">
            Search
          </label>
          <input
            id="q"
            name="q"
            defaultValue={q ?? ''}
            className="bg-transparent border-b-2 border-black dark:border-white py-2 focus:outline-none focus:border-electric-blue font-mono text-sm"
            placeholder="email, name, project..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="status" className="font-mono text-[10px] uppercase tracking-widest">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={status ?? ''}
            className="bg-transparent border-b-2 border-black dark:border-white py-2 focus:outline-none focus:border-electric-blue font-mono text-xs uppercase tracking-widest"
          >
            <option value="">All</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s} ({countsByStatus[s] ?? 0})
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-3">
          <button type="submit" className="btn-brutal-primary">
            Apply
          </button>
          <a href={`${action}?token=${encodeURIComponent(token)}`} className="btn-brutal">
            Reset
          </a>
        </div>
      </div>
    </form>
  );
}

