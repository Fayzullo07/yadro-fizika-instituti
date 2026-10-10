import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { EVENTS_PATH } from '@/routes/path';
import { getDayMonth } from '@/utils/dateUtils';
import { stripHtmlAndDecode } from '@/utils/htmlUtils';
import type { EventApiItem } from '@/types';
import { CONTAINER, SECTION_PAD } from './layout';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/** Milliseconds until `target`, ticking every second. 0 until the first tick. */
const useRemaining = (target: number) => {
  const [now, setNow] = useState(0);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, SECOND);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  return now ? target - now : 0;
};

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Single-event layout for the landing Events section: a dark spotlight with
 * an outlined date, a live countdown (only while the event is still ahead)
 * and the poster on the right.
 */
const EventSpotlight: React.FC<{ item: EventApiItem }> = ({ item }) => {
  const { t, language } = useLanguage();
  const { day, month } = getDayMonth(item.created_at, language);
  const remaining = useRemaining(new Date(item.created_at).getTime());
  const upcoming = remaining > 0;

  const units = [
    { value: Math.floor(remaining / DAY), label: t('landing.events.days') },
    { value: Math.floor((remaining % DAY) / HOUR), label: t('landing.events.hours') },
    { value: Math.floor((remaining % HOUR) / MINUTE), label: t('landing.events.minutes') },
    { value: Math.floor((remaining % MINUTE) / SECOND), label: t('landing.events.seconds') },
  ];

  return (
    <section className={`relative overflow-hidden bg-[var(--color-brand-950)] ${SECTION_PAD}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-32 size-[620px] rounded-full bg-[var(--color-brand-600)] opacity-45 blur-[140px]"
      />
      <div className={`${CONTAINER} relative flex flex-col gap-[var(--space-12)]`}>
        <SectionHeader
          dark
          eyebrow={t('events.subtitle')}
          title={t('events.title')}
          to={EVENTS_PATH}
          viewAllLabel={t('events.viewAll')}
        />

        <div className="grid items-center gap-[var(--space-12)] lg:grid-cols-[1fr_480px] lg:gap-[var(--space-16)]">
          <div className="flex flex-col items-start gap-[var(--space-6)]">
            <Reveal>
              <span
                aria-label={`${day} ${month}`}
                className="block text-[64px] font-extrabold uppercase leading-none text-transparent [-webkit-text-stroke:2px_var(--color-accent-500)] md:text-[96px]"
              >
                {day.padStart(2, '0')} {month}
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h3 className="text-[24px] font-bold leading-8 text-[var(--color-neutral-0)] md:text-[32px] md:leading-10">
                {stripHtmlAndDecode(item.title)}
              </h3>
            </Reveal>

            {upcoming && (
              <Reveal delay={240} className="flex flex-col gap-[var(--space-3)]">
                <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent-500)]">
                  {t('landing.events.startsIn')}
                </span>
                <div className="flex gap-[var(--space-3)]">
                  {units.map(({ value, label }) => (
                    <div
                      key={label}
                      className="flex size-[72px] flex-col items-center justify-center gap-[var(--space-1)] rounded-[var(--radius-md)] border border-[var(--color-brand-700)] bg-[var(--color-brand-900)] sm:size-[104px]"
                    >
                      <span className="text-[24px] font-extrabold leading-none tabular-nums text-[var(--color-neutral-0)] sm:text-[32px]">
                        {pad(value)}
                      </span>
                      <span className="text-[10px] font-bold uppercase text-[var(--color-accent-500)] sm:text-[12px]">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal delay={360}>
              <Link
                to={`${EVENTS_PATH}/${item.id}`}
                className="inline-flex items-center gap-[var(--space-2)] rounded-[var(--radius-md)] bg-[var(--color-accent-500)] px-[var(--space-6)] py-[var(--space-3)] text-[16px] font-semibold leading-6 text-[var(--color-brand-950)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[var(--color-accent-600)] hover:shadow-lg"
              >
                {t('news.readMore')} →
              </Link>
            </Reveal>
          </div>

          {item.image && (
            <Reveal delay={200}>
              <Link
                to={`${EVENTS_PATH}/${item.id}`}
                className="group block overflow-hidden rounded-[var(--radius-lg)] border-[3px] border-[var(--color-accent-500)] shadow-[0_0_48px_rgba(245,158,11,0.35)]"
              >
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  className="aspect-[480/340] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-105"
                />
              </Link>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventSpotlight;
