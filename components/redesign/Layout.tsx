'use client'

// Shared shell from the design (src/components/Layout.tsx in the export):
// header with the feature menu, mobile menu, footer and the CTA band.
//
// Additions the design does not have, agreed for the live site:
// - header: language switcher, "Beregner" and the phone number
// - footer: privacy policy, data portability and cookie settings sit in the
//   bottom bar, because the design hides its last column below 1100px
// Dummy content in the design is replaced with ours: real email address, real
// login link, no "Vilkår" link (terms are retired).
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { COOKIE_SETTINGS_EVENT } from '@/components/CookieConsent'
import { DATA_PORTABILITY_PATH, privacyPath } from '@/lib/constants'
import { FEATURE_PAGES_ENABLED, features, featurePath, type FeatureIcon } from '@/lib/features'
import type { Locale } from '@/lib/locales'
import { useBlogAlternates } from '@/lib/BlogAlternates'
import { counterpartPath, EMAIL, LOGIN_HREF, NAV, PHONE_DISPLAY, PHONE_HREF, ROUTES } from '@/lib/site-nav'
import {
  Boxes,
  CalendarRange,
  ChartNoAxesCombined,
  Check,
  ChevronDown,
  CreditCard,
  FileCheck2,
  Menu,
  Smartphone,
  UsersRound,
  Workflow,
  X,
} from './icons'
import { useT } from './i18n'
import { Button, ButtonLink, IconBox, cx } from './Ui'

export const FEATURE_ICONS: Record<FeatureIcon, typeof UsersRound> = {
  UsersRound,
  CalendarRange,
  Workflow,
  CreditCard,
  Smartphone,
  FileCheck2,
  ChartNoAxesCombined,
  Boxes,
}

type NavFeature = { key: string; href: string; title: string; description: string; icon: FeatureIcon }

// Icons for the three existing feature pages, picked from the eight's set.
const LEGACY_ICONS: Record<'winMore' | 'runTheDay' | 'getPaid', FeatureIcon> = {
  winMore: 'FileCheck2',
  runTheDay: 'CalendarRange',
  getPaid: 'CreditCard',
}

// What the Funktioner menu, the mobile menu and the footer list: the eight new
// feature pages when they are switched on, otherwise the three existing ones
// with their live labels and descriptions.
function navFeatures(locale: Locale): NavFeature[] {
  if (FEATURE_PAGES_ENABLED) {
    return features.map((f) => ({
      key: f.key,
      href: featurePath(f, locale),
      title: f[locale].shortTitle,
      description: f[locale].description,
      icon: f.icon,
    }))
  }
  return NAV[locale].featureItems.map((item) => ({
    key: item.key,
    href: ROUTES[locale][item.key],
    title: item.label,
    description: item.blurb,
    icon: LEGACY_ICONS[item.key],
  }))
}

/** Every redesigned page renders inside this, like the design's RootLayout. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="site">
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </div>
  )
}

const LANGUAGE_NAMES: Record<Locale, string> = { da: 'Dansk', en: 'English' }
const SWITCH_ORDER: Locale[] = ['da', 'en']

function NavLink({ href, children, className }: { href: string; children: ReactNode; className: string }) {
  const pathname = usePathname()
  const active = pathname === href || pathname?.startsWith(`${href}/`)
  return (
    <Link href={href} className={cx(className, active && 'active')}>
      {children}
    </Link>
  )
}

export function SiteHeader() {
  const { t, locale } = useT()
  const r = ROUTES[locale]
  const pathname = usePathname() ?? r.home
  const blogPairs = useBlogAlternates()
  const [featuresOpen, setFeaturesOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setFeaturesOpen(false)
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setFeaturesOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFeaturesOpen(false)
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  const hrefFor = (code: Locale) => counterpartPath(pathname, locale, code, blogPairs)

  // 1:1 with the design's header. The one addition is the small DA/EN switch
  // in front of "Log ind".
  return (
    <header className="site-header">
      <div className="nav-container">
        <Link href={r.home} className="brand-link" aria-label={t('Movena, gå til forsiden', 'Movena, go to the front page')}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/movena-horizontal-primary.png" alt="Movena" />
        </Link>
        <nav className="desktop-nav" aria-label={t('Primær navigation', 'Main navigation')}>
          <NavLink href={r.blog} className="nav-link">
            Blog
          </NavLink>
          <NavLink href={r.about} className="nav-link">
            {t('Om os', 'About')}
          </NavLink>
          <NavLink href={`/${locale}/contact`} className="nav-link">
            {t('Kontakt', 'Contact')}
          </NavLink>
        </nav>
        <div className="nav-actions">
          <LanguageSwitch hrefFor={hrefFor} />
          <a className="login-link" href={LOGIN_HREF}>
            {t('Log ind', 'Log in')}
          </a>
          <ButtonLink to={r.bookDemo} size="small">
            {t('Bliv ringet op', 'Get a call')}
          </ButtonLink>
          <Button
            variant="ghost"
            size="small"
            className="menu-button"
            aria-label={menuOpen ? t('Luk menu', 'Close menu') : t('Åbn menu', 'Open menu')}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {menuOpen && <MobileMenu hrefFor={hrefFor} />}
    </header>
  )
}

function LanguageSwitch({ hrefFor, className }: { hrefFor: (code: Locale) => string; className?: string }) {
  const { t, locale } = useT()
  return (
    <span className={cx('lang-inline', className)} aria-label={t('Sprog', 'Language')}>
      {SWITCH_ORDER.map((code) =>
        code === locale ? (
          <span key={code} aria-current="true" title={LANGUAGE_NAMES[code]}>
            {code.toUpperCase()}
          </span>
        ) : (
          <Link key={code} href={hrefFor(code)} hrefLang={code} lang={code} title={LANGUAGE_NAMES[code]}>
            {code.toUpperCase()}
          </Link>
        ),
      )}
    </span>
  )
}

function FeaturesMenu() {
  const { t, locale } = useT()
  return (
    <div className="features-menu">
      <div className="features-menu-head">
        <span>{t('En platform til hele flytteforretningen', 'One platform for the whole moving business')}</span>
        <small>{t('Udforsk alle funktioner', 'Explore every feature')}</small>
      </div>
      <div className="features-menu-grid">
        {navFeatures(locale).map((item) => (
          <Link href={item.href} key={item.key}>
            <IconBox icon={FEATURE_ICONS[item.icon]} />
            <span>
              <span className="menu-title">{item.title}</span>
              <small>{item.description}</small>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

function MobileMenu({ hrefFor }: { hrefFor: (code: Locale) => string }) {
  const { t, locale } = useT()
  const r = ROUTES[locale]
  return (
    <nav className="mobile-nav" aria-label={t('Mobil navigation', 'Mobile navigation')}>
      <Link href={r.blog}>Blog</Link>
      <Link href={r.about}>{t('Om os', 'About')}</Link>
      <Link href={`/${locale}/contact`}>{t('Kontakt', 'Contact')}</Link>
      <a href={LOGIN_HREF}>{t('Log ind', 'Log in')}</a>
      <Link href={r.bookDemo}>{t('Bliv ringet op', 'Get a call')}</Link>
      <LanguageSwitch hrefFor={hrefFor} className="lang-inline-mobile" />
    </nav>
  )
}

// The design's footer without the Funktioner column and without "Vilkår":
// brand, Virksomhed and Kontakt. Feature pages and the calculator are not
// linked during launch step 1. Data portability and cookie settings sit in
// the bottom bar after the CVR.
export function SiteFooter() {
  const { t, locale } = useT()
  const r = ROUTES[locale]
  const openCookieSettings = () => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))
  const privacy = <Link href={privacyPath(locale)}>{t('Privatliv', 'Privacy')}</Link>
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/movena-horizontal-inverse.png" alt="Movena" />
          <p>
            {t(
              'Alt, din flytteforretning behøver. Samlet i en platform.',
              'Everything your moving business needs. Together in one platform.',
            )}
          </p>
          <ButtonLink to={r.bookDemo} variant="light" size="small">
            {t('Bliv ringet op', 'Get a call')}
          </ButtonLink>
        </div>
        <div className="footer-column">
          <span className="footer-title">{t('Virksomhed', 'Company')}</span>
          <Link href={r.about}>{t('Om os', 'About')}</Link>
          <Link href={r.blog}>Blog</Link>
          <a href={LOGIN_HREF}>{t('Log ind', 'Log in')}</a>
        </div>
        <div className="footer-column">
          <span className="footer-title">{t('Kontakt', 'Contact')}</span>
          <Link href={r.bookDemo}>{t('Book en demo', 'Book a demo')}</Link>
          <Link href={`/${locale}/contact`}>{t('Kontakt', 'Contact')}</Link>
          <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          {privacy}
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-bottom-legal">
          © 2026 Movena ApS · CVR 46764129 ·{' '}
          {/* Unprefixed on purpose: middleware serves it from the Danish tree. */}
          <a href={DATA_PORTABILITY_PATH}>{t('Dataportabilitet', 'Data portability')}</a> ·{' '}
          <button type="button" className="footer-link-button" onClick={openCookieSettings}>
            {t('Cookieindstillinger', 'Cookie settings')}
          </button>
        </span>
        <span>{t('Bygget til danske flyttevirksomheder', 'Built for Danish moving companies')}</span>
      </div>
    </footer>
  )
}

export function CtaBand({ compact = false }: { compact?: boolean }) {
  const { t, locale } = useT()
  return (
    <section className={cx('cta-band', compact && 'cta-band-compact')}>
      <div>
        <h2>{t('Se hvordan Movena passer ind i jeres hverdag', 'See how Movena fits into your day')}</h2>
        {/* The design's first sentence was placeholder text; "Book en gratis demo." is the live site's. */}
        <p>
          {t(
            'Book en gratis demo. En kort samtale, helt uforpligtende.',
            'Book a free demo. A short conversation, no strings attached.',
          )}
        </p>
      </div>
      <ButtonLink to={ROUTES[locale].bookDemo} variant="light">
        {t('Bliv ringet op', 'Get a call')}
      </ButtonLink>
    </section>
  )
}
