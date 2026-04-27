export const LOCALES = ['en', 'da'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

export function localizedPath(locale: Locale, path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  if (path.startsWith('#')) return path
  if (!path.startsWith('/')) return path
  const trimmed = path === '/' ? '' : path
  return `/${locale}${trimmed}`
}
