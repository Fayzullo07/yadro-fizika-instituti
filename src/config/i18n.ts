import type { Language } from '@/types';

export const SUPPORTED_LANGUAGES: Record<Language, string> = {
  uz: "O'zbek",
  ru: 'Русский',
  en: 'English',
};

export const DEFAULT_LANGUAGE: Language = 'uz';

const isLanguage = (code: string): code is Language => {
  return code in SUPPORTED_LANGUAGES;
};

export const getStoredLanguage = (): string => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  return localStorage.getItem('language') || DEFAULT_LANGUAGE;
};

export const setStoredLanguage = (lang: Language): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('language', lang);
};

export const getBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  const browserLang =
    (navigator as Navigator & { userLanguage?: string }).language ||
    (navigator as Navigator & { userLanguage?: string }).userLanguage ||
    '';
  const langCode = browserLang.split('-')[0].toLowerCase();

  if (isLanguage(langCode)) {
    return langCode;
  }

  return DEFAULT_LANGUAGE;
};
