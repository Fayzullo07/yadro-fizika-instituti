import { useLanguage } from '@/contexts/LanguageContext';
import { useUniqueObjects } from '@/hooks/useDepartment';
import Loading from '@/components/shared/Loading/Loading';
import { Link } from 'react-router-dom';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import { formatDate } from '@/utils/dateUtils';
import { UNIQUE_OBJECTS_PATH } from '@/routes/path';

const UniqueObjects: React.FC = () => {
  const { t, language } = useLanguage();
  const { data, loading, error } = useUniqueObjects();

  const items = data?.data ?? [];

  return (
    <div className="pb-10">
      <PageTitle>{t('nav.laboratoriyalar.uniqueObjects') || 'Noyob obyektlar'}</PageTitle>

      {loading && <Loading />}
      {error && <p className="text-center py-16 text-gray-500">{t('common.error')}</p>}
      {!loading && !error && items.length === 0 && (
        <p className="text-center py-16 text-gray-500">{t('common.notAvailable')}</p>
      )}
      {!loading && !error && items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
          {items.map((item, index) => (
            <Link
              key={item.id}
              to={`${UNIQUE_OBJECTS_PATH}/${item.id}`}
              className="group relative flex flex-col bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="h-1 w-full bg-[#013d8c]" />

              <div className="p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 flex-1">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-[#013d8c]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 3v7.5L6 17.5A2 2 0 008 20h8a2 2 0 002-1.5L15 10.5V3M9 3h6"
                      />
                    </svg>
                  </div>
                  <span
                    className="text-2xl sm:text-3xl font-black select-none leading-none"
                    style={{
                      background: 'linear-gradient(135deg, #013d8c, #60a5fa)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-gray-800 font-semibold text-sm sm:text-base leading-relaxed group-hover:text-[#013d8c] transition-colors flex-1">
                  {item.name}
                </h3>

                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400">
                    {formatDate(item.created_at, language)}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-[#013d8c] group-hover:underline">
                    {t('news.detail')}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default UniqueObjects;
