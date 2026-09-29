'use client'

import { LanguageProvider } from '@/lib/LanguageContext'
import type { Locale } from '@/lib/locales'
import NotFoundDa from '@/components/generated/NotFoundDa'
import NotFoundEn from '@/components/generated/NotFoundEn'

// A client boundary of its own. The generated pages render blank when a server
// component renders them directly from Next's not-found boundary, so the
// locale is handed across as a plain prop and everything below this line is
// client-rendered, exactly as it is on a normal page.
export default function NotFoundView({ locale }: { locale: Locale }) {
  return (
    <LanguageProvider initialLocale={locale}>
      {locale === 'da' ? <NotFoundDa /> : <NotFoundEn />}
    </LanguageProvider>
  )
}
