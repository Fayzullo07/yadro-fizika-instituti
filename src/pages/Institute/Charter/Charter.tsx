import { useLanguage } from '@/contexts/LanguageContext';
import { useCharter } from '@/hooks/useCharter';
import { sanitizeHtml } from '@/utils/htmlUtils';
import PageTitle from '@/components/shared/PageTitle/PageTitle';

const Charter: React.FC = () => {
  const { t } = useLanguage();
  const { data, loading, error } = useCharter();

  const charterData = data?.data;

  return (
    <div className="bg-white shadow-lg min-h-screen">
      <section className="pb-10 md:pb-16">
        <PageTitle>{t('nav.institut.charter') || 'Institut nizomi'}</PageTitle>

        {loading && (
          <p className="mt-6 px-3 sm:px-4 text-base sm:text-lg text-gray-600">
            {t('common.loading')}
          </p>
        )}

        {error && (
          <p className="mt-6 px-3 sm:px-4 text-base sm:text-lg text-red-600">{t('common.error')}</p>
        )}

        {!loading && !error && charterData && (
          <div>
            {charterData.details && (
              <div
                className="mt-5 sm:mt-8 px-3 sm:px-4 text-sm sm:text-base text-gray-700 leading-relaxed space-y-3 sm:space-y-4 [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-6 sm:[&_h2]:mt-8 [&_p]:mt-3 sm:[&_p]:mt-4 [&_img]:max-w-full [&_table]:w-full [&_table]:overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(charterData.details) }}
              />
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Charter;
