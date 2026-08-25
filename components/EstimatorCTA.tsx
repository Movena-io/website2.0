'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight, Calculator } from 'lucide-react'
import { useLanguage, useLocalizedHref } from '@/lib/LanguageContext'
import { trackEstimatorClick } from '@/lib/tracking'

export default function EstimatorCTA() {
  const { t } = useLanguage()
  const href = useLocalizedHref()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const targets = Array.from(section.querySelectorAll('.reveal'))
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#F8FAFC] py-20 sm:py-24">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="reveal relative overflow-hidden rounded-3xl bg-[#0B1F3B] px-8 py-14 sm:px-14 sm:py-16 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-24 h-[360px] w-[120%] max-w-[1200px] rounded-[50%] opacity-60"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(30,58,138,0.4) 0%, rgba(30,58,138,0.18) 40%, transparent 70%)',
            }}
          />
          <div className="relative">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#60A5FA]">
              <Calculator size={14} strokeWidth={2} />
              {t.calculator.eyebrow}
            </span>
            <h2 className="mt-5 text-[28px] sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.025em] text-white">
              {t.calculator.headline}
              <span className="text-[#60A5FA]">{t.calculator.highlight}</span>
            </h2>
            <p className="mt-5 text-[16px] sm:text-[17px] text-[#94A3B8] leading-[1.7] max-w-xl mx-auto">
              {t.calculator.text}
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
