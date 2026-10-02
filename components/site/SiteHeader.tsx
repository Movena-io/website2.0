'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/lib/LanguageContext'
import { ROUTES, NAV, PHONE_DISPLAY, PHONE_HREF, LOGIN_HREF, counterpartPath } from '@/lib/site-nav'
import { useBlogAlternates } from '@/lib/BlogAlternates'
import type { Locale } from '@/lib/locales'
import MovenaMark from '@/components/site/MovenaMark'

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

function FeatureIcon({ name }: { name: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-[#E6EDFC]"
    >
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2563EB"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0"
      >
        {FEATURE_ICONS[name]}
      </svg>
    </span>
  )
}

// Danish first, regardless of which language is being shown. LOCALES is ordered
// en-first for routing, and a switcher that reorders itself per page is jarring.
const SWITCH_ORDER: Locale[] = ['da', 'en']

// Endonyms: a reader looking for English should see "English", not "Engelsk".
const LANGUAGE_NAMES: Record<Locale, string> = { da: 'Dansk', en: 'English' }

function GlobeIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2563EB"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="ml-auto shrink-0"
    >
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  )
}

/** One row in the language list, shared by the dropdown and the mobile menu. */
function LanguageRow({
  code,
  active,
  href,
  onNavigate,
}: {
  code: Locale
  active: boolean
  href: string
  onNavigate?: () => void
}) {
  const label = LANGUAGE_NAMES[code]
  const shared = 'flex items-center gap-2 rounded-xl px-3 py-2.5 text-[15px] font-semibold no-underline'

  if (active) {
    return (
      <span aria-current="true" className={`${shared} bg-[#E6EDFC] text-[#0B1F3B]`}>
        {label}
        <CheckIcon />
      </span>
    )
  }
  return (
    <Link href={href} hrefLang={code} onClick={onNavigate} className={`${shared} text-[#0B1F3B] hover:bg-[#F7F9FC]`}>
      {label}
    </Link>
  )
}

/** Desktop: globe + active code + chevron, opening the same card as Features. */
function LanguageDropdown({
  locale,
  pathname,
  pairs,
  open,
  setOpen,
}: {
  locale: Locale
  pathname: string
  pairs: ReturnType<typeof useBlogAlternates>
  open: boolean
  setOpen: (v: boolean) => void
}) {
  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="sprog-panel"
        aria-label={NAV[locale].language}
        onClick={() => setOpen(!open)}
        className="inline-flex h-11 cursor-pointer items-center gap-1 border-0 bg-transparent p-0 font-[inherit] text-[13px] font-semibold text-[#6B7A90] transition-colors hover:text-[#0B1F3B]"
      >
        <GlobeIcon />
        {locale.toUpperCase()}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="transition-transform duration-200"
          style={{ transform: `rotate(${open ? 180 : 0}deg)` }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          id="sprog-panel"
          className="absolute right-0 top-[calc(100%+8px)] z-10 box-border flex w-[172px] flex-col gap-1 rounded-2xl border border-[#E3E8EF] bg-white p-2"
          style={{
            boxShadow:
              '0 1px 2px rgba(11, 31, 59, 0.06), 0 24px 48px -20px rgba(11, 31, 59, 0.3)',
          }}
        >
          {SWITCH_ORDER.map((code) => (
            <LanguageRow
              key={code}
              code={code}
              active={code === locale}
              href={counterpartPath(pathname, locale, code, pairs)}
              onNavigate={() => setOpen(false)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function SiteHeader() {
  const { locale } = useLanguage()
  const r = ROUTES[locale]
  const nav = NAV[locale]
  const pathname = usePathname() ?? r.home
  const blogPairs = useBlogAlternates()

  const [navOpen, setNavOpen] = useState(false)
  const [mobOpen, setMobOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const shellRef = useRef<HTMLDivElement>(null)

  // Both panels close on navigation, on Escape and on an outside click.
  useEffect(() => {
    setNavOpen(false)
    setMobOpen(false)
    setLangOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!navOpen && !mobOpen && !langOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setNavOpen(false)
        setMobOpen(false)
        setLangOpen(false)
      }
    }
    function onClick(e: MouseEvent) {
      if (shellRef.current && !shellRef.current.contains(e.target as Node)) {
        setNavOpen(false)
        setMobOpen(false)
        setLangOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [navOpen, mobOpen, langOpen])

  const featureLinks = nav.featureItems.map((item) => (
    <Link
      key={item.key}
      href={r[item.key]}
      className="flex items-start gap-3 rounded-xl bg-[#F7F9FC] p-3 text-[#0B1F3B] no-underline transition-colors hover:bg-[#EEF3FA]"
    >
      <FeatureIcon name={item.key} />
      <span className="min-w-0">
        <span className="block text-[15px] font-semibold">{item.label}</span>
        <span className="block text-[13px] leading-[1.4] text-[#4A5B73]">{item.blurb}</span>
      </span>
    </Link>
  ))

  return (
    <header
      className="pointer-events-none sticky top-0 z-20 box-border"
      data-app=""
      style={{ padding: '14px clamp(12px, 3vw, 32px) 0' }}
    >
      <div
        ref={shellRef}
        className="pointer-events-auto relative mx-auto box-border flex max-w-[1200px] items-center gap-3 rounded-2xl border border-[#E3E8EF]"
        style={{
          height: 'clamp(58px, 12vw, 64px)',
          padding: '0 8px 0 clamp(14px, 4vw, 20px)',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow:
            '0 1px 2px rgba(11, 31, 59, 0.06), 0 14px 36px -14px rgba(11, 31, 59, 0.28)',
        }}
      >
        <Link
          href={r.home}
          aria-label={locale === 'da' ? 'Movena, til forsiden' : 'Movena, to the front page'}
          className="flex flex-[0_0_auto] items-center gap-1.5 text-[#0B1F3B] no-underline"
        >
          <MovenaMark
            width={26}
            height={32}
            style={{ width: 'clamp(21px, 5.8vw, 26px)', height: 'auto' }}
          />
          <span
            className="font-semibold leading-none tracking-[-0.04em]"
            style={{ fontSize: 'clamp(20px, 5.4vw, 24px)' }}
          >
            movena
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label={locale === 'da' ? 'Hovedmenu' : 'Main menu'}
          className="ml-6 hidden h-11 items-center gap-8 md:flex lg:ml-10"
        >
          <button
            type="button"
            aria-expanded={navOpen}
            aria-controls="menu-panel"
            onClick={() => {
              setNavOpen((v) => !v)
              setLangOpen(false)
            }}
            className="inline-flex h-11 cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 font-[inherit] text-[15px] font-semibold text-[#0B1F3B]"
          >
            {nav.features}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0B1F3B"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform duration-200"
              style={{ transform: `rotate(${navOpen ? 180 : 0}deg)` }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <Link href={r.about} className="whitespace-nowrap text-[15px] font-semibold leading-[44px] text-[#0B1F3B] no-underline">
            {nav.about}
          </Link>
          <Link href={r.blog} className="whitespace-nowrap text-[15px] font-semibold leading-[44px] text-[#0B1F3B] no-underline">
            {nav.blog}
          </Link>
        </nav>

        {/* Language, phone and the demo button, kept together on the right */}
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageDropdown
              locale={locale}
              pathname={pathname}
              pairs={blogPairs}
              open={langOpen}
              setOpen={(v) => {
                setLangOpen(v)
                if (v) setNavOpen(false)
              }}
            />
          </div>

          <a
            href={PHONE_HREF}
            className="hidden h-11 items-center gap-2 whitespace-nowrap text-[15px] font-semibold text-[#0B1F3B] no-underline lg:inline-flex"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1D4ED8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="shrink-0"
            >
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
            </svg>
            {PHONE_DISPLAY}
          </a>

          {/* Ghost link: secondary to the demo button it sits next to. */}
          <a
            href={LOGIN_HREF}
            className="hidden h-11 flex-[0_0_auto] items-center whitespace-nowrap rounded-lg px-3 text-[15px] font-semibold text-[#0B1F3B] no-underline transition-colors hover:bg-[#F1F5FA] md:inline-flex"
          >
            {nav.logIn}
          </a>

          <Link
            href={r.bookDemo}
            className="hidden h-11 flex-[0_0_auto] items-center whitespace-nowrap rounded-lg bg-[#2563EB] text-[15px] font-semibold text-white no-underline transition-transform duration-200 hover:-translate-y-0.5 sm:inline-flex"
            style={{ padding: '0 clamp(10px, 2.6vw, 14px)' }}
          >
            {nav.bookDemo}
          </Link>

          {/* Burger, below md */}
          <button
            type="button"
            aria-label={nav.menu}
            aria-expanded={mobOpen}
            aria-controls="mobil-menu"
            onClick={() => setMobOpen((v) => !v)}
            className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg border-0 bg-[#F1F5FA] p-0 md:hidden"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0B1F3B"
              strokeWidth="2.2"
              strokeLinecap="round"
              aria-hidden="true"
              className="shrink-0"
            >
              <path d={mobOpen ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} />
            </svg>
          </button>
        </div>

        {/* Features dropdown */}
        {navOpen && (
          <div
            id="menu-panel"
            className="absolute left-0 right-0 top-[calc(100%+8px)] box-border grid gap-2 rounded-2xl border border-[#E3E8EF] bg-white p-3"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              boxShadow:
                '0 1px 2px rgba(11, 31, 59, 0.06), 0 24px 48px -20px rgba(11, 31, 59, 0.3)',
            }}
          >
            {featureLinks}
          </div>
        )}

        {/* Mobile menu */}
        {mobOpen && (
          <div
            id="mobil-menu"
            className="absolute left-0 right-0 top-[calc(100%+8px)] box-border flex flex-col gap-2 rounded-2xl border border-[#E3E8EF] bg-white p-3 md:hidden"
            style={{
              boxShadow:
                '0 1px 2px rgba(11, 31, 59, 0.06), 0 24px 48px -20px rgba(11, 31, 59, 0.3)',
            }}
          >
            {featureLinks}
            <Link href={r.about} className="rounded-xl px-3 py-2.5 text-[15px] font-semibold text-[#0B1F3B] no-underline hover:bg-[#F7F9FC]">
              {nav.about}
            </Link>
            <Link href={r.blog} className="rounded-xl px-3 py-2.5 text-[15px] font-semibold text-[#0B1F3B] no-underline hover:bg-[#F7F9FC]">
              {nav.blog}
            </Link>
            <a href={PHONE_HREF} className="rounded-xl px-3 py-2.5 text-[15px] font-semibold text-[#0B1F3B] no-underline hover:bg-[#F7F9FC]">
              {PHONE_DISPLAY}
            </a>
            {SWITCH_ORDER.map((code) => (
              <LanguageRow
                key={code}
                code={code}
                active={code === locale}
                href={counterpartPath(pathname, locale, code, blogPairs)}
              />
            ))}
            <a
              href={LOGIN_HREF}
              className="rounded-xl px-3 py-2.5 text-[15px] font-semibold text-[#0B1F3B] no-underline hover:bg-[#F7F9FC]"
            >
              {nav.logIn}
            </a>
            <Link
              href={r.bookDemo}
              className="mt-1 inline-flex h-11 items-center justify-center rounded-lg bg-[#2563EB] px-4 text-[15px] font-semibold text-white no-underline"
            >
              {nav.bookDemo}
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
