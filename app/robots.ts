import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/auth/', '/waitlist/success'],
      },
    ],
    sitemap: 'https://movena.io/sitemap.xml',
    host: 'https://movena.io',
  }
}
