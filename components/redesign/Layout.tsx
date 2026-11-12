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
import { features, featurePath, type FeatureIcon } from '@/lib/features'
import type { Locale } from '@/lib/locales'
import { useBlogAlternates } from '@/lib/BlogAlternates'
import { counterpartPath, EMAIL, LOGIN_HREF, PHONE_DISPLAY, PHONE_HREF, ROUTES } from '@/lib/site-nav'
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
  const [langOpen, setLangOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setFeaturesOpen(false)
    setMenuOpen(false)
    setLangOpen(false)
  }, [pathname])

  useEffect(() => {
    const close = (event: MouseEvent) => {
      const target = event.target as Node
      if (menuRef.current && !menuRef.current.contains(target)) setFeaturesOpen(false)
      if (langRef.current && !langRef.current.contains(target)) setLangOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFeaturesOpen(false)
        setMenuOpen(false)
        setLangOpen(false)
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

  return (
    <header className="site-header">
      <div className="nav-container">
        <Link href={r.home} className="brand-link" aria-label={t('Movena, gå til forsiden', 'Movena, go to the front page')}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/movena-horizontal-primary.png" alt="Movena" />
        </Link>
        <nav className="desktop-nav" aria-label={t('Primær navigation', 'Main navigation')}>
          <div className="features-trigger-wrap" ref={menuRef}>
            <Button
              variant="ghost"
              size="small"
              className={cx('nav-trigger', featuresOpen && 'is-open')}
              aria-expanded={featuresOpen}
              onClick={() => setFeaturesOpen((open) => !open)}
            >
              {t('Funktioner', 'Features')} <ChevronDown size={15} />
            </Button>
            {featuresOpen && <FeaturesMenu />}
          </div>
          <NavLink href={r.blog} className="nav-link">
            Blog
          </NavLink>
          <NavLink href={r.about} className="nav-link">
            {t('Om os', 'About')}
          </NavLink>
          <NavLink href={r.calculator} className="nav-link">
            {t('Beregner', 'Calculator')}
          </NavLink>
        </nav>
        <div className="nav-actions">
          <div className="lang-switch" ref={langRef}>
            <button
              type="button"
              className={cx('lang-trigger', langOpen && 'is-open')}
              aria-expanded={langOpen}
              aria-label={`${t('Sprog', 'Language')}: ${LANGUAGE_NAMES[locale]}`}
              onClick={() => setLangOpen((open) => !open)}
            >
              {locale.toUpperCase()} <ChevronDown size={14} />
            </button>
            {langOpen && (
              <div className="lang-menu">
                {SWITCH_ORDER.map((code) =>
                  code === locale ? (
                    <span key={code} aria-current="true">
                      {LANGUAGE_NAMES[code]} <Check size={14} />
                    </span>
                  ) : (
                    <Link key={code} href={hrefFor(code)} hrefLang={code} lang={code}>
                      {LANGUAGE_NAMES[code]}
                    </Link>
                  ),
                )}
              </div>
            )}
          </div>
          <a className="login-link header-phone" href={PHONE_HREF}>
            {PHONE_DISPLAY}
          </a>
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

function FeaturesMenu() {
  const { t, locale } = useT()
  return (
    <div className="features-menu">
      <div className="features-menu-head">
        <span>{t('Én platform til hele flytteforretningen', 'One platform for the whole moving business')}</span>
        <small>{t('Udforsk alle funktioner', 'Explore every feature')}</small>
      </div>
      <div className="features-menu-grid">
        {features.map((feature) => (
          <Link href={featurePath(feature, locale)} key={feature.key}>
            <IconBox icon={FEATURE_ICONS[feature.icon]} />
            <span>
              <span className="menu-title">{feature[locale].shortTitle}</span>
              <small>{feature[locale].description}</small>
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
      <div className="mobile-nav-label">{t('Funktioner', 'Features')}</div>
      {features.map((feature) => {
        const Icon = FEATURE_ICONS[feature.icon]
        return (
          <Link href={featurePath(feature, locale)} key={feature.key}>
            <Icon size={18} strokeWidth={1.6} />
            {feature[locale].shortTitle}
          </Link>
        )
      })}
      <div className="mobile-nav-divider" />
      <Link href={r.blog}>Blog</Link>
      <Link href={r.about}>{t('Om os', 'About')}</Link>
      <Link href={r.calculator}>{t('Beregner', 'Calculator')}</Link>
      <Link href={r.bookDemo}>{t('Bliv ringet op', 'Get a call')}</Link>
      <a href={LOGIN_HREF}>{t('Log ind', 'Log in')}</a>
      <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
      <div className="mobile-nav-divider" />
      <div className="mobile-nav-label">{t('Sprog', 'Language')}</div>
      {SWITCH_ORDER.map((code) =>
        code === locale ? (
          <span className="mobile-lang-current" key={code} aria-current="true">
            {LANGUAGE_NAMES[code]} <Check size={14} />
          </span>
        ) : (
          <Link key={code} href={hrefFor(code)} hrefLang={code} lang={code}>
            {LANGUAGE_NAMES[code]}
          </Link>
        ),
      )}
    </nav>
  )
}

export function SiteFooter() {
  const { t, locale } = useT()
  const r = ROUTES[locale]
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/movena-horizontal-inverse.png" alt="Movena" />
          <p>
            {t(
              'Alt, din flytteforretning behøver. Samlet i én platform.',
              'Everything your moving business needs. Together in one platform.',
            )}
          </p>
          <ButtonLink to={r.bookDemo} variant="light" size="small">
            {t('Bliv ringet op', 'Get a call')}
          </ButtonLink>
        </div>
        <div className="footer-column footer-features">
          <span className="footer-title">{t('Funktioner', 'Features')}</span>
          {features.map((feature) => (
            <Link href={featurePath(feature, locale)} key={feature.key}>
              {feature[locale].shortTitle}
            </Link>
          ))}
        </div>
        <div className="footer-column">
          <span className="footer-title">{t('Virksomhed', 'Company')}</span>
          <Link href={r.about}>{t('Om os', 'About')}</Link>
          <Link href={r.blog}>Blog</Link>
          <Link href={r.calculator}>{t('Besparelsesberegner', 'Savings calculator')}</Link>
          <a href={LOGIN_HREF}>{t('Log ind', 'Log in')}</a>
        </div>
        <div className="footer-column">
          <span className="footer-title">{t('Kontakt', 'Contact')}</span>
          <Link href={r.bookDemo}>{t('Book en demo', 'Book a demo')}</Link>
          <Link href={`/${locale}/contact`}>{t('Kontakt', 'Contact')}</Link>
          <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © 2026 Movena ApS · CVR 46764129 · {t('Rådhuspladsen 16, København', 'Rådhuspladsen 16, Copenhagen')}
        </span>
        <span className="footer-legal">
          <Link href={privacyPath(locale)}>{t('Privatlivspolitik', 'Privacy policy')}</Link>
          {/* Unprefixed on purpose: middleware serves it from the Danish tree. */}
          <a href={DATA_PORTABILITY_PATH}>{t('Dataportabilitet', 'Data portability')}</a>
          <button type="button" onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))}>
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
        {/* The design's sentence opens with lorem ipsum; only the real half is kept. */}
        <p>{t('En kort samtale, helt uforpligtende.', 'A short conversation, no strings attached.')}</p>
      </div>
      <ButtonLink to={ROUTES[locale].bookDemo} variant="light">
        {t('Bliv ringet op', 'Get a call')}
      </ButtonLink>
    </section>
  )
}
