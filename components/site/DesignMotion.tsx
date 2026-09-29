// @ts-nocheck -- the design's own animation runtime, kept verbatim.
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Lifted from the design export's componentDidMount. It drives the scroll
// reveals, the staggering, the number count-ups, the SVG draw-on and the
// hover lift. Without it the converted pages are correct but completely
// still. Re-runs on navigation because the observers bind to the nodes that
// were on screen at mount.
export default function DesignMotion() {
  const pathname = usePathname()

  useEffect(() => {
    const cleanups: Array<() => void> = []
    if (typeof window === 'undefined' || !window.IntersectionObserver || !window.MutationObserver || !Element.prototype.animate) return;
        const doc = document;
        const reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        const EASE = 'cubic-bezier(0.22, 0.61, 0.36, 1)';
        const T = { fast: 150, base: 260, reveal: 650, stagger: 90 };
                const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        const count = (el, delay) => {
          if (reduce || el._mvCounted) return;
          const tn = Array.from(el.childNodes).find((n) => n.nodeType === 3);
          if (!tn) return;
          const txt = tn.nodeValue; const m = txt.match(/([\d.]+)/); if (!m) return;
          const target = parseInt(m[1].replace(/\./g, ''), 10); if (!target) return;
          el._mvCounted = true;
          const pre = txt.slice(0, m.index); const post = txt.slice(m.index + m[1].length);
          const start = performance.now() + (delay || 0); const dur = 1100;
          tn.nodeValue = pre + '0' + post;
          const step = (now) => {
            const t = Math.min(1, Math.max(0, (now - start) / dur)); const e = 1 - Math.pow(1 - t, 3);
            tn.nodeValue = pre + fmt(Math.round(target * e)) + post;
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        };
        const draw = (p) => {
          if (reduce || !p.getTotalLength) return;
          const len = p.getTotalLength();
          p.animate([{ strokeDasharray: len, strokeDashoffset: len }, { strokeDasharray: len, strokeDashoffset: 0 }], { duration: 600, delay: 180, easing: EASE, fill: 'backwards' });
        };
        const run = (el, kind, delay) => {
          el.style.opacity = '';
          if (reduce) return;
          const d = delay || 0;
          if (kind === 'pop') el.animate([{ opacity: 0, transform: 'translateY(14px) scale(0.96)' }, { opacity: 1, transform: 'none' }], { duration: 560, delay: d, easing: EASE, fill: 'backwards' });
          else if (kind === 'line') el.animate([{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], { duration: 900, delay: d, easing: EASE, fill: 'backwards' });
          else el.animate([{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'none' }], { duration: T.reveal, delay: d, easing: EASE, fill: 'backwards' });
          if (el.hasAttribute('data-count')) count(el, d + 200);
          el.querySelectorAll('[data-count]').forEach((c) => count(c, d + 350));
        };
        const items = [];
        const add = (el, kind, delay) => { if (el && el.nodeType === 1 && !items.some((x) => x[0] === el)) items.push([el, kind, delay]); };
        doc.querySelectorAll('[data-reveal]').forEach((el) => add(el, el.getAttribute('data-reveal') || 'up', +(el.getAttribute('data-delay') || 0)));
        doc.querySelectorAll('[data-stagger]').forEach((p) => Array.from(p.children).forEach((c, i) => add(c.tagName === 'SC-IF' ? c.firstElementChild : c, 'up', i * T.stagger)));
        doc.querySelectorAll('section').forEach((sec) => {
          const box = sec.firstElementChild; if (!box) return;
          let i = 0;
          Array.from(box.children).forEach((c) => { if (c.matches('[data-reveal],[data-stagger]')) return; add(c, 'up', (i++) * 110); });
        });
        const vh = window.innerHeight || 800;
        const io = new IntersectionObserver((entries) => {
          entries.forEach((e) => { if (!e.isIntersecting) return; io.unobserve(e.target); const it = items.find((x) => x[0] === e.target); if (it) run(it[0], it[1], it[2]); });
        }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
        cleanups.push(() => io.disconnect());
        items.forEach(([el, kind, delay]) => {
          const r = el.getBoundingClientRect();
          if (r.top < vh && r.bottom > 0) run(el, kind, delay);
          else { if (!reduce) el.style.opacity = '0'; io.observe(el); }
        });
        // content that appears later (tabs, FAQ answers, menus, form states) fades in
        const mo = new MutationObserver((muts) => {
          muts.forEach((m) => {
            if (m.type === 'characterData') {
              const p = m.target.parentElement; const pulse = p && p.closest('[data-pulse]');
              if (pulse && !reduce && !pulse._mvPulsing) { pulse._mvPulsing = true; const a = pulse.animate([{ transform: 'scale(1.05)', color: '#2563EB' }, { transform: 'none' }], { duration: 380, easing: EASE }); a.onfinish = () => { pulse._mvPulsing = false; }; }
              return;
            }
            m.addedNodes.forEach((n) => {
              if (n.nodeType !== 1) return;
              const el = n.tagName === 'SC-IF' ? n.firstElementChild : n;
              if (!el || !el.animate) return;
              if (!reduce) el.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: T.base, easing: EASE });
              if (el.querySelectorAll) el.querySelectorAll('[data-draw]').forEach(draw);
            });
          });
        });
        mo.observe(doc.body, { childList: true, subtree: true, characterData: true });
        cleanups.push(() => mo.disconnect());
        // buttons lift on hover and give on press; blog cards zoom their cover
        let curBtn = null; let curCard = null;
        const lift = (el, up) => el.animate([{ transform: up ? 'none' : 'translateY(-1px)' }, { transform: up ? 'translateY(-1px)' : 'none' }], { duration: T.fast, easing: EASE, fill: 'forwards' });
        const zoom = (card, inn) => { const s = card.querySelector('svg'); if (s) s.animate([{ transform: inn ? 'scale(1)' : 'scale(1.08)' }, { transform: inn ? 'scale(1.08)' : 'scale(1)' }], { duration: 400, easing: EASE, fill: 'forwards' }); };
        const over = (e) => {
          if (reduce || !e.target.closest) return;
          const b = e.target.closest('[data-lift]');
          if (b !== curBtn) { if (curBtn) lift(curBtn, false); curBtn = b; if (b) lift(b, true); }
          const c = e.target.closest('[data-card]');
          if (c !== curCard) { if (curCard) zoom(curCard, false); curCard = c; if (c) zoom(c, true); }
        };
        const down = (e) => { if (reduce || !e.target.closest) return; const b = e.target.closest('[data-lift]'); if (b) b.animate([{ transform: 'translateY(-1px) scale(1)' }, { transform: 'translateY(0) scale(0.98)' }, { transform: 'translateY(-1px) scale(1)' }], { duration: 220, easing: EASE }); };
        const click = (e) => {
          if (!e.target.closest) return;
          const a = e.target.closest('a[href^="#"]'); if (!a) return;
          const id = a.getAttribute('href').slice(1); const t = id && doc.getElementById(id); if (!t) return;
          e.preventDefault(); t.style.scrollMarginTop = '96px';
          t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        };
        doc.addEventListener('pointerover', over); doc.addEventListener('pointerdown', down); doc.addEventListener('click', click);
        cleanups.push(() => { doc.removeEventListener('pointerover', over); doc.removeEventListener('pointerdown', down); doc.removeEventListener('click', click); });
        // blog: reading progress and the active section in the table of contents
        const art = doc.querySelector('article');
        const bar = doc.querySelector('[data-progress]');
        const scroller = (el) => { let p = el.parentElement; while (p && p !== doc.body) { const s = getComputedStyle(p); if (/(auto|scroll)/.test(s.overflowY) && p.scrollHeight > p.clientHeight) return p; p = p.parentElement; } return window; };
        if (art && bar) {
          const sc = scroller(art);
          const upd = () => { const r = art.getBoundingClientRect(); const h = sc === window ? window.innerHeight : sc.clientHeight; const done = Math.min(1, Math.max(0, (h * 0.3 - r.top) / Math.max(1, r.height - h * 0.5))); bar.style.transform = 'scaleX(' + done.toFixed(3) + ')'; };
          sc.addEventListener('scroll', upd, { passive: true }); upd();
          cleanups.push(() => sc.removeEventListener('scroll', upd));
        }

    return () => cleanups.forEach((f) => { try { f() } catch (e) { /* ignore */ } })
  }, [pathname])

  return null
}
