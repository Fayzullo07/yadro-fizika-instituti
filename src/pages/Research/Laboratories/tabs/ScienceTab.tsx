import { useScientificActivity } from '@/hooks/useDepartment';
import { useLanguage } from '@/contexts/LanguageContext';
import { sanitizeHtmlRich } from '@/utils/htmlUtils';

const ScienceTab: React.FC<{ laboratoryId: number }> = ({ laboratoryId }) => {
  const { t } = useLanguage();
  const { data, loading, error } = useScientificActivity(laboratoryId);

  const content = data?.data?.content;

  return (
    <div
      className={`transition-opacity duration-200 ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
    >
      {error && <p className="text-center py-16 text-gray-500">{t('common.error')}</p>}
      {!error && !content && !loading && (
        <p className="text-center py-16 text-gray-400">{t('common.notAvailable')}</p>
      )}
      {content && (
        <div
          className="bg-white shadow-sm p-4 sm:p-6 max-w-none overflow-x-auto text-sm sm:text-base [&_table]:w-full [&_img]:max-w-full"
          dangerouslySetInnerHTML={{ __html: sanitizeHtmlRich(content) }}
        />
      )}
    </div>
  );
};

export default ScienceTab;
