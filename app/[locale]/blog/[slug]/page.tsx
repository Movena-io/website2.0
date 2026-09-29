import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { getAllPosts, getPostRoutes, resolvePost } from '@/lib/blog'
import BlogPostView, { type PostView } from '@/components/site/BlogPost'
import { translations } from '@/lib/translations'
import { isLocale, type Locale } from '@/lib/locales'

const SITE = 'https://movena.io'

const OG_LOCALE: Record<Locale, string> = { en: 'en_GB', da: 'da_DK' }
const CONTENT_LANGUAGE: Record<Locale, string> = { en: 'en-GB', da: 'da-DK' }

export function generateStaticParams() {
  return getPostRoutes()
}

function categoryLabel(category: string, locale: Locale): string {
  return translations[locale].blog.categories[category] ?? category
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {}
  const locale = params.locale as Locale
  const post = resolvePost(params.slug, locale)
  if (!post) return {}

  // Canonical is always self-referential, except on a fallback page: there the
  // body is the other language's, so the canonical points at that language's
  // URL and the page is kept out of the index entirely.
  const canonical = post.isFallback
    ? `/${post.locale}/blog/${post.slug}`
    : `/${locale}/blog/${post.slug}`

  const { en, da } = post.slugsByLocale
  // hreflang only where both versions genuinely exist, and symmetric both ways.
  const languages =
    en && da
      ? {
          en: `/en/blog/${en}`,
          da: `/da/blog/${da}`,
          'x-default': `/en/blog/${en}`,
        }
      : undefined

  const ogImage = post.image.startsWith('http') ? post.image : `${SITE}${post.image}`

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical, languages },
    robots: post.isFallback ? { index: false, follow: true } : undefined,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${SITE}${canonical}`,
      siteName: 'Movena',
      locale: OG_LOCALE[post.locale],
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      images: [{ url: ogImage, width: 1200, height: 627, alt: post.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: [ogImage],
    },
  }
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

export default function BlogPost({
  params,
}: {
  params: { locale: string; slug: string }
}) {
  if (!isLocale(params.locale)) notFound()
  const locale = params.locale as Locale
  const post = resolvePost(params.slug, locale)
  if (!post) notFound()
  // This URL carries the other language's slug for an article that *is*
  // translated, so it is stale. Send the reader to the right version rather
  // than serving them the wrong language.
  const nativeSlug = post.slugsByLocale[locale]
  if (post.isFallback && nativeSlug) redirect(`/${locale}/blog/${nativeSlug}`)

  // Must match the canonical in generateMetadata, so the schema and the head
  // never disagree about which URL this page is.
  const canonicalUrl = post.isFallback
    ? `${SITE}/${post.locale}/blog/${post.slug}`
    : `${SITE}/${locale}/blog/${post.slug}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: post.image.startsWith('http') ? post.image : `${SITE}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: CONTENT_LANGUAGE[post.locale],
    author: { '@type': 'Organization', name: 'Movena', url: SITE },
    publisher: {
      '@type': 'Organization',
      name: 'Movena',
      logo: { '@type': 'ImageObject', url: `${SITE}/favicon.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    keywords: post.tags.join(', '),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Blog', item: `${SITE}/${locale}/blog` },
      { '@type': 'ListItem', position: 2, name: post.title, item: canonicalUrl },
    ],
  }

  const view: PostView = {
    title: post.title,
    excerpt: post.excerpt,
    categoryLabel: categoryLabel(post.category, locale),
    author: post.author,
    initials: post.author
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 3)
      .map((w) => w[0]?.toUpperCase() ?? '')
      .join(''),
    date: formatDate(post.date, locale),
    readingMinutes: post.readingMinutes,
    image: post.image,
    imageAlt: post.imageAlt,
    html: post.html,
    toc: post.toc,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogPostView post={view} />
    </>
  )
}
