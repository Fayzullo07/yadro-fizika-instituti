import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { useBanners } from '@/hooks/useBanners';
import { useGeneral } from '@/hooks/useGeneral';
import { stripHtmlRegex, sanitizeHtml } from '@/utils/htmlUtils';
import type { Banner } from '@/types';
import HeroSkeleton from './HeroSkeleton';
import BannerBackground from './BannerBackground';

const AUTOPLAY_INTERVAL = 5000;

const Hero: React.FC = () => {
  const { data, loading, error } = useBanners({ per_page: 10 });
  const { data: generalData } = useGeneral();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  const banners: Banner[] = data?.results || [];

  const organizationName = generalData?.organization_short_name
    ? stripHtmlRegex(generalData.organization_short_name).trim()
    : null;

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

  const goToSlide = useCallback(
    (index: number) => {
      changeSlide(index, index > currentIndex ? 'next' : 'prev');
      startAutoplay();
    },
    [currentIndex, changeSlide, startAutoplay]
  );

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
            index={index}
            state={state}
            direction={direction}
          />
        );
      })}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0f1b3d]/60 z-3"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-10 lg:p-16">
        <div className="flex-1 flex flex-col justify-center max-w-3xl">
          {/* Organization badge */}
          <div key={`badge-${currentIndex}`} className="inline-flex mb-5 md:mb-6 animate-slide-up">
            <span className="px-4 py-1.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs md:text-sm font-semibold tracking-widest uppercase">
              O'z Res FA YADRO FIZIKASI INSTITUTI
            </span>
          </div>

          {/* Title */}
          {currentBanner.title && (
            <h1
              key={`title-${currentIndex}`}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5 md:mb-6 animate-slide-up line-clamp-4"
              style={{ animationDelay: '100ms' }}
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(currentBanner.title) }}
            />
          )}

          {/* Yellow accent line */}
          <div
            key={`line-${currentIndex}`}
            className="w-12 h-1 bg-amber-400 mb-6 md:mb-8 animate-slide-up"
            style={{ animationDelay: '200ms' }}
          ></div>

          {/* Button */}
          <div
            key={`btn-${currentIndex}`}
            className="animate-slide-up"
            style={{ animationDelay: '300ms' }}
          >
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
              Batafsil
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {/* Bottom dots */}
        {hasMultipleSlides && (
          <div className="flex items-center justify-center gap-2 pt-6">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-0.5 rounded-full transition-all duration-500 ${
                  index === currentIndex ? 'w-8 bg-white' : 'w-4 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Hero);
