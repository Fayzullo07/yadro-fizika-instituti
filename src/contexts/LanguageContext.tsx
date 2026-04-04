import { createContext, useContext, useState, useEffect } from 'react';
import {
  DEFAULT_LANGUAGE,
  getStoredLanguage,
  setStoredLanguage,
  getBrowserLanguage,
} from '@/config/i18n';
import uzTranslations from '@/locales/uz/common.json';
import ruTranslations from '@/locales/ru/common.json';
import enTranslations from '@/locales/en/common.json';
import { Language, LanguageContextType } from '@/types';

const translations: Record<Language, Record<string, unknown>> = {
  uz: uzTranslations,
  ru: ruTranslations,
  en: enTranslations,
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = getStoredLanguage();
    return (stored || getBrowserLanguage()) as Language;
  });

  useEffect(() => {
    setStoredLanguage(language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations[language];

    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }

    return (value as string) || key;
  };

  const changeLanguage = (lang: Language): void => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
