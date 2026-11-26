'use client';

import { useLayoutEffect, useRef } from 'react';
import LightRays from './reactbits/LightRays/LightRays';
import LiveTime from './LiveTime';
import { hero, site } from '@/lib/content';
import { gsap, prefersReducedMotion } from '@/lib/motion';

// Opening shot: the screen opens from a slit of light and the name
// de-squeezes like an anamorphic lens (Archivo's width axis, 62 → 125).
// With a photo in content.js it sits behind the name in black and white;
// with a cutout, you stand in front of your name.
export default function Hero() {
  const rootRef = useRef(null);
  const titleRef = useRef(null);
  const photoRef = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      const apertures = rootRef.current.querySelectorAll('.aperture');
      const fades = document.querySelectorAll('[data-intro-fade]');

      gsap.set(apertures, { scaleY: 0.988 });
      gsap.set(titleRef.current, { '--w': 62, opacity: 0, filter: 'blur(14px)' });
      gsap.set(fades, { opacity: 0 });

      gsap
        .timeline()
        .to(apertures, { scaleY: 0, duration: 1.35, ease: 'expo.inOut' }, 0.45)
        .to(titleRef.current, { '--w': 125, opacity: 1, filter: 'blur(0px)', duration: 1.7, ease: 'expo.out' }, 0.8)
        .to(fades, { opacity: 1, duration: 0.9, ease: 'power2.out', stagger: 0.08 }, 1.35);

      // As you scroll away, the photo pushes in and the name drifts up and blurs.
      const out = { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true };
      if (photoRef.current) gsap.to(photoRef.current, { scale: 1.12, ease: 'none', scrollTrigger: out });
      gsap.to('.hero-layer, .hero-cutout', { yPercent: -12, ease: 'none', scrollTrigger: out });
      gsap.fromTo(
        titleRef.current,
        { filter: 'blur(0px)', opacity: 1 },
        { filter: 'blur(8px)', opacity: 0.35, ease: 'none', immediateRender: false, scrollTrigger: { ...out, start: '30% top' } }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={rootRef} className="hero" aria-label="Introduction">
      <div className="hero-media" aria-hidden="true">
        {hero.image ? <img ref={photoRef} className="hero-photo" src={hero.image} alt="" /> : null}
        <div className="hero-rays">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={0.6}
            lightSpread={0.8}
            rayLength={2.3}
            glow={0.65}
            haze={0.3}
            noiseAmount={0.05}
            distortion={0.03}
            mouseInfluence={0.06}
            saturation={0}
            maxDevicePixelRatio={1.5}
          />
        </div>
      </div>
      <div className="hero-shade" aria-hidden="true" />

      {/* The name sits behind the cutout (if there is one)... */}
      <div className="hero-layer hero-title-layer">
        <h1 ref={titleRef} className="t-title">
          {site.name}
        </h1>
        <p className="tagline ghost" aria-hidden="true">
          {site.tagline}
        </p>
      </div>

      {hero.cutout ? <img className="hero-cutout" src={hero.cutout} alt="" aria-hidden="true" /> : null}

      {/* ...and the tagline sits in front of it, lined up with the name. */}
      <div className="hero-layer hero-front">
        <span className="t-title ghost" aria-hidden="true">
          {site.name}
        </span>
        <p className="tagline" data-intro-fade>
          {site.tagline}
        </p>
      </div>

      <p className="hero-subtitle" data-intro-fade>
        {site.subtitle}
      </p>

      <div className="hero-bar" data-intro-fade>
        <span>{site.location}</span>
        <LiveTime timeZone={site.timeZone} label={site.timeZoneLabel} />
      </div>

      <div className="aperture aperture-top" aria-hidden="true" />
      <div className="aperture aperture-bottom" aria-hidden="true" />
    </section>
  );
}
