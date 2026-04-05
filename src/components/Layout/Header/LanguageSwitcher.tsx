import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SUPPORTED_LANGUAGES } from '@/config/i18n';
import uzFlag from '@/assets/flags/uz.png';
import ruFlag from '@/assets/flags/ru.svg';
import enFlag from '@/assets/flags/en.svg';
import type { Language } from '@/types';

interface LanguageSwitcherProps {
  variant?: 'desktop' | 'mobile';
  isScrolled?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'desktop',
  isScrolled = true,
}) => {
  const { language, changeLanguage } = useLanguage();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const isMobile = variant === 'mobile';

  const flags: Record<Language, string> = {
    uz: uzFlag,
    ru: ruFlag,
    en: enFlag,
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
        className={`flex items-center ${isMobile ? 'gap-1 px-2 py-1' : 'gap-2 px-3 py-2'} rounded-full transition-all duration-300 ${
          isScrolled
            ? 'text-gray-700 border border-gray-200 hover:border-blue-400 hover:text-blue-600'
            : 'text-white/80 border border-white/20 hover:border-white/40 hover:text-white'
        }`}
      >
        <img
          src={flags[language]}
          alt={`${language} flag`}
          className={`${isMobile ? 'w-5 h-5' : 'w-5 h-5'} rounded-full object-cover`}
        />
        <span className={`uppercase font-medium ${isMobile ? 'text-xs' : 'text-xs'}`}>
          {language}
        </span>
        <svg
          className={`${isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'} transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isLangMenuOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsLangMenuOpen(false)} />
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 z-20 overflow-hidden">
            {(Object.entries(SUPPORTED_LANGUAGES) as [Language, string][]).map(([code, name]) => (
              <button
                key={code}
                onClick={() => {
                  changeLanguage(code);
                  setIsLangMenuOpen(false);
                }}
                className={`w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-gray-50 transition ${
                  language === code ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                }`}
              >
                <img
                  src={flags[code]}
                  alt={`${code} flag`}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span>{name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
