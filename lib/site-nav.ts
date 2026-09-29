import type { Locale } from '@/lib/locales'

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
  callUs: string
  menu: string
  close: string
  featureItems: { key: 'winMore' | 'runTheDay' | 'getPaid'; label: string; blurb: string }[]
}

export const NAV: Record<Locale, NavCopy> = {
  da: {
    features: 'Funktioner',
    about: 'Om os',
    blog: 'Blog',
    bookDemo: 'Book en demo',
    callUs: `Ring ${PHONE_DISPLAY}`,
    menu: 'Menu',
    close: 'Luk',
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
    callUs: `Call ${PHONE_DISPLAY}`,
    menu: 'Menu',
    close: 'Close',
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
