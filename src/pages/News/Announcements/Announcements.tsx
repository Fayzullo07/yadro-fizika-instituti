import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import { stripHtmlAndDecode } from '@/utils/htmlUtils';
import Pagination from '@/components/shared/Pagination';
import Reveal from '@/pages/Landing/sections/Reveal';
import Loading from '@/components/shared/Loading/Loading';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import type { AnnouncementItem } from '@/types';

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

const FeaturedAnnouncement: React.FC<{
  item: AnnouncementItem;
  t: (k: string) => string;
}> = ({ item, t }) => {
  const preview = stripHtmlAndDecode(item.description).slice(0, 260).trim();

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-brand-950)] p-[var(--space-6)] sm:p-[var(--space-10)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-[var(--color-accent-500)] opacity-20 blur-3xl"
      />
      <div className="relative max-w-3xl">
        <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-accent-500)]">
          <span
            aria-hidden
            className="h-[3px] w-8 rounded-[var(--radius-full)] bg-[var(--color-accent-500)]"
          />
          {t('pages.announcements.subtitle')}
        </span>
        <h2 className="mt-3 text-2xl font-bold leading-tight text-[var(--color-neutral-0)] sm:text-3xl">
          {item.title}
        </h2>
        {preview && (
          <p className="mt-4 line-clamp-3 text-base leading-7 text-[var(--color-neutral-100)]/80">
            {preview}
            {preview.length >= 260 ? '…' : ''}
          </p>
        )}
        <Link
          to={`/news/announcements/${item.id}`}
          className={`group mt-[var(--space-6)] inline-flex h-12 items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-accent-500)] px-6 text-sm font-semibold text-[var(--color-brand-950)] transition-all duration-500 ${EASE} hover:-translate-y-0.5 hover:bg-[var(--color-accent-600)]`}
        >
          {t('news.readMore')}
          <ArrowIcon
            className={`size-4 transition-transform duration-500 ${EASE} group-hover:translate-x-1`}
          />
        </Link>
      </div>
    </div>
  );
};

const AnnouncementRow: React.FC<{
  item: AnnouncementItem;
}> = ({ item }) => {
  const preview = stripHtmlAndDecode(item.description).slice(0, 180).trim();

  return (
    <Link
      to={`/news/announcements/${item.id}`}
      className={`group relative flex items-center gap-[var(--space-4)] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-[var(--space-4)] shadow-[var(--shadow-card)] transition-all duration-500 ${EASE} hover:-translate-y-0.5 sm:gap-[var(--space-5)] sm:p-[var(--space-5)]`}
    >
      <span
        aria-hidden
        className={`absolute inset-y-0 left-0 w-1 origin-top scale-y-50 bg-[var(--color-accent-500)] opacity-60 transition-all duration-500 ${EASE} group-hover:scale-y-100 group-hover:opacity-100`}
      />
      <div className="min-w-0 flex-1">
        <h2 className="line-clamp-2 text-base font-bold leading-snug text-[var(--color-neutral-900)] transition-colors duration-300 group-hover:text-[var(--color-brand-700)] sm:text-lg">
          {item.title}
        </h2>
        {preview && (
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-[var(--color-neutral-500)]">
            {preview}
          </p>
        )}
      </div>
      <ArrowIcon
        className={`size-5 shrink-0 text-[var(--color-brand-700)] transition-transform duration-500 ${EASE} group-hover:translate-x-1`}
      />
    </Link>
  );
};

const Announcements: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { data, loading, error } = useAnnouncements(page, PER_PAGE);

  const items = data?.data ?? [];
  const totalPages = Math.ceil((data?.meta?.total || 0) / PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pb-10">
      <PageTitle>{t('nav.media.announcements')}</PageTitle>

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
            <FeaturedAnnouncement item={items[0]} t={t} />
          </Reveal>

          {items.length > 1 && (
            <div className="mt-[var(--space-5)] flex flex-col gap-[var(--space-3)] sm:gap-[var(--space-4)]">
              {items.slice(1).map((item, i) => (
                <Reveal key={item.id} delay={(i % 4) * 70}>
                  <AnnouncementRow item={item} />
                </Reveal>
              ))}
            </div>
          )}

          <Pagination page={page} lastPage={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
};

export default Announcements;
