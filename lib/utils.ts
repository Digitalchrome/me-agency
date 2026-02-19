import { type ClassValue, clsx } from 'clsx';

/**
 * Utility pour fusionner les classes CSS conditionnellement
 * Utility to merge CSS classes conditionally
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Formatte la hauteur en cm ou pieds/pouces
 * Formats height in cm or feet/inches
 */
export function formatHeight(cm: number, imperial = false): string {
  if (imperial) {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}'${inches}"`;
  }
  return `${cm} cm`;
}

/**
 * Formatte les mesures en cm ou pouces
 * Formats measurements in cm or inches
 */
export function formatMeasurement(cm: number, imperial = false): string {
  if (imperial) {
    return `${Math.round(cm / 2.54)}"`;
  }
  return `${cm} cm`;
}

/**
 * Formatte la pointure EU en US
 * Formats EU shoe size to US
 */
export function formatShoeSize(eu: number, imperial = false): string {
  if (imperial) {
    // Approximation EU to US conversion
    const us = eu - 33;
    return `US ${us}`;
  }
  return `EU ${eu}`;
}

/**
 * Debounce une fonction
 * Debounces a function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Génère un ID unique
 * Generates a unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
