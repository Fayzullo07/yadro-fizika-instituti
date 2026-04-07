import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { useBanners } from '@/hooks/useBanners';
import { sanitizeHtml } from '@/utils/htmlUtils';
import type { Banner } from '@/types';
import HeroSkeleton from './HeroSkeleton';
import BannerBackground from './BannerBackground';

const AUTOPLAY_INTERVAL = 5000;
const DRAG_THRESHOLD = 50;

const Hero: React.FC = () => {
  const { data, loading, error } = useBanners({ per_page: 10 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [dragOffset, setDragOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);
  const dragStartX = useRef(0);
  const isDragging = useRef(false);

  const banners: Banner[] = data?.results || [];

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

  const goToSlide = useCallback(
    (index: number) => {
      changeSlide(index, index > currentIndex ? 'next' : 'prev');
      startAutoplay();
    },
    [currentIndex, changeSlide, startAutoplay]
  );

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
  if (error || !banners.length) return null;

  const currentBanner = banners[currentIndex];
  const hasMultipleSlides = banners.length > 1;

  const nextDragIndex = (currentIndex + 1) % banners.length;
  const prevDragIndex = (currentIndex - 1 + banners.length) % banners.length;

  return (
    <div
      className="relative h-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
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
      {banners.map((banner, index) => {
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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0f1b3d]/60 z-3"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center pointer-events-none">
        <div className="container mx-auto pb-10 md:pb-16 lg:pb-20">
          <div className="max-w-2xl">
            {/* Organization badge */}
            <div
              key={`badge-${currentIndex}`}
              className="inline-flex mb-4 md:mb-5 animate-slide-up"
            >
              <span className="px-4 py-1.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs md:text-sm font-semibold tracking-widest uppercase">
                O'z Res FA YADRO FIZIKASI INSTITUTI
              </span>
            </div>

            {/* Title */}
            {currentBanner.title && (
              <h1
                key={`title-${currentIndex}`}
                className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-4 md:mb-5 animate-slide-up line-clamp-3"
                style={{ animationDelay: '100ms' }}
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(currentBanner.title) }}
              />
            )}

            {/* Bottom row: button + dots */}
            <div
              key={`bottom-${currentIndex}`}
              className="flex items-center gap-6 md:gap-8 animate-slide-up pointer-events-auto"
              style={{ animationDelay: '200ms' }}
            >
              <button className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-white text-gray-900 rounded-full text-xs md:text-sm font-medium hover:bg-gray-100 transition-colors">
                Batafsil
                <svg
                  className="w-3.5 h-3.5 md:w-4 md:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dots — bottom center */}
      {hasMultipleSlides && (
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/15 pointer-events-auto">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? 'w-7 h-2 bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(Hero);
