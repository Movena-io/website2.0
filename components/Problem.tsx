'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/lib/LanguageContext'

export default function Problem() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const targets = sectionRef.current
      ? Array.from(sectionRef.current.querySelectorAll('.reveal'))
      : []
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="how-it-works" ref={sectionRef} className="bg-white py-24 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">

        <div className="reveal text-center mb-16">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1D4ED8] mb-3">{t.howItWorks.label}</span>
          <h2 className="text-[24px] sm:text-[32px] lg:text-[44px] font-semibold tracking-[-0.02em] text-[#0B1F3B] leading-[1.2]">
            {t.howItWorks.headline}
          </h2>
          <p className="mt-4 text-[18px] font-normal text-[#475569] max-w-[460px] mx-auto leading-[1.7]">
            {t.howItWorks.subheadline}
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-[23px] left-[calc(12.5%+8px)] right-[calc(12.5%+8px)] h-px bg-[#E2E8F0]" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {t.howItWorks.steps.map(({ title, description }, i) => (
              <div
                key={i}
                className="reveal flex flex-col items-center text-center"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-white border-2 border-[#1D4ED8]/30 flex items-center justify-center mb-5 relative z-10 shrink-0">
                  <span className="text-[13px] font-extrabold text-[#1D4ED8]">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-[16px] font-semibold text-[#0B1F3B] mb-2">{title}</h3>
                <p className="text-[14px] font-normal text-[#475569] leading-[1.65]">{description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
