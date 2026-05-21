// Currencies offered in the calculator. Selecting one changes the currency code
// shown across the whole calculator and the pre-filled hourly cost. Number
// grouping still follows the site language (en/da); only the code + default rate
// change here. Defaults are rough loaded-hourly-cost figures, adjustable.

export interface CurrencyConfig {
  code: string
  label: string
  defaultHourly: number
}

export const CURRENCIES: CurrencyConfig[] = [
  { code: 'DKK', label: 'Danish krone (DKK)', defaultHourly: 250 },
  { code: 'EUR', label: 'Euro (EUR)', defaultHourly: 35 },
  { code: 'SEK', label: 'Swedish krona (SEK)', defaultHourly: 350 },
  { code: 'NOK', label: 'Norwegian krone (NOK)', defaultHourly: 350 },
  { code: 'GBP', label: 'British pound (GBP)', defaultHourly: 28 },
  { code: 'CHF', label: 'Swiss franc (CHF)', defaultHourly: 35 },
  { code: 'PLN', label: 'Polish złoty (PLN)', defaultHourly: 140 },
  { code: 'CZK', label: 'Czech koruna (CZK)', defaultHourly: 850 },
  { code: 'HUF', label: 'Hungarian forint (HUF)', defaultHourly: 13000 },
  { code: 'RON', label: 'Romanian leu (RON)', defaultHourly: 175 },
  { code: 'BGN', label: 'Bulgarian lev (BGN)', defaultHourly: 68 },
  { code: 'ISK', label: 'Icelandic króna (ISK)', defaultHourly: 4800 },
]

export const DEFAULT_CURRENCY = 'DKK'

export function getCurrency(code: string): CurrencyConfig {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0]
}
