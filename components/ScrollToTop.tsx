'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Bouton de retour en haut de page
 * Floating scroll-to-top button that appears after scrolling
 */
export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-black dark:bg-white text-white dark:text-black border-3 border-black dark:border-white shadow-brutal hover:shadow-brutal-hover hover:-translate-y-1 transition-all duration-200 flex items-center justify-center font-mono text-lg font-bold"
          aria-label="Scroll to top"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}
