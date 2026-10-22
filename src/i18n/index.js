import { en } from './en';
import { ar } from './ar';

export const translations = { en, ar };

/**
 * Helper to retrieve nested translation string with fallback
 * Example: t('nav.home', 'Home')
 */
export function translate(lang, path, fallback = '') {
  const dict = translations[lang] || translations.en;
  const parts = path.split('.');
  let current = dict;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      // Fallback to English dictionary if not found in target lang
      let enCurrent = translations.en;
      for (const enPart of parts) {
        if (enCurrent && typeof enCurrent === 'object' && enPart in enCurrent) {
          enCurrent = enCurrent[enPart];
        } else {
          return fallback || path;
        }
      }
      return enCurrent || fallback || path;
    }
  }
  return typeof current === 'string' ? current : fallback || path;
}
