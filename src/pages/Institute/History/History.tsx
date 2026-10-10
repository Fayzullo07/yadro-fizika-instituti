import { useLanguage } from '@/contexts/LanguageContext';
import { useInstituteHistory } from '@/hooks/useInstituteHistory';
import { sanitizeHtml, stripHtmlAndDecode } from '@/utils/htmlUtils';
import { useStats } from '@/hooks/useStats';
import PageTitle from '@/components/shared/PageTitle/PageTitle';

const Stats: React.FC = () => {
  const { data: stats } = useStats();
  const items = stats.slice(0, 4);
  if (!items.length) return null;

  return (
    <div className="grid grid-cols-2 gap-[var(--space-4)] lg:grid-cols-4">
      {items.map((stat) => (
        <div
          key={stat.id}
          className="flex flex-col gap-[var(--space-2)] rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-[var(--space-6)] shadow-[var(--shadow-card)]"
        >
          <span className="text-[40px] font-extrabold leading-none tabular-nums text-[var(--color-brand-700)] md:text-[56px]">
            {stat.value}
            {stat.suffix}
          </span>
          <span className="text-[14px] leading-5 text-[var(--color-neutral-500)]">
            {stat.title}
          </span>
        </div>
      ))}
    </div>
  );
};

/** Pulls the first paragraph out of the rich-text body to use as the lead. */
const splitLead = (html: string): { lead: string; rest: string } => {
  for (const match of html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
    const lead = stripHtmlAndDecode(match[1])
      .replace(/\u00a0/g, ' ')
      .trim();
    if (lead) return { lead, rest: html.replace(match[0], '') };
  }
  return { lead: '', rest: html };
};

const IntroPanel: React.FC<{ lead: string }> = ({ lead }) => (
  <section className="relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-brand-950)] p-[var(--space-6)] md:p-[var(--space-12)]">
    <div
      aria-hidden
      className="pointer-events-none absolute -right-20 -top-32 size-[520px] rounded-full bg-[var(--color-brand-600)] opacity-45 blur-[140px]"
    />
    <div className="relative grid items-center gap-[var(--space-6)] lg:grid-cols-[auto_1fr] lg:gap-[var(--space-12)]">
      <span
        aria-label="1956"
        className="block text-[88px] font-extrabold leading-none text-transparent [-webkit-text-stroke:2px_var(--color-accent-500)] md:text-[140px]"
      >
        1956
      </span>
      {lead && (
        <p className="text-[18px] leading-8 text-[var(--color-neutral-0)] md:text-[20px] md:leading-9">
          {lead}
        </p>
      )}
    </div>
  </section>
);

const CONTENT_CLS =
  'rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-[var(--space-6)] shadow-[var(--shadow-card)] md:p-[var(--space-10)] text-sm sm:text-base text-[var(--color-neutral-700)] leading-relaxed sm:leading-loose [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-[var(--color-neutral-900)] [&_h2]:mt-6 sm:[&_h2]:mt-8 [&_p]:mt-3 sm:[&_p]:mt-4 [&_img]:max-w-full [&_img]:rounded-[var(--radius-md)] [&_table]:w-full [&_table]:overflow-x-auto';

const History: React.FC = () => {
  const { t } = useLanguage();
  const { data, loading, error } = useInstituteHistory();

  const content = data?.data?.content;
  const { lead, rest } = content ? splitLead(content) : { lead: '', rest: '' };

  return (
    <div className="flex flex-col gap-[var(--space-6)] pb-10">
      <PageTitle>{t('nav.institut.history') || 'Institut tarixi'}</PageTitle>

      {loading && (
        <p className="text-base sm:text-lg text-[var(--color-neutral-700)]">
          {t('common.loading')}
        </p>
      )}

      {error && <p className="text-base sm:text-lg text-red-600">{t('common.error')}</p>}

      {!loading && !error && content && (
        <>
          <IntroPanel lead={lead} />
          <Stats />
          {rest.trim() && (
            <div className={CONTENT_CLS} dangerouslySetInnerHTML={{ __html: sanitizeHtml(rest) }} />
          )}
        </>
      )}
    </div>
  );
};

export default History;
