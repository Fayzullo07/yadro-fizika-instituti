import { useNews } from '@/hooks/useNews';
import { stripHtmlRegex } from '@/utils/htmlUtils';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeader from '@/components/shared/SectionHeader/SectionHeader';
import type { NewsItem } from '@/types';

const NewsSection: React.FC = () => {
  const { data, loading, error } = useNews({ per_page: 5 });
  const { t } = useLanguage();
  const news: NewsItem[] = data?.results || [];

  // Color classes for news cards
  const cardColors: string[] = [
    'bg-blue-600',
    'bg-green-600',
    'bg-red-500',
    'bg-purple-600',
  ];

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeader
            title={t('news.title') || 'Yangiliklar'}
            subtitle={t('news.subtitle') || 'So\'nggi yangiliklar va e\'lonlar'}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-96 bg-gray-200 rounded animate-pulse"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !news.length) {
    return null;
  }

  const mainNews: NewsItem = news[0];
  const otherNews: NewsItem[] = news.slice(1, 5);

  return (
    <section className="py-16 mx-auto">
      <div className="container mx-auto px-4">
        <SectionHeader
          title={t('news.title') || 'Yangiliklar'}
          subtitle={t('news.subtitle') || 'So\'nggi yangiliklar va e\'lonlar'}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Left Side - Main News */}
          {mainNews && (
            <div className="lg:col-span-2 relative">
              <Link to={`/news/${mainNews.id}`} className="block group">
                <div className="relative h-[600px] rounded overflow-hidden shadow-xl">
                  {/* Main Image */}
                  {mainNews.images && mainNews.images.length > 0 && (
                    <img
                      src={mainNews.images[0].image}
                      alt={stripHtmlRegex(mainNews.title)}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Date Tag */}
                  {mainNews.created_at && (
                    <div className="absolute top-4 left-4 bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-semibold">
                      {(mainNews.created_at)}
                    </div>
                  )}

                  {/* Overlay with Title */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[#013d8c] p-6">
                    {mainNews.title && (
                      <h3
                        className="text-white text-xl font-semibold line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: mainNews.title }}
                      />
                    )}
                  </div>

                  {/* Floating Action Buttons */}
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-10">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        // Audio functionality
                      }}
                      className="w-12 h-12 bg-[#013d8c] hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                      aria-label="Audio"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (typeof window !== 'undefined' && navigator.share) {
                          navigator.share({
                            title: stripHtmlRegex(mainNews.title),
                            url: typeof window !== 'undefined' ? window.location.origin + `/news/${mainNews.id}` : '',
                          });
                        }
                      }}
                      className="w-12 h-12 bg-[#013d8c] hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                      aria-label="Share"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        // Additional functionality
                      }}
                      className="w-12 h-12 bg-[#013d8c] hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                      aria-label="More"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Right Side - Other News Cards */}
          <div className="lg:col-span-2 space-y-4">
            {/* Top News - Full Width */}
            {otherNews[0] && (
              <Link
                key={otherNews[0].id}
                to={`/news/${otherNews[0].id}`}
                className="block group"
              >
                <div className={`${cardColors[0]} rounded overflow-hidden shadow-lg hover:shadow-xl transition-all relative h-[285px]`}>
                  {/* Background Image */}
                  {otherNews[0].images && otherNews[0].images.length > 0 && (
                    <div className="absolute inset-0">
                      <img
                        src={otherNews[0].images[0].image}
                        alt={stripHtmlRegex(otherNews[0].title)}
                        className="w-full h-full object-cover opacity-30"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative h-full p-4 flex flex-col justify-between">
                    {/* Date Tag */}
                    {otherNews[0].created_at && (
                      <div className="text-white/90 text-xs font-medium mb-2">
                        {(otherNews[0].created_at)}
                      </div>
                    )}

                    {/* Title */}
                    {otherNews[0].title && (
                      <h4
                        className="text-white text-sm font-semibold line-clamp-2 group-hover:underline"
                        dangerouslySetInnerHTML={{ __html: otherNews[0].title }}
                      />
                    )}
                  </div>
                </div>
              </Link>
            )}

            {/* Bottom Two News - Side by Side */}
            <div className="grid grid-cols-2 gap-4">
              {otherNews.slice(1, 3).map((item, index) => (
                <Link
                  key={item.id}
                  to={`/news/${item.id}`}
                  className="block group"
                >
                  <div className={`${cardColors[index + 1]} rounded overflow-hidden shadow-lg hover:shadow-xl transition-all relative h-[300px]`}>
                    {/* Background Image */}
                    {item.images && item.images.length > 0 && (
                      <div className="absolute inset-0">
                        <img
                          src={item.images[0].image}
                          alt={stripHtmlRegex(item.title)}
                          className="w-full h-full object-cover opacity-30"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="relative h-full p-3 flex flex-col justify-between">
                      {/* Date Tag */}
                      {item.created_at && (
                        <div className="text-white/90 text-xs font-medium mb-1">
                          {(item.created_at)}
                        </div>
                      )}

                      {/* Title */}
                      {item.title && (
                        <h4
                          className="text-white text-xs font-semibold line-clamp-2 group-hover:underline"
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {data?.count > 5 && (
          <div className="text-center mt-8">
            <Link
              to="/news"
              className="inline-block px-6 py-2.5 border bg-[#013d8c] text-white border-[#013d8c] text-gray-700 rounded hover:border-gray-400 hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              {t('news.viewAll') || 'Barcha yangiliklar'}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
