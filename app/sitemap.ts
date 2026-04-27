import type { MetadataRoute } from 'next'
import { LOCALES } from '@/lib/locales'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://movena.io'
  const now = new Date()

  type Entry = {
    path: string
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
    priority: number
    bilingual: boolean
  }

  const entries: Entry[] = [
    { path: '', changeFrequency: 'weekly', priority: 1.0, bilingual: true },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.7, bilingual: true },
    { path: '/privacy', changeFrequency: 'yearly', priority: 0.3, bilingual: false },
    { path: '/terms', changeFrequency: 'yearly', priority: 0.3, bilingual: false },
  ]

  return entries.flatMap((entry) => {
    const locales = entry.bilingual ? LOCALES : (['en'] as const)
    return locales.map((locale) => ({
      url: `${base}/${locale}${entry.path}`,
      lastModified: now,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: entry.bilingual
        ? {
            languages: {
              en: `${base}/en${entry.path}`,
              da: `${base}/da${entry.path}`,
              'x-default': `${base}/en${entry.path}`,
            },
          }
        : undefined,
    }))
  })
}
