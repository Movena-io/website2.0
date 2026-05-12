// ─── Live app URLs ────────────────────────────────────────────────────────────
//
// Marketing site CTAs deep-link to the Lovable production app. The app
// handles Supabase auth, the 14-day trial, and Stripe billing.
//
// Both /signup and /login return 200 on app.movena.io as of 2026-05-11.

export const APP_URL = 'https://app.movena.io'
export const SIGNUP_URL = `${APP_URL}/signup`
export const LOGIN_URL = `${APP_URL}/login`

// ─── Pricing ──────────────────────────────────────────────────────────────────
//
// Per-user pricing. Two roles only. No tiers, no minimums, no per-quote
// fees. The app bills in DKK or EUR; USD is informational on the marketing
// site only.
//
// Annual price = 10 × monthly (effective ~17% off, matches the app's
// listSeatPrices behavior — see Movena-io/movena-3d4ef4b7's
// src/components/settings/billing-panel.tsx).

export type PricingCurrency = 'DKK' | 'EUR' | 'USD'
export type PricingInterval = 'month' | 'year'

export const PRICING: Record<'admin' | 'crew', Record<PricingCurrency, Record<PricingInterval, number>>> = {
  admin: {
    DKK: { month: 279, year: 2790 },
    EUR: { month: 37,  year: 370  },
    USD: { month: 40,  year: 400  },
  },
  crew: {
    DKK: { month: 149, year: 1490 },
    EUR: { month: 20,  year: 200  },
    USD: { month: 22,  year: 220  },
  },
}

export const CURRENCY_SYMBOLS: Record<PricingCurrency, string> = {
  DKK: 'kr',
  EUR: '€',
  USD: '$',
}

// ─── Legacy (kept for reference; no longer imported) ──────────────────────────

export const TYPEFORM_URL = 'https://form.typeform.com/to/BD0lEb77'
