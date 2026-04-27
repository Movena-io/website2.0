import type { Metadata } from 'next'
import { isLocale, type Locale } from '@/lib/locales'

const META: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'Contact Movena: Talk to the team',
    description:
      'Questions about Movena, the all-in-one platform for moving companies? Send us a message and we will get back to you.',
  },
  da: {
    title: 'Kontakt Movena: Tal med teamet',
    description:
      'Har du spørgsmål til Movena, alt-i-ét platformen til flyttefirmaer? Send os en besked, og vi vender tilbage hurtigst muligt.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {}
  const meta = META[params.locale]
  const path = `/${params.locale}/contact`
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: path,
      languages: {
        en: '/en/contact',
        da: '/da/contact',
        'x-default': '/en/contact',
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://movena.io${path}`,
    },
  }
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
