'use client';

import { useEffect, useRef } from 'react';

const TENDRILS = 3;
const SEGMENTS = 18;
const NS = 'http://www.w3.org/2000/svg';

// Liquid tendrils that stretch from a button towards the pointer when it comes
// close, then snap back when it leaves. Circles along a few wobbling curves are
// melted together by an SVG "goo" filter (blur + alpha threshold).
// Pointer devices only; skipped for touch screens and reduced motion.
export default function GooReach({ targetRef, color = '#ece6da', reach = 220 }) {
  const groupRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const group = groupRef.current;
    if (!fine || reduce || !group) return undefined;

    const body = document.createElementNS(NS, 'rect');
    group.appendChild(body);
    const blobs = Array.from({ length: TENDRILS * (SEGMENTS + 1) }, () => {
      const c = document.createElementNS(NS, 'circle');
      c.setAttribute('r', '0');
      group.appendChild(c);
      return c;
    });
    const tips = Array.from({ length: TENDRILS }, () => ({ x: 0, y: 0, ready: false }));
    const pointer = { x: -1e4, y: -1e4, inside: false };
    let strength = 0;
    let raf = 0;
    let running = false;
    const t0 = performance.now();

    const hideAll = () => {
      blobs.forEach(c => c.setAttribute('r', '0'));
      body.setAttribute('width', '0');
      tips.forEach(t => {
        t.ready = false;
      });
    };

    const frame = now => {
      const el = targetRef.current;
      if (!el) {
        running = false;
        return;
      }
      const r = el.getBoundingClientRect();
      const { x: px, y: py } = pointer;
      const nearX = Math.max(r.left, Math.min(px, r.right));
      const nearY = Math.max(r.top, Math.min(py, r.bottom));
      const dist = Math.hypot(px - nearX, py - nearY);
      const target = pointer.inside && dist < reach ? 1 - dist / reach : 0;
      strength += (target - strength) * 0.12;

      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      body.setAttribute('x', r.left + 2);
      body.setAttribute('y', r.top + 2);
      body.setAttribute('width', Math.max(0, r.width - 4));
      body.setAttribute('height', Math.max(0, r.height - 4));
      body.setAttribute('rx', r.height / 2);

      const time = (now - t0) / 1000;
      const angle = Math.atan2(py - cy, px - cx);
      const grow = Math.min(1, strength * 1.5);
      let k = 0;

      for (let i = 0; i < TENDRILS; i++) {
        const a = angle + (i - (TENDRILS - 1) / 2) * 0.52;
        // Start on the button's edge (an ellipse is close enough for a pill).
        const ax = cx + Math.cos(a) * (r.width / 2 - 6);
        const ay = cy + Math.sin(a) * (r.height / 2 - 4);
        const tip = tips[i];
        if (!tip.ready) {
          tip.x = ax;
          tip.y = ay;
          tip.ready = true;
        }
        const follow = 0.2 - i * 0.045;
        tip.x += (ax + (px - ax) * grow - tip.x) * follow;
        tip.y += (ay + (py - ay) * grow - tip.y) * follow;

        const dx = tip.x - ax;
        const dy = tip.y - ay;
        const len = Math.hypot(dx, dy) || 1;
        const wobble = Math.sin(time * (2.4 + i * 0.8) + i * 2.1) * Math.min(34, len * 0.28);
        const mx = ax + dx * 0.5 + (-dy / len) * wobble;
        const my = ay + dy * 0.5 + (dx / len) * wobble;
        const thick = i === 1 ? 12 : 8.5;

        for (let s = 0; s < SEGMENTS; s++) {
          const t = s / (SEGMENTS - 1);
          const u = 1 - t;
          const x = u * u * ax + 2 * u * t * mx + t * t * tip.x;
          const y = u * u * ay + 2 * u * t * my + t * t * tip.y;
          const pulse = 1 + 0.14 * Math.sin(time * 7 + s * 0.9 + i * 1.3);
          const rad = strength * (u * thick + t * 4.6) * pulse;
          const c = blobs[k++];
          c.setAttribute('cx', x.toFixed(1));
          c.setAttribute('cy', y.toFixed(1));
          c.setAttribute('r', Math.max(0, rad).toFixed(2));
        }
        const head = blobs[k++];
        head.setAttribute('cx', tip.x.toFixed(1));
        head.setAttribute('cy', tip.y.toFixed(1));
        head.setAttribute('r', (strength * (i === 1 ? 8.5 : 6.5)).toFixed(2));
      }

      if (target === 0 && strength < 0.005) {
        running = false;
        hideAll();
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const onMove = event => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.inside = true;
      start();
    };
    const onLeave = () => {
      pointer.inside = false;
      start();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', start, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', start);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      group.replaceChildren();
    };
  }, [targetRef, reach]);

  return (
    <svg className="goo-layer" aria-hidden="true">
      <defs>
        <filter id="goo-reach" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" />
        </filter>
      </defs>
      <g ref={groupRef} filter="url(#goo-reach)" fill={color} />
    </svg>
  );
}
