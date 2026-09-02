import type { MetadataRoute } from 'next'
import { LOCALES, type Locale } from '@/lib/locales'
import { getAllPosts } from '@/lib/blog'

const BASE = 'https://movena.io'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  type Entry = {
    path: string
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
    priority: number
    bilingual: boolean
  }

  const staticEntries: Entry[] = [
    { path: '', changeFrequency: 'weekly', priority: 1.0, bilingual: true },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.7, bilingual: true },
    { path: '/blog', changeFrequency: 'weekly', priority: 0.8, bilingual: true },
    { path: '/privacy', changeFrequency: 'yearly', priority: 0.3, bilingual: false },
    { path: '/terms', changeFrequency: 'yearly', priority: 0.3, bilingual: false },
  ]

  const staticUrls: MetadataRoute.Sitemap = staticEntries.flatMap((entry) => {
    const locales = entry.bilingual ? LOCALES : (['en'] as const)
    return locales.map((locale) => ({
      url: `${BASE}/${locale}${entry.path}`,
      lastModified: now,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: entry.bilingual
        ? {
            languages: {
              en: `${BASE}/en${entry.path}`,
              da: `${BASE}/da${entry.path}`,
              'x-default': `${BASE}/en${entry.path}`,
            },
          }
        : undefined,
    }))
  })

  // One entry per post per language that actually has a file, with hreflang
  // alternates when both versions exist. Fallback URLs (an untranslated
  // article served under the other locale) are noindex, so they stay out.
  //
  // Note: Next 13.5 drops `alternates` when it serialises the sitemap -- no
  // xhtml:link elements reach sitemap.xml, and the same is true of the static
  // entries above. The hreflang that Google actually reads is the <link> pair
  // in each page's <head>, which is emitted correctly. These stay so the
  // sitemap starts carrying them the day we move to Next 14+.
  const posts = getAllPosts()
  const slugsByKey = new Map<string, Partial<Record<Locale, string>>>()
  for (const post of posts) {
    const entry = slugsByKey.get(post.key) ?? {}
    entry[post.locale] = post.slug
    slugsByKey.set(post.key, entry)
  }

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => {
    const lastModified = (() => {
      const d = new Date(post.date)
      return Number.isNaN(d.getTime()) ? now : d
    })()
    const siblings = slugsByKey.get(post.key) ?? {}
    const hasPair = Boolean(siblings.en && siblings.da)
    return {
      url: `${BASE}/${post.locale}/blog/${post.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: hasPair
        ? {
            languages: {
              en: `${BASE}/en/blog/${siblings.en}`,
              da: `${BASE}/da/blog/${siblings.da}`,
              'x-default': `${BASE}/en/blog/${siblings.en}`,
            },
          }
        : undefined,
    }
  })

  return [...staticUrls, ...postUrls]
}
