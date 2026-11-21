import { t } from '@/i18n/en';

// RELM-1 replaces this placeholder with the reservation-aware checkout
// (see specs/001-stock-reservation/plan.md → UI states).
export default function CheckoutPage() {
  return (
    <main aria-labelledby="checkout-title">
      <h1 id="checkout-title">{t('checkout.title')}</h1>
      <p>{t('checkout.placeholder')}</p>
    </main>
  );
}
