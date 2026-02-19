# Me?

## Overview

This repository is a **Next.js (App Router) + TypeScript** web application. It uses:

- Next.js (currently configured as `next@15.0.0-rc.0`)
- React (RC version)
- TailwindCSS + PostCSS
- Framer Motion (page transitions / UI animation)
- Sanity client (headless CMS data source)

The project is organized around the `app/` directory (App Router). Pages are implemented as React components and data is fetched from Sanity using GROQ queries.

## How to run

- Install dependencies:
  - `npm install`
- Start development server:
  - `npm run dev`
- Build for production:
  - `npm run build`
- Start production build locally:
  - `npm run start`
- Lint:
  - `npm run lint`

## Configuration notes

- **TypeScript**: configured via `tsconfig.json`.
  - Path alias: `@/*` maps to the repository root.
- **TailwindCSS**:
  - `tailwind.config.js` scans `app/**/*` and `components/**/*`.
  - Global styles are in `styles/globals.css`.
- **Sanity**:
  - Sanity client setup lives in `lib/sanity.ts`.
  - You must set the correct Sanity `projectId` (currently a placeholder) and ensure the dataset name is correct.

## Project structure (high-level)

### `app/`

Next.js App Router routes.

- `app/layout.tsx`
  - Root layout.
  - Loads global CSS and wraps pages with `PageTransitionWrapper`.
  - Defines site metadata (title/description).

- `app/page.tsx`
  - Home page (client component).
  - Fetches a list of items from Sanity and renders them in a responsive masonry grid.
  - Applies filtering through the `Filter` component.

- `app/[slug]/page.tsx`
  - Dynamic route for an item details page.
  - Fetches one item by `slug` from Sanity.
  - Uses `generateStaticParams()` for static pre-rendering based on available slugs.
  - Renders detailed information and a tabbed section.

- `app/comp-card/[slug]/page.tsx`
  - Dynamic route intended for a printable, single-page “card” view.
  - Fetches an item by `slug` and limits the data set for that view.

### `components/`

Reusable UI components.

- `components/PageTransitionWrapper.tsx`
  - Wraps route changes in an `AnimatePresence` transition based on `usePathname()`.

- `components/Filter.tsx`
  - Client-side filtering UI.
  - Filters the in-memory list by selected criteria and updates the displayed set.

- `components/ModelCard.tsx`
  - Card component used on the grid/list page.
  - Links to the dynamic details route.

- `components/Tabs.tsx`
  - Small tab component that switches between `ReactNode` contents.

- `components/Stats.tsx`
  - Displays numeric/string attributes.
  - Supports metric/imperial unit switching.

### `lib/`

Shared non-UI code.

- `lib/sanity.ts`
  - Creates the Sanity client.
  - Exposes a helper for building URLs (for Sanity-hosted assets).

- `lib/types.ts`
  - Defines the main TypeScript types used by the app.

### `styles/`

- `styles/globals.css`
  - Tailwind directives and a few global utility classes.

### Root config files

- `package.json`
  - Scripts and dependencies.
- `postcss.config.js`
  - Tailwind + autoprefixer.
- `tailwind.config.js`
  - Tailwind theme extensions.
- `tsconfig.json`
  - TS settings + `@/*` alias.

## Data flow (at a glance)

- Pages fetch data from Sanity via `client.fetch(GROQ_QUERY, params)`.
- Shared components receive typed props (`Model`, etc.) and render UI.
- Filtering is performed on the client by maintaining `models` + `filteredModels` state.

## What was intentionally excluded from this resume

- This document intentionally **does not list or describe media assets** (images/video/audio/font files) and does not include a media inventory.
- If you want, I can additionally help you produce a separate “cleanup list” of media files to delete (requires confirmation before removing files).
