'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { DEMO_URL } from '@/lib/constants'
import { trackDemoClick } from '@/lib/tracking'
import { useLanguage, useLocalizedHref } from '@/lib/LanguageContext'

export default function FinalCTA() {
  const { t } = useLanguage()
  const href = useLocalizedHref()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const targets = sectionRef.current
      ? Array.from(sectionRef.current.querySelectorAll('.reveal'))
      : []
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      id="waitlist"
      style={{ background: '#060F1F' }}
    >
      {/* Radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(30,58,138,0.18) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h2 className="reveal text-[26px] sm:text-[32px] lg:text-[48px] font-semibold leading-[1.1] tracking-[-0.025em] text-white">
          {t.finalCta.headline}{t.finalCta.highlight && ` ${t.finalCta.highlight}`}
        </h2>
        <p className="reveal mt-5 text-[17px] font-normal leading-[1.7] text-[#94A3B8] max-w-xl mx-auto">
          {t.finalCta.subheadline}
          {t.finalCta.benefit && <>{' '}<strong className="font-semibold text-white/80">{t.finalCta.benefit}</strong></>}
        </p>
        <div className="reveal mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
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
            href="tel:+4528708402"
            className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl border border-white/25 text-white text-[15px] font-semibold hover:bg-white/10 transition-colors"
          >
            {t.finalCta.secondaryButton}
          </a>
        </div>
        {t.finalCta.disclaimer && (
          <p className="reveal mt-6 text-[13px] text-white/40">
            <a href={href('/savings-calculator')} className="hover:text-white/60 transition-colors">
              {t.finalCta.disclaimer}
            </a>
          </p>
        )}
      </div>
    </section>
  )
}
