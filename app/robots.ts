import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/en/auth', '/da/auth', '/en/waitlist/success', '/da/waitlist/success'],
      },
    ],
    sitemap: 'https://movena.io/sitemap.xml',
    host: 'https://movena.io',
  }
}
