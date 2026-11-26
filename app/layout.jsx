import '@fontsource-variable/archivo/wdth.css';
import 'lenis/dist/lenis.css';
import './globals.css';

const url = 'https://ank1tverse.tech/';
const description =
  'Ankit Dey designs brands, builds websites and tells stories, from Kolkata, for small businesses, startups and individuals.';

export const metadata = {
  metadataBase: new URL(url),
  title: 'Ankit Dey | Designer & storyteller in Kolkata',
  description,
  alternates: { canonical: url },
  // The AD mark everywhere: browser tabs, iPhone home screen, Android, search results.
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    url,
    title: 'Ankit Dey | Designer & storyteller',
    description: 'I design brands, build websites and tell stories.',
    images: [{ url: '/og.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport = {
  themeColor: '#000000',
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ankit Dey',
  jobTitle: 'Designer & storyteller',
  url,
  email: 'mailto:ankitdeypersonal@gmail.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Kolkata', addressCountry: 'IN' },
  sameAs: [
    'https://www.behance.net/anki1tdey',
    'https://www.linkedin.com/in/ank1tdey/',
    'https://www.instagram.com/ank1tcore/',
    'https://github.com/ank1tdey',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <noscript>
          <p style={{ padding: 24, color: '#f2f2f2', background: '#000' }}>
            This site needs JavaScript to play. Reach Ankit at{' '}
            <a href="mailto:ankitdeypersonal@gmail.com">ankitdeypersonal@gmail.com</a> or on WhatsApp at{' '}
            <a href="https://wa.me/918617646356">+91 86176 46356</a>.
          </p>
        </noscript>
        {children}
      </body>
    </html>
  );
}
