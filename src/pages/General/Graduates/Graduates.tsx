import { useLanguage } from '@/contexts/LanguageContext';

const Graduates: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
        {t('nav.umumiy.graduates') || 'Bitiruvchilar'}
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <p className="text-lg text-gray-700">
          {t('pages.graduates.content') || 'Bitiruvchilar ma\'lumotlari...'}
        </p>
      </div>
    </div>
  );
};

export default Graduates;

