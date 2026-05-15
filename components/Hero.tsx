'use client'

import { motion, Variants } from 'framer-motion'
import { ArrowRight, Volume2, VolumeX } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SIGNUP_URL } from '@/lib/constants'
import { trackSignupClick } from '@/lib/tracking'
import { useLanguage } from '@/lib/LanguageContext'
import { ReactNode, useRef, useState } from 'react'

// ─── Animation helpers ────────────────────────────────────────────────

const transitionVariants: { item: Variants } = {
  item: {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', bounce: 0.3, duration: 1.2 },
    },
  },
}

function AnimatedGroup({
  children,
  className,
  variants,
  delayChildren = 0.1,
  staggerChildren = 0.1,
}: {
  children: ReactNode
  className?: string
  variants?: { container?: Variants; item?: Variants }
  delayChildren?: number
  staggerChildren?: number
}) {
  const containerVariants: Variants = variants?.container ?? {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren, delayChildren } },
  }
  const itemVariants: Variants = variants?.item ?? transitionVariants.item

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

// ─── Glow: soft radial that wraps around and sits above the video ─────

function Glow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 overflow-visible">
      {/* Outer wide blue ambient — extends well above + outside the video */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-24 sm:-top-40 h-[640px] w-[140%] max-w-[1500px] rounded-[50%]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(29,78,216,0.30) 0%, rgba(29,78,216,0.10) 35%, rgba(29,78,216,0) 65%)',
        }}
      />
      {/* Inner brighter teal accent — halo around the top of the video */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-16 sm:-top-28 h-[400px] w-[80%] max-w-[900px] rounded-[50%]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(41,171,226,0.35) 0%, rgba(41,171,226,0) 60%)',
        }}
      />
    </div>
  )
}

// ─── Mockup frame: subtle border + tinted padding around the video ────

function MockupFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative rounded-2xl bg-white/5 p-2 sm:p-3 shadow-2xl shadow-[#0B1F3B]/15 ring-1 ring-[#0B1F3B]/5 backdrop-blur-sm">
      <div className="overflow-hidden rounded-xl border border-[#0B1F3B]/10 bg-white">
        {children}
      </div>
    </div>
  )
}

// ─── Hero video with mute toggle ──────────────────────────────────────

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  function toggleMuted() {
    const v = videoRef.current
    if (!v) return
    const next = !muted
    v.muted = next
    setMuted(next)
    if (!next && v.paused) v.play().catch(() => {})
  }

  return (
    <figure className="relative" role="img" aria-label="Movena product walkthrough video">
      <video
        ref={videoRef}
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

      <button
        type="button"
        onClick={toggleMuted}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        className="absolute bottom-3 right-3 inline-flex items-center justify-center h-9 w-9 rounded-full bg-[#0B1F3B]/80 backdrop-blur text-white hover:bg-[#0B1F3B] transition-colors"
      >
        {muted ? <VolumeX size={16} strokeWidth={2} /> : <Volume2 size={16} strokeWidth={2} />}
      </button>
    </figure>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-12 sm:pt-24 sm:pb-20 md:pt-28">
        <div className="flex flex-col items-center gap-8 sm:gap-12 text-center">

          {/* Headline + subhead */}
          <AnimatedGroup
            delayChildren={0.05}
            staggerChildren={0.12}
            className="flex flex-col items-center gap-5 sm:gap-7 max-w-3xl"
          >
            <h1 className="bg-gradient-to-b from-[#0B1F3B] via-[#0B1F3B] to-[#475569] bg-clip-text text-transparent text-[40px] sm:text-[56px] lg:text-[68px] font-semibold leading-[1.05] tracking-[-0.035em]">
              {t.hero.headline}{' '}
              <span className="bg-gradient-to-r from-[#1D4ED8] to-[#29ABE2] bg-clip-text text-transparent">
                {t.hero.highlight}
              </span>
            </h1>

            <p className="max-w-[560px] text-[16px] sm:text-[18px] text-[#475569] leading-[1.6] font-normal">
              {t.hero.subheadline}
            </p>
          </AnimatedGroup>

          {/* CTAs */}
          <AnimatedGroup
            delayChildren={0.4}
            staggerChildren={0.08}
            className="flex flex-col sm:flex-row items-center gap-3"
            variants={{
              container: {
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
              },
              item: {
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.25, duration: 0.9 } },
              },
            }}
          >
            <a
              href={SIGNUP_URL}
              onClick={() => trackSignupClick('hero')}
              className="btn-gradient inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl text-white text-[15px] font-semibold"
            >
              <span>{t.hero.primaryCta}</span>
              <ArrowRight size={15} strokeWidth={2} />
            </a>

            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl text-[15px] font-semibold text-[#0B1F3B] bg-white border border-[#E2E8F0] hover:border-[#1D4ED8]/40 hover:bg-[#F8FAFC] transition-colors"
            >
              <span>{t.hero.secondaryCta}</span>
            </a>
          </AnimatedGroup>

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-[13px] text-[#64748B] -mt-2"
          >
            {t.hero.disclaimer}
          </motion.p>

          {/* Video with glow */}
          {/*
            Glow lives OUTSIDE the motion.div so it stays at full opacity
            after the entry animation finishes. The motion.div only animates
            the mockup itself, not the surrounding light.
          */}
          <div className="relative w-full max-w-[1100px] -mt-[10px]">
            <Glow />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <MockupFrame>
                <HeroVideo />
              </MockupFrame>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
