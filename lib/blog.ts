import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import readingTime from 'reading-time'

export type PostLocale = 'en' | 'da'

const POST_LOCALES: readonly PostLocale[] = ['en', 'da']

export interface PostFrontmatter {
  title: string
  slug: string
  date: string // ISO 8601, e.g. "2026-05-09"
  excerpt: string
  author?: string
  metaTitle?: string
  metaDescription?: string
  image?: string
  imageAlt?: string
  category?: string
  tags?: string[]
  locale?: PostLocale
  draft?: boolean
}

export interface PostMeta extends Required<Pick<PostFrontmatter, 'title' | 'slug' | 'date' | 'excerpt'>> {
  // Translation key: the filename base with any `.<locale>` suffix stripped.
  // Two files sharing a key are two language versions of the same article,
  // even when their public slugs differ.
  key: string
  author: string
  metaTitle: string
  metaDescription: string
  image: string
  imageAlt: string
  category: string
  tags: string[]
  locale: PostLocale
  readingMinutes: number
}

export interface Post extends PostMeta {
  html: string // rendered markdown
}

// A post as served at a specific URL. `locale` is the language the body is
// actually written in; `requestedLocale` is the locale segment in the URL.
// They differ on a fallback page: an untranslated article served under the
// other locale so the reader is not dead-ended. Those pages are noindex.
export interface ResolvedPost extends Post {
  requestedLocale: PostLocale
  isFallback: boolean
  // Public slug per language, for hreflang. Contains a locale only when a real
  // file exists for it.
  slugsByLocale: Partial<Record<PostLocale, string>>
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

const DEFAULTS = {
  author: 'Movena',
  image: '/blog/default-cover.jpg',
  imageAlt: 'Movena',
  category: 'Industry insights',
  tags: [] as string[],
  locale: 'en' as PostLocale,
}

// Filenames excluded from being treated as posts.
const RESERVED_KEYS = new Set(['README', 'readme', 'index', '_template'])

// A post key must be a clean slug. This rejects the duplicates that sync
// clients and Finder leave behind ("post.da 2.md", "post copy.md") and files
// carrying a language suffix we do not support ("post.de.md"). Without this
// they parse as an unrecognised suffix, fall through to the default locale,
// and quietly publish as a second English post at the translation's slug.
const VALID_KEY = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

marked.setOptions({
  gfm: true,
  breaks: false,
})

// Open external links in a new tab; keep internal links untouched.
function externalizeLinks(html: string): string {
  return html.replace(/<a\s+href="(https?:\/\/[^"]+)"/g, (match) => {
    if (match.includes('target=')) return match
    return match.replace(/^<a\s+/, '<a target="_blank" rel="noopener noreferrer" ')
  })
}

function renderMarkdown(content: string): string {
  const html = marked.parse(content, { async: false }) as string
  return externalizeLinks(html)
}

// `moving-quote-follow-up.md`    -> key "moving-quote-follow-up", locale from frontmatter
// `moving-quote-follow-up.da.md` -> key "moving-quote-follow-up", locale "da"
function parseFilename(file: string): { key: string; suffixLocale: PostLocale | null } {
  const base = file.replace(/\.md$/, '')
  const match = base.match(/^(.+)\.([a-z]{2})$/)
  if (match && (POST_LOCALES as readonly string[]).includes(match[2])) {
    return { key: match[1], suffixLocale: match[2] as PostLocale }
  }
  return { key: base, suffixLocale: null }
}

interface LoadedPost {
  meta: PostMeta
  content: string
}

function buildMeta(key: string, locale: PostLocale, fm: PostFrontmatter, content: string): PostMeta {
  const title = fm.title?.trim() || key
  const stats = readingTime(content)
  return {
    key,
    title,
    // The public slug comes from frontmatter, so a Danish version can carry a
    // Danish URL while staying paired to the English one through the key.
    slug: fm.slug?.trim() || key,
    date: fm.date || '1970-01-01',
    excerpt: fm.excerpt?.trim() || '',
    author: fm.author?.trim() || DEFAULTS.author,
    metaTitle: fm.metaTitle?.trim() || title,
    metaDescription: fm.metaDescription?.trim() || fm.excerpt?.trim() || '',
    image: fm.image || DEFAULTS.image,
    imageAlt: fm.imageAlt?.trim() || title,
    category: fm.category?.trim() || DEFAULTS.category,
    tags: Array.isArray(fm.tags) ? fm.tags : DEFAULTS.tags,
    locale,
    readingMinutes: Math.max(1, Math.round(stats.minutes)),
  }
}

// Reads and parses every post file. Deliberately not memoised so that editing
// a markdown file shows up immediately in `next dev`.
function loadAll(includeDrafts = false): LoadedPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  const loaded: LoadedPost[] = []
  for (const file of fs.readdirSync(CONTENT_DIR)) {
    if (!file.endsWith('.md')) continue
    const { key, suffixLocale } = parseFilename(file)
    if (key.startsWith('_') || RESERVED_KEYS.has(key)) continue
    if (!VALID_KEY.test(key)) {
      console.warn(`[blog] Skipping "${file}": "${key}" is not a valid post name.`)
      continue
    }

    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8')
    const parsed = matter(raw)
    const fm = parsed.data as PostFrontmatter
    if (fm.draft && !includeDrafts) continue

    // The filename suffix wins when present; otherwise fall back to the
    // frontmatter field, which is how every unsuffixed file declares itself.
    const declared =
      fm.locale && (POST_LOCALES as readonly string[]).includes(fm.locale) ? fm.locale : null
    const locale = suffixLocale ?? declared ?? DEFAULTS.locale

    loaded.push({ meta: buildMeta(key, locale, fm, parsed.content), content: parsed.content })
  }
  return loaded.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1))
}

function slugsForKey(key: string, all: LoadedPost[]): Partial<Record<PostLocale, string>> {
  const out: Partial<Record<PostLocale, string>> = {}
  for (const { meta } of all) {
    if (meta.key === key) out[meta.locale] = meta.slug
  }
  return out
}

export function getAllPosts(opts?: { includeDrafts?: boolean; locale?: PostLocale }): PostMeta[] {
  const all = loadAll(opts?.includeDrafts)
  const metas = all.map((p) => p.meta)
  return opts?.locale ? metas.filter((m) => m.locale === opts.locale) : metas
}

// The listing for a locale: the native version of every article where one
// exists, and the other language's version as a fallback where it does not.
// Keeps /da/blog populated while translations are still being written; the
// fallback detail pages carry noindex, so nothing duplicate reaches the index.
export function getPostListForLocale(
  locale: PostLocale,
  opts?: { includeDrafts?: boolean },
): PostMeta[] {
  const all = loadAll(opts?.includeDrafts)
  const chosen = new Map<string, PostMeta>()
  for (const { meta } of all) {
    if (meta.locale === locale) chosen.set(meta.key, meta)
  }
  for (const { meta } of all) {
    if (!chosen.has(meta.key)) chosen.set(meta.key, meta)
  }
  return Array.from(chosen.values()).sort((a, b) => (a.date < b.date ? 1 : -1))
}

// Every (locale, slug) pair that must be built: the native routes, plus one
// fallback route per article that has no version in that locale.
export function getPostRoutes(): { locale: PostLocale; slug: string }[] {
  const all = loadAll()
  const routes: { locale: PostLocale; slug: string }[] = []
  for (const locale of POST_LOCALES) {
    const taken = new Set<string>()
    for (const { meta } of all) {
      if (meta.locale !== locale) continue
      taken.add(meta.slug)
      routes.push({ locale, slug: meta.slug })
    }
    for (const { meta } of all) {
      if (meta.locale === locale) continue
      // Translated: the native route above already covers this locale.
      if (slugsForKey(meta.key, all)[locale]) continue
      // Slug collision with a native post: the native one wins.
      if (taken.has(meta.slug)) continue
      taken.add(meta.slug)
      routes.push({ locale, slug: meta.slug })
    }
  }
  return routes
}

// Resolves a URL (locale + slug) to the post to render. Prefers a post written
// in the requested locale; falls back to the other language's version of an
// article that has no version in this locale.
export function resolvePost(slug: string, locale: PostLocale): ResolvedPost | null {
  const all = loadAll()
  const native = all.find((p) => p.meta.locale === locale && p.meta.slug === slug)
  const chosen = native ?? all.find((p) => p.meta.slug === slug)
  if (!chosen) return null

  return {
    ...chosen.meta,
    html: renderMarkdown(chosen.content),
    requestedLocale: locale,
    isFallback: !native,
    slugsByLocale: slugsForKey(chosen.meta.key, all),
  }
}
