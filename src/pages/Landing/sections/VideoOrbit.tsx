import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { useVideoGallery } from '@/hooks/useVideoGallery';
import { useLanguage } from '@/contexts/LanguageContext';
import { VIDEO_GALLERY_PATH } from '@/routes/path';
import type { VideoGalleryItem } from '@/types';
import { CONTAINER, SECTION_PAD } from './layout';
import SectionHeader from './SectionHeader';

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

/** Stage is designed at this size and scaled down to fit narrower containers. */
const W = 1248;
const H = 740;
const CX = W / 2;
const CY = 292;
const A = 470; // orbit half-width
const B = 168; // orbit half-height
const REEL = 420;
const SAT = 128;
const OMEGA = (Math.PI * 2) / 64; // rad / s
const INTRO_S = 2.1;
const COMPACT_BELOW = 760;

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

const getYouTubeId = (url: string): string | null =>
  url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/))([^?&/#]+)/
  )?.[1] ?? null;

const thumbOf = (item: VideoGalleryItem, quality: 'hqdefault' | 'mqdefault') => {
  const id = getYouTubeId(item.url);
  return id ? `https://img.youtube.com/vi/${id}/${quality}.jpg` : undefined;
};

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const VideoModal: React.FC<{ item: VideoGalleryItem; onClose: () => void }> = ({
  item,
  onClose,
}) => {
  const id = getYouTubeId(item.url);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-[var(--space-4)]"
      onClick={onClose}
    >
      <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        {id ? (
          <div className="relative aspect-video overflow-hidden rounded-[var(--radius-lg)] shadow-2xl">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
              title={item.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 size-full border-0"
            />
          </div>
        ) : (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-[var(--radius-lg)] bg-[var(--color-brand-900)] p-[var(--space-8)] text-center text-[var(--color-neutral-0)]"
          >
            {item.title} →
          </a>
        )}
        <p className="mt-[var(--space-3)] text-center text-[14px] text-[var(--color-neutral-300)]">
          {item.title}
        </p>
      </div>
    </div>
  );
};

/** Title whose words slide up out of a mask; re-runs when `id` changes. */
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
    className="relative flex items-center justify-center rounded-full bg-[var(--color-accent-500)] text-[var(--color-brand-950)] shadow-[0_0_60px_rgba(245,158,11,0.55)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
    style={{ width: size, height: size }}
  >
    <span className="st-ping absolute inset-0 rounded-full border-2 border-[var(--color-accent-500)]" />
    <svg viewBox="0 0 24 24" className="size-1/2 translate-x-[8%]" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  </span>
);

interface Pos {
  x: number;
  y: number;
}

const VideoOrbit: React.FC = () => {
  const { t } = useLanguage();
  const { data, loading } = useVideoGallery({ per_page: 4 });
  const items = (data?.data ?? []).slice(0, 4);

  const [activeId, setActiveId] = useState<number | null>(null);
  const [prevSrc, setPrevSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState<VideoGalleryItem | null>(null);
  const [started, setStarted] = useState(false);
  const [width, setWidth] = useState(W);

  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const satEls = useRef(new Map<number, HTMLElement>());
  const satPos = useRef(new Map<number, Pos>());
  const cometRef = useRef<HTMLElement>(null);
  const speed = useRef({ now: 1, target: 1 });
  const inView = useRef(false);
  const introAt = useRef<number | null>(null);
  const firstPoster = useRef(true);
  const busy = useRef(false);

  const active = items.find((v) => v.id === activeId) ?? items[0];
  const sats = items.filter((v) => v.id !== active?.id);
  const compact = width < COMPACT_BELOW;
  const scale = Math.min(1, width / W);

  // measure the container
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // start once visible; remember visibility for the animation loop
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // orbit loop: satellites ride the ellipse, nearer ones larger and in front
  const satKey = sats.map((v) => v.id).join(',');
  useEffect(() => {
    if (compact || !started || !satKey) return;
    const reduced = prefersReducedMotion();
    let raf = 0;
    let last = 0;
    let angle = 0;
    let comet = 0;
    const base = new Map<number, number>();
    satKey.split(',').forEach((id, i, all) => {
      base.set(Number(id), Math.PI + (i / all.length) * Math.PI * 2 + 0.2);
    });

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!last) last = now;
      if (introAt.current === null) introAt.current = reduced ? now - INTRO_S * 2000 : now;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!inView.current) return;
      const sp = speed.current;
      sp.now += (sp.target - sp.now) * Math.min(1, dt * 3.5);
      angle += dt * OMEGA * sp.now * (reduced ? 0 : 1);
      comet += dt * OMEGA * 2.6 * (reduced ? 0 : 1);
      const p = Math.min(1, (now - (introAt.current ?? now)) / 1000 / INTRO_S);
      const e = 1 - Math.pow(1 - p, 3);

      base.forEach((b, id) => {
        const el = satEls.current.get(id);
        if (!el) return;
        const th = b + angle;
        const x = CX + Math.cos(th) * A * e;
        const y = CY + Math.sin(th) * B * e;
        const depth = (Math.sin(th) + 1) / 2; // 0 back … 1 front
        const s = (0.8 + depth * 0.32) * (0.4 + 0.6 * e);
        satPos.current.set(id, { x, y });
        el.style.transform = `translate(${x - SAT / 2}px, ${y - SAT / 2}px) scale(${s})`;
        el.style.zIndex = depth > 0.5 ? '30' : '10';
        el.style.opacity = String(Math.min(1, e * 1.4) * (0.72 + depth * 0.28));
        el.style.filter = depth > 0.5 ? 'none' : `brightness(${0.7 + depth * 0.5})`;
      });

      const c = cometRef.current;
      if (c) {
        const x = CX + Math.cos(comet) * A * e;
        const y = CY + Math.sin(comet) * B * e;
        c.style.transform = `translate(${x - 5}px, ${y - 5}px)`;
        c.style.opacity = String(e);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [compact, started, satKey]);

  // new poster opens as an expanding circle over the old one
  useEffect(() => {
    const img = posterRef.current;
    if (!img) return;
    if (firstPoster.current) {
      firstPoster.current = false;
      return;
    }
    if (prefersReducedMotion()) return;
    img.animate([{ clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(75% at 50% 50%)' }], {
      duration: 1000,
      easing: EASE,
      fill: 'both',
    });
  }, [active?.id]);

  const choose = useCallback(
    (item: VideoGalleryItem) => {
      if (!active || item.id === active.id || busy.current) return;
      busy.current = true;
      const commit = () => {
        setPrevSrc(thumbOf(active, 'hqdefault') ?? null);
        setActiveId(item.id);
        setTimeout(() => setPrevSrc(null), 1100);
        busy.current = false;
      };
      const el = satEls.current.get(item.id);
      const pos = satPos.current.get(item.id);
      const bubble = el?.querySelector<HTMLElement>('[data-bubble]');
      if (!bubble || !pos || compact || prefersReducedMotion()) {
        commit();
        return;
      }
      // the clicked satellite flies into the reel
      bubble
        .animate(
          [
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            {
              transform: `translate(${CX - pos.x}px, ${CY - pos.y}px) scale(3.2)`,
              opacity: 0,
            },
          ],
          { duration: 600, easing: 'cubic-bezier(0.6, 0, 0.4, 1)', fill: 'forwards' }
        )
        .finished.then(commit, commit);
    },
    [active, compact]
  );

  // sichqoncha parallax
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage || prefersReducedMotion()) return;
    const r = e.currentTarget.getBoundingClientRect();
    stage.style.setProperty('--px', String(((e.clientX - r.left) / r.width - 0.5).toFixed(3)));
    stage.style.setProperty('--py', String(((e.clientY - r.top) / r.height - 0.5).toFixed(3)));
  };
  const onLeave = () => {
    const stage = stageRef.current;
    stage?.style.setProperty('--px', '0');
    stage?.style.setProperty('--py', '0');
  };

  if (!loading && !items.length) return null;

  const reelSrc = active ? thumbOf(active, 'hqdefault') : undefined;

  const reel = active && (
    <button
      type="button"
      onClick={() => setPlaying(active)}
      aria-label={active.title}
      className="group relative block size-full overflow-hidden rounded-full border-[5px] border-[var(--color-accent-500)] bg-[var(--color-brand-900)] shadow-[0_0_80px_rgba(245,158,11,0.4)]"
    >
      {prevSrc && (
        <img src={prevSrc} alt="" className="absolute inset-0 size-full scale-110 object-cover" />
      )}
      <img
        key={active.id}
        ref={posterRef}
        src={reelSrc}
        alt=""
        className="vo-kenburns absolute inset-0 size-full scale-110 object-cover"
      />
      <span className="absolute inset-0 bg-[rgba(5,10,28,0.32)] transition-colors duration-700 group-hover:bg-[rgba(5,10,28,0.12)]" />
      <span className="absolute inset-0 flex items-center justify-center">
        <PlayDisc size={compact ? 64 : 88} />
      </span>
    </button>
  );

  return (
    <section className={`relative overflow-hidden bg-[var(--color-brand-950)] ${SECTION_PAD}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[58%] size-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-brand-600)] opacity-45 blur-[150px]"
      />
      <div className={`${CONTAINER} relative flex flex-col gap-[var(--space-8)]`}>
        <SectionHeader
          dark
          eyebrow={t('videoGallery.subtitle')}
          title={t('videoGallery.title')}
          to={VIDEO_GALLERY_PATH}
          viewAllLabel={t('videoGallery.viewAll')}
        />

        <div ref={wrapRef} className="w-full" onPointerMove={onMove} onPointerLeave={onLeave}>
          {loading && !items.length ? (
            <div className="mx-auto size-[320px] animate-pulse rounded-full bg-white/10" />
          ) : compact ? (
            <div className="flex flex-col items-center gap-[var(--space-6)]">
              <div
                className="size-[260px]"
                style={{
                  opacity: started ? 1 : 0,
                  transform: started ? 'none' : 'scale(0.6) rotate(-40deg)',
                  transition: `opacity 900ms ${EASE}, transform 1200ms ${EASE}`,
                }}
              >
                {reel}
              </div>
              {active && (
                <MaskedTitle
                  text={active.title}
                  id={active.id}
                  className="text-center text-[20px] font-bold leading-7 text-[var(--color-neutral-0)]"
                />
              )}
              <div className="scrollbar-hide flex max-w-full gap-[var(--space-4)] overflow-x-auto px-1 py-2">
                {sats.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => choose(v)}
                    className="flex w-24 shrink-0 flex-col items-center gap-[var(--space-2)]"
                  >
                    <span className="block size-20 overflow-hidden rounded-full border-[3px] border-white/80">
                      <img
                        src={thumbOf(v, 'mqdefault')}
                        alt=""
                        className="size-full object-cover"
                      />
                    </span>
                    <span className="line-clamp-2 text-center text-[11px] leading-4 text-[var(--color-neutral-300)]">
                      {v.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="relative mx-auto" style={{ width: W * scale, height: H * scale }}>
              <div
                ref={stageRef}
                className="absolute left-0 top-0 origin-top-left"
                style={
                  {
                    width: W,
                    height: H,
                    transform: `scale(${scale})`,
                    '--px': 0,
                    '--py': 0,
                  } as CSSProperties
                }
              >
                {/* orbit paths + rotating dashed ring */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    translate: 'calc(var(--px) * 6px) calc(var(--py) * 5px)',
                    opacity: started ? 1 : 0,
                    transition: `opacity 1400ms ${EASE}`,
                  }}
                >
                  {[
                    { w: A * 2, h: B * 2, o: 0.16 },
                    { w: A * 1.5, h: B * 1.56, o: 0.1 },
                  ].map(({ w, h, o }) => (
                    <span
                      key={w}
                      className="absolute rounded-[50%] border border-white"
                      style={{
                        width: w,
                        height: h,
                        left: CX - w / 2,
                        top: CY - h / 2,
                        opacity: o,
                      }}
                    />
                  ))}
                  <span
                    className="st-spin absolute rounded-full border-2 border-dashed border-[var(--color-accent-500)] opacity-70"
                    style={{
                      width: REEL + 70,
                      height: REEL + 70,
                      left: CX - (REEL + 70) / 2,
                      top: CY - (REEL + 70) / 2,
                      animationDuration: '50s',
                    }}
                  />
                  <span
                    className="st-spin-rev absolute rounded-full border border-dotted border-white/40"
                    style={{
                      width: REEL + 150,
                      height: REEL + 150,
                      left: CX - (REEL + 150) / 2,
                      top: CY - (REEL + 150) / 2,
                      animationDuration: '90s',
                    }}
                  />
                  {STARS.map(([x, y, s, d], i) => (
                    <span
                      key={i}
                      className="st-star absolute rounded-full bg-white"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        width: s,
                        height: s,
                        animationDelay: `${d}s`,
                      }}
                    />
                  ))}
                </div>

                {/* the reel */}
                <div
                  className="absolute z-20"
                  style={{
                    width: REEL,
                    height: REEL,
                    left: CX - REEL / 2,
                    top: CY - REEL / 2,
                    translate: 'calc(var(--px) * -12px) calc(var(--py) * -9px)',
                  }}
                >
                  <div
                    className="size-full"
                    style={{
                      opacity: started ? 1 : 0,
                      transform: started ? 'none' : 'scale(0.2) rotate(-120deg)',
                      transition: `opacity 900ms ${EASE} 150ms, transform 1500ms ${EASE} 150ms`,
                    }}
                  >
                    {reel}
                  </div>
                </div>

                {/* comet riding the main orbit */}
                <span
                  ref={cometRef}
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 z-30 size-[10px] rounded-full bg-[var(--color-accent-500)] opacity-0 shadow-[0_0_18px_6px_rgba(245,158,11,0.8)]"
                />

                {/* orbiting videos */}
                {started &&
                  sats.map((v) => (
                    <div
                      key={v.id}
                      ref={(el) => {
                        if (el) satEls.current.set(v.id, el);
                        else satEls.current.delete(v.id);
                      }}
                      className="absolute left-0 top-0 will-change-transform"
                      style={{ width: SAT, opacity: 0 }}
                      onPointerEnter={() => (speed.current.target = 0.12)}
                      onPointerLeave={() => (speed.current.target = 1)}
                    >
                      <button
                        type="button"
                        data-bubble
                        onClick={() => choose(v)}
                        aria-label={v.title}
                        className="group flex w-full flex-col items-center gap-[var(--space-3)]"
                      >
                        <span className="relative block size-[128px] overflow-hidden rounded-full border-4 border-white/90 shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:border-[var(--color-accent-500)] group-hover:shadow-[0_0_44px_rgba(245,158,11,0.7)]">
                          <img
                            src={thumbOf(v, 'mqdefault')}
                            alt=""
                            loading="lazy"
                            className="size-full scale-110 object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-125"
                          />
                          <span className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                            <PlayDisc size={40} />
                          </span>
                        </span>
                        <span className="line-clamp-3 w-[190px] text-center text-[12px] leading-4 text-[var(--color-neutral-300)] transition-colors duration-500 group-hover:text-[var(--color-neutral-0)]">
                          {v.title}
                        </span>
                      </button>
                    </div>
                  ))}

                {/* caption */}
                {active && (
                  <div
                    className="absolute inset-x-0 z-20 flex flex-col items-center gap-[var(--space-2)]"
                    style={{
                      top: 636,
                      opacity: started ? 1 : 0,
                      transition: `opacity 900ms ${EASE} 900ms`,
                    }}
                  >
                    <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent-500)]">
                      {t('landing.video.now')}
                    </span>
                    <MaskedTitle
                      text={active.title}
                      id={active.id}
                      className="max-w-[760px] text-center text-[22px] font-bold leading-8 text-[var(--color-neutral-0)]"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {playing && <VideoModal item={playing} onClose={() => setPlaying(null)} />}
    </section>
  );
};

export default VideoOrbit;
