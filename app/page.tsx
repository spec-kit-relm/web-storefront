import Link from 'next/link';
import { t } from '@/i18n/en';

export default function Home() {
  return (
    <main>
      <h1>{t('home.title')}</h1>
      <Link href="/checkout">{t('home.cta')}</Link>
    </main>
  );
}
