/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brutalist monochrome base / Base monochrome brutaliste
        black: '#000000',
        white: '#FFFFFF',
        'light-grey': '#F3F3F3',
        'dark-grey': '#1A1A1A',

        // Accent color for brutalist design / Couleur d'accent pour design brutaliste
        'electric-blue': {
          DEFAULT: 'hsl(210, 100%, 50%)',
          50: 'hsl(210, 100%, 95%)',
          100: 'hsl(210, 100%, 90%)',
          200: 'hsl(210, 100%, 80%)',
          300: 'hsl(210, 100%, 70%)',
          400: 'hsl(210, 100%, 60%)',
          500: 'hsl(210, 100%, 50%)',
          600: 'hsl(210, 100%, 40%)',
          700: 'hsl(210, 100%, 30%)',
          800: 'hsl(210, 100%, 20%)',
          900: 'hsl(210, 100%, 10%)',
        },

        // Status colors / Couleurs de statut
        success: 'hsl(142, 76%, 36%)',
        warning: 'hsl(38, 92%, 50%)',
        error: 'hsl(0, 84%, 60%)',
      },

      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        editorial: ['Editorial New', 'Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },

      fontSize: {
        // Extreme typographic scale for brutalist design
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        brutal: ['clamp(3rem, 10vw, 12rem)', { lineHeight: '0.9' }],
      },

      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },

      animation: {
        // Brutalist animations
        glitch: 'glitch 1s linear infinite',
        shimmer: 'shimmer 2s linear infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.3s ease-in',
      },

      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },

      backdropBlur: {
        xs: '2px',
      },

      boxShadow: {
        brutal: 'var(--shadow-brutal)',
        'brutal-hover': 'var(--shadow-brutal-hover)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
      },

      borderWidth: {
        3: '3px',
        6: '6px',
      },
    },
  },
  plugins: [],
};
