import { useState } from 'react';
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
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import type { NewsImage } from '@/types';

const PREVIEW_LABEL: Record<string, string> = {
  uz: "Ko'rish",
  ru: 'Просмотр',
  en: 'Preview',
};

const DATE_LABEL: Record<string, string> = { uz: 'SANA', ru: 'ДАТА', en: 'DATE' };
const SECTION_LABEL: Record<string, string> = { uz: "BO'LIM", ru: 'РАЗДЕЛ', en: 'SECTION' };
const SHARE_LABEL: Record<string, string> = {
  uz: 'Ulashish',
  ru: 'Поделиться',
  en: 'Share',
};
const COPIED_LABEL: Record<string, string> = {
  uz: 'Havola nusxalandi',
  ru: 'Ссылка скопирована',
  en: 'Link copied',
};

const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

const NewsDetail: React.FC = () => {
  const [copied, setCopied] = useState(false);
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
        <h1 className="text-lg sm:text-2xl font-bold text-[var(--color-neutral-900)] mb-4">
          {t('news.notFound')}
        </h1>
        <Link
          to="/news"
          className="text-[var(--color-brand-600)] hover:text-[var(--color-brand-700)] font-medium text-sm sm:text-base"
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
  const related = otherNews.slice(0, 3);
  const showRelated = newsListLoading || related.length > 0;

  const handleShare = async (): Promise<void> => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: newsTitle, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* share dismissed or clipboard unavailable */
    }
  };

  return (
    <div className="pb-10">
      <PageTitle>{newsTitle}</PageTitle>

      <div className="grid grid-cols-1 gap-[var(--space-6)] lg:grid-cols-[280px_1fr] lg:gap-[var(--space-8)]">
        {/* Meta panel */}
        <aside>
          <div className="rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-[var(--space-6)] shadow-[var(--shadow-card)] lg:sticky lg:top-28">
            <dl className="space-y-[var(--space-5)]">
              {newsItem.created_at && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-600)]">
                    {DATE_LABEL[language] ?? DATE_LABEL.uz}
                  </dt>
                  <dd className="mt-1 text-base font-semibold text-[var(--color-neutral-900)]">
                    {formatDate(newsItem.created_at, language)}
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-600)]">
                  {SECTION_LABEL[language] ?? SECTION_LABEL.uz}
                </dt>
                <dd className="mt-1 text-base font-semibold text-[var(--color-neutral-900)]">
                  {t('nav.media.news')}
                </dd>
              </div>
            </dl>

            <div className="mt-[var(--space-6)] flex flex-col gap-[var(--space-3)] border-t border-[var(--color-neutral-100)] pt-[var(--space-6)]">
              <button
                type="button"
                onClick={handleShare}
                className={`inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-brand-700)] px-5 text-sm font-semibold text-[var(--color-neutral-0)] transition-all duration-500 ${EASE} hover:-translate-y-0.5 hover:bg-[var(--color-brand-600)]`}
              >
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.7 10.7l6.6-3.4m-6.6 6l6.6 3.4M18 5a2 2 0 11-4 0 2 2 0 014 0zM8 12a2 2 0 11-4 0 2 2 0 014 0zm10 7a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {copied
                  ? (COPIED_LABEL[language] ?? COPIED_LABEL.uz)
                  : (SHARE_LABEL[language] ?? SHARE_LABEL.uz)}
              </button>
              <BackButton
                to="/news"
                label={t('backToList') || "Yangiliklar ro'yxatiga qaytish"}
                className="!my-0 justify-center text-sm"
              />
            </div>
          </div>
        </aside>

        {/* Article */}
        <article className="min-w-0">
          <Image.PreviewGroup>
            {hero && (
              <div className="relative h-56 w-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-neutral-100)] shadow-[var(--shadow-card)] sm:h-80 md:h-[26rem]">
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
                <div className="relative z-10 flex size-full items-center justify-center">
                  <Image
                    key={heroRetryKey}
                    src={hero.src}
                    alt={newsTitle}
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

            {newsItem.description && (
              <div
                className="prose mt-[var(--space-6)] max-w-none leading-7 text-[var(--color-neutral-700)]
                [&_p]:mb-4 [&_p]:text-base [&_p]:leading-7
                [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[var(--color-neutral-900)] [&_h2]:md:text-2xl
                [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[var(--color-neutral-900)] [&_h3]:md:text-xl
                [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5
                [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5
                [&_li]:text-base
                [&_img]:my-4 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-[var(--radius-lg)]"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(newsItem.description) }}
              />
            )}

            {gridImages.length > 0 && (
              <div className="mt-[var(--space-6)] grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
                {gridImages.map((image, index) => (
                  <GalleryImageTile
                    key={image.id ?? index}
                    src={image.src}
                    alt={`${newsTitle} - ${index + 2}`}
                    previewLabel={previewLabel}
                  />
                ))}
              </div>
            )}
          </Image.PreviewGroup>
        </article>
      </div>

      {/* Related news */}
      {showRelated && (
        <section className="mt-[var(--space-12)]">
          <div className="mb-[var(--space-5)] flex items-end justify-between gap-4">
            <h2 className="text-xl font-bold text-[var(--color-neutral-900)] sm:text-2xl">
              {t('news.otherNews')}
            </h2>
            <Link
              to="/news"
              className="text-sm font-semibold text-[var(--color-brand-700)] transition-colors duration-300 hover:text-[var(--color-brand-600)]"
            >
              {t('news.viewAll')} →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-[var(--space-5)] sm:grid-cols-2 lg:grid-cols-3">
            {newsListLoading
              ? [1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-64 animate-pulse rounded-[var(--radius-lg)] bg-[var(--color-neutral-100)]"
                  />
                ))
              : related.map((item) => {
                  const src = item.images?.[0]?.url || item.images?.[0]?.image;
                  return (
                    <Link
                      key={item.id}
                      to={`/news/${item.id}`}
                      className={`group flex flex-col overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] shadow-[var(--shadow-card)] transition-all duration-500 ${EASE} hover:-translate-y-1`}
                    >
                      <div className="h-44 w-full overflow-hidden bg-[var(--color-neutral-100)]">
                        {src && (
                          <RetryImage
                            src={src}
                            alt={stripHtmlRegex(item.title)}
                            loading="lazy"
                            className={`size-full object-cover transition-transform duration-[900ms] ${EASE} will-change-transform group-hover:scale-105`}
                          />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-[var(--space-5)]">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-600)]">
                          {formatDate(item.created_at, language)}
                        </span>
                        <h3
                          className="mt-2 line-clamp-2 text-base font-bold leading-snug text-[var(--color-neutral-900)] transition-colors duration-300 group-hover:text-[var(--color-brand-700)]"
                          dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.title) }}
                        />
                      </div>
                    </Link>
                  );
                })}
          </div>
        </section>
      )}
    </div>
  );
};

export default NewsDetail;
