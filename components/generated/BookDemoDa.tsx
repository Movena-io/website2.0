// @ts-nocheck -- generated file: the design's own JS is kept verbatim.
'use client'

// GENERATED from design-export/Book-demo-v5.dc.html by scripts/dc-to-tsx.mjs.
// Styles and numbers are the design's own. Hand edits below the marker only.
import { useState, useEffect } from 'react'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import DemoCTA from '@/components/site/DemoCTA'
import { submitDemoLead } from '@/lib/demo-lead'

const DEMO_LOCALE = 'da'

export default function BookDemoDa() {
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

    const dv = (k, d) => (s[k] === undefined ? d : s[k]);
    const dName = dv('dName', ''); const dFirm = dv('dFirm', ''); const dPhone = dv('dPhone', ''); const dMail = dv('dMail', '');
    const dSent = s.dSent === true; const dErr = s.dErr === true;
    const dvals = {};
    const opts = { dSize: 4, dNow: 3, dWhen: 3 };
    Object.keys(opts).forEach((key) => { for (let k = 0; k < opts[key]; k++) { const on = s[key] === k;
      dvals[key + '_' + k + '_pr'] = on ? 'true' : 'false'; dvals[key + '_' + k + '_bg'] = on ? '#0B1F3B' : '#FFFFFF'; dvals[key + '_' + k + '_fg'] = on ? '#FFFFFF' : '#0B1F3B'; dvals[key + '_' + k + '_bd'] = on ? '#0B1F3B' : '#C9D3E0';
      dvals['pick_' + key + '_' + k] = () => set({ [key]: on ? undefined : k }); } });

    const dPhoneOk = (dv('dPhone', '').replace(/\D/g, '').length >= 8);
    const dE = { Name: s.dErr === true && !dv('dName', '').trim(), Firm: s.dErr === true && !dv('dFirm', '').trim(), Phone: s.dErr === true && !dPhoneOk };

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
      errName: dE.Name, bdName: dE.Name ? '#B42318' : '#C9D3E0', invName: dE.Name ? 'true' : 'false',
      errFirm: dE.Firm, bdFirm: dE.Firm ? '#B42318' : '#C9D3E0', invFirm: dE.Firm ? 'true' : 'false',
      errPhone: dE.Phone, bdPhone: dE.Phone ? '#B42318' : '#C9D3E0', invPhone: dE.Phone ? 'true' : 'false',
      ...dvals,
      dName: dName, dFirm: dFirm, dPhone: dPhone, dMail: dMail,
      on_dName: (e) => set({ dName: e.target.value, dErr: false }), on_dFirm: (e) => set({ dFirm: e.target.value, dErr: false }), on_dPhone: (e) => set({ dPhone: e.target.value, dErr: false }), on_dMail: (e) => set({ dMail: e.target.value }),
      dShowForm: !dSent, dSent: dSent, dErr: dErr, dFirstName: (dName.trim().split(' ')[0] || 'tak'),
      dSubmit: () => { if (!(dName.trim() && dFirm.trim() && dPhoneOk)) { set({ dErr: true }); return; } set({ dSending: true, dErr: false, dFailed: false }); submitDemoLead({ name: dName, company: dFirm, phone: dPhone, email: dMail, sizeIndex: st.dSize, usesToday: st.dNowText, callWindow: st.dWhenStr, locale: DEMO_LOCALE }).then((ok) => set({ dSending: false, dSent: ok, dFailed: !ok })).catch(() => set({ dSending: false, dFailed: true })); },
      dBtnLabel: s.dSending ? 'Sender…' : 'Bliv ringet op',
      dReset: () => set({ dSent: false }),
      dNowText: s.dNowText === undefined ? '' : s.dNowText,
      on_dNowText: (e) => set({ dNowText: e.target.value }),
      dWhenVal: s.dWhenStr === undefined ? '' : s.dWhenStr,
      on_dWhen: (e) => set({ dWhenStr: e.target.value }),
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

<section id="top" style={{ background: "radial-gradient(ellipse 55% 55% at 72% 30%, rgba(59, 130, 246, 0.18) 0%, rgba(59, 130, 246, 0.06) 45%, rgba(255, 255, 255, 0) 75%), linear-gradient(180deg, #FFFFFF 75%, #F1F5FA 100%)", padding: "clamp(32px, 4vw, 56px) 0 clamp(56px, 6vw, 96px)" }}>
<div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 64px)", boxSizing: "border-box", width: "100%" }}>
<div style={{ fontSize: "14px", color: "#4A5B73" }}><a href="/da" style={{ color: "#4A5B73" }}>Forside</a> / Book en demo</div>
<div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "40px clamp(40px, 5vw, 80px)" }}>
<div style={{ flex: "1 1 380px", minWidth: "0", maxWidth: "520px" }}><h1 style={{ margin: "0", fontSize: "clamp(38px, 4.4vw, 62px)", lineHeight: "1.04", fontWeight: "600", letterSpacing: "-0.045em" }}>Se Movena med <span style={{ background: "linear-gradient(90deg, #1D4ED8 0%, #3B82F6 55%, #38A3F1 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", WebkitTextFillColor: "transparent" }}>en af jeres egne flytninger</span></h1><p style={{ margin: "20px 0 0", fontSize: "clamp(18px, 1.5vw, 20px)", lineHeight: "1.55", color: "#4A5B73" }}>Udfyld formularen, så ringer vi jer op. På demoen viser vi systemet med en opgave fra jeres egen kalender.</p><ol data-stagger="" style={{ listStyle: "none", margin: "32px 0 0", padding: "0", display: "flex", flexDirection: "column", gap: "20px" }}><li style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}><span aria-hidden="true" style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#2563EB", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0", fontSize: "16px", fontWeight: "600" }}>1</span><div style={{ paddingTop: "5px" }}><div style={{ fontSize: "18px", fontWeight: "600", lineHeight: "1.3" }}>Udfyld formularen</div><div style={{ marginTop: "3px", fontSize: "16px", lineHeight: "1.5", color: "#4A5B73" }}>Navn, firma og telefon. Resten er valgfrit.</div></div></li><li style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}><span aria-hidden="true" style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#2563EB", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0", fontSize: "16px", fontWeight: "600" }}>2</span><div style={{ paddingTop: "5px" }}><div style={{ fontSize: "18px", fontWeight: "600", lineHeight: "1.3" }}>Vi ringer jer op</div><div style={{ marginTop: "3px", fontSize: "16px", lineHeight: "1.5", color: "#4A5B73" }}>En af os tre ringer jer op.</div></div></li><li style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}><span aria-hidden="true" style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#2563EB", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0", fontSize: "16px", fontWeight: "600" }}>3</span><div style={{ paddingTop: "5px" }}><div style={{ fontSize: "18px", fontWeight: "600", lineHeight: "1.3" }}>Se Movena med jeres egen flytning</div><div style={{ marginTop: "3px", fontSize: "16px", lineHeight: "1.5", color: "#4A5B73" }}>Vi lægger en rigtig opgave ind sammen med jer, fra forespørgsel til faktura.</div></div></li></ol><div style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "8px 24px", fontSize: "15px", fontWeight: "500", color: "#4A5B73" }}><span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: "0", marginTop: "2px" }}><circle cx="12" cy="12" r="9" fill="none" stroke="#2563EB" strokeWidth="1.6"></circle><path d="M8.5 12.4l2.4 2.4 4.6-5" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg>Gratis og uforpligtende</span><span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: "0", marginTop: "2px" }}><circle cx="12" cy="12" r="9" fill="none" stroke="#2563EB" strokeWidth="1.6"></circle><path d="M8.5 12.4l2.4 2.4 4.6-5" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg>Ingen binding</span><span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: "0", marginTop: "2px" }}><circle cx="12" cy="12" r="9" fill="none" stroke="#2563EB" strokeWidth="1.6"></circle><path d="M8.5 12.4l2.4 2.4 4.6-5" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path></svg>Support på dansk</span></div></div>
<div style={{ flex: "1 1 420px", minWidth: "0", maxWidth: "560px" }}><div style={{ background: "#FFFFFF", borderRadius: "20px", padding: "clamp(22px, 3vw, 36px)", boxShadow: "0 0 0 1px rgba(11, 31, 59, 0.06), 0 32px 64px -32px rgba(11, 31, 59, 0.45)", borderTop: "4px solid #2563EB" }}>{V.dShowForm ? (<><div style={{ display: "flex", flexDirection: "column", gap: "18px" }}><div><h2 style={{ margin: "0", fontSize: "24px", fontWeight: "600", letterSpacing: "-0.02em" }}>Bliv ringet op</h2><p style={{ margin: "4px 0 0", fontSize: "15px", color: "#4A5B73" }}>Det tager under et minut.</p></div><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: "14px" }}><div style={{ minWidth: "0" }}><label htmlFor="d-navn" style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>Navn<span style={{ color: "#B42318" }}> *</span></label><input id="d-navn" aria-invalid={V.invName} type="text" value={V.dName} onChange={V.on_dName} placeholder="Fx Jens Holm" autoComplete="name" style={{ width: "100%", boxSizing: "border-box", height: "48px", padding: "0 14px", border: `1px solid ${V.bdName}`, borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", color: "#0B1F3B", background: "#FFFFFF" }} />{V.errName ? (<><p role="alert" style={{ margin: "6px 0 0", fontSize: "13px", fontWeight: "600", color: "#B42318" }}>Skriv dit navn</p></>) : null}</div><div style={{ minWidth: "0" }}><label htmlFor="d-firma" style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>Flyttefirma<span style={{ color: "#B42318" }}> *</span></label><input id="d-firma" aria-invalid={V.invFirm} type="text" value={V.dFirm} onChange={V.on_dFirm} placeholder="Fx Holm Flytning" autoComplete="organization" style={{ width: "100%", boxSizing: "border-box", height: "48px", padding: "0 14px", border: `1px solid ${V.bdFirm}`, borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", color: "#0B1F3B", background: "#FFFFFF" }} />{V.errFirm ? (<><p role="alert" style={{ margin: "6px 0 0", fontSize: "13px", fontWeight: "600", color: "#B42318" }}>Skriv navnet på jeres flyttefirma</p></>) : null}</div><div style={{ minWidth: "0" }}><label htmlFor="d-tlf" style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>Telefon<span style={{ color: "#B42318" }}> *</span></label><input id="d-tlf" aria-invalid={V.invPhone} type="tel" value={V.dPhone} onChange={V.on_dPhone} placeholder="Fx 20 30 40 50" autoComplete="tel" style={{ width: "100%", boxSizing: "border-box", height: "48px", padding: "0 14px", border: `1px solid ${V.bdPhone}`, borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", color: "#0B1F3B", background: "#FFFFFF" }} />{V.errPhone ? (<><p role="alert" style={{ margin: "6px 0 0", fontSize: "13px", fontWeight: "600", color: "#B42318" }}>Skriv et telefonnummer med 8 cifre</p></>) : null}</div><div style={{ minWidth: "0" }}><label htmlFor="d-mail" style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>E-mail <span style={{ fontWeight: "500", color: "#6B7A90" }}>(valgfri)</span></label><input id="d-mail" type="email" value={V.dMail} onChange={V.on_dMail} placeholder="" autoComplete="email" style={{ width: "100%", boxSizing: "border-box", height: "48px", padding: "0 14px", border: "1px solid #C9D3E0", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", color: "#0B1F3B", background: "#FFFFFF" }} /></div></div><fieldset style={{ border: "0", margin: "0", padding: "0", minWidth: "0" }}><legend style={{ padding: "0", fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>Hvor mange er I? <span style={{ fontWeight: "500", color: "#6B7A90" }}>(valgfri)</span></legend><div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}><button data-lift="" type="button" aria-pressed={V.dSize_0_pr} onClick={V.pick_dSize_0} style={{ height: "44px", padding: "0 14px", borderRadius: "10px", border: `1px solid ${V.dSize_0_bd}`, background: V.dSize_0_bg, color: V.dSize_0_fg, fontFamily: "inherit", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>1–5</button><button data-lift="" type="button" aria-pressed={V.dSize_1_pr} onClick={V.pick_dSize_1} style={{ height: "44px", padding: "0 14px", borderRadius: "10px", border: `1px solid ${V.dSize_1_bd}`, background: V.dSize_1_bg, color: V.dSize_1_fg, fontFamily: "inherit", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>6–15</button><button data-lift="" type="button" aria-pressed={V.dSize_2_pr} onClick={V.pick_dSize_2} style={{ height: "44px", padding: "0 14px", borderRadius: "10px", border: `1px solid ${V.dSize_2_bd}`, background: V.dSize_2_bg, color: V.dSize_2_fg, fontFamily: "inherit", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>16–30</button><button data-lift="" type="button" aria-pressed={V.dSize_3_pr} onClick={V.pick_dSize_3} style={{ height: "44px", padding: "0 14px", borderRadius: "10px", border: `1px solid ${V.dSize_3_bd}`, background: V.dSize_3_bg, color: V.dSize_3_fg, fontFamily: "inherit", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>Over 30</button></div></fieldset><div style={{ minWidth: "0" }}><label htmlFor="d-system" style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>Hvad bruger I i dag? <span style={{ fontWeight: "500", color: "#6B7A90" }}>(valgfri)</span></label><input id="d-system" type="text" value={V.dNowText} onChange={V.on_dNowText} placeholder="Fx Excel, papir, et andet system" style={{ width: "100%", boxSizing: "border-box", height: "48px", padding: "0 14px", border: "1px solid #C9D3E0", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", color: "#0B1F3B", background: "#FFFFFF" }} /></div><div style={{ minWidth: "0" }}><label htmlFor="d-naar" style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>Hvornår passer det at blive ringet op? <span style={{ fontWeight: "500", color: "#6B7A90" }}>(valgfri)</span></label><select id="d-naar" value={V.dWhenVal} onChange={V.on_dWhen} style={{ width: "100%", boxSizing: "border-box", height: "48px", padding: "0 44px 0 14px", border: "1px solid #C9D3E0", borderRadius: "10px", fontFamily: "inherit", fontSize: "16px", color: "#0B1F3B", background: "#FFFFFF url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%234A5B73' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\") no-repeat right 14px center", WebkitAppearance: "none", appearance: "none", cursor: "pointer" }}><option value="">Vælg tidspunkt</option><option value="Formiddag">Formiddag</option><option value="Eftermiddag">Eftermiddag</option><option value="Lige meget">Lige meget</option></select></div>{V.dErr ? (<><p role="alert" style={{ margin: "0", fontSize: "14px", fontWeight: "600", color: "#B42318" }}>Tjek de markerede felter, så vi kan ringe til jer.</p></>) : null}<button data-lift="" type="button" onClick={V.dSubmit} style={{ height: "54px", border: "0", borderRadius: "10px", background: "#2563EB", color: "#FFFFFF", fontFamily: "inherit", fontSize: "17px", fontWeight: "600", cursor: "pointer" }}>{V.dBtnLabel}</button><p style={{ margin: "0", fontSize: "13px", color: "#6B7A90" }}>Gratis og uforpligtende. Vi bruger kun oplysningerne til at kontakte jer. <a href="/da/privatlivspolitik" style={{ color: "#4A5B73" }}>Privatlivspolitik</a></p></div></>) : null}{V.dSent ? (<><div style={{ display: "flex", flexDirection: "column", gap: "16px", minHeight: "420px", justifyContent: "center" }}><span aria-hidden="true" style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#DDF3E6", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1E6B43" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path data-draw="" d="M5 12.5l4.5 4.5L19 7.5"></path></svg></span><h2 style={{ margin: "0", fontSize: "28px", fontWeight: "600", letterSpacing: "-0.02em" }}>Tak, {V.dFirstName}. Vi ringer til dig på {V.dPhone}.</h2><p style={{ margin: "0", fontSize: "16px", lineHeight: "1.55", color: "#4A5B73" }}>Find gerne en flytning fra jeres kalender frem, som vi kan lægge ind sammen.</p><p style={{ margin: "0", fontSize: "15px", color: "#4A5B73" }}>Har det travlt? Ring selv på <a href="tel:+4550282856" style={{ color: "#2563EB", fontWeight: "600" }}>+45 50 28 28 56</a>.</p><button data-lift="" type="button" onClick={V.dReset} style={{ alignSelf: "flex-start", height: "44px", padding: "0 16px", border: "1px solid #C9D3E0", borderRadius: "8px", background: "#FFFFFF", color: "#0B1F3B", fontFamily: "inherit", fontSize: "15px", fontWeight: "600", cursor: "pointer" }}>Tilbage til formularen</button></div></>) : null}</div></div>
</div>
</div>
</section>

<SiteFooter />



</div>
  )
}
