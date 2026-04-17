'use client'

import { TYPEFORM_URL } from '@/lib/constants'
import { trackWaitlistClick } from '@/lib/tracking'
import { useLanguage } from '@/lib/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  const links = {
    [t.footer.product]: [
      { label: t.footer.links.features, href: '/#features' },
      { label: t.footer.links.howItWorks, href: '/#how-it-works' },
      { label: t.footer.links.joinWaitlist, href: TYPEFORM_URL, external: true },
    ],
    [t.footer.company]: [
      { label: t.footer.links.contact, href: '/contact' },
    ],
    [t.footer.legal]: [
      { label: t.footer.links.privacy, href: '/privacy' },
      { label: t.footer.links.terms, href: '/terms' },
    ],
  }

  return (
    <footer className="bg-[#0B1F3B] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-14">

        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-[220px]">
            <p className="text-[13px] leading-[1.6] text-[#64748B]">
              {t.footer.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-10 sm:gap-16">
            {Object.entries(links).map(([group, items]) => (
              <div key={group}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#475569] mb-4">
                  {group}
                </p>
                <ul className="flex flex-col gap-3">
                  {items.map(({ label, href, external }: { label: string; href: string; external?: boolean }) => (
                    <li key={label}>
                      <a
                        href={href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        onClick={external ? () => trackWaitlistClick('footer') : undefined}
                        className="text-[13px] text-[#94A3B8] hover:text-white transition-colors"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[12px] text-[#475569]">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <div className="flex items-center gap-4">
            <p className="text-[12px] text-[#475569]">{t.footer.compliance}</p>
            <p className="text-[12px] text-[#475569]">{t.footer.location}</p>
          </div>
        </div>

      </div>
    </footer>
  )
}
