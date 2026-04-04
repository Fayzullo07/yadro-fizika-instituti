export const SUPPORTED_LANGUAGES = {
  uz: 'O\'zbek',
  ru: 'Русский',
  en: 'English',
};

export const DEFAULT_LANGUAGE = 'uz';

export const getStoredLanguage = () => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  return localStorage.getItem('language') || DEFAULT_LANGUAGE;
};

export const setStoredLanguage = (lang) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('language', lang);
};

export const getBrowserLanguage = () => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  
  const browserLang = navigator.language || navigator.userLanguage;
  const langCode = browserLang.split('-')[0].toLowerCase();
  
  if (SUPPORTED_LANGUAGES[langCode]) {
    return langCode;
  }
  
  return DEFAULT_LANGUAGE;
};

