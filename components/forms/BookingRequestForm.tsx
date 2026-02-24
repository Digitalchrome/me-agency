'use client';

import { useState, type FormEvent } from 'react';

type BookingFormState = {
  clientName: string;
  email: string;
  projectType: '' | 'Editorial' | 'Commercial' | 'Catwalk' | 'Event' | 'Other';
  projectDate: string;
  budgetRange: string;
  preferredModels: string;
  projectDetails: string;
  website: string;
};

const initialState: BookingFormState = {
  clientName: '',
  email: '',
  projectType: '',
  projectDate: '',
  budgetRange: '',
  preferredModels: '',
  projectDetails: '',
  website: '',
};

export default function BookingRequestForm() {
  const [form, setForm] = useState<BookingFormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          preferredModels: form.preferredModels
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean),
        }),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string; message?: string };

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Unable to submit booking request');
      }

      setSuccessMessage(data.message || 'Booking request sent');
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
      className="space-y-8 bg-light-grey dark:bg-zinc-900 p-10 md:p-12 border-3 border-black dark:border-white shadow-brutal"
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="booking-website">Website</label>
        <input
          id="booking-website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="client-name" className="font-mono text-xs font-bold uppercase tracking-widest">
            Client / Agency
          </label>
          <input
            id="client-name"
            type="text"
            value={form.clientName}
            onChange={(event) => setForm((prev) => ({ ...prev, clientName: event.target.value }))}
            className="bg-transparent border-b-2 border-black dark:border-white py-3 focus:outline-none focus:border-electric-blue transition-colors font-mono"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="client-email" className="font-mono text-xs font-bold uppercase tracking-widest">
            Email
          </label>
          <input
            id="client-email"
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            className="bg-transparent border-b-2 border-black dark:border-white py-3 focus:outline-none focus:border-electric-blue transition-colors font-mono"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="project-type" className="font-mono text-xs font-bold uppercase tracking-widest">
            Project Type
          </label>
          <select
            id="project-type"
            value={form.projectType}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                projectType: event.target.value as BookingFormState['projectType'],
              }))
            }
            className="bg-transparent border-b-2 border-black dark:border-white py-3 focus:outline-none focus:border-electric-blue transition-colors font-mono uppercase text-xs tracking-widest"
            required
          >
            <option value="">Select...</option>
            <option value="Editorial">Editorial</option>
            <option value="Commercial">Commercial</option>
            <option value="Catwalk">Catwalk</option>
            <option value="Event">Event</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="project-date" className="font-mono text-xs font-bold uppercase tracking-widest">
            Preferred Date
          </label>
          <input
            id="project-date"
            type="date"
            value={form.projectDate}
            onChange={(event) => setForm((prev) => ({ ...prev, projectDate: event.target.value }))}
            className="bg-transparent border-b-2 border-black dark:border-white py-3 focus:outline-none focus:border-electric-blue transition-colors font-mono"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="budget-range" className="font-mono text-xs font-bold uppercase tracking-widest">
            Budget Range (Optional)
          </label>
          <input
            id="budget-range"
            type="text"
            value={form.budgetRange}
            onChange={(event) => setForm((prev) => ({ ...prev, budgetRange: event.target.value }))}
            className="bg-transparent border-b-2 border-black dark:border-white py-3 focus:outline-none focus:border-electric-blue transition-colors font-mono"
            placeholder="e.g. 5k-10k EUR"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="preferred-models" className="font-mono text-xs font-bold uppercase tracking-widest">
            Preferred Models (Optional)
          </label>
          <input
            id="preferred-models"
            type="text"
            value={form.preferredModels}
            onChange={(event) => setForm((prev) => ({ ...prev, preferredModels: event.target.value }))}
            className="bg-transparent border-b-2 border-black dark:border-white py-3 focus:outline-none focus:border-electric-blue transition-colors font-mono"
            placeholder="amara-diallo, eden-park"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="project-details" className="font-mono text-xs font-bold uppercase tracking-widest">
          Project Details
        </label>
        <textarea
          id="project-details"
          rows={5}
          value={form.projectDetails}
          onChange={(event) => setForm((prev) => ({ ...prev, projectDetails: event.target.value }))}
          className="bg-transparent border-b-2 border-black dark:border-white py-3 focus:outline-none focus:border-electric-blue transition-colors font-mono resize-none"
          placeholder="Tell us about your project, budget, and any specific model requirements..."
          minLength={30}
          required
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
        {submitting ? 'Sending...' : 'Send Booking Request'}
      </button>
      <p className="font-mono text-[10px] uppercase tracking-widest opacity-40 text-center">
        We typically respond within 24 hours
      </p>
    </form>
  );
}
