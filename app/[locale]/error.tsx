'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import ErrorDa from '@/components/generated/ErrorDa'
import ErrorEn from '@/components/generated/ErrorEn'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { locale } = useLanguage()

  useEffect(() => {
    // Sentry's client integration picks this up; logging it here keeps the
    // digest in the browser console for local debugging too.
    console.error(error)
  }, [error])

  return locale === 'da' ? <ErrorDa /> : <ErrorEn />
}
