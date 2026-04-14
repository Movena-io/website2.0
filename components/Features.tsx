'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { useLanguage } from '@/lib/LanguageContext'
import {
  CalendarDays,
  Users,
  CheckCircle,
  FileText,
  LayoutDashboard,
  Wand2,
  Package,
  Mail,
} from 'lucide-react'

// ─── Shared helpers ───────────────────────────────────────────────────────────

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      {children}
    </div>
  )
}

function PageHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100">
      <h2 className="text-[13px] font-semibold text-slate-900">{title}</h2>
      {action}
    </div>
  )
}

function FilterChips({ items }: { items: string[] }) {
  return (
    <div className="flex items-center gap-1 px-5 py-2 border-b border-gray-100">
      {items.map((f, i) => (
        <span key={f} className={`text-[9px] font-semibold px-2.5 py-1 rounded-lg ${i === 0 ? 'bg-slate-900 text-white' : 'text-slate-500'}`}>{f}</span>
      ))}
    </div>
  )
}

// ─── Dashboard mockup ─────────────────────────────────────────────────────────

function DashboardMockup() {
  const jobs = [
    { time: '08:00', title: 'Larsen Family',     route: 'Westside → Northgate',  status: 'Active',    active: true  },
    { time: '12:00', title: 'Schmidt Transport', route: 'Valby → Taastrup',      status: 'Scheduled', active: false },
    { time: '15:00', title: 'Hansen Residence',  route: 'Roskilde → Høje-T.',    status: 'Scheduled', active: false },
  ]
  return (
    <Card>
      <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100">
        <h2 className="text-[13px] font-semibold text-slate-900">Good morning, Samuel</h2>
        <span className="text-[10px]" style={{ color: '#6E6E73' }}>Today</span>
      </div>
      {/* Metrics */}
      <div className="grid grid-cols-4 gap-1.5 px-4 py-3 border-b border-gray-100">
        {[
          { label: 'Active leads',   value: '12', sub: 'in pipeline', color: undefined    },
          { label: 'Jobs today',     value: '3',  sub: '1 active',    color: '#2563EB'    },
          { label: 'Jobs this week', value: '11', sub: 'scheduled',   color: undefined    },
          { label: 'Quotes pending', value: '5',  sub: 'unanswered',  color: '#FF9500'    },
        ].map(c => (
          <div key={c.label} className="rounded-lg bg-gray-50 px-2 py-1.5">
            <p className="text-[7px] font-medium uppercase tracking-wide leading-tight" style={{ color: '#AEAEB2' }}>{c.label}</p>
            <p className="text-[16px] font-semibold leading-none mt-1" style={{ color: c.color ?? '#1D1D1F' }}>{c.value}</p>
            <p className="text-[7px] mt-0.5" style={{ color: '#AEAEB2' }}>{c.sub}</p>
          </div>
        ))}
      </div>
      {/* Today */}
      <div className="px-5 py-3">
        <p className="text-[10px] font-semibold mb-2" style={{ color: '#1D1D1F' }}>Today</p>
        {jobs.map((job, idx) => (
          <div key={job.title} className="flex gap-2.5 mb-2 last:mb-0">
            <div className="w-8 shrink-0 pt-0.5 text-right">
              <span className="text-[8px]" style={{ color: '#6E6E73' }}>{job.time}</span>
            </div>
            <div className="relative flex w-2.5 flex-col items-center">
              <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${job.active ? 'bg-green-500' : 'bg-[#2563EB]'}`} />
              {idx < jobs.length - 1 && <div className="mt-0.5 w-px flex-1 bg-gray-200" />}
            </div>
            <div className={`flex-1 rounded-lg border-l-[2px] ${job.active ? 'border-green-500' : 'border-[#2563EB]'} bg-gray-50 px-2 py-1.5`}>
              <div className="flex items-start justify-between gap-1">
                <div className="min-w-0">
                  <p className="text-[9px] font-medium truncate" style={{ color: '#1D1D1F' }}>{job.title}</p>
                  <p className="text-[8px] truncate" style={{ color: '#6E6E73' }}>{job.route}</p>
                </div>
                <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[7px] font-medium ${job.active ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>{job.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

// ─── Quotes mockup ─────────────────────────────────────────────────────────────

function QuotesMockup() {
  const rows = [
    { name: 'Larsen Family',     sub: 'lars@gmail.com',    route: 'Westside → Northgate', price: '€1,100',  sc: 'bg-orange-50 text-orange-700', status: 'Pending'  },
    { name: 'Schmidt Transport', sub: 'info@schmidt.dk',   route: 'Valby → Taastrup',     price: '€1,940',  sc: 'bg-blue-50 text-blue-700',     status: 'Draft'    },
    { name: 'Hansen Residence',  sub: 'h.bolig@mail.dk',   route: 'Roskilde → Høje-T.',   price: '€905',    sc: 'bg-green-50 text-green-700',   status: 'Accepted' },
    { name: 'Nielsen Business',  sub: 'n.erhverv@mail.dk', route: 'Aarhus → Copenhagen',  price: '€1,650',  sc: 'bg-orange-50 text-orange-700', status: 'Pending'  },
  ]
  return (
    <Card>
      <PageHeader
        title="Quotes"
        action={
          <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-[10px] font-semibold text-white">
            + New quote
          </button>
        }
      />
      <div className="grid grid-cols-[1fr_120px_90px_80px] items-center gap-x-3 border-b border-gray-100 px-5 py-2">
        {['Customer', 'Route', 'Price', 'Status'].map(h => (
          <span key={h} className="text-[8px] font-semibold uppercase tracking-wider" style={{ color: '#AEAEB2' }}>{h}</span>
        ))}
      </div>
      {rows.map(row => (
        <div key={row.name} className="grid grid-cols-[1fr_120px_90px_80px] items-center gap-x-3 border-b border-gray-100 last:border-0 px-5 py-2.5 hover:bg-slate-50">
          <div className="min-w-0">
            <p className="truncate text-[11px] font-medium text-slate-900">{row.name}</p>
            <p className="truncate text-[9px]" style={{ color: '#6E6E73' }}>{row.sub}</p>
          </div>
          <span className="truncate text-[9px]" style={{ color: '#6E6E73' }}>{row.route}</span>
          <span className="text-[10px] font-semibold tabular-nums text-slate-800">{row.price}</span>
          <span className={`w-fit rounded-full px-2 py-0.5 text-[9px] font-medium whitespace-nowrap ${row.sc}`}>{row.status}</span>
        </div>
      ))}
    </Card>
  )
}

// ─── Quote form mockup ────────────────────────────────────────────────────────

function QuoteFormMockup() {
  const steps = ['From / To', 'Date & Time', 'Inventory', 'Contact']
  return (
    <Card>
      <PageHeader
        title="Quote Form"
        action={
          <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[9px] font-semibold text-blue-700">Customized</span>
        }
      />
      {/* Step indicator */}
      <div className="flex items-center px-5 py-3 border-b border-gray-100">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center">
            <div className={`flex items-center gap-1.5 rounded-lg px-2 py-1 ${i === 0 ? 'bg-[#2563EB]' : ''}`}>
              <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[8px] font-bold ${i === 0 ? 'bg-white text-[#2563EB]' : 'bg-gray-100 text-slate-500'}`}>{i + 1}</span>
              <span className={`text-[9px] font-medium ${i === 0 ? 'text-white' : 'text-slate-400'}`}>{step}</span>
            </div>
            {i < steps.length - 1 && <span className="px-1 text-[11px] text-slate-300">›</span>}
          </div>
        ))}
      </div>
      {/* Form fields */}
      <div className="px-5 py-4 space-y-3">
        <div>
          <label className="block text-[9px] font-semibold uppercase tracking-wide mb-1" style={{ color: '#AEAEB2' }}>From address</label>
          <div className="rounded-lg border border-gray-200 px-3 py-2 bg-gray-50">
            <span className="text-[10px]" style={{ color: '#6E6E73' }}>14 Elm Street, Westside</span>
          </div>
        </div>
        <div>
          <label className="block text-[9px] font-semibold uppercase tracking-wide mb-1" style={{ color: '#AEAEB2' }}>To address</label>
          <div className="rounded-lg border border-gray-200 px-3 py-2">
            <span className="text-[10px] text-gray-300">45 Oak Avenue, Northgate...</span>
          </div>
        </div>
        <div className="flex justify-end">
          <button className="rounded-lg bg-[#2563EB] px-4 py-1.5 text-[10px] font-semibold text-white">
            Next →
          </button>
        </div>
      </div>
      {/* Branding footer */}
      <div className="border-t border-gray-100 px-5 py-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#2563EB]" />
          <span className="text-[9px] font-medium text-slate-600">#2563EB</span>
          <span className="text-[9px]" style={{ color: '#AEAEB2' }}>· Custom color</span>
        </div>
        <span className="text-[9px]" style={{ color: '#6E6E73' }}>Hansen Moving Co.</span>
      </div>
    </Card>
  )
}

// ─── Calendar mockup ───────────────────────────────────────────────────────────

function CalendarMockup() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  const jobs = [
    { day: 0, title: 'Larsen Family',   time: '08:00', color: 'bg-blue-50 border-blue-200 text-blue-800'       },
    { day: 0, title: 'Thomsen Private', time: '13:00', color: 'bg-blue-50 border-blue-200 text-blue-800'       },
    { day: 1, title: 'Hansen Ltd.',     time: '07:00', color: 'bg-green-50 border-green-200 text-green-800'    },
    { day: 2, title: 'Magnusson',       time: '09:00', color: 'bg-orange-50 border-orange-200 text-orange-800' },
    { day: 2, title: 'Berg Office',     time: '14:00', color: 'bg-purple-50 border-purple-200 text-purple-800' },
    { day: 3, title: 'Schmidt Trans.',  time: '08:30', color: 'bg-blue-50 border-blue-200 text-blue-800'       },
    { day: 4, title: 'Nielsen Move.',   time: '10:00', color: 'bg-green-50 border-green-200 text-green-800'    },
  ]
  return (
    <Card>
      <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100">
        <h2 className="text-[13px] font-semibold text-slate-900">Calendar — Week 15</h2>
        <span className="text-[10px]" style={{ color: '#6E6E73' }}>7 jobs</span>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-5 gap-2">
          {days.map((day, i) => (
            <div key={day} className="flex flex-col gap-1.5">
              <p className="text-center text-[10px] font-semibold mb-0.5" style={{ color: '#AEAEB2' }}>{day}</p>
              {jobs.filter(j => j.day === i).map(job => (
                <div key={job.title + job.time} className={`rounded-lg border px-2 py-1.5 ${job.color}`}>
                  <p className="text-[9px] font-semibold leading-tight truncate">{job.title}</p>
                  <p className="text-[8px] opacity-70 mt-0.5">{job.time}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

// ─── CRM mockup ────────────────────────────────────────────────────────────────

function CrmMockup() {
  const leads = [
    { name: 'Larsen Family',     route: 'Westside → Northgate', date: 'Apr 14', price: '€1,100', status: 'New',         sc: 'bg-blue-50 text-blue-700'     },
    { name: 'Schmidt Transport', route: 'Valby → Taastrup',     date: 'Apr 16', price: '€1,940', status: 'Quote sent',  sc: 'bg-orange-50 text-orange-700' },
    { name: 'Hansen Residence',  route: 'Roskilde → Høje-T.',   date: 'Apr 18', price: '€905',   status: 'Scheduled',  sc: 'bg-purple-50 text-purple-700' },
    { name: 'Nielsen Business',  route: 'Aarhus → Copenhagen',  date: 'Apr 22', price: '€1,650', status: 'Accepted',   sc: 'bg-green-50 text-green-700'   },
  ]
  return (
    <Card>
      <div className="flex items-center px-5 pt-4 pb-3 border-b border-gray-100">
        <h2 className="text-[13px] font-semibold text-slate-900">Leads</h2>
        <span className="ml-auto text-[10px]" style={{ color: '#6E6E73' }}>24 this month</span>
      </div>
      <FilterChips items={['All', 'New', 'Quote sent', 'Scheduled']} />
      <div className="grid grid-cols-[1fr_64px_80px_80px] gap-x-3 items-center px-5 py-2 border-b border-gray-100">
        {['Lead', 'Date', 'Price', 'Status'].map(h => (
          <span key={h} className="text-[8px] font-semibold uppercase tracking-wider" style={{ color: '#AEAEB2' }}>{h}</span>
        ))}
      </div>
      {leads.map(({ name, route, date, price, status, sc }) => (
        <div key={name} className="grid grid-cols-[1fr_64px_80px_80px] gap-x-3 items-center px-5 py-2.5 border-b border-gray-100 last:border-0 hover:bg-slate-50">
          <div className="min-w-0">
            <p className="truncate text-[11px] font-medium text-slate-900">{name}</p>
            <p className="truncate text-[9px]" style={{ color: '#6E6E73' }}>{route}</p>
          </div>
          <span className="text-[9px] whitespace-nowrap" style={{ color: '#6E6E73' }}>{date}</span>
          <span className="text-[10px] font-semibold tabular-nums text-slate-800">{price}</span>
          <span className={`w-fit rounded-full px-2 py-0.5 text-[9px] font-medium whitespace-nowrap ${sc}`}>{status}</span>
        </div>
      ))}
    </Card>
  )
}

// ─── Storage mockup ────────────────────────────────────────────────────────────

function StorageMockup() {
  const items = [
    { name: 'Medium boxes',    unit: 'pcs',  paa_lager: 48, udlaant: 12, sc: 'bg-orange-50 text-orange-700', status: 'Low'      },
    { name: 'Large boxes',     unit: 'pcs',  paa_lager: 80, udlaant: 0,  sc: 'bg-green-50 text-green-700',   status: 'OK'       },
    { name: 'Bubble wrap',     unit: 'm',    paa_lager: 3,  udlaant: 5,  sc: 'bg-red-50 text-red-700',       status: 'Critical' },
    { name: 'Floor cover',     unit: 'pcs',  paa_lager: 28, udlaant: 4,  sc: 'bg-green-50 text-green-700',   status: 'OK'       },
    { name: 'Tape (24-pack)',  unit: 'pack', paa_lager: 15, udlaant: 0,  sc: 'bg-orange-50 text-orange-700', status: 'Low'      },
  ]
  return (
    <Card>
      <PageHeader
        title="Storage"
        action={
          <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-[10px] font-semibold text-white">
            + Add item
          </button>
        }
      />
      <FilterChips items={['Inventory', 'Transactions', 'Log']} />
      <div className="grid grid-cols-[1fr_60px_60px_80px] gap-x-3 items-center px-5 py-2 border-b border-gray-100">
        {['Item', 'In stock', 'On loan', 'Status'].map(h => (
          <span key={h} className="text-[8px] font-semibold uppercase tracking-wider" style={{ color: '#AEAEB2' }}>{h}</span>
        ))}
      </div>
      {items.map(item => (
        <div key={item.name} className="grid grid-cols-[1fr_60px_60px_80px] gap-x-3 items-center px-5 py-2.5 border-b border-gray-100 last:border-0 hover:bg-slate-50">
          <div className="min-w-0">
            <p className="truncate text-[11px] font-medium text-slate-900">{item.name}</p>
            <p className="text-[9px]" style={{ color: '#6E6E73' }}>{item.unit}</p>
          </div>
          <span className="text-[10px] font-semibold tabular-nums text-slate-800">{item.paa_lager}</span>
          <span className="text-[10px] tabular-nums" style={{ color: '#6E6E73' }}>{item.udlaant}</span>
          <span className={`w-fit rounded-full px-2 py-0.5 text-[9px] font-medium whitespace-nowrap ${item.sc}`}>{item.status}</span>
        </div>
      ))}
    </Card>
  )
}

// ─── Follow-ups mockup ─────────────────────────────────────────────────────────

function FollowUpsMockup() {
  const messages = [
    { name: 'Larsen Family',     type: 'Quote reminder',   scheduled: 'Today 14:00',    sc: 'bg-blue-50 text-blue-700',   status: 'Scheduled' },
    { name: 'Schmidt Transport', type: 'Job completed',    scheduled: 'Today 16:30',    sc: 'bg-green-50 text-green-700', status: 'Ready'     },
    { name: 'Hansen Residence',  type: 'No reply — nudge', scheduled: 'Tomorrow 10:00', sc: 'bg-blue-50 text-blue-700',   status: 'Scheduled' },
    { name: 'Nielsen Business',  type: 'Quote confirmed',  scheduled: 'Apr 15 09:00',   sc: 'bg-gray-100 text-gray-500',  status: 'Sent'      },
  ]
  return (
    <Card>
      <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100">
        <h2 className="text-[13px] font-semibold text-slate-900">Follow-ups</h2>
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-slate-400">←</span>
          <span className="text-[10px] font-semibold text-slate-700">Week 15</span>
          <span className="text-[11px] text-slate-400">→</span>
        </div>
      </div>
      <FilterChips items={['All', 'Scheduled', 'Sent', 'Pending']} />
      <div className="grid grid-cols-[1fr_110px_90px_70px] gap-x-3 items-center px-5 py-2 border-b border-gray-100">
        {['Recipient', 'Type', 'Scheduled', 'Status'].map(h => (
          <span key={h} className="text-[8px] font-semibold uppercase tracking-wider" style={{ color: '#AEAEB2' }}>{h}</span>
        ))}
      </div>
      {messages.map(({ name, type, scheduled, sc, status }) => (
        <div key={name} className="grid grid-cols-[1fr_110px_90px_70px] gap-x-3 items-center px-5 py-2.5 border-b border-gray-100 last:border-0 hover:bg-slate-50">
          <p className="truncate text-[11px] font-medium text-slate-900">{name}</p>
          <span className="text-[9px] truncate" style={{ color: '#6E6E73' }}>{type}</span>
          <span className="text-[9px] whitespace-nowrap" style={{ color: '#6E6E73' }}>{scheduled}</span>
          <span className={`w-fit rounded-full px-2 py-0.5 text-[9px] font-medium whitespace-nowrap ${sc}`}>{status}</span>
        </div>
      ))}
    </Card>
  )
}

// ─── Features section ─────────────────────────────────────────────────────────

const tabIconComponents = [LayoutDashboard, FileText, Wand2, CalendarDays, Users, Package, Mail]

const tabValues = ['dashboard', 'quoting', 'quote-form', 'calendar', 'crm', 'storage', 'follow-ups']

const tabMockupComponents = [
  DashboardMockup,
  QuotesMockup,
  QuoteFormMockup,
  CalendarMockup,
  CrmMockup,
  StorageMockup,
  FollowUpsMockup,
]

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
    <section id="features" className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center mb-10">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1D4ED8] mb-3">{t.features.label}</span>
          <h2 className="max-w-2xl text-[36px] lg:text-[44px] font-bold tracking-[-0.02em] text-[#0B1F3B] leading-[1.2]">
            {t.features.headline} <span className="text-[#F97316]">{t.features.highlight}</span>{t.features.headlineEnd}
          </h2>
          <p className="text-[18px] text-[#475569] max-w-[480px] leading-[1.7]">
            {t.features.subheadline}
          </p>
        </div>

        {/* Tabs */}
        <TabsPrimitive.Root defaultValue={tabs[0].value}>
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

          <div className="mt-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-6 lg:p-12">
            {tabs.map((tab) => (
              <TabsPrimitive.Content
                key={tab.value}
                value={tab.value}
                className="grid place-items-center gap-12 lg:grid-cols-2 lg:gap-16 data-[state=inactive]:hidden"
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

          {/* And more */}
          <p className="mt-5 text-center text-[13px] text-[#94A3B8]">
            {t.features.andMore}
          </p>
        </TabsPrimitive.Root>

      </div>
    </section>
  )
}
