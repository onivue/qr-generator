import { i18n } from '@/config/i18n';

export const languages = {
  en: {
    name: 'English',
    flag: '🇬🇧'
  },
  de: {
    name: 'Deutsch',
    flag: '🇩🇪'
  }
} as const;

export type LanguageCode = keyof typeof languages;

// Type guard to check if a string is a valid language code
export function isValidLanguage(code: string): code is LanguageCode {
  return code in languages;
}

// Get language info with type safety
export function getLanguageInfo(code: string) {
  if (!isValidLanguage(code)) {
    return languages[i18n.defaultLocale];
  }
  return languages[code];
}