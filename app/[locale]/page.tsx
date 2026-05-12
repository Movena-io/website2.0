import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PainPoints from '@/components/PainPoints'
import Consolidation from '@/components/Consolidation'
import Features from '@/components/Features'
import Pricing from '@/components/Pricing'
import Problem from '@/components/Problem'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PainPoints />
        <Consolidation />
        <Features />
        <Pricing />
        <Problem />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
