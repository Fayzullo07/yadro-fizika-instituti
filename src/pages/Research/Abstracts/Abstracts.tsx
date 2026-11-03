import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAbstracts } from '@/hooks/usePublications';
import { formatDate } from '@/utils/dateUtils';
import Loading from '@/components/shared/Loading/Loading';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import Pagination from '@/components/shared/Pagination';
import Reveal from '@/pages/Landing/sections/Reveal';
import { ABSTRACTS_PATH } from '@/routes/path';
import type { PublicationItem } from '@/types';

const PER_PAGE = 9;
const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

/** Tinted paper sheet used as the "cover" of each abstract. */
const TINTS = [
  'from-[var(--color-brand-50)] to-[var(--color-brand-100)]',
  'from-[var(--color-accent-100)] to-[#fde7a8]',
  'from-[#e6f4ee] to-[#cfe9de]',
];

const PaperCard: React.FC<{ item: PublicationItem; index: number }> = ({ item, index }) => {
  const { t, language } = useLanguage();
  const tint = TINTS[index % TINTS.length];

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] shadow-[var(--shadow-card)] transition-all duration-500 ${EASE} hover:-translate-y-1.5 hover:shadow-[0_24px_56px_rgba(1,61,140,0.2)] motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
    >
      {/* paper preview: stacked sheets that fan out on hover */}
      <Link
        to={`${ABSTRACTS_PATH}/${item.id}`}
        tabIndex={-1}
        aria-hidden
        className={`relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br ${tint}`}
      >
        <span
          className={`absolute h-32 w-24 rotate-[-9deg] rounded-[var(--radius-md)] bg-white/60 shadow-sm transition-transform duration-700 ${EASE} group-hover:-translate-x-6 group-hover:rotate-[-16deg]`}
        />
        <span
          className={`absolute h-32 w-24 rotate-[7deg] rounded-[var(--radius-md)] bg-white/80 shadow-sm transition-transform duration-700 ${EASE} group-hover:translate-x-6 group-hover:rotate-[14deg]`}
        />
        <span
          className={`relative flex h-36 w-28 flex-col rounded-[var(--radius-md)] bg-[var(--color-neutral-0)] p-[var(--space-3)] shadow-lg transition-transform duration-700 ${EASE} group-hover:-translate-y-2 group-hover:scale-105`}
        >
          <span className="absolute right-0 top-0 size-5 rounded-bl-[var(--radius-md)] bg-[var(--color-neutral-100)]" />
          <span className="mt-[var(--space-4)] space-y-1.5">
            <span className="block h-1.5 w-full rounded-full bg-[var(--color-neutral-100)]" />
            <span className="block h-1.5 w-4/5 rounded-full bg-[var(--color-neutral-100)]" />
            <span className="block h-1.5 w-full rounded-full bg-[var(--color-neutral-100)]" />
            <span className="block h-1.5 w-3/5 rounded-full bg-[var(--color-neutral-100)]" />
          </span>
          <span className="mt-auto w-fit rounded bg-red-500 px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-white">
            PDF
          </span>
        </span>
        <span className="absolute left-[var(--space-4)] top-[var(--space-4)] rounded-[var(--radius-full)] bg-white/85 px-[var(--space-3)] py-[var(--space-1)] text-[12px] font-bold tabular-nums text-[var(--color-brand-700)] backdrop-blur-sm">
          № {String(index + 1).padStart(2, '0')}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-[var(--space-3)] p-[var(--space-5)]">
        {item.type_label && (
          <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--color-accent-600)]">
            {item.type_label}
          </span>
        )}
        <Link to={`${ABSTRACTS_PATH}/${item.id}`}>
          <h3 className="line-clamp-4 text-[16px] font-semibold leading-6 text-[var(--color-neutral-900)] transition-colors duration-500 group-hover:text-[var(--color-brand-700)]">
            {item.title}
          </h3>
        </Link>
        <div className="mt-auto flex items-center justify-between gap-[var(--space-3)] border-t border-[var(--color-neutral-100)] pt-[var(--space-3)]">
          <span className="text-[12px] text-[var(--color-neutral-500)]">
            {formatDate(item.created_at, language)}
          </span>
          <span className="flex items-center gap-[var(--space-2)]">
            <a
              href={item.file}
              target="_blank"
              rel="noopener noreferrer"
              title={t('news.detail') || "Ko'rish"}
              className="flex size-9 items-center justify-center rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-700)] transition-all duration-500 hover:bg-[var(--color-brand-700)] hover:text-[var(--color-neutral-0)]"
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </a>
            <a
              href={item.file}
              download
              title={t('common.download') || 'Yuklab olish'}
              className="flex size-9 items-center justify-center rounded-full bg-[var(--color-accent-500)] text-[var(--color-brand-950)] transition-all duration-500 hover:shadow-[0_8px_20px_rgba(245,158,11,0.5)]"
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </a>
          </span>
        </div>
      </div>
    </article>
  );
};

const Abstracts: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { data, loading, error } = useAbstracts({ page, per_page: PER_PAGE });
  const items = data?.data ?? [];
  const lastPage = data?.meta?.last_page ?? 1;

  const handlePageChange = (p: number) => {
    setSearchParams({ page: String(p) });
    window.scrollTo(0, 0);
  };

  return (
    <div
      className={`pb-10 transition-opacity duration-200 ${loading && items.length > 0 ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}
    >
      <PageTitle>{t('nav.ilmiyFaoliyat.abstracts') || 'Avtoreferatlar'}</PageTitle>

      {loading && items.length === 0 && <Loading />}
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
          <div className="grid grid-cols-1 gap-[var(--space-6)] sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item, i) => (
              <Reveal key={`${page}-${item.id}`} delay={(i % 3) * 90}>
                <PaperCard item={item} index={(page - 1) * PER_PAGE + i} />
              </Reveal>
            ))}
          </div>
          <Pagination page={page} lastPage={lastPage} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
};

export default Abstracts;
