'use client';

import { useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import Intro from './Intro';
import Projects from './Projects';
import Services from './Services';
import Approach from './Approach';
import About from './About';
import Contact from './Contact';
import Noise from './reactbits/Noise/Noise';
import { initSmoothScroll } from '@/lib/motion';

export default function Site() {
  useEffect(() => initSmoothScroll(), []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Intro />
        <Projects />
        <Services />
        <Approach />
        <About />
        <Contact />
      </main>
      {/* Film grain over everything. */}
      <Noise opacity={0.045} fps={12} fixed zIndex={70} />
    </>
  );
}
