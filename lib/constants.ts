// ─── Live app URLs ────────────────────────────────────────────────────────────
//
// Marketing site CTAs route prospects to a Cal.com booking page. The "Log in"
// link points at app.movena.io for existing customers.

export const APP_URL = 'https://app.movena.io'
export const LOGIN_URL = `${APP_URL}/login`

export const DEMO_URL = 'https://cal.com/valdemar-lorentzen/movena-demo-20min'

// The privacy policy is maintained in the product app, not here. The marketing
// site links out to it rather than keeping a second copy that drifts.
export const PRIVACY_URL = `${APP_URL}/privatlivspolitik`

// Single Danish page, deliberately without a locale prefix: both footers link
// to the same address. middleware.ts serves it from the Danish route tree.
export const DATA_PORTABILITY_PATH = '/dataportabilitet'

// ─── Legacy (kept for reference; no longer imported) ──────────────────────────

export const TYPEFORM_URL = 'https://form.typeform.com/to/BD0lEb77'
