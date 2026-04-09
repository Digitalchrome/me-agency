'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';

type JoinFormState = {
  fullName: string;
  email: string;
  location: string;
  instagram: string;
  about: string;
  website: string;
};

const initialState: JoinFormState = {
  fullName: '',
  email: '',
  location: '',
  instagram: '',
  about: '',
  website: '',
};

export default function JoinApplicationForm() {
  const [form, setForm] = useState<JoinFormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string; message?: string };

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Unable to submit application');
      }

      setSuccessMessage(data.message || 'Application submitted successfully');
      setForm(initialState);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unexpected error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-8 bg-light-grey dark:bg-dark-grey p-10 md:p-12 border-3 border-black dark:border-white shadow-brutal"
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { key: 'fullName', label: 'Full Name', type: 'text' },
          { key: 'email', label: 'Email', type: 'email' },
          { key: 'location', label: 'Location', type: 'text' },
          { key: 'instagram', label: 'Instagram', type: 'text' },
        ].map((field) => (
          <div key={field.key} className="flex flex-col gap-2">
            <label htmlFor={field.key} className="font-mono text-xs font-bold uppercase tracking-widest">
              {field.label}
            </label>
            <input
              id={field.key}
              type={field.type}
              value={form[field.key as keyof JoinFormState]}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, [field.key]: event.target.value }))
              }
              className="bg-transparent border-b-2 border-black dark:border-white py-3 focus:outline-none focus:border-electric-blue transition-colors font-mono"
              required={field.key !== 'instagram'}
              autoComplete={field.key === 'email' ? 'email' : field.key === 'fullName' ? 'name' : 'off'}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="about" className="font-mono text-xs font-bold uppercase tracking-widest">
          Tell us about yourself
        </label>
        <textarea
          id="about"
          rows={4}
          value={form.about}
          onChange={(event) => setForm((prev) => ({ ...prev, about: event.target.value }))}
          className="bg-transparent border-b-2 border-black dark:border-white py-3 focus:outline-none focus:border-electric-blue transition-colors font-mono resize-none"
          required
          minLength={20}
        />
      </div>

      {error ? (
        <p className="font-mono text-xs uppercase tracking-widest text-red-600 dark:text-red-400">{error}</p>
      ) : null}

      {successMessage ? (
        <p className="font-mono text-xs uppercase tracking-widest text-green-700 dark:text-green-400">
          {successMessage}
        </p>
      ) : null}

      <button type="submit" className="btn-brutal-primary w-full mt-4 disabled:opacity-60" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit Application'}
      </button>

      <p className="font-mono text-[10px] uppercase tracking-widest opacity-40 text-center">
        By submitting, you agree to our <Link href="/privacy" className="underline">privacy policy</Link>
      </p>
    </form>
  );
}
