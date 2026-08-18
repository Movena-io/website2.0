'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

export default function RestOfSystem() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
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
    <section ref={sectionRef} className="bg-white py-14 md:py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="reveal text-[24px] sm:text-[30px] font-semibold tracking-[-0.02em] text-[#0B1F3B] leading-[1.2] text-center mb-10">
          {t.restOfSystem.headline}
        </h2>

        <div className="reveal grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {t.restOfSystem.moduleList.map((mod, i) => {
            const isOpen = openIndex === i
            return (
              <button
                key={mod.title}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className={`text-left rounded-xl border p-4 transition-colors duration-200 ${
                  isOpen
                    ? 'border-[#60A5FA]/40 bg-[#F0F7FF]'
                    : 'border-[#E2E8F0] bg-white hover:border-[#60A5FA]/30'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-[14px] font-semibold text-[#0B1F3B]">{mod.title}</h3>
                  <ChevronDown
                    size={14}
                    strokeWidth={1.5}
                    className={`text-[#94A3B8] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </div>
                {isOpen && (
                  <p className="mt-2 text-[13px] text-[#475569] leading-[1.5]">
                    {mod.desc}
                  </p>
                )}
              </button>
            )
          })}
        </div>

        <p className="reveal mt-6 text-center text-[13px] text-[#94A3B8]">
          {t.restOfSystem.integrationNote}
        </p>
      </div>
    </section>
  )
}
