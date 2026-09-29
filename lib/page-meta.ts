import type { Metadata } from 'next'
import type { Locale } from '@/lib/locales'

const SITE = 'https://movena.io'

const OG_LOCALE: Record<Locale, string> = { en: 'en_GB', da: 'da_DK' }

type Entry = {
  title: string
  description: string
  path: Record<Locale, string>
}

// One entry per redesigned page. Titles are the design's own <title>; the
// descriptions are the page's opening line, so the snippet matches the page.
export const PAGES = {
  winMore: {
    da: {
      title: 'Movena, vind flere flytninger',
      description:
        'Prisformular, leads, tilbud og automatiske beskeder. Svar hurtigere end de andre, og følg op uden at skulle huske det selv.',
    },
    en: {
      title: 'Win more moves | Movena',
      description:
        'Price form, leads, quotes and automatic messages. Answer faster than the rest, and follow up without having to remember it yourself.',
    },
    path: { da: '/da/vind-flere-flytninger', en: '/en/win-more-moves' },
  },
  runTheDay: {
    da: {
      title: 'Movena, hav styr på dagen',
      description:
        'Overblik, ruter, kalender, crew og appen til folkene. Se hver morgen, om dagen hænger sammen, før telefonen begynder at ringe.',
    },
    en: {
      title: 'Stay on top of the day | Movena',
      description:
        'Overview, routes, calendar, crew and the crew app. See every morning whether the day holds together, before the phone starts ringing.',
    },
    path: { da: '/da/hav-styr-paa-dagen', en: '/en/run-the-day' },
  },
  getPaid: {
    da: {
      title: 'Movena, få alle pengene hjem',
      description:
        'Fakturering, opbevaring, kasser og timer. Ingen timer glemt, ingen måned uden faktura, og lønnen klar uden sms’er.',
    },
    en: {
      title: 'Get paid for every job | Movena',
      description:
        'Invoicing, storage, boxes and hours. No hours forgotten, no month without an invoice, and payroll ready without texts.',
    },
    path: { da: '/da/faa-alle-pengene-hjem', en: '/en/get-paid' },
  },
  about: {
    da: {
      title: 'Movena, om os',
      description:
        'Movena er bygget sammen med flyttebranchen. Vi er tre, vi sidder på Rådhuspladsen i København, og vi tager telefonen selv.',
    },
    en: {
      title: 'About | Movena',
      description:
        'Movena is built together with the moving industry. There are three of us, our office is on Rådhuspladsen in Copenhagen, and we answer the phone ourselves.',
    },
    path: { da: '/da/om-os', en: '/en/about' },
  },
  bookDemo: {
    da: {
      title: 'Movena, book en demo',
      description:
        'Book en gratis demo. I stedet for et standardeksempel viser vi systemet med en opgave, I selv har i kalenderen.',
    },
    en: {
      title: 'Book a demo | Movena',
      description:
        'Book a free demo. Instead of a standard example, we show you the system with a job from your own calendar.',
    },
    path: { da: '/da/book-demo', en: '/en/book-demo' },
  },
  privacy: {
    da: {
      title: 'Privatlivspolitik, Movena',
      description:
        'Sådan behandler Movena personoplysninger: hvad vi indsamler, hvad vi bruger det til, hvem vi deler det med, og hvor længe vi gemmer det.',
    },
    en: {
      title: 'Privacy policy | Movena',
      description:
        'How Movena handles personal data: what we collect, what we use it for, who we share it with, and how long we keep it.',
    },
    path: { da: '/da/privatlivspolitik', en: '/en/privacy' },
  },
} satisfies Record<string, { da: { title: string; description: string }; en: { title: string; description: string }; path: Record<Locale, string> }>

export type PageKey = keyof typeof PAGES

// Canonical is self-referential and hreflang is symmetric, matching the rest of
// the site. Both language versions of every one of these pages exist.
export function pageMetadata(key: PageKey, locale: Locale): Metadata {
  const page = PAGES[key]
  const copy = page[locale]
  const path = page.path[locale]

  return {
    title: copy.title,
    description: copy.description,
    metadataBase: new URL(SITE),
    alternates: {
      canonical: path,
      languages: {
        da: page.path.da,
        en: page.path.en,
        'x-default': page.path.en,
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: `${SITE}${path}`,
      siteName: 'Movena',
      locale: OG_LOCALE[locale],
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 627, alt: copy.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.description,
      images: ['/og-image.png'],
    },
  }
}
