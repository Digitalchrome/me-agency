'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Navbar avec effet glassmorphisme au scroll
 * Navbar with glassmorphism effect on scroll
 */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Models', href: '/#roster' },
    { name: 'Agency', href: '/agency' },
    { name: 'Journal', href: '/journal' },
    { name: 'Discover', href: '/discover' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/#roster') return pathname === '/';
    return pathname === href;
  };

  return (
    <nav className={`nav-brutal ${scrolled ? 'nav-scrolled' : ''}`}>
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
                className={`font-mono text-sm uppercase tracking-[0.2em] transition-all animated-underline ${
                  isActive(link.href)
                    ? 'text-electric-blue font-bold'
                    : 'hover:text-electric-blue'
                }`}
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
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`font-mono text-lg uppercase tracking-[0.2em] transition-colors py-2 border-b border-black/10 dark:border-white/10 block ${
                      isActive(link.href)
                        ? 'text-electric-blue font-bold'
                        : 'hover:text-electric-blue'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/join"
                  onClick={() => setMobileOpen(false)}
                  className="btn-brutal-primary text-center mt-4 block"
                >
                  Apply Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
