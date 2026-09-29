import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { isLocale } from '@/lib/locales'
import { pageMetadata } from '@/lib/page-meta'
import FaaAllePengeneHjemEn from '@/components/generated/FaaAllePengeneHjemEn'

// This slug belongs to the en tree only; the other locale has its own.
export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (params.locale !== 'en') return {}
  return pageMetadata('getPaid', 'en')
}

export default function Page({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale) || params.locale !== 'en') notFound()
  return <FaaAllePengeneHjemEn />
}
