'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
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
import { useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'

// Order must match t.features.tabs[]:
// Dashboard, Quoting, Quote form, Leads & jobs, Calendar & crew, Operations, Automations
const tabIconComponents = [LayoutDashboard, FileText, Wand2, Briefcase, CalendarDays, Package, Zap]

const tabValues = ['dashboard', 'quoting', 'quote-form', 'leads-jobs', 'calendar', 'operations', 'automations']

export default function Features() {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)

  const tabs = t.features.tabs.map((tab, i) => {
    const Icon = tabIconComponents[i]
    return {
      value: tabValues[i],
      icon: <Icon className="h-4 w-4 shrink-0" />,
      ...tab,
    }
  })

  const activeTab = tabValues[activeIndex]

  return (
    <section id="features" className="bg-white scroll-mt-24 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 w-full">

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

        {/* Tabs */}
        <TabsPrimitive.Root
          value={activeTab}
          onValueChange={(val) => {
            const i = tabValues.indexOf(val)
            if (i !== -1) setActiveIndex(i)
          }}
        >
          {/* Mobile: horizontal scrolling tab list */}
          <TabsPrimitive.List className="md:hidden flex overflow-x-auto pb-1 -mx-2 px-2 gap-2 no-scrollbar">
            {tabs.map((tab) => (
              <TabsPrimitive.Trigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-[#64748B] border border-transparent transition-all whitespace-nowrap shrink-0
                  data-[state=active]:bg-[#0B1F3B] data-[state=active]:text-white data-[state=active]:border-[#0B1F3B]
                  data-[state=inactive]:hover:bg-[#F1F5F9] data-[state=inactive]:hover:text-[#0F172A]"
              >
                {tab.icon}
                {tab.label}
              </TabsPrimitive.Trigger>
            ))}
          </TabsPrimitive.List>

          {/* Desktop: vertical tabs left + text content right */}
          <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-4 md:gap-6">

            {/* Left: vertical tab list (desktop only) */}
            <TabsPrimitive.List className="hidden md:flex flex-col gap-1 shrink-0 w-48">
              {tabs.map((tab) => (
                <TabsPrimitive.Trigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-[13px] font-semibold text-[#64748B] border border-transparent transition-all text-left w-full
                    data-[state=active]:bg-[#0B1F3B] data-[state=active]:text-white data-[state=active]:border-[#0B1F3B]
                    data-[state=inactive]:hover:bg-[#F1F5F9] data-[state=inactive]:hover:text-[#0F172A]"
                >
                  {tab.icon}
                  {tab.label}
                </TabsPrimitive.Trigger>
              ))}
            </TabsPrimitive.List>

            {/* Right: text-only content panel */}
            <div className="flex-1 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              {tabs.map((tab) => (
                <TabsPrimitive.Content
                  key={tab.value}
                  value={tab.value}
                  className="focus:outline-none p-6 lg:p-10"
                >
                  <div className="max-w-[640px] flex flex-col gap-4">
                    <span className="inline-block text-[12px] font-semibold text-[#1D4ED8] bg-white border border-[#1D4ED8]/20 uppercase tracking-[0.08em] px-3 py-1 rounded-full w-fit">
                      {tab.badge}
                    </span>
                    <h3 className="text-[22px] lg:text-[28px] font-semibold tracking-[-0.02em] text-[#0B1F3B] leading-[1.2]">
                      {tab.title}
                    </h3>
                    <p className="text-[15px] text-[#475569] leading-[1.7]">
                      {tab.description}
                    </p>
                    <ul className="flex flex-col gap-2.5 mt-1">
                      {tab.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <CheckCircle size={15} strokeWidth={1.5} className="text-[#1D4ED8] mt-0.5 shrink-0" />
                          <span className="text-[14px] font-medium text-[#0F172A] break-words min-w-0">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsPrimitive.Content>
              ))}
            </div>
          </div>

          {/* And more */}
          <p className="mt-6 text-center text-[13px] text-[#94A3B8]">
            {t.features.andMore}
          </p>
        </TabsPrimitive.Root>

      </div>
    </section>
  )
}
