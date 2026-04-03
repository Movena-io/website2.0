'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion, Variants } from 'framer-motion'
import { ArrowRight, MapPin, Clock, CheckCircle, ChevronRight, Truck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TYPEFORM_URL } from '@/lib/constants'
import { useLanguage } from '@/lib/LanguageContext'
import { ReactNode } from 'react'

// ─── Animation helpers ────────────────────────────────────────────────

const transitionVariants: { item: Variants } = {
  item: {
    hidden: { opacity: 0, filter: 'blur(12px)', y: 12 },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
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
      <div className="rounded-b-xl border border-[#334155] border-t-0 overflow-hidden bg-[#F8FAFC]">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-12 bg-[#0B1F3B] flex flex-col items-center py-4 gap-3 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-[#1D4ED8] flex items-center justify-center">
              <Truck size={13} strokeWidth={1.5} className="text-white" />
            </div>
            {['Q', 'S', 'C', 'I'].map((l) => (
              <div key={l} className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white/40">{l}</span>
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 p-4 flex flex-col gap-3 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-[13px] font-bold text-[#0F172A]">Active quotes</h3>
              <button className="bg-[#1D4ED8] text-white text-[10px] font-semibold px-3 py-1.5 rounded-lg shrink-0">
                + New quote
              </button>
            </div>

            <div className="bg-white rounded-xl border border-[#E2E8F0] p-3.5 shadow-sm">
              <div className="flex items-start justify-between mb-2.5">
                <div>
                  <p className="text-[12px] font-semibold text-[#0F172A]">Larsen Familie</p>
                  <p className="text-[11px] text-[#475569] mt-0.5">3-bedroom · 14 Apr 08:00</p>
                </div>
                <span className="text-[10px] font-semibold bg-[#F97316]/10 text-[#EA580C] px-2 py-0.5 rounded shrink-0">Pending</span>
              </div>
              <div className="flex flex-col gap-1 mb-2.5">
                <div className="flex items-center gap-2">
                  <MapPin size={10} strokeWidth={1.5} className="text-[#1D4ED8] shrink-0" />
                  <span className="text-[10px] text-[#475569] truncate">48 Vesterbrogade, 1620 CPH</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={10} strokeWidth={1.5} className="text-[#16A34A] shrink-0" />
                  <span className="text-[10px] text-[#475569] truncate">22 Nørrebrogade, 2200 CPH</span>
                </div>
              </div>
              <div className="border-t border-[#F1F5F9] pt-2.5 flex items-center justify-between">
                <span className="text-[12px] font-bold text-[#0F172A]">5.200 kr</span>
                <button className="flex items-center gap-1 bg-[#1D4ED8] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">
                  Send <ChevronRight size={9} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#E2E8F0] p-3.5 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-[12px] font-semibold text-[#0F172A]">Hansen ApS</p>
                  <p className="text-[11px] text-[#475569] mt-0.5">Office relocation · 16 Apr</p>
                </div>
                <span className="text-[10px] font-semibold bg-[#16A34A]/10 text-[#16A34A] px-2 py-0.5 rounded shrink-0">Accepted</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Clock size={10} strokeWidth={1.5} className="text-[#475569]" />
                  <span className="text-[10px] text-[#475569]">Est. 6h</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={10} strokeWidth={1.5} className="text-[#16A34A]" />
                  <span className="text-[10px] text-[#475569]">Crew assigned</span>
                </div>
              </div>
              <div className="border-t border-[#F1F5F9] mt-2.5 pt-2.5 flex items-center justify-between">
                <span className="text-[12px] font-bold text-[#0F172A]">12.800 kr</span>
                <button className="text-[10px] font-semibold text-[#1D4ED8]">View details</button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#E2E8F0] p-3.5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[12px] font-semibold text-[#0F172A]">Magnusson Family</p>
                  <p className="text-[11px] text-[#475569] mt-0.5">2-bedroom · 19 Apr 09:00</p>
                </div>
                <span className="text-[10px] font-semibold bg-[#1D4ED8]/10 text-[#1D4ED8] px-2 py-0.5 rounded shrink-0">Draft</span>
              </div>
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
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(180deg,
              #ffffff 0%,
              #EFF6FF 30%,
              #DBEAFE 58%,
              #BFDBFE 78%,
              #93C5FD 92%,
              #60A5FA 100%
            )
          `,
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 items-center">

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

              <h1 className="text-[42px] lg:text-[56px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#0B1F3B]" style={{ textWrap: 'balance' } as React.CSSProperties}>
                {t.hero.headline} <span className="text-[#F97316]">{t.hero.highlight}</span>
              </h1>

              <p className="mt-5 text-[18px] font-normal leading-[1.65] text-[#1E3A5F]/70 max-w-[480px]">
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
              className="mt-10 flex flex-col sm:flex-row items-start gap-3"
            >
              <a
                href={TYPEFORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl text-white text-[15px] font-semibold"
              >
                {t.hero.primaryCta}
                <ArrowRight size={15} strokeWidth={2} />
              </a>

              <div
                className="rounded-[14px] p-0.5"
                style={{ background: 'linear-gradient(135deg, #93C5FD, #1D4ED8, #0B1F3B)' }}
              >
                <a
                  href="/#how-it-works"
                  className="inline-flex items-center justify-center h-12 px-7 rounded-xl bg-white/90 backdrop-blur-sm text-[#0B1F3B] text-[15px] font-semibold hover:bg-white transition-colors duration-150"
                >
                  {t.hero.secondaryCta}
                </a>
              </div>
            </AnimatedGroup>

            <p className="mt-4 text-[13px] font-medium text-[#1E3A5F]/50">
              {t.hero.disclaimer}
            </p>
          </div>

          {/* Right — mockup */}
          <AnimatedGroup
            variants={{
              container: {
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.85 } },
              },
              ...transitionVariants,
            }}
          >
            <div className="rounded-2xl border border-white/40 shadow-2xl shadow-[#0B1F3B]/20 ring-1 ring-white/20 bg-white/10 backdrop-blur-sm p-3">
              <ProductMockup />
            </div>
          </AnimatedGroup>

        </div>
      </div>
    </section>
  )
}
