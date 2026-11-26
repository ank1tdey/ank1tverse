'use client';

import ScrollReveal from './reactbits/ScrollReveal/ScrollReveal';
import { approach } from '@/lib/content';

export default function Approach() {
  return (
    <section className="section" aria-label="How I work">
      <div className="wrap">
        <ScrollReveal
          containerClassName="statement-wrap"
          textClassName="statement"
          baseOpacity={0.12}
          baseRotation={0}
          blurStrength={6}
          wordAnimationEnd="center center"
        >
          {approach.statement}
        </ScrollReveal>

        <ol className="steps">
          {approach.steps.map((step, i) => (
            <li key={step.title} className="step">
              <span className="step-n">{i + 1}</span>
              <h3 className="t-h3">{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
