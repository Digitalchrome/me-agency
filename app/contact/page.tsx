import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with ME Modeling Agency — bookings, applications, and general inquiries.',
};

export default function ContactPage() {
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
              Headquarters
            </h3>
            <p className="font-editorial text-2xl font-bold leading-relaxed">
              12 Rue Faidherbe<br />
              59000 Lille<br />
              Hauts-de-France, France
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-electric-blue mb-4">
              Email
            </h3>
            <div className="space-y-2 font-editorial text-xl font-bold">
              <p>
                <a href="mailto:info@me-agency.com" className="hover:text-electric-blue transition-colors underline decoration-2 underline-offset-4">
                  info@me-agency.com
                </a>
              </p>
              <p>
                <a href="mailto:bookings@me-agency.com" className="hover:text-electric-blue transition-colors underline decoration-2 underline-offset-4">
                  bookings@me-agency.com
                </a>
              </p>
              <p>
                <a href="mailto:applications@me-agency.com" className="hover:text-electric-blue transition-colors underline decoration-2 underline-offset-4">
                  applications@me-agency.com
                </a>
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-electric-blue mb-4">
              Social
            </h3>
            <div className="flex gap-4">
              {[
                { label: 'IG', url: '#' },
                { label: 'TW', url: '#' },
                { label: 'LI', url: '#' },
                { label: 'TT', url: '#' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  className="w-12 h-12 border-3 border-black dark:border-white flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors font-mono font-bold text-sm"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-electric-blue mb-4">
              Hours
            </h3>
            <div className="font-mono text-sm uppercase tracking-widest space-y-1 opacity-60">
              <p>Monday – Friday: 09:00 – 18:00 CET</p>
              <p>Saturday: By appointment</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7">
          <form className="space-y-8 bg-light-grey dark:bg-zinc-900 p-10 md:p-12 border-3 border-black dark:border-white shadow-brutal">
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
                className="bg-transparent border-b-2 border-black dark:border-white py-3 focus:outline-none focus:border-electric-blue transition-colors font-mono resize-none"
              />
            </div>

            <button type="submit" className="btn-brutal-primary w-full mt-4">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="mt-32 aspect-[21/9] border-3 border-black dark:border-white overflow-hidden bg-light-grey dark:bg-dark-grey flex items-center justify-center">
        <div className="text-center">
          <p className="font-editorial text-5xl md:text-7xl font-bold mb-4">LILLE</p>
          <p className="font-mono text-xs uppercase tracking-[0.3em] opacity-60">
            50.6292° N, 3.0573° E
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-16 flex flex-wrap gap-6 justify-center">
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
