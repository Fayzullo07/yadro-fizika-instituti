import { useLanguage } from '@/contexts/LanguageContext';

const Calendar: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pb-10">
      <div className="mt-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-[#013d8c] rounded-full shrink-0" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
            {t('nav.institute.calendar') || 'Voqealar taqvimi'}
          </h1>
        </div>
        <div className="h-px bg-gray-200 mt-4" />
      </div>

      <section className="text-center py-12">
        <div className="flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-[#013d8c]/10 flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-[#013d8c]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {t('pages.calendar.comingSoon') || "Tez orada qo'shiladi"}
          </h2>
          <p className="text-gray-600 text-lg max-w-md">
            {t('pages.calendar.comingSoonDescription') ||
              "Voqealar taqvimi bo'limi hozircha tayyorlanmoqda. Tez orada bu bo'limda barcha voqealar bilan tanishishingiz mumkin bo'ladi."}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Calendar;
