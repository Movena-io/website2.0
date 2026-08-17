'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PainPoints from '@/components/PainPoints'
import SplitSection from '@/components/SplitSection'
import Chain from '@/components/Chain'
import QuoteFormSection from '@/components/QuoteFormSection'
import RestOfSystem from '@/components/RestOfSystem'
import WhoWeAre from '@/components/WhoWeAre'
import Setup from '@/components/Setup'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import { useLanguage } from '@/lib/LanguageContext'

export default function Home() {
  const { t } = useLanguage()

  return (
    <>
      <Header />
      <main>
        <Hero />
        <PainPoints />
        <SplitSection
          headline={t.office.headline}
          text={t.office.text}
          points={t.office.points}
        />
        <SplitSection
          headline={t.team.headline}
          text={t.team.text}
          points={t.team.points}
          reverse
        />
        <Chain />
        <QuoteFormSection />
        <RestOfSystem />
        <WhoWeAre />
        <Setup />
        <section id="features" className="scroll-mt-24" aria-hidden />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
