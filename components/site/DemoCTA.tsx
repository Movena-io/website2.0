'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'
import { ROUTES, NAV, PHONE_HREF } from '@/lib/site-nav'
import MovenaMark from '@/components/site/MovenaMark'
import type { Locale } from '@/lib/locales'

type Copy = {
  headLead: string
  headAccent: string
  intro: string
  steps: { title: string; text: string }[]
  cardTitle: string
  cardBadge: string
  from: string
  to: string
  date: string
  crew: string
  price: string
  priceNote: string
}

const COPY: Record<Locale, Copy> = {
  da: {
    headLead: 'Se Movena med ',
    headAccent: 'en af jeres egne flytninger',
    intro:
      'Book en gratis demo. I stedet for et standardeksempel viser vi systemet med en opgave, I selv har i kalenderen.',
    steps: [
      { title: 'Udfyld formularen', text: 'Så ringer vi jer op.' },
      { title: 'Tag en flytning med', text: 'Vælg en opgave fra kalenderen. Adresser, dato og jeres pris er nok.' },
      {
        title: 'Vi lægger den ind sammen',
        text: 'I ser den gå fra forespørgsel til planlægning og faktura, og bestemmer selv, om Movena passer til jer.',
      },
    ],
    cardTitle: 'Jeres flytning i Movena',
    cardBadge: 'Ny',
    from: 'Fra',
    to: 'Til',
    date: 'Dato',
    crew: 'Bil og hold',
    price: 'Pris',
    priceNote: 'Det udfylder vi sammen på demoen',
  },
  en: {
    headLead: 'See Movena with ',
    headAccent: 'one of your own moves',
    intro:
      'Book a free demo. Instead of a standard example, we show you the system with a job from your own calendar.',
    steps: [
      { title: 'Fill in the form', text: "Then we'll call you." },
      { title: 'Bring a move', text: 'Pick a job from the calendar. Addresses, date and your price are enough.' },
      {
        title: 'We enter it together',
        text: 'You see it go from request to planning and invoice, and decide for yourselves whether Movena is right for you.',
      },
    ],
    cardTitle: 'Your move in Movena',
    cardBadge: 'New',
    from: 'From',
    to: 'To',
    date: 'Date',
    crew: 'Vehicle and crew',
    price: 'Price',
    priceNote: 'We fill that in together on the demo',
  },
}

// Dashed placeholder line used throughout the mockup card.
function Blank({ width }: { width?: number }) {
  return (
    <div
      className="mt-1.5 border-b-2 border-dashed border-[#C9D3E0]"
      // content-box on purpose: in the design the 2px border sits outside the
      // 10px height, so each line is 12px tall. Under border-box the four
      // lines in this card came out 8px short in total.
      style={{ height: '10px', boxSizing: 'content-box', ...(width ? { width } : {}) }}
    />
  )
}

function Field({ label, width }: { label: string; width?: number }) {
  return (
    <div className="min-w-0 flex-[1_1_auto]">
      <div className="text-[12px] font-semibold text-[#4A5B73]">{label}</div>
      <Blank width={width} />
    </div>
  )
}

export default function DemoCTA() {
  const { locale } = useLanguage()
  const c = COPY[locale]
  const r = ROUTES[locale]
  const nav = NAV[locale]

  return (
    <section
      className="text-white"
      data-app=""
      style={{
        background:
          'radial-gradient(ellipse 85% 70% at 50% 35%, #10284A 0%, #0A1A33 45%, #060F1F 100%)',
        padding: 'clamp(48px, 5.5vw, 80px) 0',
      }}
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center"
        // clamp() in arbitrary Tailwind values is not emitted here, and losing
        // it made the row full-bleed at 390 so the buttons stopped wrapping.
        style={{ gap: '48px clamp(40px, 6vw, 88px)', padding: '0 clamp(20px, 5vw, 64px)' }}>
        <div className="min-w-0 flex-[1_1_440px]">
          <h2
            className="m-0 max-w-[16ch] font-semibold leading-[1.05] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(34px, 4.2vw, 56px)' }}
          >
            {c.headLead}
            <span
              style={{
                background: 'linear-gradient(90deg, #4F8FF7 0%, #7CC0F5 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {c.headAccent}
            </span>
          </h2>

          <p
            className="mt-[18px] max-w-[32em] leading-[1.55] text-[#B7C4D8]"
            style={{ fontSize: 'clamp(17px, 1.4vw, 19px)' }}
          >
            {c.intro}
          </p>

          <ol className="m-0 mt-8 flex max-w-[34em] list-none flex-col gap-5 p-0">
            {c.steps.map((step, i) => (
              <li key={step.title} className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2BA8E0] text-[16px] font-semibold text-[#0B1F3B]"
                >
                  {i + 1}
                </span>
                <div className="min-w-0 pt-[5px]">
                  <div className="text-[18px] font-semibold leading-[1.3]">{step.title}</div>
                  <div className="mt-1 text-[16px] leading-[1.5] text-[#B7C4D8]">{step.text}</div>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href={r.bookDemo}
              className="inline-flex h-[52px] items-center rounded-lg bg-white px-6 text-[16px] font-semibold text-[#0B1F3B] no-underline transition-transform duration-200 hover:-translate-y-0.5"
            >
              {nav.bookDemo}
            </Link>
            <a
              href={PHONE_HREF}
              className="box-border inline-flex h-[52px] items-center rounded-lg border border-[#5E7394] px-6 text-[16px] font-semibold text-white no-underline transition-transform duration-200 hover:-translate-y-0.5"
            >
              {nav.callUs}
            </a>
          </div>
        </div>

        {/* Mockup card */}
        <div aria-hidden="true" className="min-w-0 max-w-[440px] flex-[1_1_340px]">
          <div className="relative pl-[18px] pt-[18px]">
            <div className="absolute bottom-[18px] left-0 right-[18px] top-0 rounded-[24px] bg-[#1D4ED8]" />
            <div
              className="relative flex flex-col gap-4 rounded-[20px] bg-white text-[#0B1F3B]"
              style={{
                padding: 'clamp(20px, 2.4vw, 28px)',
                boxShadow: '0 24px 48px -16px rgba(0, 0, 0, 0.45)',
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-[19px] font-semibold tracking-[-0.02em]">{c.cardTitle}</div>
                <span className="inline-flex h-[26px] items-center rounded-[13px] bg-[#E6EDFC] px-2.5 text-[13px] font-semibold text-[#1D4ED8]">
                  {c.cardBadge}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <MovenaMark width={18} height={22} backFill="#0B1F3B" frontFill="transparent" style={{ flexShrink: 0 }} />
                <Field label={c.from} />
              </div>
              <div className="flex items-center gap-3">
                <MovenaMark width={18} height={22} backFill="#1D4ED8" frontFill="transparent" style={{ flexShrink: 0 }} />
                <Field label={c.to} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[12px] font-semibold text-[#4A5B73]">{c.date}</div>
                  <Blank />
                </div>
                <div>
                  <div className="text-[12px] font-semibold text-[#4A5B73]">{c.crew}</div>
                  <Blank />
                </div>
              </div>

              <div className="flex items-end justify-between gap-3 border-t border-[#E3E8EF] pt-4">
                <div>
                  <div className="text-[12px] font-semibold text-[#4A5B73]">{c.price}</div>
                  <Blank width={120} />
                </div>
                <div className="text-[13px] text-[#4A5B73]">{c.priceNote}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
