import { useLanguage } from '@/contexts/LanguageContext';
import { useLaboratory } from '@/hooks/useDepartment';
import Loading from '@/components/shared/Loading/Loading';
import { Link } from 'react-router-dom';

const Laboratories = () => {
  const { t } = useLanguage();
  const { data: laboratoryData, loading, error } = useLaboratory();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          {t('common.error') || 'Xatolik yuz berdi'}
        </div>
      </div>
    );
  }

  const allLaboratories = laboratoryData?.results || [];
  
  // Default laboratoriya nomlari
  const defaultLaboratoryNames = [
    "Bino va inshootlarning zilzilabardoshligi laboratoriyasi",
    "Sun'iy intellekt texnologiyalari va raqamli qurilishni rivojlantirish laboratoriyasi",
    "Geotexnika, gruntlar mexanikasi va qurilish materiallari laboratoriyasi",
    "Barqaror konstruktiv yechimlar, shaharsozlik va infratuzilma laboratoriyasi",
    "\"Yashil\" qurilish, energiya samarador va muqobil texnologiyalar laboratoriyasi",
    "Zilzilabardoshlik bo'yicha ekspertlar guruhi (shartnomalarga muvofiq jalb qilinadi)",
  ];

  // Agar API dan kamroq ma'lumot kelsa, 6 tagacha to'ldirish
  const ensureSixLaboratories = () => {
    // Agar API dan ma'lumot bo'lsa, ularni ishlatamiz, aks holda default nomlarni ishlatamiz
    if (allLaboratories.length === 0) {
      // API dan ma'lumot kelmagan bo'lsa, barcha default nomlarni qaytaramiz
      return defaultLaboratoryNames.map((name, index) => ({
        id: `default-${index + 1}`,
        name: name,
        number: index === 5 ? 15 : 6,
      }));
    }
    
    const labs = [...allLaboratories];
    
    // Agar 6 tadan kam bo'lsa, default ma'lumotlar qo'shish
    while (labs.length < 6) {
      const defaultIndex = labs.length;
      labs.push({
        id: `default-${labs.length + 1}`,
        name: defaultLaboratoryNames[defaultIndex] || `Laboratoriya ${labs.length + 1}`,
        number: labs.length === 5 ? 15 : 6,
      });
    }
    
    // Agar API dan 6 tadan ko'p bo'lsa, faqat birinchi 6 tasini olamiz
    // Va agar API dan kelgan nomlar bo'sh bo'lsa, default nomlarni ishlatamiz
    return labs.slice(0, 6).map((lab, index) => ({
      ...lab,
      name: lab.name || defaultLaboratoryNames[index] || `Laboratoriya ${index + 1}`,
    }));
  };
  
  const laboratories = ensureSixLaboratories();

  // Default iconlar (har bir laboratoriya uchun)
  const getDefaultIcon = (index) => {
    // Oddiy icon SVG - har bir laboratoriya uchun bir xil icon
    return (
      <path
        key={`icon-${index}`}
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
        fill="currentColor"
      />
    );
  };

  return (
    <div className="py-4">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">

          {t('nav.tadqiqot.laboratories') || 'Laboratoriyalar'}
        </h1>

        {laboratories.length > 0 ? (
          <div className="relative max-w-6xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-400 transform -translate-x-1/2 hidden md:block"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative">
              {laboratories.map((laboratory, index) => {
                const isLeftColumn = index % 2 === 0;
                return (
                  <div
                    key={laboratory.id || index}
                    className={`relative ${
                      isLeftColumn ? 'md:pr-8' : 'md:pl-8'
                    }`}
                  >
                    <div
                      className={`hidden md:block absolute top-1/2 ${
                        isLeftColumn ? 'right-0' : 'left-0'
                      } w-8 h-0.5 bg-gray-400 transform -translate-y-1/2`}
                    ></div>

                    <Link
                      to={`/tadqiqot/laboratories/${index + 1}`}
                      className="block bg-white border border-gray-300 rounded-xl p-8 h-full relative hover:border-gray-500 hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      <div className="mb-4">
                        <svg
                          className="w-12 h-12 text-gray-700"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {laboratory.icon || getDefaultIcon(index)}
                        </svg>
                      </div>

                      <div className="mb-4">
                        {laboratory.name ? (
                          <div className="!text-gray-800 font-medium text-[15px] md:text-base leading-[1.7] tracking-wide " dangerouslySetInnerHTML={{ __html: laboratory.name }} />
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            <p>{t('pages.laboratories.noLaboratories') || 'Laboratoriyalar topilmadi'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Laboratories;

