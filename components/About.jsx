import MediaBox from './MediaBox';
import { about } from '@/lib/content';

export default function About() {
  const hasVideo = Boolean(about.photo.video);
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap">
        <h2 id="about-title" className="t-h2">
          About
        </h2>
        <div className="about-grid">
          <div className="about-text">
            {about.paragraphs.map(text => (
              <p key={text.slice(0, 24)}>{text}</p>
            ))}
          </div>
          <div className="about-photo">
            <MediaBox
              type={hasVideo ? 'video' : 'image'}
              src={hasVideo ? about.photo.video : about.photo.image}
              poster={about.photo.image}
              label="Your photo"
              alt="Ankit Dey"
            />
          </div>
        </div>

        <dl className="credits">
          {about.credits.map(credit => (
            <div key={credit.role} className="credit">
              <dt>{credit.role}</dt>
              <dd>
                {credit.detail}
                {credit.when ? <span className="credit-when">{credit.when}</span> : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
