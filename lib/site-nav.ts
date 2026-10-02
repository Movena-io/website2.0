import type { Locale } from '@/lib/locales'
import { translations } from '@/lib/translations'
import { APP_URL } from '@/lib/constants'

// Route map for the redesigned marketing site. The design export links pages by
// filename, so the real slugs are defined here: Danish slugs on /da, English on
// /en. Everything else in the tree keeps its existing address.
export const ROUTES: Record<Locale, Record<string, string>> = {
  da: {
    home: '/da',
    winMore: '/da/vind-flere-flytninger',
    runTheDay: '/da/hav-styr-paa-dagen',
    getPaid: '/da/faa-alle-pengene-hjem',
    about: '/da/om-os',
    blog: '/da/blog',
    bookDemo: '/da/book-demo',
  },
  en: {
    home: '/en',
    winMore: '/en/win-more-moves',
    runTheDay: '/en/run-the-day',
    getPaid: '/en/get-paid',
    about: '/en/about',
    blog: '/en/blog',
    bookDemo: '/en/book-demo',
  },
}

// Pages that exist in both languages but are not part of the header nav, so
// they are absent from ROUTES. The language switcher still has to map them,
// otherwise it would drop the reader on the front page.
const EXTRA_ROUTE_PAIRS: Record<Locale, string>[] = [
  { da: '/da/privatlivspolitik', en: '/en/privacy' },
  { da: '/da/savings-calculator', en: '/en/savings-calculator' },
  { da: '/da/contact', en: '/en/contact' },
  { da: '/da/dataportabilitet', en: '/en/dataportabilitet' },
]

/** The two blog slugs of one article, keyed by locale. Missing = not translated. */
export type BlogSlugPair = Partial<Record<Locale, string>>

const strip = (p: string) => (p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p)

// Where the language switcher should send the reader. Same page in the other
// language where one exists, and a sensible parent where it does not, so the
// switcher never dead-ends on a 404.
export function counterpartPath(
  pathname: string,
  from: Locale,
  to: Locale,
  blogPairs: BlogSlugPair[] = [],
): string {
  const path = strip(pathname)

  if (path === `/${from}` || path === '/') return ROUTES[to].home

  // A blog post goes to its translation, or to the blog front page when the
  // article only exists in one language.
  const postPrefix = `/${from}/blog/`
  if (path.startsWith(postPrefix)) {
    const slug = path.slice(postPrefix.length)
    const pair = blogPairs.find((p) => p[from] === slug)
    const other = pair?.[to]
    return other ? `/${to}/blog/${other}` : ROUTES[to].blog
  }

  const byKey = Object.keys(ROUTES[from]).find((k) => ROUTES[from][k] === path)
  if (byKey) return ROUTES[to][byKey]

  const extra = EXTRA_ROUTE_PAIRS.find((pair) => pair[from] === path)
  if (extra) return extra[to]

  return ROUTES[to].home
}

// Existing customers go to the app itself, not to a marketing page.
export const LOGIN_HREF = APP_URL

export const PHONE_DISPLAY = '+45 50 28 28 56'
export const PHONE_HREF = 'tel:+4550282856'
export const EMAIL = 'info@movena.io'

// Kept absolute and unprefixed on purpose: /dataportabilitet lives in the Danish
// route tree and is reached through the middleware rewrite, so both footers
// point at one address. See commit 13a5237.
export const DATA_PORTABILITY_URL = 'https://www.movena.io/dataportabilitet'

type NavCopy = {
  features: string
  about: string
  blog: string
  bookDemo: string
  logIn: string
  callUs: string
  menu: string
  close: string
  language: string
  featureItems: { key: 'winMore' | 'runTheDay' | 'getPaid'; label: string; blurb: string }[]
}

export const NAV: Record<Locale, NavCopy> = {
  da: {
    features: 'Funktioner',
    about: 'Om os',
    blog: 'Blog',
    bookDemo: 'Book en demo',
    // Reused from the older header's copy, so both say the same thing.
    logIn: translations.da.nav.logIn,
    callUs: `Ring ${PHONE_DISPLAY}`,
    menu: 'Menu',
    close: 'Luk',
    language: 'Sprog',
    featureItems: [
      { key: 'winMore', label: 'Vind flere flytninger', blurb: 'Prisformular, leads, tilbud og automatiske beskeder' },
      { key: 'runTheDay', label: 'Hav styr på dagen', blurb: 'Overblik, ruter, kalender, crew og appen til folkene' },
      { key: 'getPaid', label: 'Få alle pengene hjem', blurb: 'Fakturering, opbevaring, kasser og timer' },
    ],
  },
  en: {
    features: 'Features',
    about: 'About',
    blog: 'Blog',
    bookDemo: 'Book a demo',
    logIn: translations.en.nav.logIn,
    callUs: `Call ${PHONE_DISPLAY}`,
    menu: 'Menu',
    close: 'Close',
    language: 'Language',
    featureItems: [
      { key: 'winMore', label: 'Win more moves', blurb: 'Price form, leads, quotes and automatic messages' },
      { key: 'runTheDay', label: 'Stay on top of the day', blurb: 'Overview, routes, calendar, crew and the crew app' },
      { key: 'getPaid', label: 'Get paid for every job', blurb: 'Invoicing, storage, boxes and hours' },
    ],
  },
}

type FooterCopy = {
  tagline: string
  colFeatures: string
  colCompany: string
  colContact: string
  colData: string
  dataPortability: string
  privacy: string
  cookieSettings: string
  company: string
  cvr: string
  address: string
}

export const FOOTER: Record<Locale, FooterCopy> = {
  da: {
    tagline: 'Software til danske flyttefirmaer.',
    colFeatures: 'Funktioner',
    colCompany: 'Firma',
    colContact: 'Kontakt',
    colData: 'Jeres data',
    dataPortability: 'Dataportabilitet',
    privacy: 'Privatlivspolitik',
    cookieSettings: 'Cookieindstillinger',
    company: 'Movena ApS',
    cvr: 'CVR 46764129',
    address: 'Rådhuspladsen 16, København',
  },
  en: {
    tagline: 'Software for moving companies in Denmark.',
    colFeatures: 'Features',
    colCompany: 'Company',
    colContact: 'Contact',
    colData: 'Your data',
    dataPortability: 'Data portability',
    privacy: 'Privacy policy',
    cookieSettings: 'Cookie settings',
    company: 'Movena ApS',
    cvr: 'CVR 46764129',
    address: 'Rådhuspladsen 16, Copenhagen',
  },
}
