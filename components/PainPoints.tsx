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
    <section ref={sectionRef} className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal text-center mb-16">
          <div className="flex items-center gap-4 justify-center mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#1D4ED8]/40" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1D4ED8]">{t.painPoints.label}</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#1D4ED8]/40" />
          </div>
          <h2 className="text-[36px] lg:text-[44px] font-bold tracking-[-0.02em] text-[#0B1F3B] leading-[1.2]">
            {t.painPoints.headline} <span className="text-[#F97316]">{t.painPoints.highlight}</span>
          </h2>
          <p className="mt-4 text-[18px] font-normal text-[#475569] max-w-[520px] mx-auto leading-[1.7]">
            {t.painPoints.subheadline}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {t.painPoints.items.map(({ title, description }, i) => (
            <div
              key={i}
              className={`reveal py-10 px-8 ${
                i % 2 === 0 ? 'md:pr-16' : 'md:pl-16'
              } ${
                i < 2 ? 'border-b border-[#BFDBFE]' : ''
              } ${
                i % 2 === 0 ? 'md:border-r md:border-[#BFDBFE]' : ''
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <h3 className="text-[20px] font-bold text-[#0B1F3B] mb-3 leading-[1.25]">{title}</h3>
              <p className="text-[15px] font-normal text-[#475569] leading-[1.75]">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
