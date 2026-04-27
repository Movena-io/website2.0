'use client'

import { createContext, useCallback, useContext, ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { translations, Translations } from './translations'
import { LOCALES, isLocale, type Locale } from './locales'

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: 'en',
  setLocale: () => {},
  t: translations.en,
})

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: ReactNode
  initialLocale: Locale
}) {
  const router = useRouter()
  const pathname = usePathname()

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === initialLocale) return
      const segments = (pathname || '/').split('/').filter(Boolean)
      if (segments.length > 0 && isLocale(segments[0])) {
        segments[0] = next
      } else {
        segments.unshift(next)
      }
      router.push('/' + segments.join('/'))
    },
    [pathname, router, initialLocale],
  )

  return (
    <LanguageContext.Provider value={{ locale: initialLocale, setLocale, t: translations[initialLocale] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

export function useLocalizedHref() {
  const { locale } = useLanguage()
  return useCallback(
    (path: string) => {
      if (!path) return path
      if (path.startsWith('http://') || path.startsWith('https://')) return path
      if (path.startsWith('#')) return path
      if (path.startsWith('mailto:') || path.startsWith('tel:')) return path
      if (!path.startsWith('/')) return path
      const trimmed = path === '/' ? '' : path
      return `/${locale}${trimmed}`
    },
    [locale],
  )
}

export { LOCALES }
