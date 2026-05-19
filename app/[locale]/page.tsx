import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PainPoints from '@/components/PainPoints'
import Consolidation from '@/components/Consolidation'
import Features from '@/components/Features'
import Setup from '@/components/Setup'
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
        <Setup />
        <Problem />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
