import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import readingTime from 'reading-time'

export type PostLocale = 'en' | 'da'

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

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

const DEFAULTS = {
  author: 'Movena',
  image: '/blog/default-cover.jpg',
  imageAlt: 'Movena',
  category: 'Industry insights',
  tags: [] as string[],
  locale: 'en' as PostLocale,
}

function ensureDir(): boolean {
  return fs.existsSync(CONTENT_DIR)
}

function readPostFile(slug: string): { data: PostFrontmatter; content: string } | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const parsed = matter(raw)
  return {
    data: parsed.data as PostFrontmatter,
    content: parsed.content,
  }
}

function buildMeta(slug: string, fm: PostFrontmatter, content: string): PostMeta {
  const title = fm.title?.trim() || slug
  const stats = readingTime(content)
  return {
    title,
    slug: fm.slug || slug,
    date: fm.date || '1970-01-01',
    excerpt: fm.excerpt?.trim() || '',
    author: fm.author?.trim() || DEFAULTS.author,
    metaTitle: fm.metaTitle?.trim() || title,
    metaDescription: fm.metaDescription?.trim() || fm.excerpt?.trim() || '',
    image: fm.image || DEFAULTS.image,
    imageAlt: fm.imageAlt?.trim() || title,
    category: fm.category?.trim() || DEFAULTS.category,
    tags: Array.isArray(fm.tags) ? fm.tags : DEFAULTS.tags,
    locale: fm.locale || DEFAULTS.locale,
    readingMinutes: Math.max(1, Math.round(stats.minutes)),
  }
}

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

// Filenames excluded from being treated as posts.
const RESERVED_SLUGS = new Set(['README', 'readme', 'index', '_template'])

export function getAllSlugs(): string[] {
  if (!ensureDir()) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
    .filter((slug) => !slug.startsWith('_') && !RESERVED_SLUGS.has(slug))
}

export function getAllPosts(opts?: { includeDrafts?: boolean }): PostMeta[] {
  if (!ensureDir()) return []
  const includeDrafts = opts?.includeDrafts ?? false
  const slugs = getAllSlugs()
  const posts: PostMeta[] = []
  for (const slug of slugs) {
    const file = readPostFile(slug)
    if (!file) continue
    if (file.data.draft && !includeDrafts) continue
    posts.push(buildMeta(slug, file.data, file.content))
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | null {
  const file = readPostFile(slug)
  if (!file) return null
  if (file.data.draft) return null
  const meta = buildMeta(slug, file.data, file.content)
  const html = renderMarkdown(file.content)
  return { ...meta, html }
}
