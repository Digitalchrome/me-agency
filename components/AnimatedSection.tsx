'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Composant réutilisable pour animations au scroll
 * Reusable scroll-triggered animation wrapper
 */

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  direction?: 'up' | 'left' | 'right' | 'fade';
  delay?: number;
  duration?: number;
  once?: boolean;
}

const directionVariants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export default function AnimatedSection({
  children,
  className = '',
  id,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  once = true,
}: AnimatedSectionProps) {
  const variants = directionVariants[direction] ?? directionVariants.up;

  return (
    <motion.div
      id={id}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Composant pour animation en cascade des enfants
 * Staggered children animation wrapper
 */
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  once = true,
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={{
        ...containerVariants,
        visible: {
          transition: { staggerChildren: staggerDelay },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
