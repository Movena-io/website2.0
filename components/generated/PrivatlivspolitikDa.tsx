// @ts-nocheck -- generated file: the design's own JS is kept verbatim.
'use client'

// GENERATED from design-export/Privatlivspolitik-v5.dc.html by scripts/dc-to-tsx.mjs.
// Styles and numbers are the design's own. Hand edits below the marker only.
import { useState, useEffect } from 'react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import DemoCTA from '@/components/site/DemoCTA'

const DEMO_LOCALE = 'da'

export default function PrivatlivspolitikDa() {
  const [st, setSt] = useState<Record<string, any>>({})
  const setState = (patch: Record<string, any>) => setSt((p) => ({ ...p, ...patch }))

  useEffect(() => {
    const onResize = () => setSt((p) => (p.vw === window.innerWidth ? p : { ...p, vw: window.innerWidth }))
    window.addEventListener('resize', onResize)
    onResize()
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const vals: Record<string, any> = (() => {
const s = st || {};
    const set = (patch) => setState(patch);
    const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

    const home = s.home || 'medium';
    const packing = s.packing === true;
    const sent = s.sent === true;
    const cfg = {
      small: { men: 2, hours: 3, rate: 1500, pack: 1200 },
      medium: { men: 2, hours: 5, rate: 1500, pack: 1800 },
      house: { men: 3, hours: 7, rate: 2100, pack: 2800 }
    };
    const c = cfg[home];
    const price = 450 + c.hours * c.rate + (packing ? c.pack : 0);
    const seg = (k) => {
      const on = k === home;
      return {
        pressed: on ? 'true' : 'false',
        bg: on ? '#0B1F3B' : '#FFFFFF',
        fg: on ? '#FFFFFF' : '#0B1F3B',
        border: on ? '#0B1F3B' : '#C9D3E0'
      };
    };
    const h0 = seg('small');
    const h1 = seg('medium');
    const h2 = seg('house');

    const open = s.open === undefined ? 0 : s.open;
    const faq = (i) => ({
      open: open === i,
      expanded: open === i ? 'true' : 'false',
      sign: open === i ? '−' : '+',
      toggle: () => set({ open: open === i ? -1 : i })
    });
    const f0 = faq(0);
    const f1 = faq(1);
    const f2 = faq(2);
    const f3 = faq(3);
    const f4 = faq(4);
    const f5 = faq(5);

    const office = s.office === undefined ? 2 : s.office;
    const crew = s.crew === undefined ? 8 : s.crew;
    const started = s.started === true;

    const tab = s.tab === undefined ? 0 : s.tab;
    const tb = (i) => ({ sel: tab === i ? 'true' : 'false', bg: tab === i ? '#0B1F3B' : 'transparent', fg: tab === i ? '#FFFFFF' : '#0B1F3B', nbg: tab === i ? '#2BA8E0' : '#E6EDFC', nfg: tab === i ? '#0B1F3B' : '#1D4ED8' });
    const tb0 = tb(0);
    const tb1 = tb(1);
    const tb2 = tb(2);

    const mod = s.mod === undefined ? -1 : s.mod;
    const modVals = {};
    for (let k = 0; k < 15; k++) {
      const on = mod === k;
      modVals['m' + k + 'open'] = on;
      modVals['m' + k + 'exp'] = on ? 'true' : 'false';
      modVals['m' + k + 'rot'] = on ? 180 : 0;
      modVals['m' + k + 'toggle'] = () => set({ mod: on ? -1 : k });
    }

    const gv = {};
    for (let g = 0; g < 3; g++) {
      const cur = s['f' + g] === undefined ? 0 : s['f' + g];
      for (let k = 0; k < 4; k++) {
        const on = cur === k;
        const p = 'g' + g + 'f' + k;
        gv['v' + g + k] = on;
        gv[p + 'pr'] = on ? 'true' : 'false';
        gv[p + 'bg'] = on ? '#FFFFFF' : 'transparent';
        gv[p + 'bd'] = on ? '#D6DEE8' : 'transparent';
        gv[p + 'sh'] = on ? '0 1px 2px rgba(11, 31, 59, 0.06), 0 10px 24px -14px rgba(11, 31, 59, 0.3)' : 'none';
        gv[p + 'ib'] = on ? '#1D4ED8' : '#E6EDFC';
        gv[p + 'ic'] = on ? '#FFFFFF' : '#1D4ED8';
        gv['pick' + p] = () => set({ ['f' + g]: k });
      }
    }

    const navOpen = s.navOpen === true;

    const ckDone = s.ckDone === true; const ckOpen = s.ckOpen === true; const ckStat = s.ckStat === true; const ckMkt = s.ckMkt === true;
    const ckSw = (on) => ({ bg: on ? '#2563EB' : '#C9D3E0', x: on ? 'translateX(18px)' : 'none', ar: on ? 'true' : 'false' });
    const swS = ckSw(ckStat); const swM = ckSw(ckMkt);

    const mobOpen = s.mobOpen === true; const mobFeat = s.mobFeat === true;

    // Bigger screens: scale the whole page up in steps, so content is not lost in empty space at the sides.
    const vwNow = s.vw || (typeof window !== 'undefined' ? window.innerWidth : 1440);
    const pageZoom = vwNow >= 2500 ? 1.45 : vwNow >= 2200 ? 1.3 : vwNow >= 1800 ? 1.125 : 1;

    return {
      pageZoom: pageZoom,
      pageMinH: (100 / pageZoom).toFixed(2) + 'vh',
      ckShow: !ckDone, ckOpen: ckOpen, ckClosed: !ckOpen,
      CkStatBg: swS.bg, CkStatX: swS.x, CkStatAr: swS.ar, CkMktBg: swM.bg, CkMktX: swM.x, CkMktAr: swM.ar,
      toggleCkStat: () => set({ ckStat: !ckStat }), toggleCkMkt: () => set({ ckMkt: !ckMkt }),
      ckAcceptAll: () => set({ ckDone: true, ckStat: true, ckMkt: true, ckOpen: false }),
      ckReject: () => set({ ckDone: true, ckStat: false, ckMkt: false, ckOpen: false }),
      ckSave: () => set({ ckDone: true, ckOpen: false }), ckSettings: () => set({ ckOpen: true }), ckReopen: () => set({ ckDone: false, ckOpen: true }),
      navOpen: navOpen,
      navExp: navOpen ? 'true' : 'false',
      navRot: navOpen ? 180 : 0,
      toggleNav: () => set({ navOpen: !navOpen }),
      mobOpen: mobOpen, mobExp: mobOpen ? 'true' : 'false', toggleMob: () => set({ mobOpen: !mobOpen, navOpen: false }),
      mobFeat: mobFeat, mobFeatExp: mobFeat ? 'true' : 'false', mobFeatRot: mobFeat ? 180 : 0, toggleMobFeat: () => set({ mobFeat: !mobFeat }),
      burgerD: mobOpen ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16',
      ...gv,
      ...modVals,
      t0: tab === 0, t1: tab === 1, t2: tab === 2,
      t0sel: tb0.sel, t0bg: tb0.bg, t0fg: tb0.fg, t0nbg: tb0.nbg, t0nfg: tb0.nfg,
      t1sel: tb1.sel, t1bg: tb1.bg, t1fg: tb1.fg, t1nbg: tb1.nbg, t1nfg: tb1.nfg,
      t2sel: tb2.sel, t2bg: tb2.bg, t2fg: tb2.fg, t2nbg: tb2.nbg, t2nfg: tb2.nfg,
      pickT0: () => set({ tab: 0 }),
      pickT1: () => set({ tab: 1 }),
      pickT2: () => set({ tab: 2 }),
      fromAddr: s.fromAddr !== undefined ? s.fromAddr : 'Vesterbrogade 42, 1620 København V',
      toAddr: s.toAddr !== undefined ? s.toAddr : 'Amagerbrogade 118, 2300 København S',
      date: s.date || '2026-10-14',
      onFrom: (e) => set({ fromAddr: e.target.value }),
      onTo: (e) => set({ toAddr: e.target.value }),
      onDate: (e) => set({ date: e.target.value }),
      packing: packing,
      togglePacking: () => set({ packing: !packing }),
      h0pressed: h0.pressed, h0bg: h0.bg, h0fg: h0.fg, h0border: h0.border,
      h1pressed: h1.pressed, h1bg: h1.bg, h1fg: h1.fg, h1border: h1.border,
      h2pressed: h2.pressed, h2bg: h2.bg, h2fg: h2.fg, h2border: h2.border,
      pickSmall: () => set({ home: 'small' }),
      pickMedium: () => set({ home: 'medium' }),
      pickHouse: () => set({ home: 'house' }),
      priceText: fmt(Math.floor(price / 500) * 500) + ' – ' + fmt(Math.floor(price / 500) * 500 + 500) + ' kr.',
      crewText: c.men + ' flyttefolk, cirka ' + c.hours + ' timer',
      showForm: !sent,
      sent: sent,
      send: () => set({ sent: true }),
      reset: () => set({ sent: false }),
      caption: sent
        ? 'Forespørgslen ligger nu hos jer i Movena med prisen, klar til at blive godkendt.'
        : 'Prisformularen, som jeres kunder ser den på jeres hjemmeside. Prøv den.',
      f0open: f0.open, f0expanded: f0.expanded, f0sign: f0.sign, f0toggle: f0.toggle,
      f1open: f1.open, f1expanded: f1.expanded, f1sign: f1.sign, f1toggle: f1.toggle,
      f2open: f2.open, f2expanded: f2.expanded, f2sign: f2.sign, f2toggle: f2.toggle,
      f3open: f3.open, f3expanded: f3.expanded, f3sign: f3.sign, f3toggle: f3.toggle,
      f4open: f4.open, f4expanded: f4.expanded, f4sign: f4.sign, f4toggle: f4.toggle,
      f5open: f5.open, f5expanded: f5.expanded, f5sign: f5.sign, f5toggle: f5.toggle,
      office: office,
      crew: crew,
      officeDec: () => set({ office: clamp(office - 1, 1, 50) }),
      officeInc: () => set({ office: clamp(office + 1, 1, 50) }),
      crewDec: () => set({ crew: clamp(crew - 1, 0, 200) }),
      crewInc: () => set({ crew: clamp(crew + 1, 0, 200) }),
      totalText: fmt(office * 250 + crew * 99) + ' kr.',
      jobLabel: started ? 'Stop' : 'Start job',
      jobBg: started ? '#0B1F3B' : '#1D4ED8',
      jobStatus: started ? 'I gang siden 08:02' : 'Tryk, når I er på adressen',
      toggleJob: () => set({ started: !started })
    };
  })()
  const V = vals as any

  return (
<div data-dc="" style={{ width: "100%", minHeight: V.pageMinH, zoom: V.pageZoom, display: "flex", flexDirection: "column", background: "#FFFFFF", color: "#0B1F3B", fontFamily: "Manrope, 'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "17px", lineHeight: "1.55", WebkitFontSmoothing: "antialiased" }}>

<SiteHeader />

<section id="top" style={{ background: "radial-gradient(ellipse 55% 55% at 72% 30%, rgba(59, 130, 246, 0.16) 0%, rgba(59, 130, 246, 0.05) 45%, rgba(255, 255, 255, 0) 75%), linear-gradient(180deg, #FFFFFF 70%, #F4F7FB 100%)", padding: "clamp(32px, 4vw, 56px) 0 clamp(28px, 3vw, 40px)" }}>
<div style={{ maxWidth: "820px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 64px)", boxSizing: "border-box", width: "100%" }}>
<div style={{ fontSize: "14px", color: "#4A5B73" }}><a href="/da" style={{ color: "#4A5B73" }}>Forside</a> / Privatlivspolitik</div>
<h1 style={{ margin: "20px 0 0", fontSize: "clamp(36px, 4.2vw, 56px)", lineHeight: "1.05", fontWeight: "600", letterSpacing: "-0.04em" }}>Privatlivs<span style={{ background: "linear-gradient(90deg, #1D4ED8 0%, #3B82F6 55%, #38A3F1 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent" }}>politik</span></h1><p style={{ margin: "14px 0 0", fontSize: "15px", color: "#6B7A90" }}>Senest opdateret: 28. september 2026</p></div>
</section>

<section style={{ background: "#FFFFFF", padding: "clamp(24px, 3vw, 40px) 0 clamp(56px, 6vw, 96px)" }}>
<div style={{ maxWidth: "820px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 64px)", boxSizing: "border-box", width: "100%" }}>
<article><div style={{ background: "#F4F7FB", border: "1px solid #E3E8EF", borderLeft: "4px solid #2563EB", borderRadius: "14px", padding: "18px 20px", fontSize: "16px", lineHeight: "1.65", color: "#1E2E45" }}><b>Kort fortalt:</b> Vi indsamler kun det, vi skal bruge for at kontakte jer og forbedre siden. Statistik og annoncer kræver dit samtykke, og du kan altid ændre dit valg under Cookieindstillinger nederst på siden.</div><h2 style={{ margin: "44px 0 0", fontSize: "clamp(22px, 2.2vw, 28px)", lineHeight: "1.25", fontWeight: "600", letterSpacing: "-0.02em", scrollMarginTop: "100px" }}>Hvem er ansvarlig for dine oplysninger?</h2><p style={{ fontSize: "17px", lineHeight: "1.75", color: "#1E2E45", margin: "14px 0 0" }}>Movena ApS, CVR 46764129, Rådhuspladsen 16, København, er dataansvarlig for de oplysninger, vi indsamler på movena.io. Har du spørgsmål, kan du skrive til <a href="mailto:info@movena.io" style={{ color: "#2563EB", fontWeight: "600" }}>info@movena.io</a>.</p><h2 style={{ margin: "44px 0 0", fontSize: "clamp(22px, 2.2vw, 28px)", lineHeight: "1.25", fontWeight: "600", letterSpacing: "-0.02em", scrollMarginTop: "100px" }}>Hvilke oplysninger indsamler vi?</h2><p style={{ fontSize: "17px", lineHeight: "1.75", color: "#1E2E45", margin: "14px 0 0" }}>Når du beder om en demo, gemmer vi det, du skriver i formularen:</p><ul style={{ margin: "12px 0 0", paddingLeft: "22px", display: "flex", flexDirection: "column", gap: "6px" }}><li style={{ fontSize: "17px", lineHeight: "1.7", color: "#1E2E45" }}>Navn, firmanavn og telefonnummer</li><li style={{ fontSize: "17px", lineHeight: "1.7", color: "#1E2E45" }}>E-mail, hvis du oplyser den</li><li style={{ fontSize: "17px", lineHeight: "1.7", color: "#1E2E45" }}>Antal medarbejdere, hvad I bruger i dag, og hvornår vi må ringe</li></ul><p style={{ fontSize: "17px", lineHeight: "1.75", color: "#1E2E45", margin: "14px 0 0" }}>Når du bruger hjemmesiden, måler vi besøg uden cookies med Vercel Analytics. Giver du samtykke, bruger vi også Google Analytics og Meta Pixel, som beskrevet nedenfor.</p><h2 style={{ margin: "44px 0 0", fontSize: "clamp(22px, 2.2vw, 28px)", lineHeight: "1.25", fontWeight: "600", letterSpacing: "-0.02em", scrollMarginTop: "100px" }}>Hvorfor og med hvilket grundlag?</h2><ul style={{ margin: "12px 0 0", paddingLeft: "22px", display: "flex", flexDirection: "column", gap: "6px" }}><li style={{ fontSize: "17px", lineHeight: "1.7", color: "#1E2E45" }}>Demo-forespørgsler: for at kontakte dig om en demo. Grundlaget er vores legitime interesse og forberedelse af en eventuel aftale (GDPR art. 6, stk. 1, litra f og b).</li><li style={{ fontSize: "17px", lineHeight: "1.7", color: "#1E2E45" }}>Statistik og annoncer: kun med dit samtykke (GDPR art. 6, stk. 1, litra a og cookiebekendtgørelsen).</li></ul><h2 style={{ margin: "44px 0 0", fontSize: "clamp(22px, 2.2vw, 28px)", lineHeight: "1.25", fontWeight: "600", letterSpacing: "-0.02em", scrollMarginTop: "100px" }}>Cookies</h2><p style={{ fontSize: "17px", lineHeight: "1.75", color: "#1E2E45", margin: "14px 0 0" }}>Nødvendige cookies får siden til at virke og kræver ikke samtykke. Alle andre sætter vi kun, hvis du siger ja.</p><div style={{ marginTop: "16px", overflowX: "auto", border: "1px solid #E3E8EF", borderRadius: "14px" }}><table style={{ width: "100%", minWidth: "600px", borderCollapse: "collapse", fontSize: "15px", lineHeight: "1.5" }}><thead><tr style={{ background: "#F4F7FB" }}><th scope="col" style={{ textAlign: "left", padding: "11px 14px", fontWeight: "600" }}>Cookie</th><th scope="col" style={{ textAlign: "left", padding: "11px 14px", fontWeight: "600" }}>Udbyder</th><th scope="col" style={{ textAlign: "left", padding: "11px 14px", fontWeight: "600" }}>Formål</th><th scope="col" style={{ textAlign: "left", padding: "11px 14px", fontWeight: "600" }}>Kategori</th><th scope="col" style={{ textAlign: "left", padding: "11px 14px", fontWeight: "600" }}>Varighed</th></tr></thead><tbody><tr style={{ borderTop: "1px solid #E3E8EF" }}><td style={{ padding: "11px 14px", color: "#0B1F3B", fontWeight: "600" }}>Samtykkevalg</td><td style={{ padding: "11px 14px", color: "#4A5B73" }}>Movena</td><td style={{ padding: "11px 14px", color: "#4A5B73" }}>Husker dit cookievalg</td><td style={{ padding: "11px 14px", color: "#4A5B73" }}>Nødvendig</td><td style={{ padding: "11px 14px", color: "#4A5B73" }}>12 måneder</td></tr><tr style={{ borderTop: "1px solid #E3E8EF" }}><td style={{ padding: "11px 14px", color: "#0B1F3B", fontWeight: "600" }}>_ga, _ga_*</td><td style={{ padding: "11px 14px", color: "#4A5B73" }}>Google Analytics</td><td style={{ padding: "11px 14px", color: "#4A5B73" }}>Statistik over besøg på siden</td><td style={{ padding: "11px 14px", color: "#4A5B73" }}>Statistik</td><td style={{ padding: "11px 14px", color: "#4A5B73" }}>Op til 2 år</td></tr><tr style={{ borderTop: "1px solid #E3E8EF" }}><td style={{ padding: "11px 14px", color: "#0B1F3B", fontWeight: "600" }}>_fbp</td><td style={{ padding: "11px 14px", color: "#4A5B73" }}>Meta Pixel</td><td style={{ padding: "11px 14px", color: "#4A5B73" }}>Måling og målretning af annoncer</td><td style={{ padding: "11px 14px", color: "#4A5B73" }}>Marketing</td><td style={{ padding: "11px 14px", color: "#4A5B73" }}>3 måneder</td></tr></tbody></table></div><h2 style={{ margin: "44px 0 0", fontSize: "clamp(22px, 2.2vw, 28px)", lineHeight: "1.25", fontWeight: "600", letterSpacing: "-0.02em", scrollMarginTop: "100px" }}>Hvem deler vi oplysningerne med?</h2><p style={{ fontSize: "17px", lineHeight: "1.75", color: "#1E2E45", margin: "14px 0 0" }}>Vi sælger aldrig dine oplysninger. Vi bruger disse databehandlere:</p><ul style={{ margin: "12px 0 0", paddingLeft: "22px", display: "flex", flexDirection: "column", gap: "6px" }}><li style={{ fontSize: "17px", lineHeight: "1.7", color: "#1E2E45" }}>Vercel (drift af hjemmesiden)</li><li style={{ fontSize: "17px", lineHeight: "1.7", color: "#1E2E45" }}>Google (Google Analytics, kun med samtykke)</li><li style={{ fontSize: "17px", lineHeight: "1.7", color: "#1E2E45" }}>Meta (Meta Pixel, kun med samtykke)</li><li style={{ fontSize: "17px", lineHeight: "1.7", color: "#1E2E45" }}>Postmark (e-mail) og Supabase (database)</li></ul><p style={{ fontSize: "17px", lineHeight: "1.75", color: "#1E2E45", margin: "14px 0 0" }}>Google og Meta kan overføre oplysninger til USA. Det sker under EU-US Data Privacy Framework.</p><h2 style={{ margin: "44px 0 0", fontSize: "clamp(22px, 2.2vw, 28px)", lineHeight: "1.25", fontWeight: "600", letterSpacing: "-0.02em", scrollMarginTop: "100px" }}>Hvor længe gemmer vi dem?</h2><p style={{ fontSize: "17px", lineHeight: "1.75", color: "#1E2E45", margin: "14px 0 0" }}>Demo-forespørgsler, der ikke bliver til et kundeforhold, sletter vi efter 12 måneder. Statistik gemmes som angivet i tabellen ovenfor.</p><h2 style={{ margin: "44px 0 0", fontSize: "clamp(22px, 2.2vw, 28px)", lineHeight: "1.25", fontWeight: "600", letterSpacing: "-0.02em", scrollMarginTop: "100px" }}>Dine rettigheder</h2><p style={{ fontSize: "17px", lineHeight: "1.75", color: "#1E2E45", margin: "14px 0 0" }}>Du har ret til at få indsigt i, rette, slette og få udleveret dine oplysninger, til at begrænse brugen af dem og til at gøre indsigelse. Du kan til enhver tid trække dit samtykke tilbage under Cookieindstillinger.</p><p style={{ fontSize: "17px", lineHeight: "1.75", color: "#1E2E45", margin: "14px 0 0" }}>Er du utilfreds med, hvordan vi behandler dine oplysninger, kan du klage til Datatilsynet på datatilsynet.dk.</p><h2 style={{ margin: "44px 0 0", fontSize: "clamp(22px, 2.2vw, 28px)", lineHeight: "1.25", fontWeight: "600", letterSpacing: "-0.02em", scrollMarginTop: "100px" }}>Når I bruger Movena som kunde</h2><p style={{ fontSize: "17px", lineHeight: "1.75", color: "#1E2E45", margin: "14px 0 0" }}>De oplysninger, I lægger i Movena om jeres kunder og medarbejdere, er jeres. Her er I dataansvarlige, og Movena er databehandler efter en databehandleraftale. Data opbevares i Europa, og I kan altid få jeres data udleveret. <a href="https://www.movena.io/dataportabilitet" style={{ color: "#2563EB", fontWeight: "600" }}>Læs om dataportabilitet</a>.</p><h2 style={{ margin: "44px 0 0", fontSize: "clamp(22px, 2.2vw, 28px)", lineHeight: "1.25", fontWeight: "600", letterSpacing: "-0.02em", scrollMarginTop: "100px" }}>Ændringer</h2><p style={{ fontSize: "17px", lineHeight: "1.75", color: "#1E2E45", margin: "14px 0 0" }}>Vi opdaterer denne politik, når vi ændrer, hvordan vi behandler oplysninger. Datoen øverst viser den seneste ændring.</p></article>
</div>
</section>

<SiteFooter />




</div>
  )
}
