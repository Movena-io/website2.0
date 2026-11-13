'use client'

// Front page from the design (src/pages/HomePage.tsx in the export). Markup,
// class names and Danish copy are the design's. Changes:
// - placeholder text is gone: the calculator and demo leads use the current site's
//   text, the CTA/FAQ leads keep only their real sentence
// - the FAQ shows the current site's questions and answers (the design's
//   answers are placeholder text)
// - obvious typos fixed: "resourcer" -> "ressourcer", a double space in the
//   first walkthrough step, and a trailing comma in the value-section lead
import { useEffect, useRef, useState } from 'react'
import { ROUTES } from '@/lib/site-nav'
import { CallbackForm } from './Forms'
import { CallButton, CtaBand } from './Layout'
import { PhoneJobVisual, ProductVisual } from './ProductVisual'
import {
  ArrowRight,
  BarChart3,
  Calculator,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileCheck2,
  MessageSquareText,
  MousePointer2,
  Send,
  Smartphone,
  UserRound,
  Users,
  Workflow,
} from './icons'
import { useMoney, useT } from './i18n'
import { ButtonLink, Eyebrow, Heading, Lead, SectionIntro, cx } from './Ui'

type T = <V>(da: V, en: V) => V

const walkthrough = (t: T) => [
  {
    label: t('Forespørgsel', 'Enquiry'),
    title: t('En ny kunde lander direkte i jeres pipeline', 'A new customer lands straight in your pipeline'),
    type: 'crm' as const,
    text: t(
      'Alle dine henvendelser bliver samlet et sted i Movena. Har du kunden i røret, kan du også nemt manuelt oprette dem.',
      'All your enquiries are gathered in one place in Movena. If you have the customer on the phone, you can easily create them by hand too.',
    ),
    points: [
      t('Kundedata samlet fra start', 'Customer details together from the start'),
      t('Ansvarlig og næste skridt er synligt', 'Owner and next step are visible'),
      t('Ingen leads mellem to indbakker', 'No leads stuck between two inboxes'),
    ],
  },
  {
    label: t('Tilbud', 'Quote'),
    title: t('Tilbudsprocessen gjort nemmere', 'The quote process made easier'),
    type: 'quote' as const,
    text: t(
      'Beregn tilbuddet til kunden baseret på deres oplysninger og jeres egne priser, og send det til digital godkendelse, som de kan acceptere.',
      'Calculate the quote from the customer’s details and your own prices, and send it for digital approval that they can accept.',
    ),
    points: [
      t('Genbrug jeres bedste skabeloner', 'Reuse your best templates'),
      t('Kunden godkender digitalt', 'The customer approves digitally'),
      t('Status opdateres automatisk', 'Status updates automatically'),
    ],
  },
  {
    label: t('Planlægning', 'Planning'),
    title: t('Planlæg jobs med et samlet overblik', 'Plan jobs with one complete overview'),
    type: 'schedule' as const,
    text: t(
      'Fordel mandskab, køretøjer, ressourcer og andet til hvert job nemmere med et samlet overblik over det hele.',
      'Assign crew, vehicles, resources and more to every job more easily, with one overview of it all.',
    ),
    points: [
      t('Undgå ressourcekonflikter', 'Avoid resource clashes'),
      t('Se hele ugen på en flade', 'See the whole week on one screen'),
      t('Ændringer deles med det samme', 'Changes are shared straight away'),
    ],
  },
  {
    label: t('Jobbet', 'The job'),
    title: t('Mandskab får alt på appen', 'The crew gets everything in the app'),
    type: 'job' as const,
    text: t(
      'Flytteholdet ser adresser, aftaler, inventar, noter og tjeklister på mobilen og kan timeregistrere, så løn bliver lavet korrekt.',
      'The moving crew sees addresses, agreements, inventory, notes and checklists on their phone and can log their hours, so payroll comes out right.',
    ),
    points: [
      t('Samme information på kontor og mobil', 'The same information in the office and on the phone'),
      t('Billeder og noter på opgaven', 'Photos and notes on the job'),
      t('Live status uden telefonkæder', 'Live status without phone chains'),
    ],
  },
  {
    label: t('Betaling', 'Payment'),
    title: t('Tag imod betaling', 'Get paid'),
    type: 'payments' as const,
    text: t(
      'Når opgaven er afsluttet, er fakturagrundlaget klar, og I kan følge betalingen til dørs.',
      'When the job is done, the invoice details are ready, and you can follow the payment all the way.',
    ),
    points: [
      t('Timer og tillæg følger med', 'Hours and surcharges come along'),
      t('Fakturakladde uden genindtastning', 'Invoice draft without retyping'),
      t('Udeståender er synlige', 'Outstanding payments are visible'),
    ],
  },
]

const rotatingWords = (t: T) =>
  t(['forespørgsler', 'tilbud', 'flytninger', 'betalinger'], ['enquiries', 'quotes', 'moves', 'payments'])

// The design's eight FAQ questions, in the design's order. Each answer is put
// together from sentences already on movena.io or in the blog (sources noted),
// with no new features, numbers or claims. "Kan kunder betale digitalt?" is
// left out: nothing on the site or in the blog says customers can pay
// digitally, so it waits for an answer from the team.
const faqs = (t: T): Array<[string, string]> => [
  [
    // Live FAQ ("Vi sætter det op sammen med jer på et opstartsmøde", "Skal folkene lære noget nyt? Ikke meget.")
    t('Er det nemt at komme i gang med?', 'Is it easy to get started?'),
    t(
      'Ja. Vi sætter det op sammen med jer på et opstartsmøde, og folkene skal ikke lære meget nyt.',
      "Yes. We set it up together with you at a kick-off meeting, and the crew doesn't have to learn much that's new.",
    ),
  ],
  [
    // Blog: "Styr på det fra første bil" (excerpt on /da/blog)
    t('Er Movena kun til store flyttefirmaer?', 'Is Movena only for large moving companies?'),
    t(
      'Nej. Det normale råd til et lille flyttefirma er at vente med software. Men alt det, I bygger imens, skal rives ned igen, når I har mindst tid. Et system fra første bil vokser med jer.',
      'No. The usual advice to a small moving company is to wait with software. But everything you build in the meantime has to be torn down again when you have the least time. A system from the first truck grows with you.',
    ),
  ],
  [
    // Live FAQ (the app) and blog "Styr dit flyttefirma fra mobilen"
    t('Kan teamet bruge Movena på mobilen?', 'Can the team use Movena on mobile?'),
    t(
      'Ja. Folkene ser dagens job i appen, starter og stopper tiden og tager billeder, når der er brug for det. Fra telefonen kan I også oprette jobs, planlægge ugen og rykke bookinger.',
      "Yes. The crew sees today's jobs in the app, starts and stops the clock and takes photos when needed. From the phone you can also create jobs, plan the week and move bookings.",
    ),
  ],
  [
    // Live FAQ, verbatim
    t('Hvad koster det?', 'What does it cost?'),
    t(
      'Prisen afhænger af, hvor mange der bruger systemet hos jer. Vi gennemgår den med jer på demoen, så I ved præcis, hvad det koster, før I beslutter jer. Der er ingen binding.',
      "The price depends on how many people use the system at your company. We go through it with you at the demo, so you know exactly what it costs before you decide. There's no lock-in.",
    ),
  ],
  [
    // Live /da/hav-styr-paa-dagen and /en/run-the-day
    t('Hvordan virker planlægning og dispatch?', 'How do planning and dispatch work?'),
    t(
      'Flytninger og besigtigelser ligger i en kalender, med hold og bil på hver aftale. Hver flytning har kort, rute og køretid, og noterne følger med ud i appen.',
      'Moves and site visits sit in one calendar, with crew and vehicle on every booking. Every move has a map, route and drive time, and the notes go along into the app.',
    ),
  ],
  [
    // Blog (software-to-moving-companies) and live FAQ "Hvem ejer vores data?"
    t('Hvad sker der med vores nuværende data?', 'What happens to our current data?'),
    t(
      'Ligger jeres kunder og jobs i Excel, flytter vi dem over til Movena for jer. Data er jeres, og I kan hente det hele ud som fil, når I vil, også hvis I stopper.',
      'If your customers and jobs are in Excel, we help you import them into Movena as part of onboarding. The data is yours, and you can export all of it as a file whenever you want, also if you stop.',
    ),
  ],
  [
    // Live /da/om-os and /en/about
    t('Hvilken hjælp får vi undervejs?', 'What help do we get along the way?'),
    t(
      'Når I kontakter os, taler I med dem, der har bygget systemet. Ingen supportkø i et andet land, og support foregår på dansk.',
      'When you contact us, you talk to the people who built the system. No support queue in another country, and support is in English and Danish.',
    ),
  ],
]

export default function HomePage() {
  return (
    <>
      <Hero />
      <CustomersSection />
      <PainSection />
      <Walkthrough />
      <ValueSection />
      <AboutTeaser />
      <CalculatorSection />
      <div className="section-shell section-shell-tight">
        <CtaBand />
      </div>
      <FaqSection />
      <CallbackSection />
    </>
  )
}

// Not in the design export: a customer story added on request (2026-11-12),
// built from the design's own pieces (value-tag label, heading type, cards).
// One customer for now: R&H Flyt & Transport, with their own vector logo
// from rh-flyt.dk. Athene Flyttefirma's badge (public/customers/
// athene-flyttefirma.png) and its .logo-athene styles are kept for later.
function CustomersSection() {
  const { t } = useT()
  return (
    <section className="customer-story" aria-label={t('Udvalgte kunder', 'Selected customers')}>
      <div className="customer-story-inner">
        <figure className="customer-quote">
          <span className="value-tag">{t('Udvalgte kunder', 'Selected customers')}</span>
          <blockquote>
            <p>
              {t(
                '“Et helt år med dårlige og besværlige systemer. Med Movena har vi endelig fundet det, vi ledte efter.”',
                '“A whole year of bad and cumbersome systems. With Movena we have finally found what we were looking for.”',
              )}
            </p>
          </blockquote>
          <figcaption>
            <strong>Henning</strong>
            {t(', ejer af R&H Flyt & Transport', ', owner of R&H Flyt & Transport')}
          </figcaption>
        </figure>
        <ul className="customer-logos">
          <li>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="logo-rh"
              src="/customers/rh-flyt-transport.svg"
              alt="R&H Flyt & Transport"
              width={1877}
              height={549}
              loading="lazy"
            />
          </li>
        </ul>
      </div>
    </section>
  )
}

function Hero() {
  const { t, locale } = useT()
  const words = rotatingWords(t)
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setWordIndex((index) => (index + 1) % words.length), 2600)
    return () => window.clearInterval(timer)
  }, [words.length])

  return (
    <section className="hero">
      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />
      <div className="hero-route-background" aria-hidden="true">
        <svg viewBox="0 0 1600 800" preserveAspectRatio="none">
          <path d="M-120 120C250 20 410 260 760 145S1250 20 1720 175" />
          <path d="M-180 390C180 260 390 520 760 380S1260 260 1760 430" />
          <path d="M-100 690C290 540 500 760 860 625S1320 510 1740 680" />
        </svg>
        <div className="hero-background-truck">
          <i />
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="hero-inner">
        <div className="hero-copy">
          <Eyebrow>{t('Driften samlet et sted', 'Operations in one place')}</Eyebrow>
          <Heading as="h1" size="display">
            <span className="hero-heading-line">{t('Hvor flyttefirmaer styrer', 'Where moving companies run')}</span>
            <span className="hero-heading-line">
              {t('deres', 'their')}{' '}
              <span className="rotating-word-slot">
                <span key={words[wordIndex]}>{words[wordIndex]}</span>
              </span>
            </span>
          </Heading>
          <Lead>
            {t(
              'En software til flyttevirksomheder som ønsker alt samlet et sted',
              'Software for moving companies that want everything in one place',
            )}
          </Lead>
          <div className="hero-actions">
            <CallButton className="call-button-hero" />
            <a className="button button-outline" href="#saadan-virker-det">
              {t('Se hvordan det virker', 'See how it works')}
            </a>
          </div>
          <div className="hero-proof">
            <span>
              <Check /> {t('En samlet platform', 'One complete platform')}
            </span>
            <span>
              <Check /> {t('Bygget til flyttebranchen', 'Built for the moving industry')}
            </span>
          </div>
        </div>
        <HeroJourney />
      </div>
    </section>
  )
}

function HeroJourney() {
  const { t } = useT()
  return (
    <div className="hero-journey" aria-label={t('Movena vist på laptop og telefon', 'Movena shown on a laptop and a phone')}>
      <div className="hero-laptop">
        <ProductVisual type="analytics" homepage />
      </div>
      <div className="hero-phone">
        <PhoneJobVisual homepage variant="editor" />
      </div>
    </div>
  )
}

type PainVisualType = 'crew' | 'manual' | 'overview'

function PainVisual({ type }: { type: PainVisualType }) {
  const { t } = useT()
  if (type === 'crew') {
    return (
      <div className="pain-visual" aria-hidden="true">
        <svg viewBox="0 0 320 140">
          <rect className="pain-visual-surface" x="26" y="12" width="268" height="116" rx="8" />
          <path className="pain-visual-muted" d="M26 39h268M115 39v89M204 39v89" />
          <text x="44" y="30">
            {t('MANDAG', 'MONDAY')}
          </text>
          <text x="133" y="30">
            {t('TIRSDAG', 'TUESDAY')}
          </text>
          <text x="222" y="30">
            {t('ONSDAG', 'WEDNESDAY')}
          </text>
          <g className="pain-visual-shift">
            <rect x="38" y="52" width="66" height="25" rx="5" />
            <circle cx="50" cy="64.5" r="6" />
            <path d="M60 61h32M60 68h22" />
          </g>
          <g className="pain-visual-shift">
            <rect x="126" y="87" width="66" height="25" rx="5" />
            <circle cx="138" cy="99.5" r="6" />
            <path d="M148 96h32M148 103h22" />
          </g>
          <g className="pain-visual-shift pain-visual-shift-conflict">
            <rect x="215" y="52" width="66" height="25" rx="5" />
            <circle cx="227" cy="64.5" r="6" />
            <path d="M237 61h32M237 68h22" />
          </g>
          <g className="pain-visual-shift pain-visual-shift-conflict">
            <rect x="215" y="69" width="66" height="25" rx="5" />
            <circle cx="227" cy="81.5" r="6" />
            <path d="M237 78h32M237 85h22" />
          </g>
          <circle className="pain-visual-alert" cx="282" cy="48" r="10" />
          <path className="pain-visual-alert-mark" d="M282 43v6M282 53h.01" />
        </svg>
      </div>
    )
  }

  if (type === 'manual') {
    return (
      <div className="pain-visual" aria-hidden="true">
        <svg viewBox="0 0 320 140">
          <rect className="pain-visual-device" x="30" y="8" width="88" height="124" rx="14" />
          <path className="pain-visual-muted" d="M60 18h28" />
          <text x="44" y="38">
            SMS
          </text>
          <rect className="pain-visual-message" x="43" y="47" width="61" height="18" rx="7" />
          <path className="pain-visual-muted" d="M51 56h39" />
          <rect className="pain-visual-message" x="54" y="72" width="50" height="18" rx="7" />
          <path className="pain-visual-muted" d="M62 81h30" />
          <rect className="pain-visual-message" x="43" y="97" width="61" height="18" rx="7" />
          <path className="pain-visual-muted" d="M51 106h39" />
          <path className="pain-visual-loop" d="M134 54c18-18 34-18 49 0M177 46l7 8-9 5" />
          <path className="pain-visual-loop" d="M184 88c-18 18-34 18-49 0M141 96l-7-8 9-5" />
          <rect className="pain-visual-paper-back" x="196" y="25" width="92" height="101" rx="6" />
          <rect className="pain-visual-surface" x="187" y="16" width="92" height="101" rx="6" />
          <text x="202" y="37">
            {t('MANUEL LISTE', 'MANUAL LIST')}
          </text>
          <rect className="pain-visual-checkbox" x="202" y="50" width="10" height="10" rx="2" />
          <path className="pain-visual-muted" d="M220 55h42" />
          <rect className="pain-visual-checkbox" x="202" y="70" width="10" height="10" rx="2" />
          <path className="pain-visual-muted" d="M220 75h42" />
          <rect className="pain-visual-checkbox" x="202" y="90" width="10" height="10" rx="2" />
          <path className="pain-visual-muted" d="M220 95h42" />
        </svg>
      </div>
    )
  }

  return (
    <div className="pain-visual" aria-hidden="true">
      <svg viewBox="0 0 320 140">
        <path className="pain-visual-disconnected" d="M109 51 143 63M211 51l-34 12M160 83v15" />
        <rect className="pain-visual-surface" x="12" y="14" width="106" height="55" rx="7" />
        <path className="pain-visual-muted" d="M12 32h106" />
        <circle className="pain-visual-dot" cx="24" cy="23" r="3" />
        <text x="34" y="26">
          {t('KALENDER', 'CALENDAR')}
        </text>
        <path className="pain-visual-accent-line" d="M27 43h29v14H27zM62 43h19v14H62M87 43h16v14H87" />
        <rect className="pain-visual-surface" x="202" y="14" width="106" height="55" rx="7" />
        <path className="pain-visual-muted" d="M202 32h106" />
        <circle className="pain-visual-dot" cx="214" cy="23" r="3" />
        <text x="224" y="26">
          {t('INDBAKKE', 'INBOX')}
        </text>
        <path className="pain-visual-accent-line" d="M216 43h77M216 51h58M216 59h67" />
        <rect className="pain-visual-surface" x="107" y="83" width="106" height="48" rx="7" />
        <path className="pain-visual-muted" d="M107 101h106M139 101v30M177 101v30" />
        <circle className="pain-visual-dot" cx="119" cy="92" r="3" />
        <text x="129" y="95">
          {t('REGNEARK', 'SPREADSHEET')}
        </text>
        <circle className="pain-visual-question" cx="160" cy="65" r="18" />
        <text className="pain-visual-question-mark" x="154.5" y="72">
          ?
        </text>
      </svg>
    </div>
  )
}

function PainSection() {
  const { t } = useT()
  const pains = [
    {
      title: t('Du holder styr på mandskabet', 'You keep track of the crew'),
      text: t(
        'Bruge tid på opgaver, som burde kunne blive gjort smartere og hurtigere, skrive ud til hver enkelt kunde om ting, som kunne automatiseres.',
        'Spending time on tasks that should be done smarter and faster, writing to every single customer about things that could be automated.',
      ),
      visual: 'crew' as const,
    },
    {
      title: t('Du bruger meget tid på manuelt arbejde', 'You spend a lot of time on manual work'),
      text: t(
        "Du sender SMS'er ud til hver kunde omkring informationer, planlægge et job, holde styr på medarbejdere",
        'You text every customer with information, plan a job, keep track of employees',
      ),
      visual: 'manual' as const,
    },
    {
      title: t('Du mangler et bedre overblik', 'You lack a better overview'),
      text: t(
        'Planlægning, kommunikation med kunder og mandskab er alt sammen over det hele og du mangler ET SAMLET overblik.',
        'Planning, communication with customers and crew is all over the place, and you lack ONE COMPLETE overview.',
      ),
      visual: 'overview' as const,
    },
  ]
  return (
    <section className="section-shell pain-section">
      <SectionIntro
        eyebrow={t('ADMINISTRATIVT KAOS?', 'ADMIN CHAOS?')}
        title={
          <>
            {t('Du knokler hver dag,', 'You work hard every day,')}
            <br />
            {t('men virksomheden vokser ikke', "but the business isn't growing")}
            <br />
          </>
        }
        text={null}
        align="center"
      />
      <div className="three-grid">
        {pains.map((pain) => (
          <article className="pain-card" key={pain.visual}>
            <PainVisual type={pain.visual} />
            <Heading as="h3" size="md" className="pain-card-heading">
              {pain.title}
            </Heading>
            {pain.text && <p>{pain.text}</p>}
          </article>
        ))}
      </div>
      <article className="pain-conclusion">
        <Heading as="h3" size="md">
          {t('For meget at se til', 'Too much to keep an eye on')}
        </Heading>
        <p>
          {t(
            'Hvis nogle af de her ting kunne blive løst, vil du have mere tid til hvad der faktisk driver forretningen fremad.',
            'If some of these things were solved, you would have more time for what actually moves the business forward.',
          )}
        </p>
      </article>
    </section>
  )
}

function Walkthrough() {
  const { t } = useT()
  const money = useMoney()
  const rootRef = useRef<HTMLElement>(null)
  const steps = walkthrough(t)

  useEffect(() => {
    const sections = rootRef.current?.querySelectorAll<HTMLElement>('[data-walkthrough-step]')
    if (!sections?.length) return
    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => {
        section.classList.add('is-visible')
        section.dataset.animationState = 'visible'
      })
      return
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            ;(entry.target as HTMLElement).dataset.animationState = 'visible'
            observer.unobserve(entry.target)
          }
        }),
      { threshold: 0.28 },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="walkthrough-section" id="saadan-virker-det" ref={rootRef}>
      <div className="section-shell">
        <SectionIntro
          eyebrow={t('Fra lead til betaling', 'From lead to payment')}
          title={t('Sådan fungerer Movena', 'How Movena works')}
          text={t(
            'Følg hele flytningen i et samlet flow – fra den første henvendelse til jobbet er udført og betalt.',
            'Follow the whole move in one flow – from the first enquiry until the job is done and paid.',
          )}
          align="center"
        />
        {steps.map((step, index) => (
          <article
            className={cx('walkthrough-step', index % 2 === 1 && 'walkthrough-step-reverse')}
            data-walkthrough-step={index + 1}
            data-animation-state="pending"
            key={step.type}
          >
            <div className="walkthrough-copy">
              <span className="stage-count">
                0{index + 1} / 05 · {step.label}
              </span>
              <Heading as="h3" size="xl" className="walkthrough-step-heading">
                {step.title}
              </Heading>
              <Lead className="walkthrough-step-lead">{step.text}</Lead>
              <ul>
                {step.points.map((point) => (
                  <li key={point}>
                    <Check /> {point}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={cx('walkthrough-visual', step.type === 'job' && 'walkthrough-phone-stage')}
              data-walkthrough-visual={step.type}
            >
              {step.type === 'job' ? (
                <PhoneJobVisual homepage variant="schedule" />
              ) : step.type === 'quote' ? (
                <QuoteJourneyVisual />
              ) : (
                <ProductVisual
                  type={step.type}
                  compact
                  homepage
                  segmented={step.type === 'crm' || step.type === 'schedule' || step.type === 'payments'}
                />
              )}
              {step.type === 'schedule' && (
                <div className="walkthrough-float walkthrough-float-capacity" aria-hidden="true">
                  <CalendarDays />
                  <span>
                    <small>{t('Kapacitet fredag', 'Capacity Friday')}</small>
                    <strong>{t('2 ledige hold', '2 crews free')}</strong>
                  </span>
                </div>
              )}
              {step.type === 'job' && (
                <>
                  <div className="walkthrough-job-card walkthrough-job-card-status" aria-hidden="true">
                    <span className="walkthrough-live-dot" />
                    <div>
                      <small>{t('Live fra flytteholdet', 'Live from the crew')}</small>
                      <strong>{t('Jobbet er i gang', 'The job is under way')}</strong>
                    </div>
                  </div>
                  <div className="walkthrough-job-card walkthrough-job-card-note" aria-hidden="true">
                    <MessageSquareText />
                    <div>
                      <small>{t('Ny note · 08:46', 'New note · 08:46')}</small>
                      <strong>{t('Alt pakket og klar', 'All packed and ready')}</strong>
                    </div>
                  </div>
                </>
              )}
              {step.type === 'payments' && (
                <div className="walkthrough-float walkthrough-float-payment" aria-hidden="true">
                  <span className="walkthrough-payment-check">
                    <Check />
                  </span>
                  <span>
                    <small>{t('Betaling modtaget', 'Payment received')}</small>
                    <strong>{money('9.031')}</strong>
                  </span>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function QuoteJourneyVisual() {
  const { t } = useT()
  const money = useMoney()
  return (
    <div className="quote-journey" aria-label={t('Et tilbud opbygges ud fra kunden og jeres priser', 'A quote is built from the customer and your prices')}>
      <article className="quote-journey-card quote-customer-card">
        <div className="quote-card-kicker">
          <span>
            <UserRound />
          </span>
          <small>{t('KUNDE & FLYTNING', 'CUSTOMER & MOVE')}</small>
        </div>
        <strong>{t('Kunde #116', 'Customer #116')}</strong>
        <p>{t('København → Roskilde', 'Copenhagen → Roskilde')}</p>
        <dl>
          <div>
            <dt>{t('Bolig', 'Home')}</dt>
            <dd>{t('4 rum · 96 m²', '4 rooms · 96 m²')}</dd>
          </div>
          <div>
            <dt>{t('Ønsket dato', 'Preferred date')}</dt>
            <dd>{t('18. januar', '18 January')}</dd>
          </div>
        </dl>
      </article>

      <span className="quote-journey-arrow" aria-hidden="true">
        <ArrowRight />
      </span>

      <article className="quote-journey-card quote-pricing-card">
        <div className="quote-card-kicker">
          <span>
            <Calculator />
          </span>
          <small>{t('JERES PRISLOGIK', 'YOUR PRICING')}</small>
        </div>
        <div className="quote-price-row">
          <span>{t('3 mand · 4 timer', '3 movers · 4 hours')}</span>
          <strong>{money('5.400')}</strong>
        </div>
        <div className="quote-price-row">
          <span>{t('Flyttebil · 25 m³', 'Moving truck · 25 m³')}</span>
          <strong>{money('1.250')}</strong>
        </div>
        <div className="quote-price-row">
          <span>{t('Grundpris & tillæg', 'Base price & surcharges')}</span>
          <strong>{money('5.800')}</strong>
        </div>
        <div className="quote-price-total">
          <span>{t('Tilbudspris', 'Quote price')}</span>
          <strong>{money('12.450')}</strong>
        </div>
      </article>

      <span className="quote-journey-arrow" aria-hidden="true">
        <ArrowRight />
      </span>

      <article className="quote-journey-card quote-send-card">
        <span className="quote-send-icon">
          <Send />
        </span>
        <small>{t('KLAR TIL KUNDEN', 'READY FOR THE CUSTOMER')}</small>
        <strong>{t('Et professionelt tilbud', 'A professional quote')}</strong>
        <p>{t('Kunden kan gennemgå og godkende det digitalt.', 'The customer can review and approve it digitally.')}</p>
        <span className="quote-send-button">
          {t('Send tilbud', 'Send quote')} <ArrowRight />
        </span>
      </article>
    </div>
  )
}

function ValueSection() {
  const { t } = useT()
  const notifications: Array<[string, typeof Check, string, string]> = [
    ['blue', MousePointer2, t('Lead oprettet', 'Lead created'), t('Automatisk fra hjemmeside', 'Automatically from the website')],
    ['sky', FileCheck2, t('Tilbud godkendt', 'Quote approved'), t('Kunden accepterede digitalt', 'The customer accepted digitally')],
    ['green', Check, t('Job afsluttet', 'Job completed'), t('Faktura er klar', 'Invoice is ready')],
    ['blue', CalendarDays, t('Jobplan sendt', 'Job plan sent'), t('Automatisk besked til mandskab', 'Automatic message to the crew')],
    ['sky', MessageSquareText, t('Ny anmeldelse', 'New review'), t('Kunden udfyldt fra email', 'Customer filled it in from email')],
    ['green', Check, t('Påmindelse sendt', 'Reminder sent'), t('1 dag før flytning', '1 day before the move')],
  ]
  return (
    <section className="section-shell value-section">
      <div className="split-intro">
        <div>
          <Eyebrow>{t('Bygget til hverdagen', 'Built for everyday work')}</Eyebrow>
          <Heading>{t('Movena giver jer muligheden for at skalere', 'Movena gives you the means to scale')}</Heading>
        </div>
        <Lead>{t('Movena giver dig redskaberne til at vækste.', 'Movena gives you the tools to grow.')}</Lead>
      </div>
      <div className="value-bento">
        <article className="value-card value-card-wide">
          <div className="value-copy">
            <span className="value-tag">{t('Et system', 'One system')}</span>
            <Heading as="h3" size="md" className="value-wide-heading">
              {t('Alt samlet et sted - uden at skifte mellem systemer', 'Everything in one place - without switching between systems')}
            </Heading>
            <p>
              {t(
                'Movena er bygget specifikt til flytteforretninger, så leads, tilbud, planlægning, mandskab, jobs og betalinger hænger sammen et sted.',
                'Movena is built specifically for moving businesses, so leads, quotes, planning, crew, jobs and payments fit together in one place.',
              )}
            </p>
          </div>
          <div className="connection-visual">
            <span>
              <FileCheck2 />
            </span>
            <i />
            <span className="primary">
              <Workflow />
            </span>
            <i />
            <span>
              <BarChart3 />
            </span>
          </div>
        </article>
        <article className="value-card value-card-tall">
          <div className="mini-notifications">
            {notifications.map(([tone, Icon, title, detail]) => (
              <div key={title}>
                <span className={tone}>
                  <Icon />
                </span>
                <p>
                  <strong>{title}</strong>
                  <small>{detail}</small>
                </p>
                <Check />
              </div>
            ))}
            <div>
              <span className="sky">
                <Workflow />
              </span>
              <p>
                <strong>{t('Lav din egen', 'Build your own')}</strong>
                <small>{t('Kommer snart', 'Coming soon')}</small>
              </p>
              <i className="flow-soon-dot" aria-hidden="true" />
            </div>
          </div>
          <div className="value-copy">
            <span className="value-tag">{t('Automatiske flows', 'Automatic flows')}</span>
            <Heading as="h3" size="md">
              {t('De næste skridt sker af sig selv', 'The next steps happen on their own')}
            </Heading>
            <p>{t('Movena holder både kunder og mandskab opdateret gennem hele flytningen.', 'Movena keeps both customers and crew updated throughout the move.')}</p>
          </div>
        </article>
        <article className="value-card value-card-bottom">
          <div className="value-copy">
            <span className="value-tag">{t('Arbejd fra telefonen', 'Work from your phone')}</span>
            <Heading as="h3" size="md">
              {t('Styr forretningen, uanset hvor du er', 'Run the business wherever you are')}
            </Heading>
            <p>
              {t(
                'Som ejer eller administrator kan du følge med, planlægge, kommunikere og håndtere jobs direkte fra telefonen.',
                'As an owner or admin you can keep up, plan, communicate and handle jobs straight from your phone.',
              )}
            </p>
          </div>
          <div className="mobile-admin-preview">
            <div className="mobile-admin-header">
              <span>
                <Smartphone />
              </span>
              <p>
                <strong>Movena Mobile</strong>
                <small>{t('Administrator', 'Admin')}</small>
              </p>
            </div>
            <div className="mobile-actions">
              <div>
                <CalendarDays />
                <span>
                  <strong>{t('Planlæg jobs', 'Plan jobs')}</strong>
                  <small>{t('Se og ret kalenderen', 'See and edit the calendar')}</small>
                </span>
              </div>
              <div>
                <Users />
                <span>
                  <strong>{t('Fordel mandskab', 'Assign crew')}</strong>
                  <small>{t('Opdatér hold og tider', 'Update crews and times')}</small>
                </span>
              </div>
              <div>
                <MessageSquareText />
                <span>
                  <strong>{t('Send beskeder', 'Send messages')}</strong>
                  <small>{t('Kontakt kunder og team', 'Contact customers and team')}</small>
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

type ReasonIconName = 'industry' | 'influence' | 'onboarding' | 'care' | 'improve' | 'research'

function ReasonIcon({ type }: { type: ReasonIconName }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      {type === 'industry' && (
        <>
          <path d="M3.5 9.5h15v13h-15zM18.5 14h5l4 4.5v4h-9z" />
          <path d="M7.5 25.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm15 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8 9.5V6.8h6v2.7" />
        </>
      )}
      {type === 'influence' && (
        <>
          <path d="M5 6.5h22v15H15l-6.5 5v-5H5z" />
          <path d="M10 12h12M10 16h7" />
          <circle cx="23.5" cy="23.5" r="4" />
          <path d="M23.5 21.5v4M21.5 23.5h4" />
        </>
      )}
      {type === 'onboarding' && (
        <>
          <rect x="7" y="4.5" width="18" height="23" rx="2" />
          <path d="M12 10h8M12 15h8M12 20h5M3.5 16l3 3 5-6" />
        </>
      )}
      {type === 'care' && (
        <>
          <circle cx="10" cy="9" r="4" />
          <path d="M3.5 23.5c.8-5 3-7.5 6.5-7.5 2.3 0 4.1 1.1 5.2 3.3" />
          <path d="M22.5 13.5c-2.8 0-5 2-5 4.7 0 4 5 7.3 5 7.3s5-3.3 5-7.3c0-2.7-2.2-4.7-5-4.7Z" />
        </>
      )}
      {type === 'improve' && (
        <>
          <path d="M5 25.5h22M7 23v-5h5v5M14 23v-9h5v9M21 23V9h5v14" />
          <path d="m7 13 6-5 5 3 8-6M22 5h4v4" />
        </>
      )}
      {type === 'research' && (
        <>
          <circle cx="13.5" cy="13.5" r="8" />
          <path d="m19.5 19.5 7 7M10 11h7v6h-7zM11.5 11V9h4v2" />
        </>
      )}
    </svg>
  )
}

function AboutTeaser() {
  const { t, locale } = useT()
  const reasons: Array<{ title: string; text: string; icon: ReasonIconName }> = [
    {
      title: t('Bygget til flyttebranchen', 'Built for the moving industry'),
      text: t(
        'Movena er udviklet specifikt til flyttefirmaers arbejdsgange, ikke ligesom et generisk system.',
        "Movena is developed specifically for how moving companies work, not like a generic system.",
      ),
      icon: 'industry',
    },
    {
      title: t('I får indflydelse', 'You get a say'),
      text: t(
        'Jeres erfaringer og ønsker er med til at afgøre, hvilke funktioner vi bygger som det næste.',
        'Your experience and wishes help decide which features we build next.',
      ),
      icon: 'influence',
    },
    {
      title: t('Nemt at starte', 'Easy to get started'),
      text: t(
        'Vi hjælper med opsætning og onboarding, så systemet passer til jeres forretning fra første dag.',
        'We help with setup and onboarding, so the system fits your business from day one.',
      ),
      icon: 'onboarding',
    },
    {
      title: t('En partner, der kender jer', 'A partner who knows you'),
      text: t(
        'Vi lærer jeres behov at kende og prioriterer løsninger, der skaber reel værdi for jer i hverdagen.',
        'We get to know your needs and prioritise solutions that create real value for you day to day.',
      ),
      icon: 'care',
    },
    {
      title: t('Vi vokser med jer', 'We grow with you'),
      text: t(
        'Vi tilføjer løbende nye funktioner og forbedrer Movena i takt med branchen og jeres behov.',
        'We keep adding new features and improving Movena as the industry and your needs evolve.',
      ),
      icon: 'improve',
    },
    {
      title: t('Altid tæt på branchen', 'Always close to the industry'),
      text: t(
        'Vi undersøger konstant nye måder at gøre flyttefirmaer mere effektive og konkurrencedygtige.',
        'We are always looking for new ways to make moving companies more efficient and competitive.',
      ),
      icon: 'research',
    },
  ]
  const reasonsRef = useRef<HTMLDivElement>(null)
  const reasonPosition = useRef(reasons.length)
  const loopReset = useRef<number | null>(null)

  const scrollReasonsTo = (position: number, behavior: ScrollBehavior) => {
    const firstCard = reasonsRef.current?.firstElementChild as HTMLElement | null
    reasonsRef.current?.scrollTo({ left: position * ((firstCard?.offsetWidth ?? 0) + 18), behavior })
  }

  useEffect(() => {
    const frame = requestAnimationFrame(() => scrollReasonsTo(reasonPosition.current, 'auto'))
    const handleResize = () => scrollReasonsTo(reasonPosition.current, 'auto')
    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', handleResize)
      if (loopReset.current !== null) window.clearTimeout(loopReset.current)
    }
  }, [])

  const moveReasons = (direction: -1 | 1) => {
    if (loopReset.current !== null) window.clearTimeout(loopReset.current)
    const next = reasonPosition.current + direction
    reasonPosition.current = next
    scrollReasonsTo(next, 'smooth')

    loopReset.current = window.setTimeout(() => {
      if (reasonPosition.current >= reasons.length * 2) {
        reasonPosition.current -= reasons.length
        scrollReasonsTo(reasonPosition.current, 'auto')
      } else if (reasonPosition.current < reasons.length) {
        reasonPosition.current += reasons.length
        scrollReasonsTo(reasonPosition.current, 'auto')
      }
      loopReset.current = null
    }, 450)
  }

  return (
    <section className="about-teaser">
      <div className="section-shell about-inner">
        <div className="about-header">
          <div className="about-copy">
            <Eyebrow>{t('Om Movena', 'About Movena')}</Eyebrow>
            <Heading>{t('Hvorfor vælge Movena?', 'Why choose Movena?')}</Heading>
            <Lead>
              {t(
                'Movena er bygget sammen med flyttebranchen og udvikler sig med jeres forretning.',
                'Movena is built together with the moving industry and grows with your business.',
              )}
            </Lead>
          </div>
          <div className="about-header-actions">
            <ButtonLink to={ROUTES[locale].about} variant="outline" className="editor-sky-button">
              {t('Mød Movena', 'Meet Movena')} <ArrowRight size={17} />
            </ButtonLink>
            <div className="about-carousel-controls" aria-label={t('Navigér mellem grunde', 'Move between reasons')}>
              <button type="button" onClick={() => moveReasons(-1)} aria-label={t('Vis forrige grunde', 'Show previous reasons')}>
                <ChevronLeft />
              </button>
              <button type="button" onClick={() => moveReasons(1)} aria-label={t('Vis næste grunde', 'Show next reasons')}>
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
        <div className="about-reasons" ref={reasonsRef} role="region" aria-label={t('Grunde til at vælge Movena', 'Reasons to choose Movena')}>
          {[0, 1, 2].flatMap((copy) =>
            reasons.map((reason) => (
              <article className="about-reason-card" key={`${copy}-${reason.icon}`} aria-hidden={copy !== 1}>
                <div className="about-reason-icon">
                  <ReasonIcon type={reason.icon} />
                </div>
                <Heading as="h3" size="md">
                  {reason.title}
                </Heading>
                <p>{reason.text}</p>
              </article>
            )),
          )}
        </div>
      </div>
    </section>
  )
}

function CalculatorSection() {
  const { t } = useT()
  return (
    <section className="section-shell calculator-section">
      <div className="calculator-copy">
        <Eyebrow>{t('Illustrativ beregner', 'Illustrative calculator')}</Eyebrow>
        <Heading>{t('Se hvad Movena kan gøre for jer', 'See what Movena can do for you')}</Heading>
        {/* The design's lead is placeholder text; this is the current calculator page's intro. */}
        <Lead>
          {t(
            'Besvar nogle få spørgsmål om, hvordan I driver jeres forretning i dag, og få en gennemgang af, hvordan den kan optimeres.',
            'Answer a few questions about how you run your business today and get a breakdown of how you could optimize it.',
          )}
        </Lead>
        <div className="calculator-disclaimer">
          {t(
            'Eksempelvisning · resultatet er ikke en beregning eller et løfte.',
            'Example view · the result is not a calculation or a promise.',
          )}
        </div>
      </div>
      <div className="calculator-card">
        <div className="calc-fields">
          <label>
            <span>
              {t('Antal medarbejdere', 'Number of employees')} <b>12</b>
            </span>
            <input type="range" min="1" max="50" defaultValue="12" />
          </label>
          <label>
            <span>
              {t('Flytninger pr. måned', 'Moves per month')} <b>68</b>
            </span>
            <input type="range" min="1" max="150" defaultValue="68" />
          </label>
          <label>
            <span>
              {t('Systemer i brug', 'Systems in use')} <b>4</b>
            </span>
            <input type="range" min="1" max="10" defaultValue="4" />
          </label>
        </div>
        <div className="calc-result">
          <small>{t('Illustrativt potentiale', 'Illustrative potential')}</small>
          <strong>{t('Et samlet flow', 'One complete flow')}</strong>
          <p>{t('fra første forespørgsel til afsluttet betaling', 'from first enquiry to completed payment')}</p>
          <div>
            <span>
              <Check /> {t('Færre manuelle overførsler', 'Fewer manual handovers')}
            </span>
            <span>
              <Check /> {t('Et fælles kundeoverblik', 'One shared customer overview')}
            </span>
            <span>
              <Check /> {t('Samme data på kontor og mobil', 'The same data in the office and on mobile')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  const { t, locale } = useT()
  const [open, setOpen] = useState(0)
  const items = faqs(t)
  return (
    <section className="faq-section">
      <div className="section-shell faq-inner">
        <div className="faq-intro">
          <Eyebrow>{t('Spørgsmål og svar', 'Questions and answers')}</Eyebrow>
          <Heading>{t('Det, du måske gerne vil vide', 'What you might want to know')}</Heading>
          {/* The design's first sentence was placeholder text; this one is the live FAQ heading. */}
          <Lead>
            {t(
              'Det, flyttefirmaer spørger om. Kan du ikke finde svaret, tager vi gerne en snak.',
              "What moving companies ask. If you can't find the answer, we're happy to talk.",
            )}
          </Lead>
          <ButtonLink to={ROUTES[locale].bookDemo} variant="outline" className="editor-sky-button">
            {t('Tal med os', 'Talk to us')}
          </ButtonLink>
        </div>
        <div className="faq-list">
          {items.map(([question, answer], index) => (
            <article className={cx('faq-item', open === index && 'open')} key={question}>
              <button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}>
                <span>{question}</span>
                <ChevronDown />
              </button>
              {open === index && <p>{answer}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CallbackSection() {
  const { t } = useT()
  return (
    <section className="callback-section">
      <div className="section-shell callback-inner">
        <div className="callback-copy">
          <Eyebrow>{t('Se Movena i praksis', 'See Movena in practice')}</Eyebrow>
          <Heading>{t('Få en gennemgang tilpasset jeres forretning', 'Get a walkthrough tailored to your business')}</Heading>
          {/* The design's lead is placeholder text; this is the current front page's demo text. */}
          <Lead>
            {t(
              'Book en gratis demo. I stedet for et standardeksempel viser vi systemet med en opgave, I selv har i kalenderen.',
              'Book a free demo. Instead of a standard example, we show you the system with a job from your own calendar.',
            )}
          </Lead>
          <div className="callback-points">
            {[
              t('20 minutters introduktion', '20-minute introduction'),
              t('Fokus på jeres arbejdsgange', 'Focus on how you work'),
              t('Ingen forpligtelser', 'No obligations'),
            ].map((point) => (
              <span key={point}>
                <Check /> {point}
              </span>
            ))}
          </div>
        </div>
        <CallbackForm />
      </div>
    </section>
  )
}
