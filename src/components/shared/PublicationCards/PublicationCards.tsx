import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Reveal from '@/pages/Landing/sections/Reveal';
import type { PublicationItem } from '@/types';

const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';
const ACTION =
  'inline-flex items-center gap-[var(--space-2)] rounded-[var(--radius-full)] px-[var(--space-4)] py-[var(--space-2)] text-[13px] font-semibold transition-all duration-500 motion-reduce:transition-none';

interface PublicationCardsProps {
  items: PublicationItem[];
  /** detail route prefix; the card links to `${basePath}/${id}` */
  basePath: string;
  /** numbering offset for paginated lists */
  startIndex?: number;
  /** changes whenever a new page of items arrives, to replay the entrance */
  pageKey?: string | number;
}

/** Two-column grid of numbered document cards (abstracts, dissertations, …). */
const PublicationCards: React.FC<PublicationCardsProps> = ({
  items,
  basePath,
  startIndex = 0,
  pageKey = 0,
}) => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 gap-[var(--space-6)] md:grid-cols-2">
      {items.map((item, i) => (
        <Reveal key={`${pageKey}-${item.id}`} delay={(i % 2) * 90}>
          <article
            className={`group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] shadow-[var(--shadow-card)] transition-all duration-500 ${EASE} hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(1,61,140,0.18)] motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
          >
            <span
              aria-hidden
              className={`absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-[var(--color-accent-500)] transition-transform duration-500 ${EASE} group-hover:scale-y-100`}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-[var(--color-brand-100)] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
            />

            <Link
              to={`${basePath}/${item.id}`}
              className="relative flex flex-1 flex-col gap-[var(--space-4)] p-[var(--space-6)]"
            >
              <div className="flex items-start justify-between gap-[var(--space-4)]">
                <span
                  className={`text-[48px] font-extrabold leading-none tabular-nums text-transparent transition-transform duration-500 ${EASE} [-webkit-text-stroke:1.5px_var(--color-brand-700)] group-hover:scale-110 group-hover:[-webkit-text-stroke-color:var(--color-accent-500)]`}
                >
                  {String(startIndex + i + 1).padStart(2, '0')}
                </span>
                <span className="relative flex h-14 w-11 shrink-0 items-end justify-center overflow-hidden rounded-[var(--radius-md)] border border-red-100 bg-gradient-to-br from-red-50 to-red-100 pb-1.5 transition-transform duration-500 group-hover:-rotate-6">
                  <span className="absolute right-0 top-0 size-3 border-b border-l border-red-100 bg-[var(--color-neutral-0)]" />
                  <span className="text-[9px] font-bold tracking-wide text-red-500">PDF</span>
                </span>
              </div>

              <h3 className="line-clamp-4 text-[17px] font-semibold leading-7 text-[var(--color-neutral-900)] transition-colors duration-500 group-hover:text-[var(--color-brand-700)] sm:text-[18px]">
                {item.title}
              </h3>
              {item.type_label && (
                <span className="w-fit rounded-[var(--radius-full)] bg-[var(--color-brand-50)] px-[var(--space-3)] py-[var(--space-1)] text-[12px] font-bold tracking-wide text-[var(--color-brand-700)]">
                  {item.type_label}
                </span>
              )}
            </Link>

            <div className="relative flex flex-wrap items-center gap-[var(--space-2)] px-[var(--space-6)] pb-[var(--space-6)]">
              <a
                href={item.file}
                target="_blank"
                rel="noopener noreferrer"
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
                {t('news.detail') || "Ko'rish"}
              </a>
              <a
                href={item.file}
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
                {t('common.download') || 'Yuklab olish'}
              </a>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
};

export default PublicationCards;
