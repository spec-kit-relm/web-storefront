import { describe, expect, it } from 'vitest';
import { en, t } from './en';

describe('i18n catalog (FE-5)', () => {
  it('returns copy for every key', () => {
    for (const key of Object.keys(en) as (keyof typeof en)[]) {
      expect(t(key).length).toBeGreaterThan(0);
    }
  });
});
