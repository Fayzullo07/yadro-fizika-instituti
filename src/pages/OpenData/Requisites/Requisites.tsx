import { useLanguage } from '@/contexts/LanguageContext';

const Requisites: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pb-10">
      <div className="mt-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-[#013d8c] rounded-full shrink-0" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
            {t('nav.ochiq.requisites') || 'Institut rekvizitlari'}
          </h1>
        </div>
        <div className="h-px bg-gray-200 mt-4" />
      </div>
      <div>
        <div className="space-y-8">
          {/* Institut Rekvizitlari Section */}
          <div className="">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
              Institut rekvizitlari
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Institut nomi:</p>
                <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                  O'zbekiston Respublikasi Raqamli texnologiyalar vazirligi huzuridagi Raqamli
                  texnologiyalar va sun'iy intellektni rivojlantirish ilmiy-tadqiqot instituti
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Manzil:</p>
                <p className="text-base md:text-lg text-gray-900">
                  100125, Toshkent sh., Mirzo Ulug'bek tumani, Bo'z-2, 17A
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">STIR:</p>
                  <p className="text-base md:text-lg text-gray-900 font-mono">308927120</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">OKONX:</p>
                  <p className="text-base md:text-lg text-gray-900 font-mono">95120</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">IFUT:</p>
                  <p className="text-base md:text-lg text-gray-900 font-mono">
                    72190{' '}
                    <span className="text-sm text-gray-600 font-normal">
                      (Tabiiy fanlar va injeneriya sohasidagi boshqa tadqiqotlar va ishlanmalar)
                    </span>
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">KTUT:</p>
                  <p className="text-base md:text-lg text-gray-900 font-mono">31222444</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requisites;
