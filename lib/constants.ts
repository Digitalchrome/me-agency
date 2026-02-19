/**
 * Constantes de l'application
 * Application constants
 */

// Options de filtrage / Filter options
export const GENDER_OPTIONS = ['Male', 'Female', 'Non-Binary'] as const;
export const CATEGORY_OPTIONS = ['Mainboard', 'Development', 'Classic'] as const;
export const STATUS_OPTIONS = ['Available', 'Travel', 'Unavailable'] as const;

// Couleurs de statut / Status colors
export const STATUS_COLORS = {
  Available: 'bg-green-500',
  Travel: 'bg-blue-500',
  Unavailable: 'bg-gray-400',
} as const;

// Animations / Animations
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// Breakpoints (correspond à Tailwind) / Breakpoints (matches Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Messages d'erreur / Error messages
export const ERROR_MESSAGES = {
  FETCH_FAILED: 'Échec du chargement des données / Failed to load data',
  MODEL_NOT_FOUND: 'Modèle introuvable / Model not found',
  NETWORK_ERROR: 'Erreur réseau / Network error',
} as const;
