'use client'

import { useLanguage } from '@/lib/LanguageContext'
import type { Locale } from '@/lib/locales'

/** `t(da, en)`: the design is written in Danish; English sits next to it. */
export function useT() {
  const { locale } = useLanguage()
  const t = <T,>(da: T, en: T): T => (locale === 'en' ? en : da)
  return { t, locale: locale as Locale }
}

/** Money in the product mockups: "12.450 kr." on /da, "DKK 12,450" on /en,
 *  the convention the current English pages already use. */
export function useMoney() {
  const { locale } = useLanguage()
  return (amount: string) => {
    if (locale !== 'en') return `${amount} kr.`
    return `DKK ${amount.replace(/\./g, ',')}`
  }
}
