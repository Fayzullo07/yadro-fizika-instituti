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
      <section className="pb-16">
        <PageTitle>{t('nav.institut.history') || 'Institut tarixi'}</PageTitle>

        {loading && <p className="mt-6 text-lg text-gray-600">{t('common.loading')}</p>}

        {error && <p className="mt-6 text-lg text-red-600">{t('common.error')}</p>}

        {!loading && !error && content && (
          <div
            className="mt-8 px-3 text-gray-700 leading-relaxed space-y-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_p]:mt-4"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
          />
        )}
      </section>
    </div>
  );
};

export default History;
