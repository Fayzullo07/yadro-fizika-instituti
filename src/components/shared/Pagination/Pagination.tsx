const BASE =
  'flex size-10 items-center justify-center rounded-[var(--radius-md)] border text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]';
const IDLE =
  'border-[var(--color-neutral-100)] bg-[var(--color-neutral-0)] text-[var(--color-neutral-700)] hover:-translate-y-0.5 hover:border-[var(--color-brand-700)] hover:text-[var(--color-brand-700)]';

const Pagination: React.FC<{
  page: number;
  lastPage: number;
  onPageChange: (p: number) => void;
}> = ({ page, lastPage, onPageChange }) => {
  if (lastPage <= 1) return null;
  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);
  return (
    <div className="mt-[var(--space-8)] flex flex-wrap items-center justify-center gap-[var(--space-2)] sm:mt-[var(--space-12)]">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`${BASE} ${IDLE} disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0`}
      >
        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`${BASE} ${
            p === page
              ? 'border-[var(--color-brand-700)] bg-[var(--color-brand-700)] text-[var(--color-neutral-0)]'
              : IDLE
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === lastPage}
        className={`${BASE} ${IDLE} disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0`}
      >
        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
