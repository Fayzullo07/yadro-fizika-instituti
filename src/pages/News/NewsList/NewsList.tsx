import { useNews } from '@/hooks/useNews';
import { stripHtmlRegex, sanitizeHtml } from '@/utils/htmlUtils';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Loading from '@/components/shared/Loading/Loading';
import SectionHeader from '@/components/shared/SectionHeader/SectionHeader';

interface NewsImage {
  image: string;
}

interface NewsListItem {
  id: number;
  title: string;
  description: string;
  images: NewsImage[];
  created_at: string;
}

const LOCALE_MAP: Record<string, string> = {
  uz: 'uz-UZ',
  ru: 'ru-RU',
  en: 'en-US',
};

const NewsList: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage = 12;

  const { data, loading, error } = useNews({ page, per_page: perPage });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          {t('common.error') || 'Xatolik yuz berdi'}
        </div>
      </div>
    );
  }

  const news: NewsListItem[] = data?.results || [];
  const totalPages = Math.ceil((data?.count || 0) / perPage);

  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(LOCALE_MAP[language] || 'uz-UZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const handlePageChange = (newPage: number): void => {
    setSearchParams({ page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 md:!py-10">
        <SectionHeader
          title={t('news.title') || 'Yangiliklar'}
          subtitle={t('news.subtitle') || 'Barcha yangiliklar va e\'lonlar'}
        />

        {news.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded shadow overflow-hidden duration-300 flex flex-col"
                >
                  {/* Image */}
                  {item.images && item.images.length > 0 && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.images[0].image}
                        alt={stripHtmlRegex(item.title)}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-grow">
                    {item.title && (
                      <h3
                        className="text-xl font-semibold !line-clamp-1 text-gray-900 mb-3 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.title) }}
                      />
                    )}

                    {item.description && (
                      <div
                        className="text-gray-600 mb-4 !line-clamp-3 flex-grow"
                        dangerouslySetInnerHTML={{
                          __html: sanitizeHtml(item.description),
                        }}
                      />
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
                      {item.created_at && (
                        <span className="text-sm text-gray-500">
                          {formatDate(item.created_at)}
                        </span>
                      )}
                      <Link
                        to={`/news/${item.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        {t('news.readMore') || 'Batafsil'} →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  ← {t('news.previous') || 'Oldingi'}
                </button>

                <div className="flex gap-2">
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
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            page === pageNum
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (pageNum === page - 2 || pageNum === page + 2) {
                      return <span key={pageNum} className="px-2">...</span>;
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {t('news.next') || 'Keyingi'} →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-500 py-12">
            <p>{t('news.noNews') || 'Yangiliklar topilmadi'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsList;

