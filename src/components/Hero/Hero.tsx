import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { useBanners } from '@/hooks/useBanners';
import { useGeneral } from '@/hooks/useGeneral';
import { sanitizeHtml, stripHtmlRegex } from '@/utils/htmlUtils';
import type { Banner } from '@/types';
import HeroSkeleton from './HeroSkeleton';
import BannerBackground from './BannerBackground';
import img1 from '@/assets/institut.png';

const AUTOPLAY_INTERVAL = 5000;
const DRAG_THRESHOLD = 50;

const Hero: React.FC = () => {
  const { data, loading, error } = useBanners({ per_page: 10 });
  const { data: generalData } = useGeneral();
  const organizationName = generalData
    ? stripHtmlRegex(
        generalData.organization_short_name || generalData.organization_name || ''
      ).trim() || "O'z Res FA YADRO FIZIKASI INSTITUTI"
    : "O'z Res FA YADRO FIZIKASI INSTITUTI";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [dragOffset, setDragOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
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

  const fallbackBanner = { id: 0, image: img1, title: '', order: 0 } as unknown as Banner;
  const activeBanners = banners.length > 0 ? banners : [fallbackBanner];

  const currentBanner = activeBanners[currentIndex] ?? activeBanners[0];
  const hasMultipleSlides = activeBanners.length > 1;

  const nextDragIndex = (currentIndex + 1) % activeBanners.length;
  const prevDragIndex = (currentIndex - 1 + activeBanners.length) % activeBanners.length;

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

      {/* Bottom gradient overlay — sits within image area */}
      <div className="absolute inset-x-0 bottom-0 h-full bg-linear-to-t from-[#0f1b3d]/80 via-[#0f1b3d]/30 to-transparent z-3" />

      {/* Content — overlaid on image */}
      <div className="absolute inset-x-0 bottom-[18%] z-10 pointer-events-none">
        <div className="container mx-auto px-6 md:px-10">
          {/* Org name row */}
          <div
            key={`badge-${currentIndex}`}
            className="flex items-center gap-3 mb-3 animate-slide-up"
          >
            <div className="w-6 h-px bg-blue-400/70" />
            <span className="text-blue-300/90 text-xs font-semibold tracking-[0.2em] uppercase">
              {organizationName}
            </span>
          </div>

          {/* Title */}
          {currentBanner.title && (
            <h1
              key={`title-${currentIndex}`}
              className="text-2xl md:text-4xl font-bold text-white leading-snug mb-5 animate-slide-up max-w-3xl line-clamp-3 drop-shadow-md"
              style={{ animationDelay: '80ms' }}
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(currentBanner.title) }}
            />
          )}

          {/* Bottom row: divider line + dots */}
          <div
            key={`bottom-${currentIndex}`}
            className="flex items-center gap-4 animate-slide-up pointer-events-auto"
            style={{ animationDelay: '160ms' }}
          >
            <div className="h-px flex-1 max-w-16 bg-white/20" />
            {hasMultipleSlides && (
              <div className="flex items-center gap-2">
                {activeBanners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`rounded-full transition-all duration-500 ${
                      index === currentIndex
                        ? 'w-6 h-1.5 bg-white'
                        : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Hero);
