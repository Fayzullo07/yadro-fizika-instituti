import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEvents } from '@/hooks/useEvents';
import { getDayMonth } from '@/utils/dateUtils';
import Loading from '@/components/shared/Loading/Loading';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import type { EventApiItem } from '@/types';

const PER_PAGE = 10;

const EventCard: React.FC<{ item: EventApiItem; language: string; t: (k: string) => string }> = ({
  item,
  language,
  t,
}) => {
  const { day, month } = getDayMonth(item.created_at, language);

  return (
    <Link
      to={`/news/events/${item.id}`}
      className="group flex bg-white border border-gray-200  overflow-hidden hover:border-[#013d8c]/30 transition-colors duration-300"
    >
      {item.image && (
        <div className="relative w-24 sm:w-36 shrink-0 overflow-hidden">
          <img
            src={item.image}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="flex-1 flex gap-3 p-3 sm:p-4 items-start min-w-0">
        <div className="flex flex-col items-center justify-center leading-none rounded-lg bg-[#013d8c]/8 text-[#013d8c] px-2.5 py-2 shrink-0">
          <span className="text-lg sm:text-xl font-bold">{day}</span>
          <span className="text-[10px] uppercase tracking-wide mt-0.5">{month}</span>
        </div>
        <div className="min-w-0 pt-0.5">
          <h2 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-[#013d8c] transition-colors leading-snug line-clamp-3">
            {item.title}
          </h2>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#013d8c] mt-2 group-hover:gap-2.5 transition-all">
            {t('news.readMore')}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

const Events: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { data, loading, error } = useEvents({ page, per_page: PER_PAGE });

  const items = data?.data ?? [];
  const totalPages = Math.ceil((data?.meta?.total || 0) / PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pb-10">
      <PageTitle>{t('nav.media.events')}</PageTitle>

      {loading && <Loading />}

      {error && <p className="text-center py-16 text-gray-500">{t('common.error')}</p>}

      {!loading && !error && items.length === 0 && (
        <p className="text-center py-16 text-gray-500">{t('common.notAvailable')}</p>
      )}

      {items.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {items.map((item) => (
              <EventCard key={item.id} item={item} language={language} t={t} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 sm:mt-12 flex flex-wrap justify-center items-center gap-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                ← <span className="hidden sm:inline">{t('news.previous')}</span>
              </button>

              <div className="flex flex-wrap gap-2">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNum = index + 1;
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= page - 1 && pageNum <= page + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm ${
                          page === pageNum
                            ? 'bg-[#013d8c] text-white'
                            : 'bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (pageNum === page - 2 || pageNum === page + 2) {
                    return (
                      <span key={pageNum} className="px-1 sm:px-2 self-center text-sm">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                <span className="hidden sm:inline">{t('news.next')}</span> →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Events;
