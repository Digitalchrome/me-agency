'use client';

import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Navbar component for ME Modeling Agency
 * Design: Brutalist, deconstructed, responsive with mobile menu
 */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Models', href: '/#roster' },
    { name: 'Agency', href: '/agency' },
    { name: 'Journal', href: '/journal' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="nav-brutal">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="font-editorial text-2xl font-bold hover:text-electric-blue transition-all duration-300 hover:scale-110 active:scale-95"
        >
          ME
        </Link>

        <div className="flex items-center gap-6">
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-mono text-sm uppercase tracking-[0.2em] hover:text-electric-blue border-b-2 border-transparent hover:border-electric-blue transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 border-l-2 border-black/10 dark:border-white/10 pl-6">
            <ThemeToggle />
            <Link href="/join" className="hidden lg:block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-brutal-primary py-2 px-4 text-xs"
              >
                Apply Now
              </motion.button>
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen ? 'true' : 'false'}
            >
              <span
                className={`block w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`block w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden border-t-3 border-black dark:border-white bg-white dark:bg-dark-grey overflow-hidden"
          >
            <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-lg uppercase tracking-[0.2em] hover:text-electric-blue transition-colors py-2 border-b border-black/10 dark:border-white/10"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/join"
                onClick={() => setMobileOpen(false)}
                className="btn-brutal-primary text-center mt-4"
              >
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
