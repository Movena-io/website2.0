'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/lib/LanguageContext'

export default function BuiltWith() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const targets = Array.from(section.querySelectorAll('.reveal, .setup-card'))
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="built-with" className="bg-white py-16 md:py-24 scroll-mt-24 light-to-dark-hint">
      <div className="max-w-6xl mx-auto px-6">

        <div className="reveal max-w-2xl mb-12">
          {t.builtWith.label && (
            <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1D4ED8] mb-3">
              {t.builtWith.label}
            </span>
          )}
          <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-semibold tracking-[-0.02em] text-[#0B1F3B] leading-[1.2] mb-5">
            {t.builtWith.headline}
            {t.builtWith.highlight && <span className="text-[#2563EB]">{t.builtWith.highlight}</span>}
            {t.builtWith.headlineEnd}
          </h2>
          <p className="text-[16px] sm:text-[17px] text-[#475569] leading-[1.7]">
            {t.builtWith.text}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.builtWith.points.map((point, i) => (
            <article
              key={point.title}
              className="setup-card flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-7 transition-all duration-200 hover:border-[#93C5FD] hover:-translate-y-0.5"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <h3 className="text-[18px] font-medium tracking-[-0.01em] text-[#0B1F3B] leading-[1.3] mb-3">
                {point.title}
              </h3>
              <p className="text-[15px] text-[#64748B] leading-[1.7]">
                {point.text}
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
