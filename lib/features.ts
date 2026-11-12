import type { Locale } from '@/lib/locales'

// The eight feature pages from the 2026 redesign. Danish copy is the design's
// own (src/data/features.ts in the export), word for word, except that the
// metric figures carry no numbers (24/7, 100%, "1 klik"...) and "et"/"en"
// are never written with an accent, per Movena's house style. English is a translation of it.
// Slugs differ per language, like the rest of the site:
// /da/funktioner/<da> and /en/features/<en>.

export type VisualType =
  | 'crm'
  | 'quote'
  | 'schedule'
  | 'crew'
  | 'messages'
  | 'payments'
  | 'inventory'
  | 'analytics'

export type FeatureIcon =
  | 'UsersRound'
  | 'CalendarRange'
  | 'Workflow'
  | 'CreditCard'
  | 'Smartphone'
  | 'FileCheck2'
  | 'ChartNoAxesCombined'
  | 'Boxes'

export type FeatureCopy = {
  title: string
  shortTitle: string
  eyebrow: string
  description: string
  statement: string
  problems: string[]
  capabilities: Array<{ title: string; text: string }>
  metric: { value: string; label: string }
  workflow: string[]
  metaTitle: string
}

export type Feature = {
  key: string
  slug: Record<Locale, string>
  icon: FeatureIcon
  visual: VisualType
  accent: 'blue' | 'sky' | 'navy'
  da: FeatureCopy
  en: FeatureCopy
}

export const FEATURE_BASE: Record<Locale, string> = {
  da: '/da/funktioner',
  en: '/en/features',
}

export const features: Feature[] = [
  {
    key: 'crm',
    slug: { da: 'crm', en: 'crm' },
    icon: 'UsersRound',
    visual: 'crm',
    accent: 'blue',
    da: {
      title: 'CRM, der følger kunden hele vejen',
      shortTitle: 'CRM',
      eyebrow: 'Alle kunder. Alle detaljer. Et sted.',
      description:
        'Saml forespørgsler, aftaler, noter og historik på et kundekort, så intet bliver glemt mellem telefonen og flyttebilen.',
      statement: 'Fra første opkald til tilbagevendende kunde',
      problems: [
        'Henvendelser i flere indbakker',
        'Opfølgning afhænger af hukommelsen',
        'Historikken ligger hos den enkelte',
      ],
      capabilities: [
        { title: 'Samlet kundekort', text: 'Se kontaktdata, opgaver, tilbud og beskeder i en ubrudt historik.' },
        { title: 'Visuel pipeline', text: 'Se præcis hvilke kunder der venter på svar, tilbud eller opfølgning.' },
        { title: 'Tydeligt ansvar', text: 'Fordel leads og næste skridt, så alle ved, hvem der gør hvad.' },
        { title: 'Søgbar historik', text: 'Find samtaler og aftaler igen, også når kunden vender tilbage måneder senere.' },
      ],
      metric: { value: 'Fælles', label: 'kundebillede på tværs af hele teamet' },
      workflow: ['Forespørgsel modtages', 'Kunden kvalificeres', 'Næste skridt aftales'],
      metaTitle: 'CRM til flyttefirmaer | Movena',
    },
    en: {
      title: 'A CRM that follows the customer all the way',
      shortTitle: 'CRM',
      eyebrow: 'Every customer. Every detail. One place.',
      description:
        'Keep enquiries, agreements, notes and history on one customer card, so nothing gets lost between the phone and the moving truck.',
      statement: 'From the first call to a returning customer',
      problems: [
        'Enquiries spread across several inboxes',
        'Follow-up depends on memory',
        'The history sits with one person',
      ],
      capabilities: [
        { title: 'One customer card', text: 'See contact details, jobs, quotes and messages in one unbroken history.' },
        { title: 'Visual pipeline', text: 'See exactly which customers are waiting for a reply, a quote or a follow-up.' },
        { title: 'Clear ownership', text: 'Assign leads and next steps, so everyone knows who does what.' },
        { title: 'Searchable history', text: 'Find conversations and agreements again, even when the customer comes back months later.' },
      ],
      metric: { value: 'Shared', label: 'view of the customer across the whole team' },
      workflow: ['Enquiry comes in', 'Customer is qualified', 'Next step is agreed'],
      metaTitle: 'CRM for moving companies | Movena',
    },
  },
  {
    key: 'opgavestyring',
    slug: { da: 'opgavestyring', en: 'task-management' },
    icon: 'CalendarRange',
    visual: 'schedule',
    accent: 'sky',
    da: {
      title: 'Opgavestyring uden løse ender',
      shortTitle: 'Opgavestyring',
      eyebrow: 'Fra ordrebog til dagens rute',
      description:
        'Planlæg flytninger, crew, biler og tider i en levende kalender, der giver kontoret ro og teamet en klar arbejdsdag.',
      statement: 'Når planen ændrer sig, følger hele holdet med',
      problems: [
        'Dobbeltbookede ressourcer',
        'Planer i regneark og på papir',
        'Ændringer kræver en telefonkæde',
      ],
      capabilities: [
        { title: 'Visuel kalender', text: 'Flyt opgaver og se ledig kapacitet på tværs af dage, biler og teams.' },
        { title: 'Crew og biler', text: 'Match bemanding, kompetencer og køretøjer med den konkrete flytning.' },
        { title: 'Opgavekort', text: 'Saml adresser, kontaktpersoner, tider og særlige hensyn et sted.' },
        { title: 'Live status', text: 'Kontoret kan se, om teamet er på vej, i gang eller færdigt.' },
      ],
      metric: { value: 'Opdateret', label: 'plan for både kontor og crew' },
      workflow: ['Opgaven bookes', 'Crew og bil fordeles', 'Dagen følges live'],
      metaTitle: 'Opgavestyring til flyttefirmaer | Movena',
    },
    en: {
      title: 'Task management without loose ends',
      shortTitle: 'Task management',
      eyebrow: 'From order book to today’s route',
      description:
        'Plan moves, crews, vehicles and times in one live calendar that gives the office peace of mind and the team a clear working day.',
      statement: 'When the plan changes, the whole crew follows',
      problems: [
        'Double-booked resources',
        'Plans in spreadsheets and on paper',
        'Changes take a chain of phone calls',
      ],
      capabilities: [
        { title: 'Visual calendar', text: 'Move jobs and see free capacity across days, vehicles and teams.' },
        { title: 'Crews and vehicles', text: 'Match staffing, skills and vehicles to the specific move.' },
        { title: 'Job cards', text: 'Keep addresses, contacts, times and special requirements in one place.' },
        { title: 'Live status', text: 'The office can see whether the team is on the way, working or done.' },
      ],
      metric: { value: 'Up to date', label: 'plan for both office and crew' },
      workflow: ['The job is booked', 'Crew and vehicle are assigned', 'The day is followed live'],
      metaTitle: 'Task management for moving companies | Movena',
    },
  },
  {
    key: 'automationer',
    slug: { da: 'automationer', en: 'automations' },
    icon: 'Workflow',
    visual: 'messages',
    accent: 'navy',
    da: {
      title: 'Automationer, der holder flowet i gang',
      shortTitle: 'Automationer',
      eyebrow: 'Mindre gentagelse. Mere fremdrift.',
      description:
        'Lad Movena sende beskeder, oprette opgaver og flytte processen videre, når noget vigtigt sker.',
      statement: 'De små rutiner sker, uden at nogen skal huske dem',
      problems: [
        'De samme beskeder skrives igen',
        'Påmindelser sendes for sent',
        'Næste trin bliver overset',
      ],
      capabilities: [
        { title: 'Hændelsesbaserede flows', text: 'Start en handling, når et tilbud godkendes eller en opgave afsluttes.' },
        { title: 'SMS og e-mail', text: 'Send ensartede beskeder med data fra den konkrete flytning.' },
        { title: 'Interne opgaver', text: 'Opret automatisk opfølgninger hos den rigtige kollega.' },
        { title: 'Skabeloner', text: 'Byg jeres bedste arbejdsgang en gang og brug den hver gang.' },
      ],
      metric: { value: 'Færre', label: 'manuelle håndskift i jeres vigtigste standardflows' },
      workflow: ['En hændelse sker', 'Movena udfører reglen', 'Teamet ser resultatet'],
      metaTitle: 'Automationer til flyttefirmaer | Movena',
    },
    en: {
      title: 'Automations that keep the flow moving',
      shortTitle: 'Automations',
      eyebrow: 'Less repetition. More progress.',
      description:
        'Let Movena send messages, create tasks and move the process along when something important happens.',
      statement: 'The small routines happen without anyone having to remember them',
      problems: [
        'The same messages are written again',
        'Reminders go out too late',
        'The next step gets missed',
      ],
      capabilities: [
        { title: 'Event-based flows', text: 'Start an action when a quote is approved or a job is completed.' },
        { title: 'SMS and email', text: 'Send consistent messages with data from the specific move.' },
        { title: 'Internal tasks', text: 'Automatically create follow-ups for the right colleague.' },
        { title: 'Templates', text: 'Build your best workflow once and use it every time.' },
      ],
      metric: { value: 'Fewer', label: 'manual handovers in your most important standard flows' },
      workflow: ['Something happens', 'Movena runs the rule', 'The team sees the result'],
      metaTitle: 'Automations for moving companies | Movena',
    },
  },
  {
    key: 'oekonomistyring',
    slug: { da: 'oekonomistyring', en: 'finance' },
    icon: 'CreditCard',
    visual: 'payments',
    accent: 'blue',
    da: {
      title: 'Økonomistyring tæt på driften',
      shortTitle: 'Økonomistyring',
      eyebrow: 'Fra færdigt job til betalt faktura',
      description:
        'Få fakturagrundlag, betalinger og nøgletal til at hænge sammen med de opgaver, der skaber omsætningen.',
      statement: 'Tallene starter i opgaven — ikke i et separat regneark',
      problems: [
        'Fakturering venter til fredag',
        'Beløb tastes flere gange',
        'Udeståender opdages for sent',
      ],
      capabilities: [
        { title: 'Fakturakladder', text: 'Opret kladden ud fra opgavens aftaler, timer og ekstra ydelser.' },
        { title: 'Betalingsstatus', text: 'Se betalt, sendt og forfalden uden at forlade opgaveoverblikket.' },
        { title: 'Driftsnøgletal', text: 'Følg omsætning, konvertering og kapacitet i samme virkelighed.' },
        { title: 'Sporbart grundlag', text: 'Gå fra et tal direkte tilbage til kunden og den udførte opgave.' },
      ],
      metric: { value: 'Direkte', label: 'fra godkendt opgave til klar fakturakladde' },
      workflow: ['Jobbet afsluttes', 'Grundlaget kontrolleres', 'Faktura og betaling følges'],
      metaTitle: 'Økonomistyring til flyttefirmaer | Movena',
    },
    en: {
      title: 'Finance management close to operations',
      shortTitle: 'Finance',
      eyebrow: 'From finished job to paid invoice',
      description:
        'Make invoice data, payments and key figures line up with the jobs that bring in the revenue.',
      statement: 'The numbers start in the job — not in a separate spreadsheet',
      problems: [
        'Invoicing waits until Friday',
        'Amounts are typed in several times',
        'Outstanding payments are spotted too late',
      ],
      capabilities: [
        { title: 'Invoice drafts', text: 'Create the draft from the job’s agreements, hours and extra services.' },
        { title: 'Payment status', text: 'See paid, sent and overdue without leaving the job overview.' },
        { title: 'Operating figures', text: 'Follow revenue, conversion and capacity in the same picture.' },
        { title: 'Traceable figures', text: 'Go from a number straight back to the customer and the job done.' },
      ],
      metric: { value: 'Straight', label: 'from approved job to ready invoice draft' },
      workflow: ['The job is completed', 'The details are checked', 'Invoice and payment are followed'],
      metaTitle: 'Finance management for moving companies | Movena',
    },
  },
  {
    key: 'app',
    slug: { da: 'app', en: 'app' },
    icon: 'Smartphone',
    visual: 'crew',
    accent: 'sky',
    da: {
      title: 'En app bygget til dagen på farten',
      shortTitle: 'App',
      eyebrow: 'Hele opgaven med i lommen',
      description:
        'Giv flytteholdet adresser, kontaktdata, tjeklister og ændringer i en enkel mobil oplevelse.',
      statement: 'Kontoret planlægger. Teamet eksekverer. Alle ser det samme.',
      problems: [
        'Opgaver printes om morgenen',
        'Billeder ligger på private telefoner',
        'Kontoret mangler live status',
      ],
      capabilities: [
        { title: 'Dagens opgaver', text: 'Hver medarbejder ser sin rute, tider og nødvendige oplysninger.' },
        { title: 'Tjeklister', text: 'Gør den gode arbejdsgang enkel at følge på hver eneste opgave.' },
        { title: 'Billeder og noter', text: 'Dokumentér direkte på opgaven, hvor materialet hører til.' },
        { title: 'Status fra vejen', text: 'Meld ankomst, start og afslutning uden ekstra opkald.' },
      ],
      metric: { value: 'Samme data', label: 'på kontoret, i bilen og hos kunden' },
      workflow: ['Teamet ser planen', 'Opgaven dokumenteres', 'Kontoret opdateres live'],
      metaTitle: 'App til flyttefirmaer og flyttefolk | Movena',
    },
    en: {
      title: 'An app built for a day on the move',
      shortTitle: 'App',
      eyebrow: 'The whole job in your pocket',
      description:
        'Give the moving crew addresses, contact details, checklists and changes in one simple mobile experience.',
      statement: 'The office plans. The team delivers. Everyone sees the same thing.',
      problems: [
        'Jobs are printed every morning',
        'Photos sit on private phones',
        'The office has no live status',
      ],
      capabilities: [
        { title: 'Today’s jobs', text: 'Every employee sees their route, times and the information they need.' },
        { title: 'Checklists', text: 'Make the right way of working easy to follow on every single job.' },
        { title: 'Photos and notes', text: 'Document straight on the job, where the material belongs.' },
        { title: 'Status from the road', text: 'Report arrival, start and finish without extra calls.' },
      ],
      metric: { value: 'Same data', label: 'in the office, in the truck and at the customer’s' },
      workflow: ['The team sees the plan', 'The job is documented', 'The office is updated live'],
      metaTitle: 'App for moving companies and crews | Movena',
    },
  },
  {
    key: 'tilbudsformular',
    slug: { da: 'tilbudsformular', en: 'quote-form' },
    icon: 'FileCheck2',
    visual: 'quote',
    accent: 'navy',
    da: {
      title: 'En tilbudsformular, der kvalificerer kunden',
      shortTitle: 'Tilbudsformular',
      eyebrow: 'Bedre forespørgsler fra første klik',
      description:
        'Indsaml de oplysninger, I faktisk skal bruge for at vurdere flytningen og give et præcist tilbud.',
      statement: 'Kunden gør forarbejdet — uden at formularen føles tung',
      problems: [
        'For få oplysninger i første kontakt',
        'Mange afklarende opkald',
        'Forskellig kvalitet på leads',
      ],
      capabilities: [
        { title: 'Branchefelter', text: 'Spørg til adresser, etager, adgangsforhold, volumen og særlige genstande.' },
        { title: 'Dynamiske spørgsmål', text: 'Vis kun de næste relevante spørgsmål ud fra kundens svar.' },
        { title: 'Direkte i CRM', text: 'Opret kunden og forespørgslen uden kopiering fra en e-mail.' },
        { title: 'Jeres udtryk', text: 'Tilpas formularen, så den passer naturligt ind på jeres hjemmeside.' },
      ],
      metric: { value: 'Kunden selv', label: 'indtaster oplysningerne — derefter følger de med' },
      workflow: ['Kunden beskriver flytningen', 'Leadet lander struktureret', 'Tilbuddet beregnes'],
      metaTitle: 'Tilbudsformular til flyttefirmaer | Movena',
    },
    en: {
      title: 'A quote form that qualifies the customer',
      shortTitle: 'Quote form',
      eyebrow: 'Better enquiries from the first click',
      description:
        'Collect the information you actually need to assess the move and give an accurate quote.',
      statement: 'The customer does the groundwork — without the form feeling heavy',
      problems: [
        'Too little information in the first contact',
        'Lots of calls to clarify',
        'Leads of uneven quality',
      ],
      capabilities: [
        { title: 'Moving-specific fields', text: 'Ask about addresses, floors, access, volume and special items.' },
        { title: 'Dynamic questions', text: 'Only show the next relevant questions based on the customer’s answers.' },
        { title: 'Straight into the CRM', text: 'Create the customer and the enquiry without copying from an email.' },
        { title: 'Your look', text: 'Adjust the form so it fits naturally on your website.' },
      ],
      metric: { value: 'The customer', label: 'enters the details — after that they follow along' },
      workflow: ['The customer describes the move', 'The lead arrives structured', 'The quote is calculated'],
      metaTitle: 'Quote form for moving companies | Movena',
    },
  },
  {
    key: 'salg',
    slug: { da: 'salg', en: 'sales' },
    icon: 'ChartNoAxesCombined',
    visual: 'analytics',
    accent: 'blue',
    da: {
      title: 'Salg med tempo og systematik',
      shortTitle: 'Salg',
      eyebrow: 'Vind flere af de rigtige flytninger',
      description:
        'Gør det let at prioritere leads, bygge professionelle tilbud og følge op på det rigtige tidspunkt.',
      statement: 'Se præcis hvor salget bevæger sig — og hvor det går i stå',
      problems: [
        'Leads behandles i tilfældig rækkefølge',
        'Tilbud ser forskellige ud',
        'Tabte tilbud bliver ikke analyseret',
      ],
      capabilities: [
        { title: 'Salgsblik', text: 'Følg værdien og sandsynligheden i hvert trin af jeres pipeline.' },
        { title: 'Tilbudsskabeloner', text: 'Byg ensartede tilbud hurtigt uden at miste den personlige detalje.' },
        { title: 'Planlagt opfølgning', text: 'Sæt næste handling med det samme og få påmindelsen til tiden.' },
        { title: 'Konverteringsdata', text: 'Se hvilke kanaler, sælgere og opgavetyper der skaber forretning.' },
      ],
      metric: { value: 'Synlig', label: 'pipeline fra nyt lead til vundet opgave' },
      workflow: ['Leadet prioriteres', 'Tilbuddet sendes', 'Opfølgningen sker til tiden'],
      metaTitle: 'Salg og tilbud til flyttefirmaer | Movena',
    },
    en: {
      title: 'Sales with pace and structure',
      shortTitle: 'Sales',
      eyebrow: 'Win more of the right moves',
      description:
        'Make it easy to prioritise leads, build professional quotes and follow up at the right time.',
      statement: 'See exactly where sales are moving — and where they stall',
      problems: [
        'Leads are handled in random order',
        'Quotes all look different',
        'Lost quotes are never analysed',
      ],
      capabilities: [
        { title: 'Sales view', text: 'Follow the value and likelihood at every stage of your pipeline.' },
        { title: 'Quote templates', text: 'Build consistent quotes quickly without losing the personal touch.' },
        { title: 'Planned follow-up', text: 'Set the next action straight away and get the reminder on time.' },
        { title: 'Conversion data', text: 'See which channels, salespeople and job types bring in business.' },
      ],
      metric: { value: 'Visible', label: 'pipeline from new lead to won job' },
      workflow: ['The lead is prioritised', 'The quote is sent', 'The follow-up happens on time'],
      metaTitle: 'Sales and quotes for moving companies | Movena',
    },
  },
  {
    key: 'lagerstyring',
    slug: { da: 'lagerstyring', en: 'warehouse' },
    icon: 'Boxes',
    visual: 'inventory',
    accent: 'sky',
    da: {
      title: 'Lagerstyring til kasser, materiel og udstyr',
      shortTitle: 'Lagerstyring',
      eyebrow: 'Styr på det, der skal med',
      description:
        'Følg beholdning, reservationer og forbrug, så den rigtige bil møder op med det rigtige udstyr.',
      statement: 'Fra lagerhylden til flytteopgaven og sikkert tilbage igen',
      problems: [
        'Kasser mangler på dagen',
        'Udstyr reserveres dobbelt',
        'Forbrug bliver ikke registreret',
      ],
      capabilities: [
        { title: 'Live beholdning', text: 'Se tilgængelige, reserverede og udlånte enheder med det samme.' },
        { title: 'Reservation pr. job', text: 'Knyt materiel til opgaven allerede under planlægningen.' },
        { title: 'Minimumsniveauer', text: 'Bliv gjort opmærksom på varer, før de løber tør.' },
        { title: 'Forbrugshistorik', text: 'Forstå hvad der bruges, hvor det bruges, og hvad det koster.' },
      ],
      metric: { value: 'Et lager', label: 'koblet direkte til jobs, biler og kundeaftaler' },
      workflow: ['Materiel reserveres', 'Udstyr udleveres', 'Beholdningen opdateres'],
      metaTitle: 'Lagerstyring til flyttefirmaer | Movena',
    },
    en: {
      title: 'Warehouse management for boxes, materials and equipment',
      shortTitle: 'Warehouse',
      eyebrow: 'On top of what needs to come along',
      description:
        'Track stock, reservations and usage, so the right truck turns up with the right equipment.',
      statement: 'From the warehouse shelf to the move and safely back again',
      problems: [
        'Boxes are missing on the day',
        'Equipment is booked twice',
        'Usage is never recorded',
      ],
      capabilities: [
        { title: 'Live stock', text: 'See available, reserved and lent-out units straight away.' },
        { title: 'Reservation per job', text: 'Tie materials to the job while you are still planning it.' },
        { title: 'Minimum levels', text: 'Get a heads-up on items before they run out.' },
        { title: 'Usage history', text: 'Understand what is used, where it is used and what it costs.' },
      ],
      metric: { value: 'One warehouse', label: 'linked directly to jobs, vehicles and customer agreements' },
      workflow: ['Materials are reserved', 'Equipment is handed out', 'Stock is updated'],
      metaTitle: 'Warehouse management for moving companies | Movena',
    },
  },
]

export function featurePath(feature: Feature, locale: Locale): string {
  return `${FEATURE_BASE[locale]}/${feature.slug[locale]}`
}

export function getFeatureBySlug(slug: string, locale: Locale): Feature | undefined {
  return features.find((f) => f.slug[locale] === slug)
}
