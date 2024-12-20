import { Metadata } from 'next';
import { Locale } from '@/config/i18n';

interface MetadataOptions {
  locale: Locale;
  url: string;
}

export function generateMetadata({ locale, url }: MetadataOptions): Metadata {
  const isGerman = locale === 'de';

  const title = isGerman 
    ? 'QR-Code Generator | Erstellen Sie QR-Codes' 
    : 'QR Code Generator | Create Custom QR Codes';

  const description = isGerman
    ? 'Erstellen Sie individuell gestaltete QR-Codes mit verschiedenen Designs. Kostenloser Online QR-Code Generator mit herunterladbaren QR-Codes in hoher Qualität.'
    : 'Create custom styled QR codes with various designs. Free online QR code generator with downloadable high-quality QR codes.';

  return {
    metadataBase: new URL(url),
    title: {
      template: '%s | QR Code Generator',
      default: title
    },
    description,
    keywords: ['QR code generator', 'custom QR codes', 'QR code design', 'QR code creator', 'free QR code generator'],
    authors: [{ name: 'Albin Hoti' }],
    creator: 'Albin Hoti',
    publisher: 'Albin Hoti',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: isGerman ? 'de_DE' : 'en_US',
      url,
      title,
      description,
      siteName: 'QR Code Generator',
      images: [{
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'QR Code Generator Preview'
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
    alternates: {
      languages: {
        'en-US': '/en',
        'de-DE': '/de'
      }
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}