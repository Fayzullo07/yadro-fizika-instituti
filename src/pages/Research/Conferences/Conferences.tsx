import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useConferences } from '@/hooks/useConferences';
import { formatDate } from '@/utils/dateUtils';
import Loading from '@/components/shared/Loading/Loading';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import type { ConferenceItem } from '@/types';

const PER_PAGE = 10;

const dateRange = (item: ConferenceItem, language: string) =>
  item.start_date === item.end_date
    ? formatDate(item.start_date, language)
    : `${formatDate(item.start_date, language)} — ${formatDate(item.end_date, language)}`;

const EASE = 'duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]';

const FeaturedConference: React.FC<{
  item: ConferenceItem;
  language: string;
  t: (k: string) => string;
}> = ({ item, language, t }) => {
  const poster = item.images?.[0]?.url;
  const eyebrow = [dateRange(item, language), item.location].filter(Boolean).join(' · ');

  return (
    <section className="relative mb-[var(--space-10)] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-brand-950)] p-[var(--space-6)] md:p-[var(--space-12)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-32 size-[520px] rounded-full bg-[var(--color-brand-600)] opacity-45 blur-[140px]"
      />
      <div
        className={`relative grid items-center gap-[var(--space-8)] ${
          poster ? 'lg:grid-cols-[1fr_420px] lg:gap-[var(--space-12)]' : ''
        }`}
      >
        <div className="flex flex-col items-start gap-[var(--space-5)]">
          <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent-500)]">
            {eyebrow}
          </span>
          <h2 className="text-[24px] font-bold leading-8 text-[var(--color-neutral-0)] md:text-[32px] md:leading-10">
            {item.title}
          </h2>
          <Link
            to={`/research/conferences/${item.id}`}
            className={`inline-flex items-center gap-[var(--space-2)] rounded-[var(--radius-md)] bg-[var(--color-accent-500)] px-[var(--space-6)] py-[var(--space-3)] text-[16px] font-semibold leading-6 text-[var(--color-brand-950)] transition-all ${EASE} hover:-translate-y-0.5 hover:bg-[var(--color-accent-600)] hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
          >
            {t('news.detail')} →
          </Link>
        </div>

        {poster && (
          <Link
            to={`/research/conferences/${item.id}`}
            className="group block overflow-hidden rounded-[var(--radius-lg)] border-[3px] border-[var(--color-accent-500)] shadow-[0_0_48px_rgba(245,158,11,0.35)]"
          >
            <img
              src={poster}
              alt=""
              loading="lazy"
              className={`aspect-[420/300] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
            />
          </Link>
        )}
      </div>
    </section>
  );
};

const ConferenceRow: React.FC<{ item: ConferenceItem; language: string }> = ({
  item,
  language,
}) => {
  const file = item.files?.[0];

  return (
    <div
      className={`group flex flex-col gap-[var(--space-2)] rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-[var(--space-4)] shadow-[var(--shadow-card)] transition-all ${EASE} hover:translate-x-1 hover:bg-[var(--color-brand-50)] motion-reduce:transition-none motion-reduce:hover:translate-x-0 sm:flex-row sm:items-center sm:gap-[var(--space-6)]`}
    >
      <span className="text-[14px] font-bold leading-5 text-[var(--color-brand-700)] sm:w-[200px] sm:shrink-0">
        {dateRange(item, language)}
      </span>

      <div className="min-w-0 flex-1">
        <h4 className="text-[16px] font-bold leading-6 text-[var(--color-neutral-900)]">
          <Link
            to={`/research/conferences/${item.id}`}
            className="hover:text-[var(--color-brand-700)] hover:underline"
          >
            {item.title}
          </Link>
        </h4>
        {item.location && (
          <p className="text-[14px] leading-5 text-[var(--color-neutral-500)]">{item.location}</p>
        )}
      </div>

      {file && (
        <a
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-neutral-500)] hover:text-[var(--color-brand-700)]"
        >
          PDF
        </a>
      )}

      <Link
        to={`/research/conferences/${item.id}`}
        aria-label={item.title}
        className="hidden shrink-0 text-[24px] font-bold leading-none text-[var(--color-brand-700)] sm:block"
      >
        →
      </Link>
    </div>
  );
};

const Conferences: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { data, loading, error } = useConferences(page, PER_PAGE);

  const items = data?.data ?? [];
  const featured = page === 1 ? items[0] : undefined;
  const rest = featured ? items.slice(1) : items;
  const totalPages = Math.ceil((data?.meta?.total || 0) / PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pb-10">
      <PageTitle>{t('nav.media.conferences')}</PageTitle>

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
          {featured && <FeaturedConference item={featured} language={language} t={t} />}

          {rest.length > 0 && (
            <>
              <h3 className="mb-[var(--space-4)] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-neutral-500)]">
                {t('conferences.past')}
              </h3>
              <div className="flex flex-col gap-[var(--space-3)]">
                {rest.map((item) => (
                  <ConferenceRow key={item.id} item={item} language={language} />
                ))}
              </div>
            </>
          )}

          {totalPages > 1 && (
            <div className="mt-6 sm:mt-12 flex flex-wrap justify-center items-center gap-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-3 sm:px-4 py-2 bg-[var(--color-neutral-0)] border border-[var(--color-neutral-300)] rounded-[var(--radius-md)] hover:bg-[var(--color-neutral-50)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                ← <span className="hidden sm:inline">{t('news.previous')}</span>
              </button>

              <div className="flex flex-wrap gap-2">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNum = index + 1;
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= page - 1 && pageNum <= page + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 sm:px-4 py-2 rounded-[var(--radius-md)] transition-colors text-sm ${
                          page === pageNum
                            ? 'bg-[var(--color-brand-700)] text-[var(--color-neutral-0)]'
                            : 'bg-[var(--color-neutral-0)] border border-[var(--color-neutral-300)] hover:bg-[var(--color-neutral-50)]'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (pageNum === page - 2 || pageNum === page + 2) {
                    return (
                      <span key={pageNum} className="px-1 sm:px-2 self-center text-sm">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="px-3 sm:px-4 py-2 bg-[var(--color-neutral-0)] border border-[var(--color-neutral-300)] rounded-[var(--radius-md)] hover:bg-[var(--color-neutral-50)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                <span className="hidden sm:inline">{t('news.next')}</span> →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Conferences;
