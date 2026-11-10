import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useNews } from '@/hooks/useNews';
import { useLanguage } from '@/contexts/LanguageContext';
import { stripHtmlRegex, stripHtmlAndDecode } from '@/utils/htmlUtils';
import Loading from '@/components/shared/Loading/Loading';
import Pagination from '@/components/shared/Pagination';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import RetryImage from '@/components/shared/RetryImage/RetryImage';
import Reveal from '@/pages/Landing/sections/Reveal';

import type { NewsItem } from '@/types';

const SEARCH_PLACEHOLDER: Record<string, string> = {
  uz: 'Yangiliklardan qidirish...',
  ru: 'Поиск по новостям...',
  en: 'Search news...',
};

const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

const Arrow: React.FC = () => (
  <svg
    className={`size-4 transition-transform duration-500 ${EASE} group-hover:translate-x-1`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

const cover = (item: NewsItem): string | undefined =>
  item.images?.[0]?.url || item.images?.[0]?.image || item.image;

interface CardProps {
  item: NewsItem;
  variant: 'large' | 'compact' | 'grid';
}

const SpotCard: React.FC<CardProps> = ({ item, variant }) => {
  const { t } = useLanguage();
  const src = cover(item);
  const title = stripHtmlRegex(item.title);
  const excerpt = stripHtmlAndDecode(item.description).trim();
  const compact = variant === 'compact';

  return (
    <Link
      to={`/news/${item.id}`}
      className={`group flex h-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] shadow-[var(--shadow-card)] transition-all duration-500 ${EASE} hover:-translate-y-1 ${
        compact ? 'flex-row sm:flex-col lg:flex-row' : 'flex-col'
      }`}
    >
      <div
        className={`relative shrink-0 overflow-hidden bg-[var(--color-neutral-100)] ${
          variant === 'large'
            ? 'h-[300px] w-full'
            : compact
              ? 'w-32 sm:h-40 sm:w-full lg:h-auto lg:w-40'
              : 'h-48 w-full'
        }`}
      >
        {src && (
          <RetryImage
            src={src}
            alt={title}
            loading="lazy"
            className={`size-full object-cover transition-transform duration-[900ms] ${EASE} will-change-transform group-hover:scale-105`}
          />
        )}
      </div>
      <div
        className={`flex flex-1 flex-col ${compact ? 'p-[var(--space-4)]' : 'p-[var(--space-5)]'}`}
      >
        <span
          aria-hidden
          className="block h-[3px] w-8 rounded-[var(--radius-full)] bg-[var(--color-accent-500)] transition-all duration-500 group-hover:w-14"
        />
        <h3
          className={`mt-3 font-bold leading-snug text-[var(--color-neutral-900)] transition-colors duration-300 group-hover:text-[var(--color-brand-700)] ${
            variant === 'large' ? 'line-clamp-3 text-xl sm:text-2xl' : 'line-clamp-3 text-base'
          }`}
        >
          {title}
        </h3>
        {!compact && excerpt && (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--color-neutral-500)]">
            {excerpt}
          </p>
        )}
        <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-[var(--color-brand-700)]">
          {t('news.readMore')}
          <Arrow />
        </span>
      </div>
    </Link>
  );
};

const NewsList: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage = 12;

  const { data, loading, error } = useNews({ page, per_page: perPage });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="py-8 text-center text-red-600">{t('common.error')}</div>;
  }

  const allNews: NewsItem[] = data?.data || [];
  const totalPages = Math.ceil((data?.meta?.total || 0) / perPage);

  const q = query.trim().toLowerCase();
  const news = q
    ? allNews.filter((item) => stripHtmlRegex(item.title).toLowerCase().includes(q))
    : allNews;

  const handlePageChange = (newPage: number): void => {
    setSearchParams({ page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [first, second, third, ...rest] = news;

  return (
    <div className="pb-10">
      <PageTitle>{t('news.title') || 'Yangiliklar'}</PageTitle>

      <div className="mb-[var(--space-8)] flex">
        <label className="relative block w-full sm:max-w-md">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[var(--color-neutral-500)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={SEARCH_PLACEHOLDER[language] ?? SEARCH_PLACEHOLDER.uz}
            className="h-12 w-full rounded-[var(--radius-full)] border border-[var(--color-neutral-100)] bg-[var(--color-neutral-0)] pl-11 pr-4 text-sm text-[var(--color-neutral-900)] shadow-[var(--shadow-card)] outline-none transition-colors duration-300 placeholder:text-[var(--color-neutral-500)] focus:border-[var(--color-brand-600)]"
          />
        </label>
      </div>

      {news.length > 0 ? (
        <>
          <div className="flex flex-col gap-[var(--space-6)] lg:flex-row lg:gap-[var(--space-10)]">
            <div className="min-w-0 flex-1">
              <div className="grid grid-cols-1 gap-[var(--space-5)] lg:grid-cols-3">
                <Reveal className="lg:col-span-2">
                  <SpotCard item={first} variant="large" />
                </Reveal>
                {(second || third) && (
                  <div className="flex flex-col gap-[var(--space-5)]">
                    {[second, third].filter(Boolean).map((item, i) => (
                      <Reveal key={item.id} delay={(i + 1) * 90} className="flex-1">
                        <SpotCard item={item} variant="compact" />
                      </Reveal>
                    ))}
                  </div>
                )}
              </div>

              {rest.length > 0 && (
                <div className="mt-[var(--space-5)] grid grid-cols-1 gap-[var(--space-5)] sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((item, i) => (
                    <Reveal key={item.id} delay={(i % 3) * 90}>
                      <SpotCard item={item} variant="grid" />
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Pagination page={page} lastPage={totalPages} onPageChange={handlePageChange} />
        </>
      ) : (
        <div className="py-12 text-center text-sm text-[var(--color-neutral-500)] sm:text-base">
          <p>{t('news.noNews')}</p>
        </div>
      )}
    </div>
  );
};

export default NewsList;
