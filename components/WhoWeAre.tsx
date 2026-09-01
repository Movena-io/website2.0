'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/lib/LanguageContext'

export default function WhoWeAre() {
  const { t } = useLanguage()
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

      <div className="relative max-w-5xl mx-auto px-6">
        <h2 className="reveal text-[28px] sm:text-[36px] lg:text-[44px] font-semibold tracking-[-0.02em] text-white leading-[1.2] mb-5">
          {t.whoWeAre.headline}
          {t.whoWeAre.highlight && <span className="text-[#60A5FA]">{t.whoWeAre.highlight}</span>}
          {t.whoWeAre.headlineEnd}
        </h2>
        <p className="reveal text-[16px] sm:text-[17px] text-[#94A3B8] leading-[1.7] max-w-2xl mb-8">
          {t.whoWeAre.text}
        </p>

        <ul className="reveal grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-3xl mb-12">
          {t.whoWeAre.facts.map((fact) => (
            <li key={fact} className="flex items-start gap-2.5">
              <span className="mt-[9px] shrink-0 w-[5px] h-[5px] rounded-full bg-[#60A5FA]" />
              <span className="text-[15px] text-[#CBD5E1] leading-[1.6]">{fact}</span>
            </li>
          ))}
        </ul>

        <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {t.whoWeAre.people.map((person) => (
            <div key={person.name}>
              <p className="text-[18px] font-semibold text-white">{person.name}</p>
              <p className="text-[14px] text-[#94A3B8] mt-1">{person.role}</p>
              {person.phone && (
                <a
                  href={`tel:${person.phone.replace(/\s/g, '')}`}
                  className="text-[14px] text-[#94A3B8] hover:text-white transition-colors mt-1 block"
                >
                  {person.phone}
                </a>
              )}
              {person.email && (
                <a
                  href={`mailto:${person.email}`}
                  className="text-[14px] text-[#60A5FA] hover:text-[#93C5FD] transition-colors mt-0.5 inline-block"
                >
                  {person.email}
                </a>
              )}
            </div>
          ))}
        </div>

        <p className="reveal text-[13px] text-[#475569]">
          {t.whoWeAre.companyInfo}
        </p>
      </div>
    </section>
  )
}
