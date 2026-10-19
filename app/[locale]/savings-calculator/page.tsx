import { notFound } from 'next/navigation'
import { isLocale } from '@/lib/locales'
import BeregnerDa from '@/components/generated/BeregnerDa'
import BeregnerEn from '@/components/generated/BeregnerEn'

// One slug for both locales. Metadata, canonical and hreflang live in layout.tsx.
export default function SavingsCalculatorPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound()
  return params.locale === 'da' ? <BeregnerDa /> : <BeregnerEn />
}
