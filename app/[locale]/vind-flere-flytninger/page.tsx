import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { isLocale } from '@/lib/locales'
import { pageMetadata } from '@/lib/page-meta'
import VindFlereFlytningerDa from '@/components/generated/VindFlereFlytningerDa'

// This slug belongs to the da tree only; the other locale has its own.
export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (params.locale !== 'da') return {}
  return pageMetadata('winMore', 'da')
}

export default function Page({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale) || params.locale !== 'da') notFound()
  return <VindFlereFlytningerDa />
}
