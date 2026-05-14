'use client'

import { motion, Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SIGNUP_URL } from '@/lib/constants'
import { trackSignupClick } from '@/lib/tracking'
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

// ─── Hero video ───────────────────────────────────────────────────────

function HeroVideo() {
  return (
    <figure
      className="w-full select-none rounded-xl overflow-hidden shadow-2xl shadow-[#0B1F3B]/20"
      role="img"
      aria-label="Movena product walkthrough video"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/assets/hero/hero-poster.jpg"
        className="block w-full h-auto bg-white"
      >
        <source src="/assets/hero/hero-video.mp4" type="video/mp4" />
      </video>
    </figure>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden">
      {/* Background: teal pill anchored to right edge — mobile */}
      <div
        className="absolute -z-10 lg:hidden"
        style={{
          top: '59%',
          bottom: '15%',
          right: 0,
          left: '30%',
          background: '#29ABE2',
          borderRadius: '16px 0 0 16px',
        }}
      />
      {/* Background: teal pill anchored to right edge — desktop */}
      <div
        className="absolute -z-10 hidden lg:block"
        style={{
          top: '10%',
          bottom: '10%',
          right: 0,
          left: '68%',
          background: '#29ABE2',
          borderRadius: '16px 0 0 16px',
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
              <h1 className="text-[32px] sm:text-[40px] lg:text-[46px] font-semibold leading-[1.1] tracking-[-0.03em] text-[#0B1F3B] w-full">
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
              className="mt-8 flex flex-col items-start gap-3 w-full sm:w-auto"
            >
              <div className="inline-flex flex-col items-stretch gap-1.5">
                <a
                  href={SIGNUP_URL}
                  onClick={() => trackSignupClick('hero')}
                  className="btn-gradient inline-flex items-center justify-center gap-2 h-12 rounded-xl text-white text-[15px] font-semibold"
                >
                  <span>{t.hero.primaryCta}</span>
                  <ArrowRight size={15} strokeWidth={2} />
                </a>
                <span className="text-[12px] text-[#64748B] text-center">{t.hero.disclaimer}</span>
              </div>
            </AnimatedGroup>
          </div>

          {/* Right — mockup, slides in from right */}
          <AnimatedGroup
            variants={{
              container: {
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.85 } },
              },
              item: {
                hidden: { opacity: 0, x: 48 },
                visible: { opacity: 1, x: 0, transition: { type: 'spring', bounce: 0.25, duration: 1.4 } },
              },
            }}
            className="w-full lg:-mr-[15%] lg:scale-[1.08] lg:origin-left"
          >
            <HeroVideo />
          </AnimatedGroup>

        </div>
      </div>
    </section>
  )
}
