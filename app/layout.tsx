import './globals.css';
import '@fontsource-variable/outfit';
import { GeistSans } from 'geist/font/sans';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Providers } from './providers';
import { i18n } from '@/config/i18n';
import { generateMetadata as getMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import Script from 'next/script';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return getMetadata({ 
    locale: params.lang as typeof i18n.locales[number],
    url: 'https://qr.onivue.ch'
  });
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9179928901468615"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${GeistSans.variable} font-outfit antialiased min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary`}>
        <Providers>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer lang={params.lang} />
        </Providers>
      </body>
    </html>
  );
}