'use client'

import { PhoneCall, Wrench, Rocket } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

const stepIcons = [PhoneCall, Wrench, Rocket]

export default function Setup() {
  const { t } = useLanguage()

  return (
    <section id="setup" className="bg-[#F8FAFC] scroll-mt-24 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center mb-12">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1D4ED8]">
            {t.setup.label}
          </span>
          <h2 className="max-w-2xl text-[28px] sm:text-[34px] lg:text-[38px] font-semibold tracking-[-0.02em] text-[#0B1F3B] leading-[1.2]">
            {t.setup.headline} <span className="text-[#29ABE2]">{t.setup.highlight}</span>
          </h2>
          <p className="text-[15px] text-[#475569] max-w-[560px] leading-[1.7]">
            {t.setup.subheadline}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.setup.steps.map((step, i) => {
            const Icon = stepIcons[i]
            return (
              <article
                key={step.title}
                className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-7 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1D4ED8]/10">
                    <Icon size={18} strokeWidth={1.75} className="text-[#1D4ED8]" />
                  </div>
                  <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#94A3B8]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-[#0B1F3B] leading-[1.3] mb-2">
                  {step.title}
                </h3>
                <p className="text-[14px] text-[#475569] leading-[1.6]">
                  {step.description}
                </p>
              </article>
            )
          })}
        </div>

      </div>
    </section>
  )
}
