import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEvents } from '@/hooks/useEvents';
import { getDayMonth } from '@/utils/dateUtils';
import Pagination from '@/components/shared/Pagination';
import Reveal from '@/pages/Landing/sections/Reveal';
import Loading from '@/components/shared/Loading/Loading';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import type { EventApiItem } from '@/types';

const PER_PAGE = 10;

const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

const ArrowIcon: React.FC<{ className?: string }> = ({ className = 'size-5' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

const FeaturedEvent: React.FC<{
  item: EventApiItem;
  language: string;
  t: (k: string) => string;
}> = ({ item, language, t }) => {
  const { day, month } = getDayMonth(item.created_at, language);
  const year = new Date(item.created_at).getFullYear();

  return (
    <Link
      to={`/news/events/${item.id}`}
      className="group relative block overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-brand-950)] p-[var(--space-6)] sm:p-[var(--space-10)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-[var(--color-accent-500)] opacity-15 blur-3xl"
      />
      <div className="relative grid grid-cols-1 items-center gap-[var(--space-8)] lg:grid-cols-[1fr_minmax(0,380px)]">
        <div>
          <div className="flex items-end gap-4">
            <span className="text-7xl font-extrabold leading-none text-transparent [-webkit-text-stroke:2px_var(--color-accent-500)] sm:text-8xl">
              {day.padStart(2, '0')}
            </span>
            <span className="pb-2 text-lg font-bold uppercase tracking-wider text-[var(--color-accent-500)] sm:text-xl">
              {month}
              <span className="block text-xs font-semibold text-[var(--color-neutral-100)]/70">
                {Number.isNaN(year) ? '' : year}
              </span>
            </span>
          </div>
          <h2 className="mt-[var(--space-5)] text-2xl font-bold leading-tight text-[var(--color-neutral-0)] sm:text-3xl">
            {item.title}
          </h2>
          <span className="mt-[var(--space-6)] inline-flex h-12 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-accent-500)] px-6 text-sm font-semibold text-[var(--color-brand-950)]">
            {t('news.readMore')}
            <ArrowIcon
              className={`size-4 transition-transform duration-500 ${EASE} group-hover:translate-x-1`}
            />
          </span>
        </div>

        {item.image && (
          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-0 rounded-[var(--radius-lg)] bg-[var(--color-accent-500)] opacity-30 blur-2xl"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] border-2 border-[var(--color-accent-500)] bg-[var(--color-brand-900)]">
              <img
                src={item.image}
                alt=""
                className={`size-full object-cover transition-transform duration-[900ms] ${EASE} will-change-transform group-hover:scale-105`}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

const EventRow: React.FC<{ item: EventApiItem; language: string }> = ({ item, language }) => {
  const { day, month } = getDayMonth(item.created_at, language);

  return (
    <Link
      to={`/news/events/${item.id}`}
      className={`group flex items-center gap-[var(--space-4)] rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-[var(--space-4)] shadow-[var(--shadow-card)] transition-all duration-500 ${EASE} hover:-translate-y-0.5 sm:gap-[var(--space-5)] sm:p-[var(--space-5)]`}
    >
      <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-brand-700)] leading-none text-[var(--color-neutral-0)] sm:size-[72px]">
        <span className="text-xl font-bold sm:text-2xl">{day}</span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-wide">{month}</span>
      </div>
      <h2 className="line-clamp-2 min-w-0 flex-1 text-base font-bold leading-snug text-[var(--color-neutral-900)] transition-colors duration-300 group-hover:text-[var(--color-brand-700)] sm:text-lg">
        {item.title}
      </h2>
      <ArrowIcon
        className={`size-5 shrink-0 text-[var(--color-brand-700)] transition-transform duration-500 ${EASE} group-hover:translate-x-1`}
      />
    </Link>
  );
};

const Events: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { data, loading, error } = useEvents({ page, per_page: PER_PAGE });

  const items = data?.data ?? [];
  const totalPages = Math.ceil((data?.meta?.total || 0) / PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pb-10">
      <PageTitle>{t('nav.media.events')}</PageTitle>

      {loading && <Loading />}

      {error && (
        <p className="text-center py-16 text-[var(--color-neutral-500)]">{t('common.error')}</p>
      )}

      {!loading && !error && items.length === 0 && (
        <p className="text-center py-16 text-[var(--color-neutral-500)]">
          {t('common.notAvailable')}
        </p>
      )}

      {items.length > 0 && (
        <>
          <Reveal>
            <FeaturedEvent item={items[0]} language={language} t={t} />
          </Reveal>

          {items.length > 1 && (
            <>
              <p className="mb-[var(--space-4)] mt-[var(--space-10)] text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-600)]">
                {t('events.subtitle')}
              </p>
              <div className="flex flex-col gap-[var(--space-3)] sm:gap-[var(--space-4)]">
                {items.slice(1).map((item, i) => (
                  <Reveal key={item.id} delay={(i % 4) * 70}>
                    <EventRow item={item} language={language} />
                  </Reveal>
                ))}
              </div>
            </>
          )}

          <Pagination page={page} lastPage={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
};

export default Events;
