'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { useLanguage } from '@/lib/LanguageContext'
import {
  CalendarDays,
  Users,
  CreditCard,
  MapPin,
  Clock,
  CheckCircle,
  ChevronRight,
  Truck,
  FileText,
  LayoutDashboard,
} from 'lucide-react'

// ─── Platform mockups ────────────────────────────────────────────────

function QuotesMockup() {
  return (
    <div className="w-full bg-white rounded-2xl border border-[#E2E8F0] shadow-lg overflow-hidden">
      <div className="bg-[#0B1F3B] px-5 py-3 flex items-center gap-3">
        <div className="w-6 h-6 rounded-lg bg-[#1D4ED8] flex items-center justify-center shrink-0">
          <Truck size={12} strokeWidth={1.5} className="text-white" />
        </div>
        <span className="text-[12px] font-bold text-white">Movena</span>
        <span className="ml-auto text-[11px] text-white/40">Quotes</span>
      </div>
      <div className="p-5 flex flex-col gap-3 bg-[#F8FAFC]">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[13px] font-bold text-[#0F172A]">New quote</span>
          <span className="text-[11px] font-medium text-[#475569]">Auto-calculated</span>
        </div>
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-[#475569] mb-1">Customer</p>
              <div className="h-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 flex items-center">
                <span className="text-[12px] text-[#0F172A]">Larsen Familie</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-[#475569] mb-1">Move type</p>
              <div className="h-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 flex items-center">
                <span className="text-[12px] text-[#0F172A]">3-bedroom</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-[#475569] mb-1">From</p>
              <div className="h-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 flex items-center gap-1.5">
                <MapPin size={10} strokeWidth={1.5} className="text-[#1D4ED8]" />
                <span className="text-[11px] text-[#475569]">Vesterbrogade 48</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-[#475569] mb-1">To</p>
              <div className="h-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-3 flex items-center gap-1.5">
                <MapPin size={10} strokeWidth={1.5} className="text-[#16A34A]" />
                <span className="text-[11px] text-[#475569]">Nørrebrogade 22</span>
              </div>
            </div>
          </div>
          <div className="border-t border-[#F1F5F9] pt-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-medium text-[#475569]">Total incl. VAT</p>
              <p className="text-[20px] font-extrabold text-[#0B1F3B] tracking-[-0.02em]">5.200 kr</p>
            </div>
            <button className="flex items-center gap-1.5 bg-[#1D4ED8] text-white text-[11px] font-semibold px-4 py-2 rounded-lg">
              Send quote <ChevronRight size={10} strokeWidth={2.5} />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-[#16A34A]/10 rounded-lg px-3 py-2">
          <CheckCircle size={12} strokeWidth={1.5} className="text-[#16A34A]" />
          <span className="text-[11px] font-medium text-[#16A34A]">Quote sent — awaiting customer signature</span>
        </div>
      </div>
    </div>
  )
}

function ScheduleMockup() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  const jobs = [
    { day: 0, title: 'Larsen Familie', time: '08:00', crew: 'Team A', color: 'bg-[#1D4ED8]/10 border-[#1D4ED8]/30 text-[#1D4ED8]' },
    { day: 1, title: 'Hansen ApS', time: '07:00', crew: 'Team B', color: 'bg-[#16A34A]/10 border-[#16A34A]/30 text-[#16A34A]' },
    { day: 2, title: 'Magnusson', time: '09:00', crew: 'Team A', color: 'bg-[#F97316]/10 border-[#F97316]/30 text-[#EA580C]' },
    { day: 3, title: 'Berg Family', time: '08:30', crew: 'Team C', color: 'bg-[#1D4ED8]/10 border-[#1D4ED8]/30 text-[#1D4ED8]' },
    { day: 4, title: 'Nielsen Move', time: '10:00', crew: 'Team B', color: 'bg-[#16A34A]/10 border-[#16A34A]/30 text-[#16A34A]' },
  ]
  return (
    <div className="w-full bg-white rounded-2xl border border-[#E2E8F0] shadow-lg overflow-hidden">
      <div className="bg-[#0B1F3B] px-5 py-3 flex items-center gap-3">
        <CalendarDays size={14} strokeWidth={1.5} className="text-[#60A5FA]" />
        <span className="text-[12px] font-bold text-white">Schedule — Week 15</span>
        <span className="ml-auto text-[11px] text-white/40">5 jobs booked</span>
      </div>
      <div className="p-4 bg-[#F8FAFC]">
        <div className="grid grid-cols-5 gap-2">
          {days.map((day, i) => (
            <div key={day}>
              <p className="text-[11px] font-semibold text-[#475569] text-center mb-2">{day}</p>
              {jobs.filter(j => j.day === i).map(job => (
                <div key={job.title} className={`rounded-lg border p-2 ${job.color}`}>
                  <p className="text-[10px] font-bold truncate">{job.title}</p>
                  <p className="text-[9px] font-medium mt-0.5 opacity-70">{job.time}</p>
                  <p className="text-[9px] font-medium mt-0.5 opacity-70">{job.crew}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-3 bg-white rounded-lg border border-[#E2E8F0] px-3 py-2">
          <Clock size={11} strokeWidth={1.5} className="text-[#475569]" />
          <span className="text-[11px] text-[#475569]">No conflicts detected this week</span>
          <CheckCircle size={11} strokeWidth={1.5} className="text-[#16A34A] ml-auto" />
        </div>
      </div>
    </div>
  )
}

function CrmMockup() {
  const leads = [
    { name: 'Larsen Familie',    from: 'Vesterbro',  to: 'Nørrebro',  date: '14. apr', price: '8.200 kr',  status: 'Ny',           statusClass: 'bg-blue-100 text-blue-700 border-blue-200' },
    { name: 'Schmidt Transport', from: 'Valby',       to: 'Taastrup',  date: '16. apr', price: '14.400 kr', status: 'Tilbud sendt', statusClass: 'bg-orange-100 text-orange-700 border-orange-200' },
    { name: 'Hansen Bolig',      from: 'Roskilde',    to: 'Høje-T.',   date: '18. apr', price: '6.750 kr',  status: 'Planlagt',     statusClass: 'bg-purple-100 text-purple-700 border-purple-200' },
    { name: 'Nielsen Erhverv',   from: 'Aarhus C',    to: 'Kbh. K',   date: '22. apr', price: '12.300 kr', status: 'Accepteret',   statusClass: 'bg-green-100 text-green-700 border-green-200' },
  ]
  const filters = ['Alle', 'Ny', 'Tilbud sendt', 'Planlagt']
  return (
    <div className="w-full bg-white rounded-2xl border border-[#E2E8F0] shadow-lg overflow-hidden">
      <div className="bg-[#0B1F3B] px-5 py-3 flex items-center gap-3">
        <Users size={14} strokeWidth={1.5} className="text-[#60A5FA]" />
        <span className="text-[12px] font-bold text-white">CRM — Leads</span>
        <span className="ml-auto text-[11px] text-white/40">24 leads this month</span>
      </div>
      <div className="bg-[#F8FAFC]">
        {/* Filter tabs */}
        <div className="flex items-center gap-1 px-4 pt-3 pb-2 border-b border-[#E2E8F0]">
          {filters.map((f, i) => (
            <span key={f} className={`text-[10px] font-semibold px-2.5 py-1 rounded-md ${i === 0 ? 'bg-[#0B1F3B] text-white' : 'text-[#475569] hover:bg-white'}`}>{f}</span>
          ))}
        </div>
        {/* Table header */}
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-3 px-4 py-1.5 border-b border-[#E2E8F0]">
          {['Lead', 'Dato', 'Pris', 'Status'].map(h => (
            <span key={h} className="text-[9px] font-semibold uppercase tracking-wide text-[#94A3B8]">{h}</span>
          ))}
        </div>
        {/* Rows */}
        <div className="flex flex-col divide-y divide-[#F1F5F9]">
          {leads.map(({ name, from, to, date, price, status, statusClass }) => (
            <div key={name} className="grid grid-cols-[1fr_auto_auto_auto] gap-x-3 items-center px-4 py-2.5 bg-white hover:bg-[#F8FAFC]">
              <div>
                <p className="text-[11px] font-semibold text-[#0F172A]">{name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={8} strokeWidth={1.5} className="text-[#94A3B8]" />
                  <span className="text-[9px] text-[#94A3B8]">{from} → {to}</span>
                </div>
              </div>
              <span className="text-[10px] text-[#475569] whitespace-nowrap">{date}</span>
              <span className="text-[10px] font-semibold text-[#0F172A] whitespace-nowrap">{price}</span>
              <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border whitespace-nowrap ${statusClass}`}>{status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function InvoiceMockup() {
  return (
    <div className="w-full bg-white rounded-2xl border border-[#E2E8F0] shadow-lg overflow-hidden">
      <div className="bg-[#0B1F3B] px-5 py-3 flex items-center gap-3">
        <CreditCard size={14} strokeWidth={1.5} className="text-[#60A5FA]" />
        <span className="text-[12px] font-bold text-white">Invoice #1047</span>
        <span className="ml-auto text-[11px] bg-[#16A34A]/20 text-[#16A34A] font-semibold px-2 py-0.5 rounded">Paid</span>
      </div>
      <div className="p-5 bg-[#F8FAFC]">
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold text-[#475569] uppercase tracking-wide">Billed to</p>
              <p className="text-[14px] font-bold text-[#0F172A] mt-1">Hansen ApS</p>
              <p className="text-[11px] text-[#475569]">Office relocation · 16 Apr</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-semibold text-[#475569] uppercase tracking-wide">Total</p>
              <p className="text-[22px] font-extrabold text-[#0B1F3B] tracking-[-0.02em] mt-1">12.800 kr</p>
            </div>
          </div>
          <div className="border-t border-[#F1F5F9] pt-4 flex flex-col gap-2">
            {[
              { label: 'Moving service (6h)', amount: '9.600 kr' },
              { label: 'Packing materials', amount: '1.200 kr' },
              { label: 'VAT (25%)', amount: '2.000 kr' },
            ].map(({ label, amount }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-[11px] text-[#475569]">{label}</span>
                <span className="text-[11px] font-semibold text-[#0F172A]">{amount}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 bg-[#16A34A]/10 rounded-lg px-3 py-2">
            <CheckCircle size={12} strokeWidth={1.5} className="text-[#16A34A]" />
            <span className="text-[11px] font-semibold text-[#16A34A]">Payment received via MobilePay</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function TasksMockup() {
  const cols = [
    {
      name: 'Nye opgaver', stripe: 'bg-blue-600', badge: 'bg-blue-50 text-blue-700',
      cards: [
        { title: 'Bestil emballagematerialer til maj', cat: 'Admin', catClass: 'bg-slate-100 text-slate-600', initials: 'LP', deadline: '15. apr', priority: 'høj' },
        { title: 'Kontakt Carlsberg vedr. storflytning', cat: 'Kunde', catClass: 'bg-purple-50 text-purple-700', initials: 'SA', deadline: '10. apr', priority: 'høj' },
      ],
    },
    {
      name: 'I gang', stripe: 'bg-orange-500', badge: 'bg-orange-50 text-orange-700',
      cards: [
        { title: 'Jepsen flytning — pakkedag', cat: 'Flytning', catClass: 'bg-blue-50 text-blue-700', initials: 'TN', deadline: '5. apr', priority: 'høj' },
        { title: 'Servicetjek på Mercedes Sprinter', cat: 'Admin', catClass: 'bg-slate-100 text-slate-600', initials: 'HV', deadline: '12. apr', priority: 'lav' },
      ],
    },
    {
      name: 'Færdig', stripe: 'bg-green-500', badge: 'bg-green-50 text-green-700',
      cards: [
        { title: 'Nilsson flytning — afsluttet', cat: 'Flytning', catClass: 'bg-blue-50 text-blue-700', initials: 'LP', deadline: '25. mar', priority: 'lav' },
      ],
    },
  ]
  return (
    <div className="w-full bg-white rounded-2xl border border-[#E2E8F0] shadow-lg overflow-hidden">
      <div className="bg-[#0B1F3B] px-5 py-3 flex items-center gap-3">
        <LayoutDashboard size={14} strokeWidth={1.5} className="text-[#60A5FA]" />
        <span className="text-[12px] font-bold text-white">Opgaver</span>
        <span className="ml-auto text-[11px] text-white/40">10 active tasks</span>
      </div>
      <div className="p-3 bg-[#F8FAFC]">
        <div className="grid grid-cols-3 gap-2">
          {cols.map((col) => (
            <div key={col.name} className="flex flex-col gap-2">
              {/* Column header */}
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${col.stripe}`} />
                <span className="text-[10px] font-bold text-[#0F172A] truncate">{col.name}</span>
              </div>
              {/* Cards */}
              {col.cards.map((card) => (
                <div key={card.title} className="bg-white rounded-lg border border-[#E2E8F0] p-2 flex flex-col gap-1.5 shadow-sm">
                  <p className="text-[9px] font-semibold text-[#0F172A] leading-[1.3] line-clamp-2">{card.title}</p>
                  <span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded w-fit ${card.catClass}`}>{card.cat}</span>
                  <div className="flex items-center justify-between mt-0.5">
                    <div className="w-4 h-4 rounded-full bg-[#E2E8F0] flex items-center justify-center">
                      <span className="text-[7px] font-bold text-[#475569]">{card.initials}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <CalendarDays size={7} strokeWidth={1.5} className="text-[#94A3B8]" />
                      <span className="text-[8px] text-[#94A3B8]">{card.deadline}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Features section ────────────────────────────────────────────────

const tabIconComponents = [FileText, CalendarDays, Users, CreditCard, LayoutDashboard]

const tabValues = ['quotes', 'scheduling', 'crm', 'invoicing', 'tasks']

const tabMockupComponents = [QuotesMockup, ScheduleMockup, CrmMockup, InvoiceMockup, TasksMockup]

export default function Features() {
  const { t } = useLanguage()

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

  return (
    <section id="features" className="bg-white border-t border-[#E2E8F0] py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center mb-10">
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#1D4ED8]/30" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1D4ED8]">{t.features.label}</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#1D4ED8]/30" />
          </div>
          <h2 className="max-w-2xl text-[36px] lg:text-[44px] font-bold tracking-[-0.02em] text-[#0B1F3B] leading-[1.2]">
            {t.features.headline} <span className="text-[#F97316]">{t.features.highlight}</span>{t.features.headlineEnd}
          </h2>
          <p className="text-[18px] text-[#475569] max-w-[480px] leading-[1.7]">
            {t.features.subheadline}
          </p>
        </div>

        {/* Tabs */}
        <TabsPrimitive.Root defaultValue={tabs[0].value}>
          {/* Tab triggers */}
          <TabsPrimitive.List className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {tabs.map((tab) => (
              <TabsPrimitive.Trigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-[#64748B] border border-transparent transition-all
                  data-[state=active]:bg-[#0B1F3B] data-[state=active]:text-white data-[state=active]:border-[#0B1F3B]
                  data-[state=inactive]:hover:bg-[#F1F5F9] data-[state=inactive]:hover:text-[#0F172A]"
              >
                {tab.icon}
                {tab.label}
              </TabsPrimitive.Trigger>
            ))}
          </TabsPrimitive.List>

          {/* Tab content panel */}
          <div className="mt-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-6 lg:p-12">
            {tabs.map((tab) => (
              <TabsPrimitive.Content
                key={tab.value}
                value={tab.value}
                className="grid place-items-center gap-12 lg:grid-cols-2 lg:gap-16
                  data-[state=inactive]:hidden"
              >
                {/* Text */}
                <div className="flex flex-col gap-4">
                  <span className="inline-block text-[12px] font-semibold text-[#1D4ED8] bg-white border border-[#1D4ED8]/20 uppercase tracking-[0.08em] px-3 py-1 rounded-full w-fit">
                    {tab.badge}
                  </span>
                  <h3 className="text-[28px] lg:text-[36px] font-bold tracking-[-0.02em] text-[#0B1F3B] leading-[1.2]">
                    {tab.title}
                  </h3>
                  <p className="text-[16px] text-[#475569] leading-[1.75]">
                    {tab.description}
                  </p>
                  <ul className="flex flex-col gap-3 mt-2">
                    {tab.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <CheckCircle size={16} strokeWidth={1.5} className="text-[#1D4ED8] mt-0.5 shrink-0" />
                        <span className="text-[15px] font-medium text-[#0F172A]">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mockup */}
                <div className="w-full">
                  {tab.mockup}
                </div>
              </TabsPrimitive.Content>
            ))}
          </div>
        </TabsPrimitive.Root>

      </div>
    </section>
  )
}
