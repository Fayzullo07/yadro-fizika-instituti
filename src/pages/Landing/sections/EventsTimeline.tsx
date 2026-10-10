import { Link } from 'react-router-dom';
import { useEvents } from '@/hooks/useEvents';
import { useLanguage } from '@/contexts/LanguageContext';
import { EVENTS_PATH } from '@/routes/path';
import { getDayMonth } from '@/utils/dateUtils';
import { stripHtmlAndDecode } from '@/utils/htmlUtils';
import type { EventApiItem } from '@/types';
import { CONTAINER, SECTION_PAD } from './layout';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const EventsTimeline: React.FC = () => {
  const { t, language } = useLanguage();
  const { data, loading } = useEvents({ per_page: 4 });
  const items: EventApiItem[] = Array.isArray(data?.data) ? data.data.slice(0, 4) : [];

  if (!loading && !items.length) return null;

  const [lead, ...rest] = items;
  const leadDate = lead ? getDayMonth(lead.created_at, language) : null;

  return (
    <section className={`bg-[var(--color-neutral-0)] ${SECTION_PAD}`}>
      <div className={`${CONTAINER} flex flex-col gap-[var(--space-12)]`}>
        <SectionHeader
          eyebrow={t('events.subtitle')}
          title={t('events.title')}
          to={EVENTS_PATH}
          viewAllLabel={t('events.viewAll')}
        />

        {loading && !lead ? (
          <div className="h-[420px] animate-pulse rounded-[var(--radius-lg)] bg-[var(--color-neutral-100)]" />
        ) : (
          <div className="grid gap-[var(--space-6)] lg:grid-cols-2">
            {lead && leadDate && (
              <Reveal>
                <Link
                  to={`${EVENTS_PATH}/${lead.id}`}
                  className="group relative flex h-full min-h-[420px] flex-col justify-between overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-brand-950)] p-[var(--space-6)] md:p-[var(--space-8)]"
                >
                  {lead.image && (
                    <img
                      src={lead.image}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 size-full object-cover opacity-60 transition-transform duration-[1800ms] ease-out group-hover:scale-105"
                    />
                  )}
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[rgba(10,19,48,0.95)] via-[rgba(10,19,48,0.4)] to-transparent"
                  />
                  <span className="relative flex w-fit flex-col items-center rounded-[var(--radius-md)] bg-[var(--color-accent-500)] px-[var(--space-4)] py-[var(--space-3)] leading-none text-[var(--color-brand-950)]">
                    <span className="text-[32px] font-extrabold">{leadDate.day}</span>
                    <span className="mt-1 text-[12px] font-bold uppercase">{leadDate.month}</span>
                  </span>
                  <span className="relative flex flex-col gap-[var(--space-2)]">
                    <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent-500)]">
                      {t('landing.events.next')}
                    </span>
                    <span className="line-clamp-4 text-[24px] font-bold leading-8 text-[var(--color-neutral-0)] md:text-[28px] md:leading-9">
                      {stripHtmlAndDecode(lead.title)}
                    </span>
                  </span>
                </Link>
              </Reveal>
            )}

            <div className="flex flex-col gap-[var(--space-4)]">
              {rest.map((item, i) => {
                const { day, month } = getDayMonth(item.created_at, language);
                return (
                  <Reveal key={item.id} delay={(i + 1) * 120} className="flex-1">
                    <Link
                      to={`${EVENTS_PATH}/${item.id}`}
                      className="group flex h-full items-center gap-[var(--space-4)] rounded-[var(--radius-lg)] bg-[var(--color-neutral-50)] p-[var(--space-4)] transition-colors duration-300 hover:bg-[var(--color-brand-50)]"
                    >
                      <span className="flex size-16 shrink-0 flex-col items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-brand-700)] leading-none text-[var(--color-neutral-0)] transition-transform duration-300 group-hover:scale-105">
                        <span className="text-[24px] font-extrabold">{day}</span>
                        <span className="mt-1 text-[11px] font-semibold uppercase text-[var(--color-accent-100)]">
                          {month}
                        </span>
                      </span>
                      <span className="line-clamp-3 min-w-0 flex-1 text-[16px] font-semibold leading-6 text-[var(--color-neutral-900)]">
                        {stripHtmlAndDecode(item.title)}
                      </span>
                      <span
                        aria-hidden
                        className="text-[var(--color-brand-700)] transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsTimeline;
