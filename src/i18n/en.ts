// i18n catalog (FE-5): every user-facing string lives here, keyed by feature.
export const en = {
  'home.title': 'Relm Store',
  'home.cta': 'Go to checkout',
  'checkout.title': 'Checkout',
  'checkout.placeholder': 'Checkout is being rebuilt for RELM-2 (stock reservation).',
} as const;

export type MessageKey = keyof typeof en;
export const t = (key: MessageKey): string => en[key];
