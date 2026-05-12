'use client'

import { ArrowRight, Check } from 'lucide-react'
import { useLanguage, useLocalizedHref } from '@/lib/LanguageContext'

export default function FoundingCustomer() {
  const { t } = useLanguage()
  const href = useLocalizedHref()

  return (
    <section id="founding-customer" className="bg-[#0B1F3B] scroll-mt-24 py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-6">

        <div className="flex flex-col items-center gap-3 text-center mb-8">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#60A5FA]">
            {t.foundingCustomer.label}
          </span>
          <h2 className="max-w-2xl text-[28px] sm:text-[34px] lg:text-[40px] font-semibold tracking-[-0.025em] text-white leading-[1.15]">
            {t.foundingCustomer.headline}{' '}
            <span className="text-[#60A5FA]">{t.foundingCustomer.highlight}</span>
          </h2>
        </div>

        <p className="max-w-2xl mx-auto text-center text-[16px] leading-[1.7] text-white/70">
          {t.foundingCustomer.lead}
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.foundingCustomer.bullets.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1D4ED8]/30">
                  <Check size={13} strokeWidth={2.5} className="text-[#60A5FA]" />
                </div>
                <p className="text-[14px] font-semibold text-white">{b.title}</p>
              </div>
              <p className="text-[13px] text-white/60 leading-[1.6]">{b.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={href('/contact?subject=Founding%20customer%20application')}
            className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-white text-[#0B1F3B] text-[15px] font-semibold hover:bg-white/90 transition-colors"
          >
            {t.foundingCustomer.cta}
            <ArrowRight size={15} strokeWidth={2} />
          </a>
          <a
            href={href('/contact')}
            className="inline-flex items-center justify-center h-12 px-6 rounded-xl text-white/70 text-[14px] font-medium hover:text-white transition-colors"
          >
            {t.foundingCustomer.ctaSecondary}
          </a>
        </div>

      </div>
    </section>
  )
}
