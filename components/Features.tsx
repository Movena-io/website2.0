'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import Image from 'next/image'
import { useState } from 'react'
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

// ─── ScreenshotFrame: stylized browser-chrome wrapper around a PNG ────────────

function ScreenshotFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full rounded-xl border border-slate-200 shadow-xl shadow-slate-300/30 overflow-hidden bg-white">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border-b border-slate-200">
        <span className="h-2 w-2 rounded-full bg-slate-300" />
        <span className="h-2 w-2 rounded-full bg-slate-300" />
        <span className="h-2 w-2 rounded-full bg-slate-300" />
      </div>
      <Image
        src={src}
        alt={alt}
        width={2880}
        height={1700}
        className="w-full h-auto block"
        priority={false}
      />
    </div>
  )
}

// ─── MultiViewMockup: sub-tab strip below the screenshot ──────────────────────

type View = { key: string; label: string; src: string; alt: string }

function MultiViewMockup({ views }: { views: View[] }) {
  const [active, setActive] = useState(views[0].key)
  const current = views.find((v) => v.key === active) ?? views[0]
  return (
    <div className="flex flex-col gap-3">
      <ScreenshotFrame src={current.src} alt={current.alt} />
      <div className="flex items-center justify-center gap-1.5 flex-wrap">
        {views.map((v) => {
          const isActive = active === v.key
          return (
            <button
              key={v.key}
              onClick={() => setActive(v.key)}
              className={
                isActive
                  ? 'text-[12px] font-semibold rounded-lg px-3 py-1.5 bg-[#0B1F3B] text-white transition-colors'
                  : 'text-[12px] font-medium rounded-lg px-3 py-1.5 bg-white border border-[#E2E8F0] text-[#475569] hover:text-[#0B1F3B] hover:border-[#1D4ED8]/40 transition-colors'
              }
            >
              {v.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Per-tab mockup components (thin wrappers) ────────────────────────────────

function DashboardMockup() {
  return <ScreenshotFrame src="/assets/features/01-dashboard.png" alt="Movena dashboard with KPI strip, today's jobs, and needs-attention items" />
}

function QuotingMockup() {
  return <ScreenshotFrame src="/assets/features/02-quoting.png" alt="Pricing rules: price per m³, surcharges, transport, currency" />
}

function QuoteFormMockup() {
  return <ScreenshotFrame src="/assets/features/03-quote-form.png" alt="Public customer-facing quote form showing the price estimate step" />
}

function LeadsJobsMockup() {
  return (
    <MultiViewMockup
      views={[
        { key: 'leads', label: 'Leads',       src: '/assets/features/04-leads-jobs--leads-list.png',  alt: 'Leads pipeline list view' },
        { key: 'lead',  label: 'Lead detail', src: '/assets/features/04-leads-jobs--lead-detail.png', alt: 'Lead detail with quote history and addresses' },
        { key: 'jobs',  label: 'Jobs',        src: '/assets/features/04-leads-jobs--jobs-list.png',   alt: 'Jobs list with status, contact, route, value' },
        { key: 'job',   label: 'Job detail',  src: '/assets/features/04-leads-jobs--job-detail.png',  alt: 'Job detail with route map, people, schedule, addresses' },
      ]}
    />
  )
}

function CalendarCrewMockup() {
  return (
    <MultiViewMockup
      views={[
        { key: 'calendar', label: 'Calendar', src: '/assets/features/05-calendar-crew--calendar.png', alt: 'Calendar week view with scheduled jobs' },
        { key: 'crew',     label: 'Crew',     src: '/assets/features/05-calendar-crew--crew.png',     alt: 'Crew member directory with detail panel: role, hourly rate, competencies' },
      ]}
    />
  )
}

function OperationsMockup() {
  return (
    <MultiViewMockup
      views={[
        { key: 'storage',   label: 'Storage',   src: '/assets/features/06-operations--storage.png',   alt: 'Storage units with occupancy, MRR, and contract management' },
        { key: 'inventory', label: 'Inventory', src: '/assets/features/06-operations--inventory.png', alt: 'Inventory catalog with stock movements and rental tracking' },
      ]}
    />
  )
}

function AutomationsMockup() {
  return <ScreenshotFrame src="/assets/features/07-automations.png" alt="Automation flows editor with triggers, timing, channel, and email template" />
}

// ─── Features section ────────────────────────────────────────────────────────

const tabIconComponents = [LayoutDashboard, FileText, Wand2, Briefcase, CalendarDays, Package, Zap]

const tabValues = ['dashboard', 'quoting', 'quote-form', 'leads-jobs', 'calendar', 'operations', 'automations']

const tabMockupComponents = [
  DashboardMockup,
  QuotingMockup,
  QuoteFormMockup,
  LeadsJobsMockup,
  CalendarCrewMockup,
  OperationsMockup,
  AutomationsMockup,
]

export default function Features() {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)

  const tabs = t.features.tabs.map((tab, i) => {
    const Icon = tabIconComponents[i]
    const Mockup = tabMockupComponents[i]
    return {
      value: tabValues[i],
      icon: <Icon className="h-4 w-4 shrink-0" />,
      mockup: <Mockup />,
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

            {/* Desktop: vertical tabs left + content right */}
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

              {/* Right: content panel */}
              <div className="flex-1 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] overflow-hidden">
                {tabs.map((tab) => (
                  <TabsPrimitive.Content
                    key={tab.value}
                    value={tab.value}
                    className="focus:outline-none p-6 lg:p-10"
                  >
                    <div className="flex flex-col gap-6 lg:flex-row lg:gap-10 lg:items-start">

                      {/* Text */}
                      <div className="flex flex-col gap-4 min-w-0 lg:w-[38%] lg:shrink-0">
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

                      {/* Mockup */}
                      <div className="lg:flex-1 min-w-0">
                        {tab.mockup}
                      </div>

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
