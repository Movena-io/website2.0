'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/lib/LanguageContext'

// Eight short names come to roughly 1100px, which is narrower than a wide
// desktop viewport. At translateX(-50%) that would leave visible empty space
// behind the track, so each half repeats the list until it is wider than any
// realistic screen. The two halves stay identical, which is what makes the
// -50% wrap seamless.
const REPEATS = 3

function Group({ names, hideWhenStill }: { names: readonly string[]; hideWhenStill: boolean }) {
  return (
    <div
      className={`flex shrink-0 items-center${hideWhenStill ? ' marquee-dup' : ''}`}
      aria-hidden={hideWhenStill || undefined}
    >
      {names.map((name) => (
        <span
          key={name}
          className="mx-2 whitespace-nowrap rounded-full border border-[#60A5FA]/25 bg-white/[0.04] px-6 py-3 text-[16px] font-medium text-[#CBD5E1]"
        >
          {name}
        </span>
      ))}
    </div>
  )
}

function Half({ names, duplicate }: { names: readonly string[]; duplicate?: boolean }) {
  return (
    <div className="flex shrink-0 items-center">
      {Array.from({ length: REPEATS }).map((_, pass) => (
        // Only the very first group survives prefers-reduced-motion, so a
        // still marquee reads the list once instead of six times.
        <Group key={pass} names={names} hideWhenStill={Boolean(duplicate) || pass > 0} />
      ))}
    </div>
  )
}

export default function Integrations() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const targets = Array.from(section.querySelectorAll('.reveal'))
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const names = t.integrations.names

  return (
    <section
      ref={sectionRef}
      id="integrations"
      className="relative overflow-hidden py-16 md:py-20 scroll-mt-24"
      style={{ background: '#060F1F' }}
    >
      {/* Radial glow, same treatment as the other dark blocks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(37,99,235,0.16) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="reveal flex flex-col items-center gap-3 text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/40 bg-[#2563EB]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#60A5FA]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#60A5FA]" />
            {t.integrations.label}
          </span>
          <h2 className="max-w-2xl text-[28px] sm:text-[34px] lg:text-[38px] font-semibold tracking-[-0.02em] text-white leading-[1.2]">
            {t.integrations.headline}
          </h2>
          <p className="text-[15px] text-[#94A3B8] max-w-[600px] leading-[1.7]">
            {t.integrations.subheadline}
          </p>
        </div>
      </div>

      {/* Full-bleed so the loop runs off both edges rather than inside a box */}
      <div className="reveal marquee relative">
        <div className="marquee-track py-1">
          <Half names={names} />
          <Half names={names} duplicate />
        </div>
      </div>
    </section>
  )
}
