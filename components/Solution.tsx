'use client'

import { useEffect, useRef } from 'react'
import { FileText, CalendarDays, Users, LayoutDashboard, Mail } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

const icons = [FileText, CalendarDays, Users, Mail, LayoutDashboard]

export default function Solution() {
  const { t } = useLanguage()
  const headerRef = useRef<HTMLDivElement>(null)
  const capRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.15 }
    )
    ;[headerRef.current, capRef.current].forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-[#F8FAFC] py-20 border-t border-b border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-6">

        <div ref={headerRef} className="reveal text-center max-w-[640px] mx-auto mb-14">
          <span className="inline-block text-[12px] font-semibold text-[#1D4ED8] bg-[#1D4ED8]/10 uppercase tracking-[0.08em] px-3 py-1 rounded-full mb-4">
            {t.solution.badge}
          </span>
          <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-semibold tracking-[-0.02em] text-[#0B1F3B] leading-[1.2]" style={{ textWrap: 'balance' } as React.CSSProperties}>
            {t.solution.headline}
          </h2>
          <p className="mt-4 text-[18px] font-normal text-[#475569] leading-[1.7]">
            {t.solution.subheadline}
          </p>
        </div>

        <div
          ref={capRef}
          className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
        >
          {t.solution.capabilities.map(({ label, desc }, i) => {
            const Icon = icons[i]
            return (
              <div
                key={label}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-5 flex flex-col gap-3 hover:shadow-md hover:border-[#1D4ED8]/20 transition-all duration-200"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="w-9 h-9 rounded-xl bg-[#1D4ED8]/10 flex items-center justify-center">
                  <Icon size={16} strokeWidth={1.5} className="text-[#1D4ED8]" />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#0B1F3B]">{label}</p>
                  <p className="text-[12px] font-normal text-[#475569] mt-0.5 leading-[1.5]">{desc}</p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
