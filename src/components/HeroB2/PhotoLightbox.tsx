import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface LightboxState {
  slides: string[];
  index: number;
  /** on-screen box of the round thumbnail that was clicked */
  origin: DOMRect;
}

interface PhotoLightboxProps {
  state: LightboxState | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  labels: { close: string; prev: string; next: string };
}

const OPEN_MS = 900;
const CLOSE_MS = 650;
const SLIDE_OUT_MS = 260;
const SLIDE_IN_MS = 650;
const SLIDE_SHIFT = 90;
const EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';
const FINAL_RADIUS = 20;
const SWIPE_PX = 50;
const TILT = 4;
const RING_COUNT = 3;
const SPARK_COUNT = 26;

/** Deterministic spark burst: angle (rad), distance px, size px. */
const SPARKS = Array.from({ length: SPARK_COUNT }, (_, i) => ({
  angle: (i / SPARK_COUNT) * Math.PI * 2 + (i % 3) * 0.14,
  distance: 170 + ((i * 53) % 260),
  size: 3 + (i % 4),
  delay: (i % 5) * 40,
}));

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const ms = (value: number) => (prefersReducedMotion() ? 0 : value);

/**
 * Photo viewer opened from the hero. The clicked round thumbnail erupts into
 * the full photo: shock rings and a spark burst leave the circle while it
 * grows (FLIP), the photo's own colours bloom into the backdrop, and a light
 * sheen sweeps across it. Afterwards the photo follows the cursor in 3D with a
 * moving glare, and paging cross-dissolves through blur with the ambient glow.
 */
const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ state, onIndexChange, onClose, labels }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [closing, setClosing] = useState(false);
  const [prevAmbient, setPrevAmbient] = useState<string | null>(null);

  const flip = useRef<{ from: Keyframe; to: Keyframe } | null>(null);
  const startIndex = useRef<number | null>(null);
  const grown = useRef(false); // the open animation has played
  const busy = useRef(false); // a slide-out is running
  const direction = useRef(1);
  const swipe = useRef<number | null>(null);
  const swiped = useRef(false); // a swipe just ended; its trailing click must not close

  const open = state !== null;
  const count = state?.slides.length ?? 0;

  // Page lock + wheel swallow while the viewer is up.
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!open || !overlay) return;
    const swallow = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    overlay.addEventListener('wheel', swallow, { passive: false });
    const { overflow, paddingRight } = document.body.style;
    // hiding the page scrollbar would widen the layout and shift everything right,
    // so keep its width reserved while the viewer is open
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    return () => {
      overlay.removeEventListener('wheel', swallow);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [open]);

  // keep the active thumbnail centred in the strip. Scroll only the strip itself:
  // scrollIntoView would also scroll the (overflow-hidden) overlay sideways.
  useEffect(() => {
    const strip = stripRef.current;
    const active = strip?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!strip || !active) return;
    strip.scrollTo({
      left: active.offsetLeft - (strip.clientWidth - active.offsetWidth) / 2,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  }, [state?.index]);

  const go = (delta: number) => {
    const img = imgRef.current;
    if (!state || !img || busy.current || closing || count < 2) return;
    const next = (state.index + delta + count) % count;
    direction.current = Math.sign(delta);
    busy.current = true;
    setPrevAmbient(state.slides[state.index]);
    setTimeout(() => setPrevAmbient(null), 1000);
    const out = img.animate(
      [
        { opacity: 1, transform: 'none', filter: 'blur(0px)' },
        {
          opacity: 0,
          transform: `translateX(${-direction.current * SLIDE_SHIFT}px) scale(0.94)`,
          filter: 'blur(14px)',
        },
      ],
      { duration: ms(SLIDE_OUT_MS), easing: 'ease-in', fill: 'forwards' }
    );
    out.finished.then(
      () => onIndexChange(next),
      () => onIndexChange(next)
    );
  };

  const close = () => {
    const img = imgRef.current;
    const overlay = overlayRef.current;
    const stage = stageRef.current;
    if (!state || !img || !overlay || closing) return;
    setClosing(true);
    const done = () => {
      setClosing(false);
      grown.current = false;
      busy.current = false;
      flip.current = null;
      startIndex.current = null;
      onClose();
    };
    const back = state.index === startIndex.current && flip.current;
    const options = { duration: ms(CLOSE_MS), easing: EASING, fill: 'both' as const };
    overlay.animate([{ opacity: 1 }, { opacity: 0 }], options);
    stage?.animate(
      [
        { transform: stage.style.transform || 'none' },
        { transform: 'perspective(2600px) rotateX(0deg) rotateY(0deg)' },
      ],
      { duration: ms(240), fill: 'forwards' }
    );
    const anim = back
      ? img.animate([flip.current!.to, flip.current!.from], options)
      : img.animate(
          [
            { opacity: 1, transform: 'none', filter: 'blur(0px)' },
            { opacity: 0, transform: 'scale(0.9)', filter: 'blur(10px)' },
          ],
          options
        );
    anim.finished.then(done, done);
  };

  // keyboard: Esc closes, arrows page
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // handlers read refs/props that change with `state`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, state?.index, closing]);

  const burst = () => {
    const overlay = overlayRef.current;
    if (!overlay || prefersReducedMotion()) return;
    overlay.querySelectorAll<HTMLElement>('[data-ring]').forEach((ring, i) => {
      const reach = Math.hypot(window.innerWidth, window.innerHeight) / 56;
      ring.animate(
        [
          { transform: 'translate(-50%, -50%) scale(0.4)', opacity: 0.9 },
          { transform: `translate(-50%, -50%) scale(${reach})`, opacity: 0 },
        ],
        {
          duration: 1500 + i * 250,
          delay: i * 140,
          easing: 'cubic-bezier(0.1, 0.7, 0.2, 1)',
          fill: 'both',
        }
      );
    });
    overlay.querySelectorAll<HTMLElement>('[data-spark]').forEach((spark, i) => {
      const s = SPARKS[i];
      spark.animate(
        [
          { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
          {
            transform: `translate(calc(-50% + ${Math.cos(s.angle) * s.distance}px), calc(-50% + ${Math.sin(s.angle) * s.distance}px)) scale(0)`,
            opacity: 0,
          },
        ],
        {
          duration: 1100 + (i % 4) * 160,
          delay: s.delay,
          easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)',
          fill: 'both',
        }
      );
    });
  };

  const sheen = (delay = 0) => {
    const el = glareRef.current?.querySelector<HTMLElement>('[data-sheen]');
    if (!el || prefersReducedMotion()) return;
    el.animate(
      [
        { transform: 'translateX(-130%) skewX(-18deg)' },
        { transform: 'translateX(260%) skewX(-18deg)' },
      ],
      { duration: 1300, delay, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'both' }
    );
  };

  const handleLoad = () => {
    const img = imgRef.current;
    const overlay = overlayRef.current;
    if (!img || !overlay || !state) return;
    img.style.visibility = 'visible';

    if (grown.current) {
      // paging: the new photo drifts in from its side, defocused, then sharpens
      busy.current = false;
      img.animate(
        [
          {
            opacity: 0,
            transform: `translateX(${direction.current * SLIDE_SHIFT}px) scale(1.06)`,
            filter: 'blur(16px)',
          },
          { opacity: 1, transform: 'none', filter: 'blur(0px)' },
        ],
        { duration: ms(SLIDE_IN_MS), easing: EASING, fill: 'both' }
      );
      sheen(200);
      return;
    }

    // first photo: grow out of the clicked circle into the full photo
    const r = img.getBoundingClientRect();
    const { origin } = state;
    const side = Math.min(r.width, r.height);
    const dx = origin.left + origin.width / 2 - (r.left + r.width / 2);
    const dy = origin.top + origin.height / 2 - (r.top + r.height / 2);
    const insetX = (r.width - side) / 2;
    const insetY = (r.height - side) / 2;

    flip.current = {
      from: {
        transform: `translate(${dx}px, ${dy}px) scale(${origin.width / side}) rotate(-24deg)`,
        clipPath: `inset(${insetY}px ${insetX}px round ${side / 2}px)`,
        filter: 'brightness(1.8) saturate(1.4)',
      },
      to: {
        transform: 'none',
        clipPath: `inset(0px round ${FINAL_RADIUS}px)`,
        filter: 'brightness(1) saturate(1)',
      },
    };
    startIndex.current = state.index;
    grown.current = true;

    const options = { duration: ms(OPEN_MS), easing: EASING, fill: 'both' as const };
    overlay.animate([{ opacity: 0 }, { opacity: 1 }], { ...options, duration: ms(OPEN_MS * 0.7) });
    img.animate([flip.current.from, flip.current.to], options);
    stageRef.current?.animate(
      [
        { boxShadow: '0 0 0 0 rgba(245,158,11,0)' },
        {
          boxShadow: '0 0 0 2px rgba(245,158,11,0.9), 0 0 120px 10px rgba(245,158,11,0.35)',
          offset: 0.55,
        },
        { boxShadow: '0 30px 120px 0 rgba(0,79,182,0.45)' },
      ],
      { duration: ms(OPEN_MS * 1.5), easing: 'ease-out', fill: 'both' }
    );
    burst();
    sheen(ms(OPEN_MS * 0.7));
  };

  // 3D tilt + glare that follow the pointer
  const onStageMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    const glare = glareRef.current;
    if (!stage || !glare || busy.current || closing || prefersReducedMotion()) return;
    const r = stage.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    stage.style.transition = 'transform 120ms linear';
    stage.style.transform = `perspective(2600px) rotateX(${(0.5 - py) * TILT}deg) rotateY(${(px - 0.5) * TILT * 1.6}deg)`;
    glare.style.opacity = '1';
    glare.style.background = `radial-gradient(520px circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.22), transparent 55%)`;
  };
  const onStageLeave = () => {
    const stage = stageRef.current;
    const glare = glareRef.current;
    if (stage) {
      stage.style.transition = `transform 800ms ${EASING}`;
      stage.style.transform = '';
    }
    if (glare) glare.style.opacity = '0';
  };

  if (!state) return null;

  const current = state.slides[state.index];
  const ox = state.origin.left + state.origin.width / 2;
  const oy = state.origin.top + state.origin.height / 2;
  const arrow =
    'absolute top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-2xl leading-none text-white backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 hover:bg-white/20 hover:shadow-[0_0_32px_rgba(245,158,11,0.5)]';

  return createPortal(
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      className="fixed left-0 top-0 z-[1100] flex h-[100dvh] w-screen touch-pan-y items-center justify-center overflow-clip bg-[#050a1c] p-4"
      onPointerDown={(e) => {
        swipe.current = e.clientX;
        swiped.current = false;
      }}
      onPointerUp={(e) => {
        const startX = swipe.current;
        swipe.current = null;
        if (startX !== null && Math.abs(e.clientX - startX) > SWIPE_PX) {
          swiped.current = true;
          go(e.clientX < startX ? 1 : -1);
        }
      }}
      onClickCapture={(e) => {
        if (swiped.current) {
          swiped.current = false;
          e.stopPropagation();
        }
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      {/* ambient light: the photo's own colours, blurred, cross-dissolving per slide */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {prevAmbient && (
          <img
            key={`out-${prevAmbient}`}
            src={prevAmbient}
            alt=""
            className="lb-ambient-out absolute inset-0 size-full scale-[1.4] object-cover opacity-55 blur-[80px] saturate-[1.6]"
          />
        )}
        <img
          key={`in-${current}`}
          src={current}
          alt=""
          className="lb-ambient-in absolute inset-0 size-full scale-[1.4] object-cover opacity-55 blur-[80px] saturate-[1.6]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,10,28,0.15),rgba(5,10,28,0.88)_75%)]" />
        {Array.from({ length: 22 }, (_, i) => (
          <span
            key={i}
            className="st-star absolute rounded-full bg-white"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 61) % 100}%`,
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              animationDelay: `${(i % 7) * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* shock rings + spark burst from the clicked circle */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {Array.from({ length: RING_COUNT }, (_, i) => (
          <span
            key={i}
            data-ring
            className="absolute size-14 rounded-full border-2 border-[var(--color-accent-500)] opacity-0 shadow-[0_0_30px_rgba(245,158,11,0.6)]"
            style={{ left: ox, top: oy }}
          />
        ))}
        {SPARKS.map((s, i) => (
          <span
            key={i}
            data-spark
            className="absolute rounded-full bg-[var(--color-accent-500)] opacity-0 shadow-[0_0_14px_4px_rgba(245,158,11,0.8)]"
            style={{ left: ox, top: oy, width: s.size, height: s.size }}
          />
        ))}
      </div>

      <button
        type="button"
        aria-label={labels.close}
        onClick={close}
        className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-2xl leading-none text-white backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:rotate-90 hover:scale-110 hover:bg-white/20"
      >
        ×
      </button>

      <div
        ref={stageRef}
        onPointerMove={onStageMove}
        onPointerLeave={onStageLeave}
        className="relative rounded-[20px] will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <img
          ref={imgRef}
          key={current}
          src={current}
          alt=""
          draggable={false}
          onLoad={handleLoad}
          style={{ visibility: 'hidden' }}
          className="block h-auto max-h-[68vh] w-auto max-w-[min(86vw,1500px)] select-none rounded-[20px]"
        />
        {/* glare + sheen live above the photo, clipped to its rounded box */}
        <div
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[20px] opacity-0 transition-opacity duration-500"
          style={{ mixBlendMode: 'overlay' }}
        >
          <div
            data-sheen
            className="absolute inset-y-0 left-0 w-1/3 -translate-x-[130%] bg-gradient-to-r from-transparent via-white/45 to-transparent"
          />
        </div>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label={labels.prev}
            onClick={() => go(-1)}
            className={`${arrow} left-4`}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label={labels.next}
            onClick={() => go(1)}
            className={`${arrow} right-4`}
          >
            ›
          </button>

          <div className="absolute bottom-5 left-1/2 flex max-w-[92vw] -translate-x-1/2 flex-col items-center gap-3">
            <div
              ref={stripRef}
              className="scrollbar-hide flex max-w-full items-center gap-2 overflow-x-auto px-3 py-2"
            >
              {state.slides.map((src, i) => {
                const active = i === state.index;
                return (
                  <button
                    key={src}
                    type="button"
                    aria-label={`${i + 1} / ${count}`}
                    aria-current={active}
                    onClick={() => go(i - state.index)}
                    className={`h-12 w-20 shrink-0 overflow-hidden rounded-lg transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      active
                        ? 'scale-[1.18] opacity-100 shadow-[0_0_0_2px_var(--color-accent-500),0_0_28px_rgba(245,158,11,0.55)]'
                        : 'opacity-45 hover:-translate-y-1 hover:opacity-100 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.6)]'
                    }`}
                  >
                    <img src={src} alt="" draggable={false} className="size-full object-cover" />
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-3 text-sm font-semibold text-white/80">
              <span key={state.index} className="lb-count inline-block tabular-nums text-white">
                {String(state.index + 1).padStart(2, '0')}
              </span>
              <span className="relative h-[3px] w-28 overflow-hidden rounded-full bg-white/15">
                <span
                  className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-accent-500)] shadow-[0_0_10px_rgba(245,158,11,0.9)] transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ width: `${((state.index + 1) / count) * 100}%` }}
                />
              </span>
              <span className="tabular-nums">{String(count).padStart(2, '0')}</span>
            </div>
          </div>
        </>
      )}
    </div>,
    document.body
  );
};

export default PhotoLightbox;
