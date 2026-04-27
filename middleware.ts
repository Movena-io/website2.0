import { NextRequest, NextResponse } from 'next/server'
import { LOCALES, DEFAULT_LOCALE, type Locale } from './lib/locales'

const PUBLIC_FILE = /\.(?:ico|svg|png|jpg|jpeg|webp|gif|woff2?|ttf|otf|eot|js|css|map|xml|txt|webmanifest)$/i

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

  const locale = pickLocale(request.headers.get('accept-language'))
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  url.search = search
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
