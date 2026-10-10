import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useConferences } from '@/hooks/useConferences';
import { formatDate } from '@/utils/dateUtils';
import { stripHtmlAndDecode } from '@/utils/htmlUtils';
import Loading from '@/components/shared/Loading/Loading';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import type { ConferenceItem } from '@/types';

const PER_PAGE = 10;

const ConferenceCard: React.FC<{
  item: ConferenceItem;
  language: string;
  t: (k: string) => string;
  index: number;
}> = ({ item, language, t, index }) => {
  const preview = stripHtmlAndDecode(item.description).slice(0, 200).trim();
  const isSameDay = item.start_date === item.end_date;
  const dateLabel = isSameDay
    ? formatDate(item.start_date, language)
    : `${formatDate(item.start_date, language)} — ${formatDate(item.end_date, language)}`;

  return (
    <div className="group flex flex-col bg-[var(--color-neutral-0)] border border-[var(--color-neutral-100)] rounded-[var(--radius-lg)] overflow-hidden hover:shadow-[var(--shadow-card)] hover:border-[var(--color-brand-700)]/30 transition-all duration-300">
      <div className="h-1 bg-[var(--color-brand-700)]" />

      <div className="flex flex-col flex-1 p-4 sm:p-5 gap-2 sm:gap-3">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-brand-700)] bg-[var(--color-brand-700)]/8 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
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
            {dateLabel}
          </span>
          <span className="shrink-0 w-6 h-6 rounded-full bg-[var(--color-neutral-100)] text-[var(--color-neutral-500)] text-xs font-bold flex items-center justify-center">
            {index + 1}
          </span>
        </div>

        <Link
          to={`/research/conferences/${item.id}`}
          className="text-sm sm:text-base font-semibold text-[var(--color-neutral-900)] group-hover:text-[var(--color-brand-700)] transition-colors leading-snug hover:underline decoration-[var(--color-brand-700)]/40"
        >
          {item.title}
        </Link>

        {item.location && (
          <div className="flex items-start gap-1.5 text-xs sm:text-sm text-[var(--color-neutral-500)]">
            <svg
              className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-neutral-500)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="leading-snug">{item.location}</span>
          </div>
        )}

        {preview && (
          <p className="text-xs sm:text-sm text-[var(--color-neutral-500)] leading-relaxed line-clamp-2 flex-1">
            {preview}
            {preview.length >= 200 ? '…' : ''}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2 pt-1 mt-auto border-t border-[var(--color-neutral-100)]">
          <Link
            to={`/research/conferences/${item.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-brand-700)] hover:underline"
          >
            {t('news.detail')}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          {item.files?.[0] && (
            <a
              href={item.files[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-neutral-500)] hover:text-[var(--color-brand-700)] transition-colors"
            >
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              PDF
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Conferences: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { data, loading, error } = useConferences(page, PER_PAGE);

  const items = data?.data ?? [];
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {items.map((item, index) => (
              <ConferenceCard key={item.id} item={item} language={language} t={t} index={index} />
            ))}
          </div>

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
