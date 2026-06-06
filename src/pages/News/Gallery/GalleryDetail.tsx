import { useParams, Link } from 'react-router-dom';
import { useRef } from 'react';
import { Image } from 'antd';
import { useGalleryById, useGalleries } from '@/hooks/useGalleries';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatDate } from '@/utils/dateUtils';
import Loading from '@/components/shared/Loading/Loading';
import BackButton from '@/components/shared/BackButton/BackButton';
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

const GalleryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { data: res, loading, error } = useGalleryById(id!);
  const { data: listData, loading: listLoading } = useGalleries({ per_page: 20 });

  const prevItemRef = useRef<GalleryDetailItem | null>(null);
  const item = res?.data ?? null;
  if (item) prevItemRef.current = item;
  const displayItem = item ?? prevItemRef.current;

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

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden p-4 sm:p-6">
            {/* Title */}
            {title && (
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 leading-snug mb-2">
                {title}
              </h1>
            )}

            {/* Date */}
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-4 sm:mb-5">
              <svg
                className="w-4 h-4 shrink-0"
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

            {/* Main image */}
            {displayItem.image && (
              <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-5 sm:mb-6">
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${displayItem.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(16px)',
                    transform: 'scale(1.1)',
                  }}
                />
                <Image
                  src={displayItem.image}
                  alt={title}
                  preview={{ mask: <span className="text-xs sm:text-sm">{previewLabel}</span> }}
                  style={{
                    position: 'relative',
                    zIndex: 10,
                    inlineSize: '100%',
                    blockSize: 'auto',
                  }}
                />
              </div>
            )}

            {/* Sub images grid */}
            {displayItem.images.length > 0 && (
              <Image.PreviewGroup>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                  {displayItem.images.map((img) => (
                    <div
                      key={img.id}
                      className="overflow-hidden rounded-lg aspect-video bg-gray-100 [&_.ant-image]:w-full [&_.ant-image]:h-full [&_.ant-image-img]:w-full [&_.ant-image-img]:h-full [&_.ant-image-img]:object-cover"
                    >
                      <Image
                        src={img.image}
                        alt=""
                        preview={{ mask: <span className="text-xs">{previewLabel}</span> }}
                      />
                    </div>
                  ))}
                </div>
              </Image.PreviewGroup>
            )}
          </div>
        </div>

        {/* Sidebar */}
        {showSidebar && (
          <aside className="w-full lg:w-60 shrink-0 mt-2 lg:mt-0">
            <div className="bg-white rounded border border-gray-200 p-3 lg:sticky lg:top-27">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">
                {t('gallery.title')}
              </h2>

              {listLoading ? (
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
                  {otherGalleries.map((g) => (
                    <Link
                      key={g.id}
                      to={`/news/gallery/${g.id}`}
                      className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 transition-colors"
                    >
                      <img
                        src={g.image}
                        alt={g.title}
                        loading="lazy"
                        className="w-12 h-12 object-cover rounded shrink-0"
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
