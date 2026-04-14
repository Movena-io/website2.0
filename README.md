# Movena Website

Marketing website and waitlist for Movena. Built with Next.js 13 (App Router), Tailwind CSS, Framer Motion.

## Stack

- **Framework:** Next.js 13.5 (App Router)
- **Styling:** Tailwind CSS + custom design tokens
- **Animations:** Framer Motion, GSAP
- **Font:** Manrope (Google Fonts)
- **Language:** TypeScript

## Getting Started

```bash
cd projects/website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Waitlist System

The site has a custom built-in waitlist (replaces Typeform). No external service needed for local dev.

**How it works:**
- 2-step inline form: email → name + company
- On submit: POST to `/api/waitlist/signup`
- Redirects to `/waitlist/success?code=[referral-code]`
- Success page shows waitlist position + referral link with incentive tiers

**Referral tiers:**
- 1 referral → jump 50 spots
- 3 referrals → early access (first wave)
- 5 referrals → 3 months free at launch
- 10 referrals → 20% lifetime discount

**Data storage:** `data/waitlist.json` (gitignored, created automatically on first signup).

> **Vercel note:** The file-based store doesn't work on Vercel serverless. Before deploying to Vercel, switch the data layer in `lib/waitlist.ts` to Supabase or Vercel KV. The comments in that file explain exactly how.

**API routes:**
- `POST /api/waitlist/signup` — body: `{ name, email, company, referredBy? }`
- `GET /api/waitlist/[code]` — returns position, referral stats, tier info

**Referral links:** `https://movena.io/?ref=[code]` — the `WaitlistForm` reads the `?ref` param automatically.

## Pages

- `/` — Main landing page
- `/waitlist/success` — Post-signup page (position + referral link)
- `/contact` — Contact page
- `/privacy` — Privacy policy
- `/terms` — Terms of service

## Components

- `Header` — Sticky nav
- `Hero` — Above-the-fold with inline waitlist form
- `PainPoints` — Problem framing section
- `Consolidation` — Product value prop
- `Features` — Feature breakdown
- `Problem` — Additional problem/solution
- `FAQ` — Frequently asked questions
- `FinalCTA` — Bottom waitlist CTA with inline form
- `Footer` — Links + legal
- `WaitlistForm` — Reusable 2-step signup form (variants: `hero`, `cta`)

## Deployment

Target: Vercel + movena.io domain.

Before deploying:
1. Switch `lib/waitlist.ts` to Supabase or Vercel KV (see comments in that file)
2. Set `NEXT_PUBLIC_SITE_URL=https://movena.io`
3. Create `public/og-image.png` (1200x627px) for social sharing
4. Replace the favicon placeholder with the actual Movena logomark

See MVNA-34 in Linear for the full deployment checklist.

---

## Wiki

- [[wiki/entities/movena]] -- The company this website represents
- [[wiki/concepts/waitlist-strategy]] -- The waitlist mechanic and referral tiers built into this site
- [[wiki/concepts/gdpr-compliance]] -- Cookie consent requirement driving the consent banner
- [[wiki/entities/stripe]] -- Payment infrastructure (connected to waitlist → founding customer flow)
- [[wiki/entities/supabase]] -- Database for waitlist storage (pre-deploy migration required)
- [[wiki/concepts/brand-system]] -- Visual identity applied throughout this site
