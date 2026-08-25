'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/lib/LanguageContext'

export default function PainPoints() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const targets = Array.from(section.querySelectorAll('.reveal, .tool-box'))
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const tools = t.painPoints.tools

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden"
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

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Headline */}
        <div className="reveal mb-16">
          {t.painPoints.label && (
            <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#60A5FA] mb-3">
              {t.painPoints.label}
            </span>
          )}
          <h2 className="text-[28px] sm:text-[36px] lg:text-[48px] font-semibold tracking-[-0.03em] text-white leading-[1.1] max-w-[640px]">
            {t.painPoints.headline}
            {t.painPoints.highlight && <span className="text-[#60A5FA]">{t.painPoints.highlight}</span>}
          </h2>
          <p className="mt-4 text-[18px] font-normal text-[#94A3B8] max-w-[480px] leading-[1.7]">
            {t.painPoints.subheadline}
          </p>
        </div>

        {/* Five tool boxes — grid, equal widths, no lines */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-8 xl:gap-10 mb-16">
          {tools.map((tool, i) => (
            <div
              key={tool}
              className="tool-box flex items-center justify-center rounded-lg"
              style={{
                background: '#0F1B2E',
                border: '1px solid #1E3A5F',
                padding: '20px 24px',
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <span className="text-[15px] font-medium text-[#CBD5E1] select-none text-center">
                {tool}
              </span>
            </div>
          ))}
        </div>

        {/* Three consequence lines */}
        <div className="max-w-2xl">
          {t.painPoints.consequences.map((line, i) => (
            <div
              key={i}
              className={`reveal py-4 ${i < t.painPoints.consequences.length - 1 ? 'border-b border-[#1E3A5F]' : ''}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <p className="text-[15px] lg:text-[16px] font-normal text-[#94A3B8] leading-[1.75]">
                {line}
              </p>
            </div>
          ))}
        </div>

        {/* Closing line */}
        {t.painPoints.closingLine && (
          <p
            className="reveal mt-12 text-center text-[20px] sm:text-[24px] lg:text-[28px] font-semibold tracking-[-0.02em] bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(to right, #1D4ED8, #3B82F6, #93C5FD)', backgroundSize: '100% 100%' }}
          >
            {t.painPoints.closingLine}
          </p>
        )}
      </div>
    </section>
  )
}
