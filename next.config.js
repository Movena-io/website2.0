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
    ]
  },
}

module.exports = nextConfig
