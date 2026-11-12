'use client'

// The design's remaining pages (src/pages/OtherPages.tsx in the export), filled
// with the live site's content. Where the design has placeholder text or "kommer
// her" placeholders, the live site's text for the same slot is used; where the
// live site has nothing for the slot, the element is left out rather than
// filled with invented copy.
import Link from 'next/link'
import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { PHONE_DISPLAY, PHONE_HREF, ROUTES } from '@/lib/site-nav'
import { CallbackForm } from './Forms'
import { ArrowLeft, ArrowRight, Check, Compass, Lightbulb, ShieldCheck, UsersRound } from './icons'
import { useT } from './i18n'
import { CtaBand } from './Layout'
import { Button, ButtonLink, Eyebrow, Heading, IconBox, Lead, SectionIntro, cx } from './Ui'

/* ------------------------------------------------------------------ */
/* Book a demo                                                        */
/* ------------------------------------------------------------------ */

export function CallbackPage() {
  const { t } = useT()
  return (
    <section className="callback-page">
      <div className="callback-page-inner">
        <div className="callback-page-copy">
          <Eyebrow>{t('Book en demo', 'Book a demo')}</Eyebrow>
          <Heading as="h1" size="display">
            {t('Se hvordan Movena kan samle jeres hverdag', 'See how Movena can bring your day together')}
          </Heading>
          {/* The design's lead is placeholder text; this is the live page's lead. */}
          <Lead>
            {t(
              'Udfyld formularen, så ringer vi jer op. På demoen viser vi systemet med en opgave fra jeres egen kalender.',
              "Fill in the form and we'll call you. At the demo, we show you the system with a job from your own calendar.",
            )}
          </Lead>
          {/* Step descriptions: the live book-demo and about pages' own steps. */}
          <div className="demo-steps">
            {[
              [t('Vi ringer dig op', 'We call you'), t('En af os tre ringer jer op.', 'One of the three of us calls you.')],
              [
                t('Vi gennemgår jeres flow', 'We go through your workflow'),
                t(
                  'Vi lægger en rigtig opgave ind sammen med jer, fra forespørgsel til faktura.',
                  'We enter a real job together with you, from request to invoice.',
                ),
              ],
              [
                t('Du ser Movena i praksis', 'You see Movena in practice'),
                t(
                  'I ser den gå fra forespørgsel til planlægning og faktura, og bestemmer selv, om Movena passer til jer.',
                  'You see it go from request to planning and invoice, and decide for yourselves whether Movena is right for you.',
                ),
              ],
            ].map(([title, text], index) => (
              <div key={title}>
                <span>0{index + 1}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="trust-points">
            <span>
              <Check /> {t('Tilpasset jeres forretning', 'Tailored to your business')}
            </span>
            <span>
              <Check /> {t('Cirka 20 minutter', 'About 20 minutes')}
            </span>
            <span>
              <Check /> {t('Helt uforpligtende', 'No obligation')}
            </span>
          </div>
        </div>
        <CallbackForm />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Contact (no page in the design: the book-a-demo layout, live copy   */
/* and the live /api/contact form)                                     */
/* ------------------------------------------------------------------ */

export function ContactPage() {
  const c = useLanguage().t.contact
  const empty = { name: '', email: '', phone: '', subject: '', message: '' }
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const set = (key: keyof typeof empty) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm(empty)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="callback-page">
      <div className="callback-page-inner">
        <div className="callback-page-copy">
          <Eyebrow>{c.label}</Eyebrow>
          <Heading as="h1" size="display">
            {c.headline}
          </Heading>
          <Lead>{c.subheadline}</Lead>
        </div>
        {status === 'sent' ? (
          <div className="callback-form">
            <div className="form-sent" role="status">
              <h3>{c.successTitle}</h3>
              <p>{c.successBody}</p>
              <Button variant="outline" onClick={() => setStatus('idle')} className="form-back">
                {c.sendAnother}
              </Button>
            </div>
          </div>
        ) : (
          <form className="callback-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <ContactField id="contact-name" label={c.nameLabel}>
                <input id="contact-name" type="text" required placeholder={c.namePlaceholder} value={form.name} onChange={set('name')} />
              </ContactField>
              <ContactField id="contact-phone" label={c.phoneLabel}>
                <input id="contact-phone" type="tel" required placeholder={c.phonePlaceholder} value={form.phone} onChange={set('phone')} />
              </ContactField>
              <ContactField id="contact-email" label={c.emailLabel} wide>
                <input id="contact-email" type="email" placeholder={c.emailPlaceholder} value={form.email} onChange={set('email')} />
              </ContactField>
              <ContactField id="contact-subject" label={c.subjectLabel} wide>
                <input id="contact-subject" type="text" required placeholder={c.subjectPlaceholder} value={form.subject} onChange={set('subject')} />
              </ContactField>
              <ContactField id="contact-message" label={c.messageLabel} wide>
                <textarea id="contact-message" required rows={5} placeholder={c.messagePlaceholder} value={form.message} onChange={set('message')} />
              </ContactField>
            </div>
            {status === 'error' && (
              <p className="form-alert" role="alert">
                {c.errorPrefix}{' '}
                {/* Where /api/contact delivers, as on the previous page. */}
                <a href="mailto:support@movena.io">support@movena.io</a>
              </p>
            )}
            <Button type="submit" className="form-submit" disabled={status === 'sending'}>
              {status === 'sending' ? c.sending : c.send}
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}

function ContactField({ id, label, wide, children }: { id: string; label: string; wide?: boolean; children: ReactNode }) {
  return (
    <label className={cx('field', wide && 'field-wide')} htmlFor={id}>
      <span>{label}</span>
      {children}
    </label>
  )
}

/* ------------------------------------------------------------------ */
/* Blog                                                               */
/* ------------------------------------------------------------------ */

export type BlogCardData = {
  slug: string
  title: string
  excerpt: string
  category: string
  categoryLabel: string
  author: string
  initials: string
  date: string
  readingMinutes: number
  image?: string
}

function readingLabel(minutes: number, t: (da: string, en: string) => string) {
  return t(`${minutes} min. læsetid`, `${minutes} min read`)
}

function BlogCard({ post, large = false }: { post: BlogCardData; large?: boolean }) {
  const { t, locale } = useT()
  return (
    <Link href={`/${locale}/blog/${post.slug}`} className={large ? 'blog-card blog-card-large' : 'blog-card'}>
      <div className="blog-art blog-art-navy">
        {post.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="blog-cover" src={post.image} alt="" loading={large ? 'eager' : 'lazy'} />
        ) : (
          <>
            <span />
            <span />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/movena-mark-inverse.png" alt="" />
          </>
        )}
      </div>
      <div className="blog-card-copy">
        <span className="blog-category">{post.categoryLabel}</span>
        <Heading as="h2" size={large ? 'lg' : 'md'}>
          {post.title}
        </Heading>
        <p>{post.excerpt}</p>
        <small>
          {post.author} · {readingLabel(post.readingMinutes, t)} <ArrowRight />
        </small>
      </div>
    </Link>
  )
}

export function BlogIndexPage({ cards }: { cards: BlogCardData[] }) {
  const { t } = useT()
  const [filter, setFilter] = useState<string | null>(null)
  // Categories by their visible label, in the order they first appear, so the
  // newest topics lead. Two category keys can share a label (e.g. both
  // translate to "Perspektiv"), and the reader should see one filter for it.
  const categories = useMemo(() => Array.from(new Set(cards.map((c) => c.categoryLabel))), [cards])
  const shown = filter ? cards.filter((c) => c.categoryLabel === filter) : cards
  const [first, ...rest] = shown

  return (
    <>
      <section className="blog-header">
        <div className="section-shell">
          <Eyebrow>{t('Movena indsigt', 'Movena insight')}</Eyebrow>
          <Heading as="h1" size="display">
            {t('Viden til en bedre flytteforretning', 'Knowledge for a better moving business')}
          </Heading>
          {/* The design's first sentence was placeholder text; this one is from the live blog intro. */}
          <Lead>
            {t(
              'Skrevet af os, der bygger Movena sammen med flyttebranchen. Praktiske perspektiver på drift, salg og planlægning.',
              'Written by the people building Movena together with the moving industry. Practical perspectives on operations, sales and planning.',
            )}
          </Lead>
          <div className="blog-filters">
            <button className={filter === null ? 'active' : ''} onClick={() => setFilter(null)} aria-pressed={filter === null}>
              {t('Alle', 'All')}
            </button>
            {categories.map((label) => (
              <button
                className={filter === label ? 'active' : ''}
                key={label}
                onClick={() => setFilter(label)}
                aria-pressed={filter === label}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="section-shell blog-content">
        {first ? (
          <>
            <BlogCard post={first} large />
            <div className="blog-grid">
              {rest.map((post) => (
                <BlogCard post={post} key={post.slug} />
              ))}
            </div>
          </>
        ) : (
          <p className="blog-empty">{t('Ingen artikler i denne kategori endnu.', 'No articles in this category yet.')}</p>
        )}
      </section>
      <div className="section-shell section-shell-tight">
        <CtaBand compact />
      </div>
    </>
  )
}

export type BlogArticleData = {
  title: string
  excerpt: string
  categoryLabel: string
  author: string
  initials: string
  date: string
  readingMinutes: number
  image?: string
  imageAlt?: string
  html: string
  related: BlogCardData[]
}

export function BlogArticlePage({ post }: { post: BlogArticleData }) {
  const { t, locale } = useT()
  return (
    <article className="article-page">
      <header className="article-header section-shell">
        <Link href={`/${locale}/blog`} className="article-back">
          <ArrowLeft /> {t('Tilbage til blog', 'Back to the blog')}
        </Link>
        <span className="blog-category">{post.categoryLabel}</span>
        <Heading as="h1" size="display">
          {post.title}
        </Heading>
        <Lead>{post.excerpt}</Lead>
        <div className="article-meta">
          <span className="author-avatar">{post.initials}</span>
          <div>
            <strong>{post.author}</strong>
            <small>
              {post.date} · {readingLabel(post.readingMinutes, t)}
            </small>
          </div>
        </div>
      </header>
      {post.image && (
        <div className="article-cover section-shell">
          <div className="article-cover-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="blog-cover" src={post.image} alt={post.imageAlt ?? ''} />
          </div>
        </div>
      )}
      <div className="article-body">
        <div className="longform" dangerouslySetInnerHTML={{ __html: post.html }} />
        {/* CTA and author bio: the live demo sentence and the live blog intro. */}
        <div className="article-cta">
          <div>
            <Heading as="h3" size="md">
              {t('Se Movena i praksis', 'See Movena in practice')}
            </Heading>
            <p>
              {t(
                'Book en gratis demo. I stedet for et standardeksempel viser vi systemet med en opgave, I selv har i kalenderen.',
                'Book a free demo. Instead of a standard example, we show you the system with a job from your own calendar.',
              )}
            </p>
          </div>
          <ButtonLink to={ROUTES[locale].bookDemo}>{t('Bliv ringet op', 'Get a call')}</ButtonLink>
        </div>
        <div className="author-box">
          <span className="author-avatar author-avatar-large">{post.initials}</span>
          <div>
            <strong>{t(`Skrevet af ${post.author}`, `Written by ${post.author}`)}</strong>
            <p>
              {t(
                'Praktiske råd om tilbud, planlægning og drift, skrevet af os, der bygger Movena sammen med flyttebranchen.',
                'Practical advice on quotes, planning and operations, written by the people building Movena together with the moving industry.',
              )}
            </p>
          </div>
        </div>
      </div>
      {post.related.length > 0 && (
        <section className="related-section">
          <div className="section-shell">
            <SectionIntro
              eyebrow={t('Læs videre', 'Read on')}
              title={t('Relaterede indlæg', 'Related posts')}
              text={t('Flere praktiske råd om tilbud, planlægning og drift.', 'More practical advice on quotes, planning and operations.')}
            />
            <div className="blog-grid related-grid">
              {post.related.map((card) => (
                <BlogCard post={card} key={card.slug} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}

/* ------------------------------------------------------------------ */
/* About                                                              */
/* ------------------------------------------------------------------ */

const TEAM = [
  { name: 'Villads Laun', role: ['Salg og marketing', 'Sales and marketing'], email: 'vl@movena.io' },
  { name: 'Valdemar Lorentzen', role: ['Udvikling og drift', 'Development and operations'], email: 'vcl@movena.io' },
  { name: 'Samuel Odegaard', role: ['Strategi og support', 'Strategy and support'], email: 'sto@movena.io' },
]

export function AboutPage() {
  const { t } = useT()
  // Principle and reason descriptions: sentences from the live about page,
  // FAQ, planning page and blog (the design's own were placeholders).
  const principles = [
    {
      icon: Compass,
      title: t('Retning før funktioner', 'Direction before features'),
      text: t('Nye funktioner kommer fra det, flyttefirmaerne beder om.', 'New features come from what the moving companies ask for.'),
    },
    {
      icon: Lightbulb,
      title: t('Enkelhed i hverdagen', 'Simplicity in the everyday'),
      text: t('Bygget efter den måde, en flytning faktisk kører på.', 'Built around the way a move actually runs.'),
    },
    {
      icon: ShieldCheck,
      title: t('Tillid i alle led', 'Trust at every step'),
      text: t('I ejer jeres data og kan tage det med.', 'You own your data and can take it with you.'),
    },
  ]
  return (
    <>
      <section className="about-page-hero">
        <div className="section-shell about-page-grid">
          <div>
            <Eyebrow>{t('Om Movena', 'About Movena')}</Eyebrow>
            <Heading as="h1" size="display">
              {t('Vi bygger et bedre arbejdssted for flyttebranchen', "We're building a better workplace for the moving industry")}
            </Heading>
            <Lead>
              {t(
                'Vi startede Movena, da vi så, hvor meget tid flyttefirmaer bruger på manuelt arbejde, og at ingen havde bygget noget til dem.',
                'We started Movena when we saw how much time moving companies spend on manual work, and that nobody had built anything for them.',
              )}
            </Lead>
          </div>
          <div className="about-hero-art">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/movena-mark-inverse.png" alt="" />
            <span>Movena</span>
          </div>
        </div>
      </section>
      <section className="section-shell story-section">
        <div>
          <Eyebrow>{t('Vores udgangspunkt', 'Where we start from')}</Eyebrow>
          <Heading>{t('Drift skal føles sammenhængende', 'Operations should feel connected')}</Heading>
        </div>
        <div>
          <Lead>
            {t(
              'Før vi byggede noget, brugte vi måneder på at tale med flyttefirmaer og se, hvordan de arbejder. Hver del af Movena er formet af dem, der skal bruge den, og sådan bygger vi det stadig.',
              "Before we built anything, we spent months talking to moving companies and seeing how they work. Every part of Movena is shaped by the people who use it, and that's still how we build it.",
            )}
          </Lead>
          <p>
            {t(
              'Ingen kender branchen bedre end dem, der står i den. Derfor bygger vi Movena sammen med dem.',
              "Nobody knows the industry better than the people in it. That's why we build Movena together with them.",
            )}
          </p>
        </div>
      </section>
      <section className="principles-section">
        <div className="section-shell">
          <SectionIntro
            eyebrow={t('Sådan arbejder vi', 'How we work')}
            title={t('Tre principper i alt, vi bygger', 'Three principles in everything we build')}
            text={t('Ikke bygget til dem. Bygget med dem.', 'Not built for them. Built with them.')}
            align="center"
          />
          <div className="three-grid">
            {principles.map((item, index) => (
              <article className="principle-page-card" key={item.title}>
                <span>0{index + 1}</span>
                <IconBox icon={item.icon} />
                <Heading as="h3" size="md">
                  {item.title}
                </Heading>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="reasons-section" aria-label={t('Grunde til at vælge Movena', 'Reasons to choose Movena')}>
        <div className="reasons-heading section-shell">
          <Eyebrow>{t('Hvorfor Movena', 'Why Movena')}</Eyebrow>
          <Heading>{t('Bygget med flyttehverdagen som udgangspunkt', 'Built around the everyday of a moving company')}</Heading>
        </div>
        <div className="reasons-scroll">
          {[
            [
              t('Dansk branchefokus', 'Danish industry focus'),
              t('Support på dansk, direkte fra os, der har bygget systemet.', 'Support in English and Danish, straight from the people who built the system.'),
            ],
            [
              t('En samlet platform', 'One connected platform'),
              t(
                'Leads, tilbud, planlægning, mandskab, biler, timer og fakturering, alt sammen forbundet.',
                'Leads, quotes, planning, crew, vehicles, hours and invoicing, all connected.',
              ),
            ],
            [
              t('Enkel implementering', 'Simple implementation'),
              t('Vi sætter det op sammen med jer på et opstartsmøde.', 'We set it up together with you at a kick-off meeting.'),
            ],
            [
              t('Tæt produktdialog', 'Close product dialogue'),
              t(
                'Hver del af Movena er formet af dem, der skal bruge den, og sådan bygger vi det stadig.',
                "Every part of Movena is shaped by the people who use it, and that's still how we build it.",
              ),
            ],
            [
              t('Mobil fra starten', 'Mobile from the start'),
              t(
                'Folkene ser dagens job i appen, starter og stopper tiden og tager billeder.',
                "The crew sees today's jobs in the app, starts and stops the clock and takes photos.",
              ),
            ],
            [
              t('Data der følger opgaven', 'Data that follows the job'),
              t(
                'Hver flytning har kort, rute og køretid, og noterne følger med ud i appen.',
                'Every move has a map, route and drive time, and the notes go along into the app.',
              ),
            ],
          ].map(([reason, text], index) => (
            <article key={reason}>
              <span>0{index + 1}</span>
              <p>{reason}</p>
              <small>{text}</small>
            </article>
          ))}
        </div>
      </section>
      <section className="section-shell team-placeholder">
        <div>
          <Eyebrow>{t('Holdet bag', 'The team')}</Eyebrow>
          <Heading>{t('Lille team. Tæt på produktet.', 'Small team. Close to the product.')}</Heading>
          <Lead>
            {t(
              'Når I kontakter os, taler I med dem, der har bygget systemet. Ingen supportkø i et andet land.',
              'When you contact us, you talk to the people who built the system. No support queue in another country.',
            )}
          </Lead>
        </div>
        <div className="team-cards">
          {TEAM.map((person) => (
            <div key={person.name}>
              <span>
                <UsersRound />
              </span>
              <strong>{person.name}</strong>
              <small>{t(person.role[0], person.role[1])}</small>
              <a href={`mailto:${person.email}`}>{person.email}</a>
            </div>
          ))}
        </div>
      </section>
      <div className="section-shell section-shell-tight">
        <CtaBand />
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Legal                                                              */
/* ------------------------------------------------------------------ */

export function LegalPage({ title, updated, children }: { title: string; updated?: string; children: ReactNode }) {
  return (
    <section className="legal-page section-shell">
      <Heading as="h1" size="display">
        {title}
      </Heading>
      {updated && <p className="legal-updated">{updated}</p>}
      <div className="longform">{children}</div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 404 and error                                                      */
/* ------------------------------------------------------------------ */

export function NotFoundPage() {
  const { t, locale } = useT()
  return (
    <section className="not-found">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/movena-mark-primary.png" alt="" />
      <span>404</span>
      <Heading as="h1" size="xl">
        {t('Siden blev ikke fundet', 'Page not found')}
      </Heading>
      <Lead>{t('Den side, du leder efter, findes ikke eller er blevet flyttet.', "The page you're looking for doesn't exist or has moved.")}</Lead>
      <div>
        <ButtonLink to={ROUTES[locale].home}>{t('Gå til forsiden', 'Go to the home page')}</ButtonLink>
        <ButtonLink to={ROUTES[locale].bookDemo} variant="outline">
          {t('Bliv ringet op', 'Get a call')}
        </ButtonLink>
      </div>
    </section>
  )
}

// No error page in the design: the 404 layout with the live error page's copy.
export function ErrorPage({ reset }: { reset: () => void }) {
  const { t, locale } = useT()
  return (
    <section className="not-found">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/movena-mark-primary.png" alt="" />
      <Heading as="h1" size="xl">
        {t('Noget gik galt', 'Something went wrong')}
      </Heading>
      <Lead>
        {t(
          'Det er vores fejl, ikke din. Prøv igen om lidt. Haster det, kan du ringe til os på ',
          "It's our fault, not yours. Try again in a moment. If it's urgent, call us on ",
        )}
        <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>.
      </Lead>
      <div>
        <Button onClick={reset}>{t('Prøv igen', 'Try again')}</Button>
        <ButtonLink to={ROUTES[locale].home} variant="outline">
          {t('Til forsiden', 'To the home page')}
        </ButtonLink>
      </div>
    </section>
  )
}
