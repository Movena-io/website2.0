'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { useLanguage } from '@/lib/LanguageContext'
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

// ─── Shared helpers ───────────────────────────────────────────────────────────

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      {children}
    </div>
  )
}

function PageHeader({ title, action, subtitle }: { title: string; action?: React.ReactNode; subtitle?: string }) {
  return (
    <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100">
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-slate-900">{title}</p>
        {subtitle && (
          <p className="text-[10px] mt-0.5" style={{ color: '#6E6E73' }}>{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  )
}

function FilterChips({ items }: { items: string[] }) {
  return (
    <div className="flex items-center gap-1 px-5 py-2 border-b border-gray-100">
      {items.map((f, i) => (
        <span
          key={f}
          className={`text-[9px] font-semibold px-2.5 py-1 rounded-lg ${
            i === 0 ? 'bg-slate-900 text-white' : 'text-slate-500'
          }`}
        >
          {f}
        </span>
      ))}
    </div>
  )
}

// ─── 0. Dashboard mockup ──────────────────────────────────────────────────────
//
// Mirrors the real /index dashboard: greeting · KPI row · today's jobs
// timeline · alerts & deadlines.

function DashboardMockup() {
  const jobs = [
    { time: '08:00', title: 'Larsen Family',     route: 'Vesterbro → Nørrebro',  crew: '3 crew · DUH 12 345',  status: 'In progress', sc: 'bg-green-50 text-green-700', active: true  },
    { time: '12:00', title: 'Schmidt Transport', route: 'Valby → Taastrup',      crew: '4 crew · DUH 33 211',  status: 'Scheduled',   sc: 'bg-blue-50 text-blue-700',   active: false },
    { time: '15:00', title: 'Hansen Residence',  route: 'Roskilde → Høje-T.',    crew: '2 crew · DUH 09 102',  status: 'Scheduled',   sc: 'bg-blue-50 text-blue-700',   active: false },
  ]
  const alerts = [
    { text: 'Q-1042 sent 8 days ago, no reply' },
    { text: 'Berg Office cold for 14 days' },
  ]
  return (
    <Card>
      <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-100">
        <div>
          <p className="text-[13px] font-semibold text-slate-900">Good morning, Samuel</p>
          <p className="text-[10px] mt-0.5" style={{ color: '#6E6E73' }}>Tuesday · 3 jobs today</p>
        </div>
        <span className="text-[10px]" style={{ color: '#6E6E73' }}>09:24</span>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-1.5 px-4 py-3 border-b border-gray-100">
        {[
          { label: 'Pipeline',       value: '12',   sub: 'open leads', color: undefined },
          { label: 'Quotes',         value: '5',    sub: 'awaiting',   color: '#FF9500' },
          { label: 'Jobs this week', value: '11',   sub: 'scheduled',  color: undefined },
          { label: 'Revenue · MTD',  value: '142k', sub: 'kr',         color: '#1D4ED8' },
        ].map(c => (
          <div key={c.label} className="rounded-lg bg-gray-50 px-2 py-1.5">
            <p className="text-[7px] font-medium uppercase tracking-wide leading-tight" style={{ color: '#AEAEB2' }}>{c.label}</p>
            <p className="text-[15px] font-semibold leading-none mt-1" style={{ color: c.color ?? '#1D1D1F' }}>{c.value}</p>
            <p className="text-[7px] mt-0.5" style={{ color: '#AEAEB2' }}>{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Today's jobs */}
      <div className="px-5 py-3 border-b border-gray-100">
        <p className="text-[10px] font-semibold mb-2" style={{ color: '#1D1D1F' }}>Today&apos;s jobs</p>
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
                  <p className="text-[7px] truncate" style={{ color: '#AEAEB2' }}>{job.crew}</p>
                </div>
                <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[7px] font-medium ${job.sc}`}>{job.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      <div className="px-5 py-3">
        <p className="text-[10px] font-semibold mb-2" style={{ color: '#1D1D1F' }}>Alerts &amp; deadlines</p>
        <div className="flex flex-col gap-1.5">
          {alerts.map(a => (
            <div key={a.text} className="flex items-start gap-2 rounded-lg bg-orange-50 border border-orange-100 px-2.5 py-1.5">
              <div className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-500 shrink-0" />
              <p className="text-[9px] font-medium text-orange-900">{a.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

// ─── 1. Quoting mockup ────────────────────────────────────────────────────────
//
// Mirrors /quotes: status KPIs (Draft / Sent / Accepted / Rejected /
// Expired) and a list of recent quotes with the three pricing engines.

function QuotingMockup() {
  const rows = [
    { id: 'Q-1046', name: 'Larsen Family',     route: 'Vesterbro → Nørrebro', engine: 'm²',     total: '14.800 kr', status: 'Sent',     sc: 'bg-blue-50 text-blue-700'    },
    { id: 'Q-1045', name: 'Schmidt Transport', route: 'Valby → Taastrup',     engine: 'Hourly', total: '9.940 kr',  status: 'Accepted', sc: 'bg-green-50 text-green-700'  },
    { id: 'Q-1044', name: 'Hansen Residence',  route: 'Roskilde → Høje-T.',   engine: 'Manual', total: '6.500 kr',  status: 'Draft',    sc: 'bg-gray-100 text-gray-600'   },
    { id: 'Q-1043', name: 'Nielsen Business',  route: 'Aarhus → Copenhagen',  engine: 'm²',     total: '22.100 kr', status: 'Sent',     sc: 'bg-blue-50 text-blue-700'    },
  ]
  return (
    <Card>
      <PageHeader
        title="Quotes"
        subtitle="42 quotes · 18 accepted this month"
        action={
          <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-[10px] font-semibold text-white">
            + New quote
          </button>
        }
      />

      {/* Status KPIs */}
      <div className="grid grid-cols-5 gap-1 px-4 py-2.5 border-b border-gray-100">
        {[
          { label: 'Draft',    value: '3'  },
          { label: 'Sent',     value: '12' },
          { label: 'Accepted', value: '18' },
          { label: 'Rejected', value: '4'  },
          { label: 'Expired',  value: '5'  },
        ].map(k => (
          <div key={k.label} className="text-center">
            <p className="text-[7px] font-medium uppercase tracking-wide" style={{ color: '#AEAEB2' }}>{k.label}</p>
            <p className="text-[12px] font-semibold mt-0.5" style={{ color: '#1D1D1F' }}>{k.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[36px_1fr_56px_62px_62px] items-center gap-x-2 border-b border-gray-100 px-5 py-2">
        {['No.', 'Customer', 'Engine', 'Total', 'Status'].map(h => (
          <span key={h} className="text-[8px] font-semibold uppercase tracking-wider" style={{ color: '#AEAEB2' }}>{h}</span>
        ))}
      </div>
      {rows.map(row => (
        <div key={row.id} className="grid grid-cols-[36px_1fr_56px_62px_62px] items-center gap-x-2 border-b border-gray-100 last:border-0 px-5 py-2 hover:bg-slate-50">
          <span className="text-[9px] font-mono tabular-nums" style={{ color: '#6E6E73' }}>{row.id}</span>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-medium text-slate-900">{row.name}</p>
            <p className="truncate text-[9px]" style={{ color: '#6E6E73' }}>{row.route}</p>
          </div>
          <span className="text-[9px] font-medium" style={{ color: '#475569' }}>{row.engine}</span>
          <span className="text-[10px] font-semibold tabular-nums text-slate-800">{row.total}</span>
          <span className={`w-fit rounded-full px-2 py-0.5 text-[9px] font-medium whitespace-nowrap ${row.sc}`}>{row.status}</span>
        </div>
      ))}
    </Card>
  )
}

// ─── 2. Quote form mockup ─────────────────────────────────────────────────────
//
// Mirrors the public /tilbud/<slug> form: branded header, private/business
// tabs, step indicator, addresses + distance + floor fields.

function QuoteFormMockup() {
  const steps = ['Addresses', 'Date', 'Inventory', 'Estimate', 'Contact']
  return (
    <Card>
      {/* Branded header band */}
      <div className="px-5 pt-4 pb-3 border-b border-gray-100 bg-gradient-to-r from-[#1D4ED8] to-[#2563EB]">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-semibold text-white">Hansen Moving · Get a quote</p>
          <span className="rounded-full bg-white/20 border border-white/30 px-2 py-0.5 text-[8px] font-semibold text-white">
            Embedded
          </span>
        </div>
      </div>

      {/* Private / Business tabs */}
      <div className="flex items-center gap-1 px-5 py-2 border-b border-gray-100 bg-gray-50">
        <span className="text-[9px] font-semibold px-2.5 py-1 rounded-lg bg-white text-slate-900 border border-slate-200">Private</span>
        <span className="text-[9px] font-semibold px-2.5 py-1 rounded-lg text-slate-500">Business</span>
      </div>

      {/* Step indicator */}
      <div className="flex items-center px-5 py-3 border-b border-gray-100">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center">
            <div className={`flex items-center gap-1.5 rounded-lg px-2 py-1 ${i === 0 ? 'bg-[#1D4ED8]' : ''}`}>
              <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[8px] font-bold ${i === 0 ? 'bg-white text-[#1D4ED8]' : 'bg-gray-100 text-slate-500'}`}>{i + 1}</span>
              <span className={`text-[9px] font-medium ${i === 0 ? 'text-white' : 'text-slate-400'}`}>{step}</span>
            </div>
            {i < steps.length - 1 && <span className="px-0.5 text-[11px] text-slate-300">›</span>}
          </div>
        ))}
      </div>

      {/* Form body */}
      <div className="px-5 py-4 space-y-3">
        <div>
          <label className="block text-[9px] font-semibold uppercase tracking-wide mb-1" style={{ color: '#AEAEB2' }}>From address</label>
          <div className="rounded-lg border border-gray-200 px-3 py-2 bg-gray-50">
            <span className="text-[10px]" style={{ color: '#1D1D1F' }}>Vesterbrogade 14, 1620 København V</span>
          </div>
        </div>
        <div>
          <label className="block text-[9px] font-semibold uppercase tracking-wide mb-1" style={{ color: '#AEAEB2' }}>To address</label>
          <div className="rounded-lg border border-gray-200 px-3 py-2">
            <span className="text-[10px] text-gray-300">Street, number, postal code...</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[9px] font-semibold uppercase tracking-wide mb-1" style={{ color: '#AEAEB2' }}>Distance</label>
            <div className="rounded-lg border border-gray-200 px-3 py-2 bg-gray-50">
              <span className="text-[10px]" style={{ color: '#475569' }}>3.4 km · auto</span>
            </div>
          </div>
          <div>
            <label className="block text-[9px] font-semibold uppercase tracking-wide mb-1" style={{ color: '#AEAEB2' }}>Floor</label>
            <div className="rounded-lg border border-gray-200 px-3 py-2 bg-gray-50">
              <span className="text-[10px]" style={{ color: '#475569' }}>3 · with lift</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end pt-1">
          <button className="rounded-lg bg-[#1D4ED8] px-4 py-1.5 text-[10px] font-semibold text-white">
            Continue →
          </button>
        </div>
      </div>
    </Card>
  )
}

// ─── 3. Leads & jobs mockup ───────────────────────────────────────────────────
//
// Mirrors /leads kanban: stage columns with cards showing move-specific
// metadata (route, m², date, value).

function LeadsJobsMockup() {
  const cols = [
    {
      stage: 'New',
      count: 5,
      tone: 'bg-blue-50 text-blue-700',
      cards: [
        { name: 'Larsen Family',    sub: 'Vesterbro → Nørrebro',     meta: '85 m² · Apr 28',  value: '14.800 kr' },
        { name: 'Magnusson AB',     sub: 'Aarhus → Copenhagen',      meta: '60 m² · May 02',  value: '12.200 kr' },
      ],
    },
    {
      stage: 'Quote sent',
      count: 4,
      tone: 'bg-orange-50 text-orange-700',
      cards: [
        { name: 'Schmidt Transport', sub: 'Valby → Taastrup',        meta: '120 m² · Apr 30', value: '22.100 kr' },
        { name: 'Berg Office',       sub: 'Frederiksberg → Hørsholm', meta: '210 m² · May 06', value: '38.400 kr' },
      ],
    },
    {
      stage: 'Won',
      count: 6,
      tone: 'bg-green-50 text-green-700',
      cards: [
        { name: 'Hansen Residence',  sub: 'Roskilde → Høje-T.',      meta: '70 m² · May 04',  value: '9.940 kr' },
      ],
    },
  ]
  return (
    <Card>
      <PageHeader title="Leads" subtitle="24 leads · 12 in pipeline · 5 new" action={
        <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-[10px] font-semibold text-white">
          + New lead
        </button>
      } />

      <div className="grid grid-cols-3 gap-2 px-4 py-3">
        {cols.map(c => (
          <div key={c.stage} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between px-1">
              <span className={`text-[9px] font-semibold rounded-full px-2 py-0.5 ${c.tone}`}>{c.stage}</span>
              <span className="text-[8px] tabular-nums" style={{ color: '#94A3B8' }}>{c.count}</span>
            </div>
            {c.cards.map(card => (
              <div key={card.name} className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 shadow-sm">
                <p className="text-[10px] font-medium truncate" style={{ color: '#1D1D1F' }}>{card.name}</p>
                <p className="text-[8px] truncate mt-0.5" style={{ color: '#6E6E73' }}>{card.sub}</p>
                <p className="text-[7px] truncate mt-0.5" style={{ color: '#AEAEB2' }}>{card.meta}</p>
                <p className="text-[9px] font-semibold tabular-nums mt-1" style={{ color: '#1D4ED8' }}>{card.value}</p>
              </div>
            ))}
            <button className="rounded-md border border-dashed border-slate-200 px-2 py-1 text-[8px] font-medium" style={{ color: '#94A3B8' }}>+ Add</button>
          </div>
        ))}
      </div>
    </Card>
  )
}

// ─── 4. Calendar & crew mockup ────────────────────────────────────────────────
//
// Mirrors /calendar week view with crew availability strip and an
// unscheduled-jobs nudge underneath.

function CalendarCrewMockup() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  const jobs = [
    { day: 0, title: 'Larsen Family',   time: '08:00', sc: 'bg-blue-50 border-blue-200 text-blue-800'       },
    { day: 0, title: 'Thomsen',         time: '13:00', sc: 'bg-blue-50 border-blue-200 text-blue-800'       },
    { day: 1, title: 'Hansen Ltd.',     time: '07:00', sc: 'bg-green-50 border-green-200 text-green-800'    },
    { day: 2, title: 'Magnusson',       time: '09:00', sc: 'bg-orange-50 border-orange-200 text-orange-800' },
    { day: 2, title: 'Berg Office',     time: '14:00', sc: 'bg-purple-50 border-purple-200 text-purple-800' },
    { day: 3, title: 'Schmidt Trans.',  time: '08:30', sc: 'bg-blue-50 border-blue-200 text-blue-800'       },
    { day: 4, title: 'Nielsen',         time: '10:00', sc: 'bg-green-50 border-green-200 text-green-800'    },
  ]
  const crew = [
    { name: 'Team A', avail: [true, true, true, true, true],  color: '#1D4ED8' },
    { name: 'Team B', avail: [true, false, true, true, true], color: '#16A34A' },
    { name: 'Team C', avail: [false, true, true, false, true], color: '#F97316' },
  ]
  return (
    <Card>
      <PageHeader title="Calendar — Week 17" subtitle="7 jobs · 2 teams free" />

      {/* Day strip */}
      <div className="p-3 border-b border-gray-100">
        <div className="grid grid-cols-5 gap-1.5">
          {days.map((day, i) => (
            <div key={day} className="flex flex-col gap-1">
              <p className="text-center text-[9px] font-semibold" style={{ color: '#AEAEB2' }}>{day}</p>
              <div className="flex flex-col gap-1 min-h-[60px]">
                {jobs.filter(j => j.day === i).map(job => (
                  <div key={job.title + job.time} className={`rounded-md border px-1.5 py-1 ${job.sc}`}>
                    <p className="text-[8px] font-semibold leading-tight truncate">{job.title}</p>
                    <p className="text-[7px] opacity-70 mt-0.5">{job.time}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Crew availability */}
      <div className="px-4 py-2.5 border-b border-gray-100">
        <p className="text-[9px] font-semibold mb-1.5" style={{ color: '#475569' }}>Crew availability</p>
        {crew.map(c => (
          <div key={c.name} className="grid grid-cols-[60px_1fr] items-center gap-2 mb-1 last:mb-0">
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.color }} />
              <span className="text-[9px] font-medium" style={{ color: '#1D1D1F' }}>{c.name}</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {c.avail.map((ok, i) => (
                <div
                  key={i}
                  className="h-3 rounded-sm"
                  style={{
                    backgroundColor: ok ? c.color + '33' : '#F1F5F9',
                    border: ok ? `1px solid ${c.color}66` : '1px solid #E2E8F0',
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Unscheduled */}
      <div className="px-5 py-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          <span className="text-[9px] font-medium" style={{ color: '#1D1D1F' }}>Unscheduled jobs</span>
        </div>
        <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[8px] font-semibold text-orange-700">3 to dispatch</span>
      </div>
    </Card>
  )
}

// ─── 5. Operations mockup ─────────────────────────────────────────────────────
//
// Mirrors /inventory: KPI row, tabs ribbon (Stock / Equipment / Vehicle
// kits / Log), item list with reorder-threshold status.

function OperationsMockup() {
  const items = [
    { name: 'Medium box',        category: 'Boxes',     stock: 48, min: 60, unit: 'pcs',   status: 'Low'      , sc: 'bg-orange-50 text-orange-700' },
    { name: 'Large box',         category: 'Boxes',     stock: 80, min: 40, unit: 'pcs',   status: 'OK'       , sc: 'bg-green-50 text-green-700'   },
    { name: 'Bubble wrap',       category: 'Packing',   stock: 3,  min: 10, unit: 'rolls', status: 'Critical' , sc: 'bg-red-50 text-red-700'       },
    { name: 'Furniture blanket', category: 'Equipment', stock: 28, min: 20, unit: 'pcs',   status: 'OK'       , sc: 'bg-green-50 text-green-700'   },
    { name: 'Tape (24-pack)',    category: 'Packing',   stock: 15, min: 12, unit: 'pack',  status: 'OK'       , sc: 'bg-green-50 text-green-700'   },
  ]
  return (
    <Card>
      <PageHeader
        title="Inventory"
        subtitle="Stock, equipment and vehicle kits"
        action={<button className="rounded-lg bg-blue-600 px-3 py-1.5 text-[10px] font-semibold text-white">+ Add item</button>}
      />

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-1.5 px-4 py-2.5 border-b border-gray-100">
        {[
          { label: 'Total SKUs',      value: '42' },
          { label: 'Low stock',       value: '3',  color: '#FF9500' },
          { label: 'Open rentals',    value: '7' },
          { label: 'Overdue rentals', value: '1',  color: '#EF4444' },
        ].map(k => (
          <div key={k.label} className="rounded-lg bg-gray-50 px-2 py-1.5">
            <p className="text-[7px] font-medium uppercase tracking-wide" style={{ color: '#AEAEB2' }}>{k.label}</p>
            <p className="text-[14px] font-semibold leading-none mt-1" style={{ color: k.color ?? '#1D1D1F' }}>{k.value}</p>
          </div>
        ))}
      </div>

      <FilterChips items={['Stock', 'Equipment', 'Vehicle kits', 'Log']} />

      <div className="grid grid-cols-[1fr_56px_56px_64px] gap-x-3 items-center px-5 py-2 border-b border-gray-100">
        {['Item', 'Stock', 'Min', 'Status'].map(h => (
          <span key={h} className="text-[8px] font-semibold uppercase tracking-wider" style={{ color: '#AEAEB2' }}>{h}</span>
        ))}
      </div>
      {items.map(item => (
        <div key={item.name} className="grid grid-cols-[1fr_56px_56px_64px] gap-x-3 items-center px-5 py-2 border-b border-gray-100 last:border-0 hover:bg-slate-50">
          <div className="min-w-0">
            <p className="truncate text-[11px] font-medium text-slate-900">{item.name}</p>
            <p className="truncate text-[9px]" style={{ color: '#6E6E73' }}>{item.category} · {item.unit}</p>
          </div>
          <span className="text-[10px] font-semibold tabular-nums text-slate-800">{item.stock}</span>
          <span className="text-[10px] tabular-nums" style={{ color: '#6E6E73' }}>{item.min}</span>
          <span className={`w-fit rounded-full px-2 py-0.5 text-[9px] font-medium whitespace-nowrap ${item.sc}`}>{item.status}</span>
        </div>
      ))}
    </Card>
  )
}

// ─── 6. Automations mockup ────────────────────────────────────────────────────
//
// Mirrors /automations: flow list with trigger pills, timing, channel,
// run-count, and active/paused state. Triggers match real i18n keys.

function AutomationsMockup() {
  const flows = [
    { name: 'Quote follow-up',     trigger: 'Quote sent',      timing: '3 days after', channel: 'Email', active: true,  runs: 84,  sc: 'bg-blue-50 text-blue-700'    },
    { name: 'Job confirmation',    trigger: 'Job scheduled',   timing: 'Immediately',  channel: 'Email', active: true,  runs: 132, sc: 'bg-purple-50 text-purple-700' },
    { name: 'Day-before reminder', trigger: 'Job reminder',    timing: '24h before',   channel: 'Email', active: true,  runs: 128, sc: 'bg-orange-50 text-orange-700' },
    { name: 'Review request',      trigger: 'Job completed',   timing: '2 days after', channel: 'Email', active: true,  runs: 76,  sc: 'bg-green-50 text-green-700'   },
    { name: 'Storage renewal',     trigger: 'Storage renewal', timing: '7 days before',channel: 'Email', active: false, runs: 14,  sc: 'bg-gray-100 text-gray-600'    },
  ]
  return (
    <Card>
      <PageHeader
        title="Automation flows"
        subtitle="13 trigger types · runs every 15 min"
        action={<button className="rounded-lg bg-blue-600 px-3 py-1.5 text-[10px] font-semibold text-white">+ New sequence</button>}
      />

      <div className="grid grid-cols-[1fr_84px_50px_56px] gap-x-3 items-center px-5 py-2 border-b border-gray-100">
        {['Sequence', 'Trigger', 'Runs', 'Status'].map(h => (
          <span key={h} className="text-[8px] font-semibold uppercase tracking-wider" style={{ color: '#AEAEB2' }}>{h}</span>
        ))}
      </div>
      {flows.map(f => (
        <div key={f.name} className="grid grid-cols-[1fr_84px_50px_56px] gap-x-3 items-center px-5 py-2 border-b border-gray-100 last:border-0 hover:bg-slate-50">
          <div className="min-w-0">
            <p className="truncate text-[11px] font-medium text-slate-900">{f.name}</p>
            <p className="truncate text-[9px]" style={{ color: '#6E6E73' }}>{f.timing} · {f.channel}</p>
          </div>
          <span className={`w-fit rounded-full px-2 py-0.5 text-[9px] font-medium whitespace-nowrap ${f.sc}`}>{f.trigger}</span>
          <span className="text-[10px] font-semibold tabular-nums text-slate-800">{f.runs}</span>
          <div className="flex items-center gap-1.5">
            <div className={`h-1.5 w-1.5 rounded-full ${f.active ? 'bg-green-500' : 'bg-gray-300'}`} />
            <span className="text-[9px] font-medium" style={{ color: f.active ? '#16A34A' : '#94A3B8' }}>
              {f.active ? 'Active' : 'Paused'}
            </span>
          </div>
        </div>
      ))}
    </Card>
  )
}

// ─── Features section ─────────────────────────────────────────────────────────

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
            <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-4 md:gap-6 md:items-stretch">

              {/* Left: vertical tab list (desktop only) */}
              <TabsPrimitive.List className="hidden md:flex flex-col gap-1 shrink-0 w-48 justify-center">
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
              <div className="flex-1 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] overflow-hidden relative h-[520px] md:h-[440px] lg:h-[460px]">
                {tabs.map((tab) => (
                  <TabsPrimitive.Content
                    key={tab.value}
                    value={tab.value}
                    forceMount
                    className="flex flex-col lg:flex-row lg:gap-12 gap-6 items-center
                      data-[state=inactive]:opacity-0 data-[state=inactive]:pointer-events-none
                      data-[state=active]:opacity-100
                      transition-opacity duration-500
                      absolute inset-0 p-6 pb-8 lg:p-10 lg:pb-12"
                  >
                    {/* Text */}
                    <div className="flex flex-col gap-4 min-w-0 lg:w-1/2 lg:shrink-0">
                      <span className="inline-block text-[12px] font-semibold text-[#1D4ED8] bg-white border border-[#1D4ED8]/20 uppercase tracking-[0.08em] px-3 py-1 rounded-full w-fit">
                        {tab.badge}
                      </span>
                      <h3 className="text-[22px] lg:text-[30px] font-semibold tracking-[-0.02em] text-[#0B1F3B] leading-[1.2]">
                        {tab.title}
                      </h3>
                      <p className="text-[15px] text-[#475569] leading-[1.75]">
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
                    <div className="overflow-hidden hidden lg:flex lg:items-center lg:justify-center lg:w-1/2 lg:shrink-0 p-[25px]">
                      {tab.mockup}
                    </div>
                  </TabsPrimitive.Content>
                ))}
              </div>
            </div>

            {/* And more */}
            <p className="mt-4 text-center text-[13px] text-[#94A3B8]">
              {t.features.andMore}
            </p>
        </TabsPrimitive.Root>

      </div>
    </section>
  )
}
