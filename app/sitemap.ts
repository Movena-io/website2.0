import type { MetadataRoute } from 'next'
import { LOCALES } from '@/lib/locales'
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

  // Each post exists in exactly one language (the locale set in its
  // frontmatter), so we emit one canonical URL per post and skip hreflang
  // alternates. This avoids the duplicate-content trap where Google sees the
  // same post under both /en/blog/... and /da/blog/...
  const posts = getAllPosts()
  const postUrls: MetadataRoute.Sitemap = posts.map((post) => {
    const lastModified = (() => {
      const d = new Date(post.date)
      return Number.isNaN(d.getTime()) ? now : d
    })()
    return {
      url: `${BASE}/${post.locale}/blog/${post.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }
  })

  return [...staticUrls, ...postUrls]
}
