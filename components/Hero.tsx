'use client'

import { motion, Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
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

// ─── Sparkline ────────────────────────────────────────────────────────

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const h = 28
  const w = 80
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / (max - min || 1)) * h
    return `${x},${y}`
  }).join(' ')
  const area = `0,${h} ` + pts + ` ${w},${h}`
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <polygon points={area} fill={color} opacity="0.12" />
      <polyline points={pts} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Product mockup ───────────────────────────────────────────────────

function ProductMockup() {
  const jobs = [
    { time: '08:00', title: 'Larsen Family',     route: 'Westside → Northgate', crew: '3 crew · Sprinter',  status: 'Active',    sc: 'bg-green-50 text-green-700', active: true  },
    { time: '12:00', title: 'Schmidt Transport', route: 'Downtown → Eastfield', crew: '4 crew · Box truck', status: 'Scheduled', sc: 'bg-blue-50 text-blue-700',   active: false },
    { time: '15:00', title: 'Hansen Residence',  route: 'Harbor → Midtown',     crew: '2 crew · Van',       status: 'Scheduled', sc: 'bg-blue-50 text-blue-700',   active: false },
  ]

  const revenueData = [18, 22, 19, 27, 24, 31, 28, 35, 33, 41, 38, 44]
  const jobsData    = [8,  11, 9,  13, 12, 15, 14, 17, 15, 19, 18, 21]

  return (
    <div className="w-full select-none rounded-xl overflow-hidden shadow-2xl shadow-[#0B1F3B]/20">
      <div className="flex">

        {/* Sidebar */}
        <aside className="w-[48px] shrink-0 flex flex-col" style={{ backgroundColor: '#0B1F3B' }}>
          <div className="flex items-center justify-center py-3 border-b border-white/5">
            <Image src="/assets/favicon.svg" alt="Movena" width={20} height={20} />
          </div>
          <nav className="flex-1 flex flex-col items-center py-2 gap-1">
            {[true, false, false, false, false, false].map((active, i) => (
              <div key={i} className={`w-6 h-6 rounded-md ${active ? 'bg-[#1D4ED8]/30' : ''} flex items-center justify-center`}>
                <div className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-[#60A5FA]' : 'bg-white/20'}`} />
              </div>
            ))}
          </nav>
          <div className="border-t border-white/5 py-3 flex justify-center">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1D4ED8] text-[7px] font-bold text-white">JD</div>
          </div>
        </aside>

        {/* Dashboard content */}
        <div className="flex-1 bg-[#f8fafc] overflow-hidden px-4 py-4">

          {/* Greeting */}
          <div className="mb-3">
            <h1 className="text-[13px] font-semibold" style={{ color: '#1D1D1F' }}>Good morning, John</h1>
            <p className="text-[10px] mt-0.5" style={{ color: '#6E6E73' }}>Today — 3 jobs</p>
          </div>

          {/* Stat cards + sparklines */}
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            <div className="rounded-xl bg-white border border-gray-100 px-3 py-2.5 shadow-sm">
              <p className="text-[7px] font-medium uppercase tracking-wide" style={{ color: '#AEAEB2' }}>Revenue this month</p>
              <p className="text-[20px] font-semibold leading-none mt-1" style={{ color: '#1D1D1F' }}>€44,200</p>
              <p className="text-[7px] mt-0.5 mb-2" style={{ color: '#16A34A' }}>+18% vs last month</p>
              <Sparkline data={revenueData} color="#2563EB" />
            </div>
            <div className="rounded-xl bg-white border border-gray-100 px-3 py-2.5 shadow-sm">
              <p className="text-[7px] font-medium uppercase tracking-wide" style={{ color: '#AEAEB2' }}>Jobs this month</p>
              <p className="text-[20px] font-semibold leading-none mt-1" style={{ color: '#1D1D1F' }}>21</p>
              <p className="text-[7px] mt-0.5 mb-2" style={{ color: '#16A34A' }}>+3 vs last month</p>
              <Sparkline data={jobsData} color="#2563EB" />
            </div>
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
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-x-0 -z-10"
        style={{ top: '-100px', bottom: 0, background: '#ffffff' }}
      />
      <div
        className="absolute inset-x-0 -z-10 pointer-events-none"
        style={{
          top: '-100px',
          bottom: 0,
          backgroundImage: `radial-gradient(circle at top right, rgba(59, 130, 246, 0.28), transparent 65%)`,
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* Left — text */}
          <div>
            <AnimatedGroup
              variants={{
                container: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } },
                ...transitionVariants,
              }}
              className="flex flex-col items-start gap-0"
            >
              <h1 className="text-[40px] lg:text-[46px] font-semibold leading-[1.1] tracking-[-0.03em] text-[#0B1F3B] w-full">
                {t.hero.headline} <span className="text-[#1D4ED8]">{t.hero.highlight}</span>
              </h1>

              <p className="mt-5 text-[15px] font-normal leading-[1.65] text-[#1E3A5F]/70 max-w-[360px]">
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
            <ProductMockup />
          </AnimatedGroup>

        </div>
      </div>
    </section>
  )
}
