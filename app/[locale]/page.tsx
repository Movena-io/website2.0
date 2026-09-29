'use client'

import { useLanguage } from '@/lib/LanguageContext'
import ForsideDa from '@/components/generated/ForsideDa'
import ForsideEn from '@/components/generated/ForsideEn'

export default function Home() {
  const { locale } = useLanguage()
  return locale === 'da' ? <ForsideDa /> : <ForsideEn />
}
