'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/lib/LanguageContext'

export default function Chain() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const targets = Array.from(section.querySelectorAll('.reveal, .chain-step'))
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden"
    >

      <div className="relative max-w-5xl mx-auto px-6">
        <h2 className="reveal text-[28px] sm:text-[36px] lg:text-[44px] font-semibold tracking-[-0.02em] text-white leading-[1.2] text-center mb-14">
          {t.chain.headline}
        </h2>

        {/* Desktop: horizontal strip */}
        <div className="hidden md:flex items-start justify-between gap-2">
          {t.chain.steps.map((step, i) => (
            <div
              key={i}
              className="chain-step flex-1 flex flex-col items-center text-center"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-10 h-10 rounded-full border-2 border-[#60A5FA]/40 flex items-center justify-center mb-4">
                <span className="text-[14px] font-bold text-[#60A5FA]">{step.number}</span>
              </div>
              <h3 className="text-[15px] font-semibold text-white mb-1">{step.title}</h3>
              <p className="text-[13px] text-[#94A3B8] leading-[1.5]">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical strip */}
        <div className="md:hidden flex flex-col gap-6">
          {t.chain.steps.map((step, i) => (
            <div
              key={i}
              className="chain-step flex items-start gap-4"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-9 h-9 rounded-full border-2 border-[#60A5FA]/40 flex items-center justify-center shrink-0">
                <span className="text-[13px] font-bold text-[#60A5FA]">{step.number}</span>
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-white">{step.title}</h3>
                <p className="text-[13px] text-[#94A3B8] leading-[1.5]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="reveal mt-14 text-center text-[17px] sm:text-[20px] font-semibold text-white/70">
          {t.chain.closingLine}
        </p>
      </div>
    </section>
  )
}
