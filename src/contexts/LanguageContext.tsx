import { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_LANGUAGE, getStoredLanguage, setStoredLanguage, getBrowserLanguage } from '@/config/i18n';
import uzTranslations from '@/locales/uz/common.json';
import ruTranslations from '@/locales/ru/common.json';
import enTranslations from '@/locales/en/common.json';

const translations = {
  uz: uzTranslations,
  ru: ruTranslations,
  en: enTranslations,
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const stored = getStoredLanguage();
    return stored || getBrowserLanguage();
  });

  useEffect(() => {
    setStoredLanguage(language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const changeLanguage = (lang) => {
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

