import { redirect } from 'next/navigation';
import { i18n } from '@/config/i18n';

// Root page redirects to default locale
export default function RootPage() {
  redirect(`/${i18n.defaultLocale}`);
}