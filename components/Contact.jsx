'use client';

import { useRef, useState } from 'react';
import Magnet from './reactbits/Magnet/Magnet';
import TextPressure from './reactbits/TextPressure/TextPressure';
import GooReach from './GooReach';
import { contact, site, socials } from '@/lib/content';
import { whatsappUrl } from '@/lib/links';
import { useReducedMotion } from '@/lib/motion';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  // If a browser blocks the new tab, show a plain link to tap instead.
  const [fallbackUrl, setFallbackUrl] = useState('');
  const whatsappRef = useRef(null);
  const reduce = useReducedMotion();

  const copyEmail = async () => {
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  const sendOnWhatsApp = event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const message = String(form.get('message') || '').trim();
    const lines = [`Hi Ankit, I'm ${name}.`];
    if (email) lines.push(`My email: ${email}`);
    lines.push('', message);
    const url = whatsappUrl(lines.join('\n'));
    const tab = window.open(url, '_blank');
    if (tab) {
      tab.opener = null;
      setFallbackUrl('');
    } else {
      setFallbackUrl(url);
    }
  };

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="house-lights" aria-hidden="true" />
      <div className="wrap">
        <h2 id="contact-title" className="sr-only">
          {contact.title}
        </h2>
        {reduce ? (
          <p className="pressure-static" aria-hidden="true">
            {contact.title}
          </p>
        ) : (
          <div className="pressure" aria-hidden="true">
            <TextPressure
              tag="p"
              text={contact.title.toUpperCase()}
              fontFamily="'Archivo Variable', sans-serif"
              fontUrl=""
              textColor="#ece6da"
              pressureColor="#ffc78a"
              italic={false}
              idle="wave"
              idleSpeed={0.5}
              radius={0.45}
              smoothing={0.45}
              minFontSize={40}
            />
          </div>
        )}

        <p className="contact-text">{contact.text}</p>

        <div className="contact-actions">
          <Magnet padding={70} magnetStrength={5}>
            <a
              ref={whatsappRef}
              className="btn btn-screen"
              href={whatsappUrl(site.whatsappGreeting)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.whatsappLabel}
            </a>
          </Magnet>
          <button type="button" className="btn btn-ghost" onClick={copyEmail}>
            <span aria-live="polite">{copied ? contact.emailCopied : contact.emailLabel}</span>
          </button>
        </div>
        <GooReach targetRef={whatsappRef} color="#ece6da" />

        <p className="contact-email">
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>

        <form className="wa-form" onSubmit={sendOnWhatsApp}>
          <h3 className="t-h3">{contact.formTitle}</h3>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="f-name">Your name</label>
              <input id="f-name" name="name" autoComplete="name" required />
            </div>
            <div className="field">
              <label htmlFor="f-email">Your email (optional)</label>
              <input id="f-email" name="email" type="email" autoComplete="email" />
            </div>
            <div className="field field-full">
              <label htmlFor="f-message">What do you need?</label>
              <textarea
                id="f-message"
                name="message"
                rows={4}
                required
                placeholder="A logo for my café, a website for my studio, posts for a launch…"
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-screen">
              {contact.formButton}
            </button>
            {fallbackUrl ? (
              <a className="text-link" href={fallbackUrl} target="_blank" rel="noopener noreferrer">
                Your message is ready. Open WhatsApp to send it.
              </a>
            ) : (
              <p className="form-note">Opens WhatsApp with your message ready to send.</p>
            )}
          </div>
        </form>

        <footer className="site-footer">
          <ul className="socials">
            {socials.map(social => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <span className="footer-meta">© {new Date().getFullYear()} Ankit Dey. Made in Kolkata.</span>
        </footer>
      </div>
    </section>
  );
}
