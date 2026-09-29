// @ts-nocheck -- generated file: the design's own JS is kept verbatim.
'use client'

// GENERATED from design-export/Blog-post-v5.dc.html by scripts/dc-to-tsx.mjs.
// Styles and numbers are the design's own. Hand edits below the marker only.
import { useState, useEffect } from 'react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import DemoCTA from '@/components/site/DemoCTA'
import { submitDemoLead } from '@/lib/demo-lead'

const DEMO_LOCALE = 'da'

export default function BlogPostDa() {
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

    const bfo = s.bfo === undefined ? 0 : s.bfo;
    const bfv = {};
    for (let k = 0; k < 3; k++) { const on = bfo === k; bfv['bf' + k + 'open'] = on; bfv['bf' + k + 'exp'] = on ? 'true' : 'false'; bfv['bf' + k + 'sign'] = on ? '−' : '+'; bfv['bf' + k + 'toggle'] = () => set({ bfo: on ? -1 : k }); }

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
      ...bfv,
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
<div data-progress="" aria-hidden="true" style={{ position: "fixed", top: "0", left: "0", right: "0", height: "3px", zIndex: "40", transformOrigin: "left", transform: "scaleX(0)", background: "linear-gradient(90deg, #2563EB, #38A3F1)" }}></div>

<section id="top" style={{ background: "radial-gradient(ellipse 55% 55% at 72% 30%, rgba(59, 130, 246, 0.16) 0%, rgba(59, 130, 246, 0.05) 45%, rgba(255, 255, 255, 0) 75%), linear-gradient(180deg, #FFFFFF 70%, #F4F7FB 100%)", padding: "clamp(32px, 4vw, 56px) 0 clamp(32px, 4vw, 48px)" }}>
<div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 64px)", boxSizing: "border-box", width: "100%" }}>
<div style={{ fontSize: "14px", color: "#4A5B73" }}><a href="/da" style={{ color: "#4A5B73" }}>Forside</a> / <a href="/da/blog" style={{ color: "#4A5B73" }}>Blog</a> / Tilbud og salg</div>
<h1 style={{ margin: "20px 0 0", fontSize: "clamp(34px, 4.2vw, 56px)", lineHeight: "1.06", fontWeight: "600", letterSpacing: "-0.04em" }}>Sådan sender I tilbud samme dag</h1><p style={{ margin: "18px 0 0", fontSize: "clamp(18px, 1.5vw, 21px)", lineHeight: "1.55", color: "#4A5B73" }}>Hvad I skal bruge fra kunden, hvilken prismodel der passer, og hvordan I følger op uden at glemme det.</p><div style={{ marginTop: "22px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px" }}><div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#4A5B73" }}><span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#E6EDFC", color: "#1D4ED8", fontSize: "11px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>VL</span><span><span style={{ fontWeight: "600", color: "#0B1F3B" }}>Villads Laun</span> · Opdateret 18. sep. 2026 · 6 min. læsning</span></div></div>
<div style={{ marginTop: "28px" }}><div aria-hidden="true" style={{ position: "relative", aspectRatio: "21 / 9", borderRadius: "20px", overflow: "hidden", background: "radial-gradient(circle at 78% 22%, #4F8FF755 0%, #4F8FF700 45%), radial-gradient(rgba(255, 255, 255, 0.10) 1px, rgba(255, 255, 255, 0) 1.4px) 0 0 / 18px 18px, linear-gradient(160deg, #10284A 0%, #060F1F 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="96" height="96" viewBox="0 0 24 24"><defs><linearGradient id="bcg-35398347" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4F8FF7"></stop><stop offset="1" stopColor="#FFFFFF"></stop></linearGradient></defs><g fill="none" stroke="url(#bcg-35398347)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><path d="M14 3v5h5"></path></g></svg><span style={{ position: "absolute", left: "18px", top: "18px", display: "inline-flex", alignItems: "center", gap: "6px", height: "26px", padding: "0 10px", borderRadius: "13px", background: "rgba(255, 255, 255, 0.10)", border: "1px solid rgba(255, 255, 255, 0.16)", color: "#FFFFFF", fontSize: "12px", fontWeight: "600" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4F8FF7" }}></span>Tilbud og salg</span></div></div>
</div>
</section>

<section style={{ background: "#FFFFFF", padding: "clamp(32px, 4vw, 56px) 0 clamp(56px, 6vw, 96px)" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 64px)", boxSizing: "border-box", width: "100%", display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "32px clamp(40px, 5vw, 72px)" }}>
<div style={{ flex: "0 1 240px", minWidth: "0", alignSelf: "stretch" }}><nav aria-label="Indhold" style={{ position: "sticky", top: "96px" }}><div style={{ fontSize: "13px", fontWeight: "600", color: "#6B7A90", marginBottom: "10px" }}>Indhold</div><ol style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "2px", borderLeft: "2px solid #E3E8EF" }}><li><a href="#hvorfor" style={{ display: "block", padding: "6px 0 6px 14px", marginLeft: "-2px", borderLeft: "2px solid #2563EB", fontSize: "14px", lineHeight: "1.4", fontWeight: "600", color: "#1D4ED8", textDecoration: "none" }}>Hvorfor svartiden betyder noget</a></li><li><a href="#det-skal-i-bruge" style={{ display: "block", padding: "6px 0 6px 14px", marginLeft: "-2px", borderLeft: "2px solid transparent", fontSize: "14px", lineHeight: "1.4", fontWeight: "500", color: "#4A5B73", textDecoration: "none" }}>Det skal I bruge fra kunden</a></li><li><a href="#prismodel" style={{ display: "block", padding: "6px 0 6px 14px", marginLeft: "-2px", borderLeft: "2px solid transparent", fontSize: "14px", lineHeight: "1.4", fontWeight: "500", color: "#4A5B73", textDecoration: "none" }}>Vælg en prismodel, I kan stå inde for</a></li><li><a href="#opfoelgning" style={{ display: "block", padding: "6px 0 6px 14px", marginLeft: "-2px", borderLeft: "2px solid transparent", fontSize: "14px", lineHeight: "1.4", fontWeight: "500", color: "#4A5B73", textDecoration: "none" }}>Følg op uden at glemme det</a></li><li><a href="#faq" style={{ display: "block", padding: "6px 0 6px 14px", marginLeft: "-2px", borderLeft: "2px solid transparent", fontSize: "14px", lineHeight: "1.4", fontWeight: "500", color: "#4A5B73", textDecoration: "none" }}>Ofte stillede spørgsmål</a></li></ol></nav></div>
<article style={{ flex: "1 1 520px", minWidth: "0", maxWidth: "720px" }}><div style={{ background: "#F4F7FB", border: "1px solid #E3E8EF", borderLeft: "4px solid #2563EB", borderRadius: "14px", padding: "20px 22px" }}><div style={{ fontSize: "15px", fontWeight: "600" }}>Kort fortalt</div><ul style={{ listStyle: "none", margin: "12px 0 0", padding: "0", display: "flex", flexDirection: "column", gap: "8px" }}><li style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "18px", lineHeight: "1.7", color: "#1E2E45" }}><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: "0", marginTop: "6px" }}><circle cx="12" cy="12" r="9" fill="none" stroke="#2563EB" strokeWidth="1.6"></circle><path d="M8.5 12.4l2.4 2.4 4.6-5" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg><span>Kunden spørger ofte flere firmaer på én gang, så svartiden tæller.</span></li><li style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "18px", lineHeight: "1.7", color: "#1E2E45" }}><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: "0", marginTop: "6px" }}><circle cx="12" cy="12" r="9" fill="none" stroke="#2563EB" strokeWidth="1.6"></circle><path d="M8.5 12.4l2.4 2.4 4.6-5" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg><span>Få de rigtige oplysninger fra start, også billeder af boligen.</span></li><li style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "18px", lineHeight: "1.7", color: "#1E2E45" }}><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: "0", marginTop: "6px" }}><circle cx="12" cy="12" r="9" fill="none" stroke="#2563EB" strokeWidth="1.6"></circle><path d="M8.5 12.4l2.4 2.4 4.6-5" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg><span>Vælg én prismodel, og følg op efter en fast rytme.</span></li></ul></div><h2 id="hvorfor" style={{ margin: "48px 0 0", fontSize: "clamp(24px, 2.4vw, 30px)", lineHeight: "1.2", fontWeight: "600", letterSpacing: "-0.025em", scrollMarginTop: "100px" }}>Hvorfor svartiden betyder noget</h2><p style={{ fontSize: "18px", lineHeight: "1.75", color: "#1E2E45", margin: "18px 0 0" }}>Når en kunde skal flytte, sender de tit en forespørgsel til flere flyttefirmaer samme aften. Det firma, der først kommer med en pris, der giver mening, har et forspring. Resten konkurrerer om en kunde, der måske allerede har besluttet sig.</p><p style={{ fontSize: "18px", lineHeight: "1.75", color: "#1E2E45", margin: "18px 0 0" }}>Det betyder ikke, at I skal gætte. Det betyder, at I skal have en fast måde at regne prisen på, så tilbuddet kan gå ud samme dag.</p><h2 id="det-skal-i-bruge" style={{ margin: "48px 0 0", fontSize: "clamp(24px, 2.4vw, 30px)", lineHeight: "1.2", fontWeight: "600", letterSpacing: "-0.025em", scrollMarginTop: "100px" }}>Det skal I bruge fra kunden</h2><p style={{ fontSize: "18px", lineHeight: "1.75", color: "#1E2E45", margin: "18px 0 0" }}>De fleste forsinkelser skyldes, at der mangler oplysninger. Spørg efter det hele i første omgang:</p><ul style={{ listStyle: "none", margin: "18px 0 0", padding: "0", display: "flex", flexDirection: "column", gap: "10px" }}><li style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "18px", lineHeight: "1.7", color: "#1E2E45" }}><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: "0", marginTop: "6px" }}><circle cx="12" cy="12" r="9" fill="none" stroke="#2563EB" strokeWidth="1.6"></circle><path d="M8.5 12.4l2.4 2.4 4.6-5" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg><span>Adresser, etager og om der er elevator</span></li><li style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "18px", lineHeight: "1.7", color: "#1E2E45" }}><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: "0", marginTop: "6px" }}><circle cx="12" cy="12" r="9" fill="none" stroke="#2563EB" strokeWidth="1.6"></circle><path d="M8.5 12.4l2.4 2.4 4.6-5" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg><span>Boligens størrelse eller antal rum</span></li><li style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "18px", lineHeight: "1.7", color: "#1E2E45" }}><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: "0", marginTop: "6px" }}><circle cx="12" cy="12" r="9" fill="none" stroke="#2563EB" strokeWidth="1.6"></circle><path d="M8.5 12.4l2.4 2.4 4.6-5" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg><span>Tunge eller særlige ting, fx klaver</span></li><li style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "18px", lineHeight: "1.7", color: "#1E2E45" }}><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: "0", marginTop: "6px" }}><circle cx="12" cy="12" r="9" fill="none" stroke="#2563EB" strokeWidth="1.6"></circle><path d="M8.5 12.4l2.4 2.4 4.6-5" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg><span>Ønsket dato, og om den kan flyttes</span></li><li style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "18px", lineHeight: "1.7", color: "#1E2E45" }}><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: "0", marginTop: "6px" }}><circle cx="12" cy="12" r="9" fill="none" stroke="#2563EB" strokeWidth="1.6"></circle><path d="M8.5 12.4l2.4 2.4 4.6-5" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg><span>Billeder eller video af boligen</span></li></ul><aside style={{ marginTop: "26px", display: "flex", gap: "14px", background: "#FFF8EC", border: "1px solid #FBE3BC", borderRadius: "14px", padding: "18px 20px" }}><span aria-hidden="true" style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#F59E0B", color: "#FFFFFF", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>!</span><div><div style={{ fontSize: "16px", fontWeight: "600" }}>Tip</div><div style={{ marginTop: "4px", fontSize: "16px", lineHeight: "1.6", color: "#5B4520" }}>Bed om billeder fra starten. Så undgår I overraskelser på flyttedagen og diskussioner om prisen bagefter.</div></div></aside><h2 id="prismodel" style={{ margin: "48px 0 0", fontSize: "clamp(24px, 2.4vw, 30px)", lineHeight: "1.2", fontWeight: "600", letterSpacing: "-0.025em", scrollMarginTop: "100px" }}>Vælg en prismodel, I kan stå inde for</h2><p style={{ fontSize: "18px", lineHeight: "1.75", color: "#1E2E45", margin: "18px 0 0" }}>Der er ikke én rigtig model. Det vigtigste er, at I bruger den samme hver gang, så I kan sende tilbud hurtigt og forklare prisen, hvis kunden spørger.</p><div style={{ marginTop: "22px", overflowX: "auto", border: "1px solid #E3E8EF", borderRadius: "14px" }}><table style={{ width: "100%", minWidth: "560px", borderCollapse: "collapse", fontSize: "15px", lineHeight: "1.5" }}><thead><tr style={{ background: "#F4F7FB" }}><th scope="col" style={{ textAlign: "left", padding: "12px 16px", fontWeight: "600", color: "#0B1F3B" }}>Prismodel</th><th scope="col" style={{ textAlign: "left", padding: "12px 16px", fontWeight: "600", color: "#0B1F3B" }}>Passer til</th><th scope="col" style={{ textAlign: "left", padding: "12px 16px", fontWeight: "600", color: "#0B1F3B" }}>Pas på</th></tr></thead><tbody><tr style={{ borderTop: "1px solid #E3E8EF" }}><th scope="row" style={{ textAlign: "left", padding: "12px 16px", fontWeight: "600" }}>Timepris</th><td style={{ padding: "12px 16px", color: "#4A5B73" }}>Flytninger, hvor tiden er svær at forudsige</td><td style={{ padding: "12px 16px", color: "#4A5B73" }}>Kunden kan blive overrasket, hvis dagen trækker ud</td></tr><tr style={{ borderTop: "1px solid #E3E8EF" }}><th scope="row" style={{ textAlign: "left", padding: "12px 16px", fontWeight: "600" }}>Kvadratmeter</th><td style={{ padding: "12px 16px", color: "#4A5B73" }}>Private flytninger af almindelige boliger</td><td style={{ padding: "12px 16px", color: "#4A5B73" }}>Kældre, lofter og tunge ting skal med i prisen</td></tr><tr style={{ borderTop: "1px solid #E3E8EF" }}><th scope="row" style={{ textAlign: "left", padding: "12px 16px", fontWeight: "600" }}>Faste pakker</th><td style={{ padding: "12px 16px", color: "#4A5B73" }}>Standardflytninger og små lejligheder</td><td style={{ padding: "12px 16px", color: "#4A5B73" }}>Pakkerne skal være tydelige om, hvad der er med</td></tr><tr style={{ borderTop: "1px solid #E3E8EF" }}><th scope="row" style={{ textAlign: "left", padding: "12px 16px", fontWeight: "600" }}>Manuel vurdering</th><td style={{ padding: "12px 16px", color: "#4A5B73" }}>Erhverv og specielle opgaver</td><td style={{ padding: "12px 16px", color: "#4A5B73" }}>Det tager længere tid at sende tilbuddet</td></tr></tbody></table></div><figure style={{ margin: "32px 0 0" }}><div aria-hidden="true" style={{ aspectRatio: "16 / 9", border: "2px dashed #C9D3E0", borderRadius: "16px", background: "#F7F9FC", display: "flex", alignItems: "center", justifyContent: "center", color: "#6B7A90", fontSize: "15px" }}>[Billede eller skærmbillede]</div><figcaption style={{ marginTop: "10px", fontSize: "14px", color: "#6B7A90" }}>Billedtekst: beskriv billedet kort. Den tekst bruges også som alt-tekst.</figcaption></figure><div style={{ marginTop: "36px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "20px 28px", padding: "clamp(22px, 3vw, 32px)", borderRadius: "20px", color: "#FFFFFF", background: "radial-gradient(ellipse 85% 70% at 50% 35%, #10284A 0%, #0A1A33 45%, #060F1F 100%)" }}><div style={{ flex: "1 1 300px", minWidth: "0" }}><div style={{ fontSize: "22px", fontWeight: "600", letterSpacing: "-0.02em", lineHeight: "1.25" }}>Movena regner prisen ud <span style={{ background: "linear-gradient(90deg, #4F8FF7 0%, #7CC0F5 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent" }}>fra kundens svar</span></div><div style={{ marginTop: "8px", fontSize: "16px", lineHeight: "1.55", color: "#B7C4D8" }}>Prisformularen på jeres hjemmeside giver kunden et overslag med det samme.</div></div><div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}><a data-lift="" href="/da/vind-flere-flytninger" style={{ display: "inline-flex", alignItems: "center", height: "48px", padding: "0 18px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.28)", boxSizing: "border-box", color: "#FFFFFF", fontSize: "15px", fontWeight: "600", textDecoration: "none" }}>Se hvordan</a><a data-lift="" href="/da/book-demo" style={{ display: "inline-flex", alignItems: "center", height: "48px", padding: "0 18px", borderRadius: "8px", background: "#FFFFFF", color: "#0B1F3B", fontSize: "15px", fontWeight: "600", textDecoration: "none" }}>Book en demo</a></div></div><h2 id="opfoelgning" style={{ margin: "48px 0 0", fontSize: "clamp(24px, 2.4vw, 30px)", lineHeight: "1.2", fontWeight: "600", letterSpacing: "-0.025em", scrollMarginTop: "100px" }}>Følg op uden at glemme det</h2><p style={{ fontSize: "18px", lineHeight: "1.75", color: "#1E2E45", margin: "18px 0 0" }}>Mange tilbud bliver aldrig besvaret. Det er sjældent, fordi kunden har sagt nej, men fordi ingen har fulgt op. En fast rytme hjælper:</p><ol style={{ margin: "18px 0 0", paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "10px" }}><li style={{ fontSize: "18px", lineHeight: "1.7", color: "#1E2E45", paddingLeft: "6px" }}>Send tilbuddet samme dag, som forespørgslen kommer ind.</li><li style={{ fontSize: "18px", lineHeight: "1.7", color: "#1E2E45", paddingLeft: "6px" }}>Følg op med et opkald eller en sms efter to dage.</li><li style={{ fontSize: "18px", lineHeight: "1.7", color: "#1E2E45", paddingLeft: "6px" }}>Send en sidste påmindelse, før datoen bliver optaget.</li></ol><p style={{ fontSize: "18px", lineHeight: "1.75", color: "#1E2E45", margin: "18px 0 0" }}>Kan I automatisere de to sidste trin, bliver det gjort hver gang, også i de travle uger. Læs mere om <a href="/da/vind-flere-flytninger" style={{ color: "#2563EB", fontWeight: "600" }}>automatiske mails og sms i Movena</a>.</p><h2 id="faq" style={{ margin: "48px 0 0", fontSize: "clamp(24px, 2.4vw, 30px)", lineHeight: "1.2", fontWeight: "600", letterSpacing: "-0.025em", scrollMarginTop: "100px" }}>Ofte stillede spørgsmål</h2><div style={{ marginTop: "12px", borderTop: "1px solid #E3E8EF" }}><div style={{ borderBottom: "1px solid #E3E8EF" }}><h3 style={{ margin: "0" }}><button type="button" aria-expanded={V.bf0exp} aria-controls="bfaq-0" onClick={V.bf0toggle} style={{ width: "100%", minHeight: "60px", padding: "16px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", background: "none", border: "0", textAlign: "left", fontFamily: "inherit", fontSize: "18px", fontWeight: "600", color: "#0B1F3B", cursor: "pointer" }}><span>Skal prisen stå i tilbuddet med det samme?</span><span aria-hidden="true" style={{ flexShrink: "0", width: "24px", textAlign: "center", fontSize: "24px", fontWeight: "500", color: "#2563EB" }}>{V.bf0sign}</span></button></h3>{V.bf0open ? (<><p id="bfaq-0" style={{ margin: "0", padding: "0 40px 20px 0", fontSize: "17px", lineHeight: "1.65", color: "#4A5B73" }}>Ja, så vidt muligt. Et overslag med et prisspænd er bedre end intet, og I kan justere, når I har set boligen.</p></>) : null}</div><div style={{ borderBottom: "1px solid #E3E8EF" }}><h3 style={{ margin: "0" }}><button type="button" aria-expanded={V.bf1exp} aria-controls="bfaq-1" onClick={V.bf1toggle} style={{ width: "100%", minHeight: "60px", padding: "16px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", background: "none", border: "0", textAlign: "left", fontFamily: "inherit", fontSize: "18px", fontWeight: "600", color: "#0B1F3B", cursor: "pointer" }}><span>Hvor hurtigt bør vi svare på en forespørgsel?</span><span aria-hidden="true" style={{ flexShrink: "0", width: "24px", textAlign: "center", fontSize: "24px", fontWeight: "500", color: "#2563EB" }}>{V.bf1sign}</span></button></h3>{V.bf1open ? (<><p id="bfaq-1" style={{ margin: "0", padding: "0 40px 20px 0", fontSize: "17px", lineHeight: "1.65", color: "#4A5B73" }}>Så hurtigt som muligt, gerne samme dag. Kunden spørger ofte flere firmaer på én gang.</p></>) : null}</div><div style={{ borderBottom: "1px solid #E3E8EF" }}><h3 style={{ margin: "0" }}><button type="button" aria-expanded={V.bf2exp} aria-controls="bfaq-2" onClick={V.bf2toggle} style={{ width: "100%", minHeight: "60px", padding: "16px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", background: "none", border: "0", textAlign: "left", fontFamily: "inherit", fontSize: "18px", fontWeight: "600", color: "#0B1F3B", cursor: "pointer" }}><span>Hvad gør vi, hvis prisen ændrer sig på dagen?</span><span aria-hidden="true" style={{ flexShrink: "0", width: "24px", textAlign: "center", fontSize: "24px", fontWeight: "500", color: "#2563EB" }}>{V.bf2sign}</span></button></h3>{V.bf2open ? (<><p id="bfaq-2" style={{ margin: "0", padding: "0 40px 20px 0", fontSize: "17px", lineHeight: "1.65", color: "#4A5B73" }}>Aftal på forhånd, hvad der udløser en ny pris, og skriv det i tilbuddet. Så er der ingen overraskelser.</p></>) : null}</div></div><div style={{ marginTop: "48px", display: "flex", gap: "16px", alignItems: "flex-start", padding: "22px", border: "1px solid #E3E8EF", borderRadius: "18px", background: "#FFFFFF" }}><span style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#E6EDFC", color: "#1D4ED8", fontSize: "16px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>VL</span><div><div style={{ fontSize: "13px", color: "#6B7A90" }}>Skrevet af</div><div style={{ fontSize: "18px", fontWeight: "600" }}>Villads Laun</div><div style={{ marginTop: "6px", fontSize: "16px", lineHeight: "1.6", color: "#4A5B73" }}>Står for salg og marketing hos Movena og taler løbende med danske flyttefirmaer om, hvordan de arbejder.</div><a href="mailto:vl@movena.io" style={{ display: "inline-block", marginTop: "8px", fontSize: "15px", fontWeight: "600", color: "#2563EB" }}>vl@movena.io</a></div></div></article>
</div>
</section>

<section style={{ background: "radial-gradient(circle at 10% 15%, rgba(59, 130, 246, 0.14) 0%, rgba(59, 130, 246, 0) 34%), radial-gradient(circle at 92% 85%, rgba(56, 163, 241, 0.16) 0%, rgba(56, 163, 241, 0) 38%), radial-gradient(rgba(11, 31, 59, 0.07) 1px, rgba(11, 31, 59, 0) 1.4px) 0 0 / 22px 22px, #F4F7FB", padding: "clamp(56px, 6vw, 88px) 0" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 64px)", boxSizing: "border-box", width: "100%" }}>
<h2 style={{ margin: "0", fontSize: "clamp(24px, 2.4vw, 32px)", fontWeight: "600", letterSpacing: "-0.02em" }}>Læs også</h2><div data-stagger="" style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "40px 28px" }}><a data-card="" href="#" style={{ display: "flex", flexDirection: "column", gap: "14px", textDecoration: "none", color: "#0B1F3B", minWidth: "0" }}><div aria-hidden="true" style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: "14px", overflow: "hidden", background: "radial-gradient(circle at 78% 22%, #4F8FF755 0%, #4F8FF700 45%), radial-gradient(rgba(255, 255, 255, 0.10) 1px, rgba(255, 255, 255, 0) 1.4px) 0 0 / 18px 18px, linear-gradient(160deg, #10284A 0%, #060F1F 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="64" height="64" viewBox="0 0 24 24"><defs><linearGradient id="bcg-76017777" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4F8FF7"></stop><stop offset="1" stopColor="#FFFFFF"></stop></linearGradient></defs><g fill="none" stroke="url(#bcg-76017777)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><path d="M14 3v5h5"></path></g></svg><span style={{ position: "absolute", left: "12px", top: "12px", display: "inline-flex", alignItems: "center", gap: "6px", height: "26px", padding: "0 10px", borderRadius: "13px", background: "rgba(255, 255, 255, 0.10)", border: "1px solid rgba(255, 255, 255, 0.16)", color: "#FFFFFF", fontSize: "12px", fontWeight: "600" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4F8FF7" }}></span>Tilbud og salg</span></div><span style={{ fontSize: "20px", fontWeight: "600", letterSpacing: "-0.02em", lineHeight: "1.25" }}>Opfølgning på tilbud: hvornår og hvordan</span><span style={{ fontSize: "15px", lineHeight: "1.5", color: "#4A5B73" }}>Mange tilbud bliver aldrig besvaret. En fast rytme for opfølgning gør forskellen.</span><div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#4A5B73" }}><span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#E6EDFC", color: "#1D4ED8", fontSize: "11px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>VL</span><span><span style={{ fontWeight: "600", color: "#0B1F3B" }}>Villads Laun</span> · 7. aug. 2026 · 5 min.</span></div></a><a data-card="" href="#" style={{ display: "flex", flexDirection: "column", gap: "14px", textDecoration: "none", color: "#0B1F3B", minWidth: "0" }}><div aria-hidden="true" style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: "14px", overflow: "hidden", background: "radial-gradient(circle at 78% 22%, #4F8FF755 0%, #4F8FF700 45%), radial-gradient(rgba(255, 255, 255, 0.10) 1px, rgba(255, 255, 255, 0) 1.4px) 0 0 / 18px 18px, linear-gradient(160deg, #10284A 0%, #060F1F 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="64" height="64" viewBox="0 0 24 24"><defs><linearGradient id="bcg-76017777" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4F8FF7"></stop><stop offset="1" stopColor="#FFFFFF"></stop></linearGradient></defs><g fill="none" stroke="url(#bcg-76017777)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><path d="M14 3v5h5"></path></g></svg><span style={{ position: "absolute", left: "12px", top: "12px", display: "inline-flex", alignItems: "center", gap: "6px", height: "26px", padding: "0 10px", borderRadius: "13px", background: "rgba(255, 255, 255, 0.10)", border: "1px solid rgba(255, 255, 255, 0.16)", color: "#FFFFFF", fontSize: "12px", fontWeight: "600" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4F8FF7" }}></span>Tilbud og salg</span></div><span style={{ fontSize: "20px", fontWeight: "600", letterSpacing: "-0.02em", lineHeight: "1.25" }}>Hvad koster en flytning? Sådan sætter I prisen</span><span style={{ fontSize: "15px", lineHeight: "1.5", color: "#4A5B73" }}>Timepris, kvadratmeter eller faste pakker. Fordele og faldgruber ved hver model.</span><div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#4A5B73" }}><span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#E6EDFC", color: "#1D4ED8", fontSize: "11px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>SO</span><span><span style={{ fontWeight: "600", color: "#0B1F3B" }}>Samuel Odegaard</span> · 11. sep. 2026 · 7 min.</span></div></a><a data-card="" href="#" style={{ display: "flex", flexDirection: "column", gap: "14px", textDecoration: "none", color: "#0B1F3B", minWidth: "0" }}><div aria-hidden="true" style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: "14px", overflow: "hidden", background: "radial-gradient(circle at 78% 22%, #F59E0B55 0%, #F59E0B00 45%), radial-gradient(rgba(255, 255, 255, 0.10) 1px, rgba(255, 255, 255, 0) 1.4px) 0 0 / 18px 18px, linear-gradient(160deg, #10284A 0%, #060F1F 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="64" height="64" viewBox="0 0 24 24"><defs><linearGradient id="bcg-44501988" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F59E0B"></stop><stop offset="1" stopColor="#FFFFFF"></stop></linearGradient></defs><g fill="none" stroke="url(#bcg-44501988)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"></path><path d="M9 8h6M9 12h6"></path></g></svg><span style={{ position: "absolute", left: "12px", top: "12px", display: "inline-flex", alignItems: "center", gap: "6px", height: "26px", padding: "0 10px", borderRadius: "13px", background: "rgba(255, 255, 255, 0.10)", border: "1px solid rgba(255, 255, 255, 0.16)", color: "#FFFFFF", fontSize: "12px", fontWeight: "600" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#F59E0B" }}></span>Økonomi</span></div><span style={{ fontSize: "20px", fontWeight: "600", letterSpacing: "-0.02em", lineHeight: "1.25" }}>Opbevaring: få fakturaen ud hver måned</span><span style={{ fontSize: "15px", lineHeight: "1.5", color: "#4A5B73" }}>Kunder med ting på lager bliver let glemt. Sådan holder I styr på aftalerne.</span><div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#4A5B73" }}><span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#E6EDFC", color: "#1D4ED8", fontSize: "11px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>SO</span><span><span style={{ fontWeight: "600", color: "#0B1F3B" }}>Samuel Odegaard</span> · 21. aug. 2026 · 4 min.</span></div></a></div>
</div>
</section>

<DemoCTA />

<SiteFooter />




</div>
  )
}
