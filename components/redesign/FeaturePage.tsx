'use client'

// The design's feature page (src/pages/FeaturePage.tsx in the export), one
// component for all eight features. Layout varies by position in the list
// (composition = index % 4), exactly as in the design. Danish copy is the
// design's own; English is a translation.
import { features, type Feature, type FeatureCopy } from '@/lib/features'
import { ROUTES } from '@/lib/site-nav'
import { CallbackForm } from './Forms'
import { ArrowRight, Check, CircleAlert, MoveRight, Sparkles } from './icons'
import { useT } from './i18n'
import { FEATURE_ICONS } from './Layout'
import { PhoneJobVisual, ProductVisual } from './ProductVisual'
import { ButtonLink, Eyebrow, Heading, IconBox, Lead } from './Ui'

type Props = { feature: Feature; copy: FeatureCopy; composition: number; index: number }

// The design lowercases the short title mid-sentence ("Få en gennemgang af
// crm"). Acronyms keep their capitals.
function midSentence(title: string) {
  return /^[A-ZÆØÅ]{2,}$/.test(title) ? title : title.toLowerCase()
}

export function FeaturePage({ featureKey }: { featureKey: string }) {
  const { locale } = useT()
  const index = features.findIndex((item) => item.key === featureKey)
  const feature = features[index]
  const copy = feature[locale]
  const composition = index % 4
  const props = { feature, copy, composition, index }

  return (
    <div className={`feature-page feature-page-${composition} feature-accent-${feature.accent}`}>
      <FeatureHero {...props} />
      <ProblemStatement {...props} />
      <CapabilityStory {...props} />
      <FeatureWorkflow {...props} />
      <FeatureClosing {...props} />
    </div>
  )
}

function FeatureHero({ feature, copy, composition, index }: Props) {
  const { t, locale } = useT()
  return (
    <section className="feature-hero">
      <div className="feature-hero-grid">
        <div className="feature-hero-copy">
          <div className="feature-kicker">
            <IconBox icon={FEATURE_ICONS[feature.icon]} />
            <Eyebrow>{copy.eyebrow}</Eyebrow>
          </div>
          <Heading as="h1" size="display">
            {copy.title}
          </Heading>
          <Lead>{copy.description}</Lead>
          <div className="hero-actions">
            <ButtonLink to={ROUTES[locale].bookDemo}>
              {t('Se det i praksis', 'See it in practice')} <ArrowRight size={17} />
            </ButtonLink>
            <ButtonLink to={ROUTES[locale].home} variant="outline">
              {t('Udforsk platformen', 'Explore the platform')}
            </ButtonLink>
          </div>
          <div className="feature-hero-proof">
            <span>
              <Check /> {t('Bygget til flyttebranchen', 'Built for the moving industry')}
            </span>
            <span>
              <Check /> {t('En sammenhængende platform', 'One connected platform')}
            </span>
          </div>
        </div>
        <div className="feature-hero-art">
          <span className="feature-art-index">0{index + 1}</span>
          <ProductVisual type={feature.visual} />
          {feature.key === 'app' ? (
            <div className="feature-phone">
              <PhoneJobVisual />
            </div>
          ) : (
            <div className="feature-metric-card">
              <span>{copy.metric.value}</span>
              <small>{copy.metric.label}</small>
            </div>
          )}
          {composition === 2 && (
            <div className="feature-automation-chip">
              <Sparkles /> {t('Flow aktivt', 'Flow active')}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function ProblemStatement({ copy, composition }: Props) {
  const { t } = useT()
  return (
    <section className="feature-problem section-shell">
      <div className="feature-statement">
        <Eyebrow>{t('Hverdagen uden sammenhæng', 'A working day that does not connect')}</Eyebrow>
        <Heading>{copy.statement}</Heading>
        <Lead>
          {t(
            'Når vigtig information ligger flere steder, bliver selv en enkel opgave afhængig af manuelle overleveringer. Movena gør arbejdsgangen synlig og fælles.',
            'When important information sits in several places, even a simple job depends on manual handovers. Movena makes the workflow visible and shared.',
          )}
        </Lead>
      </div>
      <div className={`problem-stack problem-stack-${composition}`}>
        {copy.problems.map((problem, i) => (
          <article key={problem}>
            <span>0{i + 1}</span>
            <CircleAlert />
            <p>{problem}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function CapabilityStory({ feature, copy, composition }: Props) {
  const { t } = useT()
  return (
    <section className="feature-capability-story">
      <div className="section-shell">
        <div className="capability-head">
          <div>
            <Eyebrow>{t('Sådan hjælper Movena', 'How Movena helps')}</Eyebrow>
            <Heading>
              {t(
                `${copy.shortTitle}, der passer ind i resten af driften`,
                `${copy.shortTitle} that fits the rest of the operation`,
              )}
            </Heading>
          </div>
          <p>
            {t(
              'Hver funktion deler de samme kunde- og opgavedata. Det betyder færre gentagelser og et mere sikkert næste skridt.',
              'Every feature shares the same customer and job data. That means less repetition and a safer next step.',
            )}
          </p>
        </div>
        <div className={`feature-capability-layout layout-${composition}`}>
          <div className="feature-capability-visual">
            {composition === 1 || composition === 3 ? (
              <ProductVisual type={feature.visual} compact />
            ) : (
              <FeatureSignal feature={feature} copy={copy} />
            )}
          </div>
          <div className="capability-list">
            {copy.capabilities.map((item, i) => (
              <article key={item.title}>
                <span>0{i + 1}</span>
                <div>
                  <Heading as="h3" size="md">
                    {item.title}
                  </Heading>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureSignal({ feature, copy }: { feature: Feature; copy: FeatureCopy }) {
  const Icon = FEATURE_ICONS[feature.icon]
  return (
    <div className="feature-signal">
      <div className="signal-orbit signal-orbit-one" />
      <div className="signal-orbit signal-orbit-two" />
      <div className="signal-core">
        <Icon />
      </div>
      {copy.workflow.map((item, i) => (
        <span className={`signal-node signal-node-${i + 1}`} key={item}>
          <i>{i + 1}</i>
          {item}
        </span>
      ))}
    </div>
  )
}

function FeatureWorkflow({ copy }: Props) {
  const { t } = useT()
  return (
    <section className="feature-flow section-shell">
      <div className="feature-flow-heading">
        <Eyebrow>{t('Et naturligt flow', 'A natural flow')}</Eyebrow>
        <Heading>{t('Fra handling til fremdrift', 'From action to progress')}</Heading>
      </div>
      <div className="feature-flow-steps">
        {copy.workflow.map((item, i) => (
          <div key={item}>
            <span>0{i + 1}</span>
            <strong>{item}</strong>
            {i < copy.workflow.length - 1 && <MoveRight />}
          </div>
        ))}
      </div>
      <div className="feature-flow-metric">
        <span>{copy.metric.value}</span>
        <p>{copy.metric.label}</p>
      </div>
    </section>
  )
}

function FeatureClosing({ copy }: Props) {
  const { t } = useT()
  return (
    <section className="feature-form-section">
      <div className="section-shell feature-form-inner">
        <div>
          <Eyebrow>{t('Se det med jeres egne opgaver', 'See it with your own jobs')}</Eyebrow>
          <Heading>
            {t(
              `Få en gennemgang af ${midSentence(copy.shortTitle)}`,
              `Get a walkthrough of ${midSentence(copy.shortTitle)}`,
            )}
          </Heading>
          <Lead>
            {t(
              'Vi viser, hvordan Movena kan passe til jeres nuværende arbejdsgang og de steder, hvor I ønsker mindre manuelt arbejde.',
              'We show you how Movena can fit your current workflow and the places where you want less manual work.',
            )}
          </Lead>
        </div>
        <CallbackForm compact />
      </div>
    </section>
  )
}
