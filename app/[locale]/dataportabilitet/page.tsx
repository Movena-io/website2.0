import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { isLocale } from '@/lib/locales'

// Danish only. The page lives in the Danish route tree but is served at the
// unprefixed /dataportabilitet by the rewrite in middleware.ts, so both the
// Danish and the English footer point at one address.
export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  if (!isLocale(params.locale)) return {}
  return {
    title: 'Dataportabilitet og skift af leverandør: Movena',
    description:
      'Sådan får I jeres data med, hvis I skifter fra Movena til en anden leverandør, hvilke formater udtrækket leveres i, og hvor jeres data behandles.',
    alternates: {
      canonical: '/dataportabilitet',
    },
  }
}

export default function DataPortability() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h1 className="text-[40px] font-bold tracking-[-0.025em] text-[#0B1F3B] mb-3">
            Dataportabilitet og skift af leverandør
          </h1>
          <p className="text-[14px] text-[#475569] mb-12">Senest opdateret: 21. september 2026</p>

          <div className="prose-custom">

            <Intro>
              <p>
                Her kan I se, hvordan I får jeres data med, hvis I vil skifte fra Movena til en anden
                leverandør eller selv overtage driften, og hvor jeres data behandles. Oplysningerne
                gives efter EU&rsquo;s dataforordning (forordning (EU) 2023/2854), artikel 26 og 28, og
                uddyber pkt. 8 og 9 i Movenas abonnementsvilkår. Er der forskel, gælder
                abonnementsvilkårene.
              </p>
            </Intro>

            <Section title="Sådan skifter I">
              <ol>
                <li>
                  Send en skriftlig anmodning til{' '}
                  <a href="mailto:vcl@movena.io">vcl@movena.io</a>.
                </li>
                <li>
                  Vi går i gang senest 2 måneder efter anmodningen og gennemfører skiftet inden for
                  højst 30 kalenderdage. I kan selv forlænge perioden én gang.
                </li>
                <li>
                  Kan skiftet teknisk ikke gennemføres inden for 30 dage, giver vi jer besked inden
                  14 arbejdsdage og foreslår en anden periode på højst 7 måneder.
                </li>
                <li>
                  Når skiftet er gennemført, har I mindst 30 dage til at hente jeres data.
                </li>
              </ol>
              <p>
                Det koster ikke noget at skifte. I kan også når som helst bede om et samlet udtræk af
                jeres data, også efter at aftalen er ophørt, mens jeres data stadig opbevares.
              </p>
            </Section>

            <Section title="Hvad udtrækket indeholder">
              <p>
                Udtrækket leveres via et eller flere downloadlinks, der er gyldige i 30 dage. Det
                omfatter:
              </p>
              <ul>
                <li>kunder og leads</li>
                <li>tilbud, priser og ordrer</li>
                <li>flytteopgaver</li>
                <li>planlægning og vagter</li>
                <li>tidsregistreringer</li>
                <li>brugere og medarbejdere</li>
                <li>sendte e-mails med metadata</li>
                <li>uploadede filer</li>
                <li>skabeloner, prislister og indstillinger</li>
                <li>metadata</li>
              </ul>
            </Section>

            <Section title="Dataformater">
              <Table
                headers={['Data', 'Format']}
                rows={[
                  ['Alle tabeller', 'Én JSON-fil pr. tabel (RFC 8259)'],
                  ['Leads, fakturaer og tidsregistreringer', 'Derudover som CSV'],
                  ['Uploadede filer', 'Originalformat, som de blev uploadet'],
                  [
                    'Oversigt over udtrækket',
                    'Manifest, der beskriver indholdet af hver fil, og hvilke data der er udeladt',
                  ],
                ]}
              />
            </Section>

            <Section title="Hvad der ikke følger med">
              <p>
                Følgende indgår ikke, fordi det er Movenas egne data eller forretningshemmeligheder:
                kildekode og algoritmer, den interne databasestruktur, system- og sikkerhedslogs,
                betalingshændelser hos Stripe, Movenas egne salgs- og supportdata samt tællere, der
                beskytter mod misbrug.
              </p>
            </Section>

            <Section title="Hvor jeres data behandles">
              <p>
                Movena ApS er et dansk selskab. Aftalen er underlagt dansk ret, og Københavns Byret
                er værneting. Database og filer lagres i EU.
              </p>
              <Table
                headers={['Leverandør', 'Opgave', 'Placering', 'Grundlag for overførsel']}
                rows={[
                  [
                    'Supabase, Inc.',
                    'Database, login og filer',
                    'Frankfurt, EU',
                    'EU-Kommissionens standardkontraktbestemmelser',
                  ],
                  [
                    'Vercel Inc.',
                    'Webapp og serverfunktioner',
                    'Frankfurt, EU',
                    'EU-U.S. Data Privacy Framework',
                  ],
                  [
                    'ActiveCampaign (Postmark)',
                    'Udsendelse af e-mails',
                    'USA',
                    'EU-U.S. Data Privacy Framework',
                  ],
                  [
                    'Mapbox, Inc.',
                    'Geokodning, ruter og kort',
                    'USA',
                    'EU-U.S. Data Privacy Framework',
                  ],
                  [
                    'Google Ireland Ltd.',
                    'Ruter og kortbilleder',
                    'EU, eventuelt USA',
                    'EU-U.S. Data Privacy Framework',
                  ],
                  [
                    'Functional Software (Sentry)',
                    'Fejlrapportering; persondata fjernes før afsendelse',
                    'EU-datacenter',
                    'EU-U.S. Data Privacy Framework',
                  ],
                  [
                    'Klimadatastyrelsen (Adressevælgeren)',
                    'Adresseopslag',
                    'Danmark',
                    'Ikke relevant, dansk myndighed',
                  ],
                ]}
              />
            </Section>

            <Section title="Beskyttelse mod ulovlig adgang fra lande uden for EU">
              <ul>
                <li>Data lagres i EU.</li>
                <li>Data krypteres under overførsel (TLS) og under opbevaring.</li>
                <li>Adgang kræver personligt login.</li>
                <li>
                  Hver virksomheds data holdes adskilt med adgangsstyring på rækkeniveau i databasen.
                </li>
                <li>
                  Movenas egne opslag i kundedata logges med hvem, hvilken virksomhed og hvornår.
                </li>
                <li>
                  Overførsler til USA sker kun til modtagere, der er certificeret under EU-U.S. Data
                  Privacy Framework, eller under EU-Kommissionens standardkontraktbestemmelser.
                </li>
                <li>Bortfalder et overførselsgrundlag, sikrer vi et andet uden unødig forsinkelse.</li>
              </ul>
            </Section>

            <Section title="Kontakt">
              <p>
                Spørgsmål om skift og dataudtræk:{' '}
                <a href="mailto:vcl@movena.io">vcl@movena.io</a>. Oplysningerne på denne side kan
                også fås ved henvendelse.
              </p>
              <p>Movena ApS · CVR-nr. 46764129 · Rådhuspladsen 16, kl. 2, 1550 København V</p>
            </Section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

const BODY_CLASS =
  'flex flex-col gap-3 text-[16px] font-normal text-[#475569] leading-[1.75] ' +
  '[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5 ' +
  '[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-1.5 ' +
  '[&_strong]:font-semibold [&_strong]:text-[#0F172A] ' +
  '[&_a]:text-[#1D4ED8] hover:[&_a]:underline'

function Intro({ children }: { children: React.ReactNode }) {
  return <div className={`mb-10 ${BODY_CLASS}`}>{children}</div>
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-[20px] font-bold text-[#0B1F3B] mb-4 tracking-[-0.01em]">{title}</h2>
      <div className={BODY_CLASS}>{children}</div>
    </div>
  )
}

// The supplier table is four columns wide and will not fit a phone, so a table
// scrolls inside its own frame rather than pushing the page sideways. The
// minimum tracks the column count, so the two-column table still fits a phone
// without a scrollbar and only the wide one gets one.
function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[#E2E8F0]">
      <table
        style={{ minWidth: `${headers.length * 150}px` }}
        className="w-full border-collapse text-left text-[14px] leading-[1.6]"
      >
        <thead>
          <tr className="bg-[#F8FAFC]">
            {headers.map((header) => (
              <th
                key={header}
                className="border-b border-[#E2E8F0] px-4 py-3 font-semibold text-[#0F172A] align-top"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-b border-[#E2E8F0] last:border-b-0">
              {row.map((cell, i) => (
                <td
                  key={i}
                  className={`px-4 py-3 align-top ${
                    i === 0 ? 'font-medium text-[#0F172A]' : 'text-[#475569]'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
