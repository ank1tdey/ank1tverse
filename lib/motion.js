import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const HEADER_OFFSET = 64;
let lenis = null;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Safe for the static build: false on the server, the real value after mount.
export function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduce(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return reduce;
}

export const getLenis = () => lenis;

// Smooth scrolling (Lenis) wired into GSAP, plus smooth in-page links that
// move keyboard focus to the section they land on.
export function initSmoothScroll() {
  const reduce = prefersReducedMotion();
  let raf = null;

  if (!reduce) {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on('scroll', ScrollTrigger.update);
    raf = time => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
  }

  const focusSection = el => {
    if (!el) return;
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  };

  const onClick = event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute('href');
    const target = hash === '#top' ? document.getElementById('top') : document.querySelector(hash);
    if (!target) return;
    event.preventDefault();
    if (lenis) {
      lenis.scrollTo(hash === '#top' ? 0 : target, {
        offset: -HEADER_OFFSET,
        duration: 1.3,
        onComplete: () => focusSection(target),
      });
    } else {
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      focusSection(target);
    }
    history.replaceState(null, '', hash);
  };

  document.addEventListener('click', onClick);
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  return () => {
    document.removeEventListener('click', onClick);
    if (lenis) {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenis = null;
    }
  };
}

export { gsap, ScrollTrigger };
