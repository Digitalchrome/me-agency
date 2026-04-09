# ME Agency — Brand-Ready Polish Design Spec

**Date:** 2026-04-08  
**Goal:** Make the ME modeling agency website professional enough to present to real brands, with all placeholder/fake content removed and a Sanity CMS foundation ready for real model content.

---

## Context

ME is a new boutique modeling agency founded in Lille, France in 2026. The website (Next.js 15, Tailwind CSS, Framer Motion) is visually polished at an 8.5/10 level but currently runs entirely on demo data — fake brand names (Vogue, Dior), fake testimonials, placeholder social links, and Unsplash stock model photos. The owner will be sharing the live URL with real fashion and lifestyle brands. The site must look credible and intentional, with no amateur placeholder content visible.

**Approach chosen:** Quick Wins Now + Sanity Foundation Later  
- Phase 1: Remove/fix all fake and broken content immediately (no CMS needed)  
- Phase 2: Build Sanity CMS schemas and embed Studio so real model content can be added when photos are ready

---

## Phase 1 — Immediate Content Fixes

### 1.1 Home Page (`components/HomePageClient.tsx`)

**Remove: `ClientsMarquee` component**  
The `CLIENTS` array (`['Vogue', 'Dior', 'Balenciaga', ...]`) and `ClientsMarquee` function must be deleted entirely.

**Replace with: `ManifestoSection` component**  
New two-column section using the site's existing design language (black background, electric-blue accent, monospace + editorial fonts, border-3 brutalist borders). Proposed copy:

- Eyebrow: `EST. 2026 — LILLE, FRANCE`
- Headline: `The fashion world has rules. We're rewriting them.`
- Body: `ME was born in 2026 with one belief: beauty has no single shape, shade, or size. We represent the models the industry forgot — and the ones it hasn't discovered yet.`
- Right column (3 value props):
  - `FRESH PERSPECTIVE` — No legacy bias. No outdated beauty standards. Just the world as it actually looks.
  - `REAL OPPORTUNITY` — Be among the first brands to build something meaningful with us — at the ground floor.
  - `BEYOND FASHION` — Our talent spans editorial, commercial, social, and lifestyle — the full spectrum of human beauty.

**Remove: `Testimonials` component**  
The `TESTIMONIALS` array contains fake quotes from fake "Fashion Director, Vogue France" contacts. Remove the array and the `Testimonials` function entirely. Remove `<Testimonials />` from the render tree.

**Keep untouched:**
- `HeroSection` — already strong, copy is real
- `AboutTeaser` — copy is real and accurate
- `StatsSection` — numbers (10+, 6 cities, 3 continents, 2026) are real
- `FeaturedModelStrip` — demo models OK for now (Sanity will replace)
- `ManifestoMarquee` — "Diversity is Power • Authenticity is Key" — keep as-is
- `CTASection` — copy is real, keep as-is
- `ModelGrid` — keep as-is

### 1.2 Contact Page (`app/contact/page.tsx`)

- **Email (primary):** `whomemodelingagency@mail.com`
- **Email (bookings):** `whomemodelingagency@mail.com`
- **Email (applications/fallback):** `gabrieldebeckerpro@gmail.com`
- **Instagram:** `https://www.instagram.com/me_modelingagency` (link + handle)
- **Other socials (TikTok, Twitter, LinkedIn):** Remove their icons/links for now — they will be added later
- **Map:** Remove the map placeholder section entirely — clean removal, no stub
- **Hours of operation:** Remove if not confirmed real hours — clean removal preferred

### 1.3 Footer (`components/Footer.tsx`)

- **Instagram link:** Update `href="#"` → `https://www.instagram.com/me_modelingagency`
- **Other social icons:** Remove any social icons that link to `#` (TikTok, Twitter, LinkedIn) — add back when handles are confirmed

### 1.4 About Page (`app/about/page.tsx`)

- **Fake client logos section:** Remove any section displaying brand logos (Vogue, Dior, etc.) as past clients
- **Timeline:** Audit for any dates/milestones that are clearly fabricated — align with real 2026 founding story
- **Brand story copy:** Audit for placeholder tone — the existing "diversity and authenticity" direction is correct, keep if accurate

### 1.5 Agency Page (`app/agency/page.tsx`)

- **Agency photo placeholder:** The Unsplash stock photo is acceptable for now — leave as-is (clearly editorial, not deceptive)
- **Team members:** If team data is placeholder (fake names), either remove the team section or replace with real team info. Do not show fake people.

### 1.6 Journal Page (`app/journal/page.tsx`)

- **Newsletter form:** Remove the email subscription form — no backend is wired. Replace with a simple Instagram follow CTA: "Follow us on Instagram @me_modelingagency for the latest."

---

## Phase 2 — Sanity CMS Foundation

### 2.1 Sanity Project Setup

The codebase already has `@sanity/client` installed and a full demo-mode fallback in `lib/data-service.ts`. Switching to live mode requires only updating `.env.local` with real credentials.

**Required environment variables (to document in `.env.example`):**
```
NEXT_PUBLIC_SANITY_PROJECT_ID=<real-project-id>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<editor-token>
```

### 2.2 Sanity Schemas

Create a `sanity/` directory at the project root with `sanity.config.ts` and schemas:

**`model.ts`** — Core content type
```
name, slug, status (active/inactive/exclusive),
category (editorial/commercial/lifestyle/plus-size/fitness),
location, nationality,
height (cm), bust (cm), waist (cm), hips (cm), shoeSize,
eyeColor, hairColor,
coverImage (Sanity image asset),
portfolio (array of Sanity image assets),
bio (text),
instagramHandle
```

**`journalPost.ts`** — Blog articles
```
title, slug, publishedAt, coverImage, excerpt, body (block content), tags
```

**`teamMember.ts`** — Agency team
```
name, role, photo, bio, order
```

**`testimonial.ts`** — For future use when real testimonials are collected
```
quote, author, role, company, approved (boolean)
```

### 2.3 Embedded Sanity Studio

Add `app/studio/[[...tool]]/page.tsx` to embed Sanity Studio at `/studio`. Access at `localhost:3000/studio` in development.

This allows the owner to:
- Add real models with photos directly through a UI
- Write journal posts
- Update team info
- All without touching code

### 2.4 Data Service Integration

The existing `lib/data-service.ts` already has a clean demo-vs-live split. When `NEXT_PUBLIC_SANITY_PROJECT_ID !== 'demo-project'`, it queries Sanity. No changes needed to this logic — the schemas just need to match the GROQ queries already written.

Verify that schema field names in Phase 2.2 match existing GROQ queries in `lib/data-service.ts` and `lib/sanity.ts`.

---

## Real Contact Information

| Field | Value |
|-------|-------|
| Main email | whomemodelingagency@mail.com |
| Bookings email | whomemodelingagency@mail.com |
| Applications / fallback | gabrieldebeckerpro@gmail.com |
| Instagram | @me_modelingagency |
| Other socials | TBD — remove placeholders for now |
| Address | TBD — remove placeholder for now |

---

## What Stays Untouched

The visual design system, animations, dark mode, typography, responsive layouts, hero section, model roster UI, booking form, join form, legal pages, SEO/metadata, and performance optimizations are all excellent and require no changes. Only content is modified.

---

## Verification

### Phase 1 Checks
- [ ] Home page: No "Vogue", "Dior", "Balenciaga", or similar names visible anywhere
- [ ] Home page: No fake testimonials visible
- [ ] Home page: ManifestoSection renders correctly in both light and dark mode
- [ ] Contact page: Instagram link opens `instagram.com/me_modelingagency`
- [ ] Contact page: No broken `#` social links visible
- [ ] Contact page: No map placeholder or empty map iframe
- [ ] Footer: Instagram link works; no dead social icons
- [ ] Journal page: No newsletter form visible
- [ ] About page: No fake client logo section
- [ ] All pages: No console errors

### Phase 2 Checks
- [ ] `sanity/` directory exists with all 4 schemas
- [ ] `.env.example` documents all required Sanity variables
- [ ] `app/studio/[[...tool]]/page.tsx` exists and loads at `/studio`
- [ ] Schema field names match GROQ queries in `lib/data-service.ts`
- [ ] Switching `NEXT_PUBLIC_SANITY_PROJECT_ID` to a real value loads Sanity data (manual test)
