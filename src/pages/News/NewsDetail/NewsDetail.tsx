import { useParams, Link } from 'react-router-dom';
import { Image } from 'antd';
import { useNewsById, useNews } from '@/hooks/useNews';
import { stripHtmlRegex, sanitizeHtml } from '@/utils/htmlUtils';
import { formatDate } from '@/utils/dateUtils';
import { useLanguage } from '@/contexts/LanguageContext';
import { useImageRetry } from '@/hooks/useImageRetry';
import Loading from '@/components/shared/Loading/Loading';
import BackButton from '@/components/shared/BackButton/BackButton';
import RetryImage from '@/components/shared/RetryImage/RetryImage';
import GalleryImageTile from '@/components/shared/GalleryImageTile/GalleryImageTile';
import type { NewsImage } from '@/types';

const PREVIEW_LABEL: Record<string, string> = {
  uz: "Ko'rish",
  ru: 'Просмотр',
  en: 'Preview',
};

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { data: newsItemResponse, loading, error } = useNewsById(id!);
  const newsItem = newsItemResponse?.data;
  const { data: newsListData, loading: newsListLoading } = useNews({ per_page: 10 });
  const { retryKey: heroRetryKey, handleError: handleHeroError } = useImageRetry();

  if (loading) {
    return <Loading />;
  }

  if (error || !newsItem) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-lg sm:text-2xl font-bold text-gray-900 mb-4">{t('news.notFound')}</h1>
        <Link
          to="/news"
          className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
        >
          {t('news.backToList')}
        </Link>
      </div>
    );
  }

  const previewLabel = PREVIEW_LABEL[language] ?? PREVIEW_LABEL.uz;
  const newsTitle = stripHtmlRegex(newsItem.title);
  // The API fills either field depending on the endpoint version; drop
  // entries that carry neither so the grid never renders an empty tile.
  const images = (newsItem.images ?? [])
    .map((image: NewsImage) => ({ id: image.id, src: image.url || image.image }))
    .filter((image): image is { id: string | number; src: string } => Boolean(image.src));
  const hero = images[0];
  const gridImages = images.slice(1);

  const allNews = newsListData?.data || [];
  const otherNews = allNews.filter((item) => String(item.id) !== String(newsItem.id)).slice(0, 10);
  const showSidebar = newsListLoading || otherNews.length > 0;

  return (
    <div className="pb-10">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <BackButton to="/news" label={t('backToList') || "Yangiliklar ro'yxatiga qaytish"} />

          <article className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <Image.PreviewGroup>
              {/* Hero image */}
              {hero && (
                <div className="relative w-full h-52 sm:h-72 md:h-96 overflow-hidden bg-gray-100">
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${hero.src})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'blur(20px)',
                      transform: 'scale(1.15)',
                    }}
                  />
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <Image
                      key={heroRetryKey}
                      src={hero.src}
                      alt={newsTitle}
                      placeholder={<div className="absolute inset-0 bg-gray-200 animate-pulse" />}
                      onError={handleHeroError}
                      preview={{ mask: <span className="text-xs sm:text-sm">{previewLabel}</span> }}
                      rootClassName="!w-full !h-full !bg-transparent"
                      style={{ inlineSize: '100%', blockSize: '100%', objectFit: 'contain' }}
                    />
                  </div>
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
                    <span className="flex items-center gap-1.5 text-gray-400 text-xs sm:text-sm">
                      <svg
                        className="w-3.5 h-3.5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
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
              </div>

              {/* Remaining images, laid out like the photo gallery */}
              {gridImages.length > 0 && (
                <div className="px-4 md:px-6 pb-4 md:pb-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                    {gridImages.map((image, index) => (
                      <GalleryImageTile
                        key={image.id ?? index}
                        src={image.src}
                        alt={`${newsTitle} - ${index + 2}`}
                        previewLabel={previewLabel}
                      />
                    ))}
                  </div>
                </div>
              )}
            </Image.PreviewGroup>
          </article>
        </div>

        {/* Sidebar */}
        {showSidebar && (
          <aside className="w-full lg:w-60 shrink-0 mt-2 lg:mt-0">
            <div className="bg-white rounded border border-gray-200 p-3 lg:sticky lg:top-27">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">
                {t('news.otherNews')}
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
                        <RetryImage
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
                  {t('news.viewAll')}
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
