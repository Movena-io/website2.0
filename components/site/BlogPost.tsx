'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import type { Locale } from '@/lib/locales'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import DemoCTA from '@/components/site/DemoCTA'

// The design's article template, filled with a real post. The design's own
// "Kort fortalt" summary and FAQ blocks are left out: the repo's posts carry
// no such fields, and inventing them would put words in the article.

export type PostView = {
  title: string
  excerpt: string
  categoryLabel: string
  author: string
  initials: string
  date: string
  readingMinutes: number
  image?: string
  imageAlt?: string
  html: string
  toc: { id: string; text: string }[]
}

type Copy = { home: string; blog: string; contents: string; updated: string; reading: string }

const COPY: Record<Locale, Copy> = {
  da: { home: 'Forside', blog: 'Blog', contents: 'Indhold', updated: 'Opdateret', reading: 'min. læsning' },
  en: { home: 'Home', blog: 'Blog', contents: 'Contents', updated: 'Updated', reading: 'min read' },
}

const CARD_BG =
  'radial-gradient(circle at 78% 22%, #4F8FF755 0%, #4F8FF700 45%), radial-gradient(rgba(255, 255, 255, 0.10) 1px, rgba(255, 255, 255, 0) 1.4px) 0 0 / 18px 18px, linear-gradient(160deg, #10284A 0%, #060F1F 100%)'

export default function BlogPost({ post }: { post: PostView }) {
  const { locale } = useLanguage()
  const c = COPY[locale]
  const [activeId, setActiveId] = useState<string>(post.toc[0]?.id ?? '')

  // Highlights the section being read, the same behaviour the design's runtime
  // gives its table of contents.
  useEffect(() => {
    if (!post.toc.length) return
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveId(e.target.id)),
      { rootMargin: '-15% 0px -70% 0px' },
    )
    post.toc.forEach((t) => {
      const el = document.getElementById(t.id)
      if (el) spy.observe(el)
    })
    return () => spy.disconnect()
  }, [post.toc])

  return (
    <>
      <SiteHeader />

      <section
        id="top"
        style={{
          background:
            'radial-gradient(ellipse 55% 55% at 72% 30%, rgba(59, 130, 246, 0.16) 0%, rgba(59, 130, 246, 0.05) 45%, rgba(255, 255, 255, 0) 75%), linear-gradient(180deg, #FFFFFF 70%, #F4F7FB 100%)',
          padding: 'clamp(32px, 4vw, 56px) 0 clamp(32px, 4vw, 48px)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px)', boxSizing: 'border-box', width: '100%' }}>
          <div style={{ fontSize: '14px', color: '#4A5B73' }}>
            <Link href={`/${locale}`} style={{ color: '#4A5B73' }}>{c.home}</Link>
            {' / '}
            <Link href={`/${locale}/blog`} style={{ color: '#4A5B73' }}>{c.blog}</Link>
            {` / ${post.categoryLabel}`}
          </div>

          <h1 style={{ margin: '20px 0 0', maxWidth: '20ch', fontSize: 'clamp(34px, 4.2vw, 56px)', lineHeight: '1.05', fontWeight: 600, letterSpacing: '-0.04em' }}>
            {post.title}
          </h1>

          <p style={{ margin: '18px 0 0', maxWidth: '38em', fontSize: 'clamp(17px, 1.4vw, 19px)', lineHeight: '1.55', color: '#4A5B73' }}>
            {post.excerpt}
          </p>

          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#4A5B73' }}>
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
              {post.initials}
            </span>
            <span>
              <span style={{ fontWeight: 600, color: '#0B1F3B' }}>{post.author}</span>
              {` · ${c.updated} ${post.date} · ${post.readingMinutes} ${c.reading}`}
            </span>
          </div>

          <div style={{ marginTop: 'clamp(24px, 3vw, 36px)' }}>
            <div
              aria-hidden="true"
              style={{
                position: 'relative',
                aspectRatio: '16 / 9',
                borderRadius: '20px',
                overflow: 'hidden',
                background: CARD_BG,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {post.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.image} alt={post.imageAlt ?? ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : null}
              <span
                style={{
                  position: 'absolute',
                  left: '18px',
                  top: '18px',
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
                {post.categoryLabel}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#FFFFFF', padding: 'clamp(32px, 4vw, 56px) 0 clamp(56px, 6vw, 96px)' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 clamp(20px, 5vw, 64px)',
            boxSizing: 'border-box',
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            gap: '32px clamp(40px, 5vw, 72px)',
          }}
        >
          {post.toc.length > 0 && (
            <div style={{ flex: '0 1 240px', minWidth: 0, alignSelf: 'stretch' }}>
              <nav aria-label={c.contents} style={{ position: 'sticky', top: '96px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#6B7A90', marginBottom: '10px' }}>{c.contents}</div>
                <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '2px', borderLeft: '2px solid #E3E8EF' }}>
                  {post.toc.map((t) => {
                    const on = t.id === activeId
                    return (
                      <li key={t.id}>
                        <a
                          href={`#${t.id}`}
                          style={{
                            display: 'block',
                            padding: '6px 0 6px 14px',
                            marginLeft: '-2px',
                            borderLeft: `2px solid ${on ? '#2563EB' : 'transparent'}`,
                            fontSize: '14px',
                            lineHeight: '1.4',
                            fontWeight: on ? 600 : 500,
                            color: on ? '#1D4ED8' : '#4A5B73',
                            textDecoration: 'none',
                          }}
                        >
                          {t.text}
                        </a>
                      </li>
                    )
                  })}
                </ol>
              </nav>
            </div>
          )}

          <article
            className="dc-article"
            style={{ flex: '1 1 520px', minWidth: 0, fontSize: '17px', lineHeight: '1.7', color: '#22324A' }}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </section>

      <DemoCTA />
      <SiteFooter />
    </>
  )
}
