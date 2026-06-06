import { Image } from 'antd';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScientificCouncil } from '@/hooks/useCouncil';
import { sanitizeHtml } from '@/utils/htmlUtils';
import PageTitle from '@/components/shared/PageTitle/PageTitle';

const PREVIEW_LABEL: Record<string, string> = {
  uz: "Ko'rish",
  ru: 'Просмотр',
  en: 'Preview',
};

const CouncilActivities: React.FC = () => {
  const { t, language } = useLanguage();
  const { data, loading, error } = useScientificCouncil();

  const council = data?.data;

  return (
    <div className="bg-white shadow-lg">
      <section className="pb-10 sm:pb-16">
        <PageTitle>
          {t('nav.ilmiyFaoliyat.councilActivities') || 'Ilmiy kengash faoliyati'}
        </PageTitle>

        {loading && (
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600">{t('common.loading')}</p>
        )}

        {error && (
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-red-600">{t('common.error')}</p>
        )}

        {!loading && !error && council && (
          <div>
            {council.image && (
              <div className="relative w-full h-52 sm:h-80 md:h-115 overflow-hidden flex items-center justify-center bg-gray-100 [&_.ant-image]:w-full [&_.ant-image]:h-full [&_.ant-image-img]:w-full [&_.ant-image-img]:h-full [&_.ant-image-img]:object-contain">
                <div
                  className="absolute inset-0 bg-cover bg-center scale-110 blur-md opacity-40"
                  style={{ backgroundImage: `url(${council.image})` }}
                />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <Image
                    src={council.image}
                    alt={council.title}
                    style={{ inlineSize: '100%', blockSize: '100%', objectFit: 'contain' }}
                    preview={{
                      mask: (
                        <span className="text-white text-sm">
                          {PREVIEW_LABEL[language] ?? PREVIEW_LABEL.uz}
                        </span>
                      ),
                    }}
                  />
                </div>
              </div>
            )}

            {council.title && (
              <h2 className="mt-4 sm:mt-8 px-3 text-base sm:text-xl font-semibold text-gray-900">
                {council.title}
              </h2>
            )}

            {council.council_duties && (
              <div
                className="mt-3 sm:mt-4 px-3 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3 sm:space-y-4 [&_h2]:text-lg sm:[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-4 sm:[&_h2]:mt-8 [&_p]:mt-2 sm:[&_p]:mt-4 [&_img]:max-w-full [&_table]:w-full overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(council.council_duties) }}
              />
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default CouncilActivities;
