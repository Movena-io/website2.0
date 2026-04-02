'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const TYPEFORM_URL = 'https://form.typeform.com/to/BD0lEb77'

const faqs = [
  {
    question: 'When is Movena launching?',
    answer: "We are currently in early access. Join the waitlist and you will get a personal invite when we open.",
  },
  {
    question: 'How long does getting set up take?',
    answer: "About 15 minutes. You add your services, pricing rules, and team. No onboarding call required.",
  },
  {
    question: 'What integrations do you support?',
    answer: 'Movena connects with e-conomic for accounting, Stripe and MobilePay for payments, and Google Calendar for scheduling. More integrations are coming based on what our early customers need.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. All data is encrypted in transit and at rest. We follow GDPR requirements and can provide a Data Processing Agreement (DPA) for any company that needs it.',
  },
  {
    question: 'How much does it cost?',
    answer: "Pricing is per user, per month. Exact plans are being finalized. Join the waitlist now and you will get founding member pricing, which will be lower than our standard rates at launch.",
  },
  {
    question: 'Can my crew use it on their phones?',
    answer: 'Yes. The crew app is built for mobile first. Crew members get job details, navigation, signature capture, and photo documentation all on their phone. No laptop required.',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-[#E2E8F0]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        aria-expanded={open}
      >
        <span className="text-[16px] font-semibold text-[#0F172A]">{question}</span>
        <ChevronDown
          size={18}
          strokeWidth={1.5}
          className={`text-[#475569] flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <p className="text-[16px] font-normal text-[#475569] leading-[1.6] pb-5">
          {answer}
        </p>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <section className="bg-white py-24" id="faq">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16">

          <div className="md:w-[280px] flex-shrink-0">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#1D4ED8]/30" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1D4ED8]">FAQ</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#1D4ED8]/30" />
            </div>
            <h2 className="text-[36px] font-bold leading-[1.2] tracking-[-0.02em] text-[#0B1F3B]">
              Questions we hear a lot
            </h2>
            <p className="mt-4 text-[16px] font-normal leading-[1.6] text-[#475569]">
              Still have something on your mind? Reach out directly.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center mt-6 text-[14px] font-semibold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
            >
              Contact us
            </a>
          </div>

          <div className="flex-1 border-t border-[#E2E8F0]">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
