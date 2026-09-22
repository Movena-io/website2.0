/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip ESLint during production builds. The eslint-config-next 13.5
  // pipeline can hang during `next build`. Linting is still available locally
  // via `npm run lint` and will catch issues before merge.
  eslint: {
    ignoreDuringBuilds: true,
  },

  // The brand SVGs in /public/assets/ are loaded through next/image. Next
  // refuses to serve SVG through the optimizer by default for XSS safety,
  // so this opts in. Safe here because we only ever serve our own SVGs
  // from /public, never user-supplied content.
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  async redirects() {
    return [
      // The marketing site no longer hosts auth — everything lives in the
      // Lovable production app. /auth and /signup deep-link to the app.
      { source: '/auth', destination: 'https://app.movena.io/login', permanent: false },
      { source: '/signup', destination: 'https://app.movena.io/signup', permanent: false },
      { source: '/login', destination: 'https://app.movena.io/login', permanent: false },
      { source: '/:locale(en|da)/auth', destination: 'https://app.movena.io/login', permanent: false },
      { source: '/:locale(en|da)/signup', destination: 'https://app.movena.io/signup', permanent: false },
      { source: '/:locale(en|da)/login', destination: 'https://app.movena.io/login', permanent: false },

      // The privacy policy is maintained in the product app now, so the
      // marketing site's copy is gone and its URLs point at the real one.
      // Both the bare and the locale-prefixed form are listed: which one a
      // visitor hits depends on whether middleware has added the prefix yet.
      { source: '/privacy', destination: 'https://app.movena.io/privatlivspolitik', permanent: true },
      { source: '/:locale(en|da)/privacy', destination: 'https://app.movena.io/privatlivspolitik', permanent: true },

      // Terms are retired with no replacement page, so those URLs go home.
      { source: '/terms', destination: '/', permanent: true },
      { source: '/:locale(en|da)/terms', destination: '/:locale', permanent: true },

      // /dataportabilitet is Danish only and has no English edition, so the
      // locale-prefixed URLs are not second addresses for it. middleware.ts
      // serves the unprefixed URL from the Danish route tree.
      { source: '/en/dataportabilitet', destination: '/dataportabilitet', permanent: true },
      { source: '/da/dataportabilitet', destination: '/dataportabilitet', permanent: true },
    ]
  },
}

module.exports = nextConfig
