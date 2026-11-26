'use client';

import { useLayoutEffect, useRef } from 'react';
import MediaBox from './MediaBox';
import { projects } from '@/lib/content';
import { gsap, prefersReducedMotion } from '@/lib/motion';

// Project or product slots. Each one opens like the hero does, from a thin
// letterbox slit to the full picture, as it scrolls into view.
export default function Projects() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.project').forEach(card => {
        const media = card.querySelector('.project-media');
        const inner = card.querySelector('.project-inner');
        const trigger = { trigger: card, start: 'top 92%', end: 'top 40%', scrub: 0.8 };
        gsap.fromTo(media, { clipPath: 'inset(44% 0% 44% 0% round 10px)' }, { clipPath: 'inset(0% 0% 0% 0% round 10px)', ease: 'power2.out', scrollTrigger: trigger });
        gsap.fromTo(inner, { scale: 1.22 }, { scale: 1, ease: 'power2.out', scrollTrigger: trigger });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={rootRef} className="section" aria-labelledby="projects-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="projects-title" className="t-h2">
            Projects
          </h2>
          <p>Brand identities, websites and products I&apos;ve designed and built.</p>
        </div>

        <ul className="projects-grid">
          {projects.map((project, i) => {
            const hasVideo = Boolean(project.video);
            const title = project.title || `Project ${i + 1}`;
            const media = (
              <div className="project-media">
                <div className="project-inner">
                  <MediaBox
                    type={hasVideo ? 'video' : 'image'}
                    src={hasVideo ? project.video : project.image}
                    poster={project.image}
                    label="Image or video"
                    alt={project.title}
                  />
                </div>
              </div>
            );
            return (
              <li key={i} className="project">
                {project.link ? (
                  <a href={project.link.href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
                    {media}
                  </a>
                ) : (
                  media
                )}
                <h3 className={`t-h3${project.title ? '' : ' t-dim'}`}>{title}</h3>
                <p>{project.summary || 'A short line about the project goes here.'}</p>
                {project.link ? (
                  <a className="text-link" href={project.link.href} target="_blank" rel="noopener noreferrer">
                    {project.link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
