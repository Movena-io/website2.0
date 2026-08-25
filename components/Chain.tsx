'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/lib/LanguageContext'

export default function Chain() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const line = section.querySelector('.chain-line')
    const steps = Array.from(section.querySelectorAll('.chain-step'))
    const reveals = Array.from(section.querySelectorAll('.reveal'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.classList.add('visible')
        })
      },
      { threshold: 0.12 },
    )

    if (line) observer.observe(line)
    steps.forEach((el) => observer.observe(el))
    reveals.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const lineDelay = 800

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">

      <div className="relative max-w-5xl mx-auto px-6">
        <h2 className="reveal text-[28px] sm:text-[36px] lg:text-[44px] font-semibold tracking-[-0.02em] text-white leading-[1.2] text-center mb-14">
          {t.chain.headline}
          {t.chain.highlight && <span className="text-[#60A5FA]">{t.chain.highlight}</span>}
          {t.chain.headlineEnd}
        </h2>

        {/* Desktop: horizontal strip */}
        <div className="hidden md:block relative">
          {/* Timeline line — behind circles */}
          <div
            className="chain-line absolute left-0 right-0"
            style={{ top: 20, height: 2, zIndex: 0 }}
          >
            <div
              className="chain-line-inner h-full rounded-full"
              style={{
                background: 'linear-gradient(to right, #1D4ED8, #3B82F6, #93C5FD)',
              }}
            />
          </div>

          <div className="relative z-10 flex items-start justify-between gap-2">
            {t.chain.steps.map((step, i) => (
              <div
                key={i}
                className="chain-step flex-1 flex flex-col items-center text-center"
                style={{ transitionDelay: `${lineDelay + i * 80}ms` }}
              >
                <div
                  className="w-10 h-10 rounded-full border-2 border-[#60A5FA]/40 flex items-center justify-center mb-4"
                  style={{ background: '#060F1F' }}
                >
                  <span className="text-[14px] font-bold text-[#60A5FA]">{step.number}</span>
                </div>
                <h3 className="text-[15px] font-semibold text-white mb-1">{step.title}</h3>
                <p className="text-[13px] text-[#94A3B8] leading-[1.5]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical strip */}
        <div className="md:hidden relative">
          {/* Timeline line — vertical, behind circles */}
          <div
            className="chain-line absolute"
            style={{ left: 17, top: 0, bottom: 0, width: 2, zIndex: 0 }}
          >
            <div
              className="chain-line-inner w-full h-full rounded-full"
              style={{
                background: 'linear-gradient(to bottom, #1D4ED8, #3B82F6, #93C5FD)',
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col gap-6">
            {t.chain.steps.map((step, i) => (
              <div
                key={i}
                className="chain-step flex items-start gap-4"
                style={{ transitionDelay: `${lineDelay + i * 80}ms` }}
              >
                <div
                  className="w-9 h-9 rounded-full border-2 border-[#60A5FA]/40 flex items-center justify-center shrink-0"
                  style={{ background: '#060F1F' }}
                >
                  <span className="text-[13px] font-bold text-[#60A5FA]">{step.number}</span>
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-white">{step.title}</h3>
                  <p className="text-[13px] text-[#94A3B8] leading-[1.5]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="reveal mt-14 text-center text-[17px] sm:text-[20px] font-semibold text-white/70">
          {t.chain.closingLine}
        </p>
      </div>
    </section>
  )
}
