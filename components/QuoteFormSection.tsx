'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/lib/LanguageContext'

export default function QuoteFormSection() {
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
    <section ref={sectionRef} className="bg-[#F8FAFC] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal max-w-2xl mb-10">
          <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-semibold tracking-[-0.02em] text-[#0B1F3B] leading-[1.2] mb-5">
            {t.quoteForm.headline}
          </h2>
          <p className="text-[16px] sm:text-[17px] text-[#475569] leading-[1.7]">
            {t.quoteForm.text}
          </p>
        </div>

        <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {t.quoteForm.fields.map((field) => (
            <div
              key={field.title}
              className="bg-white border border-[#E2E8F0] rounded-xl p-5"
            >
              <h3 className="text-[15px] font-semibold text-[#0B1F3B] mb-1">{field.title}</h3>
              <p className="text-[13px] text-[#475569] leading-[1.5]">{field.desc}</p>
            </div>
          ))}
        </div>

        <p className="reveal text-[14px] text-[#64748B] leading-[1.6]">
          {t.quoteForm.closingLine}
        </p>
      </div>
    </section>
  )
}
