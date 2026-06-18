import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { useBanners } from '@/hooks/useBanners';
import type { Banner } from '@/types';
import HeroSkeleton from './HeroSkeleton';
import BannerBackground from './BannerBackground';
const FullscreenModal: React.FC<{ src: string; onClose: () => void }> = ({ src, onClose }) => (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
    onClick={onClose}
  >
    <button
      className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
      onClick={onClose}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    <img
      src={src}
      alt=""
      className="max-w-full max-h-full object-contain"
      onClick={(e) => e.stopPropagation()}
    />
  </div>
);

const AUTOPLAY_INTERVAL = 5000;
const DRAG_THRESHOLD = 50;

const Hero: React.FC = () => {
  const { data, loading } = useBanners({ per_page: 10 });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [dragOffset, setDragOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [fullscreenSrc, setFullscreenSrc] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);
  const dragStartX = useRef(0);
  const isDragging = useRef(false);

  const banners: Banner[] = data?.data || [];

  const changeSlide = useCallback(
    (newIndex: number, dir: 'next' | 'prev') => {
      if (isTransitioning) return;
      setDirection(dir);
      setPrevIndex(currentIndex);
      setCurrentIndex(newIndex);
      setIsTransitioning(true);
      setTimeout(() => {
        setIsTransitioning(false);
        setPrevIndex(null);
      }, 600);
    },
    [currentIndex, isTransitioning]
  );

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % banners.length;
        setDirection('next');
        setPrevIndex(prev);
        setIsTransitioning(true);
        setTimeout(() => {
          setIsTransitioning(false);
          setPrevIndex(null);
        }, 600);
        return next;
      });
    }, AUTOPLAY_INTERVAL);
  }, [banners.length]);

  // Drag handlers
  const handleDragStart = useCallback(
    (clientX: number) => {
      if (banners.length <= 1) return;
      dragStartX.current = clientX;
      isDragging.current = true;
      if (timerRef.current) clearInterval(timerRef.current);
    },
    [banners.length]
  );

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging.current) return;
    const diff = clientX - dragStartX.current;
    setDragOffset(diff);
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (Math.abs(dragOffset) > DRAG_THRESHOLD) {
      if (dragOffset < 0) {
        changeSlide((currentIndex + 1) % banners.length, 'next');
      } else {
        changeSlide((currentIndex - 1 + banners.length) % banners.length, 'prev');
      }
    }

    setDragOffset(0);
    startAutoplay();
  }, [dragOffset, banners.length, currentIndex, changeSlide, startAutoplay]);

  useEffect(() => {
    if (banners.length <= 1) return;
    startAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [banners.length, startAutoplay]);

  if (loading) return <HeroSkeleton />;

  const activeBanners = banners;

  if (!activeBanners.length) {
    return <div className="relative w-full bg-gray-200" style={{ aspectRatio: '1920/467' }} />;
  }

  const nextDragIndex = (currentIndex + 1) % activeBanners.length;
  const prevDragIndex = (currentIndex - 1 + activeBanners.length) % activeBanners.length;

  return (
    <div
      className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{ aspectRatio: '1920/467' }}
      onMouseDown={(e) => {
        e.preventDefault();
        handleDragStart(e.clientX);
      }}
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={handleDragEnd}
    >
      {/* Banner slides */}
      {activeBanners.map((banner, index) => {
        const isCurrentDragging = isDragging.current && dragOffset !== 0;

        // Case 1: Dragging — show current + adjacent with pixel offsets
        if (isCurrentDragging) {
          if (index === currentIndex) {
            return (
              <BannerBackground
                key={banner.id || index}
                banner={banner}
                index={index}
                offset={dragOffset}
              />
            );
          }
          if (dragOffset < 0 && index === nextDragIndex) {
            return (
              <BannerBackground
                key={banner.id || index}
                banner={banner}
                index={index}
                offset={window.innerWidth + dragOffset}
              />
            );
          }
          if (dragOffset > 0 && index === prevDragIndex) {
            return (
              <BannerBackground
                key={banner.id || index}
                banner={banner}
                index={index}
                offset={-window.innerWidth + dragOffset}
              />
            );
          }
          return null;
        }

        // Case 2: CSS animation transition (autoplay or button click)
        if (isTransitioning) {
          if (index === currentIndex) {
            const enterAnim =
              direction === 'next' ? 'slide-enter-from-right' : 'slide-enter-from-left';
            return (
              <BannerBackground
                key={banner.id || index}
                banner={banner}
                index={index}
                animationName={enterAnim}
              />
            );
          }
          if (index === prevIndex) {
            const exitAnim = direction === 'next' ? 'slide-exit-to-left' : 'slide-exit-to-right';
            return (
              <BannerBackground
                key={banner.id || index}
                banner={banner}
                index={index}
                animationName={exitAnim}
              />
            );
          }
          return null;
        }

        // Case 3: Idle — only show current
        if (index === currentIndex) {
          return <BannerBackground key={banner.id || index} banner={banner} index={index} />;
        }

        return null;
      })}

      {/* Mobile expand button */}
      <button
        className="absolute bottom-3 right-3 z-20 sm:hidden flex items-center justify-center w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white/80 hover:bg-black/60 hover:text-white transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          const src = activeBanners[currentIndex]?.image;
          if (src) setFullscreenSrc(src);
        }}
        aria-label="To'liq ko'rish"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
          />
        </svg>
      </button>

      {fullscreenSrc && (
        <FullscreenModal src={fullscreenSrc} onClose={() => setFullscreenSrc(null)} />
      )}
    </div>
  );
};

export default memo(Hero);
