import { useLanguage } from '@/contexts/LanguageContext';
import { useInstituteHistory } from '@/hooks/useInstituteHistory';
import { sanitizeHtml } from '@/utils/htmlUtils';
import PageTitle from '@/components/shared/PageTitle/PageTitle';

const History: React.FC = () => {
  const { t } = useLanguage();
  const { data, loading, error } = useInstituteHistory();

  const content = data?.data?.content;

  return (
    <div className="bg-white shadow-lg">
      <section className="pb-10 md:pb-16">
        <PageTitle>{t('nav.institut.history') || 'Institut tarixi'}</PageTitle>

        {loading && (
          <p className="mt-6 px-3 sm:px-4 text-base sm:text-lg text-gray-600">
            {t('common.loading')}
          </p>
        )}

        {error && (
          <p className="mt-6 px-3 sm:px-4 text-base sm:text-lg text-red-600">{t('common.error')}</p>
        )}

        {!loading && !error && content && (
          <div
            className="mt-5 sm:mt-8 px-3 sm:px-6 text-sm sm:text-base text-gray-700 leading-relaxed sm:leading-loose  [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-6 sm:[&_h2]:mt-8 [&_p]:mt-3 sm:[&_p]:mt-4 [&_img]:max-w-full [&_table]:w-full [&_table]:overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
          />
        )}
      </section>
    </div>
  );
};

export default History;
