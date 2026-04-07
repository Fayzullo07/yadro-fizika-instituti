import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { useBanners } from '@/hooks/useBanners';
import { stripHtmlRegex, sanitizeHtml } from '@/utils/htmlUtils';
import type { Banner } from '@/types';
import HeroSkeleton from './HeroSkeleton';
import BannerBackground from './BannerBackground';

const AUTOPLAY_INTERVAL = 5000;

const Hero: React.FC = () => {
  const { data, loading, error } = useBanners({ per_page: 10 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  const banners: Banner[] = data?.results || [];

  const changeSlide = useCallback(
    (newIndex: number, dir: 'next' | 'prev') => {
      setDirection(dir);
      setPrevIndex(currentIndex);
      setCurrentIndex(newIndex);
    },
    [currentIndex]
  );

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection('next');
      setCurrentIndex((prev) => {
        setPrevIndex(prev);
        return (prev + 1) % banners.length;
      });
    }, AUTOPLAY_INTERVAL);
  }, [banners.length]);

  const goToPrev = useCallback(() => {
    changeSlide((currentIndex - 1 + banners.length) % banners.length, 'prev');
    startAutoplay();
  }, [currentIndex, banners.length, changeSlide, startAutoplay]);

  const goToSlide = useCallback(
    (index: number) => {
      changeSlide(index, index > currentIndex ? 'next' : 'prev');
      startAutoplay();
    },
    [currentIndex, changeSlide, startAutoplay]
  );

  const goToNext = useCallback(() => {
    changeSlide((currentIndex + 1) % banners.length, 'next');
    startAutoplay();
  }, [currentIndex, banners.length, changeSlide, startAutoplay]);

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

  return (
    <div className="relative h-full overflow-hidden">
      {/* Banner backgrounds */}
      {banners.map((banner, index) => {
        let state: 'enter' | 'exit' | 'idle';
        if (index === currentIndex) state = 'enter';
        else if (index === prevIndex) state = 'exit';
        else state = 'idle';

        return (
          <BannerBackground
            key={banner.id || index}
            banner={banner}
            state={state}
            direction={direction}
          />
        );
      })}

      {/* White content card */}
      <div className="absolute inset-y-0 left-0 z-10 flex items-end md:items-center">
        <div className="bg-white shadow border border-gray-100 p-6 md:p-12 lg:p-16 w-[92vw] md:w-[50vw] lg:w-[40vw] md:min-h-[50%] flex flex-col justify-center">
          {/* Slide counter */}
          {hasMultipleSlides && (
            <div className="flex items-center gap-3 mb-4 md:mb-8">
              <button
                onClick={goToPrev}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-400 transition-all"
                aria-label="Previous slide"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="flex items-center gap-2">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-0.5 rounded-full transition-all duration-500 ${
                      index === currentIndex
                        ? 'w-6 bg-gray-900'
                        : 'w-3 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-400 transition-all"
                aria-label="Next slide"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Title */}
          {currentBanner.title && (
            <h1
              key={`title-${currentIndex}`}
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.15] mb-3 md:mb-6 animate-slide-up"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(currentBanner.title) }}
            />
          )}

          {/* Description */}
          {currentBanner.description && (
            <p
              key={`desc-${currentIndex}`}
              className="text-sm md:text-lg text-gray-500 leading-relaxed line-clamp-3 md:line-clamp-4 animate-slide-up"
              style={{ animationDelay: '100ms' }}
            >
              {stripHtmlRegex(currentBanner.description)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Hero);
