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
    <div className="min-h-screen">
      <div>
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Main Content */}
          <div className="flex-1">
            {/* Back Button */}
            <BackButton to="/news" label={t('backToList') || "Yangiliklar ro'yxatiga qaytish"} />

            {/* Article */}
            <article className="bg-white rounded border border-gray-200 overflow-hidden">
              {/* Image */}
              {newsItem.images && newsItem.images.length > 0 && (
                <div className="relative h-64 md:h-[500px] overflow-hidden">
                  <img
                    src={newsItem.images[0].url || newsItem.images[0].image}
                    alt={stripHtmlRegex(newsItem.title)}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-4 md:p-5">
                {newsItem.title && (
                  <h1
                    className=" mb-2"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(newsItem.title) }}
                  />
                )}

                <div className="flex items-center gap-4 mb-3 pb-3 border-b border-gray-200">
                  {newsItem.created_at && (
                    <span className="text-sm mt-2">
                      {formatDate(newsItem.created_at, language)}
                    </span>
                  )}
                </div>

                {newsItem.description && (
                  <div
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed [&_p]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_li]:mb-2 [&_img]:rounded-lg [&_img]:my-4"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(newsItem.description) }}
                  />
                )}

                {newsItem.images && newsItem.images.length > 1 && (
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <aside className="w-full lg:w-[250px] mt-12 flex-shrink-0">
              <div className="bg-white rounded border border-gray-200 p-2 sticky top-27">
                <h2 className="text-xl font-medium text-gray-900 mb-4">
                  {t('news.otherNews') || 'Boshqa yangiliklar'}
                </h2>

                {newsListLoading ? (
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-20 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className=" max-h-[calc(100vh-200px)] overflow-y-auto">
                    {otherNews.map((item) => (
                      <Link
                        key={item.id}
                        to={`/news/${item.id}`}
                        className={`block flex !items-center p-2 gap-2 transition-colors ${
                          String(item.id) === id
                            ? 'bg-blue-50 border-blue-300'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }`}
                      >
                        {item.images && item.images.length > 0 && (
                          <img
                            src={item.images[0].url || item.images[0].image}
                            alt={stripHtmlRegex(item.title)}
                            loading="lazy"
                            className="w-10 h-10 object-cover rounded"
                          />
                        )}
                        <div className="">
                          <h3
                            className="text-sm font-medium text-gray-900 line-clamp-1 mb-1"
                            dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.title) }}
                          />
                          {item.created_at && (
                            <p className="text-xs text-gray-500">
                              {formatDate(item.created_at, language)}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* View All Button */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Link to="/news" className="block w-full mb-2 text-center text-sm font-medium">
                    {t('news.viewAll') || 'Barcha yangiliklar'}
                  </Link>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
