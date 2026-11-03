import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSpecialties } from '@/hooks/useSpecialties';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import Reveal from '@/pages/Landing/sections/Reveal';
import Pagination from '@/components/shared/Pagination';
import type { SpecialtyItem } from '@/types';

const PER_PAGE = 10;

const PdfModal: React.FC<{ url: string; title: string; onClose: () => void }> = ({
  url,
  title,
  onClose,
}) => {
  const { t } = useLanguage();
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-[var(--color-neutral-0)] rounded-[var(--radius-lg)] shadow-2xl flex flex-col w-full max-w-4xl h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--color-neutral-100)]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="shrink-0 flex flex-col items-center justify-center w-8 h-9 rounded bg-red-50 border border-red-100">
              <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                <path fill="white" d="M14 2v6h6" />
              </svg>
              <span className="text-[7px] font-black text-red-400 tracking-wider leading-none">
                PDF
              </span>
            </div>
            <p className="text-sm font-semibold text-[var(--color-neutral-900)] truncate">
              {title}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-3">
            <a
              href={url}
              download
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-brand-700)] border border-[var(--color-brand-700)]/25 px-3 py-1.5 rounded-[var(--radius-md)] hover:bg-[var(--color-brand-700)] hover:text-[var(--color-neutral-0)] transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              {t('pages.specialties.download') || 'Yuklab olish'}
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-100)] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden rounded-b-2xl">
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
            className="w-full h-full"
            title={title}
          />
        </div>
      </div>
    </div>
  );
};

const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

const ACTION =
  'inline-flex items-center gap-[var(--space-2)] rounded-[var(--radius-full)] px-[var(--space-4)] py-[var(--space-2)] text-[13px] font-semibold transition-all duration-500 motion-reduce:transition-none';

const SpecialtyCard: React.FC<{ item: SpecialtyItem; index: number }> = ({ item, index }) => {
  const { t } = useLanguage();
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <article
        className={`group relative flex h-full flex-col gap-[var(--space-4)] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-[var(--space-6)] shadow-[var(--shadow-card)] transition-all duration-500 ${EASE} hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(1,61,140,0.18)] motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
      >
        {/* amber edge that grows on hover */}
        <span
          aria-hidden
          className={`absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-[var(--color-accent-500)] transition-transform duration-500 ${EASE} group-hover:scale-y-100`}
        />
        {/* soft glow in the corner */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-[var(--color-brand-100)] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
        />

        <div className="relative flex items-start justify-between gap-[var(--space-4)]">
          <span
            className={`text-[48px] font-extrabold leading-none tabular-nums text-transparent transition-transform duration-500 ${EASE} [-webkit-text-stroke:1.5px_var(--color-brand-700)] group-hover:scale-110 group-hover:[-webkit-text-stroke-color:var(--color-accent-500)]`}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          {item.code && (
            <span className="rounded-[var(--radius-full)] bg-[var(--color-brand-50)] px-[var(--space-3)] py-[var(--space-1)] text-[12px] font-bold tracking-wide text-[var(--color-brand-700)] transition-colors duration-500 group-hover:bg-[var(--color-brand-700)] group-hover:text-[var(--color-neutral-0)]">
              {item.code}
            </span>
          )}
        </div>

        <h3 className="relative text-[17px] font-semibold leading-7 text-[var(--color-neutral-900)] sm:text-[18px]">
          {item.name}
        </h3>

        <div className="relative mt-auto flex flex-wrap items-center gap-[var(--space-2)] pt-[var(--space-2)]">
          {item.file ? (
            <>
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className={`${ACTION} bg-[var(--color-brand-700)] text-[var(--color-neutral-0)] hover:bg-[var(--color-brand-600)] hover:shadow-[0_8px_24px_rgba(1,61,140,0.35)]`}
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
                {t('pages.specialties.preview') || "Ko'rish"}
              </button>
              <a
                href={item.file}
                target="_blank"
                rel="noopener noreferrer"
                download
                className={`${ACTION} border border-[var(--color-neutral-100)] text-[var(--color-neutral-700)] hover:border-[var(--color-accent-500)] hover:text-[var(--color-brand-700)]`}
              >
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                {t('pages.specialties.download') || 'Yuklab olish'}
              </a>
            </>
          ) : (
            <span className="text-[13px] text-[var(--color-neutral-500)]">
              {t('pages.specialties.fileNotAvailable') || "Fayl yo'q"}
            </span>
          )}
        </div>
      </article>

      {showPreview && item.file && (
        <PdfModal url={item.file} title={item.name} onClose={() => setShowPreview(false)} />
      )}
    </>
  );
};

const SkeletonCard: React.FC = () => (
  <div className="flex h-48 animate-pulse flex-col gap-[var(--space-4)] rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-[var(--space-6)] shadow-[var(--shadow-card)]">
    <div className="h-10 w-16 rounded bg-[var(--color-neutral-100)]" />
    <div className="h-4 w-full rounded bg-[var(--color-neutral-100)]" />
    <div className="h-4 w-3/4 rounded bg-[var(--color-neutral-100)]" />
  </div>
);

const Specialties: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const { data, loading, error } = useSpecialties({ page, per_page: PER_PAGE });
  const items: SpecialtyItem[] = Array.isArray(data?.data) ? data.data : [];
  const lastPage = data?.meta?.last_page ?? 1;

  const handlePageChange = (p: number) => {
    setSearchParams({ page: String(p) });
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen">
      <div className="pb-8 md:pb-12">
        <PageTitle>{t('nav.ilmiyFaoliyat.specialties') || 'Ixtisosliklar pasportlari'}</PageTitle>

        {loading && items.length === 0 && (
          <div className="grid grid-cols-1 gap-[var(--space-6)] md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {error && (
          <p className="text-center py-20 text-sm text-[var(--color-neutral-500)]">
            {t('common.error') || 'Xatolik yuz berdi'}
          </p>
        )}

        {!loading && !error && items.length === 0 && (
          <p className="text-center py-20 text-sm text-[var(--color-neutral-500)]">
            {t('pages.specialties.emptyMessage') || "Ma'lumot topilmadi"}
          </p>
        )}

        {items.length > 0 && (
          <div
            className={`transition-opacity duration-200 ${loading ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}
          >
            <div className="grid grid-cols-1 gap-[var(--space-6)] md:grid-cols-2">
              {items.map((item, index) => (
                <Reveal key={`${page}-${item.id}`} delay={(index % 2) * 90}>
                  <SpecialtyCard item={item} index={(page - 1) * PER_PAGE + index} />
                </Reveal>
              ))}
            </div>
            <Pagination page={page} lastPage={lastPage} onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Specialties;
