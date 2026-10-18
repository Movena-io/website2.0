'use client'

// The header from the v7 design export, written out by hand because it is
// shared by every page. Styles are the design's own, including its
// media-query-free switches: calc((100vw - 768px) * 999) is 0 below 768px and
// huge above it, so the desktop nav, language button and right-hand group
// collapse to nothing on mobile while the burger opens up (and the reverse).
//
// The header is its own [data-dc] root, so it gets the browser-default box
// model the design was drawn with (see globals.css) on the converted pages and
// on the hand-built blog views alike. Additions that are not in the design:
// the Log in link, and real routing for the language switch.

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/lib/LanguageContext'
import { ROUTES, NAV, PHONE_DISPLAY, PHONE_HREF, LOGIN_HREF, counterpartPath } from '@/lib/site-nav'
import { useBlogAlternates } from '@/lib/BlogAlternates'
import type { Locale } from '@/lib/locales'
import MovenaMark from '@/components/site/MovenaMark'

const INK = '#0B1F3B'
const PANEL_SHADOW = '0 1px 2px rgba(11, 31, 59, 0.06), 0 24px 48px -20px rgba(11, 31, 59, 0.3)'

// The three feature icons from the design, in dropdown order.
const FEATURE_ICONS: Record<string, React.ReactNode> = {
  winMore: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h6" />
    </>
  ),
  runTheDay: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  getPaid: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18M7 15h4" />
    </>
  ),
}

function FeatureIcon({ name, box, icon }: { name: string; box: number; icon: number }) {
  return (
    <span
      aria-hidden="true"
      style={{ width: box, height: box, borderRadius: 8, background: '#E6EDFC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
    >
      <svg width={icon} height={icon} viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
        {FEATURE_ICONS[name]}
      </svg>
    </span>
  )
}

function Chevron({ size, stroke, open, transition }: { size: number; stroke: string; open: boolean; transition?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0B1F3B"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0, transform: `rotate(${open ? 180 : 0}deg)`, ...(transition ? { transition: 'transform 0.2s' } : {}) }}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

function PhoneIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  )
}

// Danish first, regardless of which language is being shown. LOCALES is ordered
// en-first for routing, and a switcher that reorders itself per page is jarring.
const SWITCH_ORDER: Locale[] = ['da', 'en']

// Endonyms: a reader looking for English should see "English", not "Engelsk".
const LANGUAGE_NAMES: Record<Locale, string> = { da: 'Dansk', en: 'English' }

function Flag({ code, w, h, clipId }: { code: Locale; w: number; h: number; clipId: string }) {
  return (
    <span
      aria-hidden="true"
      style={{ width: w, height: h, borderRadius: 3, overflow: 'hidden', flexShrink: 0, boxShadow: '0 0 0 1px rgba(11, 31, 59, 0.12)', display: 'inline-flex' }}
    >
      {code === 'da' ? (
        <svg width={w} height={h} viewBox="0 0 37 28" preserveAspectRatio="none">
          <rect width="37" height="28" fill="#C8102E" />
          <rect x="12" width="4" height="28" fill="#FFFFFF" />
          <rect y="12" width="37" height="4" fill="#FFFFFF" />
        </svg>
      ) : (
        <svg width={w} height={h} viewBox="0 0 60 30" preserveAspectRatio="none">
          <defs>
            <clipPath id={clipId}>
              <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
            </clipPath>
          </defs>
          <rect width="60" height="30" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${clipId})`} stroke="#C8102E" strokeWidth="4" />
          <path d="M30,0 v30 M0,15 h60" stroke="#FFFFFF" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </svg>
      )}
    </span>
  )
}

/** One row in the language list, shared by the dropdown and the mobile menu. */
function LanguageRow({
  code,
  active,
  href,
  clipId,
}: {
  code: Locale
  active: boolean
  href: string
  clipId: string
}) {
  const row: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 10, minHeight: 44, padding: '0 12px', borderRadius: 8,
    fontSize: 15, fontWeight: 600, textDecoration: 'none', color: INK,
  }
  if (active) {
    return (
      <span aria-current="true" style={{ ...row, background: '#F5F8FF' }}>
        <Flag code={code} w={22} h={15} clipId={clipId} />
        {LANGUAGE_NAMES[code]}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginLeft: 'auto', flexShrink: 0 }}>
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </span>
    )
  }
  return (
    <Link href={href} hrefLang={code} lang={code} style={row}>
      <Flag code={code} w={22} h={15} clipId={clipId} />
      {LANGUAGE_NAMES[code]}
    </Link>
  )
}

// A full-width row in the mobile menu.
const MOB_ROW: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, minHeight: 54, padding: '0 4px',
  borderBottom: '1px solid #EEF2F6', fontSize: 17, fontWeight: 600, color: INK, textDecoration: 'none',
}

// Hidden below 768px, natural width above it.
const DESKTOP_ONLY = 'calc((100vw - 768px) * 999)'

export default function SiteHeader() {
  const { locale } = useLanguage()
  const r = ROUTES[locale]
  const nav = NAV[locale]
  const pathname = usePathname() ?? r.home
  const blogPairs = useBlogAlternates()
  const hrefFor = (code: Locale) => counterpartPath(pathname, locale, code, blogPairs)
  const languageLabel = `${nav.language}: ${LANGUAGE_NAMES[locale]}`

  const [navOpen, setNavOpen] = useState(false)
  const [mobOpen, setMobOpen] = useState(false)
  const [mobFeat, setMobFeat] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [langMobOpen, setLangMobOpen] = useState(false)
  const shellRef = useRef<HTMLDivElement>(null)

  const closeAll = () => {
    setNavOpen(false)
    setMobOpen(false)
    setMobFeat(false)
    setLangOpen(false)
    setLangMobOpen(false)
  }

  // Every panel closes on navigation, on Escape and on an outside click.
  useEffect(closeAll, [pathname])

  useEffect(() => {
    if (!navOpen && !mobOpen && !langOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeAll()
    }
    function onClick(e: MouseEvent) {
      if (shellRef.current && !shellRef.current.contains(e.target as Node)) closeAll()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [navOpen, mobOpen, langOpen])

  const navLink: React.CSSProperties = { lineHeight: '44px', fontSize: 15, fontWeight: 600, color: INK, textDecoration: 'none', whiteSpace: 'nowrap' }

  return (
    <header data-dc="" style={{ position: 'sticky', top: 0, zIndex: 20, padding: '14px clamp(12px, 3vw, 32px) 0', boxSizing: 'border-box', pointerEvents: 'none' }}>
      <div
        ref={shellRef}
        style={{
          pointerEvents: 'auto', position: 'relative', maxWidth: 1200, margin: '0 auto', height: 'clamp(58px, 12vw, 64px)',
          padding: '0 8px 0 clamp(14px, 4vw, 20px)', boxSizing: 'border-box', background: 'rgba(255, 255, 255, 0.9)',
          WebkitBackdropFilter: 'blur(14px)', backdropFilter: 'blur(14px)', border: '1px solid #E3E8EF', borderRadius: 16,
          boxShadow: '0 1px 2px rgba(11, 31, 59, 0.06)', display: 'flex', alignItems: 'center', gap: 12,
        }}
      >
        <Link
          href={r.home}
          aria-label={locale === 'da' ? 'Movena, til forsiden' : 'Movena, to the home page'}
          style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none', color: INK, flex: '0 0 auto' }}
        >
          <MovenaMark width={26} height={32} style={{ width: 'clamp(21px, 5.8vw, 26px)', height: 'auto' }} />
          <span style={{ fontSize: 'clamp(20px, 5.4vw, 24px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1 }}>movena</span>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label={locale === 'da' ? 'Hovedmenu' : 'Main menu'}
          style={{
            flex: '1 1 0', minWidth: 0, maxWidth: DESKTOP_ONLY, height: 44, overflow: 'hidden', display: 'flex', flexWrap: 'wrap',
            justifyContent: 'flex-end', alignContent: 'flex-start', columnGap: 32,
            padding: '0 clamp(0px, calc(5vw - 20px), 64px) 0 clamp(0px, calc(3vw - 10px), 24px)', boxSizing: 'border-box',
          }}
        >
          <button
            type="button"
            aria-expanded={navOpen}
            aria-controls="menu-panel"
            onClick={() => {
              setNavOpen((v) => !v)
              setLangOpen(false)
            }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 44, padding: 0, background: 'none', border: 0, fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: INK, cursor: 'pointer' }}
          >
            {nav.features}
            <Chevron size={14} stroke="2.4" open={navOpen} />
          </button>
          <Link href={r.calculator} style={navLink}>{nav.calculator}</Link>
          <Link href={r.about} style={navLink}>{nav.about}</Link>
          <Link href={r.blog} style={navLink}>{nav.blog}</Link>
        </nav>

        {/* Language */}
        <div data-lang-switch="" style={{ position: 'relative', flex: '0 0 auto', display: 'flex', alignItems: 'center' }}>
          <button
            type="button"
            aria-label={languageLabel}
            aria-expanded={langOpen}
            aria-controls="lang-menu"
            onClick={() => {
              setLangOpen((v) => !v)
              setNavOpen(false)
            }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, maxWidth: DESKTOP_ONLY, overflow: 'hidden', boxSizing: 'border-box',
              padding: `0 clamp(0px, ${DESKTOP_ONLY}, 10px)`, borderStyle: 'solid', borderColor: '#E3E8EF',
              borderWidth: `clamp(0px, ${DESKTOP_ONLY}, 1px)`, borderRadius: 8, background: '#FFFFFF', fontFamily: 'inherit', fontSize: 14,
              fontWeight: 700, letterSpacing: '0.02em', color: INK, cursor: 'pointer', whiteSpace: 'nowrap',
            }}
          >
            <Flag code={locale} w={20} h={14} clipId="uk-t-b" />
            {locale.toUpperCase()}
            <Chevron size={12} stroke="2.6" open={langOpen} />
          </button>
          {langOpen && (
            <div
              id="lang-menu"
              role="menu"
              style={{
                position: 'absolute', top: 'calc(100% + 16px)', right: 0, zIndex: 30, width: 200, boxSizing: 'border-box', padding: 6,
                background: '#FFFFFF', borderRadius: 16, boxShadow: PANEL_SHADOW, display: 'flex', flexDirection: 'column', gap: 2,
              }}
            >
              {SWITCH_ORDER.map((code) => (
                <LanguageRow key={code} code={code} active={code === locale} href={hrefFor(code)} clipId="uk-t-d" />
              ))}
            </div>
          )}
        </div>

        {/* Phone, Log in and the demo button, kept together on the right */}
        <div style={{ flex: '0 1 auto', minWidth: 0, marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12, maxWidth: DESKTOP_ONLY, overflow: 'hidden' }}>
          {/* The phone wraps out of sight when the bar is too narrow for it. */}
          <div style={{ flex: '0 1 auto', minWidth: 0, height: 44, overflow: 'hidden', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <span aria-hidden="true" style={{ width: 0, height: 44 }} />
            <a href={PHONE_HREF} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 44, whiteSpace: 'nowrap', fontSize: 15, fontWeight: 600, color: INK, textDecoration: 'none' }}>
              <PhoneIcon size={16} />
              {PHONE_DISPLAY}
            </a>
          </div>
          <a href={LOGIN_HREF} style={{ ...navLink, flex: '0 0 auto' }}>
            {nav.logIn}
          </a>
          <span style={{ display: 'flex', flex: '0 0 auto', overflow: 'hidden', maxWidth: DESKTOP_ONLY }}>
            <Link
              data-lift=""
              href={r.bookDemo}
              style={{
                flex: '0 0 auto', display: 'inline-flex', alignItems: 'center', height: 44, padding: '0 clamp(10px, 2.6vw, 14px)', borderRadius: 8,
                background: '#2563EB', color: '#FFFFFF', fontSize: 15, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap',
              }}
            >
              {nav.bookDemo}
            </Link>
          </span>
        </div>

        {/* Burger, below 768px */}
        <button
          type="button"
          aria-label={nav.menu}
          aria-expanded={mobOpen}
          aria-controls="mobil-menu"
          onClick={() => setMobOpen((v) => !v)}
          style={{
            flex: '0 0 calc((768px - 100vw) * 999)', maxWidth: 44, minWidth: 0, height: 44, overflow: 'hidden', padding: 0, border: 0,
            borderRadius: 8, background: '#F1F5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B1F3B" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path d={mobOpen ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} />
          </svg>
        </button>

        {/* Features dropdown */}
        {navOpen && (
          <div
            id="menu-panel"
            style={{
              position: 'absolute', left: 0, right: 0, top: 'calc(100% + 8px)', background: '#FFFFFF', borderRadius: 16, boxShadow: PANEL_SHADOW,
              padding: 12, boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 8,
            }}
          >
            {nav.featureItems.map((item) => (
              <Link
                key={item.key}
                href={r[item.key]}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 12, borderRadius: 16, textDecoration: 'none', color: INK, background: '#F7F9FC' }}
              >
                <FeatureIcon name={item.key} box={38} icon={19} />
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: 15, fontWeight: 600 }}>{item.label}</span>
                  <span style={{ display: 'block', fontSize: 13, lineHeight: 1.4, color: '#4A5B73' }}>{item.blurb}</span>
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Mobile menu */}
        {mobOpen && (
          <nav
            id="mobil-menu"
            aria-label={nav.menu}
            style={{
              position: 'absolute', left: 0, right: 0, top: 'calc(100% + 8px)', background: '#FFFFFF', borderRadius: 16, boxShadow: PANEL_SHADOW,
              padding: '6px 16px 16px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column',
            }}
          >
            <button
              type="button"
              aria-expanded={mobFeat}
              aria-controls="mobil-funktioner"
              onClick={() => setMobFeat((v) => !v)}
              style={{ ...MOB_ROW, width: '100%', background: 'none', borderTop: 0, borderLeft: 0, borderRight: 0, fontFamily: 'inherit', cursor: 'pointer', textAlign: 'left' }}
            >
              {nav.features}
              <Chevron size={18} stroke="2.4" open={mobFeat} transition />
            </button>
            {mobFeat && (
              <div id="mobil-funktioner" style={{ display: 'flex', flexDirection: 'column', padding: '4px 0 8px 8px', borderBottom: '1px solid #EEF2F6' }}>
                {nav.featureItems.map((item) => (
                  <Link key={item.key} href={r[item.key]} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 4px', textDecoration: 'none', color: INK }}>
                    <FeatureIcon name={item.key} box={32} icon={16} />
                    <span style={{ minWidth: 0 }}>
                      <span style={{ display: 'block', fontSize: 16, fontWeight: 600 }}>{item.label}</span>
                      <span style={{ display: 'block', fontSize: 13, lineHeight: 1.4, color: '#4A5B73' }}>{item.blurb}</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
            <Link href={r.calculator} style={MOB_ROW}>{nav.calculator}</Link>
            <Link href={r.about} style={MOB_ROW}>{nav.about}</Link>
            <Link href={r.blog} style={MOB_ROW}>{nav.blog}</Link>
            <div data-lang-switch="" style={{ borderBottom: '1px solid #EEF2F6' }}>
              <button
                type="button"
                aria-expanded={langMobOpen}
                aria-controls="lang-mobil"
                onClick={() => setLangMobOpen((v) => !v)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10, minHeight: 54, padding: '0 4px', border: 0, background: 'none',
                  fontFamily: 'inherit', fontSize: 17, fontWeight: 600, color: INK, cursor: 'pointer', textAlign: 'left',
                }}
              >
                <Flag code={locale} w={22} h={15} clipId="uk-t-mb" />
                <span style={{ flex: '1 1 auto' }}>{languageLabel}</span>
                <Chevron size={12} stroke="2.6" open={langMobOpen} />
              </button>
              {langMobOpen && (
                <div id="lang-mobil" style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '0 0 10px' }}>
                  {SWITCH_ORDER.map((code) => (
                    <LanguageRow key={code} code={code} active={code === locale} href={hrefFor(code)} clipId="uk-t-m" />
                  ))}
                </div>
              )}
            </div>
            <a href={PHONE_HREF} style={MOB_ROW}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <PhoneIcon size={18} />
                {nav.callUs}
              </span>
            </a>
            <a href={LOGIN_HREF} style={MOB_ROW}>
              {nav.logIn}
            </a>
            <Link
              href={r.bookDemo}
              data-lift=""
              style={{
                marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 52, borderRadius: 8, background: '#2563EB',
                color: '#FFFFFF', fontSize: 16, fontWeight: 600, textDecoration: 'none',
              }}
            >
              {nav.bookDemo}
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
