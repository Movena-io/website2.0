'use client'

import { ArrowRight, Calculator } from 'lucide-react'
import { useLanguage, useLocalizedHref } from '@/lib/LanguageContext'
import { trackEstimatorClick } from '@/lib/tracking'

export default function EstimatorCTA() {
  const { t } = useLanguage()
  const href = useLocalizedHref()

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl bg-[#0B1F3B] px-8 py-14 sm:px-14 sm:py-16 text-center">
          {/* ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-24 h-[360px] w-[120%] max-w-[1200px] rounded-[50%] opacity-60"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(41,171,226,0.35) 0%, rgba(29,78,216,0.18) 40%, rgba(29,78,216,0) 70%)',
            }}
          />
          <div className="relative">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#60A5FA]">
              <Calculator size={14} strokeWidth={2} />
              {t.calculator.eyebrow}
            </span>
            <h2 className="mt-5 text-[28px] sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.025em] text-white">
              {t.calculator.headline}{' '}
              <span className="bg-gradient-to-r from-[#60A5FA] to-[#29ABE2] bg-clip-text text-transparent">
                {t.calculator.highlight}
              </span>
            </h2>
            <p className="mt-5 text-[16px] sm:text-[17px] text-white/65 leading-[1.7] max-w-xl mx-auto">
              {t.calculator.subheadline}
            </p>
            <a
              href={href('/savings-calculator')}
              onClick={() => trackEstimatorClick('home_section')}
              className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-white text-[#0B1F3B] text-[15px] font-semibold hover:bg-white/90 transition-colors mt-8"
            >
              {t.calculator.button}
              <ArrowRight size={15} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
