'use client'

import { ArrowRight } from 'lucide-react'
import { TYPEFORM_URL } from '@/lib/constants'
import { trackWaitlistClick } from '@/lib/tracking'
import { useLanguage } from '@/lib/LanguageContext'

export default function FinalCTA() {
  const { t } = useLanguage()

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
            href={TYPEFORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWaitlistClick('final_cta')}
            className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-white text-[#0B1F3B] text-[15px] font-semibold hover:bg-white/90 transition-colors"
          >
            {t.finalCta.button}
            <ArrowRight size={15} strokeWidth={2} />
          </a>
        </div>
        <p className="mt-4 text-[13px] font-medium text-white/30">
          {t.finalCta.disclaimer}
        </p>
      </div>
    </section>
  )
}
