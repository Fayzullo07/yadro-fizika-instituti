import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SUPPORTED_LANGUAGES } from "@/config/i18n";
import uzFlag from "@/assets/flags/uz.png";
import ruFlag from "@/assets/flags/ru.svg";
import enFlag from "@/assets/flags/en.svg";

const LanguageSwitcher = ({ variant = "desktop" }) => {
  const { language, changeLanguage } = useLanguage();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const isMobile = variant === "mobile";

  const flags = {
    uz: uzFlag,
    ru: ruFlag,
    en: enFlag,
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
        className={`flex items-center ${isMobile ? "gap-1 px-2 !py-1" : "gap-2 px-3 py-2"} text-gray-700 hover:text-blue-600 transition border border-gray-400 rounded-md hover:border-blue-600`}
      >
        <img
          src={flags[language]}
          alt={`${language} flag`}
          className={`${isMobile ? "w-5 h-5" : "w-6 h-6"} rounded-full object-cover`}
        />
        <span className={`uppercase font-medium ${isMobile ? "text-xs" : "text-xs xl:text-sm"}`}>
          {language}
        </span>
        <svg
          className={`${isMobile ? "w-3 h-3" : "w-4 h-4"} transition-transform ${isLangMenuOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isLangMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsLangMenuOpen(false)}
          />
          <div className={`absolute ${isMobile ? "right-0" : "right-0"} mt-2 ${isMobile ? "w-32" : "w-40"} bg-white border border-gray-200 rounded-md shadow-lg z-20`}>
            {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
              <button
                key={code}
                onClick={() => {
                  changeLanguage(code);
                  setIsLangMenuOpen(false);
                }}
                className={`w-full text-left flex items-center gap-2 ${isMobile ? "px-3 py-2 text-sm" : "px-4 py-2"} hover:bg-gray-100 transition ${
                  language === code ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700"
                }`}
              >
                <img
                  src={flags[code]}
                  alt={`${code} flag`}
                  className="w-6 h-6 rounded-full object-cover"
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
