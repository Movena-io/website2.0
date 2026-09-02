import { NextRequest, NextResponse } from 'next/server'
import { LOCALES, DEFAULT_LOCALE, type Locale } from './lib/locales'

const PUBLIC_FILE = /\.(?:ico|svg|png|jpg|jpeg|webp|gif|avif|mp4|webm|mov|woff2?|ttf|otf|eot|js|css|map|xml|txt|webmanifest)$/i

// Visitors in Denmark get the Danish site regardless of what their browser
// asks for. Plenty of Danish moving companies run an English-language
// browser or OS, so Accept-Language alone was sending them to /en.
const GEO_LOCALE: Record<string, Locale> = {
  DK: 'da',
}

function pickByGeo(request: NextRequest): Locale | null {
  const country =
    request.geo?.country ?? request.headers.get('x-vercel-ip-country') ?? ''
  return GEO_LOCALE[country.toUpperCase()] ?? null
}

function pickLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE
  const langs = acceptLanguage
    .split(',')
    .map((part) => part.trim().toLowerCase().split(';')[0])
  for (const lang of langs) {
    const base = lang.split('-')[0]
    if ((LOCALES as readonly string[]).includes(base)) {
      return base as Locale
    }
  }
  return DEFAULT_LOCALE
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  const hasLocalePrefix = (LOCALES as readonly string[]).some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
  if (hasLocalePrefix) return NextResponse.next()

  // Geo wins, then the browser's stated preference, then English.
  const locale =
    pickByGeo(request) ?? pickLocale(request.headers.get('accept-language'))

  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  url.search = search

  // 307, never 308. The destination varies per visitor, so a permanent
  // redirect would let one visitor's result get cached as the canonical
  // answer for everyone, crawlers included.
  const response = NextResponse.redirect(url, 307)
  response.headers.set('Vary', 'Accept-Language, x-vercel-ip-country')
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
