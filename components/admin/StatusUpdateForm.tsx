'use client';

import { useState, type FormEvent } from 'react';

export default function StatusUpdateForm({
  token,
  endpoint,
  statuses,
  currentStatus,
  currentNotes,
}: {
  token: string;
  endpoint: string;
  statuses: readonly string[];
  currentStatus: string;
  currentNotes?: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [notes, setNotes] = useState(currentNotes ?? '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(`${endpoint}?token=${encodeURIComponent(token)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes, reviewedBy: 'admin-ui' }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Update failed');
      }
      setMessage('Updated');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Update failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="border-2 border-black dark:border-white bg-transparent px-2 py-1 font-mono text-[10px] uppercase tracking-widest"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button type="submit" className="btn-brutal-primary px-3 py-1 text-xs" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
      <textarea
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        rows={2}
        className="w-full border-2 border-black/20 dark:border-white/20 bg-transparent px-2 py-1 font-mono text-[10px] tracking-wide resize-y"
        placeholder="Admin notes..."
      />
      {message ? <p className="font-mono text-[10px] text-green-700 dark:text-green-400">{message}</p> : null}
      {error ? <p className="font-mono text-[10px] text-red-600 dark:text-red-400">{error}</p> : null}
    </form>
  );
}

