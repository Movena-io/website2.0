'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/lib/LanguageContext'

export default function Setup() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const targets = Array.from(section.querySelectorAll('.reveal, .setup-card, .setup-footnote'))
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const cardDelay = (i: number) => i * 120
  const footnoteDelay = 3 * 120 + 200

  return (
    <section ref={sectionRef} id="setup" className="bg-[#F8FAFC] scroll-mt-24 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">

        <div className="reveal flex flex-col items-center gap-3 text-center mb-12">
          {t.setup.label && (
            <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1D4ED8]">
              {t.setup.label}
            </span>
          )}
          <h2 className="max-w-2xl text-[28px] sm:text-[34px] lg:text-[38px] font-semibold tracking-[-0.02em] text-[#0B1F3B] leading-[1.2]">
            {t.setup.headline}<span className="text-[#2563EB]">{t.setup.highlight}</span>
          </h2>
          <p className="text-[15px] text-[#475569] max-w-[560px] leading-[1.7]">
            {t.setup.subheadline}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.setup.steps.map((step, i) => (
            <article
              key={step.title}
              className="setup-card flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-7 transition-all duration-200 hover:border-[#93C5FD] hover:-translate-y-0.5"
              style={{ transitionDelay: `${cardDelay(i)}ms` }}
            >
              <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#2563EB] mb-3">
                {step.timing}
              </span>
              <h3 className="text-[18px] font-medium tracking-[-0.01em] text-[#0B1F3B] leading-[1.3] mb-3">
                {step.title}
              </h3>
              <p className="text-[15px] text-[#64748B] leading-[1.7]">
                {step.text}
              </p>
            </article>
          ))}
        </div>

        {t.setup.footnote && (
          <p
            className="setup-footnote mt-10 text-center text-[17px] font-medium text-[#0F172A]"
            style={{ transitionDelay: `${footnoteDelay}ms` }}
          >
            {t.setup.footnote}
          </p>
        )}

      </div>
    </section>
  )
}
