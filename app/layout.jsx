import { Press_Start_2P, Silkscreen } from 'next/font/google';
import './globals.css';
import { site } from './content';

const display = Press_Start_2P({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
  display: 'swap',
});

const body = Silkscreen({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
  display: 'swap',
});

const siteUrl = site.url || undefined;

export const metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    'Bahauddin Alam',
    'Full Stack Developer',
    'Full-Stack Developer',
    'Web Developer',
    'React Developer',
    'Next.js Developer',
    'Node.js',
    'Portfolio',
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: `${site.name} — ${site.role}`,
    description: site.description,
    siteName: site.name,
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.role}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: ['/og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  description: site.description,
  knowsAbout: site.stack,
  ...(siteUrl ? { url: siteUrl } : {}),
  ...(site.github && site.github !== 'https://github.com/'
    ? { sameAs: [site.github, site.linkedin].filter(Boolean) }
    : {}),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
