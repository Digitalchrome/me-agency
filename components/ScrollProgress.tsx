'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Barre de progression du scroll
 * Scroll progress bar fixed at top of viewport
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-electric-blue origin-left z-[60]"
      style={{ scaleX }}
    />
  );
}
