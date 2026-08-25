'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

function FAQCard({ question, answer, index, open, onToggle }: {
  question: string
  answer: string
  index: number
  open: boolean
  onToggle: () => void
}) {
  const questionId = `faq-question-${index}`
  const answerId = `faq-answer-${index}`

  return (
    <div
      className="faq-item relative rounded-xl border overflow-hidden transition-colors duration-200"
      style={{
        transitionDelay: `${index * 60}ms`,
        borderColor: open ? '#E2E8F0' : undefined,
        background: open ? '#FBFDFF' : '#FFFFFF',
      }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] transition-opacity duration-250 ease-out"
        style={{
          background: 'linear-gradient(to bottom, #1D4ED8, #60A5FA)',
          opacity: open ? 1 : 0,
        }}
      />

      <button
        id={questionId}
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 group"
        aria-expanded={open}
        aria-controls={answerId}
      >
        <span
          className={`text-[16px] font-medium transition-colors duration-200 ${
            open ? 'text-[#2563EB]' : 'text-[#0F172A]'
          }`}
        >
          {question}
        </span>
        <ChevronDown
          size={18}
          strokeWidth={1.5}
          className={`shrink-0 transition-all duration-200 ${
            open
              ? 'rotate-180 text-[#2563EB]'
              : 'text-[#94A3B8] group-hover:text-[#475569]'
          }`}
        />
      </button>
      <div
        id={answerId}
        role="region"
        aria-labelledby={questionId}
        className="grid transition-[grid-template-rows] duration-250 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 pt-0 text-[15px] font-normal text-[#64748B] leading-[1.7]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [openSet, setOpenSet] = useState<Set<number>>(new Set())

  const toggle = useCallback((i: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const targets = Array.from(section.querySelectorAll('.reveal, .faq-item'))
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  const phoneDigits = t.faq.contact.phone.replace(/\s/g, '')
  const telHref = phoneDigits.startsWith('+') ? `tel:${phoneDigits}` : `tel:+45${phoneDigits}`

  return (
    <section ref={sectionRef} className="bg-white py-24 scroll-mt-24 light-to-dark-hint" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Left column — sticky on desktop */}
          <div className="lg:w-[38%] shrink-0">
            <div className="lg:sticky lg:top-28">
              <div className="reveal">
                {t.faq.label && (
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1D4ED8] mb-3">{t.faq.label}</span>
                )}
                <h2 className="text-[28px] sm:text-[36px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#0B1F3B]">
                  {t.faq.headline}
                </h2>
                {t.faq.subheadline && (
                  <p className="mt-4 text-[15px] font-normal leading-[1.7] text-[#64748B]">
                    {t.faq.subheadline}
                  </p>
                )}
              </div>

              {/* Contact card — hidden on mobile, shown after questions */}
              <div className="reveal hidden lg:block mt-8 rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-colors duration-200 hover:border-[#93C5FD]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-11 h-11 rounded-full bg-[#DBEAFE] flex items-center justify-center shrink-0">
                    <span className="text-[14px] font-bold text-[#1D4ED8]">VL</span>
                  </div>
                  <div>
                    <p className="text-[15px] font-medium text-[#0F172A]">{t.faq.contact.name}</p>
                    <p className="text-[13px] text-[#64748B]">{t.faq.contact.role}</p>
                  </div>
                </div>
                <a
                  href={telHref}
                  className="block text-[16px] font-medium text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                >
                  {t.faq.contact.phone}
                </a>
                <a
                  href={`mailto:${t.faq.contact.email}`}
                  className="block text-[13px] text-[#64748B] hover:text-[#475569] transition-colors mt-1"
                >
                  {t.faq.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Right column — question cards */}
          <div className="flex-1 flex flex-col gap-3">
            {t.faq.items.map((faq, i) => (
              <FAQCard
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                index={i}
                open={openSet.has(i)}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>

          {/* Contact card — mobile only, below questions */}
          <div className="reveal lg:hidden rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-colors duration-200 hover:border-[#93C5FD]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-11 h-11 rounded-full bg-[#DBEAFE] flex items-center justify-center shrink-0">
                <span className="text-[14px] font-bold text-[#1D4ED8]">VL</span>
              </div>
              <div>
                <p className="text-[15px] font-medium text-[#0F172A]">{t.faq.contact.name}</p>
                <p className="text-[13px] text-[#64748B]">{t.faq.contact.role}</p>
              </div>
            </div>
            <a
              href={telHref}
              className="block text-[16px] font-medium text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
            >
              {t.faq.contact.phone}
            </a>
            <a
              href={`mailto:${t.faq.contact.email}`}
              className="block text-[13px] text-[#64748B] hover:text-[#475569] transition-colors mt-1"
            >
              {t.faq.contact.email}
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
