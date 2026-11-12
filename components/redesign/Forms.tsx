'use client'

// The design's callback form (src/components/Forms.tsx in the export) wrapped
// around the live demo form's logic. Behaviour is unchanged from the previous
// site: same required fields, same validation, same call-slot picker, and the
// same submitDemoLead() call to /api/demo, which books the call in Google
// Calendar and emails the team.
//
// Where the design and the live form disagree, the live form wins:
// - the design's "Flytninger pr. måned" select and interest chips are not
//   collected by /api/demo, so they are left out
// - "Hvad bruger I i dag?" stays free text, as before
// - the design has no day/time picker; ours is required, so it is added
// - the design's "UI-eksempel · formularen sender ikke data endnu" note is
//   dummy text and is replaced by the live privacy note
import { useEffect, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { submitDemoLead } from '@/lib/demo-lead'
import { callTimesFor, formatCallDay, nextWeekdays } from '@/lib/call-slots'
import { privacyPath } from '@/lib/constants'
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/site-nav'
import { ChevronDown } from './icons'
import { useT } from './i18n'
import { Button, cx } from './Ui'

// Same buckets, in the same order, as SIZE_LABELS in app/api/demo/route.ts.
const SIZE_OPTIONS = ['1–5', '6–15', '16–30', '30+']

function Field({
  id,
  label,
  required,
  optional,
  error,
  children,
}: {
  id: string
  label: string
  required?: boolean
  optional?: string
  error?: string | false
  children: ReactNode
}) {
  return (
    <label className="field" htmlFor={id}>
      <span>
        {label}
        {required && <span className="field-required"> *</span>}
        {optional && <span className="field-optional"> {optional}</span>}
      </span>
      {children}
      {error ? (
        <p className="field-error" role="alert">
          {error}
        </p>
      ) : null}
    </label>
  )
}

export function CallbackForm({ compact = false }: { compact?: boolean }) {
  const { t, locale } = useT()
  const [name, setName] = useState('')
  const [firm, setFirm] = useState('')
  const [phone, setPhone] = useState('')
  const [mail, setMail] = useState('')
  const [size, setSize] = useState('')
  const [usesToday, setUsesToday] = useState('')
  const [day, setDay] = useState('')
  const [time, setTime] = useState('')
  const [showErrors, setShowErrors] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [failed, setFailed] = useState(false)
  // Call slots depend on the current time, and pages are statically built, so
  // they are computed after mount rather than baked into the HTML.
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => setNow(new Date()), [])

  const phoneOk = phone.replace(/\D/g, '').length >= 8
  const days = now ? nextWeekdays(now, locale) : []
  const times = now && day ? callTimesFor(now, day) : []
  const err = {
    name: showErrors && !name.trim(),
    firm: showErrors && !firm.trim(),
    phone: showErrors && !phoneOk,
    day: showErrors && !day,
    time: showErrors && !time,
  }
  const optional = t('(valgfri)', '(optional)')

  const submit = () => {
    if (!(name.trim() && firm.trim() && phoneOk && day && time)) {
      setShowErrors(true)
      return
    }
    setSending(true)
    setShowErrors(false)
    setFailed(false)
    submitDemoLead({
      name,
      company: firm,
      phone,
      email: mail,
      sizeIndex: size === '' ? undefined : Number(size),
      usesToday,
      callDay: day,
      callTime: time,
      locale,
    })
      .then((ok) => {
        setSending(false)
        setSent(ok)
        setFailed(!ok)
      })
      .catch(() => {
        setSending(false)
        setFailed(true)
      })
  }

  if (sent) {
    const firstName = name.trim().split(' ')[0] || t('tak', 'there')
    const dayLabel = day ? formatCallDay(day, locale).sentenceLabel : ''
    return (
      <div className={cx('callback-form', compact && 'callback-form-compact')}>
        <div className="form-sent" role="status">
          <h3>
            {t(
              `Tak, ${firstName}. Vi ringer til dig ${dayLabel} kl. ${time} på ${phone}.`,
              `Thanks, ${firstName}. We'll call you ${dayLabel} at ${time} on ${phone}.`,
            )}
          </h3>
          <p>
            {t(
              'Find gerne en flytning fra jeres kalender frem, som vi kan lægge ind sammen.',
              'Feel free to pick a move from your calendar that we can enter together.',
            )}
          </p>
          <p>
            {t('Har det travlt? Ring selv på ', 'In a hurry? Call us on ')}
            <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>.
          </p>
          <Button variant="outline" onClick={() => setSent(false)} className="form-back">
            {t('Tilbage til formularen', 'Back to the form')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form
      className={cx('callback-form', compact && 'callback-form-compact')}
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        submit()
      }}
    >
      <div className="form-heading">
        <span className="form-kicker">{t('Book en gennemgang', 'Book a walkthrough')}</span>
        <h3>{t('Bliv ringet op', 'Get a call')}</h3>
        <p>{t('Udfyld formularen, så finder vi et tidspunkt, der passer.', 'Fill in the form and we will find a time that suits you.')}</p>
      </div>
      <div className="form-grid">
        <Field id={`${compact ? 'c' : 'f'}-name`} label={t('Navn', 'Name')} required error={err.name && t('Skriv dit navn', 'Enter your name')}>
          <input
            id={`${compact ? 'c' : 'f'}-name`}
            type="text"
            placeholder={t('Dit navn', 'Your name')}
            autoComplete="name"
            value={name}
            aria-invalid={err.name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>
        <Field
          id={`${compact ? 'c' : 'f'}-firm`}
          label={t('Firmanavn', 'Company name')}
          required
          error={err.firm && t('Skriv navnet på jeres flyttefirma', "Enter your moving company's name")}
        >
          <input
            id={`${compact ? 'c' : 'f'}-firm`}
            type="text"
            placeholder={t('Virksomhed', 'Company')}
            autoComplete="organization"
            value={firm}
            aria-invalid={err.firm}
            onChange={(e) => setFirm(e.target.value)}
          />
        </Field>
        <Field
          id={`${compact ? 'c' : 'f'}-phone`}
          label={t('Telefonnummer', 'Phone number')}
          required
          error={err.phone && t('Skriv et telefonnummer med 8 cifre', 'Enter a phone number with 8 digits')}
        >
          <input
            id={`${compact ? 'c' : 'f'}-phone`}
            type="tel"
            placeholder="+45 12 34 56 78"
            autoComplete="tel"
            value={phone}
            aria-invalid={err.phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Field>
        <Field id={`${compact ? 'c' : 'f'}-mail`} label={t('E-mail', 'Email')} optional={optional}>
          <input
            id={`${compact ? 'c' : 'f'}-mail`}
            type="email"
            placeholder={t('navn@firma.dk', 'name@company.com')}
            autoComplete="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </Field>
        {!compact && (
          <Field id="f-size" label={t('Antal medarbejdere', 'Number of employees')} optional={optional}>
            <select id="f-size" value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="">{t('Vælg', 'Choose')}</option>
              {SIZE_OPTIONS.map((label, index) => (
                <option value={String(index)} key={label}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
        )}
        {!compact && (
          <Field id="f-today" label={t('Hvad bruger I i dag?', 'What do you use today?')} optional={optional}>
            <input
              id="f-today"
              type="text"
              placeholder={t('Fx Excel, papir, et andet system', 'E.g. Excel, paper, another system')}
              value={usesToday}
              onChange={(e) => setUsesToday(e.target.value)}
            />
          </Field>
        )}
        <Field id={`${compact ? 'c' : 'f'}-day`} label={t('Dag', 'Day')} required error={err.day && t('Vælg en dag', 'Choose a day')}>
          <select
            id={`${compact ? 'c' : 'f'}-day`}
            value={day}
            aria-invalid={err.day}
            onChange={(e) => {
              setDay(e.target.value)
              setTime('')
            }}
          >
            <option value="">{t('Vælg dag', 'Choose a day')}</option>
            {days.map((d) => (
              <option value={d.value} key={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </Field>
        <Field
          id={`${compact ? 'c' : 'f'}-time`}
          label={t('Tidspunkt', 'Time')}
          required
          error={err.time && t('Vælg et tidspunkt', 'Choose a time')}
        >
          <select id={`${compact ? 'c' : 'f'}-time`} value={time} aria-invalid={err.time} onChange={(e) => setTime(e.target.value)}>
            <option value="">{t('Vælg tidspunkt', 'Choose a time')}</option>
            {times.map((slot) => (
              <option value={slot} key={slot}>
                {slot}
              </option>
            ))}
          </select>
        </Field>
      </div>
      {showErrors && (
        <p className="form-alert" role="alert">
          {t('Tjek de markerede felter, så vi kan ringe til jer.', 'Check the marked fields so we can call you.')}
        </p>
      )}
      {failed && (
        <p className="form-alert" role="alert">
          {t('Beskeden kunne ikke sendes. Ring til os på ', 'We could not send your message. Call us on ')}
          <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
          {t(', så tager vi den med det samme.', ' and we will take it straight away.')}
        </p>
      )}
      <Button type="submit" className="form-submit" disabled={sending}>
        {sending ? t('Sender…', 'Sending…') : t('Send forespørgsel', 'Send request')}
      </Button>
      <p className="form-note">
        {t(
          'Gratis og uforpligtende. Vi bruger kun oplysningerne til at kontakte jer. ',
          'Free, no obligation. We only use your details to contact you. ',
        )}
        <Link href={privacyPath(locale)}>{t('Privatlivspolitik', 'Privacy policy')}</Link>
      </p>
      <ChevronDown className="select-icon-template" aria-hidden="true" />
    </form>
  )
}
