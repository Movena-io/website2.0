import type { Metadata } from 'next'
import { isLocale, type Locale } from '@/lib/locales'

const META: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'You are on the Movena waitlist',
    description: 'Thanks for joining the Movena waitlist. Refer other moving companies to move up the list.',
  },
  da: {
    title: 'Du er på Movenas venteliste',
    description: 'Tak fordi du tilmeldte dig Movenas venteliste. Inviter andre flyttefirmaer for at rykke op på listen.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {}
  const meta = META[params.locale]
  return {
    title: meta.title,
    description: meta.description,
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `/${params.locale}/waitlist/success`,
    },
  }
}

export default function WaitlistSuccessLayout({ children }: { children: React.ReactNode }) {
  return children
}
