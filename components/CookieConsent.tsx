'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import type { Locale } from '@/lib/locales'

// Dispatched by the footer's cookie settings link to bring the banner back so a
// visitor can change an answer they already gave.
export const COOKIE_SETTINGS_EVENT = 'cookie-consent-open'

// Master key, kept so an answer given before the redesign still counts.
export const CONSENT_KEY = 'cookie-consent'
// Per-category keys the redesign's toggles write.
export const STATS_KEY = 'cookie-consent-stats'
export const MARKETING_KEY = 'cookie-consent-marketing'

// Reads one category, falling back to the old all-or-nothing answer for
// visitors who consented before the categories existed.
export function hasConsent(category: 'stats' | 'marketing'): boolean {
  if (typeof window === 'undefined') return false
  const granular = localStorage.getItem(category === 'stats' ? STATS_KEY : MARKETING_KEY)
  if (granular !== null) return granular === 'true'
  return localStorage.getItem(CONSENT_KEY) === 'accepted'
}

type Copy = {
  title: string
  body: string
  readMore: string
  necessary: string
  necessaryDesc: string
  alwaysOn: string
  stats: string
  statsDesc: string
  marketing: string
  marketingDesc: string
  necessaryOnly: string
  acceptAll: string
  settings: string
  save: string
  privacyHref: string
}

const COPY: Record<Locale, Copy> = {
  da: {
    title: 'Vi bruger cookies',
    body: 'Nødvendige cookies får siden til at virke. Med dit samtykke bruger vi også Google Analytics til statistik og Meta Pixel til annoncer. ',
    readMore: 'Læs mere',
    necessary: 'Nødvendige',
    necessaryDesc: 'Får siden og formularerne til at virke',
    alwaysOn: 'Altid aktive',
    stats: 'Statistik',
    statsDesc: 'Google Analytics: hvilke sider der bliver brugt',
    marketing: 'Marketing',
    marketingDesc: 'Meta Pixel: måler og målretter annoncer',
    necessaryOnly: 'Kun nødvendige',
    acceptAll: 'Accepter alle',
    settings: 'Indstillinger',
    save: 'Gem mine valg',
    privacyHref: '/da/privatlivspolitik',
  },
  en: {
    title: 'We use cookies',
    body: 'Necessary cookies make the site work. With your consent we also use Google Analytics for statistics and Meta Pixel for ads. ',
    readMore: 'Read more',
    necessary: 'Necessary',
    necessaryDesc: 'Make the site and forms work',
    alwaysOn: 'Always on',
    stats: 'Statistics',
    statsDesc: 'Google Analytics: which pages are used',
    marketing: 'Marketing',
    marketingDesc: 'Meta Pixel: measures and targets ads',
    necessaryOnly: 'Necessary only',
    acceptAll: 'Accept all',
    settings: 'Settings',
    save: 'Save my choices',
    privacyHref: '/en/privacy',
  },
}

function Switch({ on, label, onToggle }: { on: boolean; label: string; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onToggle}
      style={{
        flexShrink: 0,
        width: '44px',
        height: '26px',
        borderRadius: '13px',
        border: 0,
        padding: '3px',
        background: on ? '#2563EB' : '#C9D3E0',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        transition: 'background 0.2s',
      }}
    >
      <span
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: '#FFFFFF',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
          transform: on ? 'translateX(18px)' : 'none',
          transition: 'transform 0.2s',
        }}
      />
    </button>
  )
}

function Row({ title, desc, right }: { title: string; desc: string; right: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: '14px', fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: '13px', lineHeight: 1.45, color: '#6B7A90' }}>{desc}</div>
      </div>
      {right}
    </div>
  )
}

// Geometry copied from the design: two equal 44px buttons in a 2-col grid,
// then an underlined text button underneath.
const actionBtn = (bg: string): React.CSSProperties => ({
  height: '44px',
  borderRadius: '10px',
  fontFamily: 'inherit',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
  border: 0,
  background: bg,
  color: '#FFFFFF',
})

const textBtn = (color: string): React.CSSProperties => ({
  minHeight: '36px',
  padding: '0 8px',
  background: 'none',
  border: 0,
  fontFamily: 'inherit',
  fontSize: '14px',
  fontWeight: 600,
  color,
  textDecoration: 'underline',
  cursor: 'pointer',
})

export default function CookieConsent() {
  const { locale } = useLanguage()
  const c = COPY[locale]
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const [stats, setStats] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    setStats(hasConsent('stats'))
    setMarketing(hasConsent('marketing'))
    if (!stored) {
      // Small delay so it doesn't flash on initial paint.
      const timer = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    // Reopened on purpose, so no opening delay this time.
    const reopen = () => {
      setStats(hasConsent('stats'))
      setMarketing(hasConsent('marketing'))
      setVisible(true)
      setOpen(true)
    }
    window.addEventListener(COOKIE_SETTINGS_EVENT, reopen)
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, reopen)
  }, [])

  // One place that writes consent, so the master key and the category keys can
  // never disagree.
  function commit(nextStats: boolean, nextMarketing: boolean) {
    const hadStats = hasConsent('stats')
    const hadMarketing = hasConsent('marketing')

    localStorage.setItem(STATS_KEY, String(nextStats))
    localStorage.setItem(MARKETING_KEY, String(nextMarketing))
    localStorage.setItem(CONSENT_KEY, nextStats || nextMarketing ? 'accepted' : 'declined')
    window.dispatchEvent(new Event('cookie-consent-update'))
    setVisible(false)
    setOpen(false)

    // Analytics and the pixel cannot be taken back out of the page once their
    // script has run, so withdrawing consent only really takes effect on a
    // fresh load. Reload only when something was actually withdrawn.
    if ((hadStats && !nextStats) || (hadMarketing && !nextMarketing)) window.location.reload()
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-labelledby="ck-title"
      data-app=""
      style={{
        position: 'fixed',
        zIndex: 50,
        left: 'clamp(12px, 2vw, 24px)',
        right: 'clamp(12px, 2vw, 24px)',
        bottom: 'clamp(12px, 2vw, 24px)',
        maxWidth: '460px',
        boxSizing: 'border-box',
        background: '#FFFFFF',
        color: '#0B1F3B',
        border: '1px solid #E3E8EF',
        borderRadius: '18px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(11, 31, 59, 0.06), 0 30px 60px -20px rgba(11, 31, 59, 0.45)',
        fontSize: '14px',
        lineHeight: 1.5,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span
          aria-hidden="true"
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '10px',
            background: '#E6EDFC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a9 9 0 1 0 9 9 4 4 0 0 1-5-5 4 4 0 0 1-4-4z" />
            <path d="M8.5 11.5h.01M12.5 15.5h.01M8 16h.01M15.5 11h.01" />
          </svg>
        </span>
        <h2 id="ck-title" style={{ margin: 0, fontSize: '17px', fontWeight: 600 }}>
          {c.title}
        </h2>
      </div>

      <p style={{ margin: '10px 0 0', color: '#4A5B73' }}>
        {c.body}
        <a href={c.privacyHref} style={{ color: '#2563EB', fontWeight: 600 }}>
          {c.readMore}
        </a>
      </p>

      {open && (
        <div
          style={{
            marginTop: '14px',
            paddingTop: '14px',
            borderTop: '1px solid #EEF2F6',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <Row
            title={c.necessary}
            desc={c.necessaryDesc}
            right={
              <span
                style={{
                  flexShrink: 0,
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#1E6B43',
                  background: '#DDF3E6',
                  borderRadius: '10px',
                  padding: '3px 8px',
                }}
              >
                {c.alwaysOn}
              </span>
            }
          />
          <Row title={c.stats} desc={c.statsDesc} right={<Switch on={stats} label={c.stats} onToggle={() => setStats((v) => !v)} />} />
          <Row title={c.marketing} desc={c.marketingDesc} right={<Switch on={marketing} label={c.marketing} onToggle={() => setMarketing((v) => !v)} />} />
        </div>
      )}

      <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '8px' }}>
        <button type="button" style={actionBtn('#0B1F3B')} onClick={() => commit(false, false)}>
          {c.necessaryOnly}
        </button>
        <button type="button" style={actionBtn('#2563EB')} onClick={() => commit(true, true)}>
          {c.acceptAll}
        </button>
      </div>

      <div style={{ marginTop: '8px', textAlign: 'center' }}>
        {open ? (
          <button type="button" style={textBtn('#2563EB')} onClick={() => commit(stats, marketing)}>
            {c.save}
          </button>
        ) : (
          <button type="button" style={textBtn('#4A5B73')} onClick={() => setOpen(true)}>
            {c.settings}
          </button>
        )}
      </div>
    </div>
  )
}
