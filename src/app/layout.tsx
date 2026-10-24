import React from 'react';
import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Inter, Fraunces } from 'next/font/google';
import '../styles/tailwind.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono-ibm',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fbf7ec',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://aryansurya.com'),
  title: 'Aryan Surya S — Computer Science & AI Builder',
  description: 'Building high-performance full-stack applications with a focus on computer vision and cosmic web experiences.',
  openGraph: {
    title: 'Aryan Surya S',
    description: 'Computer Science & AI Builder',
    url: 'https://aryansurya.com',
    siteName: 'Aryan Surya Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aryan Surya S',
    description: 'Computer Science & AI Builder',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable} ${fraunces.variable} scroll-smooth`}>
      <body className="antialiased selection:bg-[var(--wine)] selection:text-white">
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
