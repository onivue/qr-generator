import { QRCodeGeneratorClient } from '@/components/qr-code-generator-client';
import { i18n } from '@/config/i18n';
import { getDictionary } from '@/lib/dictionary';

interface PageProps {
  params: { lang: string };
}

export default async function LocalizedPage({ params }: PageProps) {
  // Validate locale
  if (!i18n.locales.includes(params.lang as (typeof i18n.locales)[number])) {
    return null;
  }

  const dict = await getDictionary((await params).lang as (typeof i18n.locales)[number]);
  return <QRCodeGeneratorClient dict={dict} />;
}
