'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/lib/LanguageContext'

export default function PainPoints() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const targets = sectionRef.current
      ? Array.from(sectionRef.current.querySelectorAll('.reveal'))
      : []
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal mb-16">
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1D4ED8]">{t.painPoints.label}</span>
          <h2 className="mt-3 text-[36px] lg:text-[48px] font-semibold tracking-[-0.03em] text-[#0B1F3B] leading-[1.1] max-w-[640px]">
            {t.painPoints.headline} {t.painPoints.highlight}
          </h2>
          <p className="mt-4 text-[18px] font-normal text-[#475569] max-w-[480px] leading-[1.7]">
            {t.painPoints.subheadline}
          </p>
        </div>

        <div className="divide-y divide-[#E2E8F0]">
          {t.painPoints.items.map(({ title, description }, i) => (
            <div
              key={i}
              className="reveal flex gap-8 lg:gap-16 items-start py-10"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="text-[40px] lg:text-[56px] font-extrabold text-[#E2E8F0] leading-none shrink-0 tabular-nums select-none w-12 lg:w-16 text-right">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="pt-1">
                <h3 className="text-[20px] lg:text-[22px] font-semibold text-[#0B1F3B] mb-2 leading-[1.2]">{title}</h3>
                <p className="text-[15px] lg:text-[16px] font-normal text-[#475569] leading-[1.75]">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
