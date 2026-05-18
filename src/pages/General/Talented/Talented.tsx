import { useLanguage } from '@/contexts/LanguageContext';

const Talented: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pb-10">
      <div className="mt-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-[#013d8c] rounded-full shrink-0" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
            {t('nav.umumiy.talented') || 'Iqtidorli yoshlar'}
          </h1>
        </div>
        <div className="h-px bg-gray-200 mt-4" />
      </div>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <p className="text-lg text-gray-700">
          {t('pages.talented.content') || "Iqtidorli yoshlar ma'lumotlari..."}
        </p>
      </div>
    </div>
  );
};

export default Talented;
