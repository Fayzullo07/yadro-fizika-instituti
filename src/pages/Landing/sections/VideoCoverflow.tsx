import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { useVideoGallery } from '@/hooks/useVideoGallery';
import { useLanguage } from '@/contexts/LanguageContext';
import { VIDEO_GALLERY_PATH } from '@/routes/path';
import type { VideoGalleryItem } from '@/types';
import { CONTAINER, SECTION_PAD } from './layout';
import SectionHeader from './SectionHeader';
import VideoModal from './VideoModal';
import { thumbOf } from './videoUtils';
import { EASE } from './motion';

const DESKTOP_W = 540;
const COMPACT_BELOW = 760;
const AUTOPLAY_S = 6;
const SWIPE_PX = 50;

const STARS: Array<[number, number, number, number]> = [
  [4, 12, 2, 0],
  [11, 70, 3, 1.1],
  [20, 36, 2, 2.2],
  [29, 88, 2, 0.6],
  [37, 8, 3, 1.7],
  [46, 66, 2, 2.9],
  [54, 20, 2, 0.3],
  [63, 84, 3, 1.4],
  [71, 10, 2, 2.5],
  [79, 58, 2, 0.9],
  [88, 90, 3, 2.0],
  [95, 28, 2, 0.2],
  [7, 48, 2, 1.9],
  [92, 62, 2, 2.7],
];

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pad = (n: number) => String(n).padStart(2, '0');

/** Title whose words rise out of a mask; re-runs when `id` changes. */
const MaskedTitle: React.FC<{ text: string; id: number; className?: string }> = ({
  text,
  id,
  className = '',
}) => (
  <h3 key={id} className={`flex flex-wrap justify-center gap-x-[0.28em] ${className}`}>
    {text.split(' ').map((word, i) => (
      <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
        <span className="vo-word inline-block" style={{ animationDelay: `${i * 70}ms` }}>
          {word}
        </span>
      </span>
    ))}
  </h3>
);

const PlayDisc: React.FC<{ size: number }> = ({ size }) => (
  <span
    aria-hidden
    className="relative flex items-center justify-center rounded-full bg-[var(--color-accent-500)] text-[var(--color-brand-950)] shadow-[0_0_60px_rgba(245,158,11,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
    style={{ width: size, height: size }}
  >
    <span className="st-ping absolute inset-0 rounded-full border-2 border-[var(--color-accent-500)]" />
    <span
      className="st-ping absolute inset-0 rounded-full border border-[var(--color-accent-500)]"
      style={{ animationDelay: '1.2s' }}
    />
    <svg viewBox="0 0 24 24" className="size-1/2 translate-x-[8%]" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  </span>
);

const NavButton: React.FC<{ dir: 'prev' | 'next'; onClick: () => void; label: string }> = ({
  dir,
  onClick,
  label,
}) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    className={`absolute top-1/2 z-40 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl leading-none text-white backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 hover:bg-white/20 hover:shadow-[0_0_32px_rgba(245,158,11,0.5)] ${
      dir === 'prev' ? 'left-0 md:left-2' : 'right-0 md:right-2'
    }`}
  >
    {dir === 'prev' ? '‹' : '›'}
  </button>
);

const VideoCoverflow: React.FC = () => {
  const { t } = useLanguage();
  const { data, loading } = useVideoGallery({ per_page: 6 });
  const items = (data?.data ?? []).slice(0, 6);
  const n = items.length;

  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [playing, setPlaying] = useState<VideoGalleryItem | null>(null);
  const [started, setStarted] = useState(false);
  const [settled, setSettled] = useState(false);
  const [paused, setPaused] = useState(false);
  const [width, setWidth] = useState(1248);

  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; moved: boolean } | null>(null);

  const compact = width < COMPACT_BELOW;
  const cardW = compact ? Math.round(width * 0.74) : DESKTOP_W;
  const cardH = Math.round(cardW * 0.76);
  const stageH = cardH + (compact ? 170 : 200);
  const x1 = cardW * (compact ? 0.78 : 0.68);
  const x2 = cardW * 1.08;
  const maxOff = compact ? 1 : 2;

  const active = items[index];

  const go = useCallback(
    (to: number) => {
      if (!n) return;
      const next = ((to % n) + n) % n;
      if (next === index) return;
      setPrevIndex(index);
      setIndex(next);
      setTimeout(() => setPrevIndex(null), 1100);
    },
    [n, index]
  );

  // measure the container
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // start once on screen, then settle (entrance delays stop applying)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStarted(true);
        io.disconnect();
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [n]);

  useEffect(() => {
    if (!started) return;
    const id = setTimeout(() => setSettled(true), 2400);
    return () => clearTimeout(id);
  }, [started]);

  // pointer parallax for the whole stage
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reduced()) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      el.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    };
    const onLeave = () => {
      el.style.setProperty('--px', '0');
      el.style.setProperty('--py', '0');
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  // keyboard, when focus is inside the section
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(index + 1);
      else if (e.key === 'ArrowLeft') go(index - 1);
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [go, index]);

  // light sheen sweeps the new front card
  useEffect(() => {
    const el = sheenRef.current;
    if (!el || !started || reduced()) return;
    const a = el.animate(
      [
        { transform: 'translateX(-140%) skewX(-18deg)' },
        { transform: 'translateX(320%) skewX(-18deg)' },
      ],
      { duration: 1300, delay: 350, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'both' }
    );
    return () => a.cancel();
  }, [index, started]);

  const onCardMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const glare = glareRef.current;
    if (!glare || reduced()) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    glare.style.opacity = '1';
    glare.style.background = `radial-gradient(360px circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.28), transparent 55%)`;
  };
  const onCardLeave = () => {
    if (glareRef.current) glareRef.current.style.opacity = '0';
  };

  if (!loading && !n) return null;

  const half = Math.floor(n / 2);

  return (
    <section
      ref={sectionRef}
      tabIndex={-1}
      className={`relative isolate overflow-hidden bg-[var(--color-brand-950)] outline-none ${SECTION_PAD}`}
      style={{ '--px': 0, '--py': 0 } as CSSProperties}
    >
      {/* ambient: the front poster's own colours, aurora, rays and stars */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {prevIndex !== null && items[prevIndex] && (
          <img
            key={`out-${items[prevIndex].id}`}
            src={thumbOf(items[prevIndex], 'mqdefault')}
            alt=""
            className="lb-ambient-out absolute inset-0 size-full scale-125 object-cover opacity-40 blur-[90px] saturate-[1.6]"
          />
        )}
        {active && (
          <img
            key={`in-${active.id}`}
            src={thumbOf(active, 'mqdefault')}
            alt=""
            className="lb-ambient-in absolute inset-0 size-full scale-125 object-cover opacity-40 blur-[90px] saturate-[1.6]"
          />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,19,48,0.2),rgba(10,19,48,0.92)_78%)]" />
        <div className="an-aurora-a absolute -left-[8%] top-[10%] size-[480px] rounded-full bg-[var(--color-brand-600)] opacity-35 blur-[130px]" />
        <div className="an-aurora-b absolute -right-[6%] bottom-[6%] size-[420px] rounded-full bg-[var(--color-accent-500)] opacity-[0.12] blur-[130px]" />
        <div
          className="st-spin absolute left-1/2 top-[58%] size-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.16]"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0 8%, rgba(245,158,11,0.9) 12%, transparent 18% 40%, rgba(0,79,182,0.9) 46%, transparent 52% 78%, rgba(245,158,11,0.7) 84%, transparent 90%)',
            maskImage: 'radial-gradient(circle, transparent 18%, black 40%, transparent 72%)',
            WebkitMaskImage: 'radial-gradient(circle, transparent 18%, black 40%, transparent 72%)',
            animationDuration: '70s',
          }}
        />
        {STARS.map(([x, y, s, d], i) => (
          <span
            key={i}
            className="st-star absolute rounded-full bg-white"
            style={{ left: `${x}%`, top: `${y}%`, width: s, height: s, animationDelay: `${d}s` }}
          />
        ))}
      </div>

      <div className={`${CONTAINER} relative flex flex-col gap-[var(--space-8)]`}>
        <SectionHeader
          dark
          eyebrow={t('videoGallery.subtitle')}
          title={t('videoGallery.title')}
          to={VIDEO_GALLERY_PATH}
          viewAllLabel={t('videoGallery.viewAll')}
        />

        <div
          ref={wrapRef}
          className="relative w-full"
          style={{ height: stageH }}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onPointerDown={(e) => {
            drag.current = { x: e.clientX, moved: false };
          }}
          onPointerUp={(e) => {
            const d = drag.current;
            drag.current = null;
            if (d && Math.abs(e.clientX - d.x) > SWIPE_PX) {
              d.moved = true;
              go(index + (e.clientX < d.x ? 1 : -1));
              // swallow the click that follows a swipe
              const stop = (ev: Event) => ev.stopPropagation();
              window.addEventListener('click', stop, { capture: true, once: true });
            }
          }}
        >
          {loading && !n ? (
            <div className="mx-auto h-[360px] w-[540px] max-w-full animate-pulse rounded-[var(--radius-lg)] bg-white/10" />
          ) : (
            <>
              {/* 3D stage */}
              <div
                className="absolute inset-x-0 top-0"
                style={{
                  height: cardH + 40,
                  perspective: 1500,
                  transform: 'rotateY(calc(var(--px) * 3deg)) rotateX(calc(var(--py) * -2deg))',
                  transition: 'transform 300ms linear',
                }}
              >
                {/* floor glow under the front card */}
                <div
                  aria-hidden
                  className="ev-glow absolute left-1/2 -translate-x-1/2 rounded-[50%] bg-[var(--color-accent-500)] blur-[60px]"
                  style={{ top: cardH + 6, width: cardW * 0.9, height: 36 }}
                />
                <div className="relative size-full" style={{ transformStyle: 'preserve-3d' }}>
                  {items.map((item, i) => {
                    const off = ((i - index + n + half) % n) - half;
                    const abs = Math.abs(off);
                    const visible =
                      abs <= maxOff && !(n >= 3 && n % 2 === 0 && off === -half && maxOff >= half);
                    const sign = Math.sign(off);
                    const x = abs === 0 ? 0 : sign * (abs === 1 ? x1 : x2);
                    const z = -abs * 140;
                    const rot = -sign * (abs === 1 ? 40 : 54);
                    const scale = abs === 0 ? 1 : abs === 1 ? 0.84 : 0.68;
                    const front = off === 0;
                    const delay = started && !settled ? 200 + abs * 160 : 0;
                    return (
                      <div
                        key={item.id}
                        className="absolute top-0"
                        style={{
                          width: cardW,
                          height: cardH,
                          left: `calc(50% - ${cardW / 2}px)`,
                          zIndex: 20 - abs,
                          opacity:
                            started && visible ? (abs === 0 ? 1 : abs === 1 ? 0.78 : 0.45) : 0,
                          pointerEvents: visible ? 'auto' : 'none',
                          transform: started
                            ? `translateX(${x}px) translateZ(${z}px) rotateY(${rot}deg) scale(${scale})`
                            : 'translateX(0) translateZ(-500px) rotateY(160deg) scale(0.3)',
                          transition: `transform 1300ms ${EASE} ${delay}ms, opacity 900ms ${EASE} ${delay}ms`,
                          WebkitBoxReflect:
                            'below 8px linear-gradient(transparent 62%, rgba(255,255,255,0.22))',
                        }}
                      >
                        <div
                          className="group relative size-full cursor-pointer overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-brand-900)]"
                          style={{
                            boxShadow: front
                              ? '0 0 0 3px var(--color-accent-500), 0 0 90px rgba(245,158,11,0.4)'
                              : '0 20px 50px rgba(0,0,0,0.5)',
                            transition: `box-shadow 900ms ${EASE}`,
                          }}
                          role="button"
                          tabIndex={0}
                          aria-label={item.title}
                          onClick={() => (front ? setPlaying(item) : go(i))}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              if (front) setPlaying(item);
                              else go(i);
                            }
                          }}
                          onPointerMove={front ? onCardMove : undefined}
                          onPointerLeave={front ? onCardLeave : undefined}
                        >
                          <img
                            src={thumbOf(item, 'hqdefault')}
                            alt=""
                            loading="lazy"
                            draggable={false}
                            className={`size-full scale-110 object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-125 ${
                              front ? 'vo-kenburns' : ''
                            }`}
                          />
                          <span
                            className="absolute inset-0 bg-[rgba(5,10,28,0.55)] transition-opacity duration-1000"
                            style={{ opacity: front ? 0.12 : 1 }}
                          />
                          {front && (
                            <>
                              <span className="absolute inset-0 flex items-center justify-center">
                                <PlayDisc size={compact ? 64 : 88} />
                              </span>
                              <div
                                ref={glareRef}
                                aria-hidden
                                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
                                style={{ mixBlendMode: 'overlay' }}
                              />
                              <div
                                ref={sheenRef}
                                aria-hidden
                                className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                style={{ transform: 'translateX(-140%) skewX(-18deg)' }}
                              />
                              <span className="absolute left-4 top-4 rounded-full bg-[var(--color-accent-500)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-brand-950)]">
                                {t('landing.video.now')}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {n > 1 && (
                <>
                  <NavButton dir="prev" label="‹" onClick={() => go(index - 1)} />
                  <NavButton dir="next" label="›" onClick={() => go(index + 1)} />
                </>
              )}

              {/* caption, counter and autoplay progress */}
              {active && (
                <div
                  className="absolute inset-x-0 z-30 flex flex-col items-center gap-[var(--space-4)]"
                  style={{
                    top: cardH + (compact ? 52 : 62),
                    opacity: started ? 1 : 0,
                    transition: `opacity 900ms ${EASE} 1000ms`,
                  }}
                >
                  <MaskedTitle
                    text={active.title}
                    id={active.id}
                    className="max-w-[760px] px-[var(--space-4)] text-center text-[18px] font-bold leading-7 text-[var(--color-neutral-0)] md:text-[24px] md:leading-8"
                  />
                  {n > 1 && (
                    <div className="flex items-center gap-[var(--space-3)] text-sm font-semibold text-white/80">
                      <span key={index} className="lb-count inline-block tabular-nums text-white">
                        {pad(index + 1)}
                      </span>
                      <span className="relative h-[3px] w-28 overflow-hidden rounded-full bg-white/15 md:w-40">
                        <span
                          key={index}
                          className="vc-progress absolute inset-y-0 left-0 rounded-full bg-[var(--color-accent-500)] shadow-[0_0_10px_rgba(245,158,11,0.9)]"
                          style={{
                            animationDuration: `${AUTOPLAY_S}s`,
                            animationPlayState:
                              paused || playing || !started ? 'paused' : 'running',
                          }}
                          onAnimationEnd={() => !reduced() && go(index + 1)}
                        />
                      </span>
                      <span className="tabular-nums">{pad(n)}</span>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {playing && <VideoModal item={playing} onClose={() => setPlaying(null)} />}
    </section>
  );
};

export default VideoCoverflow;
