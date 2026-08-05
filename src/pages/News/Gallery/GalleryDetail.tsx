import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Image } from 'antd';
import { useGalleryById, useGalleries } from '@/hooks/useGalleries';
import { useLanguage } from '@/contexts/LanguageContext';
import { useImageRetry } from '@/hooks/useImageRetry';
import { formatDate } from '@/utils/dateUtils';
import Loading from '@/components/shared/Loading/Loading';
import BackButton from '@/components/shared/BackButton/BackButton';
import RetryImage from '@/components/shared/RetryImage/RetryImage';
import type { Language, GalleryDetailItem } from '@/types';

const PREVIEW_LABEL: Record<Language, string> = {
  uz: "Ko'rish",
  ru: 'Просмотр',
  en: 'Preview',
};

const getTitle = (
  item: { title_uz: string; title_ru: string; title_en: string },
  language: Language
) => {
  if (language === 'ru') return item.title_ru;
  if (language === 'en') return item.title_en;
  return item.title_uz;
};

const SubImage: React.FC<{ image: { id: number; image: string }; previewLabel: string }> = ({
  image,
  previewLabel,
}) => {
  const { retryKey, handleError } = useImageRetry();

  return (
    <div className="overflow-hidden aspect-video bg-gray-100 relative [&_.ant-image]:w-full [&_.ant-image]:h-full [&_.ant-image-img]:w-full [&_.ant-image-img]:h-full [&_.ant-image-img]:object-cover">
      <Image
        key={retryKey}
        src={image.image}
        alt=""
        placeholder={<div className="absolute inset-0 bg-gray-200 animate-pulse" />}
        onError={handleError}
        preview={{ mask: <span className="text-xs">{previewLabel}</span> }}
      />
    </div>
  );
};

const GalleryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { data: res, loading, error } = useGalleryById(id!);
  const { data: listData, loading: listLoading } = useGalleries({ per_page: 20 });
  const { retryKey: heroRetryKey, handleError: handleHeroError } = useImageRetry();

  // Keep showing the last-loaded item while a new id is fetching, instead
  // of flashing the loading state. Adjusted during render (not an effect)
  // so it takes effect before this render commits.
  const [prevItem, setPrevItem] = useState<GalleryDetailItem | null>(null);
  const item = res?.data ?? null;
  if (item && item !== prevItem) {
    setPrevItem(item);
  }
  const displayItem = item ?? prevItem;

  if (loading && !displayItem) return <Loading />;

  if (error || !displayItem) {
    return (
      <div className="text-center py-16 sm:py-20">
        <p className="text-gray-500 mb-4 text-sm sm:text-base">{t('common.error')}</p>
        <Link
          to="/news/gallery"
          className="text-[#013d8c] hover:underline font-medium text-sm sm:text-base"
        >
          ← {t('backToList')}
        </Link>
      </div>
    );
  }

  const title = getTitle(displayItem, language as Language);
  const previewLabel = PREVIEW_LABEL[language as Language] ?? PREVIEW_LABEL.uz;
  const otherGalleries = (listData?.data ?? []).filter((g) => String(g.id) !== String(id));
  const showSidebar = listLoading || otherGalleries.length > 0;

  return (
    <div
      className={`pb-10 transition-opacity duration-200 ${loading ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <BackButton to="/news/gallery" label={t('backToList')} />

          <article className="bg-white border border-gray-200 overflow-hidden">
            <Image.PreviewGroup>
              {/* Hero image */}
              {displayItem.image && (
                <div className="relative w-full h-52 sm:h-72 md:h-96 overflow-hidden bg-gray-100">
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${displayItem.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'blur(20px)',
                      transform: 'scale(1.15)',
                    }}
                  />
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <Image
                      key={heroRetryKey}
                      src={displayItem.image}
                      alt={title}
                      placeholder={<div className="absolute inset-0 bg-gray-200 animate-pulse" />}
                      onError={handleHeroError}
                      preview={{ mask: <span className="text-xs sm:text-sm">{previewLabel}</span> }}
                      rootClassName="!w-full !h-full !bg-transparent"
                      style={{ inlineSize: '100%', blockSize: '100%', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              )}

              {/* Title + date */}
              <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100">
                {title && (
                  <h1 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-2">
                    {title}
                  </h1>
                )}
                <div className="flex items-center gap-1.5 text-gray-400 text-xs sm:text-sm">
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
                  <span>{formatDate(displayItem.created_at, language)}</span>
                </div>
              </div>

              {/* Sub images grid */}
              {displayItem.images.length > 0 && (
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                    {displayItem.images.map((img) => (
                      <SubImage key={img.id} image={img} previewLabel={previewLabel} />
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
            <div className="bg-white border border-gray-200 p-3 lg:sticky lg:top-27">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">
                {t('gallery.title')}
              </h2>

              {listLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-2 animate-pulse">
                      <div className="w-12 h-12 bg-gray-200 shrink-0" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-3 bg-gray-200 w-full" />
                        <div className="h-3 bg-gray-200 w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1 max-h-[60vh] lg:max-h-[calc(100vh-260px)] overflow-y-auto">
                  {otherGalleries.map((g) => (
                    <Link
                      key={g.id}
                      to={`/news/gallery/${g.id}`}
                      className="flex items-center gap-2 p-2 hover:bg-gray-50 transition-colors"
                    >
                      <RetryImage
                        src={g.image}
                        alt={g.title}
                        loading="lazy"
                        className="w-12 h-12 object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        {g.title && (
                          <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-0.5">
                            {g.title}
                          </p>
                        )}
                        <p className="text-xs text-gray-400">
                          {formatDate(g.created_at, language)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-gray-200">
                <Link
                  to="/news/gallery"
                  className="block w-full text-center text-sm font-medium text-[#013d8c] hover:underline"
                >
                  {t('gallery.viewAll')}
                </Link>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default GalleryDetail;
