'use client'

import { useEffect, useRef } from 'react'

const steps = [
  {
    number: '01',
    title: 'Set up your company',
    description: 'Add your services, pricing rules, and team. Takes about 15 minutes. No onboarding call required.',
  },
  {
    number: '02',
    title: 'Send your first quote',
    description: 'Fill in the job details and Movena builds the quote automatically. Send it to the customer in one click.',
  },
  {
    number: '03',
    title: 'Run the job',
    description: 'Crew gets their job details automatically. No morning calls, no messages to confirm who is going where.',
  },
  {
    number: '04',
    title: 'Get paid',
    description: 'The invoice goes out automatically when the job is done. Payments land in your account. No chasing.',
  },
]

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const targets = sectionRef.current
      ? Array.from(sectionRef.current.querySelectorAll('.reveal'))
      : []
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="how-it-works" ref={sectionRef} className="bg-white py-24 border-t border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-6">

        <div className="reveal text-center mb-16">
          <div className="flex items-center gap-4 justify-center mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#1D4ED8]/30" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1D4ED8]">How it works</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#1D4ED8]/30" />
          </div>
          <h2 className="text-[36px] lg:text-[44px] font-bold tracking-[-0.02em] text-[#0B1F3B] leading-[1.2]">
            Up and running in an afternoon
          </h2>
          <p className="mt-4 text-[18px] font-normal text-[#475569] max-w-[460px] mx-auto leading-[1.7]">
            No long setup, no training sessions. Movena is built to be picked up fast.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line across all steps — desktop only */}
          <div className="hidden lg:block absolute top-[23px] left-[calc(12.5%+8px)] right-[calc(12.5%+8px)] h-px bg-[#E2E8F0]" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map(({ number, title, description }, i) => (
              <div
                key={number}
                className="reveal flex flex-col items-center text-center"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-white border-2 border-[#1D4ED8]/30 flex items-center justify-center mb-5 relative z-10 shrink-0">
                  <span className="text-[13px] font-extrabold text-[#1D4ED8]">{number}</span>
                </div>
                <h3 className="text-[16px] font-bold text-[#0B1F3B] mb-2">{title}</h3>
                <p className="text-[14px] font-normal text-[#475569] leading-[1.65]">{description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
