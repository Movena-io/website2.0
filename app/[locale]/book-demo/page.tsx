import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/locales'
import { pageMetadata } from '@/lib/page-meta'
import BookDemoDa from '@/components/generated/BookDemoDa'
import BookDemoEn from '@/components/generated/BookDemoEn'

// Same slug in both languages.
export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {}
  return pageMetadata('bookDemo', params.locale as Locale)
}

export default function Page({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound()
  return params.locale === 'da' ? <BookDemoDa /> : <BookDemoEn />
}
