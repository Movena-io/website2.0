// @ts-nocheck -- generated file: the design's own JS is kept verbatim.
'use client'

// GENERATED from design-export/404-v5.dc.html by scripts/dc-to-tsx.mjs.
// Styles and numbers are the design's own. Hand edits below the marker only.
import { useState, useEffect } from 'react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import DemoCTA from '@/components/site/DemoCTA'

const DEMO_LOCALE = 'da'

export default function NotFoundDa() {
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

<section id="top" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 20%, rgba(59, 130, 246, 0.16) 0%, rgba(59, 130, 246, 0.05) 45%, rgba(255, 255, 255, 0) 75%), radial-gradient(circle at 10% 15%, rgba(59, 130, 246, 0.14) 0%, rgba(59, 130, 246, 0) 34%), radial-gradient(circle at 92% 85%, rgba(56, 163, 241, 0.16) 0%, rgba(56, 163, 241, 0) 38%), radial-gradient(rgba(11, 31, 59, 0.07) 1px, rgba(11, 31, 59, 0) 1.4px) 0 0 / 22px 22px, #F4F7FB", padding: "clamp(56px, 8vw, 120px) 0 clamp(64px, 8vw, 120px)" }}>
<div style={{ maxWidth: "880px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 64px)", boxSizing: "border-box", width: "100%", textAlign: "center" }}>
<div style={{ fontSize: "clamp(88px, 14vw, 180px)", lineHeight: "0.9", fontWeight: "700", letterSpacing: "-0.06em", background: "linear-gradient(90deg, #1D4ED8 0%, #3B82F6 55%, #38A3F1 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent" }}>404</div>
<h1 style={{ margin: "18px 0 0", fontSize: "clamp(30px, 3.6vw, 48px)", lineHeight: "1.1", fontWeight: "600", letterSpacing: "-0.035em" }}>Den side kunne vi ikke finde</h1>
<p style={{ margin: "14px auto 0", maxWidth: "34em", fontSize: "18px", lineHeight: "1.6", color: "#4A5B73" }}>Linket er måske forældet, eller siden er flyttet. Her er nogle gode steder at fortsætte.</p>
<div data-stagger="" style={{ marginTop: "36px", textAlign: "left", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: "12px" }}><a href="/da" data-lift="" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 18px", borderRadius: "16px", background: "#FFFFFF", border: "1px solid #E3E8EF", textDecoration: "none", color: "#0B1F3B", boxShadow: "0 16px 32px -24px rgba(11, 31, 59, 0.35)" }}><span aria-hidden="true" style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#E6EDFC", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect></svg></span><span style={{ minWidth: "0" }}><span style={{ display: "block", fontSize: "17px", fontWeight: "600" }}>Forsiden</span><span style={{ display: "block", fontSize: "14px", color: "#4A5B73" }}>Se, hvad Movena er</span></span></a><a href="/da/vind-flere-flytninger" data-lift="" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 18px", borderRadius: "16px", background: "#FFFFFF", border: "1px solid #E3E8EF", textDecoration: "none", color: "#0B1F3B", boxShadow: "0 16px 32px -24px rgba(11, 31, 59, 0.35)" }}><span aria-hidden="true" style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#E6EDFC", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"></rect><path d="M9 8h6M9 12h6"></path></svg></span><span style={{ minWidth: "0" }}><span style={{ display: "block", fontSize: "17px", fontWeight: "600" }}>Vind flere flytninger</span><span style={{ display: "block", fontSize: "14px", color: "#4A5B73" }}>Prisformular, leads og tilbud</span></span></a><a href="/da/hav-styr-paa-dagen" data-lift="" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 18px", borderRadius: "16px", background: "#FFFFFF", border: "1px solid #E3E8EF", textDecoration: "none", color: "#0B1F3B", boxShadow: "0 16px 32px -24px rgba(11, 31, 59, 0.35)" }}><span aria-hidden="true" style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#E6EDFC", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M3 10h18M8 3v4M16 3v4"></path></svg></span><span style={{ minWidth: "0" }}><span style={{ display: "block", fontSize: "17px", fontWeight: "600" }}>Hav styr på dagen</span><span style={{ display: "block", fontSize: "14px", color: "#4A5B73" }}>Overblik, kalender og crew</span></span></a><a href="/da/faa-alle-pengene-hjem" data-lift="" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 18px", borderRadius: "16px", background: "#FFFFFF", border: "1px solid #E3E8EF", textDecoration: "none", color: "#0B1F3B", boxShadow: "0 16px 32px -24px rgba(11, 31, 59, 0.35)" }}><span aria-hidden="true" style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#E6EDFC", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"></path><path d="M9 8h6M9 12h6"></path></svg></span><span style={{ minWidth: "0" }}><span style={{ display: "block", fontSize: "17px", fontWeight: "600" }}>Få alle pengene hjem</span><span style={{ display: "block", fontSize: "14px", color: "#4A5B73" }}>Fakturering og opbevaring</span></span></a><a href="/da/blog" data-lift="" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 18px", borderRadius: "16px", background: "#FFFFFF", border: "1px solid #E3E8EF", textDecoration: "none", color: "#0B1F3B", boxShadow: "0 16px 32px -24px rgba(11, 31, 59, 0.35)" }}><span aria-hidden="true" style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#E6EDFC", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><path d="M14 3v5h5"></path></svg></span><span style={{ minWidth: "0" }}><span style={{ display: "block", fontSize: "17px", fontWeight: "600" }}>Blog</span><span style={{ display: "block", fontSize: "14px", color: "#4A5B73" }}>Viden til flyttefirmaer</span></span></a><a href="/da/book-demo" data-lift="" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 18px", borderRadius: "16px", background: "#FFFFFF", border: "1px solid #E3E8EF", textDecoration: "none", color: "#0B1F3B", boxShadow: "0 16px 32px -24px rgba(11, 31, 59, 0.35)" }}><span aria-hidden="true" style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#E6EDFC", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"></path></svg></span><span style={{ minWidth: "0" }}><span style={{ display: "block", fontSize: "17px", fontWeight: "600" }}>Book en demo</span><span style={{ display: "block", fontSize: "14px", color: "#4A5B73" }}>Vi ringer jer op</span></span></a></div>
</div>
</section>

<SiteFooter />




</div>
  )
}
