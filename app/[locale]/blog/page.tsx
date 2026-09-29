import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPosts } from '@/lib/blog'
import BlogIndexView, { type Card } from '@/components/site/BlogIndex'
import { translations } from '@/lib/translations'
import { LOCALES, isLocale, type Locale } from '@/lib/locales'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

const SITE = 'https://movena.io'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {}
  const t = translations[params.locale as Locale].blog
  const path = `/${params.locale}/blog`
  return {
    title: `${t.headline} | Movena`,
    description: t.subheadline,
    alternates: {
      canonical: path,
      languages: {
        en: '/en/blog',
        da: '/da/blog',
        'x-default': '/en/blog',
      },
    },
    openGraph: {
      title: `${t.headline} | Movena`,
      description: t.subheadline,
      url: `${SITE}${path}`,
      siteName: 'Movena',
      type: 'website',
      images: ['/og-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t.headline} | Movena`,
      description: t.subheadline,
      images: ['/og-image.png'],
    },
  }
}

function categoryLabel(category: string, locale: Locale): string {
  return translations[locale].blog.categories[category] ?? category
}

function formatDate(iso: string, locale: Locale): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString(locale === 'da' ? 'da-DK' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogIndex({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound()
  const locale = params.locale as Locale
  // Only articles actually written in this language. An untranslated article
  // is still reachable at its /da URL as a noindex fallback, but it does not
  // belong in the Danish blog's index.
  const posts = getAllPosts({ locale })

  const cards: Card[] = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    categoryLabel: categoryLabel(post.category, locale),
    author: post.author,
    initials: initials(post.author),
    date: formatDate(post.date, locale),
    readingMinutes: post.readingMinutes,
    image: post.image,
  }))

  return <BlogIndexView cards={cards} />
}

// "Villads Laun" -> "VL". The design shows an avatar disc with initials.
function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}
