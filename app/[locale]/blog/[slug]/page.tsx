import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getAllPosts, getAllSlugs, getPostBySlug } from '@/lib/blog'
import { translations } from '@/lib/translations'
import { LOCALES, isLocale, type Locale } from '@/lib/locales'

const SITE = 'https://movena.io'

export function generateStaticParams() {
  const slugs = getAllSlugs()
  return LOCALES.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {}
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  const path = `/${params.locale}/blog/${post.slug}`
  const ogImage = post.image.startsWith('http') ? post.image : `${SITE}${post.image}`

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: path,
      languages: {
        en: `/en/blog/${post.slug}`,
        da: `/da/blog/${post.slug}`,
        'x-default': `/en/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${SITE}${path}`,
      siteName: 'Movena',
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
  const post = getPostBySlug(params.slug)
  if (!post) notFound()
  const t = translations[locale].blog

  // Author is Movena (the organization) -- we don't surface individual bylines.
  // Schema.org Article accepts Organization as @type for author; this satisfies
  // Google's structured-data requirement for an attributed author.
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: post.image.startsWith('http') ? post.image : `${SITE}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'Movena',
      url: SITE,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Movena',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE}/${locale}/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Blog',
        item: `${SITE}/${locale}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: post.title,
        item: `${SITE}/${locale}/blog/${post.slug}`,
      },
    ],
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
      <Header />
      <main className="bg-white">
        <article className="max-w-3xl mx-auto px-6 py-16">
          <div className="mb-8">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
            >
              <span aria-hidden>←</span>
              {t.backToBlog}
            </Link>
          </div>

          <header className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1D4ED8]">
                {post.category}
              </span>
              <span className="text-[11px] text-[#94A3B8]">·</span>
              <span className="text-[11px] text-[#94A3B8]">
                {formatDate(post.date, locale)}
              </span>
              <span className="text-[11px] text-[#94A3B8]">·</span>
              <span className="text-[11px] text-[#94A3B8]">
                {post.readingMinutes} {t.readingTime}
              </span>
            </div>
            <h1 className="text-[32px] sm:text-[44px] lg:text-[52px] font-extrabold tracking-[-0.025em] text-[#0B1F3B] leading-[1.1] mb-6">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-[18px] sm:text-[20px] font-normal text-[#475569] leading-[1.6]">
                {post.excerpt}
              </p>
            )}
          </header>

          {post.image && (
            <div className="relative aspect-[16/9] mb-12 rounded-xl overflow-hidden bg-[#F8FAFC]">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <div
            className="prose prose-neutral max-w-none
              prose-headings:font-bold prose-headings:tracking-[-0.015em] prose-headings:text-[#0B1F3B]
              prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-[28px]
              prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-[22px]
              prose-p:text-[17px] prose-p:leading-[1.75] prose-p:text-[#0F172A]
              prose-li:text-[17px] prose-li:leading-[1.75] prose-li:text-[#0F172A]
              prose-a:text-[#1D4ED8] prose-a:font-medium prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[#0B1F3B] prose-strong:font-semibold
              prose-blockquote:border-l-[3px] prose-blockquote:border-[#1D4ED8] prose-blockquote:pl-5 prose-blockquote:text-[#475569] prose-blockquote:not-italic prose-blockquote:font-medium
              prose-img:rounded-xl prose-img:my-8
              prose-code:text-[#0B1F3B] prose-code:bg-[#F1F5F9] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[15px] prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
              prose-hr:border-[#E2E8F0]"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {post.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-[#E2E8F0] flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-[#F1F5F9] text-[12px] font-medium text-[#475569]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>

        <RelatedPosts currentSlug={post.slug} locale={locale} />
      </main>
      <Footer />
    </>
  )
}

function RelatedPosts({ currentSlug, locale }: { currentSlug: string; locale: Locale }) {
  const t = translations[locale].blog
  const others = getAllPosts()
    .filter((p) => p.slug !== currentSlug && (p.locale === locale || !p.locale))
    .slice(0, 3)
  if (others.length === 0) return null

  return (
    <section className="bg-[#F8FAFC] border-t border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-[22px] font-bold tracking-[-0.015em] text-[#0B1F3B] mb-8">
          {t.headline}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {others.map((p) => (
            <Link
              key={p.slug}
              href={`/${locale}/blog/${p.slug}`}
              className="group flex flex-col rounded-xl border border-[#E2E8F0] bg-white overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[16/9] bg-[#F8FAFC]">
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-[16px] font-bold text-[#0B1F3B] leading-[1.3] mb-2 group-hover:text-[#1D4ED8] transition-colors">
                  {p.title}
                </h3>
                <p className="text-[13px] text-[#475569] line-clamp-2">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
