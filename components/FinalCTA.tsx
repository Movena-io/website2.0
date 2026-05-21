'use client'

import { ArrowRight } from 'lucide-react'
import { DEMO_URL } from '@/lib/constants'
import { trackDemoClick, trackEstimatorClick } from '@/lib/tracking'
import { useLanguage, useLocalizedHref } from '@/lib/LanguageContext'

export default function FinalCTA() {
  const { t } = useLanguage()
  const href = useLocalizedHref()

  return (
    <section className="bg-[#0B1F3B] py-28" id="waitlist">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-[26px] sm:text-[32px] lg:text-[48px] font-semibold leading-[1.1] tracking-[-0.025em] text-white">
          {t.finalCta.headline} {t.finalCta.highlight}
        </h2>
        <p className="mt-5 text-[17px] font-normal leading-[1.7] text-white/60 max-w-xl mx-auto">
          {t.finalCta.subheadline}{' '}
          <strong className="font-semibold text-white/80">{t.finalCta.benefit}</strong>
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackDemoClick('final_cta')}
            className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-white text-[#0B1F3B] text-[15px] font-semibold hover:bg-white/90 transition-colors"
          >
            {t.finalCta.button}
            <ArrowRight size={15} strokeWidth={2} />
          </a>
          <a
            href={href('/savings-calculator')}
            onClick={() => trackEstimatorClick('final_cta')}
            className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl border border-white/25 text-white text-[15px] font-semibold hover:bg-white/10 transition-colors"
          >
            {t.finalCta.secondaryButton}
            <ArrowRight size={15} strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  )
}
