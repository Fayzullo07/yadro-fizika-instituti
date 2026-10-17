import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { EVENTS_PATH } from '@/routes/path';
import { getDayMonth } from '@/utils/dateUtils';
import { stripHtmlAndDecode } from '@/utils/htmlUtils';
import type { EventApiItem } from '@/types';
import { CONTAINER, SECTION_PAD } from './layout';
import SectionHeader from './SectionHeader';
import { EASE } from './motion';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const TILT = 6;

/** Rising embers: [x%, size px, delay s, duration s]. */
const EMBERS: Array<[number, number, number, number]> = [
  [4, 3, 0, 9],
  [11, 2, 2.4, 12],
  [18, 3, 4.1, 10],
  [26, 2, 1.2, 13],
  [33, 3, 5.6, 11],
  [41, 2, 3.3, 9],
  [49, 3, 0.7, 14],
  [57, 2, 6.2, 10],
  [64, 3, 2.9, 12],
  [72, 2, 4.9, 9],
  [79, 3, 1.7, 13],
  [86, 2, 5.8, 11],
  [93, 3, 3.8, 10],
  [97, 2, 0.9, 12],
];

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

/** Each character rises out of its own mask, one after another. */
const RiseText: React.FC<{ text: string; active: boolean; delay?: number; className?: string }> = ({
  text,
  active,
  delay = 0,
  className = '',
}) => (
  <span aria-label={text} className={`flex ${className}`}>
    {text.split('').map((ch, i) => (
      <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
        <span
          className={`inline-block ${active ? 'ev-char' : ''}`}
          style={{
            animationDelay: `${delay + i * 90}ms`,
            transform: active ? undefined : 'translateY(115%)',
          }}
        >
          <span className="ev-fill inline-block">{ch === ' ' ? '\u00a0' : ch}</span>
        </span>
      </span>
    ))}
  </span>
);

/** Countdown cell: the value drops in on every change, a rim traces its progress. */
const CountTile: React.FC<{
  value: number;
  max: number;
  label: string;
  active: boolean;
  index: number;
}> = ({ value, max, label, active, index }) => (
  <div
    className="ab-anim relative flex size-[72px] flex-col items-center justify-center gap-[var(--space-1)] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-brand-700)] bg-[var(--color-brand-900)] sm:size-[104px]"
    style={{
      opacity: active ? 1 : 0,
      transform: active ? 'none' : 'translateY(24px) scale(0.85)',
      transition: `opacity 800ms ${EASE} ${700 + index * 120}ms, transform 1000ms ${EASE} ${700 + index * 120}ms`,
    }}
  >
    <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 size-full" fill="none">
      <rect
        x="1.5"
        y="1.5"
        width="97"
        height="97"
        rx="14"
        pathLength="100"
        stroke="rgba(245,158,11,0.95)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={`${Math.min(100, (value / max) * 100)} 100`}
        className="transition-[stroke-dasharray] duration-700 ease-out"
      />
    </svg>
    <span className="overflow-hidden">
      <span
        key={value}
        className="ev-tick block text-[24px] font-extrabold leading-none tabular-nums text-[var(--color-neutral-0)] sm:text-[32px]"
      >
        {pad(value)}
      </span>
    </span>
    <span className="text-[10px] font-bold uppercase text-[var(--color-accent-500)] sm:text-[12px]">
      {label}
    </span>
  </div>
);

/**
 * Single-event layout for the landing Events section: a dark spotlight with
 * an outlined date that fills like liquid, a live countdown (only while the
 * event is still ahead) and a 3D poster ringed by orbits and rising embers.
 */
const EventSpotlight: React.FC<{ item: EventApiItem }> = ({ item }) => {
  const { t, language } = useLanguage();
  const { day, month } = getDayMonth(item.created_at, language);
  const remaining = useRemaining(new Date(item.created_at).getTime());
  const upcoming = remaining > 0;

  const sectionRef = useRef<HTMLElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [started, setStarted] = useState(false);

  const units = [
    { value: Math.floor(remaining / DAY), max: 60, label: t('landing.events.days') },
    { value: Math.floor((remaining % DAY) / HOUR), max: 24, label: t('landing.events.hours') },
    { value: Math.floor((remaining % HOUR) / MINUTE), max: 60, label: t('landing.events.minutes') },
    {
      value: Math.floor((remaining % MINUTE) / SECOND),
      max: 60,
      label: t('landing.events.seconds'),
    },
  ];

  // start on first view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStarted(true);
        io.disconnect();
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // pointer + scroll parallax through CSS variables
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh - r.top) / (vh + r.height);
      el.style.setProperty('--sp', Math.max(-1, Math.min(1, p * 2 - 1)).toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      el.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    };
    const onLeave = () => {
      el.style.setProperty('--mx', '0');
      el.style.setProperty('--my', '0');
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const onPosterMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const poster = posterRef.current;
    const glare = glareRef.current;
    if (!poster || !glare || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    poster.style.transition = 'transform 120ms linear';
    poster.style.transform = `perspective(1100px) rotateX(${(0.5 - py) * TILT}deg) rotateY(${(px - 0.5) * TILT * 1.8}deg) scale(1.02)`;
    glare.style.opacity = '1';
    glare.style.background = `radial-gradient(360px circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.3), transparent 55%)`;
  };
  const onPosterLeave = () => {
    const poster = posterRef.current;
    if (poster) {
      poster.style.transition = `transform 900ms ${EASE}`;
      poster.style.transform = '';
    }
    if (glareRef.current) glareRef.current.style.opacity = '0';
  };

  // the button leans toward the pointer
  const onButtonMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = buttonRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.28;
    const dy = (e.clientY - (r.top + r.height / 2)) * 0.4;
    el.style.transition = 'transform 120ms linear';
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };
  const onButtonLeave = () => {
    const el = buttonRef.current;
    if (!el) return;
    el.style.transition = `transform 700ms ${EASE}`;
    el.style.transform = '';
  };

  const title = stripHtmlAndDecode(item.title);

  return (
    <section
      ref={sectionRef}
      className={`relative isolate overflow-hidden bg-[var(--color-brand-950)] ${SECTION_PAD}`}
      style={{ '--sp': 0, '--mx': 0, '--my': 0 } as CSSProperties}
    >
      {/* ambient: aurora, glow that follows the pointer, rising embers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="an-aurora-a absolute -right-20 -top-32 size-[620px] rounded-full bg-[var(--color-brand-600)] opacity-45 blur-[140px]" />
        <div className="an-aurora-b absolute -left-24 bottom-[-10%] size-[460px] rounded-full bg-[var(--color-accent-500)] opacity-[0.12] blur-[130px]" />
        <div
          className="absolute size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-brand-600)] opacity-25 blur-[120px]"
          style={{
            left: 'calc(50% + var(--mx) * 900px)',
            top: 'calc(50% + var(--my) * 500px)',
          }}
        />
        {EMBERS.map(([x, s, d, dur], i) => (
          <span
            key={i}
            className="ab-drift absolute bottom-[4%] rounded-full bg-[var(--color-accent-500)]"
            style={{
              left: `${x}%`,
              width: s,
              height: s,
              animationDelay: `${d}s`,
              animationDuration: `${dur}s`,
              boxShadow: '0 0 12px 3px rgba(245,158,11,0.7)',
            }}
          />
        ))}
      </div>

      <div className={`${CONTAINER} relative flex flex-col gap-[var(--space-12)]`}>
        <SectionHeader
          dark
          eyebrow={t('events.subtitle')}
          title={t('events.title')}
          to={EVENTS_PATH}
          viewAllLabel={t('events.viewAll')}
        />

        <div className="grid items-center gap-[var(--space-12)] lg:grid-cols-[1fr_480px] lg:gap-[var(--space-16)]">
          <div
            className="flex flex-col items-start gap-[var(--space-6)]"
            style={{ translate: 'calc(var(--mx) * 14px) calc(var(--my) * 10px)' }}
          >
            <RiseText
              text={`${day.padStart(2, '0')} ${month}`}
              active={started}
              delay={200}
              className="text-[64px] font-extrabold uppercase leading-none text-transparent [-webkit-text-stroke:2px_var(--color-accent-500)] md:text-[96px]"
            />

            <h3 className="flex flex-wrap gap-x-[0.26em] text-[24px] font-bold leading-8 text-[var(--color-neutral-0)] md:text-[32px] md:leading-10">
              {title.split(' ').map((word, i) => (
                <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
                  <span
                    className="ab-anim inline-block"
                    style={{
                      transform: started ? 'none' : 'translateY(115%)',
                      transition: `transform 1100ms ${EASE} ${500 + i * 70}ms`,
                    }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h3>

            {upcoming && (
              <div className="flex flex-col gap-[var(--space-3)]">
                <span
                  className="ab-anim text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent-500)]"
                  style={{
                    opacity: started ? 1 : 0,
                    transition: `opacity 900ms ${EASE} 600ms`,
                  }}
                >
                  {t('landing.events.startsIn')}
                </span>
                <div className="flex gap-[var(--space-3)]">
                  {units.map(({ value, max, label }, i) => (
                    <CountTile
                      key={label}
                      value={value}
                      max={max}
                      label={label}
                      active={started}
                      index={i}
                    />
                  ))}
                </div>
              </div>
            )}

            <Link
              ref={buttonRef}
              to={`${EVENTS_PATH}/${item.id}`}
              onPointerMove={onButtonMove}
              onPointerLeave={onButtonLeave}
              className="ab-anim group relative inline-flex items-center gap-[var(--space-2)] overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-accent-500)] px-[var(--space-6)] py-[var(--space-3)] text-[16px] font-semibold leading-6 text-[var(--color-brand-950)] shadow-[0_0_0_rgba(245,158,11,0)] transition-[background-color,box-shadow,opacity] duration-500 hover:bg-[var(--color-accent-600)] hover:shadow-[0_12px_44px_rgba(245,158,11,0.5)]"
              style={{ opacity: started ? 1 : 0 }}
            >
              <span
                aria-hidden
                className="absolute inset-y-0 -left-1/3 w-1/4 -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/60 to-transparent transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:left-[120%]"
              />
              <span className="relative">{t('news.readMore')}</span>
              <span
                aria-hidden
                className="relative transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          {item.image && (
            <div
              className="relative"
              style={{
                translate: 'calc(var(--mx) * -22px) calc(var(--my) * -16px + var(--sp) * -26px)',
              }}
            >
              {/* orbit rings, pulses and a breathing halo behind the poster */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <span className="ev-glow absolute size-[110%] rounded-full bg-[var(--color-accent-500)] blur-[90px]" />
                <span
                  className="st-spin absolute rounded-[50%] border-2 border-dashed border-[var(--color-accent-500)]/60"
                  style={{ width: '122%', height: '130%', animationDuration: '60s' }}
                />
                <span
                  className="st-spin-rev absolute rounded-[50%] border border-white/15"
                  style={{ width: '146%', height: '160%', animationDuration: '110s' }}
                />
                {[0, 1].map((i) => (
                  <span
                    key={i}
                    className="st-ping absolute h-3/4 w-3/4 rounded-[28px] border border-[var(--color-accent-500)]"
                    style={{ animationDelay: `${i * 1.2}s`, animationDuration: '3.6s' }}
                  />
                ))}
              </div>

              <div
                className="ab-anim relative"
                style={{
                  opacity: started ? 1 : 0,
                  clipPath: started ? 'circle(100% at 50% 50%)' : 'circle(0% at 50% 50%)',
                  transform: started ? 'none' : 'rotate(-8deg) scale(0.85)',
                  transition: `opacity 900ms ${EASE} 300ms, clip-path 1500ms ${EASE} 300ms, transform 1500ms ${EASE} 300ms`,
                }}
              >
                <div ref={posterRef} className="will-change-transform">
                  <Link
                    to={`${EVENTS_PATH}/${item.id}`}
                    onPointerMove={onPosterMove}
                    onPointerLeave={onPosterLeave}
                    className="group relative block overflow-hidden rounded-[var(--radius-lg)] border-[3px] border-[var(--color-accent-500)] shadow-[0_0_48px_rgba(245,158,11,0.35)]"
                  >
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                      className="aspect-[480/340] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-105"
                    />
                    <div
                      ref={glareRef}
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
                      style={{ mixBlendMode: 'overlay' }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventSpotlight;
