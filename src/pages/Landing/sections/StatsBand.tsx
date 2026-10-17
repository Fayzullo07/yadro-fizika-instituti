import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useStats } from '@/hooks/useStats';
import { useLanguage } from '@/contexts/LanguageContext';
import type { StatData } from '@/types';
import { CONTAINER } from './layout';

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const ROLL_MS = 1700;

/** Deterministic star field: [x%, y%, size px, delay s]. */
const STARS: Array<[number, number, number, number]> = [
  [6, 18, 2, 0],
  [12, 72, 3, 1.1],
  [19, 38, 2, 2.2],
  [27, 84, 2, 0.6],
  [33, 12, 3, 1.7],
  [41, 62, 2, 2.9],
  [48, 28, 2, 0.3],
  [55, 80, 3, 1.4],
  [61, 16, 2, 2.5],
  [68, 52, 2, 0.9],
  [74, 90, 3, 2.0],
  [81, 24, 2, 0.2],
  [88, 66, 3, 1.3],
  [93, 40, 2, 2.7],
  [97, 82, 2, 0.8],
  [3, 50, 2, 1.9],
  [24, 56, 2, 3.1],
  [58, 44, 2, 1.0],
  [71, 8, 2, 2.3],
  [85, 92, 2, 0.5],
];

/** One column of an odometer: rolls through a full 0–9 cycle and lands on `digit`. */
const Digit: React.FC<{ digit: number; active: boolean; order: number }> = ({
  digit,
  active,
  order,
}) => (
  <span className="relative inline-block h-[1em] overflow-hidden leading-none" aria-hidden>
    <span
      className="flex flex-col will-change-transform motion-reduce:transition-none"
      style={{
        transform: active ? `translateY(-${digit + 10}em)` : 'translateY(0)',
        transition: `transform ${ROLL_MS + order * 220}ms ${EASE}`,
      }}
    >
      {Array.from({ length: 20 }, (_, i) => (
        <span key={i} className="block h-[1em] leading-none">
          {i % 10}
        </span>
      ))}
    </span>
  </span>
);

const Odometer: React.FC<{ text: string; active: boolean; done: boolean }> = ({
  text,
  active,
  done,
}) => (
  <span
    aria-label={text}
    className={`flex text-[44px] font-bold leading-none tracking-tight tabular-nums text-[var(--color-neutral-900)] ${
      done ? 'st-flash' : ''
    }`}
  >
    {text.split('').map((ch, i) =>
      /\d/.test(ch) ? (
        <Digit key={i} digit={Number(ch)} active={active} order={text.length - i} />
      ) : (
        <span key={i} aria-hidden>
          {ch}
        </span>
      )
    )}
  </span>
);

const TILT = 7;

const Stat: React.FC<{ stat: StatData; active: boolean; done: boolean; index: number }> = ({
  stat,
  active,
  done,
  index,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const text = `${String(stat.value).padStart(2, '0')}${stat.suffix ?? ''}`;
  const delay = 500 + index * 170;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transition = 'transform 120ms linear';
    el.style.transform = `perspective(700px) rotateX(${-py * TILT}deg) rotateY(${px * TILT * 1.6}deg) translateZ(0)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = `transform 700ms ${EASE}`;
    el.style.transform = '';
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="group relative flex items-end gap-[var(--space-4)] pb-[var(--space-3)]"
      style={{
        opacity: active ? 1 : 0,
        translate: active ? '0 0' : '0 28px',
        transition: `opacity 900ms ${EASE} ${delay}ms, translate 900ms ${EASE} ${delay}ms`,
      }}
    >
      <Odometer text={text} active={active} done={done} />
      <span className="pb-1 text-[15px] leading-5 text-[var(--color-neutral-500)] transition-colors duration-500 group-hover:text-[var(--color-neutral-900)]">
        {stat.title}
      </span>

      {/* baseline that draws itself, carrying a comet */}
      <span className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
        <span
          className="absolute inset-0 origin-left bg-[var(--color-neutral-300)]"
          style={{
            transform: active ? 'scaleX(1)' : 'scaleX(0)',
            transition: `transform 1400ms ${EASE} ${delay + 200}ms`,
          }}
        />
        <span className="st-comet absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent via-[var(--color-accent-500)] to-transparent" />
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-[3px] left-0 size-[7px]"
        style={{ opacity: active ? 1 : 0, transition: `opacity 600ms ${delay + 300}ms` }}
      >
        <span className="st-ping absolute inset-0 rounded-full bg-[var(--color-accent-500)]" />
        <span className="absolute inset-0 rounded-full bg-[var(--color-accent-500)]" />
      </span>
    </div>
  );
};

/** Heading whose words slide up out of a mask, one after another. */
const MaskedWords: React.FC<{ text: string; active: boolean }> = ({ text, active }) => (
  <h2 className="flex flex-wrap gap-x-[0.28em] text-[28px] font-bold leading-[1.15] text-[var(--color-neutral-900)] md:text-[32px]">
    {text.split(' ').map((word, i) => (
      <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
        <span
          className="inline-block will-change-transform"
          style={{
            transform: active ? 'translateY(0)' : 'translateY(115%)',
            transition: `transform 1000ms ${EASE} ${250 + i * 120}ms`,
          }}
        >
          {word}
        </span>
      </span>
    ))}
  </h2>
);

const Rings: React.FC = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 flex items-center justify-center"
  >
    {[
      { w: 760, h: 350, cls: 'st-spin', dot: 'right', speed: '90s' },
      { w: 1080, h: 497, cls: 'st-spin-rev', dot: 'left', speed: '140s' },
      { w: 1400, h: 644, cls: 'st-spin', dot: 'right', speed: '200s' },
    ].map(({ w, h, cls, dot, speed }) => (
      <div
        key={w}
        className={`absolute ${cls}`}
        style={{ width: w, height: h, animationDuration: speed }}
      >
        <div className="size-full rounded-[50%] border border-[var(--color-brand-700)]/[0.14]" />
        <span
          className={`absolute top-1/2 size-[9px] -translate-y-1/2 rounded-full bg-[var(--color-accent-500)] shadow-[0_0_16px_4px_rgba(245,158,11,0.7)] ${
            dot === 'right' ? '-right-[4px]' : '-left-[4px]'
          }`}
        />
      </div>
    ))}
  </div>
);

const StatsBand: React.FC = () => {
  const { t } = useLanguage();
  const { data: stats, loading } = useStats();
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setActive(true);
        observer.disconnect();
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // flash the digits once the longest roll has landed
  useEffect(() => {
    if (!active) return;
    const id = setTimeout(() => setDone(true), 500 + ROLL_MS + 900);
    return () => clearTimeout(id);
  }, [active]);

  // mouse-following spotlight, driven by CSS variables (no re-render)
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
        el.style.setProperty('--spot', '1');
      });
    };
    const onLeave = () => el.style.setProperty('--spot', '0');
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const items = stats.slice(0, 4);
  if (!loading && !items.length) return null;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[var(--color-neutral-0)]"
      style={{ '--mx': '50%', '--my': '50%', '--spot': '0' } as CSSProperties}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/3 size-[420px] rounded-full bg-[var(--color-brand-100)] opacity-80 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 size-[360px] rounded-full bg-[var(--color-accent-100)] opacity-80 blur-[110px]"
      />
      <Rings />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {STARS.map(([x, y, s, d], i) => (
          <span
            key={i}
            className="st-star absolute rounded-full bg-[var(--color-brand-600)]"
            style={{ left: `${x}%`, top: `${y}%`, width: s, height: s, animationDelay: `${d}s` }}
          />
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: 'var(--spot)',
          background:
            'radial-gradient(520px circle at var(--mx) var(--my), rgba(0,79,182,0.10), transparent 62%)',
        }}
      />

      <div
        className={`${CONTAINER} relative grid items-center gap-[var(--space-12)] py-[var(--space-16)] md:py-[var(--space-24)] lg:grid-cols-[380px_1fr] lg:gap-[var(--space-16)]`}
      >
        <div className="flex flex-col gap-[var(--space-3)]">
          <span className="flex items-center gap-[var(--space-3)] text-[12px] font-bold uppercase leading-4 tracking-[0.14em] text-[var(--color-accent-600)]">
            <span
              className="h-[3px] w-7 origin-left rounded-[var(--radius-full)] bg-[var(--color-accent-500)]"
              style={{
                transform: active ? 'scaleX(1)' : 'scaleX(0)',
                transition: `transform 900ms ${EASE}`,
              }}
            />
            <span
              style={{
                opacity: active ? 1 : 0,
                transition: `opacity 900ms ${EASE} 200ms`,
              }}
            >
              {t('landing.stats.eyebrow')}
            </span>
          </span>
          <MaskedWords text={t('landing.stats.title')} active={active} />
        </div>

        <div className="grid grid-cols-1 gap-x-[var(--space-8)] gap-y-[var(--space-8)] sm:grid-cols-2">
          {loading && !items.length
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-14 animate-pulse rounded-[var(--radius-md)] bg-[var(--color-neutral-100)]"
                />
              ))
            : items.map((stat, i) => (
                <Stat key={stat.id} stat={stat} active={active} done={done} index={i} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBand;
