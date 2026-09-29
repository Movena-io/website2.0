// @ts-nocheck -- generated file: the design's own JS is kept verbatim.
'use client'

// GENERATED from design-export/Blog-v5.dc.html by scripts/dc-to-tsx.mjs.
// Styles and numbers are the design's own. Hand edits below the marker only.
import { useState, useEffect } from 'react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import DemoCTA from '@/components/site/DemoCTA'
import { submitDemoLead } from '@/lib/demo-lead'

const DEMO_LOCALE = 'da'

export default function BlogIndexDa() {
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

    const bcat = s.bcat === undefined ? 0 : s.bcat;
    const bcats = ['Alle'].concat(['Tilbud og salg','Planlægning','Økonomi','Drift']);
    const pcats = ['Tilbud og salg','Tilbud og salg','Planlægning','Drift','Økonomi','Økonomi','Tilbud og salg'];
    const bv = {};
    for (let k = 0; k < bcats.length; k++) { const on = bcat === k; bv['bc' + k + 'pr'] = on ? 'true' : 'false'; bv['bc' + k + 'bg'] = on ? '#0B1F3B' : '#FFFFFF'; bv['bc' + k + 'fg'] = on ? '#FFFFFF' : '#0B1F3B'; bv['bc' + k + 'bd'] = on ? '#0B1F3B' : '#D6DEE8'; bv['pickBc' + k] = () => set({ bcat: k }); }
    for (let k = 0; k < pcats.length; k++) { bv['show' + k] = bcat === 0 || pcats[k] === bcats[bcat]; }

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
      ...bv,
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

<section id="top" style={{ background: "radial-gradient(ellipse 55% 55% at 72% 30%, rgba(59, 130, 246, 0.16) 0%, rgba(59, 130, 246, 0.05) 45%, rgba(255, 255, 255, 0) 75%), linear-gradient(180deg, #FFFFFF 70%, #F4F7FB 100%)", padding: "clamp(32px, 4vw, 56px) 0 clamp(40px, 5vw, 64px)" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 64px)", boxSizing: "border-box", width: "100%" }}>
<div style={{ fontSize: "14px", color: "#4A5B73" }}><a href="/da" style={{ color: "#4A5B73" }}>Forside</a> / Blog</div>
<h1 style={{ margin: "20px 0 0", fontSize: "clamp(40px, 4.8vw, 68px)", lineHeight: "1.03", fontWeight: "600", letterSpacing: "-0.045em" }}>Viden til <span style={{ background: "linear-gradient(90deg, #1D4ED8 0%, #3B82F6 55%, #38A3F1 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent" }}>flyttefirmaer</span></h1><p style={{ margin: "18px 0 0", maxWidth: "36em", fontSize: "clamp(18px, 1.5vw, 20px)", lineHeight: "1.55", color: "#4A5B73" }}>Praktiske råd om tilbud, planlægning og drift, skrevet af os, der bygger Movena sammen med flyttebranchen.</p><div role="group" aria-label="Kategorier" style={{ marginTop: "28px", display: "flex", flexWrap: "wrap", gap: "8px" }}><button type="button" aria-pressed={V.bc0pr} onClick={V.pickBc0} style={{ height: "40px", padding: "0 16px", borderRadius: "20px", border: `1px solid ${V.bc0bd}`, background: V.bc0bg, color: V.bc0fg, fontFamily: "inherit", fontSize: "14px", fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap" }}>Alle</button><button type="button" aria-pressed={V.bc1pr} onClick={V.pickBc1} style={{ height: "40px", padding: "0 16px", borderRadius: "20px", border: `1px solid ${V.bc1bd}`, background: V.bc1bg, color: V.bc1fg, fontFamily: "inherit", fontSize: "14px", fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap" }}>Tilbud og salg</button><button type="button" aria-pressed={V.bc2pr} onClick={V.pickBc2} style={{ height: "40px", padding: "0 16px", borderRadius: "20px", border: `1px solid ${V.bc2bd}`, background: V.bc2bg, color: V.bc2fg, fontFamily: "inherit", fontSize: "14px", fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap" }}>Planlægning</button><button type="button" aria-pressed={V.bc3pr} onClick={V.pickBc3} style={{ height: "40px", padding: "0 16px", borderRadius: "20px", border: `1px solid ${V.bc3bd}`, background: V.bc3bg, color: V.bc3fg, fontFamily: "inherit", fontSize: "14px", fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap" }}>Økonomi</button><button type="button" aria-pressed={V.bc4pr} onClick={V.pickBc4} style={{ height: "40px", padding: "0 16px", borderRadius: "20px", border: `1px solid ${V.bc4bd}`, background: V.bc4bg, color: V.bc4fg, fontFamily: "inherit", fontSize: "14px", fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap" }}>Drift</button></div>
<div style={{ marginTop: "clamp(28px, 3vw, 40px)" }}><a data-card="" href="/da/blog" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "28px clamp(28px, 4vw, 56px)", textDecoration: "none", color: "#0B1F3B", background: "#FFFFFF", border: "1px solid #E3E8EF", borderRadius: "24px", padding: "clamp(14px, 2vw, 20px)", boxShadow: "0 30px 60px -40px rgba(11, 31, 59, 0.45)" }}><div style={{ flex: "1 1 420px", minWidth: "0" }}><div aria-hidden="true" style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: "20px", overflow: "hidden", background: "radial-gradient(circle at 78% 22%, #4F8FF755 0%, #4F8FF700 45%), radial-gradient(rgba(255, 255, 255, 0.10) 1px, rgba(255, 255, 255, 0) 1.4px) 0 0 / 18px 18px, linear-gradient(160deg, #10284A 0%, #060F1F 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="96" height="96" viewBox="0 0 24 24"><defs><linearGradient id="bcg-53513450" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4F8FF7"></stop><stop offset="1" stopColor="#FFFFFF"></stop></linearGradient></defs><g fill="none" stroke="url(#bcg-53513450)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><path d="M14 3v5h5"></path></g></svg><span style={{ position: "absolute", left: "18px", top: "18px", display: "inline-flex", alignItems: "center", gap: "6px", height: "26px", padding: "0 10px", borderRadius: "13px", background: "rgba(255, 255, 255, 0.10)", border: "1px solid rgba(255, 255, 255, 0.16)", color: "#FFFFFF", fontSize: "12px", fontWeight: "600" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4F8FF7" }}></span>Tilbud og salg</span></div></div><div style={{ flex: "1 1 340px", minWidth: "0", padding: "8px clamp(4px, 1.5vw, 16px)" }}><div style={{ fontSize: "13px", fontWeight: "600", color: "#1D4ED8" }}>Seneste artikel</div><div style={{ marginTop: "10px", fontSize: "clamp(26px, 2.8vw, 38px)", lineHeight: "1.12", fontWeight: "600", letterSpacing: "-0.03em" }}>Sådan sender I tilbud samme dag</div><div style={{ marginTop: "12px", fontSize: "17px", lineHeight: "1.55", color: "#4A5B73" }}>Hvad I skal bruge fra kunden, hvilken prismodel der passer, og hvordan I følger op uden at glemme det.</div><div style={{ marginTop: "20px" }}><div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#4A5B73" }}><span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#E6EDFC", color: "#1D4ED8", fontSize: "11px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>VL</span><span><span style={{ fontWeight: "600", color: "#0B1F3B" }}>Villads Laun</span> · 18. sep. 2026 · 6 min.</span></div></div><div style={{ marginTop: "22px", fontSize: "15px", fontWeight: "600", color: "#2563EB" }}>Læs artiklen</div></div></a></div>
</div>
</section>

<section style={{ background: "#FFFFFF", padding: "clamp(40px, 5vw, 72px) 0 clamp(56px, 6vw, 96px)" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 64px)", boxSizing: "border-box", width: "100%" }}>
<h2 style={{ margin: "0", fontSize: "clamp(24px, 2.4vw, 32px)", fontWeight: "600", letterSpacing: "-0.02em" }}>Alle artikler</h2><div data-stagger="" style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "40px 28px" }}>{V.show1 ? (<><a data-card="" href="#" style={{ display: "flex", flexDirection: "column", gap: "14px", textDecoration: "none", color: "#0B1F3B", minWidth: "0" }}><div aria-hidden="true" style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: "14px", overflow: "hidden", background: "radial-gradient(circle at 78% 22%, #4F8FF755 0%, #4F8FF700 45%), radial-gradient(rgba(255, 255, 255, 0.10) 1px, rgba(255, 255, 255, 0) 1.4px) 0 0 / 18px 18px, linear-gradient(160deg, #10284A 0%, #060F1F 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="64" height="64" viewBox="0 0 24 24"><defs><linearGradient id="bcg-76017777" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4F8FF7"></stop><stop offset="1" stopColor="#FFFFFF"></stop></linearGradient></defs><g fill="none" stroke="url(#bcg-76017777)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><path d="M14 3v5h5"></path></g></svg><span style={{ position: "absolute", left: "12px", top: "12px", display: "inline-flex", alignItems: "center", gap: "6px", height: "26px", padding: "0 10px", borderRadius: "13px", background: "rgba(255, 255, 255, 0.10)", border: "1px solid rgba(255, 255, 255, 0.16)", color: "#FFFFFF", fontSize: "12px", fontWeight: "600" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4F8FF7" }}></span>Tilbud og salg</span></div><span style={{ fontSize: "20px", fontWeight: "600", letterSpacing: "-0.02em", lineHeight: "1.25" }}>Hvad koster en flytning? Sådan sætter I prisen</span><span style={{ fontSize: "15px", lineHeight: "1.5", color: "#4A5B73" }}>Timepris, kvadratmeter eller faste pakker. Fordele og faldgruber ved hver model.</span><div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#4A5B73" }}><span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#E6EDFC", color: "#1D4ED8", fontSize: "11px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>SO</span><span><span style={{ fontWeight: "600", color: "#0B1F3B" }}>Samuel Odegaard</span> · 11. sep. 2026 · 7 min.</span></div></a></>) : null}{V.show2 ? (<><a data-card="" href="#" style={{ display: "flex", flexDirection: "column", gap: "14px", textDecoration: "none", color: "#0B1F3B", minWidth: "0" }}><div aria-hidden="true" style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: "14px", overflow: "hidden", background: "radial-gradient(circle at 78% 22%, #22C55E55 0%, #22C55E00 45%), radial-gradient(rgba(255, 255, 255, 0.10) 1px, rgba(255, 255, 255, 0) 1.4px) 0 0 / 18px 18px, linear-gradient(160deg, #10284A 0%, #060F1F 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="64" height="64" viewBox="0 0 24 24"><defs><linearGradient id="bcg-43614028" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#22C55E"></stop><stop offset="1" stopColor="#FFFFFF"></stop></linearGradient></defs><g fill="none" stroke="url(#bcg-43614028)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M3 10h18M8 3v4M16 3v4"></path></g></svg><span style={{ position: "absolute", left: "12px", top: "12px", display: "inline-flex", alignItems: "center", gap: "6px", height: "26px", padding: "0 10px", borderRadius: "13px", background: "rgba(255, 255, 255, 0.10)", border: "1px solid rgba(255, 255, 255, 0.16)", color: "#FFFFFF", fontSize: "12px", fontWeight: "600" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22C55E" }}></span>Planlægning</span></div><span style={{ fontSize: "20px", fontWeight: "600", letterSpacing: "-0.02em", lineHeight: "1.25" }}>Planlæg ugen: hold, biler og besigtigelser</span><span style={{ fontSize: "15px", lineHeight: "1.5", color: "#4A5B73" }}>En enkel rutine til mandag morgen, så ugen hænger sammen, før telefonen ringer.</span><div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#4A5B73" }}><span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#E6EDFC", color: "#1D4ED8", fontSize: "11px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>VCL</span><span><span style={{ fontWeight: "600", color: "#0B1F3B" }}>Valdemar Lorentzen</span> · 4. sep. 2026 · 5 min.</span></div></a></>) : null}{V.show3 ? (<><a data-card="" href="#" style={{ display: "flex", flexDirection: "column", gap: "14px", textDecoration: "none", color: "#0B1F3B", minWidth: "0" }}><div aria-hidden="true" style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: "14px", overflow: "hidden", background: "radial-gradient(circle at 78% 22%, #38BDF855 0%, #38BDF800 45%), radial-gradient(rgba(255, 255, 255, 0.10) 1px, rgba(255, 255, 255, 0) 1.4px) 0 0 / 18px 18px, linear-gradient(160deg, #10284A 0%, #060F1F 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="64" height="64" viewBox="0 0 24 24"><defs><linearGradient id="bcg-7282857" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#38BDF8"></stop><stop offset="1" stopColor="#FFFFFF"></stop></linearGradient></defs><g fill="none" stroke="url(#bcg-7282857)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"></path><circle cx="7" cy="18" r="1.8"></circle><circle cx="17" cy="18" r="1.8"></circle></g></svg><span style={{ position: "absolute", left: "12px", top: "12px", display: "inline-flex", alignItems: "center", gap: "6px", height: "26px", padding: "0 10px", borderRadius: "13px", background: "rgba(255, 255, 255, 0.10)", border: "1px solid rgba(255, 255, 255, 0.16)", color: "#FFFFFF", fontSize: "12px", fontWeight: "600" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#38BDF8" }}></span>Drift</span></div><span style={{ fontSize: "20px", fontWeight: "600", letterSpacing: "-0.02em", lineHeight: "1.25" }}>Skadesager: dokumentation, der holder</span><span style={{ fontSize: "15px", lineHeight: "1.5", color: "#4A5B73" }}>Billeder før og efter, noter fra holdet og kundens bekræftelse. Sådan står I stærkt.</span><div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#4A5B73" }}><span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#E6EDFC", color: "#1D4ED8", fontSize: "11px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>VL</span><span><span style={{ fontWeight: "600", color: "#0B1F3B" }}>Villads Laun</span> · 28. aug. 2026 · 6 min.</span></div></a></>) : null}{V.show4 ? (<><a data-card="" href="#" style={{ display: "flex", flexDirection: "column", gap: "14px", textDecoration: "none", color: "#0B1F3B", minWidth: "0" }}><div aria-hidden="true" style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: "14px", overflow: "hidden", background: "radial-gradient(circle at 78% 22%, #F59E0B55 0%, #F59E0B00 45%), radial-gradient(rgba(255, 255, 255, 0.10) 1px, rgba(255, 255, 255, 0) 1.4px) 0 0 / 18px 18px, linear-gradient(160deg, #10284A 0%, #060F1F 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="64" height="64" viewBox="0 0 24 24"><defs><linearGradient id="bcg-44501988" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F59E0B"></stop><stop offset="1" stopColor="#FFFFFF"></stop></linearGradient></defs><g fill="none" stroke="url(#bcg-44501988)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"></path><path d="M9 8h6M9 12h6"></path></g></svg><span style={{ position: "absolute", left: "12px", top: "12px", display: "inline-flex", alignItems: "center", gap: "6px", height: "26px", padding: "0 10px", borderRadius: "13px", background: "rgba(255, 255, 255, 0.10)", border: "1px solid rgba(255, 255, 255, 0.16)", color: "#FFFFFF", fontSize: "12px", fontWeight: "600" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#F59E0B" }}></span>Økonomi</span></div><span style={{ fontSize: "20px", fontWeight: "600", letterSpacing: "-0.02em", lineHeight: "1.25" }}>Opbevaring: få fakturaen ud hver måned</span><span style={{ fontSize: "15px", lineHeight: "1.5", color: "#4A5B73" }}>Kunder med ting på lager bliver let glemt. Sådan holder I styr på aftalerne.</span><div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#4A5B73" }}><span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#E6EDFC", color: "#1D4ED8", fontSize: "11px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>SO</span><span><span style={{ fontWeight: "600", color: "#0B1F3B" }}>Samuel Odegaard</span> · 21. aug. 2026 · 4 min.</span></div></a></>) : null}{V.show5 ? (<><a data-card="" href="#" style={{ display: "flex", flexDirection: "column", gap: "14px", textDecoration: "none", color: "#0B1F3B", minWidth: "0" }}><div aria-hidden="true" style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: "14px", overflow: "hidden", background: "radial-gradient(circle at 78% 22%, #F59E0B55 0%, #F59E0B00 45%), radial-gradient(rgba(255, 255, 255, 0.10) 1px, rgba(255, 255, 255, 0) 1.4px) 0 0 / 18px 18px, linear-gradient(160deg, #10284A 0%, #060F1F 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="64" height="64" viewBox="0 0 24 24"><defs><linearGradient id="bcg-44501988" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F59E0B"></stop><stop offset="1" stopColor="#FFFFFF"></stop></linearGradient></defs><g fill="none" stroke="url(#bcg-44501988)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"></path><path d="M9 8h6M9 12h6"></path></g></svg><span style={{ position: "absolute", left: "12px", top: "12px", display: "inline-flex", alignItems: "center", gap: "6px", height: "26px", padding: "0 10px", borderRadius: "13px", background: "rgba(255, 255, 255, 0.10)", border: "1px solid rgba(255, 255, 255, 0.16)", color: "#FFFFFF", fontSize: "12px", fontWeight: "600" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#F59E0B" }}></span>Økonomi</span></div><span style={{ fontSize: "20px", fontWeight: "600", letterSpacing: "-0.02em", lineHeight: "1.25" }}>Timesedler uden sms'er</span><span style={{ fontSize: "15px", lineHeight: "1.5", color: "#4A5B73" }}>Fra sedler og beskeder til timer, der er klar til lønnen, når ugen er slut.</span><div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#4A5B73" }}><span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#E6EDFC", color: "#1D4ED8", fontSize: "11px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>VCL</span><span><span style={{ fontWeight: "600", color: "#0B1F3B" }}>Valdemar Lorentzen</span> · 14. aug. 2026 · 5 min.</span></div></a></>) : null}{V.show6 ? (<><a data-card="" href="#" style={{ display: "flex", flexDirection: "column", gap: "14px", textDecoration: "none", color: "#0B1F3B", minWidth: "0" }}><div aria-hidden="true" style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: "14px", overflow: "hidden", background: "radial-gradient(circle at 78% 22%, #4F8FF755 0%, #4F8FF700 45%), radial-gradient(rgba(255, 255, 255, 0.10) 1px, rgba(255, 255, 255, 0) 1.4px) 0 0 / 18px 18px, linear-gradient(160deg, #10284A 0%, #060F1F 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="64" height="64" viewBox="0 0 24 24"><defs><linearGradient id="bcg-76017777" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4F8FF7"></stop><stop offset="1" stopColor="#FFFFFF"></stop></linearGradient></defs><g fill="none" stroke="url(#bcg-76017777)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><path d="M14 3v5h5"></path></g></svg><span style={{ position: "absolute", left: "12px", top: "12px", display: "inline-flex", alignItems: "center", gap: "6px", height: "26px", padding: "0 10px", borderRadius: "13px", background: "rgba(255, 255, 255, 0.10)", border: "1px solid rgba(255, 255, 255, 0.16)", color: "#FFFFFF", fontSize: "12px", fontWeight: "600" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4F8FF7" }}></span>Tilbud og salg</span></div><span style={{ fontSize: "20px", fontWeight: "600", letterSpacing: "-0.02em", lineHeight: "1.25" }}>Opfølgning på tilbud: hvornår og hvordan</span><span style={{ fontSize: "15px", lineHeight: "1.5", color: "#4A5B73" }}>Mange tilbud bliver aldrig besvaret. En fast rytme for opfølgning gør forskellen.</span><div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#4A5B73" }}><span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#E6EDFC", color: "#1D4ED8", fontSize: "11px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}>VL</span><span><span style={{ fontWeight: "600", color: "#0B1F3B" }}>Villads Laun</span> · 7. aug. 2026 · 5 min.</span></div></a></>) : null}</div>
</div>
</section>

<DemoCTA />

<SiteFooter />




</div>
  )
}
