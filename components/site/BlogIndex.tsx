'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import type { Locale } from '@/lib/locales'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import DemoCTA from '@/components/site/DemoCTA'

// The design's blog index, driven by the repo's real posts instead of the
// export's sample articles. Every style below is the design's own.

export type Card = {
  slug: string
  title: string
  excerpt: string
  category: string
  categoryLabel: string
  author: string
  initials: string
  date: string
  readingMinutes: number
  image?: string
}

type Copy = {
  home: string
  crumb: string
  headLead: string
  headAccent: string
  intro: string
  categoriesLabel: string
  all: string
  latest: string
  readArticle: string
  allArticles: string
  min: string
  empty: string
}

const COPY: Record<Locale, Copy> = {
  da: {
    home: 'Forside',
    crumb: 'Blog',
    headLead: 'Viden til ',
    headAccent: 'flyttefirmaer',
    intro:
      'Praktiske råd om tilbud, planlægning og drift, skrevet af os, der bygger Movena sammen med flyttebranchen.',
    categoriesLabel: 'Kategorier',
    all: 'Alle',
    latest: 'Seneste artikel',
    readArticle: 'Læs artiklen',
    allArticles: 'Alle artikler',
    min: 'min.',
    empty: 'Ingen artikler i denne kategori endnu.',
  },
  en: {
    home: 'Home',
    crumb: 'Blog',
    headLead: 'Knowledge for ',
    headAccent: 'moving companies',
    intro:
      'Practical advice on quotes, planning and operations, written by the people building Movena together with the moving industry.',
    categoriesLabel: 'Categories',
    all: 'All',
    latest: 'Latest article',
    readArticle: 'Read the article',
    allArticles: 'All articles',
    min: 'min',
    empty: 'No articles in this category yet.',
  },
}

const CARD_BG =
  'radial-gradient(circle at 78% 22%, #4F8FF755 0%, #4F8FF700 45%), radial-gradient(rgba(255, 255, 255, 0.10) 1px, rgba(255, 255, 255, 0) 1.4px) 0 0 / 18px 18px, linear-gradient(160deg, #10284A 0%, #060F1F 100%)'

function Thumb({ label, image, big }: { label: string; image?: string; big?: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        aspectRatio: '16 / 9',
        borderRadius: big ? '18px' : '14px',
        overflow: 'hidden',
        background: CARD_BG,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : null}
      <span
        style={{
          position: 'absolute',
          left: '12px',
          top: '12px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          height: '26px',
          padding: '0 10px',
          borderRadius: '13px',
          background: 'rgba(255, 255, 255, 0.10)',
          border: '1px solid rgba(255, 255, 255, 0.16)',
          color: '#FFFFFF',
          fontSize: '12px',
          fontWeight: 600,
        }}
      >
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4F8FF7' }} />
        {label}
      </span>
    </div>
  )
}

function Byline({ card, c }: { card: Card; c: Copy }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#4A5B73' }}>
      <span
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: '#E6EDFC',
          color: '#1D4ED8',
          fontSize: '11px',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {card.initials}
      </span>
      <span>
        <span style={{ fontWeight: 600, color: '#0B1F3B' }}>{card.author}</span>
        {` · ${card.date} · ${card.readingMinutes} ${c.min}`}
      </span>
    </div>
  )
}

export default function BlogIndex({ cards }: { cards: Card[] }) {
  const { locale } = useLanguage()
  const c = COPY[locale]
  const [active, setActive] = useState<string>('__all')

  // Chips come from the posts that actually exist, so an empty category never
  // shows up.
  const categories = useMemo(() => {
    const seen = new Map<string, string>()
    for (const p of cards) if (!seen.has(p.category)) seen.set(p.category, p.categoryLabel)
    return Array.from(seen.entries())
  }, [cards])

  const shown = active === '__all' ? cards : cards.filter((p) => p.category === active)
  const [featured, ...rest] = shown

  const chip = (on: boolean) => ({
    height: '40px',
    padding: '0 16px',
    borderRadius: '20px',
    border: `1px solid ${on ? '#0B1F3B' : '#C9D3E0'}`,
    background: on ? '#0B1F3B' : '#FFFFFF',
    color: on ? '#FFFFFF' : '#0B1F3B',
    fontFamily: 'inherit',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
  })

  return (
    <>
      <SiteHeader />

      <section
        id="top"
        style={{
          background:
            'radial-gradient(ellipse 55% 55% at 72% 30%, rgba(59, 130, 246, 0.16) 0%, rgba(59, 130, 246, 0.05) 45%, rgba(255, 255, 255, 0) 75%), linear-gradient(180deg, #FFFFFF 70%, #F4F7FB 100%)',
          padding: 'clamp(32px, 4vw, 56px) 0 clamp(40px, 5vw, 64px)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px)', boxSizing: 'border-box', width: '100%' }}>
          <div style={{ fontSize: '14px', color: '#4A5B73' }}>
            <Link href={`/${locale}`} style={{ color: '#4A5B73' }}>{c.home}</Link> / {c.crumb}
          </div>

          <h1 style={{ margin: '20px 0 0', fontSize: 'clamp(40px, 4.8vw, 68px)', lineHeight: '1.03', fontWeight: 600, letterSpacing: '-0.045em' }}>
            {c.headLead}
            <span
              style={{
                background: 'linear-gradient(90deg, #1D4ED8 0%, #3B82F6 55%, #38A3F1 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {c.headAccent}
            </span>
          </h1>

          <p style={{ margin: '18px 0 0', maxWidth: '36em', fontSize: 'clamp(18px, 1.5vw, 20px)', lineHeight: '1.55', color: '#4A5B73' }}>
            {c.intro}
          </p>

          <div role="group" aria-label={c.categoriesLabel} style={{ marginTop: '28px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button type="button" aria-pressed={active === '__all'} onClick={() => setActive('__all')} style={chip(active === '__all')}>
              {c.all}
            </button>
            {categories.map(([key, label]) => (
              <button key={key} type="button" aria-pressed={active === key} onClick={() => setActive(key)} style={chip(active === key)}>
                {label}
              </button>
            ))}
          </div>

          {featured && (
            <div style={{ marginTop: 'clamp(28px, 3vw, 40px)' }}>
              <Link
                data-card=""
                href={`/${locale}/blog/${featured.slug}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                  gap: 'clamp(20px, 3vw, 40px)',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: '#0B1F3B',
                }}
              >
                <Thumb label={featured.categoryLabel} image={featured.image} big />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1D4ED8' }}>
                    {c.latest}
                  </div>
                  <h2 style={{ margin: '10px 0 0', fontSize: 'clamp(26px, 2.6vw, 36px)', lineHeight: '1.15', fontWeight: 600, letterSpacing: '-0.03em' }}>
                    {featured.title}
                  </h2>
                  <p style={{ margin: '12px 0 0', fontSize: '17px', lineHeight: '1.55', color: '#4A5B73' }}>{featured.excerpt}</p>
                  <div style={{ marginTop: '16px' }}>
                    <Byline card={featured} c={c} />
                  </div>
                  <div style={{ marginTop: '18px', fontSize: '15px', fontWeight: 600, color: '#1D4ED8' }}>{c.readArticle}</div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>

      <section style={{ background: '#FFFFFF', padding: 'clamp(40px, 5vw, 72px) 0 clamp(56px, 6vw, 96px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px)', boxSizing: 'border-box', width: '100%' }}>
          <h2 style={{ margin: 0, fontSize: 'clamp(24px, 2.4vw, 32px)', fontWeight: 600, letterSpacing: '-0.02em' }}>{c.allArticles}</h2>

          {rest.length === 0 ? (
            <p style={{ marginTop: '24px', fontSize: '16px', color: '#4A5B73' }}>{c.empty}</p>
          ) : (
            <div
              data-stagger=""
              style={{
                marginTop: '24px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: '40px 28px',
              }}
            >
              {rest.map((card) => (
                <Link
                  key={card.slug}
                  data-card=""
                  href={`/${locale}/blog/${card.slug}`}
                  style={{ display: 'flex', flexDirection: 'column', gap: '14px', textDecoration: 'none', color: '#0B1F3B', minWidth: 0 }}
                >
                  <Thumb label={card.categoryLabel} image={card.image} />
                  <span style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '1.25' }}>{card.title}</span>
                  <span style={{ fontSize: '15px', lineHeight: '1.5', color: '#4A5B73' }}>{card.excerpt}</span>
                  <Byline card={card} c={c} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <DemoCTA />
      <SiteFooter />
    </>
  )
}
