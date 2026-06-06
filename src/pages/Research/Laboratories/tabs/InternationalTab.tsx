import { useInternationalCollaboration } from '@/hooks/useDepartment';
import { useLanguage } from '@/contexts/LanguageContext';
import { sanitizeHtmlRich } from '@/utils/htmlUtils';

const InternationalTab: React.FC<{ laboratoryId: number }> = ({ laboratoryId }) => {
  const { t } = useLanguage();
  const { data, loading, error } = useInternationalCollaboration(laboratoryId);

  const details = data?.data?.details;

  return (
    <div
      className={`transition-opacity duration-200 ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
    >
      {error && <p className="text-center py-16 text-gray-500">{t('common.error')}</p>}
      {!error && !details && !loading && (
        <p className="text-center py-16 text-gray-400">{t('common.notAvailable')}</p>
      )}
      {details && (
        <div
          className="bg-white shadow-sm p-4 sm:p-6 max-w-none overflow-x-auto text-sm sm:text-base [&_table]:w-full [&_img]:max-w-full"
          dangerouslySetInnerHTML={{ __html: sanitizeHtmlRich(details) }}
        />
      )}
    </div>
  );
};

export default InternationalTab;
