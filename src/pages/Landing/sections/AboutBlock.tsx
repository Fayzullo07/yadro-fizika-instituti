import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApi } from '@/hooks/useApi';
import { generalApi } from '@/services/api';
import { stripHtmlAndDecode } from '@/utils/htmlUtils';
import { ABOUT_PATH } from '@/routes/path';
import type { AboutData, SingleResponse } from '@/types';
import { CONTAINER } from './layout';

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const TILT = 5;

/** Floating dust: [x%, y%, size px, delay s, duration s]. */
const DUST: Array<[number, number, number, number, number]> = [
  [6, 82, 2, 0, 9],
  [12, 64, 3, 2.1, 12],
  [19, 90, 2, 4.2, 10],
  [26, 70, 2, 1.1, 13],
  [33, 86, 3, 5.3, 11],
  [41, 76, 2, 3.2, 9],
  [48, 92, 2, 0.6, 14],
  [55, 68, 3, 6.1, 10],
  [62, 88, 2, 2.7, 12],
  [69, 74, 2, 4.8, 9],
  [76, 90, 3, 1.6, 13],
  [83, 66, 2, 5.7, 11],
  [90, 84, 2, 3.7, 10],
  [95, 72, 3, 0.9, 12],
  [38, 58, 2, 7.2, 9],
  [72, 60, 2, 6.6, 14],
];

/** 0 → target with an ease-out, starting when `active` turns true. */
const useCountTo = (target: number, active: boolean, ms = 2200) => {
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
      const p = Math.min((now - start) / ms, 1);
      setValue(Math.round(target * (p === 1 ? 1 : 1 - Math.pow(2, -10 * p))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, ms]);

  return value;
};

const Words: React.FC<{ text: string; active: boolean; className?: string }> = ({
  text,
  active,
  className = '',
}) => (
  <h2 className={`flex flex-wrap gap-x-[0.26em] ${className}`}>
    {text.split(' ').map((word, i) => (
      <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
        <span
          className={`inline-block ${active ? 'ab-word' : ''}`}
          style={{
            animationDelay: `${650 + i * 110}ms`,
            transform: active ? undefined : 'translateY(115%)',
          }}
        >
          {word}
        </span>
      </span>
    ))}
  </h2>
);

const GlassChip: React.FC<{
  value: string;
  label: string;
  active: boolean;
  delay: number;
  className?: string;
}> = ({ value, label, active, delay, className = '' }) => (
  <div
    className={`ab-anim ${className}`}
    style={{
      opacity: active ? 1 : 0,
      transform: active ? 'none' : 'translateY(40px) scale(0.7) rotate(-6deg)',
      transition: `opacity 900ms ${EASE} ${delay}ms, transform 1300ms ${EASE} ${delay}ms`,
    }}
  >
    <div
      className="ab-bob rounded-[var(--radius-lg)] border border-white/25 bg-white/10 px-[var(--space-6)] py-[var(--space-4)] backdrop-blur-xl"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-[40px] font-bold leading-none tabular-nums text-[var(--color-neutral-0)]">
        {value}
      </div>
      <div className="mt-[var(--space-1)] text-[14px] leading-5 text-[var(--color-neutral-300)]">
        {label}
      </div>
    </div>
  </div>
);

const AboutBlock: React.FC = () => {
  const { t, language } = useLanguage();
  const { data: response, loading } = useApi<SingleResponse<AboutData>>(
    () => generalApi.getAbout(language),
    [language]
  );
  const about = response?.data;

  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  const year = useCountTo(1956, started);
  const anniversary = useCountTo(70, started, 1800);

  // start once the section is on screen
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
  }, [about]);

  // scroll parallax (--sp, -1…1) and pointer parallax (--mx/--my, -0.5…0.5)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh - r.top) / (vh + r.height);
      el.style.setProperty('--sp', String(Math.max(-1, Math.min(1, p * 2 - 1)).toFixed(3)));
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
  }, [about]);

  const onPanelMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const panel = panelRef.current;
    const glare = glareRef.current;
    if (!panel || !glare || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = panel.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    panel.style.transition = 'transform 120ms linear';
    panel.style.transform = `perspective(1400px) rotateX(${(0.5 - py) * TILT}deg) rotateY(${(px - 0.5) * TILT * 1.6}deg)`;
    glare.style.opacity = '1';
    glare.style.background = `radial-gradient(420px circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.16), transparent 60%)`;
  };
  const onPanelLeave = () => {
    const panel = panelRef.current;
    if (panel) {
      panel.style.transition = `transform 800ms ${EASE}`;
      panel.style.transform = '';
    }
    if (glareRef.current) glareRef.current.style.opacity = '0';
  };

  if (!loading && !about) return null;

  const text = about ? stripHtmlAndDecode(about.content || about.description) : '';
  const title = about?.title || t('about.heroTitle');

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[var(--color-brand-950)]"
      style={{ '--sp': 0, '--mx': 0, '--my': 0 } as CSSProperties}
    >
      {/* backdrop: curtain reveal, Ken Burns, scroll + pointer parallax */}
      <div
        aria-hidden
        className="ab-anim absolute inset-0 -z-10"
        style={{
          clipPath: started ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
          transition: `clip-path 1700ms ${EASE}`,
        }}
      >
        <div
          className="absolute inset-[-8%]"
          style={{
            transform:
              'translate(calc(var(--mx) * -22px), calc(var(--sp) * -70px + var(--my) * -14px))',
          }}
        >
          {about?.image && (
            <img
              src={about.image}
              alt=""
              loading="lazy"
              className="ab-kenburns size-full object-cover"
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(5,10,28,0.96)] via-[rgba(5,10,28,0.7)] to-[rgba(5,10,28,0.15)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,10,28,0.7)] via-transparent to-transparent" />
        <div className="absolute -left-32 top-1/3 size-[520px] rounded-full bg-[var(--color-brand-600)] opacity-35 blur-[130px]" />
        {/* light beam sweeping across the photo */}
        <div className="ab-beam absolute inset-y-[-10%] left-0 w-[22vw] bg-gradient-to-r from-transparent via-white/[0.14] to-transparent mix-blend-screen" />
        {DUST.map(([x, y, s, d, dur], i) => (
          <span
            key={i}
            className="ab-drift absolute rounded-full bg-white"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: s,
              height: s,
              animationDelay: `${d}s`,
              animationDuration: `${dur}s`,
              boxShadow: '0 0 10px 2px rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>

      <div
        className={`${CONTAINER} relative flex min-h-[640px] flex-col justify-center gap-[var(--space-8)] py-[var(--space-16)] md:min-h-[760px] md:py-[var(--space-24)] lg:flex-row lg:items-center lg:justify-between`}
      >
        {/* glass panel */}
        <div
          ref={panelRef}
          onPointerMove={onPanelMove}
          onPointerLeave={onPanelLeave}
          className="ab-anim relative w-full max-w-[600px] will-change-transform"
          style={{
            opacity: started ? 1 : 0,
            translate: started ? '0 0' : '-70px 0',
            filter: started ? 'blur(0px)' : 'blur(16px)',
            transition: `opacity 1200ms ${EASE} 500ms, translate 1400ms ${EASE} 500ms, filter 1200ms ${EASE} 500ms`,
          }}
        >
          <div className="relative rounded-[28px] border border-white/15 bg-white/[0.06] p-[var(--space-8)] backdrop-blur-2xl md:p-[var(--space-12)]">
            <div
              aria-hidden
              className="ab-border pointer-events-none absolute inset-0 rounded-[28px]"
            />
            <div
              ref={glareRef}
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500"
            />

            <div className="relative flex flex-col items-start gap-[var(--space-6)]">
              <span className="flex items-center gap-[var(--space-3)] text-[12px] font-bold uppercase leading-4 tracking-[0.14em] text-[var(--color-accent-500)]">
                <span
                  className="ab-anim h-[3px] w-8 origin-left rounded-[var(--radius-full)] bg-[var(--color-accent-500)]"
                  style={{
                    transform: started ? 'scaleX(1)' : 'scaleX(0)',
                    transition: `transform 900ms ${EASE} 700ms`,
                  }}
                />
                {t('about.sectionSubtitle')}
              </span>

              <Words
                text={title}
                active={started}
                className="text-[34px] font-extrabold leading-[1.1] tracking-tight text-[var(--color-neutral-0)] md:text-[44px]"
              />

              <div className="flex items-center gap-[var(--space-4)]">
                <span className="text-[52px] font-bold leading-none tabular-nums text-[var(--color-accent-500)]">
                  {year}
                </span>
                <span className="flex flex-col text-[16px] leading-6 text-[var(--color-neutral-300)]">
                  {t('landing.about.yearLabel')}
                  <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent-500)]">
                    {t('landing.about.anniversary')}
                  </span>
                </span>
              </div>

              {loading && !about ? (
                <div className="h-28 w-full animate-pulse rounded-[var(--radius-md)] bg-white/10" />
              ) : (
                <p
                  className="ab-anim line-clamp-5 text-[16px] leading-7 text-[var(--color-neutral-300)]"
                  style={{
                    opacity: started ? 1 : 0,
                    filter: started ? 'blur(0)' : 'blur(8px)',
                    transition: `opacity 1100ms ${EASE} 1200ms, filter 1100ms ${EASE} 1200ms`,
                  }}
                >
                  {text}
                </p>
              )}

              <Link
                to={ABOUT_PATH}
                className="ab-anim group inline-flex items-center gap-[var(--space-2)] rounded-[var(--radius-md)] bg-[var(--color-accent-500)] px-[var(--space-6)] py-[var(--space-3)] text-[16px] font-semibold leading-6 text-[var(--color-brand-950)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-[var(--color-accent-600)] hover:shadow-[0_10px_40px_rgba(245,158,11,0.45)]"
                style={{
                  opacity: started ? 1 : 0,
                  translate: started ? '0 0' : '0 24px',
                  transitionProperty: 'opacity, translate, transform, background-color, box-shadow',
                  transitionDelay: started ? '1450ms, 1450ms, 0ms, 0ms, 0ms' : '0ms',
                }}
              >
                {t('about.sectionReadMore')}
                <span
                  aria-hidden
                  className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* floating glass chips */}
        <div
          className="flex gap-[var(--space-4)] self-start lg:mb-[var(--space-8)] lg:self-end"
          style={{
            translate: 'calc(var(--mx) * 26px) calc(var(--my) * 18px)',
          }}
        >
          <GlassChip
            value={String(year)}
            label={t('landing.about.yearLabel')}
            active={started}
            delay={1500}
          />
          <GlassChip
            value={String(anniversary)}
            label={t('landing.about.anniversary')}
            active={started}
            delay={1700}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutBlock;
