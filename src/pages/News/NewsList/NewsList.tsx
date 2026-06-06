import { useNews } from '@/hooks/useNews';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Loading from '@/components/shared/Loading/Loading';
import NewsCard from '@/components/NewsSection/NewsCard';
import PageTitle from '@/components/shared/PageTitle/PageTitle';

import type { NewsItem } from '@/types';

const NewsList: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage = 12;

  const { data, loading, error } = useNews({ page, per_page: perPage });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="py-8 text-center text-red-600">{t('common.error')}</div>;
  }

  const news: NewsItem[] = data?.data || [];
  const totalPages = Math.ceil((data?.meta?.total || 0) / perPage);

  const handlePageChange = (newPage: number): void => {
    setSearchParams({ page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pb-10">
      <PageTitle>{t('news.title') || 'Yangiliklar'}</PageTitle>

      {news.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {news.map((item) => (
              <div key={item.id} className="overflow-hidden">
                <NewsCard item={item} />
              </div>
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
                            ? 'bg-blue-600 text-white'
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
      ) : (
        <div className="text-center text-gray-500 py-12 text-sm sm:text-base">
          <p>{t('news.noNews')}</p>
        </div>
      )}
    </div>
  );
};

export default NewsList;
