'use client';

import { useEffect, useState } from 'react';
import Magnet from './reactbits/Magnet/Magnet';
import AdLogo from './AdLogo';
import { nav, site } from '@/lib/content';

// Links sit on top on every screen size; the bar turns solid once you scroll.
export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`} data-intro-fade>
      <div className="site-header-inner">
        <a href="#top" className="logo-link" aria-label={`${site.name}, back to the top`}>
          <AdLogo title={site.name} />
        </a>
        <nav className="site-nav" aria-label="Main">
          {nav.map(item => (
            <a key={item.href} className="nav-link" href={item.href}>
              {item.label}
            </a>
          ))}
          <Magnet padding={50} magnetStrength={4} wrapperClassName="nav-cta-wrap">
            <a className="btn btn-screen nav-cta" href="#contact">
              Start a project
            </a>
          </Magnet>
        </nav>
      </div>
    </header>
  );
}
