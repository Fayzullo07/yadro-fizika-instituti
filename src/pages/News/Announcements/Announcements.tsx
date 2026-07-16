import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import { stripHtmlAndDecode } from '@/utils/htmlUtils';
import Loading from '@/components/shared/Loading/Loading';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import type { AnnouncementItem } from '@/types';

const PER_PAGE = 10;

const AnnouncementCard: React.FC<{
  item: AnnouncementItem;
  t: (k: string) => string;
}> = ({ item, t }) => {
  const preview = stripHtmlAndDecode(item.description).slice(0, 180).trim();

  return (
    <article className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-[#013d8c]/30 transition-all duration-300">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1 bg-[#013d8c] shrink-0 sm:rounded-l-xl rounded-t-xl sm:rounded-t-none min-h-1 sm:min-h-0" />

        <div className="flex flex-col flex-1 p-4 sm:p-5 gap-2 sm:gap-3">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 group-hover:text-[#013d8c] transition-colors leading-snug">
            {item.title}
          </h2>

          {preview && (
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-3">
              {preview}
              {preview.length >= 180 ? '…' : ''}
            </p>
          )}

          <div className="mt-auto pt-2">
            <Link
              to={`/news/announcements/${item.id}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#013d8c] hover:gap-2.5 transition-all duration-200"
            >
              {t('news.readMore')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

const Announcements: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { data, loading, error } = useAnnouncements(page, PER_PAGE);

  const items = data?.data ?? [];
  const totalPages = Math.ceil((data?.meta?.total || 0) / PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pb-10">
      <PageTitle>{t('nav.media.announcements')}</PageTitle>

      {loading && <Loading />}

      {error && <p className="text-center py-16 text-gray-500">{t('common.error')}</p>}

      {!loading && !error && items.length === 0 && (
        <p className="text-center py-16 text-gray-500">{t('common.notAvailable')}</p>
      )}

      {items.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {items.map((item) => (
              <AnnouncementCard key={item.id} item={item} t={t} />
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

export default Announcements;
