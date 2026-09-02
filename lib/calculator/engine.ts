// Cost Saver Calculator — savings engine.
//
// Pure, deterministic math. No I/O, no React. Shared by the form (live preview),
// the result view, and the API route (so the stored/emailed numbers always match
// what the visitor saw). Multipliers are the credibility core — see
// cost-saver-calculator-spec.md section 8. Change only with reason.

export const MULTIPLIERS = {
  planning: 0.4, // % of move-planning time Movena removes
  quoting: 0.5, // % of quote time removed (customer fills data; some still review physically)
  followup: 0.85, // % of lead follow-up time automated
  automation: 0.9, // % of manual customer-messaging time removed
  inventoryChasing: 0.9, // % of chase-up time automated
  inventoryRecovery: 0.3, // % of self-reported loss recovered (money)
} as const

export const DEFAULT_HOURLY_COST = 250 // DKK, loaded hourly cost, pre-filled and adjustable
export const WEEKS_PER_MONTH = 4.33

export interface CalculatorInputs {
  // Baseline
  currency: string
  movesPerMonth: number
  hourlyCost: number

  // Planning (always on)
  planningMinutesPerMove: number

  // Quoting
  doesQuoting: boolean
  quotesPerMonth: number
  minutesPerQuote: number

  // Lead follow-up (self-diagnosis branch)
  doesFollowup: boolean
  leadsPerMonth: number
  minutesPerFollowup: number
  followupUpliftPct: number // used only when doesFollowup === false

  // Reviews (self-diagnosis branch)
  reviewsPerMonth: number
  sendsReviewRequest: boolean
  extraReviewsPerMonth: number // used only when sendsReviewRequest === false
  reviewMinutesPerMonth: number // used only when sendsReviewRequest === true

  // Automation flows (manual customer messaging, time only)
  doesMessaging: boolean
  messagingHoursPerWeek: number

  // Inventory (self-reported loss)
  tracksInventory: boolean
  itemsLostPerMonth: number
  minutesChasingPerItem: number
  costPerItem: number
}

export const EMPTY_INPUTS: CalculatorInputs = {
  currency: 'DKK',
  movesPerMonth: 0,
  hourlyCost: DEFAULT_HOURLY_COST,
  planningMinutesPerMove: 0,
  doesQuoting: false,
  quotesPerMonth: 0,
  minutesPerQuote: 0,
  doesFollowup: false,
  leadsPerMonth: 0,
  minutesPerFollowup: 0,
  followupUpliftPct: 0,
  reviewsPerMonth: 0,
  sendsReviewRequest: false,
  extraReviewsPerMonth: 0,
  reviewMinutesPerMonth: 0,
  doesMessaging: false,
  messagingHoursPerWeek: 0,
  tracksInventory: false,
  itemsLostPerMonth: 0,
  minutesChasingPerItem: 0,
  costPerItem: 0,
}

export interface FormulaUnits {
  movesPerMonth: string
  quotesPerMonth: string
  leadsPerMonth: string
  min: string
  minPerMonth: string
  hrsPerWeek: string
  weeks: string
  itemsPerMonth: string
  recovered: string
}

const DEFAULT_FORMULA_UNITS: FormulaUnits = {
  movesPerMonth: 'moves/mo',
  quotesPerMonth: 'quotes/mo',
  leadsPerMonth: 'leads/mo',
  min: 'min',
  minPerMonth: 'min/mo',
  hrsPerWeek: 'hrs/wk',
  weeks: 'wks',
  itemsPerMonth: 'items/mo',
  recovered: 'recovered',
}

// One row in the transparent breakdown. `formula` is a human-readable trace of
// exactly how the number was reached, so a skeptical mover can poke at it.
// `explanation` says the same thing in a sentence, for the owner who is not
// going to parse the formula: the input, what the percentage means, the result.
export interface BreakdownRow {
  key: 'planning' | 'quoting' | 'followup' | 'reviewsTime' | 'messaging' | 'inventoryTime' | 'inventoryMoney'
  hoursSavedPerMonth: number
  moneySavedPerMonth: number // direct DKK not derived from hours (inventory recovery)
  formula: string
  explanation: string
}

// Sentence templates, one per row, supplied by the caller so they stay
// translatable. Placeholders are filled from the visitor's own inputs.
export type ExplanationTemplates = Record<BreakdownRow['key'], string>

export interface ExplainOptions {
  templates: ExplanationTemplates
  // Locale-aware number formatting. Defaults to plain digits.
  formatNumber?: (n: number) => string
}

export interface CalculatorResult {
  rows: BreakdownRow[]

  totalHoursPerMonth: number
  moneyFromTimePerMonth: number
  directMoneyPerMonth: number

  // Headline: hard savings only (money from time + direct money). Never includes upside.
  headlineMonthly: number
  headlineAnnual: number

  // Upside lives on its own lines, never folded into the headline.
  upside: {
    revenuePct: number | null // lead follow-up self-reported %
    extraReviewsPerMonth: number | null // reviews self-reported count
  }

  // Surfaced as "what's at risk today" next to the recovered figure.
  inventoryExposureMonthly: number | null
}

const round = (n: number) => Math.round(n * 100) / 100

// Round to a clean figure so headline numbers never show false precision.
// Shared by the UI and the emailed report so they always match.
export function roundNice(n: number): number {
  if (n >= 10000) return Math.round(n / 1000) * 1000
  if (n >= 1000) return Math.round(n / 100) * 100
  if (n >= 100) return Math.round(n / 10) * 10
  return Math.round(n)
}

export function computeSavings(
  input: CalculatorInputs,
  units?: FormulaUnits,
  explain?: ExplainOptions,
): CalculatorResult {
  const u = units ?? DEFAULT_FORMULA_UNITS
  const rows: BreakdownRow[] = []
  const hourly = input.hourlyCost > 0 ? input.hourlyCost : DEFAULT_HOURLY_COST

  const fmt = explain?.formatNumber ?? ((n: number) => String(n))

  // The explanation is read as a sentence, so a 30-minute saving must not
  // round down to "that is 0 hours a month". Keep one decimal below 10.
  const showHours = (n: number) => fmt(n < 10 ? Math.round(n * 10) / 10 : Math.round(n))

  const say = (key: BreakdownRow['key'], vars: Record<string, string | number>) =>
    explain ? explain.templates[key].replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? '')) : ''

  // Planning (always on)
  if (input.movesPerMonth > 0 && input.planningMinutesPerMove > 0) {
    const hrs = (input.movesPerMonth * input.planningMinutesPerMove * MULTIPLIERS.planning) / 60
    rows.push({
      key: 'planning',
      hoursSavedPerMonth: round(hrs),
      moneySavedPerMonth: 0,
      formula: `${input.movesPerMonth} ${u.movesPerMonth} × ${input.planningMinutesPerMove} ${u.min} × ${MULTIPLIERS.planning * 100}% ÷ 60`,
      explanation: say('planning', {
        moves: fmt(input.movesPerMonth),
        min: fmt(input.planningMinutesPerMove),
        pct: MULTIPLIERS.planning * 100,
        hours: showHours(hrs),
      }),
    })
  }

  // Quoting
  if (input.doesQuoting && input.quotesPerMonth > 0 && input.minutesPerQuote > 0) {
    const hrs = (input.quotesPerMonth * input.minutesPerQuote * MULTIPLIERS.quoting) / 60
    rows.push({
      key: 'quoting',
      hoursSavedPerMonth: round(hrs),
      moneySavedPerMonth: 0,
      formula: `${input.quotesPerMonth} ${u.quotesPerMonth} × ${input.minutesPerQuote} ${u.min} × ${MULTIPLIERS.quoting * 100}% ÷ 60`,
      explanation: say('quoting', {
        quotes: fmt(input.quotesPerMonth),
        min: fmt(input.minutesPerQuote),
        pct: MULTIPLIERS.quoting * 100,
        hours: showHours(hrs),
      }),
    })
  }

  // Lead follow-up (time saving only when they already do it)
  if (input.doesFollowup && input.leadsPerMonth > 0 && input.minutesPerFollowup > 0) {
    const hrs = (input.leadsPerMonth * input.minutesPerFollowup * MULTIPLIERS.followup) / 60
    rows.push({
      key: 'followup',
      hoursSavedPerMonth: round(hrs),
      moneySavedPerMonth: 0,
      formula: `${input.leadsPerMonth} ${u.leadsPerMonth} × ${input.minutesPerFollowup} ${u.min} × ${MULTIPLIERS.followup * 100}% ÷ 60`,
      explanation: say('followup', {
        leads: fmt(input.leadsPerMonth),
        min: fmt(input.minutesPerFollowup),
        pct: MULTIPLIERS.followup * 100,
        hours: showHours(hrs),
      }),
    })
  }

  // Reviews — time saved automating the review request they already send by hand
  if (input.sendsReviewRequest && input.reviewMinutesPerMonth > 0) {
    const hrs = (input.reviewMinutesPerMonth * MULTIPLIERS.automation) / 60
    rows.push({
      key: 'reviewsTime',
      hoursSavedPerMonth: round(hrs),
      moneySavedPerMonth: 0,
      formula: `${input.reviewMinutesPerMonth} ${u.minPerMonth} × ${MULTIPLIERS.automation * 100}% ÷ 60`,
      explanation: say('reviewsTime', {
        minPerMonth: fmt(input.reviewMinutesPerMonth),
        pct: MULTIPLIERS.automation * 100,
        hours: showHours(hrs),
      }),
    })
  }

  // Automation flows (manual messaging, time only)
  if (input.doesMessaging && input.messagingHoursPerWeek > 0) {
    const hrs = input.messagingHoursPerWeek * WEEKS_PER_MONTH * MULTIPLIERS.automation
    rows.push({
      key: 'messaging',
      hoursSavedPerMonth: round(hrs),
      moneySavedPerMonth: 0,
      formula: `${input.messagingHoursPerWeek} ${u.hrsPerWeek} × ${WEEKS_PER_MONTH} ${u.weeks} × ${MULTIPLIERS.automation * 100}%`,
      explanation: say('messaging', {
        hrsPerWeek: fmt(input.messagingHoursPerWeek),
        hrsPerMonth: showHours(input.messagingHoursPerWeek * WEEKS_PER_MONTH),
        pct: MULTIPLIERS.automation * 100,
        hours: showHours(hrs),
      }),
    })
  }

  // Inventory — time saved on chasing. Computed from the numbers regardless of
  // whether they formally "track" inventory today (most have a good estimate).
  if (input.itemsLostPerMonth > 0 && input.minutesChasingPerItem > 0) {
    const hrs = (input.itemsLostPerMonth * input.minutesChasingPerItem * MULTIPLIERS.inventoryChasing) / 60
    rows.push({
      key: 'inventoryTime',
      hoursSavedPerMonth: round(hrs),
      moneySavedPerMonth: 0,
      formula: `${input.itemsLostPerMonth} ${u.itemsPerMonth} × ${input.minutesChasingPerItem} ${u.min} × ${MULTIPLIERS.inventoryChasing * 100}% ÷ 60`,
      explanation: say('inventoryTime', {
        items: fmt(input.itemsLostPerMonth),
        min: fmt(input.minutesChasingPerItem),
        pct: MULTIPLIERS.inventoryChasing * 100,
        hours: showHours(hrs),
      }),
    })
  }

  // Inventory — money recovered
  let inventoryExposureMonthly: number | null = null
  if (input.itemsLostPerMonth > 0 && input.costPerItem > 0) {
    inventoryExposureMonthly = round(input.itemsLostPerMonth * input.costPerItem)
    const money = input.itemsLostPerMonth * input.costPerItem * MULTIPLIERS.inventoryRecovery
    rows.push({
      key: 'inventoryMoney',
      hoursSavedPerMonth: 0,
      moneySavedPerMonth: round(money),
      formula: `${input.itemsLostPerMonth} ${u.itemsPerMonth} × ${input.costPerItem} ${input.currency} × ${MULTIPLIERS.inventoryRecovery * 100}% ${u.recovered}`,
      explanation: say('inventoryMoney', {
        items: fmt(input.itemsLostPerMonth),
        cost: fmt(input.costPerItem),
        cur: input.currency,
        exposure: fmt(Math.round(inventoryExposureMonthly ?? 0)),
        pct: MULTIPLIERS.inventoryRecovery * 100,
        money: fmt(Math.round(money)),
      }),
    })
  }

  const totalHoursPerMonth = round(rows.reduce((s, r) => s + r.hoursSavedPerMonth, 0))
  const moneyFromTimePerMonth = round(totalHoursPerMonth * hourly)
  const directMoneyPerMonth = round(rows.reduce((s, r) => s + r.moneySavedPerMonth, 0))
  const headlineMonthly = round(moneyFromTimePerMonth + directMoneyPerMonth)

  return {
    rows,
    totalHoursPerMonth,
    moneyFromTimePerMonth,
    directMoneyPerMonth,
    headlineMonthly,
    headlineAnnual: round(headlineMonthly * 12),
    upside: {
      revenuePct: !input.doesFollowup && input.followupUpliftPct > 0 ? input.followupUpliftPct : null,
      extraReviewsPerMonth:
        !input.sendsReviewRequest && input.extraReviewsPerMonth > 0 ? input.extraReviewsPerMonth : null,
    },
    inventoryExposureMonthly,
  }
}
