import { useEffect, useRef, useState } from 'react';
import { useStats } from '@/hooks/useStats';
import { useLanguage } from '@/contexts/LanguageContext';
import type { StatData } from '@/types';
import { CONTAINER } from './layout';
import Reveal from './Reveal';

const COUNT_MS = 1600;

const useCountUp = (target: number, active: boolean) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const id = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(id);
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / COUNT_MS, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active]);

  return value;
};

const Stat: React.FC<{ stat: StatData; active: boolean; index: number }> = ({
  stat,
  active,
  index,
}) => {
  const value = useCountUp(stat.value, active);
  return (
    <Reveal delay={index * 120} className="flex flex-col gap-[var(--space-3)]">
      <span className="text-[56px] font-extrabold leading-none tabular-nums text-[var(--color-neutral-0)] md:text-[88px]">
        {String(value).padStart(2, '0')}
        {stat.suffix}
      </span>
      <span
        className={`h-1 w-12 rounded-[var(--radius-full)] ${
          index % 2 ? 'bg-[var(--color-brand-600)]' : 'bg-[var(--color-accent-500)]'
        }`}
      />
      <span className="text-[16px] leading-6 text-[var(--color-neutral-300)]">{stat.title}</span>
    </Reveal>
  );
};

const StatsBand: React.FC = () => {
  const { t } = useLanguage();
  const { data: stats, loading } = useStats();
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setActive(true);
        observer.disconnect();
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const items = stats.slice(0, 4);
  if (!loading && !items.length) return null;

  return (
    <section ref={ref} className="relative overflow-hidden bg-[var(--color-brand-950)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-[420px] rounded-full bg-[var(--color-brand-600)] opacity-40 blur-[120px]"
      />
      <div
        className={`${CONTAINER} relative flex flex-col gap-[var(--space-12)] py-[var(--space-16)] md:py-[var(--space-24)]`}
      >
        <Reveal className="flex items-center gap-[var(--space-3)] text-[12px] font-bold uppercase leading-4 tracking-[0.14em] text-[var(--color-accent-500)]">
          <span className="h-[3px] w-8 rounded-[var(--radius-full)] bg-[var(--color-accent-500)]" />
          {t('landing.stats.eyebrow')}
        </Reveal>
        <div className="grid grid-cols-2 gap-x-[var(--space-6)] gap-y-[var(--space-12)] lg:grid-cols-4">
          {loading && !items.length
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-28 animate-pulse rounded-[var(--radius-md)] bg-white/10"
                />
              ))
            : items.map((stat, i) => <Stat key={stat.id} stat={stat} active={active} index={i} />)}
        </div>
      </div>
    </section>
  );
};

export default StatsBand;
