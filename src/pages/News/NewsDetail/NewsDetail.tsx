import { useParams, Link } from 'react-router-dom';
import { useNewsById, useNews } from '@/hooks/useNews';
import { stripHtmlRegex, sanitizeHtml } from '@/utils/htmlUtils';
import { formatDate } from '@/utils/dateUtils';
import { useLanguage } from '@/contexts/LanguageContext';
import Loading from '@/components/shared/Loading/Loading';
import BackButton from '@/components/shared/BackButton/BackButton';
import type { NewsImage } from '@/types';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { data: newsItemResponse, loading, error } = useNewsById(id!);
  const newsItem = newsItemResponse?.data;
  const { data: newsListData, loading: newsListLoading } = useNews({ per_page: 10 });

  if (loading) {
    return <Loading />;
  }

  if (error || !newsItem) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 pt-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {t('news.notFound') || 'Yangilik topilmadi'}
            </h1>
            <Link to="/news" className="text-blue-600 hover:text-blue-800 font-medium">
              {t('news.backToList') || "← Yangiliklar ro'yxatiga qaytish"}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const allNews = newsListData?.data || [];
  const otherNews = allNews.filter((item) => String(item.id) !== String(newsItem.id)).slice(0, 10);
  const showSidebar = newsListLoading || otherNews.length > 0;

  return (
    <div className="pb-10">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <BackButton to="/news" label={t('backToList') || "Yangiliklar ro'yxatiga qaytish"} />

          <article className="bg-white rounded border border-gray-200 overflow-hidden">
            {/* Image */}
            {newsItem.images && newsItem.images.length > 0 && (
              <div className="w-full">
                <img
                  src={newsItem.images[0].url || newsItem.images[0].image}
                  alt={stripHtmlRegex(newsItem.title)}
                  loading="lazy"
                  className="w-full h-auto"
                />
              </div>
            )}

            <div className="p-4 md:p-6">
              {newsItem.title && (
                <h1
                  className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-snug"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(newsItem.title) }}
                />
              )}

              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
                {newsItem.created_at && (
                  <span className="text-sm text-gray-500">
                    {formatDate(newsItem.created_at, language)}
                  </span>
                )}
              </div>

              {newsItem.description && (
                <div
                  className="prose max-w-none text-gray-700 leading-relaxed
                    [&_p]:mb-4 [&_p]:text-sm [&_p]:md:text-base
                    [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-6 [&_h2]:mb-3
                    [&_h3]:text-lg [&_h3]:md:text-xl [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mt-5 [&_h3]:mb-2
                    [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1
                    [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1
                    [&_li]:text-sm [&_li]:md:text-base
                    [&_img]:w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-4"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(newsItem.description) }}
                />
              )}

              {newsItem.images && newsItem.images.length > 1 && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {newsItem.images.slice(1).map((image: NewsImage, index: number) => (
                    <img
                      key={index}
                      src={image.url || image.image}
                      alt={`${stripHtmlRegex(newsItem.title)} - ${index + 2}`}
                      loading="lazy"
                      className="w-full h-auto rounded-lg"
                    />
                  ))}
                </div>
              )}
            </div>
          </article>
        </div>

        {/* Sidebar */}
        {showSidebar && (
          <aside className="w-full lg:w-60 shrink-0">
            <div className="bg-white rounded border border-gray-200 p-3 lg:sticky lg:top-27">
              <h2 className="text-base font-semibold text-gray-900 mb-3">
                {t('news.otherNews') || 'Boshqa yangiliklar'}
              </h2>

              {newsListLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-2 animate-pulse">
                      <div className="w-12 h-12 bg-gray-200 rounded shrink-0" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-3 bg-gray-200 rounded w-full" />
                        <div className="h-3 bg-gray-200 rounded w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1 max-h-[60vh] lg:max-h-[calc(100vh-260px)] overflow-y-auto">
                  {otherNews.map((item) => (
                    <Link
                      key={item.id}
                      to={`/news/${item.id}`}
                      className={`flex items-center gap-2 p-2 rounded transition-colors ${
                        String(item.id) === id ? 'bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      {item.images && item.images.length > 0 ? (
                        <img
                          src={item.images[0].url || item.images[0].image}
                          alt={stripHtmlRegex(item.title)}
                          loading="lazy"
                          className="w-12 h-12 object-cover rounded shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded shrink-0" />
                      )}
                      <div className="min-w-0">
                        <h3
                          className="text-sm font-medium text-gray-900 line-clamp-2 mb-0.5"
                          dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.title) }}
                        />
                        {item.created_at && (
                          <p className="text-xs text-gray-400">
                            {formatDate(item.created_at, language)}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-gray-200">
                <Link
                  to="/news"
                  className="block w-full text-center text-sm font-medium text-[#013d8c] hover:underline"
                >
                  {t('news.viewAll') || 'Barcha yangiliklar'}
                </Link>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default NewsDetail;
