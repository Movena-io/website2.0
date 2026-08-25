'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PainPoints from '@/components/PainPoints'
import SplitSection from '@/components/SplitSection'
import Chain from '@/components/Chain'
import QuoteFormSection from '@/components/QuoteFormSection'
import RestOfSystem from '@/components/RestOfSystem'
import WhoWeAre from '@/components/WhoWeAre'
import EstimatorCTA from '@/components/EstimatorCTA'
import Setup from '@/components/Setup'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import { useLanguage } from '@/lib/LanguageContext'

export default function Home() {
  const { t, locale } = useLanguage()

  return (
    <>
      <Header />
      <main>
        <Hero />
        <PainPoints />
        <SplitSection
          id="office"
          headline={t.office.headline}
          highlight={t.office.highlight}
          headlineEnd={t.office.headlineEnd}
          text={t.office.text}
          points={t.office.points}
          bottomHint
          screenshotSrc="/screenshots/kontor.png"
          screenshotAlt="Movenas kontormodul med overblik over opgaver og planlægning"
        />
        {/* Team + Chain: continuous dark block */}
        <div style={{ background: '#060F1F', position: 'relative', overflow: 'hidden' }}>
          {/* Shared radial glow spanning both sections */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 50% 35%, rgba(30,58,138,0.18) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <SplitSection
            headline={t.team.headline}
            highlight={t.team.highlight}
            headlineEnd={t.team.headlineEnd}
            text={t.team.text}
            points={t.team.points}
            reverse
            dark
            screenshotSrc={`/screenshots/kontor-app-${locale}.png`}
            screenshotAlt={locale === 'da' ? 'Movenas app til medarbejdere med dagens job og tidsregistrering' : 'Movena\'s crew app with today\'s jobs and time tracking'}
            screenshotBare
          />
          <Chain />
        </div>
        <QuoteFormSection />
        <RestOfSystem />
        <WhoWeAre />
        <EstimatorCTA />
        <Setup />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
