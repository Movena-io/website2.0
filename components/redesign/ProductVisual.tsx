'use client'

// Product mockups from the design (src/components/ProductVisual.tsx in the
// export). Markup and class names are the design's; every visible string is
// the design's Danish with an English translation beside it.
import type { VisualType } from '@/lib/features'
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  House,
  Mail,
  MapPin,
  Menu,
  MessageSquareText,
  PackageCheck,
  Phone,
  Search,
  Truck,
  UserRound,
  UsersRound,
} from './icons'
import { useMoney, useT } from './i18n'
import { cx } from './Ui'

type T = <V>(da: V, en: V) => V
type L = { t: T; m: (amount: string) => string; pct: (da: string) => string }

function useL(): L {
  const { t } = useT()
  const m = useMoney()
  // "12,8%" on /da, "12.8%" on /en.
  const pct = (da: string) => t(da, da.replace(',', '.'))
  return { t, m, pct }
}

type ProductVisualProps = {
  type: VisualType | 'job'
  compact?: boolean
  className?: string
  segmented?: boolean
  homepage?: boolean
}

const names = ['Nora Jensen', 'Mikkel Lund', 'Laura Hansen']

export function ProductVisual({ type, compact = false, className, segmented = false, homepage = false }: ProductVisualProps) {
  const L = useL()
  if (segmented) {
    return (
      <div
        className={cx(
          'product-window',
          compact && 'product-window-compact',
          'product-window-segmented',
          homepage && 'product-window-home',
          className,
        )}
        data-product-segment={type}
      >
        <div className="product-segment-main">
          <ProductWindowContent type={type} homepage={homepage} L={L} />
        </div>
        {renderSegment(type, L)}
      </div>
    )
  }

  return (
    <div className={cx('product-window', compact && 'product-window-compact', homepage && 'product-window-home', className)}>
      <ProductWindowContent type={type} homepage={homepage} L={L} />
    </div>
  )
}

function ProductWindowContent({ type, homepage, L }: { type: ProductVisualProps['type']; homepage: boolean; L: L }) {
  const { t } = L
  if (homepage) {
    return (
      <>
        <div className="home-product-topbar">
          <div className="home-product-search">
            <Search />
            <span>{t('Søg i kunder, tilbud og jobs...', 'Search customers, quotes and jobs...')}</span>
          </div>
          <Bell />
          <div className="product-avatar">MV</div>
        </div>
        <div className="product-body">
          <HomeProductSidebar activeType={type} L={L} />
          <div className="product-content home-product-content">{renderHomepageVisual(type, L)}</div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="product-topbar">
        <div className="product-dots">
          <i />
          <i />
          <i />
        </div>
        <span>Movena</span>
        <div className="product-avatar">MJ</div>
      </div>
      <div className="product-body">
        <aside className="product-sidebar" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/movena-mark-inverse.png" alt="" />
          <i className="active" />
          <i />
          <i />
          <i />
          <i />
        </aside>
        <div className="product-content">{renderVisual(type, L)}</div>
      </div>
    </>
  )
}

function HomeProductSidebar({ activeType, L }: { activeType: ProductVisualProps['type']; L: L }) {
  const { t } = L
  const activeKey =
    activeType === 'crm'
      ? 'leads'
      : activeType === 'quote'
        ? 'quotes'
        : activeType === 'schedule' || activeType === 'job'
          ? 'calendar'
          : activeType === 'payments'
            ? 'invoicing'
            : 'overview'

  const top: Array<[string, string]> = [
    ['overview', t('Overblik', 'Overview')],
    ['leads', 'Leads'],
    ['quotes', t('Tilbud', 'Quotes')],
    ['calendar', t('Kalender', 'Calendar')],
    ['tasks', t('Opgaver', 'Tasks')],
  ]
  const ops: Array<[string, string]> = [
    ['crew', t('Mandskab', 'Crew')],
    ['vehicles', t('Køretøjer', 'Vehicles')],
    ['invoicing', t('Fakturering', 'Invoicing')],
  ]

  return (
    <aside className="product-sidebar product-sidebar-home" aria-hidden="true">
      <div className="home-product-brand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/movena-mark-inverse.png" alt="" />
        <strong>movena</strong>
      </div>
      <small>{t('OVERBLIK', 'OVERVIEW')}</small>
      {top.map(([key, label]) => (
        <span className={key === activeKey ? 'active' : ''} key={key}>
          <i />
          {label}
        </span>
      ))}
      <small>{t('DRIFT', 'OPERATIONS')}</small>
      {ops.map(([key, label]) => (
        <span className={key === activeKey ? 'active' : ''} key={key}>
          <i />
          {label}
        </span>
      ))}
    </aside>
  )
}

function renderSegment(type: ProductVisualProps['type'], L: L) {
  const { t, m, pct } = L
  if (type === 'crm') {
    return (
      <div className="product-segment-stack" aria-hidden="true">
        <div className="product-segment-card segment-lead-card">
          <div className="segment-card-heading">
            <span className="segment-icon">
              <UserRound />
            </span>
            <Status tone="green">{t('Nyt lead', 'New lead')}</Status>
          </div>
          <strong>{t('Kunde #104', 'Customer #104')}</strong>
          <small>{t('Oprettet for 2 min. siden', 'Created 2 min. ago')}</small>
          <div className="segment-detail">
            <MapPin />
            <span>{t('København → Aarhus', 'Copenhagen → Aarhus')}</span>
          </div>
          <div className="segment-detail">
            <Phone />
            <span>+45 20 30 40 50</span>
          </div>
        </div>
        <div className="product-segment-card segment-activity-card">
          <small>{t('Næste skridt', 'Next step')}</small>
          <strong>{t('Ring kunden op', 'Call the customer')}</strong>
          <span>
            <Clock3 /> {t('I dag · 10:30', 'Today · 10:30')}
          </span>
        </div>
      </div>
    )
  }

  if (type === 'schedule') {
    const roles = [t('Holdleder', 'Crew lead'), t('Flyttemedarbejder', 'Mover'), t('Chauffør', 'Driver')]
    return (
      <div className="product-segment-card segment-crew-card" aria-hidden="true">
        <div className="segment-card-heading">
          <div>
            <small>Job #184</small>
            <strong>{t('Hold og køretøj', 'Crew and vehicle')}</strong>
          </div>
          <Status tone="green">{t('Klar', 'Ready')}</Status>
        </div>
        {roles.map((role, index) => (
          <div className="segment-person" key={role}>
            <span>{index + 1}</span>
            <div>
              <strong>
                {t('Medarbejder', 'Employee')} {index + 1}
              </strong>
              <small>{role}</small>
            </div>
            <CheckCircle2 />
          </div>
        ))}
        <div className="segment-truck">
          <Truck />
          <span>
            <strong>{t('Bil 02 · 25 m³', 'Truck 02 · 25 m³')}</strong>
            <small>{t('Klar kl. 08:00', 'Ready at 08:00')}</small>
          </span>
        </div>
      </div>
    )
  }

  if (type === 'payments') {
    return (
      <div className="product-segment-card segment-balance-card" aria-hidden="true">
        <small>{t('Denne måned', 'This month')}</small>
        <strong>{m('184.250')}</strong>
        <span className="segment-growth">
          <ArrowUpRight /> {pct('12,8%')}
        </span>
        <div className="segment-bars">
          {[38, 58, 44, 72, 64, 88, 78].map((height, index) => (
            <i key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
        <div className="segment-balance-footer">
          <span>{t('1.', '1')}</span>
          <span>{t('15.', '15')}</span>
          <span>{t('30.', '30')}</span>
        </div>
      </div>
    )
  }

  return null
}

function Stat({ label, value, positive = true, L }: { label: string; value: string; positive?: boolean; L: L }) {
  return (
    <div className="mini-stat">
      <span>{label}</span>
      <strong>{value}</strong>
      <small className={positive ? 'positive' : 'negative'}>
        {positive ? <ArrowUpRight /> : <ArrowDownRight />} {L.pct('8,4%')}
      </small>
    </div>
  )
}

function Status({ children, tone = 'blue' }: { children: string; tone?: 'blue' | 'green' | 'amber' | 'gray' }) {
  return <span className={`status status-${tone}`}>{children}</span>
}

function renderHomepageVisual(type: ProductVisualProps['type'], L: L) {
  const { t, m } = L
  if (type === 'analytics') {
    return (
      <div className="home-screen home-dashboard-screen">
        <div className="home-screen-heading">
          <div>
            <small>{t('DAGENS OVERBLIK', "TODAY'S OVERVIEW")}</small>
            <strong>{t('God arbejdslyst', 'Have a good day')}</strong>
          </div>
          <span>{t('Opdateret nu', 'Updated now')}</span>
        </div>
        <div className="home-summary-row">
          {[
            [t('Flytninger', 'Moves'), '04', t('I dag', 'Today')],
            [t('Opgaver', 'Tasks'), '07', t('Åbne', 'Open')],
            [t('På arbejde', 'At work'), '12', t('Medarbejdere', 'Employees')],
            [t('Køretøjer', 'Vehicles'), '06', t('Planlagt', 'Planned')],
          ].map(([label, value, detail]) => (
            <div key={label}>
              <small>{label}</small>
              <strong>{value}</strong>
              <span>{detail}</span>
            </div>
          ))}
        </div>
        <div className="home-dashboard-columns">
          <section>
            <header>
              <strong>{t('Klar til planlægning', 'Ready to plan')}</strong>
              <span>3</span>
            </header>
            {['Job #241', 'Job #244', 'Job #248'].map((job, index) => (
              <div className="home-list-row" key={job}>
                <span>
                  <strong>{job}</strong>
                  <small>
                    {t(`${index + 2} rum · ca. ${index + 3} timer`, `${index + 2} rooms · approx. ${index + 3} hours`)}
                  </small>
                </span>
                <button>{t('Planlæg', 'Plan')}</button>
              </div>
            ))}
          </section>
          <section>
            <header>
              <strong>{t('Kræver handling', 'Needs action')}</strong>
              <span>4</span>
            </header>
            {[
              t('Tilbud afventer', 'Quote pending'),
              t('Dokumentation mangler', 'Documentation missing'),
              t('Faktura klar', 'Invoice ready'),
            ].map((item, index) => (
              <div className="home-list-row" key={item}>
                <span>
                  <strong>{item}</strong>
                  <small>
                    {t('Sag', 'Case')} #{310 + index}
                  </small>
                </span>
                <i className={`home-priority priority-${index}`} />
              </div>
            ))}
          </section>
          <section className="home-day-plan">
            <header>
              <strong>{t('Dagens plan', "Today's plan")}</strong>
              <span>4 jobs</span>
            </header>
            <div className="home-timeline">
              {['08:00', '10:30', '13:00'].map((time, index) => (
                <div key={time}>
                  <b>{time}</b>
                  <span>
                    <strong>
                      {t('Flyttehold', 'Moving crew')} {index + 1}
                    </strong>
                    <small>Job #{241 + index * 3}</small>
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    )
  }

  if (type === 'crm') {
    const customer = (n: number) => t(`Kunde #${n}`, `Customer #${n}`)
    const columns: Array<[string, number[]]> = [
      [t('Ny', 'New'), [104, 108]],
      [t('Kontaktet', 'Contacted'), [112]],
      [t('Tilbud', 'Quote'), [116]],
      [t('Godkendt', 'Approved'), [121, 124]],
    ]
    return (
      <div className="home-screen">
        <div className="home-screen-heading">
          <div>
            <small>{t('SALG', 'SALES')}</small>
            <strong>Leads</strong>
          </div>
          <button>{t('+ Opret lead', '+ Create lead')}</button>
        </div>
        <div className="home-funnel-row">
          {[
            [t('Alle', 'All'), '26'],
            [t('Nye', 'New'), '08'],
            [t('Kontaktet', 'Contacted'), '05'],
            [t('Tilbud', 'Quotes'), '04'],
          ].map(([label, value], index) => (
            <div key={label}>
              <i className={`funnel-tone-${index}`} />
              <span>
                <small>{label}</small>
                <strong>{value}</strong>
              </span>
            </div>
          ))}
        </div>
        <div className="home-kanban">
          {columns.map(([label, customers], columnIndex) => (
            <section key={label}>
              <header>
                <strong>{label}</strong>
                <span>{customers.length}</span>
              </header>
              {customers.map((n, customerIndex) => (
                <article key={n}>
                  <small>#{301 + columnIndex * 7 + customerIndex}</small>
                  <strong>{customer(n)}</strong>
                  <b>{m(`${6 + columnIndex * 3}.250`)}</b>
                  <span>
                    <Phone /> 20 00 00 {columnIndex}
                  </span>
                </article>
              ))}
            </section>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'quote') {
    return (
      <div className="home-screen">
        <div className="home-record-heading">
          <span>←</span>
          <div>
            <strong>{t('Kunde #116', 'Customer #116')}</strong>
            <small>{t('Sag #334 · Tilbud oprettet', 'Case #334 · Quote created')}</small>
          </div>
          <button>{t('Rediger', 'Edit')}</button>
        </div>
        <div className="home-record-stats">
          <span>
            <small>{t('TILBUDSPRIS', 'QUOTE PRICE')}</small>
            <strong>{m('12.450')}</strong>
          </span>
          <span>
            <small>{t('ØNSKET DATO', 'PREFERRED DATE')}</small>
            <strong>{t('18. januar', '18 January')}</strong>
          </span>
          <span>
            <small>{t('OMFANG', 'SIZE')}</small>
            <strong>{t('4 rum', '4 rooms')}</strong>
          </span>
        </div>
        <div className="home-quote-workspace">
          <div className="home-quote-main">
            <div className="home-workflow">
              {[t('Ny', 'New'), t('Behandles', 'In progress'), t('Sendt', 'Sent'), t('Godkendt', 'Approved')].map(
                (label, index) => (
                  <span className={index < 2 ? 'complete' : ''} key={label}>
                    <i />
                    <small>{label}</small>
                  </span>
                ),
              )}
            </div>
            <div className="home-note-field">
              <small>{t('INTERN NOTE', 'INTERNAL NOTE')}</small>
              <p>{t('Tilføj praktiske detaljer til tilbuddet...', 'Add practical details to the quote...')}</p>
            </div>
          </div>
          <aside className="home-price-panel">
            <header>
              <strong>{t('Prisberegning', 'Price calculation')}</strong>
              <button>{t('Rediger', 'Edit')}</button>
            </header>
            {[
              [t('Grundpris', 'Base price'), m('4.800')],
              [t('Mandskab', 'Crew'), m('5.400')],
              [t('Køretøj', 'Vehicle'), m('1.250')],
              [t('Tillæg', 'Surcharges'), m('1.000')],
            ].map(([label, value], index) => (
              <div key={label}>
                <i className={`price-tone-${index}`} />
                <span>{label}</span>
                <b>{value}</b>
              </div>
            ))}
            <footer>
              <span>Total</span>
              <strong>{m('12.450')}</strong>
            </footer>
          </aside>
        </div>
      </div>
    )
  }

  if (type === 'schedule') {
    return (
      <div className="home-screen">
        <div className="home-screen-heading">
          <div>
            <small>{t('PLANLÆGNING', 'PLANNING')}</small>
            <strong>{t('Kalender · uge 6', 'Calendar · week 6')}</strong>
          </div>
          <button>{t('+ Nyt job', '+ New job')}</button>
        </div>
        <div className="home-calendar-toolbar">
          <span>‹</span>
          <strong>{t('2.–6. februar', '2–6 February')}</strong>
          <span>›</span>
          <button>{t('Denne uge', 'This week')}</button>
        </div>
        <div className="calendar-grid home-calendar-grid">
          <div className="calendar-times">
            <span>08</span>
            <span>10</span>
            <span>12</span>
            <span>14</span>
            <span>16</span>
          </div>
          {[t('Man 2', 'Mon 2'), t('Tir 3', 'Tue 3'), t('Ons 4', 'Wed 4'), t('Tor 5', 'Thu 5'), t('Fre 6', 'Fri 6')].map(
            (day, index) => (
              <div className="calendar-day" key={day}>
                <strong>{day}</strong>
                {index !== 1 && (
                  <div className={`calendar-job job-${index % 3} job-offset-${index}`}>
                    <b>Job #{241 + index}</b>
                    <small>
                      {t(`${index + 2} personer · Bil 0${index + 1}`, `${index + 2} people · Truck 0${index + 1}`)}
                    </small>
                  </div>
                )}
              </div>
            ),
          )}
        </div>
      </div>
    )
  }

  if (type === 'payments') {
    const invoices: Array<[string, string, string, 'ready' | 'draft' | 'sent']> = [
      ['#1208', t('Kunde #104', 'Customer #104'), m('8.940'), 'ready'],
      ['#1207', t('Kunde #112', 'Customer #112'), m('14.250'), 'draft'],
      ['#1206', t('Kunde #121', 'Customer #121'), m('6.875'), 'sent'],
      ['#1205', t('Kunde #124', 'Customer #124'), m('11.400'), 'ready'],
    ]
    const stateLabel = { ready: t('Klar', 'Ready'), draft: t('Kladde', 'Draft'), sent: t('Sendt', 'Sent') }
    return (
      <div className="home-screen">
        <div className="home-screen-heading">
          <div>
            <small>{t('ØKONOMI', 'FINANCE')}</small>
            <strong>{t('Fakturering', 'Invoicing')}</strong>
          </div>
          <button>{t('+ Ny faktura', '+ New invoice')}</button>
        </div>
        <div className="home-invoice-tabs">
          <span className="active">
            {t('Klar til fakturering', 'Ready to invoice')} <b>12</b>
          </span>
          <span>
            {t('Sendte', 'Sent')} <b>8</b>
          </span>
          <span>
            {t('Betalte', 'Paid')} <b>24</b>
          </span>
        </div>
        <div className="home-invoice-list">
          {invoices.map(([number, customer, amount, state], index) => (
            <article key={number}>
              <span className={`invoice-marker marker-${index}`} />
              <div>
                <strong>{customer}</strong>
                <small>
                  {number} · {t('Job afsluttet', 'Job completed')}
                </small>
              </div>
              <span>
                <small>{t('Beløb', 'Amount')}</small>
                <strong>{amount}</strong>
              </span>
              <Status tone={state === 'ready' ? 'green' : state === 'draft' ? 'gray' : 'blue'}>{stateLabel[state]}</Status>
              <button>{t('Åbn', 'Open')}</button>
            </article>
          ))}
        </div>
      </div>
    )
  }

  return renderVisual(type, L)
}

function renderVisual(type: ProductVisualProps['type'], L: L) {
  const { t, m, pct } = L
  switch (type) {
    case 'crm':
      return (
        <>
          <div className="mini-heading">
            <div>
              <small>CRM</small>
              <strong>{t('Forespørgsler', 'Enquiries')}</strong>
            </div>
            <button>{t('+ Ny kunde', '+ New customer')}</button>
          </div>
          <div className="pipeline">
            {[t('Ny forespørgsel', 'New enquiry'), t('Kontaktet', 'Contacted'), t('Tilbud sendt', 'Quote sent')].map(
              (column, index) => (
                <div className="pipeline-column" key={column}>
                  <div className="pipeline-label">
                    <span>{column}</span>
                    <b>{index + 2}</b>
                  </div>
                  {names.slice(0, index === 1 ? 2 : 1).map((name, person) => (
                    <div className="lead-card" key={name}>
                      <div>
                        <UserRound />
                        <strong>{name}</strong>
                      </div>
                      <p>{t('København → Aarhus', 'Copenhagen → Aarhus')}</p>
                      <small>
                        <Clock3 /> {t(`${person + 2}. dec. · 08:30`, `${person + 2} Dec · 08:30`)}
                      </small>
                    </div>
                  ))}
                </div>
              ),
            )}
          </div>
        </>
      )
    case 'quote':
      return (
        <>
          <div className="mini-heading">
            <div>
              <small>{t('Tilbud', 'Quote')}</small>
              <strong>T-2026-0148</strong>
            </div>
            <Status tone="green">{t('Klar til afsendelse', 'Ready to send')}</Status>
          </div>
          <div className="quote-layout">
            <div className="quote-lines">
              <div className="quote-customer">
                <UserRound />
                <div>
                  <strong>Nora Jensen</strong>
                  <small>{t('nora@eksempel.dk', 'nora@example.com')}</small>
                </div>
              </div>
              {[
                [t('Flyttehold · 3 personer', 'Moving crew · 3 people'), t('5 t.', '5 h'), m('5.625')],
                [t('Flyttebil · 25 m³', 'Moving truck · 25 m³'), t('1 stk.', '1 pc.'), m('1.150')],
                [t('Flyttekasser', 'Moving boxes'), t('30 stk.', '30 pcs.'), m('450')],
              ].map((line) => (
                <div className="quote-line" key={line[0]}>
                  <span>{line[0]}</span>
                  <small>{line[1]}</small>
                  <b>{line[2]}</b>
                </div>
              ))}
              <div className="quote-total">
                <span>{t('Total inkl. moms', 'Total incl. VAT')}</span>
                <strong>{m('9.031')}</strong>
              </div>
            </div>
            <div className="quote-preview">
              <FileText />
              <strong>{t('Dit flyttetilbud', 'Your moving quote')}</strong>
              <i />
              <i />
              <i />
              <button>{t('Godkend tilbud', 'Approve quote')}</button>
            </div>
          </div>
        </>
      )
    case 'schedule':
      return (
        <>
          <div className="mini-heading">
            <div>
              <small>{t('Planlægning', 'Planning')}</small>
              <strong>{t('Uge 49', 'Week 49')}</strong>
            </div>
            <div className="mini-actions">
              <button>‹</button>
              <button>›</button>
            </div>
          </div>
          <div className="calendar-grid">
            <div className="calendar-times">
              <span>08</span>
              <span>10</span>
              <span>12</span>
              <span>14</span>
              <span>16</span>
            </div>
            {[t('Man 1', 'Mon 1'), t('Tir 2', 'Tue 2'), t('Ons 3', 'Wed 3'), t('Tor 4', 'Thu 4'), t('Fre 5', 'Fri 5')].map(
              (day, index) => (
                <div className="calendar-day" key={day}>
                  <strong>{day}</strong>
                  {index !== 3 && (
                    <div className={`calendar-job job-${index % 3} job-offset-${index}`}>
                      <b>
                        {t('Flytning', 'Move')} #{184 + index}
                      </b>
                      <small>{t(`${index + 2} crew · Bil 0${index + 2}`, `${index + 2} crew · Truck 0${index + 2}`)}</small>
                    </div>
                  )}
                </div>
              ),
            )}
          </div>
        </>
      )
    case 'crew':
      return (
        <>
          <div className="mini-heading">
            <div>
              <small>{t('Ressourcer', 'Resources')}</small>
              <strong>{t('Crew og biler', 'Crews and vehicles')}</strong>
            </div>
            <Status>{t('12 tilgængelige', '12 available')}</Status>
          </div>
          <div className="resource-grid">
            <div className="resource-panel">
              <h4>
                <UsersRound /> {t('Crew i dag', 'Crew today')}
              </h4>
              {['Anders M.', 'Sofie K.', 'Malik A.', 'Frederik V.'].map((name, i) => (
                <div className="resource-row" key={name}>
                  <span className={`avatar avatar-${i}`}>
                    {name
                      .split(' ')
                      .map((x) => x[0])
                      .join('')}
                  </span>
                  <div>
                    <strong>{name}</strong>
                    <small>{i % 2 ? t('Flyttemand', 'Mover') : t('Teamleder', 'Team lead')}</small>
                  </div>
                  <Status tone={i === 3 ? 'gray' : 'green'}>{i === 3 ? t('Fri', 'Off') : t('På job', 'On a job')}</Status>
                </div>
              ))}
            </div>
            <div className="resource-panel">
              <h4>
                <Truck /> {t('Køretøjer', 'Vehicles')}
              </h4>
              {[t('Bil 01 · 25 m³', 'Truck 01 · 25 m³'), t('Bil 02 · 18 m³', 'Truck 02 · 18 m³'), t('Bil 03 · 25 m³', 'Truck 03 · 25 m³')].map(
                (name, i) => (
                  <div className="truck-row" key={name}>
                    <Truck />
                    <div>
                      <strong>{name}</strong>
                      <small>{i === 2 ? t('Ledig fra 12:30', 'Free from 12:30') : `Job #${184 + i}`}</small>
                    </div>
                    <ChevronRight />
                  </div>
                ),
              )}
            </div>
          </div>
        </>
      )
    case 'messages':
      return (
        <>
          <div className="mini-heading">
            <div>
              <small>{t('Kundekort', 'Customer card')}</small>
              <strong>Nora Jensen</strong>
            </div>
            <Status tone="green">{t('Aktiv flytning', 'Active move')}</Status>
          </div>
          <div className="messages-layout">
            <div className="contact-card">
              <div className="contact-avatar">NJ</div>
              <strong>Nora Jensen</strong>
              <small>{t('Kunde siden 2024', 'Customer since 2024')}</small>
              <span>
                <Phone /> +45 20 30 40 50
              </span>
              <span>
                <Mail /> {t('nora@eksempel.dk', 'nora@example.com')}
              </span>
            </div>
            <div className="message-thread">
              <div className="message-date">{t('I dag', 'Today')}</div>
              <div className="message incoming">
                {t('Hej Nora. Vi ankommer mellem 08:00 og 08:30.', 'Hi Nora. We will arrive between 08:00 and 08:30.')}
                <small>08:02 · SMS</small>
              </div>
              <div className="message outgoing">
                {t('Perfekt, vi er klar. Vi ses!', 'Perfect, we are ready. See you!')}
                <small>08:14</small>
              </div>
              <div className="message-composer">
                <span>{t('Skriv en besked...', 'Write a message...')}</span>
                <button>
                  <MessageSquareText />
                </button>
              </div>
            </div>
          </div>
        </>
      )
    case 'payments':
      return (
        <>
          <div className="mini-heading">
            <div>
              <small>{t('Økonomi', 'Finance')}</small>
              <strong>{t('Fakturaer', 'Invoices')}</strong>
            </div>
            <button>{t('+ Ny faktura', '+ New invoice')}</button>
          </div>
          <div className="stats-row">
            <Stat label={t('Faktureret', 'Invoiced')} value={m('184.250')} L={L} />
            <Stat label={t('Betalt', 'Paid')} value={m('161.840')} L={L} />
            <Stat label={t('Udestående', 'Outstanding')} value={m('22.410')} positive={false} L={L} />
          </div>
          <div className="invoice-table">
            <div className="table-head">
              <span>{t('Faktura', 'Invoice')}</span>
              <span>{t('Kunde', 'Customer')}</span>
              <span>{t('Forfald', 'Due')}</span>
              <span>{t('Beløb', 'Amount')}</span>
              <span>Status</span>
            </div>
            {[
              ['#1048', 'Nora Jensen', t('12. dec.', '12 Dec'), m('9.031'), t('Betalt', 'Paid')],
              ['#1047', t('Lund & Søn', 'Lund & Son'), t('14. dec.', '14 Dec'), m('18.450'), t('Sendt', 'Sent')],
              ['#1046', 'Anna Holm', t('8. dec.', '8 Dec'), m('6.875'), t('Forfalden', 'Overdue')],
            ].map((row, i) => (
              <div className="table-row" key={row[0]}>
                {row.slice(0, 4).map((cell) => (
                  <span key={cell}>{cell}</span>
                ))}
                <Status tone={i === 0 ? 'green' : i === 1 ? 'blue' : 'amber'}>{row[4]}</Status>
              </div>
            ))}
          </div>
        </>
      )
    case 'inventory':
      return (
        <>
          <div className="mini-heading">
            <div>
              <small>{t('Lager', 'Warehouse')}</small>
              <strong>{t('Beholdning', 'Stock')}</strong>
            </div>
            <button>{t('+ Ny vare', '+ New item')}</button>
          </div>
          <div className="inventory-layout">
            <div className="inventory-list">
              {(
                [
                  [t('Flyttekasse · standard', 'Moving box · standard'), t('248 stk.', '248 pcs.'), 82],
                  [t('Garderobekasse', 'Wardrobe box'), t('34 stk.', '34 pcs.'), 44],
                  [t('Flyttetæppe', 'Moving blanket'), t('76 stk.', '76 pcs.'), 68],
                  [t('Sækkevogn', 'Hand truck'), t('8 stk.', '8 pcs.'), 30],
                ] as const
              ).map((item, i) => (
                <div className="inventory-row" key={item[0]}>
                  <div className={`inventory-icon inventory-${i}`}>
                    <PackageCheck />
                  </div>
                  <div>
                    <strong>{item[0]}</strong>
                    <small>
                      {item[1]} {t('på lager', 'in stock')}
                    </small>
                    <i>
                      <b className={`stock-level-${i}`} />
                    </i>
                  </div>
                  <ChevronRight />
                </div>
              ))}
            </div>
            <div className="stock-card">
              <small>{t('Reserveret til i morgen', 'Reserved for tomorrow')}</small>
              <strong>42</strong>
              <span>{t('enheder fordelt på 6 jobs', 'units across 6 jobs')}</span>
              <div className="stock-ring">
                <b>74%</b>
              </div>
            </div>
          </div>
        </>
      )
    case 'analytics':
      return (
        <>
          <div className="mini-heading">
            <div>
              <small>Dashboard</small>
              <strong>{t('Godmorgen, Mikkel', 'Good morning, Mikkel')}</strong>
            </div>
            <Status>{t('Seneste 30 dage', 'Last 30 days')}</Status>
          </div>
          <div className="stats-row">
            <Stat label={t('Omsætning', 'Revenue')} value={m('428.500')} L={L} />
            <Stat label={t('Nye leads', 'New leads')} value="48" L={L} />
            <Stat label={t('Konvertering', 'Conversion')} value={pct('38,2%')} L={L} />
          </div>
          <div className="analytics-grid">
            <div className="chart-card">
              <div>
                <strong>{t('Omsætning', 'Revenue')}</strong>
                <small>{t('+12,8% mod sidste periode', '+12.8% vs. last period')}</small>
              </div>
              <svg viewBox="0 0 500 150" role="img" aria-label={t('Illustrativ stigende omsætningsgraf', 'Illustrative rising revenue chart')}>
                <defs>
                  <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1D4ED8" stopOpacity=".22" />
                    <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,126 C45,118 62,78 105,91 C155,106 175,56 220,72 C260,86 282,35 330,55 C375,72 405,14 500,18 L500,150 L0,150 Z"
                  fill="url(#area)"
                />
                <path
                  d="M0,126 C45,118 62,78 105,91 C155,106 175,56 220,72 C260,86 282,35 330,55 C375,72 405,14 500,18"
                  fill="none"
                  stroke="#1D4ED8"
                  strokeWidth="3"
                />
              </svg>
            </div>
            <div className="donut-card">
              <strong>{t('Leadkilder', 'Lead sources')}</strong>
              <div className="donut">
                <b>48</b>
                <small>leads</small>
              </div>
              <ul>
                <li>
                  <i />
                  Google <b>42%</b>
                </li>
                <li>
                  <i />
                  {t('Direkte', 'Direct')} <b>34%</b>
                </li>
                <li>
                  <i />
                  {t('Henvisning', 'Referral')} <b>24%</b>
                </li>
              </ul>
            </div>
          </div>
        </>
      )
    case 'job':
      return (
        <>
          <div className="mini-heading">
            <div>
              <small>{t('Aktivt job', 'Active job')}</small>
              <strong>{t('Flytning #184', 'Move #184')}</strong>
            </div>
            <Status tone="green">{t('I gang', 'In progress')}</Status>
          </div>
          <div className="job-layout">
            <div className="job-map">
              <div className="map-road road-one" />
              <div className="map-road road-two" />
              <span className="map-pin pin-a">
                <MapPin />
              </span>
              <span className="map-pin pin-b">
                <Truck />
              </span>
              <div className="map-route" />
            </div>
            <div className="job-details">
              <div className="job-address">
                <MapPin />
                <div>
                  <small>{t('Fra', 'From')}</small>
                  <strong>Vesterbrogade 24</strong>
                </div>
              </div>
              <div className="job-address">
                <MapPin />
                <div>
                  <small>{t('Til', 'To')}</small>
                  <strong>Skovvej 18, Aarhus</strong>
                </div>
              </div>
              <div className="job-checks">
                {[
                  t('Kunden er kontaktet', 'Customer contacted'),
                  t('Inventar er registreret', 'Inventory registered'),
                  t('Billeder er uploadet', 'Photos uploaded'),
                ].map((item, i) => (
                  <div key={item}>
                    <span className={i < 2 ? 'done' : ''}>{i < 2 && <Check />}</span>
                    {item}
                  </div>
                ))}
              </div>
              <button>{t('Afslut job', 'Finish job')}</button>
            </div>
          </div>
        </>
      )
  }
}

type PhoneJobVisualProps = {
  homepage?: boolean
  variant?: 'job' | 'schedule' | 'editor'
}

export function PhoneJobVisual({ homepage = false, variant = 'job' }: PhoneJobVisualProps) {
  const { t } = useT()
  if (variant === 'schedule') {
    return (
      <div className="phone-shell phone-shell-home phone-shell-schedule">
        <div className="phone-speaker" />
        <div className="phone-screen mobile-app-screen">
          <div className="mobile-status-bar">
            <strong>09:41</strong>
            <span>5G · 86%</span>
          </div>
          <section className="mobile-day-card">
            <strong>{t('Fredag', 'Friday')}</strong>
            <span>{t('18. september', '18 September')}</span>
            <footer>
              <small>{t('2 jobs i dag', '2 jobs today')}</small>
              <b>{t('I dag', 'Today')}</b>
            </footer>
          </section>
          <div className="mobile-job-list">
            {[
              ['10:00–12:00', t('Besigtigelse', 'Survey'), t('Kunde #140', 'Customer #140'), 'Helsingør 32', 'Espergærde 11'],
              ['13:00–15:00', t('Flytning', 'Move'), t('Kunde #148', 'Customer #148'), 'Vesterport 11', 'Østerport 41'],
            ].map(([time, type, customer, from, to], index) => (
              <article className="mobile-job-card" key={time}>
                <header>
                  <strong>{time}</strong>
                  <span>
                    J-{39 + index} · {type}
                  </span>
                </header>
                <b>{customer}</b>
                <div className="mobile-job-route">
                  <span>{from}</span>
                  <i />
                  <span>
                    <MapPin /> {to}
                  </span>
                </div>
                <footer>
                  <span className="mobile-crew-avatar">M{index + 1}</span>
                  <small>{t('Dit flyttehold', 'Your crew')}</small>
                  <ChevronRight />
                </footer>
              </article>
            ))}
          </div>
          <nav className="mobile-bottom-nav" aria-hidden="true">
            <span className="active">
              <House /> {t('I dag', 'Today')}
            </span>
            <span>
              <CalendarDays /> {t('Vagtplan', 'Rota')}
            </span>
            <span>
              <Menu /> Menu
            </span>
          </nav>
        </div>
      </div>
    )
  }

  if (variant === 'editor') {
    return (
      <div className="phone-shell phone-shell-home phone-shell-editor">
        <div className="phone-speaker" />
        <div className="phone-screen mobile-app-screen">
          <div className="mobile-status-bar">
            <strong>09:41</strong>
            <span>5G · 87%</span>
          </div>
          <header className="mobile-editor-head">
            <span>×</span>
            <div>
              <strong>{t('Flytning', 'Move')}</strong>
              <small>#184 · J-184</small>
            </div>
            <b>{t('Gem', 'Save')}</b>
          </header>
          <section className="mobile-form-card">
            <label>
              {t('Dato', 'Date')}
              <span>{t('Fredag den 18. september', 'Friday 18 September')}</span>
            </label>
            <div className="mobile-form-row">
              <label>
                Start
                <span>10:00</span>
              </label>
              <label>
                {t('Slut', 'End')}
                <span>14:00</span>
              </label>
            </div>
            <label>
              {t('Estimerede timer', 'Estimated hours')}
              <span>{t('4 timer', '4 hours')}</span>
            </label>
          </section>
          <section className="mobile-form-card mobile-route-card">
            <div>
              <i className="route-dot route-dot-from" />
              <small>{t('Fra', 'From')}</small>
              <strong>Vesterport 14</strong>
            </div>
            <div>
              <i className="route-dot route-dot-to" />
              <small>{t('Til', 'To')}</small>
              <strong>Nørrebro 21</strong>
            </div>
          </section>
          <section className="mobile-form-card mobile-vehicle-card">
            <small>{t('Køretøjer · 1 valgt', 'Vehicles · 1 selected')}</small>
            {[t('Varevogn 1', 'Van 1'), t('Varevogn 2', 'Van 2')].map((vehicle, index) => (
              <div className={index === 1 ? 'selected' : ''} key={vehicle}>
                <Truck />
                <span>
                  <strong>{vehicle}</strong>
                  <small>{index === 0 ? 'AA 12 345' : 'AB 12 843'}</small>
                </span>
                {index === 1 ? <Check /> : <i />}
              </div>
            ))}
          </section>
        </div>
      </div>
    )
  }

  return (
    <div className={cx('phone-shell', homepage && 'phone-shell-home')}>
      <div className="phone-speaker" />
      <div className="phone-screen">
        <div className="phone-head">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/movena-mark-primary.png" alt="" />
          <span>Job #184</span>
          <div>AM</div>
        </div>
        <Status tone="green">{t('I gang · 08:42', 'In progress · 08:42')}</Status>
        <strong>{homepage ? t('Kunde #104', 'Customer #104') : 'Nora Jensen'}</strong>
        <div className="phone-route">
          <div>
            <MapPin />
            <span>
              Vesterbrogade 24<small>{t('København V', 'Copenhagen V')}</small>
            </span>
          </div>
          <i />
          <div>
            <MapPin />
            <span>
              Skovvej 18<small>Aarhus C</small>
            </span>
          </div>
        </div>
        <div className="phone-meta">
          <span>
            <UsersRound /> 3 crew
          </span>
          <span>
            <Truck /> {t('Bil 02', 'Truck 02')}
          </span>
          <span>
            <CalendarDays /> {t('5 timer', '5 hours')}
          </span>
        </div>
        <button>
          <CheckCircle2 /> {t('Åbn tjekliste', 'Open checklist')}
        </button>
      </div>
    </div>
  )
}
