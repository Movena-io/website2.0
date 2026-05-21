// Cost Saver Calculator — all UI copy, keyed by locale.
//
// Kept here rather than in the shared lib/translations.ts because the calculator
// is a self-contained feature with a large string surface. Components read the
// active locale from useLanguage() and pick copy[locale]. Tokens like {value}
// are filled at render time via the `fill` helper.

import type { Locale } from '@/lib/locales'

export interface CalculatorCopy {
  meta: { title: string; description: string }

  intro: {
    eyebrow: string
    title: string
    subtitle: string
    timeNote: string
    start: string
    privacy: string
  }

  nav: { back: string; next: string; seeResults: string }
  progress: string // "Step {n} of {total}"

  yes: string
  no: string

  baseline: {
    title: string
    subtitle: string
    movesLabel: string
    movesHelp: string
    hourlyLabel: string
    hourlyHelp: string
  }

  planning: { title: string; subtitle: string; minutesLabel: string; minutesHelp: string }

  quoting: {
    entry: string
    title: string
    quotesLabel: string
    minutesLabel: string
    minutesHelp: string
  }

  followup: {
    entry: string
    title: string
    leadsLabel: string
    minutesLabel: string
    upliftTitle: string
    upliftLabel: string
    upliftHelp: string
  }

  reviews: {
    currentTitle: string
    currentLabel: string
    sendsEntry: string
    extraTitle: string
    extraLabel: string
    extraHelp: string
  }

  messaging: {
    entry: string
    title: string
    hoursLabel: string
    hoursHelp: string
  }

  inventory: {
    entry: string
    title: string
    itemsLabel: string
    minutesLabel: string
    costLabel: string
  }

  units: {
    minutes: string
    hoursPerMonth: string
    dkkPerHour: string
    dkkPerMonth: string
    perMonth: string
    perYear: string
    reviewsPerMonth: string
  }

  result: {
    eyebrow: string
    hoursLine: string // "~{hours} hours/month back to your team"
    perYear: string // "≈ {value} DKK/year"
    breakdownTitle: string
    lockedTitle: string
    lockedNote: string
    upsideTitle: string
    revenueUpside: string // "+{pct}% potential revenue"
    revenueUpsideNote: string
    reviewUpside: string // "+{count} extra reviews per month"
    reviewUpsideNote: string
    exposureNote: string // "About {value} DKK/month is walking out the door today."
    assumptions: string
    rowLabels: Record<
      'planning' | 'quoting' | 'followup' | 'messaging' | 'inventoryTime' | 'inventoryMoney',
      string
    >
    ctaTitle: string
    ctaSubtitle: string
    ctaButton: string
    restart: string
  }

  gate: {
    title: string
    subtitle: string
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    companyLabel: string
    companyPlaceholder: string
    button: string
    sending: string
    successTitle: string
    successBody: string
    invalidEmail: string
    missingFields: string
    networkError: string
  }
}

const en: CalculatorCopy = {
  meta: {
    title: 'Savings calculator: see what Movena could save your moving company',
    description:
      'A two-minute calculator. Tell us how you work today and see how much time and money Movena could save your moving company, with the math behind every number.',
  },
  intro: {
    eyebrow: 'Savings calculator',
    title: 'See what Movena could save you',
    subtitle:
      'Answer a few questions about how you run jobs today. We will show you, with the math behind it, how much time and money Movena could give back, and where you might be leaving revenue on the table.',
    timeNote: 'Takes about 2 to 3 minutes. No exact figures needed, your best estimate is fine.',
    start: 'Start',
    privacy: 'We only ask for your email at the end, to send you the full breakdown.',
  },
  nav: { back: 'Back', next: 'Next', seeResults: 'See my savings' },
  progress: 'Step {n} of {total}',
  yes: 'Yes',
  no: 'No',
  baseline: {
    title: 'First, the basics',
    subtitle: 'Two quick numbers we use across the whole calculation.',
    movesLabel: 'How many moves do you handle per month?',
    movesHelp: 'A rough average is fine.',
    hourlyLabel: 'What does an hour of your team’s time cost?',
    hourlyHelp: 'Loaded cost per hour, including wages and overhead. We have pre-filled a typical figure.',
  },
  planning: {
    title: 'Planning a job',
    subtitle: 'Scheduling, assigning crew and vehicles, and the admin around setting a job up.',
    minutesLabel: 'How many minutes do you spend planning one move?',
    minutesHelp: 'From the moment a job is confirmed to when the crew knows where to be.',
  },
  quoting: {
    entry: 'Do you send quotes to customers?',
    title: 'Quoting',
    quotesLabel: 'How many quotes do you send per month?',
    minutesLabel: 'How many minutes does one quote take?',
    minutesHelp: 'Pulling numbers, writing it up, sending it.',
  },
  followup: {
    entry: 'Do you follow up on leads that don’t book right away?',
    title: 'Lead follow-up',
    leadsLabel: 'How many leads do you follow up on per month?',
    minutesLabel: 'How many minutes does one follow-up take?',
    upliftTitle: 'If you did follow up',
    upliftLabel: 'How much more revenue do you think you’d win? (%)',
    upliftHelp: 'Your best guess. Leads that go cold today, won back by consistent follow-up.',
  },
  reviews: {
    currentTitle: 'Reviews',
    currentLabel: 'How many reviews do you get per month right now?',
    sendsEntry: 'Do you send a review request after each job?',
    extraTitle: 'If you asked every time',
    extraLabel: 'How many extra reviews do you think you’d get per month?',
    extraHelp: 'Your best estimate. An automatic request after every completed job.',
  },
  messaging: {
    entry: 'Do you manually send booking confirmations, reminders, or follow-up messages?',
    title: 'Customer messaging',
    hoursLabel: 'How many hours a week does your team spend on those messages?',
    hoursHelp: 'Confirmations, reminders, on-the-way texts, post-move follow-ups. A rough total.',
  },
  inventory: {
    entry: 'Do you track inventory or equipment, like moving boxes?',
    title: 'Inventory',
    itemsLabel: 'How many items go missing per month?',
    minutesLabel: 'How many minutes do you spend chasing one missing item?',
    costLabel: 'What does one item cost to replace? (DKK)',
  },
  units: {
    minutes: 'minutes',
    hoursPerMonth: 'hours/month',
    dkkPerHour: 'DKK/hour',
    dkkPerMonth: 'DKK/month',
    perMonth: '/month',
    perYear: '/year',
    reviewsPerMonth: 'reviews/month',
  },
  result: {
    eyebrow: 'Your estimate',
    hoursLine: 'That is about {hours} hours a month back in your team’s hands.',
    perYear: '≈ {value} DKK a year',
    breakdownTitle: 'Where it comes from',
    lockedTitle: 'See the full breakdown',
    lockedNote: 'Enter your email to unlock the line-by-line math and get a copy sent to you.',
    upsideTitle: 'And the upside you flagged',
    revenueUpside: '+{pct}% potential revenue',
    revenueUpsideNote: 'You told us consistent lead follow-up could win this back. Movena runs it automatically.',
    reviewUpside: '+{count} extra reviews a month',
    reviewUpsideNote: 'In your own estimate, from an automatic request after every job. More reviews, more inbound.',
    exposureNote: 'About {value} DKK a month in lost items is walking out the door today.',
    assumptions:
      'Every figure is built on your own numbers and conservative, real-world assumptions. Nothing inflated. On a call we can walk through each one.',
    rowLabels: {
      planning: 'Faster job planning',
      quoting: 'Faster quoting',
      followup: 'Automated lead follow-up',
      messaging: 'Automated customer messaging',
      inventoryTime: 'Less time chasing lost items',
      inventoryMoney: 'Fewer items lost for good',
    },
    ctaTitle: 'Want to see it on your own numbers?',
    ctaSubtitle: 'Book a 20-minute call. We will walk through your result and show you Movena live.',
    ctaButton: 'Book a call',
    restart: 'Start over',
  },
  gate: {
    title: 'Where should we send your breakdown?',
    subtitle: 'We will unlock the full math here and email you a copy.',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email',
    emailPlaceholder: 'you@yourcompany.com',
    companyLabel: 'Company',
    companyPlaceholder: 'Your moving company',
    button: 'Unlock my breakdown',
    sending: 'Unlocking...',
    successTitle: 'Sent.',
    successBody: 'Your full breakdown is below, and a copy is on its way to your inbox.',
    invalidEmail: 'Enter a valid email address.',
    missingFields: 'Please fill in your name, email, and company.',
    networkError: 'Something went wrong. Check your connection and try again.',
  },
}

const da: CalculatorCopy = {
  meta: {
    title: 'Besparelsesberegner: se hvad Movena kan spare dit flyttefirma',
    description:
      'En beregner på to minutter. Fortæl hvordan I arbejder i dag, og se hvor meget tid og penge Movena kan spare dit flyttefirma, med regnestykket bag hvert tal.',
  },
  intro: {
    eyebrow: 'Besparelsesberegner',
    title: 'Se hvad Movena kan spare dig',
    subtitle:
      'Svar på nogle få spørgsmål om, hvordan I kører opgaver i dag. Vi viser dig, med regnestykket bag, hvor meget tid og penge Movena kan give tilbage, og hvor du måske går glip af omsætning.',
    timeNote: 'Tager omkring 2 til 3 minutter. Du behøver ikke præcise tal, dit bedste skøn er fint.',
    start: 'Start',
    privacy: 'Vi beder først om din e-mail til sidst, for at sende dig hele beregningen.',
  },
  nav: { back: 'Tilbage', next: 'Næste', seeResults: 'Se min besparelse' },
  progress: 'Trin {n} af {total}',
  yes: 'Ja',
  no: 'Nej',
  baseline: {
    title: 'Først det grundlæggende',
    subtitle: 'To hurtige tal, som vi bruger i hele beregningen.',
    movesLabel: 'Hvor mange flytninger håndterer I om måneden?',
    movesHelp: 'Et groft gennemsnit er fint.',
    hourlyLabel: 'Hvad koster en time af jeres tid?',
    hourlyHelp: 'Den fulde timepris inkl. løn og overhead. Vi har udfyldt et typisk tal.',
  },
  planning: {
    title: 'Planlægning af en opgave',
    subtitle: 'Kalender, tildeling af hold og biler, og administrationen omkring at sætte en opgave op.',
    minutesLabel: 'Hvor mange minutter bruger I på at planlægge én flytning?',
    minutesHelp: 'Fra opgaven er bekræftet, til holdet ved, hvor de skal være.',
  },
  quoting: {
    entry: 'Sender I tilbud til kunder?',
    title: 'Tilbud',
    quotesLabel: 'Hvor mange tilbud sender I om måneden?',
    minutesLabel: 'Hvor mange minutter tager ét tilbud?',
    minutesHelp: 'Finde tal, skrive det op, sende det.',
  },
  followup: {
    entry: 'Følger I op på leads, der ikke booker med det samme?',
    title: 'Opfølgning på leads',
    leadsLabel: 'Hvor mange leads følger I op på om måneden?',
    minutesLabel: 'Hvor mange minutter tager én opfølgning?',
    upliftTitle: 'Hvis I fulgte op',
    upliftLabel: 'Hvor meget mere omsætning tror du, I ville vinde? (%)',
    upliftHelp: 'Dit bedste gæt. Leads, der bliver kolde i dag, vundet tilbage med fast opfølgning.',
  },
  reviews: {
    currentTitle: 'Anmeldelser',
    currentLabel: 'Hvor mange anmeldelser får I om måneden lige nu?',
    sendsEntry: 'Sender I en anmodning om anmeldelse efter hver opgave?',
    extraTitle: 'Hvis I spurgte hver gang',
    extraLabel: 'Hvor mange ekstra anmeldelser tror du, I ville få om måneden?',
    extraHelp: 'Dit bedste skøn. En automatisk anmodning efter hver afsluttet opgave.',
  },
  messaging: {
    entry: 'Sender I manuelt bekræftelser, påmindelser eller opfølgningsbeskeder?',
    title: 'Kundekommunikation',
    hoursLabel: 'Hvor mange timer om ugen bruger jeres team på de beskeder?',
    hoursHelp: 'Bekræftelser, påmindelser, på-vej-beskeder, opfølgning efter flytning. Et groft samlet tal.',
  },
  inventory: {
    entry: 'Holder I styr på inventar eller udstyr, som flyttekasser?',
    title: 'Inventar',
    itemsLabel: 'Hvor mange ting forsvinder om måneden?',
    minutesLabel: 'Hvor mange minutter bruger I på at jagte én forsvundet ting?',
    costLabel: 'Hvad koster det at erstatte én ting? (DKK)',
  },
  units: {
    minutes: 'minutter',
    hoursPerMonth: 'timer/måned',
    dkkPerHour: 'DKK/time',
    dkkPerMonth: 'DKK/måned',
    perMonth: '/måned',
    perYear: '/år',
    reviewsPerMonth: 'anmeldelser/måned',
  },
  result: {
    eyebrow: 'Dit estimat',
    hoursLine: 'Det er omkring {hours} timer om måneden tilbage i jeres hænder.',
    perYear: '≈ {value} DKK om året',
    breakdownTitle: 'Hvor det kommer fra',
    lockedTitle: 'Se hele beregningen',
    lockedNote: 'Indtast din e-mail for at låse regnestykket op linje for linje og få en kopi tilsendt.',
    upsideTitle: 'Og det potentiale, du pegede på',
    revenueUpside: '+{pct}% potentiel omsætning',
    revenueUpsideNote: 'Du fortalte os, at fast opfølgning kunne vinde dette tilbage. Movena kører det automatisk.',
    reviewUpside: '+{count} ekstra anmeldelser om måneden',
    reviewUpsideNote: 'Dit eget skøn, fra en automatisk anmodning efter hver opgave. Flere anmeldelser, flere henvendelser.',
    exposureNote: 'Omkring {value} DKK om måneden i mistede ting går tabt i dag.',
    assumptions:
      'Hvert tal bygger på dine egne tal og konservative, virkelighedsnære antagelser. Intet er pustet op. På et opkald kan vi gennemgå hvert enkelt.',
    rowLabels: {
      planning: 'Hurtigere planlægning',
      quoting: 'Hurtigere tilbud',
      followup: 'Automatisk opfølgning på leads',
      messaging: 'Automatisk kundekommunikation',
      inventoryTime: 'Mindre tid på at jagte mistede ting',
      inventoryMoney: 'Færre ting tabt for altid',
    },
    ctaTitle: 'Vil du se det på dine egne tal?',
    ctaSubtitle: 'Book et 20-minutters opkald. Vi gennemgår dit resultat og viser dig Movena live.',
    ctaButton: 'Book et opkald',
    restart: 'Start forfra',
  },
  gate: {
    title: 'Hvor skal vi sende din beregning hen?',
    subtitle: 'Vi låser hele regnestykket op her og sender dig en kopi.',
    nameLabel: 'Navn',
    namePlaceholder: 'Dit navn',
    emailLabel: 'E-mail',
    emailPlaceholder: 'dig@ditfirma.dk',
    companyLabel: 'Firma',
    companyPlaceholder: 'Dit flyttefirma',
    button: 'Lås min beregning op',
    sending: 'Låser op...',
    successTitle: 'Sendt.',
    successBody: 'Hele din beregning er nedenfor, og en kopi er på vej til din indbakke.',
    invalidEmail: 'Indtast en gyldig e-mailadresse.',
    missingFields: 'Udfyld venligst navn, e-mail og firma.',
    networkError: 'Noget gik galt. Tjek din forbindelse og prøv igen.',
  },
}

export const calculatorCopy: Record<Locale, CalculatorCopy> = { en, da }

export function getCalculatorCopy(locale: Locale): CalculatorCopy {
  return calculatorCopy[locale] ?? calculatorCopy.en
}

// Fill {token} placeholders in a copy string.
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''))
}
