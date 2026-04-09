'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(
      form.subject ? `[${form.subject}] from ${form.name}` : `Message from ${form.name}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\n${form.message}`
    );
    window.location.href = `mailto:whomemodelingagency@mail.com?subject=${subject}&body=${body}`;
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="font-editorial text-7xl md:text-[12vw] font-bold mb-20 leading-[0.8] uppercase tracking-tighter">
        Get In <br /> Touch
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
        {/* Contact Info */}
        <div className="md:col-span-5 space-y-12">
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-electric-blue mb-4">
              Email
            </h3>
            <div className="space-y-2 font-editorial text-xl font-bold">
              <p>
                <a href="mailto:whomemodelingagency@mail.com" className="hover:text-electric-blue transition-colors underline decoration-2 underline-offset-4">
                  whomemodelingagency@mail.com
                </a>
              </p>
              <p>
                <a href="mailto:gabrieldebeckerpro@gmail.com" className="hover:text-electric-blue transition-colors underline decoration-2 underline-offset-4">
                  gabrieldebeckerpro@gmail.com
                </a>
                <span className="font-mono text-xs uppercase tracking-widest opacity-40 ml-3">Applications</span>
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-electric-blue mb-4">
              Social
            </h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/me_modelingagency"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border-3 border-black dark:border-white flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors font-mono font-bold text-sm"
              >
                IG
              </a>
            </div>
            <p className="font-mono text-xs uppercase tracking-widest opacity-40 mt-3">
              @me_modelingagency
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-electric-blue mb-4">
              Hours
            </h3>
            <div className="font-mono text-sm uppercase tracking-widest space-y-1 opacity-60">
              <p>Monday – Friday: By appointment</p>
              <p>contact us to schedule</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="space-y-8 bg-light-grey dark:bg-dark-grey p-10 md:p-12 border-3 border-black dark:border-white shadow-brutal"
          >
            <h2 className="font-editorial text-3xl font-bold mb-2">Send us a message</h2>
            <p className="font-mono text-xs uppercase tracking-widest opacity-60 mb-8">
              We typically respond within 24 hours
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="font-mono text-xs font-bold uppercase tracking-widest">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="bg-transparent border-b-2 border-black dark:border-white py-3 focus:outline-none focus:border-electric-blue transition-colors font-mono"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="font-mono text-xs font-bold uppercase tracking-widest">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="bg-transparent border-b-2 border-black dark:border-white py-3 focus:outline-none focus:border-electric-blue transition-colors font-mono"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-subject" className="font-mono text-xs font-bold uppercase tracking-widest">
                Subject
              </label>
              <select
                id="contact-subject"
                value={form.subject}
                onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                className="bg-transparent border-b-2 border-black dark:border-white py-3 focus:outline-none focus:border-electric-blue transition-colors font-mono uppercase text-xs tracking-widest"
              >
                <option value="">Select a topic...</option>
                <option>General Inquiry</option>
                <option>Booking Request</option>
                <option>Model Application</option>
                <option>Press / Media</option>
                <option>Partnership</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className="font-mono text-xs font-bold uppercase tracking-widest">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                required
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                className="bg-transparent border-b-2 border-black dark:border-white py-3 focus:outline-none focus:border-electric-blue transition-colors font-mono resize-none"
              />
            </div>

            <button type="submit" className="btn-brutal-primary w-full mt-4">
              Send Message
            </button>

            <p className="font-mono text-xs uppercase tracking-widest opacity-40 text-center">
              This will open your email client with the message pre-filled.
            </p>
          </form>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-32 flex flex-wrap gap-6 justify-center">
        <Link href="/join" className="font-mono text-sm uppercase tracking-widest underline hover:text-electric-blue transition-colors">
          Become a Model →
        </Link>
        <Link href="/booking" className="font-mono text-sm uppercase tracking-widest underline hover:text-electric-blue transition-colors">
          Book a Model →
        </Link>
        <Link href="/agency" className="font-mono text-sm uppercase tracking-widest underline hover:text-electric-blue transition-colors">
          The Agency →
        </Link>
      </div>
    </div>
  );
}
