'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

function FormMockup({ mockup }: { mockup: {
  heading: string
  fromLabel: string
  fromPlaceholder: string
  toLabel: string
  toPlaceholder: string
  sizeLabel: string
  sizeValue: string
  floorLabel: string
  floorValue: string
  checkboxLabel: string
  priceLabel: string
  priceValue: string
  priceMeta: string
  button: string
} }) {
  return (
    <div className="quote-mockup rounded-2xl border border-[#E2E8F0] bg-white shadow-lg overflow-hidden">
      {/* Browser bar */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#F1F5F9] border-b border-[#E2E8F0]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#CBD5E1]" />
      </div>

      <div className="p-6">
        <h3 className="text-[17px] font-semibold text-[#0B1F3B] mb-5">{mockup.heading}</h3>

        {/* From */}
        <div className="mb-3">
          <span className="block text-[12px] font-medium text-[#64748B] mb-1">{mockup.fromLabel}</span>
          <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2.5">
            <span className="text-[14px] text-[#334155]">{mockup.fromPlaceholder}</span>
          </div>
        </div>

        {/* To */}
        <div className="mb-3">
          <span className="block text-[12px] font-medium text-[#64748B] mb-1">{mockup.toLabel}</span>
          <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2.5">
            <span className="text-[14px] text-[#334155]">{mockup.toPlaceholder}</span>
          </div>
        </div>

        {/* Size + Floor */}
        <div className="flex gap-3 mb-3">
          <div className="flex-1">
            <span className="block text-[12px] font-medium text-[#64748B] mb-1">{mockup.sizeLabel}</span>
            <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2.5">
              <span className="text-[14px] text-[#334155]">{mockup.sizeValue}</span>
            </div>
          </div>
          <div className="flex-1">
            <span className="block text-[12px] font-medium text-[#64748B] mb-1">{mockup.floorLabel}</span>
            <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2.5">
              <span className="text-[14px] text-[#334155]">{mockup.floorValue}</span>
            </div>
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-4 h-4 rounded border border-[#CBD5E1] bg-white shrink-0" />
          <span className="text-[13px] text-[#475569]">{mockup.checkboxLabel}</span>
        </div>

        {/* Price block */}
        <div className="quote-price rounded-xl bg-[#EFF6FF] px-5 py-4 mb-4">
          <span className="block text-[13px] font-medium text-[#64748B] mb-1">{mockup.priceLabel}</span>
          <span className="block text-[28px] font-bold text-[#2563EB] leading-none mb-1">{mockup.priceValue}</span>
          <span className="block text-[12px] text-[#94A3B8]">{mockup.priceMeta}</span>
        </div>

        {/* Button */}
        <div
          className="w-full flex items-center justify-center h-11 rounded-lg bg-[#2563EB] text-white text-[14px] font-semibold select-none"
        >
          {mockup.button}
        </div>
      </div>
    </div>
  )
}

export default function QuoteFormSection() {
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
    const targets = Array.from(section.querySelectorAll('.reveal, .quote-mockup, .quote-price'))
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#F8FAFC] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Left: text + models */}
          <div className="flex-1">
            <div className="reveal mb-10">
              {t.quoteForm.intro && (
                <p className="text-[14px] text-[#64748B] leading-[1.6] mb-4">
                  {t.quoteForm.intro}
                </p>
              )}
              <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-semibold tracking-[-0.02em] text-[#0B1F3B] leading-[1.2] mb-5">
                {t.quoteForm.headline}
                {t.quoteForm.highlight && <span className="text-[#2563EB]">{t.quoteForm.highlight}</span>}
                {t.quoteForm.headlineEnd}
              </h2>
              <p className="text-[16px] sm:text-[17px] text-[#475569] leading-[1.7]">
                {t.quoteForm.text}
              </p>
            </div>

            {/* Price model cards */}
            <div className="reveal flex flex-col gap-2 mb-6">
              {t.quoteForm.models.map((model, i) => {
                const isOpen = openSet.has(i)
                return (
                  <div
                    key={model.title}
                    className={`rounded-xl border transition-colors duration-200 ${
                      isOpen
                        ? 'border-[#3B82F6] bg-[#F8FAFF]'
                        : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'
                    }`}
                  >
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left gap-3"
                      aria-expanded={isOpen}
                    >
                      <span className={`text-[15px] font-medium ${isOpen ? 'text-[#2563EB]' : 'text-[#0F172A]'}`}>
                        {model.title}
                      </span>
                      <ChevronDown
                        size={16}
                        strokeWidth={1.5}
                        className={`shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#2563EB]' : 'text-[#94A3B8]'
                        }`}
                      />
                    </button>
                    <div
                      className="grid transition-[grid-template-rows] duration-250 ease-out"
                      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-4 text-[14px] text-[#64748B] leading-[1.7]">
                          {model.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <p className="reveal text-[14px] text-[#64748B] leading-[1.6]">
              {t.quoteForm.closingLine}
            </p>
          </div>

          {/* Right: form mockup */}
          <div className="flex-1 max-w-[420px] w-full lg:sticky lg:top-28">
            <FormMockup mockup={t.quoteForm.mockup} />
          </div>

        </div>
      </div>
    </section>
  )
}
