# ME Modeling Agency - Humanity's Modeling Agency

## 🎯 Project Overview

**ME Modeling Agency** is humanity's modeling agency website built with Next.js 15, React 19, and a cutting-edge **Hybrid Editorial Brutalism + 3D Accents** design system. We celebrate diversity and make differences our strength.

## ✨ Key Features

- **Brutalist Editorial Design**: Raw, authentic aesthetic with bold typography and anti-grid layouts
- **Selective 3D Elements**: Strategic use of WebGL/Three.js for premium model showcases
- **Dark Mode**: Full dark mode support with smooth transitions
- **Performance-First**: Optimized for Core Web Vitals with streaming and Suspense
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **SEO Optimized**: Dynamic metadata, structured data, and Open Graph tags

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Sanity CMS account

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your Sanity credentials to .env.local
# NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
# NEXT_PUBLIC_SANITY_DATASET=production

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page (model grid)
│   ├── [slug]/            # Dynamic model detail pages
│   └── comp-card/         # Printable comp cards
├── components/            # Reusable React components
│   ├── ui/               # UI primitives (Button, Badge, Skeleton)
│   ├── Filter.tsx        # Model filtering
│   ├── ModelCard.tsx     # Model card with 3D effects
│   ├── Stats.tsx         # Model statistics
│   └── Tabs.tsx          # Tabbed interface
├── lib/                   # Utilities and configuration
│   ├── sanity.ts         # Sanity client setup
│   ├── types.ts          # TypeScript types
│   ├── utils.ts          # Helper functions
│   └── constants.ts      # App constants
├── styles/               # Global styles
│   └── globals.css       # Tailwind + custom CSS
└── public/               # Static assets
```

## 🎨 Design System

### Color Palette

- **Monochrome Base**: Pure black (#000000) and white (#FFFFFF)
- **Accent**: Electric Blue (HSL 210, 100%, 50%)
- **Status Colors**: Success (green), Warning (amber), Error (red)

### Typography

- **Sans**: Inter (body text)
- **Editorial**: Editorial New / Playfair Display (headings)
- **Mono**: JetBrains Mono (code, stats)

### Key Components

- `.btn-brutal` - Brutalist button with shadow offset
- `.glass-card` - Glassmorphism card
- `.model-card` - Model card with 3D hover effect
- `.glitch-text` - Glitch text effect on hover
- `.status-badge` - Status indicator badge

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
npm run format       # Format code with Prettier
```

## 🌐 Environment Variables

Create a `.env.local` file with:

```env
# Sanity CMS (Required)
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-05-01

# Optional
SANITY_API_TOKEN=your-token-here
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Admin demo access (optional, defaults to demo-admin)
ADMIN_ACCESS_TOKEN=demo-admin
```

## Admin / Demo Ops

- Admin dashboard: `/admin?token=demo-admin` (or your `ADMIN_ACCESS_TOKEN`)
- Join queue: `/admin/submissions/join?token=demo-admin`
- Booking queue: `/admin/submissions/bookings?token=demo-admin`
- Seed fake submissions:
  - `POST /api/admin/demo/seed?token=demo-admin`
- Export CSV:
  - `/api/admin/exports/join.csv?token=demo-admin`
  - `/api/admin/exports/bookings.csv?format=mega-db&token=demo-admin`

### Local Storage Notes

- Submissions are stored in `data/submissions/*.json` (demo/dev only)
- CSV exports are written to `data/exports/`
- This file-based storage is not suitable for production/serverless persistence

## 📦 Tech Stack

- **Framework**: Next.js 15.1.3 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4.1.0
- **3D Graphics**: React Three Fiber + Drei
- **CMS**: Sanity
- **Type Safety**: TypeScript 5.7 + Zod
- **Code Quality**: ESLint + Prettier

## 🎯 Performance Targets

- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 3.5s

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader optimized
- Focus indicators
- Reduced motion support

## 🌍 Internationalization

All code comments are bilingual (French/English) to support the Lille/Hauts-de-France market.

## 📄 License

Private - © 2026 GYL Modeling Agency

## 🤝 Contributing

This is a private project. For questions or support, contact the development team.

---

**Built with ❤️ using state-of-the-art web technologies**
