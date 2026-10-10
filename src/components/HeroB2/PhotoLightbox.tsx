import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface LightboxPhoto {
  src: string;
  /** on-screen box of the round thumbnail that was clicked */
  origin: DOMRect;
}

interface PhotoLightboxProps {
  photo: LightboxPhoto | null;
  onClose: () => void;
  closeLabel: string;
}

const OPEN_MS = 800;
const CLOSE_MS = 600;
const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';
const FINAL_RADIUS = 16;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Grows the clicked round thumbnail into the full, uncropped photo (FLIP):
 * the image is laid out at its final size, then transformed + clipped back to
 * the circle and animated to its natural box.
 */
const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ photo, onClose, closeLabel }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [closing, setClosing] = useState(false);
  const frames = useRef<{ from: Keyframe; to: Keyframe } | null>(null);

  // Lock the page behind the overlay (wheel is also swallowed so smooth-scroll stays put).
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!photo || !overlay) return;
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
  }, [photo]);

  // Esc closes.
  useEffect(() => {
    if (!photo) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photo, closing]);

  const run = (reverse: boolean, onDone?: () => void) => {
    const img = imgRef.current;
    const overlay = overlayRef.current;
    const f = frames.current;
    if (!img || !overlay || !f) return onDone?.();

    const fromTo = reverse ? [f.to, f.from] : [f.from, f.to];
    const duration = prefersReducedMotion() ? 0 : reverse ? CLOSE_MS : OPEN_MS;
    const options = { duration, easing: EASING, fill: 'both' as const };

    overlay.animate(
      reverse ? [{ opacity: 1 }, { opacity: 0 }] : [{ opacity: 0 }, { opacity: 1 }],
      options
    );
    const anim = img.animate(fromTo, options);
    if (onDone) anim.finished.then(onDone, onDone);
  };

  // Measure the image at its final size, then play the grow-out-of-the-circle animation.
  const handleLoad = () => {
    const img = imgRef.current;
    if (!img || !photo) return;
    const r = img.getBoundingClientRect();
    const { origin } = photo;
    const side = Math.min(r.width, r.height);
    const dx = origin.left + origin.width / 2 - (r.left + r.width / 2);
    const dy = origin.top + origin.height / 2 - (r.top + r.height / 2);
    const insetX = (r.width - side) / 2;
    const insetY = (r.height - side) / 2;

    frames.current = {
      from: {
        transform: `translate(${dx}px, ${dy}px) scale(${origin.width / side})`,
        clipPath: `inset(${insetY}px ${insetX}px round ${side / 2}px)`,
      },
      to: { transform: 'none', clipPath: `inset(0px round ${FINAL_RADIUS}px)` },
    };
    img.style.visibility = 'visible';
    run(false);
  };

  function close() {
    if (closing) return;
    setClosing(true);
    run(true, () => {
      setClosing(false);
      frames.current = null;
      onClose();
    });
  }

  if (!photo) return null;

  return createPortal(
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-[rgba(10,19,48,0.88)] p-4"
      onClick={close}
    >
      <button
        type="button"
        aria-label={closeLabel}
        onClick={close}
        className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-2xl leading-none text-white hover:bg-white/20"
      >
        ×
      </button>
      <img
        ref={imgRef}
        src={photo.src}
        alt=""
        onLoad={handleLoad}
        onClick={(e) => e.stopPropagation()}
        style={{ visibility: 'hidden' }}
        className="block h-auto max-h-[84vh] w-auto max-w-[92vw] select-none"
      />
    </div>,
    document.body
  );
};

export default PhotoLightbox;
