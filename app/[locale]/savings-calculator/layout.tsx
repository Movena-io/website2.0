import type { Metadata } from 'next'
import { isLocale } from '@/lib/locales'
import { getCalculatorCopy } from '@/lib/calculator/copy'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {}
  const copy = getCalculatorCopy(params.locale)
  const path = `/${params.locale}/savings-calculator`

  return {
    title: copy.meta.title,
    description: copy.meta.description,
    alternates: {
      canonical: path,
      languages: {
        en: '/en/savings-calculator',
        da: '/da/savings-calculator',
        'x-default': '/en/savings-calculator',
      },
    },
    openGraph: {
      title: copy.meta.title,
      description: copy.meta.description,
      url: `https://movena.io${path}`,
      type: 'website',
    },
  }
}

export default function SavingsCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children
}
