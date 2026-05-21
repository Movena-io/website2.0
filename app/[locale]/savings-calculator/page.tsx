'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SavingsCalculator from '@/components/calculator/SavingsCalculator'

export default function SavingsCalculatorPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <SavingsCalculator />
      </main>
      <Footer />
    </>
  )
}
