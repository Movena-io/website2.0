'use client'

import Image from 'next/image'
import { DEMO_URL } from '@/lib/constants'
import { trackDemoClick } from '@/lib/tracking'
import { useLanguage, useLocalizedHref } from '@/lib/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const href = useLocalizedHref()

  const columns = [
    {
      heading: t.footer.product,
      items: [
        { label: t.footer.links.platform, href: href('/#office') },
        { label: t.footer.links.features, href: href('/#rest-of-system') },
        { label: t.footer.links.calculator, href: href('/savings-calculator') },
      ],
    },
    {
      heading: t.footer.company,
      items: [
        { label: t.footer.links.blog, href: href('/blog') },
        { label: t.footer.links.contact, href: href('/contact') },
        { label: t.footer.links.bookDemo, href: DEMO_URL, external: true },
      ],
    },
    {
      heading: t.footer.legal,
      items: [
        { label: t.footer.links.privacy, href: href('/privacy') },
        { label: t.footer.links.terms, href: href('/terms') },
      ],
    },
  ]

  return (
    <footer className="bg-[#0B1F3B] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">

        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16">
          {/* Left: logo + tagline + company details */}
          <div className="max-w-[260px] flex flex-col gap-4">
            <a href={href('/')} className="inline-flex items-center w-fit">
              <Image
                src="/assets/movena-horizontal-inverse.svg"
                alt="Movena"
                width={130}
                height={32}
              />
            </a>
            <p className="text-[13px] leading-[1.6] text-[#64748B]">
              {t.footer.tagline}
            </p>
            <div className="mt-2 flex flex-col gap-1 text-[12px] text-[#64748B]">
              <span>{t.footer.companyName}</span>
              <span>{t.footer.companyAddress}</span>
              <span>
                <a
                  href="tel:+4528708402"
                  className="text-[#94A3B8] hover:text-[#60A5FA] transition-colors"
                >
                  {t.footer.companyPhone}
                </a>
                {' · '}
                <a
                  href={`mailto:${t.footer.companyEmail}`}
                  className="text-[#94A3B8] hover:text-[#60A5FA] transition-colors"
                >
                  {t.footer.companyEmail}
                </a>
              </span>
            </div>
          </div>

          {/* Right: three columns */}
          <div className="flex flex-wrap gap-10 sm:gap-16">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#64748B] mb-4">
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-3">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target={'external' in item && item.external ? '_blank' : undefined}
                        rel={'external' in item && item.external ? 'noopener noreferrer' : undefined}
                        onClick={'external' in item && item.external ? () => trackDemoClick('footer') : undefined}
                        className="text-[14px] text-[#CBD5E1] hover:text-white transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-[12px] text-[#475569]">
            {t.footer.copyright}
          </p>
          <p className="text-[12px] text-[#475569]">
            {t.footer.compliance}
          </p>
        </div>

      </div>
    </footer>
  )
}
