// Cost Saver Calculator — all UI copy, keyed by locale.
//
// Kept here rather than in the shared lib/translations.ts because the calculator
// is a self-contained feature with a large string surface. Components read the
// active locale from useLanguage() and pick copy[locale]. Tokens like {value}
// and {cur} are filled at render time via the `fill` helper ({cur} = selected
// currency code, e.g. DKK / EUR).

import type { Locale } from '@/lib/locales'

export interface CalculatorCopy {
  meta: { title: string; description: string }

  intro: {
    eyebrow: string
    title: string
    subtitle: string
    timeNote: string
    start: string
  }

  nav: { back: string; next: string; seeResults: string }
  progress: string // "Step {n} of {total}"

  yes: string
  no: string

  baseline: {
    title: string
    subtitle: string
    currencyLabel: string
    currencyHelp: string
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
    sendsTimeLabel: string
    sendsTimeHelp: string
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
    estimateNote: string
    itemsLabel: string
    minutesLabel: string
    costLabel: string // "...? ({cur})"
  }

  units: {
    minutes: string
    hoursPerMonth: string
    hoursPerWeek: string
    perHour: string // "{cur}/hour"
    moneyPerMonth: string // "{cur}/month"
    reviewsPerMonth: string
  }

  // Short "what this question means and what it's for" explanation per question.
  fieldInfo: Record<
    | 'currency'
    | 'moves'
    | 'hourly'
    | 'planningMinutes'
    | 'quotingEntry'
    | 'quotes'
    | 'quoteMinutes'
    | 'followupEntry'
    | 'leads'
    | 'followupMinutes'
    | 'uplift'
    | 'reviewsCurrent'
    | 'reviewsSendsEntry'
    | 'reviewsSendsTime'
    | 'reviewsExtra'
    | 'messagingEntry'
    | 'messagingHours'
    | 'inventoryEntry'
    | 'inventoryItems'
    | 'inventoryMinutes'
    | 'inventoryCost',
    string
  >

  result: {
    eyebrow: string
    hoursLine: string // "~{hours} hours/month back"
    perYear: string // "≈ {value} {cur} a year"
    breakdownTitle: string
    lockedTitle: string
    lockedNote: string
    moreInfo: string // aria/label for the info toggle
    upsideTitle: string
    revenueUpside: string // "+{pct}% potential revenue"
    revenueUpsideNote: string
    reviewUpside: string // "+{count} extra reviews per month"
    reviewUpsideNote: string
    exposureNote: string // "About {value} {cur}/month..."
    assumptions: string
    rowLabels: Record<
      'planning' | 'quoting' | 'followup' | 'reviewsTime' | 'messaging' | 'inventoryTime' | 'inventoryMoney',
      string
    >
    rowInfo: Record<
      'planning' | 'quoting' | 'followup' | 'reviewsTime' | 'messaging' | 'inventoryTime' | 'inventoryMoney',
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
      'Answer a few questions about how you run your business today and get a breakdown of how you could optimize it.',
    timeNote: 'Takes about 2-3 minutes.',
    start: 'Start',
  },
  nav: { back: 'Back', next: 'Next', seeResults: 'See my savings' },
  progress: 'Step {n} of {total}',
  yes: 'Yes',
  no: 'No',
  baseline: {
    title: 'First, the basics',
    subtitle: 'A few quick numbers we use across the whole calculation.',
    currencyLabel: 'Which currency do you work in?',
    currencyHelp: 'Every figure in the calculator will be shown in this currency.',
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
    sendsTimeLabel: 'How many minutes a month do you spend sending those requests?',
    sendsTimeHelp: 'A rough total. Movena sends them automatically after every job.',
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
    entry: 'Do you keep track of your moving boxes and equipment?',
    title: 'Moving boxes and equipment',
    estimateNote:
      'Even if you don’t track them formally, you probably have a good sense of this. A rough estimate is all we need.',
    itemsLabel: 'How many moving boxes go missing per month?',
    minutesLabel: 'How many minutes do you spend chasing one missing box?',
    costLabel: 'What does one moving box cost to replace? ({cur})',
  },
  units: {
    minutes: 'minutes',
    hoursPerMonth: 'hours/month',
    hoursPerWeek: 'hours/week',
    perHour: '{cur}/hour',
    moneyPerMonth: '{cur}/month',
    reviewsPerMonth: 'reviews/month',
  },
  fieldInfo: {
    currency: 'The currency every figure in the calculator is shown in. Pick the one your business runs its numbers in.',
    moves: 'The number of jobs you complete in a typical month. We use it to scale the time savings across everything you do.',
    hourly:
      'What one hour of your team’s time really costs, including wages and overhead. This is how we turn hours saved into money saved.',
    planningMinutes:
      'The time it takes to organize one move: scheduling it, assigning crew and a vehicle, and the admin to get it ready. Movena automates most of this.',
    quotingEntry:
      'Whether you send price quotes to customers before a job. If you do, we estimate the time Movena’s quoting saves you.',
    quotes: 'How many quotes you send in a typical month. More quotes means more time Movena’s automatic quoting gives back.',
    quoteMinutes:
      'The time it takes to build and send one quote today: working out the price, writing it up, and sending it.',
    followupEntry:
      'Whether you chase leads that don’t book straight away. Your answer changes what we ask next: time saved if you do, lost revenue if you don’t.',
    leads: 'How many leads you follow up on in a month. We use it to estimate the follow-up time Movena automates.',
    followupMinutes: 'The time one follow-up takes: writing the message or making the call, and remembering to do it.',
    uplift:
      'Your best guess at how much more revenue you’d win if every lead got followed up properly. Movena does that automatically, so this is upside you’re leaving on the table.',
    reviewsCurrent:
      'How many customer reviews you collect in a typical month today. It sets the baseline for the upside Movena can add.',
    reviewsSendsEntry:
      'Whether you ask for a review after every completed job. If you do, we estimate the time saved; if not, the extra reviews you could get.',
    reviewsSendsTime:
      'Roughly how long you spend each month sending review requests by hand. Movena sends them automatically.',
    reviewsExtra:
      'Your best guess at how many more reviews you’d get if every customer was asked automatically after their move.',
    messagingEntry:
      'Whether you send confirmations, reminders, and follow-up messages to customers by hand. Movena can automate these.',
    messagingHours: 'A rough weekly total of the time spent on those customer messages. We turn it into time Movena gives back.',
    inventoryEntry:
      'Whether you keep track of your moving boxes and equipment. Either way, fill in the next questions with your best estimate.',
    inventoryItems: 'How many boxes go missing in a typical month. Even a rough number works; most movers have a sense of it.',
    inventoryMinutes: 'The time spent tracking down one missing box: calls, messages, and chasing the customer.',
    inventoryCost:
      'What it costs to replace one box. We use it to show what lost boxes cost you and what Movena could recover.',
  },
  result: {
    eyebrow: 'Your estimate',
    hoursLine: 'That is about {hours} hours a month back in your team’s hands.',
    perYear: '≈ {value} {cur} a year',
    breakdownTitle: 'Where it comes from',
    lockedTitle: 'See the full breakdown',
    lockedNote: 'Enter your email to unlock the line-by-line math and get a copy sent to you.',
    moreInfo: 'More info',
    upsideTitle: 'And the upside you flagged',
    revenueUpside: '+{pct}% potential revenue',
    revenueUpsideNote: 'You told us consistent lead follow-up could win this back. Movena runs it automatically.',
    reviewUpside: '+{count} extra reviews a month',
    reviewUpsideNote: 'In your own estimate, from an automatic request after every job. More reviews, more inbound.',
    exposureNote: 'About {value} {cur} a month in lost boxes is walking out the door today.',
    assumptions:
      'Every figure is built on your own numbers and conservative, real-world assumptions. Nothing inflated. On a call we can walk through each one.',
    rowLabels: {
      planning: 'Faster job planning',
      quoting: 'Faster quoting',
      followup: 'Automated lead follow-up',
      reviewsTime: 'Automated review requests',
      messaging: 'Automated customer messaging',
      inventoryTime: 'Less time chasing lost boxes',
      inventoryMoney: 'Fewer boxes lost for good',
    },
    rowInfo: {
      planning:
        'Movena handles scheduling, crew and vehicle assignment, and the admin around setting a job up. We assume it removes 40% of the time you spend planning each move, a deliberately conservative figure.',
      quoting:
        'With Movena the customer fills in the move details and the quote builds itself. Some movers still go out to inspect, so we only count 50% of the quoting time saved, not all of it.',
      followup:
        'Movena runs your lead follow-up automatically with timed sequences. We assume it takes over 85% of the manual follow-up time, leaving you to handle the live replies.',
      reviewsTime:
        'Movena sends a review request automatically after every completed job. We assume it removes 90% of the time you currently spend sending them by hand.',
      messaging:
        'Booking confirmations, reminders, on-the-way texts and post-move messages get automated. We assume 90% of the time you spend on them today disappears.',
      inventoryTime:
        'Automatic tracking and reminders chase missing boxes for you. We assume 90% of the time you currently spend chasing them is removed.',
      inventoryMoney:
        'Faster, automatic chasing means more boxes come back before they are gone for good. We assume a conservative 30% of what you lose today is recovered.',
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
      'Besvar nogle få spørgsmål om, hvordan I driver jeres forretning i dag, og få en gennemgang af, hvordan den kan optimeres.',
    timeNote: 'Tager omkring 2-3 minutter.',
    start: 'Start',
  },
  nav: { back: 'Tilbage', next: 'Næste', seeResults: 'Se min besparelse' },
  progress: 'Trin {n} af {total}',
  yes: 'Ja',
  no: 'Nej',
  baseline: {
    title: 'Først det grundlæggende',
    subtitle: 'Nogle få hurtige tal, som vi bruger i hele beregningen.',
    currencyLabel: 'Hvilken valuta arbejder I i?',
    currencyHelp: 'Alle tal i beregneren vises i denne valuta.',
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
    sendsTimeLabel: 'Hvor mange minutter om måneden bruger I på at sende dem?',
    sendsTimeHelp: 'Et groft samlet tal. Movena sender dem automatisk efter hver opgave.',
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
    entry: 'Holder I styr på jeres flyttekasser og udstyr?',
    title: 'Flyttekasser og udstyr',
    estimateNote:
      'Selv hvis I ikke registrerer dem formelt, har I sikkert en god fornemmelse. Et groft skøn er nok.',
    itemsLabel: 'Hvor mange flyttekasser forsvinder om måneden?',
    minutesLabel: 'Hvor mange minutter bruger I på at jagte én forsvundet kasse?',
    costLabel: 'Hvad koster det at erstatte én flyttekasse? ({cur})',
  },
  units: {
    minutes: 'minutter',
    hoursPerMonth: 'timer/måned',
    hoursPerWeek: 'timer/uge',
    perHour: '{cur}/time',
    moneyPerMonth: '{cur}/måned',
    reviewsPerMonth: 'anmeldelser/måned',
  },
  fieldInfo: {
    currency: 'Den valuta, alle tal i beregneren vises i. Vælg den, jeres forretning regner i.',
    moves: 'Antal opgaver, I udfører i en typisk måned. Vi bruger det til at skalere tidsbesparelsen på tværs af alt, hvad I laver.',
    hourly:
      'Hvad én time af jeres tid reelt koster, inkl. løn og overhead. Det er sådan, vi omsætter sparet tid til sparede penge.',
    planningMinutes:
      'Tiden det tager at organisere én flytning: planlægning, tildeling af hold og bil, og administrationen for at gøre den klar. Movena automatiserer det meste.',
    quotingEntry:
      'Om I sender pristilbud til kunder før en opgave. Hvis I gør, estimerer vi den tid, Movenas tilbud sparer jer.',
    quotes: 'Hvor mange tilbud I sender i en typisk måned. Flere tilbud betyder mere tid sparet med Movenas automatiske tilbud.',
    quoteMinutes: 'Tiden det tager at lave og sende ét tilbud i dag: finde prisen, skrive det op og sende det.',
    followupEntry:
      'Om I følger op på leads, der ikke booker med det samme. Dit svar ændrer det næste spørgsmål: sparet tid hvis I gør, mistet omsætning hvis I ikke gør.',
    leads: 'Hvor mange leads I følger op på om måneden. Vi bruger det til at estimere den opfølgningstid, Movena automatiserer.',
    followupMinutes: 'Tiden én opfølgning tager: at skrive beskeden eller ringe, og at huske at gøre det.',
    uplift:
      'Dit bedste gæt på, hvor meget mere omsætning I ville vinde, hvis hvert lead blev fulgt ordentligt op. Movena gør det automatisk, så dette er potentiale, I går glip af.',
    reviewsCurrent: 'Hvor mange anmeldelser I samler i en typisk måned i dag. Det sætter udgangspunktet for det, Movena kan tilføje.',
    reviewsSendsEntry:
      'Om I beder om en anmeldelse efter hver afsluttet opgave. Hvis I gør, estimerer vi den sparede tid; hvis ikke, de ekstra anmeldelser, I kunne få.',
    reviewsSendsTime: 'Cirka hvor lang tid I bruger hver måned på at sende anmodninger om anmeldelser i hånden. Movena sender dem automatisk.',
    reviewsExtra: 'Dit bedste gæt på, hvor mange flere anmeldelser I ville få, hvis hver kunde blev spurgt automatisk efter flytningen.',
    messagingEntry:
      'Om I sender bekræftelser, påmindelser og opfølgningsbeskeder til kunder i hånden. Movena kan automatisere dem.',
    messagingHours: 'Et groft ugentligt tal for tiden brugt på de kundebeskeder. Vi omsætter det til tid, Movena giver tilbage.',
    inventoryEntry:
      'Om I holder styr på jeres flyttekasser og udstyr. Uanset hvad, udfyld de næste spørgsmål med jeres bedste skøn.',
    inventoryItems: 'Hvor mange kasser der forsvinder i en typisk måned. Et groft tal er nok; de fleste flyttefirmaer har en fornemmelse.',
    inventoryMinutes: 'Tiden brugt på at opspore én forsvundet kasse: opkald, beskeder og at jagte kunden.',
    inventoryCost: 'Hvad det koster at erstatte én kasse. Vi bruger det til at vise, hvad mistede kasser koster jer, og hvad Movena kan redde.',
  },
  result: {
    eyebrow: 'Dit estimat',
    hoursLine: 'Det er omkring {hours} timer om måneden tilbage i jeres hænder.',
    perYear: '≈ {value} {cur} om året',
    breakdownTitle: 'Hvor det kommer fra',
    lockedTitle: 'Se hele beregningen',
    lockedNote: 'Indtast din e-mail for at låse regnestykket op linje for linje og få en kopi tilsendt.',
    moreInfo: 'Mere info',
    upsideTitle: 'Og det potentiale, du pegede på',
    revenueUpside: '+{pct}% potentiel omsætning',
    revenueUpsideNote: 'Du fortalte os, at fast opfølgning kunne vinde dette tilbage. Movena kører det automatisk.',
    reviewUpside: '+{count} ekstra anmeldelser om måneden',
    reviewUpsideNote: 'Dit eget skøn, fra en automatisk anmodning efter hver opgave. Flere anmeldelser, flere henvendelser.',
    exposureNote: 'Omkring {value} {cur} om måneden i mistede kasser går tabt i dag.',
    assumptions:
      'Hvert tal bygger på dine egne tal og konservative, virkelighedsnære antagelser. Intet er pustet op. På et opkald kan vi gennemgå hvert enkelt.',
    rowLabels: {
      planning: 'Hurtigere planlægning',
      quoting: 'Hurtigere tilbud',
      followup: 'Automatisk opfølgning på leads',
      reviewsTime: 'Automatiske anmodninger om anmeldelser',
      messaging: 'Automatisk kundekommunikation',
      inventoryTime: 'Mindre tid på at jagte mistede kasser',
      inventoryMoney: 'Færre kasser tabt for altid',
    },
    rowInfo: {
      planning:
        'Movena håndterer kalender, tildeling af hold og biler, og administrationen omkring at sætte en opgave op. Vi antager, at det fjerner 40% af den tid, I bruger på at planlægge hver flytning, et bevidst konservativt tal.',
      quoting:
        'Med Movena udfylder kunden flyttedetaljerne, og tilbuddet bygger sig selv. Nogle flyttefirmaer kører stadig ud for at se det, så vi regner kun 50% af tilbudstiden sparet, ikke det hele.',
      followup:
        'Movena kører jeres opfølgning automatisk med tidsstyrede sekvenser. Vi antager, at den overtager 85% af den manuelle opfølgningstid, så I kun håndterer de aktive svar.',
      reviewsTime:
        'Movena sender automatisk en anmodning om anmeldelse efter hver afsluttet opgave. Vi antager, at det fjerner 90% af den tid, I bruger på at sende dem i hånden.',
      messaging:
        'Bekræftelser, påmindelser, på-vej-beskeder og beskeder efter flytning bliver automatiseret. Vi antager, at 90% af den tid, I bruger på dem i dag, forsvinder.',
      inventoryTime:
        'Automatisk registrering og påmindelser jagter de forsvundne kasser for jer. Vi antager, at 90% af den tid, I bruger på at jagte dem i dag, fjernes.',
      inventoryMoney:
        'Hurtigere, automatisk opfølgning betyder, at flere kasser kommer tilbage, før de er væk for altid. Vi antager konservativt, at 30% af det, I mister i dag, bliver reddet.',
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
