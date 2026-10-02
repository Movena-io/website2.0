'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'
import { COOKIE_SETTINGS_EVENT } from '@/components/CookieConsent'
import { DATA_PORTABILITY_PATH, privacyPath } from '@/lib/constants'
import { ROUTES, NAV, FOOTER, PHONE_DISPLAY, PHONE_HREF, EMAIL, LOGIN_HREF } from '@/lib/site-nav'
import MovenaMark from '@/components/site/MovenaMark'

export default function SiteFooter() {
  const { locale } = useLanguage()
  const r = ROUTES[locale]
  const nav = NAV[locale]
  const f = FOOTER[locale]

  // The design leaves footer links at the browser default, so they are
  // underlined. Tailwind's preflight strips that, so it is restored here.
  const linkStyle = 'block text-[#B7C4D8] underline hover:text-white transition-colors'

  return (
    <footer
      className="border-t border-[#22385C] text-[#B7C4D8]"
      data-app=""
      style={{ background: 'linear-gradient(180deg, #0B1F3B 0%, #081729 100%)' }}
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap justify-between gap-x-16 gap-y-8 pb-14 pt-12 text-[15px] leading-[1.7]"
        style={{ padding: '48px clamp(20px, 5vw, 64px) 56px' }}>
        <div className="min-w-0 flex-[1_1_240px]">
          <div className="flex items-center gap-1.5 text-white">
            <MovenaMark width={24} height={29} backFill="#2BA8E0" frontFill="#FFFFFF" />
            <span className="text-[22px] font-semibold leading-none tracking-[-0.04em]">movena</span>
          </div>
          <p className="mt-3">{f.tagline}</p>
        </div>

        <div>
          <div className="font-semibold text-white">{f.colFeatures}</div>
          {nav.featureItems.map((item) => (
            <Link key={item.key} href={r[item.key]} className={linkStyle}>
              {item.label}
            </Link>
          ))}
        </div>

        <div>
          <div className="font-semibold text-white">{f.colCompany}</div>
          <Link href={r.about} className={linkStyle}>{nav.about}</Link>
          <Link href={r.blog} className={linkStyle}>{nav.blog}</Link>
          <Link href={r.bookDemo} className={linkStyle}>{nav.bookDemo}</Link>
          <a href={LOGIN_HREF} className={linkStyle}>{nav.logIn}</a>
        </div>

        <div>
          <div className="font-semibold text-white">{f.colContact}</div>
          <a href={PHONE_HREF} className={linkStyle}>{PHONE_DISPLAY}</a>
          <a href={`mailto:${EMAIL}`} className={linkStyle}>{EMAIL}</a>
        </div>

        <div>
          <div className="font-semibold text-white">{f.company}</div>
          <div>{f.cvr}</div>
          <div>{f.address}</div>
        </div>

        <div>
          <div className="font-semibold text-white">{f.colData}</div>
          {/* Unprefixed on purpose: middleware rewrites it onto the Danish tree,
              so both locales link to one address. */}
          <a href={DATA_PORTABILITY_PATH} className={linkStyle}>{f.dataPortability}</a>
          <Link href={privacyPath(locale)} className={linkStyle}>
            {f.privacy}
          </Link>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))}
            className="block cursor-pointer border-0 bg-transparent p-0 text-left font-[inherit] text-[inherit] leading-[inherit] text-[#B7C4D8] underline hover:text-white transition-colors"
          >
            {f.cookieSettings}
          </button>
        </div>
      </div>
    </footer>
  )
}
