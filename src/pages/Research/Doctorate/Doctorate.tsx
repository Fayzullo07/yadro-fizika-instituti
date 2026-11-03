import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDissertations } from '@/hooks/usePublications';
import { formatDate } from '@/utils/dateUtils';
import Loading from '@/components/shared/Loading/Loading';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import Pagination from '@/components/shared/Pagination';
import Reveal from '@/pages/Landing/sections/Reveal';
import { DOCTORATE_PATH } from '@/routes/path';
import type { PublicationItem } from '@/types';

const PER_PAGE = 10;
const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

/** Wide dark row: big outlined number, graduation cap, title and actions. */
const DissertationRow: React.FC<{ item: PublicationItem; index: number }> = ({ item, index }) => {
  const { t, language } = useLanguage();

  return (
    <article
      className={`group relative isolate overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-brand-950)] shadow-[var(--shadow-card)] transition-all duration-500 ${EASE} hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(10,19,48,0.45)] motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
    >
      {/* glows that wake up on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-20 -top-24 -z-10 size-72 rounded-full bg-[var(--color-brand-600)] opacity-40 blur-[90px] transition-opacity duration-700 group-hover:opacity-70"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-0 -z-10 size-64 rounded-full bg-[var(--color-accent-500)] opacity-0 blur-[90px] transition-opacity duration-700 group-hover:opacity-20"
      />
      {/* amber line that draws along the bottom */}
      <span
        aria-hidden
        className={`absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[var(--color-accent-500)] to-transparent transition-transform duration-700 ${EASE} group-hover:scale-x-100`}
      />

      <div className="flex flex-col gap-[var(--space-5)] p-[var(--space-6)] md:flex-row md:items-center md:gap-[var(--space-8)]">
        <span
          className={`shrink-0 text-[64px] font-extrabold leading-none tabular-nums text-transparent transition-transform duration-500 ${EASE} [-webkit-text-stroke:1.5px_var(--color-accent-500)] group-hover:scale-105 md:w-[120px] md:text-[72px]`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <Link
          to={`${DOCTORATE_PATH}/${item.id}`}
          className="flex min-w-0 flex-1 flex-col gap-[var(--space-2)]"
        >
          <span className="flex items-center gap-[var(--space-3)] text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-accent-500)]">
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.42A12.08 12.08 0 0121 17M12 14l-6.16-3.42A12.08 12.08 0 003 17m9-3v7"
              />
            </svg>
            {item.type_label || t('nav.laboratoriyalar.disertatsiya')}
            <span className="text-[var(--color-neutral-300)]/70">
              · {formatDate(item.created_at, language)}
            </span>
          </span>
          <h3 className="line-clamp-3 text-[18px] font-semibold leading-7 text-[var(--color-neutral-0)] transition-transform duration-500 group-hover:translate-x-1 md:text-[20px]">
            {item.title}
          </h3>
        </Link>

        <div className="flex shrink-0 items-center gap-[var(--space-3)]">
          <a
            href={item.file}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[var(--space-2)] rounded-[var(--radius-full)] border border-white/25 bg-white/10 px-[var(--space-4)] py-[var(--space-2)] text-[13px] font-semibold text-[var(--color-neutral-0)] backdrop-blur-md transition-all duration-500 hover:border-[var(--color-accent-500)] hover:bg-white/20"
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
            {t('news.detail') || "Ko'rish"}
          </a>
          <a
            href={item.file}
            download
            title={t('common.download') || 'Yuklab olish'}
            className="flex size-10 items-center justify-center rounded-full bg-[var(--color-accent-500)] text-[var(--color-brand-950)] transition-all duration-500 hover:rotate-[-8deg] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)]"
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
};

const Doctorate: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { data, loading, error } = useDissertations({ page, per_page: PER_PAGE });
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
      <PageTitle>{t('nav.laboratoriyalar.disertatsiya') || 'Dissertatsiyalar'}</PageTitle>

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
          <div className="flex flex-col gap-[var(--space-4)]">
            {items.map((item, i) => (
              <Reveal key={`${page}-${item.id}`} delay={(i % 3) * 80}>
                <DissertationRow item={item} index={(page - 1) * PER_PAGE + i} />
              </Reveal>
            ))}
          </div>
          <Pagination page={page} lastPage={lastPage} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
};

export default Doctorate;
