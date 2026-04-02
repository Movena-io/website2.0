'use client'

import { useEffect, useRef } from 'react'

const pains = [
  {
    title: 'Quotes from a spreadsheet',
    description:
      'Every job means pulling up a template, running numbers by hand, and hoping you got the pricing right. Then formatting it into an email that looks halfway professional.',
  },
  {
    title: 'Scheduling in WhatsApp',
    description:
      'Booking a job is a thread of messages, a separate calendar invite, and a follow-up call to confirm. One miscommunication and two crews show up to the same address.',
  },
  {
    title: 'Crew calls every morning',
    description:
      "Your team doesn't know where to be until you tell them. Every day starts with calls to make sure everyone has the right address, the right time, and the right gear.",
  },
  {
    title: 'Invoices you have to chase yourself',
    description:
      "The job is done but the money isn't in. You have to find time to write the invoice, send it, and then follow up when it goes past due. Again.",
  },
]

export default function PainPoints() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const targets = sectionRef.current
      ? Array.from(sectionRef.current.querySelectorAll('.reveal'))
      : []
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#EFF6FF] py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal text-center mb-16">
          <div className="flex items-center gap-4 justify-center mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#1D4ED8]/40" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1D4ED8]">The problem</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#1D4ED8]/40" />
          </div>
          <h2 className="text-[36px] lg:text-[44px] font-bold tracking-[-0.02em] text-[#0B1F3B] leading-[1.2]">
            Running a moving company <span className="text-[#F97316]">shouldn&apos;t feel this messy</span>
          </h2>
          <p className="mt-4 text-[18px] font-normal text-[#475569] max-w-[520px] mx-auto leading-[1.7]">
            Most moving companies are running their business on a patchwork of tools that were never built for the job.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {pains.map(({ title, description }, i) => (
            <div
              key={title}
              className={`reveal py-10 px-8 ${
                i % 2 === 0 ? 'md:pr-16' : 'md:pl-16'
              } ${
                i < 2 ? 'border-b border-[#BFDBFE]' : ''
              } ${
                i % 2 === 0 ? 'md:border-r md:border-[#BFDBFE]' : ''
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <h3 className="text-[20px] font-bold text-[#0B1F3B] mb-3 leading-[1.25]">{title}</h3>
              <p className="text-[15px] font-normal text-[#475569] leading-[1.75]">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
