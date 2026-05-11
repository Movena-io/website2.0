/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip ESLint during production builds. The eslint-config-next 13.5
  // pipeline can hang during `next build`. Linting is still available locally
  // via `npm run lint` and will catch issues before merge.
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
