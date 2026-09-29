'use client'

import { useLanguage } from '@/lib/LanguageContext'
import NotFoundDa from '@/components/generated/NotFoundDa'
import NotFoundEn from '@/components/generated/NotFoundEn'

// Any URL under /da or /en that matches no real route renders the redesigned
// 404 here rather than through Next's not-found boundary. This project's root
// layout lives inside the [locale] segment, so that boundary renders outside
// the language context and the generated page comes back blank there.
//
// Known gap: this returns HTTP 200 rather than 404. A page cannot set a status
// code in the App Router; fixing it properly means lifting the root layout to
// app/layout.tsx so a real app/not-found.tsx can exist.
export default function CatchAll() {
  const { locale } = useLanguage()
  return locale === 'da' ? <NotFoundDa /> : <NotFoundEn />
}
