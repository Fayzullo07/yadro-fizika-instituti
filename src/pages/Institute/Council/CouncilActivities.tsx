import { useLanguage } from '@/contexts/LanguageContext';
import { useScientificCouncil } from '@/hooks/useCouncil';
import { sanitizeHtml } from '@/utils/htmlUtils';
import PageTitle from '@/components/shared/PageTitle/PageTitle';

const CouncilActivities: React.FC = () => {
  const { t } = useLanguage();
  const { data, loading, error } = useScientificCouncil();

  const council = data?.data;

  return (
    <div className="bg-white shadow-lg">
      <section className="pb-16">
        <PageTitle>
          {t('nav.ilmiyFaoliyat.councilActivities') || 'Ilmiy kengash faoliyati'}
        </PageTitle>

        {loading && <p className="mt-6 text-lg text-gray-600">{t('common.loading')}</p>}

        {error && <p className="mt-6 text-lg text-red-600">{t('common.error')}</p>}

        {!loading && !error && council && (
          <div>
            {council.image && (
              <img
                src={council.image}
                alt={council.title}
                loading="lazy"
                className="w-full max-h-115 object-cover"
              />
            )}

            {council.title && (
              <h2 className="mt-8 px-3 text-xl font-semibold text-gray-900">{council.title}</h2>
            )}

            {council.council_duties && (
              <div
                className="mt-4 px-3 text-gray-700 leading-relaxed space-y-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_p]:mt-4"
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
