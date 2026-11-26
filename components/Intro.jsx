'use client';

import { useLayoutEffect, useRef } from 'react';
import Magnet from './reactbits/Magnet/Magnet';
import MediaBox from './MediaBox';
import { intro, showreel } from '@/lib/content';
import { ratioValue } from '@/lib/links';
import { gsap, prefersReducedMotion } from '@/lib/motion';

// The intro line, then a row of boxes for reels, videos and images that fly
// in from depth and settle into place as you scroll.
export default function Intro() {
  const reelRef = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.reel-item',
        {
          opacity: 0,
          y: i => 160 + i * 22,
          z: -320,
          rotateX: 52,
          rotateY: i => (i % 2 ? 18 : -18),
          rotateZ: i => (i % 2 ? 1 : -1) * (5 + i * 1.5),
          scale: 0.84,
        },
        {
          opacity: 1,
          y: 0,
          z: 0,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          scale: 1,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: reelRef.current, start: 'top 98%', end: 'top 38%', scrub: 0.9 },
        }
      );
    }, reelRef);
    return () => ctx.revert();
  }, []);

  const columns = showreel.map(item => `${ratioValue(item.ratio).toFixed(3)}fr`).join(' ');

  return (
    <section className="intro" aria-label="What I do">
      <div className="wrap intro-grid">
        <p className="t-lede">{intro.text}</p>
        <div className="intro-actions">
          <Magnet padding={60} magnetStrength={4}>
            <a className="btn btn-screen" href={intro.primaryHref}>
              {intro.primary}
            </a>
          </Magnet>
          <a className="btn btn-ghost" href={intro.secondaryHref}>
            {intro.secondary}
          </a>
        </div>
      </div>

      <div ref={reelRef} className="reel" style={{ '--reel-cols': columns }}>
        {showreel.map((item, i) => (
          <div key={i} className="reel-item" style={{ aspectRatio: item.ratio }}>
            <MediaBox
              type={item.type}
              src={item.src}
              poster={item.poster}
              ratio={item.ratio}
              label={item.label}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
