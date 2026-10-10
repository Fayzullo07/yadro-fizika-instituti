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

const OPEN_MS = 800;
const CLOSE_MS = 600;
const SLIDE_OUT_MS = 220;
const SLIDE_IN_MS = 450;
const SLIDE_SHIFT = 72;
const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';
const FINAL_RADIUS = 16;
const SWIPE_PX = 50;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const ms = (value: number) => (prefersReducedMotion() ? 0 : value);

/**
 * Photo viewer opened from the hero. The clicked round thumbnail grows into
 * the full photo (FLIP); afterwards the slider pages through every banner with
 * the arrow buttons, ←/→ keys, dots or a swipe.
 */
const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ state, onIndexChange, onClose, labels }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [closing, setClosing] = useState(false);

  const flip = useRef<{ from: Keyframe; to: Keyframe } | null>(null);
  const startIndex = useRef<number | null>(null);
  const grown = useRef(false); // the open animation has played
  const busy = useRef(false); // a slide-out is running
  const direction = useRef(1);
  const swipe = useRef<number | null>(null);
  const swiped = useRef(false); // a swipe just ended; its trailing click must not close

  const open = state !== null;
  const count = state?.slides.length ?? 0;

  // Page lock + wheel swallow while the viewer is up; remember where we started.
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!open || !overlay) return;
    const swallow = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    overlay.addEventListener('wheel', swallow, { passive: false });
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      overlay.removeEventListener('wheel', swallow);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  const go = (delta: number) => {
    const img = imgRef.current;
    if (!state || !img || busy.current || closing || count < 2) return;
    const next = (state.index + delta + count) % count;
    direction.current = Math.sign(delta);
    busy.current = true;
    const out = img.animate(
      [
        { opacity: 1, transform: 'none' },
        { opacity: 0, transform: `translateX(${-direction.current * SLIDE_SHIFT}px)` },
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
    const anim = back
      ? img.animate([flip.current!.to, flip.current!.from], options)
      : img.animate(
          [
            { opacity: 1, transform: 'none' },
            { opacity: 0, transform: 'scale(0.92)' },
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

  const handleLoad = () => {
    const img = imgRef.current;
    const overlay = overlayRef.current;
    if (!img || !overlay || !state) return;
    img.style.visibility = 'visible';

    if (grown.current) {
      // paging: the new photo slides in from the side it was asked for
      busy.current = false;
      img.animate(
        [
          { opacity: 0, transform: `translateX(${direction.current * SLIDE_SHIFT}px)` },
          { opacity: 1, transform: 'none' },
        ],
        { duration: ms(SLIDE_IN_MS), easing: 'ease-out', fill: 'both' }
      );
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
        transform: `translate(${dx}px, ${dy}px) scale(${origin.width / side})`,
        clipPath: `inset(${insetY}px ${insetX}px round ${side / 2}px)`,
      },
      to: { transform: 'none', clipPath: `inset(0px round ${FINAL_RADIUS}px)` },
    };
    startIndex.current = state.index;
    grown.current = true;

    const options = { duration: ms(OPEN_MS), easing: EASING, fill: 'both' as const };
    overlay.animate([{ opacity: 0 }, { opacity: 1 }], options);
    img.animate([flip.current.from, flip.current.to], options);
  };

  if (!state) return null;

  const arrow =
    'absolute top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl leading-none text-white hover:bg-white/20';

  return createPortal(
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1100] flex touch-pan-y items-center justify-center bg-[rgba(10,19,48,0.88)] p-4"
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
      <button
        type="button"
        aria-label={labels.close}
        onClick={close}
        className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-2xl leading-none text-white hover:bg-white/20"
      >
        ×
      </button>

      <img
        ref={imgRef}
        key={state.slides[state.index]}
        src={state.slides[state.index]}
        alt=""
        draggable={false}
        onLoad={handleLoad}
        style={{ visibility: 'hidden' }}
        className="block h-auto max-h-[70vh] w-auto max-w-[92vw] select-none rounded-2xl"
      />

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

          <div className="absolute bottom-5 left-1/2 flex max-w-[92vw] -translate-x-1/2 flex-col items-center gap-2">
            <div className="flex max-w-full items-center gap-2 overflow-x-auto p-1">
              {state.slides.map((src, i) => {
                const active = i === state.index;
                return (
                  <button
                    key={src}
                    type="button"
                    aria-label={`${i + 1} / ${count}`}
                    aria-current={active}
                    onClick={() => go(i - state.index)}
                    className={`h-12 w-20 shrink-0 overflow-hidden rounded-lg transition-all duration-300 ${
                      active
                        ? 'opacity-100 ring-2 ring-white'
                        : 'opacity-50 hover:opacity-90 hover:ring-1 hover:ring-white/60'
                    }`}
                  >
                    <img src={src} alt="" draggable={false} className="size-full object-cover" />
                  </button>
                );
              })}
            </div>
            <span className="text-sm font-semibold text-white/80">
              {state.index + 1} / {count}
            </span>
          </div>
        </>
      )}
    </div>,
    document.body
  );
};

export default PhotoLightbox;
