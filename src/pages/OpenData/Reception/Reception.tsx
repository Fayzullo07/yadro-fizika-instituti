import { useLanguage } from '@/contexts/LanguageContext';

const Reception: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pb-10">
      <div className="mt-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-[#013d8c] rounded-full shrink-0" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
            {t('nav.ochiq.reception') || 'Rahbariyat qabul kunlari'}
          </h1>
        </div>
        <div className="h-px bg-gray-200 mt-4" />
      </div>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <p className="text-lg text-gray-700">
          {t('pages.reception.content') || "Rahbariyat qabul kunlari ma'lumotlari..."}
        </p>
      </div>
    </div>
  );
};

export default Reception;
