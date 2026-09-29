// @ts-nocheck -- generated file: the design's own JS is kept verbatim.
'use client'

// GENERATED from design-export/EN-About.dc.html by scripts/dc-to-tsx.mjs.
// Styles and numbers are the design's own. Hand edits below the marker only.
import { useState, useEffect } from 'react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import DemoCTA from '@/components/site/DemoCTA'

const DEMO_LOCALE = 'en'

export default function OmOsEn() {
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
    const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
      priceText: 'DKK ' + fmt(Math.floor(price / 500) * 500) + '–' + fmt(Math.floor(price / 500) * 500 + 500),
      crewText: c.men + ' movers, about ' + c.hours + ' hours',
      showForm: !sent,
      sent: sent,
      send: () => set({ sent: true }),
      reset: () => set({ sent: false }),
      caption: sent
        ? 'The request is now in Movena with the price, ready to be approved.'
        : 'The price form, as your customers see it on your website. Try it.',
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
      totalText: 'DKK ' + fmt(office * 250 + crew * 99),
      jobLabel: started ? 'Stop' : 'Start job',
      jobBg: started ? '#0B1F3B' : '#1D4ED8',
      jobStatus: started ? 'Started at 08:02' : 'Tap when you arrive',
      toggleJob: () => set({ started: !started })
    };
  })()
  const V = vals as any

  return (
<div data-dc="" style={{ width: "100%", minHeight: V.pageMinH, zoom: V.pageZoom, display: "flex", flexDirection: "column", background: "#FFFFFF", color: "#0B1F3B", fontFamily: "Manrope, 'Helvetica Neue', Helvetica, Arial, sans-serif", fontSize: "17px", lineHeight: "1.55", WebkitFontSmoothing: "antialiased" }}>

<SiteHeader />

<section id="top" style={{ background: "radial-gradient(ellipse 55% 55% at 72% 30%, rgba(59, 130, 246, 0.18) 0%, rgba(59, 130, 246, 0.06) 45%, rgba(255, 255, 255, 0) 75%), linear-gradient(180deg, #FFFFFF 75%, #F1F5FA 100%)", padding: "clamp(32px, 4vw, 56px) 0 clamp(56px, 6vw, 96px)" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 64px)", boxSizing: "border-box", width: "100%" }}>
<div style={{ fontSize: "14px", color: "#4A5B73" }}><a href="/en" style={{ color: "#4A5B73" }}>Home</a> / About</div>
<div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: "32px clamp(40px, 5vw, 80px)" }}><h1 style={{ flex: "1 1 520px", minWidth: "0", margin: "0", fontSize: "clamp(40px, 4.8vw, 68px)", lineHeight: "1.03", fontWeight: "600", letterSpacing: "-0.045em", maxWidth: "14ch" }}>Built together <span style={{ background: "linear-gradient(90deg, #1D4ED8 0%, #3B82F6 55%, #38A3F1 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent" }}>with the moving industry</span></h1><p style={{ flex: "1 1 360px", minWidth: "0", maxWidth: "480px", margin: "0", fontSize: "clamp(18px, 1.5vw, 20px)", lineHeight: "1.55", color: "#4A5B73" }}>We started Movena when we saw how much time moving companies spend on manual work, and that nobody had built anything for them.</p></div>
</div>
</section>

<section style={{ background: "radial-gradient(circle at 10% 15%, rgba(59, 130, 246, 0.14) 0%, rgba(59, 130, 246, 0) 34%), radial-gradient(circle at 92% 85%, rgba(56, 163, 241, 0.16) 0%, rgba(56, 163, 241, 0) 38%), radial-gradient(rgba(11, 31, 59, 0.07) 1px, rgba(11, 31, 59, 0) 1.4px) 0 0 / 22px 22px, #F4F7FB", padding: "clamp(56px, 6vw, 96px) 0" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 64px)", boxSizing: "border-box", width: "100%", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "40px clamp(40px, 6vw, 96px)" }}>
<div style={{ flex: "1 1 380px", minWidth: "0", maxWidth: "520px" }}><h2 style={{ margin: "0", fontSize: "clamp(28px, 3vw, 42px)", lineHeight: "1.12", fontWeight: "600", letterSpacing: "-0.03em" }}>Not built for them. <span style={{ background: "linear-gradient(90deg, #1D4ED8 0%, #3B82F6 55%, #38A3F1 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent" }}>Built with them.</span></h2><p style={{ margin: "16px 0 0", fontSize: "17px", lineHeight: "1.6", color: "#4A5B73" }}>Before we built anything, we spent months talking to moving companies and seeing how they work. Every part of Movena is shaped by the people who use it, and that's still how we build it.</p><ul style={{ listStyle: "none", margin: "26px 0 0", padding: "24px 0 0", borderTop: "1px solid #E3E8EF", display: "flex", flexDirection: "column", gap: "14px", fontSize: "16px", lineHeight: "1.45", fontWeight: "500" }}><li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: "0", marginTop: "2px" }}><circle cx="12" cy="12" r="9" fill="none" stroke="#2563EB" strokeWidth="1.6"></circle><path d="M8.5 12.4l2.4 2.4 4.6-5" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg><span>Months of conversations before we wrote the system</span></li><li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: "0", marginTop: "2px" }}><circle cx="12" cy="12" r="9" fill="none" stroke="#2563EB" strokeWidth="1.6"></circle><path d="M8.5 12.4l2.4 2.4 4.6-5" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg><span>Built around the way a move actually runs</span></li><li style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: "0", marginTop: "2px" }}><circle cx="12" cy="12" r="9" fill="none" stroke="#2563EB" strokeWidth="1.6"></circle><path d="M8.5 12.4l2.4 2.4 4.6-5" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg><span>New features come from what the moving companies ask for</span></li></ul></div>
<figure style={{ flex: "1 1 380px", minWidth: "0", margin: "0", background: "#FFFFFF", borderRadius: "24px", padding: "clamp(28px, 4vw, 48px)", boxShadow: "0 0 0 1px rgba(11, 31, 59, 0.06), 0 32px 64px -32px rgba(11, 31, 59, 0.4)", borderTop: "4px solid #2563EB" }}><svg width="40" height="32" viewBox="0 0 40 32" aria-hidden="true"><path d="M0 32V19C0 8 6 1.5 16 0l2 4.5C12 6.5 9 10.5 9 16h7v16H0zm22 0V19c0-11 6-17.5 16-19l2 4.5c-6 2-9 6-9 11.5h7v16H22z" fill="#DCE6FB"></path></svg><blockquote style={{ margin: "16px 0 0", fontSize: "clamp(22px, 2.4vw, 30px)", lineHeight: "1.3", fontWeight: "600", letterSpacing: "-0.02em" }}>Nobody knows the industry better than the people in it. That's why we build Movena together with them.</blockquote><figcaption style={{ marginTop: "18px", fontSize: "15px", color: "#4A5B73" }}>Villads, Valdemar and Samuel, founders of Movena</figcaption></figure>
</div>
</section>

<section style={{ background: "radial-gradient(ellipse 85% 70% at 50% 35%, #10284A 0%, #0A1A33 45%, #060F1F 100%)", color: "#FFFFFF", padding: "clamp(56px, 6vw, 96px) 0" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 64px)", boxSizing: "border-box", width: "100%" }}>
<h2 style={{ margin: "0", fontSize: "clamp(28px, 3vw, 42px)", lineHeight: "1.12", fontWeight: "600", letterSpacing: "-0.03em" }}>There are three of us, and we <span style={{ background: "linear-gradient(90deg, #4F8FF7 0%, #7CC0F5 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent" }}>answer the phone ourselves</span></h2><p style={{ margin: "14px 0 0", fontSize: "17px", lineHeight: "1.6", color: "#B7C4D8", maxWidth: "36em" }}>When you contact us, you talk to the people who built the system. No support queue in another country.</p><div data-stagger="" style={{ marginTop: "clamp(32px, 4vw, 48px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "40px 32px" }}><div style={{ minWidth: "0", borderTop: "1px solid rgba(255, 255, 255, 0.14)", paddingTop: "22px" }}><span aria-hidden="true" style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.06)", border: "1px solid rgba(124, 192, 245, 0.35)", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "600", color: "#7CC0F5" }}>VL</span><div style={{ marginTop: "16px", fontSize: "20px", fontWeight: "600", letterSpacing: "-0.02em" }}>Villads Laun</div><div style={{ fontSize: "15px", color: "#B7C4D8" }}>Sales and marketing</div><a href="mailto:vl@movena.io" style={{ display: "inline-block", marginTop: "10px", fontWeight: "600", color: "#7CC0F5", textDecoration: "none" }}>vl@movena.io</a></div><div style={{ minWidth: "0", borderTop: "1px solid rgba(255, 255, 255, 0.14)", paddingTop: "22px" }}><span aria-hidden="true" style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.06)", border: "1px solid rgba(124, 192, 245, 0.35)", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "600", color: "#7CC0F5" }}>VCL</span><div style={{ marginTop: "16px", fontSize: "20px", fontWeight: "600", letterSpacing: "-0.02em" }}>Valdemar Lorentzen</div><div style={{ fontSize: "15px", color: "#B7C4D8" }}>Development and operations</div><a href="mailto:vcl@movena.io" style={{ display: "inline-block", marginTop: "10px", fontWeight: "600", color: "#7CC0F5", textDecoration: "none" }}>vcl@movena.io</a></div><div style={{ minWidth: "0", borderTop: "1px solid rgba(255, 255, 255, 0.14)", paddingTop: "22px" }}><span aria-hidden="true" style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.06)", border: "1px solid rgba(124, 192, 245, 0.35)", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "600", color: "#7CC0F5" }}>SO</span><div style={{ marginTop: "16px", fontSize: "20px", fontWeight: "600", letterSpacing: "-0.02em" }}>Samuel Odegaard</div><div style={{ fontSize: "15px", color: "#B7C4D8" }}>Strategy and support</div><a href="mailto:sto@movena.io" style={{ display: "inline-block", marginTop: "10px", fontWeight: "600", color: "#7CC0F5", textDecoration: "none" }}>sto@movena.io</a></div></div>
</div>
</section>

<section style={{ background: "#FFFFFF", padding: "clamp(48px, 5vw, 80px) 0" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 64px)", boxSizing: "border-box", width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: "24px" }}><div style={{ borderTop: "1px solid #E3E8EF", paddingTop: "18px" }}><div style={{ fontSize: "18px", fontWeight: "600" }}>Danish company</div><div style={{ marginTop: "4px", fontSize: "15px", color: "#4A5B73" }}>Movena ApS, CVR 46764129</div></div><div style={{ borderTop: "1px solid #E3E8EF", paddingTop: "18px" }}><div style={{ fontSize: "18px", fontWeight: "600" }}>Office in Copenhagen</div><div style={{ marginTop: "4px", fontSize: "15px", color: "#4A5B73" }}>Rådhuspladsen 16</div></div><div style={{ borderTop: "1px solid #E3E8EF", paddingTop: "18px" }}><div style={{ fontSize: "18px", fontWeight: "600" }}>Local support</div><div style={{ marginTop: "4px", fontSize: "15px", color: "#4A5B73" }}>Straight from the people who built the system</div></div><div style={{ borderTop: "1px solid #E3E8EF", paddingTop: "18px" }}><div style={{ fontSize: "18px", fontWeight: "600" }}>Data in Europe</div><div style={{ marginTop: "4px", fontSize: "15px", color: "#4A5B73" }}>You own your data and can take it with you</div></div></div>
</section>

<DemoCTA />

<SiteFooter />




</div>
  )
}
