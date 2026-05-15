'use client'

import {
  CalendarDays,
  Briefcase,
  CheckCircle,
  FileText,
  LayoutDashboard,
  Wand2,
  Package,
  Zap,
} from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

// Order must match t.features.tabs[]:
// Dashboard, Quoting, Quote form, Leads & jobs, Calendar & crew, Operations, Automations
const tabIconComponents = [LayoutDashboard, FileText, Wand2, Briefcase, CalendarDays, Package, Zap]

export default function Features() {
  const { t } = useLanguage()

  return (
    <section id="features" className="bg-white scroll-mt-24 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center mb-10">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1D4ED8] mb-1">{t.features.label}</span>
          <h2 className="max-w-2xl text-[28px] sm:text-[34px] lg:text-[38px] font-semibold tracking-[-0.02em] text-[#0B1F3B] leading-[1.2]">
            {t.features.headline} <span className="text-[#29ABE2]">{t.features.highlight}</span>{t.features.headlineEnd}
          </h2>
          <p className="text-[15px] text-[#475569] max-w-[480px] leading-[1.7]">
            {t.features.subheadline}
          </p>
        </div>

        {/* Grid of 7 module cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {t.features.tabs.map((tab, i) => {
            const Icon = tabIconComponents[i]
            return (
              <article
                key={tab.label}
                className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm hover:shadow-md hover:border-[#1D4ED8]/20 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1D4ED8]/10">
                    <Icon size={18} strokeWidth={1.5} className="text-[#1D4ED8]" />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1D4ED8]">
                    {tab.badge}
                  </span>
                </div>
                <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-[#0B1F3B] leading-[1.3] mb-2">
                  {tab.title}
                </h3>
                <p className="text-[14px] text-[#475569] leading-[1.6] mb-4">
                  {tab.description}
                </p>
                <ul className="flex flex-col gap-2 mt-auto">
                  {tab.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <CheckCircle size={14} strokeWidth={1.5} className="text-[#1D4ED8] mt-0.5 shrink-0" />
                      <span className="text-[13px] text-[#475569] leading-[1.45]">{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>

        {/* And more */}
        <p className="mt-10 text-center text-[13px] text-[#94A3B8] max-w-2xl mx-auto">
          {t.features.andMore}
        </p>

      </div>
    </section>
  )
}
