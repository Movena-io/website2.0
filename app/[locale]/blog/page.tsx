import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getAllPosts } from '@/lib/blog'
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
  const t = translations[locale].blog
  const posts = getAllPosts().filter((p) => p.locale === locale || !p.locale)

  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-14 max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#1D4ED8]/30" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1D4ED8]">
                {t.label}
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#1D4ED8]/30" />
            </div>
            <h1 className="text-[28px] sm:text-[40px] lg:text-[52px] font-extrabold tracking-[-0.025em] text-[#0B1F3B] leading-[1.1] mb-4">
              {t.headline}
            </h1>
            <p className="text-[18px] font-normal text-[#475569] leading-[1.7]">
              {t.subheadline}
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="text-[16px] text-[#475569]">{t.empty}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${locale}/blog/${post.slug}`}
                  className="group flex flex-col rounded-xl border border-[#E2E8F0] bg-white overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[16/9] bg-[#F8FAFC] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1D4ED8]">
                        {post.category}
                      </span>
                      <span className="text-[11px] text-[#94A3B8]">·</span>
                      <span className="text-[11px] text-[#94A3B8]">
                        {formatDate(post.date, locale)}
                      </span>
                    </div>
                    <h2 className="text-[20px] font-bold tracking-[-0.015em] text-[#0B1F3B] leading-[1.3] mb-2 group-hover:text-[#1D4ED8] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-[14px] text-[#475569] leading-[1.6] mb-5 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between text-[12px] text-[#94A3B8]">
                      <span>{post.author}</span>
                      <span>
                        {post.readingMinutes} {t.readingTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
