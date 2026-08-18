'use client'

import { useEffect, useRef } from 'react'
import { CheckCircle } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

interface SplitSectionProps {
  headline: string
  text: string
  points: string[]
  reverse?: boolean
  dark?: boolean
  screenshotSrc?: string
  screenshotAlt?: string
}

export default function SplitSection({
  headline,
  text,
  points,
  reverse = false,
  dark = false,
  screenshotSrc,
  screenshotAlt = '',
}: SplitSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { locale } = useLanguage()

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const targets = Array.from(section.querySelectorAll('.reveal, .reveal-point'))
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const placeholderText = locale === 'da' ? 'Skærmbillede kommer' : 'Screenshot coming'

  return (
    <section
      ref={sectionRef}
      className={dark ? 'py-16 md:py-24' : 'bg-white py-16 md:py-24'}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`reveal flex flex-col gap-10 items-center ${
            reverse ? 'md:flex-row-reverse' : 'md:flex-row'
          }`}
        >
          {/* Text */}
          <div className="flex-1">
            <h2 className={`text-[28px] sm:text-[36px] lg:text-[44px] font-semibold tracking-[-0.02em] leading-[1.2] mb-5 ${dark ? 'text-white' : 'text-[#0B1F3B]'}`}>
              {headline}
            </h2>
            <p className={`text-[16px] sm:text-[17px] leading-[1.7] mb-6 ${dark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
              {text}
            </p>
            <ul className="flex flex-col gap-3">
              {points.map((point, i) => (
                <li
                  key={point}
                  className="reveal-point flex items-start gap-3"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <CheckCircle size={15} strokeWidth={1.5} className="text-[#60A5FA] mt-0.5 shrink-0" />
                  <span className={`text-[14px] font-medium ${dark ? 'text-white/90' : 'text-[#0F172A]'}`}>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Screenshot placeholder */}
          {screenshotSrc ? (
            <div className="flex-1 max-w-[520px]">
              <div className={`rounded-2xl overflow-hidden border shadow-sm ${dark ? 'border-white/10' : 'border-[#E2E8F0]'}`}>
                <img src={screenshotSrc} alt={screenshotAlt} className="block w-full h-auto" />
              </div>
            </div>
          ) : (
            <div className="flex-1 max-w-[520px]">
              <div
                className="rounded-2xl aspect-[4/3] flex items-center justify-center"
                style={{
                  background: dark
                    ? 'linear-gradient(135deg, rgba(96,165,250,0.08) 0%, rgba(30,58,138,0.12) 100%)'
                    : 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
                  border: dark ? '1px solid rgba(96,165,250,0.15)' : '1px solid #E2E8F0',
                }}
              >
                <span className={`text-[13px] ${dark ? 'text-white/30' : 'text-[#94A3B8]'}`}>{placeholderText}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
