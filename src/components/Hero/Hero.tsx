import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { useBanners } from '@/hooks/useBanners';
import type { Banner } from '@/types';
import HeroSkeleton from './HeroSkeleton';
import BannerBackground from './BannerBackground';

const AUTOPLAY_INTERVAL = 5000;
const DRAG_THRESHOLD = 50;

const Hero: React.FC = () => {
  const { data, loading } = useBanners({ per_page: 10 });

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
    return (
      <div className="relative min-h-30 sm:min-h-80 md:min-h-105 lg:min-h-130 xl:min-h-100 bg-gray-200" />
    );
  }

  const nextDragIndex = (currentIndex + 1) % activeBanners.length;
  const prevDragIndex = (currentIndex - 1 + activeBanners.length) % activeBanners.length;

  return (
    <div
      className="relative h-full min-h-30 sm:min-h-80 md:min-h-105 lg:min-h-130 xl:min-h-100 overflow-hidden cursor-grab active:cursor-grabbing select-none"
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
    </div>
  );
};

export default memo(Hero);
