import { services } from '@/lib/content';

// Laid out like film credits: what it is on the left, what you get on the right.
export default function Services() {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="wrap">
        <h2 id="services-title" className="t-h2 center">
          What I make
        </h2>
        <dl className="credits">
          {services.map(service => (
            <div key={service.title} className="credit">
              <dt>{service.title}</dt>
              <dd>{service.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
