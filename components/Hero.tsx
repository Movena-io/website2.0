'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion, Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TYPEFORM_URL } from '@/lib/constants'
import { useLanguage } from '@/lib/LanguageContext'
import { ReactNode } from 'react'

// ─── Animation helpers ────────────────────────────────────────────────

const transitionVariants: { item: Variants } = {
  item: {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', bounce: 0.3, duration: 1.5 },
    },
  },
}

function AnimatedGroup({
  children,
  className,
  variants,
}: {
  children: ReactNode
  className?: string
  variants?: { container?: Variants; item?: Variants }
}) {
  const containerVariants: Variants = variants?.container ?? {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }
  const itemVariants: Variants = variants?.item ?? {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className={cn(className)}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>}
    </motion.div>
  )
}

// ─── Product mockup ───────────────────────────────────────────────────

function ProductMockup() {
  const jobs = [
    { time: '08:00', title: 'Larsen Family',     route: 'Westside → Northgate', crew: '3 crew · Sprinter',  status: 'Active',    sc: 'bg-green-50 text-green-700', active: true  },
    { time: '12:00', title: 'Schmidt Transport', route: 'Downtown → Eastfield', crew: '4 crew · Box truck', status: 'Scheduled', sc: 'bg-blue-50 text-blue-700',   active: false },
    { time: '15:00', title: 'Hansen Residence',  route: 'Harbor → Midtown',     crew: '2 crew · Van',       status: 'Scheduled', sc: 'bg-blue-50 text-blue-700',   active: false },
  ]

  return (
    <div className="w-full select-none">
      {/* Browser chrome */}
      <div className="rounded-t-xl bg-[#1E293B] border border-[#334155] border-b-0 px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 mx-3">
          <div className="bg-[#0F172A] rounded-md px-3 py-1 max-w-[160px] mx-auto flex items-center justify-center">
            <span className="text-[11px] text-[#475569] font-medium">app.movena.io</span>
          </div>
        </div>
      </div>

      {/* App window */}
      <div className="rounded-b-xl border border-[#334155] border-t-0 overflow-hidden">
        <div className="flex">

          {/* Sidebar */}
          <aside className="w-[110px] shrink-0 bg-slate-900 flex flex-col">
            <div className="flex items-center gap-1.5 px-3 py-3 border-b border-white/5">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-blue-700 text-[9px] font-bold text-white">M</div>
              <span className="text-[10px] font-semibold tracking-[0.06em] text-white">Movena</span>
            </div>
            <nav className="flex-1 px-1.5 py-2 space-y-0.5">
              {[
                { label: 'Dashboard',  active: true  },
                { label: 'Tasks',      active: false },
                { label: 'Calendar',   active: false },
                { label: 'Quotes',     active: false },
                { label: 'Leads',      active: false },
                { label: 'Invoicing',  active: false },
              ].map(item => (
                <div key={item.label} className={`flex items-center rounded-lg border-l-[2px] py-1 pl-[7px] pr-2 text-[9px] font-medium ${item.active ? 'border-blue-700 bg-blue-700/20 text-blue-400' : 'border-transparent text-slate-400'}`}>
                  {item.label}
                </div>
              ))}
            </nav>
            <div className="border-t border-white/5 px-1.5 pb-3 pt-2.5">
              <div className="flex items-center gap-1.5 px-2">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-700 text-[7px] font-bold text-white">SO</div>
                <span className="truncate text-[9px] text-slate-500">Samuel O.</span>
              </div>
            </div>
          </aside>

          {/* Dashboard content */}
          <div className="flex-1 bg-[#f8fafc] overflow-hidden px-4 py-4">

            {/* Greeting */}
            <div className="mb-3">
              <h1 className="text-[13px] font-semibold" style={{ color: '#1D1D1F' }}>Good morning, Samuel</h1>
              <p className="text-[10px] mt-0.5" style={{ color: '#6E6E73' }}>Today — 3 jobs</p>
            </div>

            {/* 4 metric cards */}
            <div className="grid grid-cols-4 gap-1.5 mb-3">
              {[
                { label: 'Active leads',   value: '12', sub: 'in pipeline', color: undefined   },
                { label: 'Jobs today',     value: '3',  sub: '1 active',    color: '#2563EB'   },
                { label: 'Jobs this week', value: '11', sub: 'scheduled',   color: undefined   },
                { label: 'Quotes pending', value: '5',  sub: 'unanswered',  color: '#FF9500'   },
              ].map(c => (
                <div key={c.label} className="rounded-xl bg-white border border-gray-100 px-2.5 py-2 shadow-sm">
                  <p className="text-[7px] font-medium uppercase tracking-wide leading-tight" style={{ color: '#AEAEB2' }}>{c.label}</p>
                  <p className="text-[18px] font-semibold leading-none mt-1" style={{ color: c.color ?? '#1D1D1F' }}>{c.value}</p>
                  <p className="text-[7px] mt-0.5" style={{ color: '#AEAEB2' }}>{c.sub}</p>
                </div>
              ))}
            </div>

            {/* Today */}
            <div className="rounded-xl border border-gray-100 bg-white px-3 py-2.5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-semibold" style={{ color: '#1D1D1F' }}>Today</p>
                <span className="text-[9px]" style={{ color: '#6E6E73' }}>09:24</span>
              </div>
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
                        <p className="text-[7px]" style={{ color: '#AEAEB2' }}>{job.crew}</p>
                      </div>
                      <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[7px] font-medium ${job.sc}`}>{job.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────

export default function Hero() {
  const { t } = useLanguage()
  const gradientRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gradientRef.current) return
    gsap.fromTo(
      gradientRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1.6, ease: 'power3.out' }
    )
  }, [])

  return (
    <section className="relative overflow-hidden">
      {/* Gradient background */}
      <div
        ref={gradientRef}
        className="absolute inset-x-0 -z-10"
        style={{
          top: '-100px',
          bottom: 0,
          backgroundImage: `
            linear-gradient(180deg,
              #60A5FA 0%,
              #93C5FD 8%,
              #BFDBFE 22%,
              #DBEAFE 42%,
              #EFF6FF 70%,
              #ffffff 100%
            )
          `,
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 lg:gap-20 items-center">

          {/* Left — text */}
          <div>
            <AnimatedGroup
              variants={{
                container: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } },
                ...transitionVariants,
              }}
              className="flex flex-col items-start gap-0"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#1D4ED8]/40" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1D4ED8]">{t.hero.badge}</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#1D4ED8]/40" />
              </div>

              <h1 className="text-[40px] lg:text-[52px] font-bold leading-[1.05] tracking-[-0.03em] text-[#0B1F3B]" style={{ textWrap: 'balance' } as React.CSSProperties}>
                {t.hero.headline} <span className="text-[#1D4ED8]">{t.hero.highlight}</span>
              </h1>

              <p className="mt-5 text-[15px] font-normal leading-[1.65] text-[#1E3A5F]/70 max-w-[380px]">
                {t.hero.subheadline}
              </p>
            </AnimatedGroup>

            <AnimatedGroup
              variants={{
                container: {
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.75 } },
                },
                ...transitionVariants,
              }}
              className="mt-10 flex flex-col items-start gap-3"
            >
              <a
                href={TYPEFORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient inline-flex items-center justify-center gap-2 h-14 px-10 rounded-xl text-white text-[15px] font-semibold"
              >
                <span className="flex flex-col items-center">
                  <span>{t.hero.primaryCta}</span>
                  <span className="text-[11px] font-normal opacity-80">{t.hero.disclaimer}</span>
                </span>
                <ArrowRight size={15} strokeWidth={2} />
              </a>
            </AnimatedGroup>
          </div>

          {/* Right — mockup, overflows right edge */}
          <AnimatedGroup
            variants={{
              container: {
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.85 } },
              },
              ...transitionVariants,
            }}
            className="-mr-6 lg:-mr-48 scale-[1.08] origin-left"
          >
            <div className="shadow-2xl shadow-[#0B1F3B]/20">
              <ProductMockup />
            </div>
          </AnimatedGroup>

        </div>
      </div>
    </section>
  )
}
