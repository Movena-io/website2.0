'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLanguage, useLocalizedHref } from '@/lib/LanguageContext'

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false)
  const questionId = `faq-question-${index}`
  const answerId = `faq-answer-${index}`

  return (
    <div className="border-b border-[#E2E8F0]">
      <button
        id={questionId}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        aria-expanded={open}
        aria-controls={answerId}
      >
        <span className="text-[16px] font-semibold text-[#0F172A]">{question}</span>
        <ChevronDown
          size={18}
          strokeWidth={1.5}
          className={`text-[#475569] flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div id={answerId} role="region" aria-labelledby={questionId}>
          <p className="text-[16px] font-normal text-[#475569] leading-[1.6] pb-5">
            {answer}
          </p>
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  const { t } = useLanguage()
  const href = useLocalizedHref()

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

  return (
    <section className="bg-white py-24 scroll-mt-24" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16">

          <div className="md:w-[280px] flex-shrink-0">
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1D4ED8]">{t.faq.label}</span>
            <h2 className="mt-3 text-[28px] sm:text-[36px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#0B1F3B]">
              {t.faq.headline}
            </h2>
            <p className="mt-4 text-[16px] font-normal leading-[1.6] text-[#475569]">
              {t.faq.subheadline}
            </p>
            <a
              href={href('/contact')}
              className="inline-flex items-center mt-6 text-[14px] font-semibold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
            >
              {t.faq.contactLink}
            </a>
          </div>

          <div className="flex-1 border-t border-[#E2E8F0]">
            {t.faq.items.map((faq, i) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
