'use client'

import { useEffect, useRef } from 'react'
import { CheckCircle } from 'lucide-react'

interface SplitSectionProps {
  headline: string
  text: string
  points: string[]
  reverse?: boolean
  screenshotSrc?: string
  screenshotAlt?: string
}

export default function SplitSection({
  headline,
  text,
  points,
  reverse = false,
  screenshotSrc,
  screenshotAlt = '',
}: SplitSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const targets = sectionRef.current
      ? Array.from(sectionRef.current.querySelectorAll('.reveal'))
      : []
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`reveal flex flex-col gap-10 items-center ${
            reverse ? 'md:flex-row-reverse' : 'md:flex-row'
          }`}
        >
          {/* Text */}
          <div className="flex-1">
            <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-semibold tracking-[-0.02em] text-[#0B1F3B] leading-[1.2] mb-5">
              {headline}
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#475569] leading-[1.7] mb-6">
              {text}
            </p>
            <ul className="flex flex-col gap-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle size={15} strokeWidth={1.5} className="text-[#1D4ED8] mt-0.5 shrink-0" />
                  <span className="text-[14px] font-medium text-[#0F172A]">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Screenshot placeholder */}
          {screenshotSrc ? (
            <div className="flex-1 max-w-[520px]">
              <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm">
                <img src={screenshotSrc} alt={screenshotAlt} className="block w-full h-auto" />
              </div>
            </div>
          ) : (
            <div className="flex-1 max-w-[520px]">
              <div className="rounded-2xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] aspect-[4/3] flex items-center justify-center">
                <span className="text-[13px] text-[#94A3B8]">Screenshot</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
