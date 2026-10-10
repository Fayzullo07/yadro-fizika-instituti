import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Image } from 'antd';
import { useGalleryById, useGalleries } from '@/hooks/useGalleries';
import { useLanguage } from '@/contexts/LanguageContext';
import { useImageRetry } from '@/hooks/useImageRetry';
import { formatDate } from '@/utils/dateUtils';
import Loading from '@/components/shared/Loading/Loading';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import BackButton from '@/components/shared/BackButton/BackButton';
import RetryImage from '@/components/shared/RetryImage/RetryImage';
import GalleryImageTile from '@/components/shared/GalleryImageTile/GalleryImageTile';
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
        <p className="text-[var(--color-neutral-500)] mb-4 text-sm sm:text-base">
          {t('common.error')}
        </p>
        <Link
          to="/news/gallery"
          className="text-[var(--color-brand-700)] hover:underline font-medium text-sm sm:text-base"
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
      <PageTitle>{title}</PageTitle>
      <div className="flex flex-col gap-[var(--space-6)] lg:flex-row">
        {/* Main Content */}
        <div className="min-w-0 flex-1">
          <BackButton to="/news/gallery" label={t('backToList')} />

          <article className="flex flex-col gap-[var(--space-5)]">
            <Image.PreviewGroup>
              {displayItem.image && (
                <div className="relative isolate h-52 w-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-brand-950)] sm:h-72 md:h-96">
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${displayItem.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'blur(24px)',
                      transform: 'scale(1.15)',
                      opacity: 0.55,
                    }}
                  />
                  <div className="relative z-10 flex size-full items-center justify-center">
                    <Image
                      key={heroRetryKey}
                      src={displayItem.image}
                      alt={title}
                      placeholder={
                        <div className="absolute inset-0 animate-pulse bg-[var(--color-neutral-100)]" />
                      }
                      onError={handleHeroError}
                      preview={{ mask: <span className="text-xs sm:text-sm">{previewLabel}</span> }}
                      rootClassName="!w-full !h-full !bg-transparent"
                      style={{ inlineSize: '100%', blockSize: '100%', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-[var(--space-2)] text-[14px] text-[var(--color-neutral-500)]">
                <svg
                  className="size-4 shrink-0"
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

              {displayItem.images.length > 0 && (
                <div className="grid grid-cols-2 gap-[var(--space-3)] sm:grid-cols-3 xl:grid-cols-4">
                  {displayItem.images.map((img) => (
                    <div
                      key={img.id}
                      className="overflow-hidden rounded-[var(--radius-lg)] [&_img]:transition-transform [&_img]:duration-[900ms] [&_img]:ease-[cubic-bezier(0.22,1,0.36,1)] [&_img]:will-change-transform hover:[&_img]:scale-110 motion-reduce:[&_img]:transition-none motion-reduce:hover:[&_img]:scale-100"
                    >
                      <GalleryImageTile src={img.image} previewLabel={previewLabel} />
                    </div>
                  ))}
                </div>
              )}
            </Image.PreviewGroup>
          </article>
        </div>

        {/* Sidebar */}
        {showSidebar && (
          <aside className="mt-2 w-full shrink-0 lg:mt-0 lg:w-64">
            <div className="rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-[var(--space-4)] shadow-[var(--shadow-card)] lg:sticky lg:top-27">
              <h2 className="mb-[var(--space-3)] text-[16px] font-semibold text-[var(--color-neutral-900)]">
                {t('gallery.title')}
              </h2>

              {listLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex animate-pulse gap-2">
                      <div className="size-12 shrink-0 rounded-[var(--radius-md)] bg-[var(--color-neutral-100)]" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-3 w-full bg-[var(--color-neutral-100)]" />
                        <div className="h-3 w-2/3 bg-[var(--color-neutral-100)]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="max-h-[60vh] space-y-1 overflow-y-auto lg:max-h-[calc(100vh-260px)]">
                  {otherGalleries.map((g) => (
                    <Link
                      key={g.id}
                      to={`/news/gallery/${g.id}`}
                      className="group flex items-center gap-[var(--space-3)] rounded-[var(--radius-md)] p-[var(--space-2)] transition-colors duration-300 hover:bg-[var(--color-neutral-50)]"
                    >
                      <span className="size-12 shrink-0 overflow-hidden rounded-[var(--radius-md)]">
                        <RetryImage
                          src={g.image}
                          alt={g.title}
                          loading="lazy"
                          className="size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        />
                      </span>
                      <div className="min-w-0">
                        {g.title && (
                          <p className="mb-0.5 line-clamp-2 text-[14px] font-semibold text-[var(--color-neutral-900)]">
                            {g.title}
                          </p>
                        )}
                        <p className="text-[12px] text-[var(--color-neutral-500)]">
                          {formatDate(g.created_at, language)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <div className="mt-[var(--space-4)] border-t border-[var(--color-neutral-100)] pt-[var(--space-3)]">
                <Link
                  to="/news/gallery"
                  className="block w-full text-center text-[14px] font-semibold text-[var(--color-brand-700)] transition-colors duration-300 hover:text-[var(--color-brand-600)]"
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
