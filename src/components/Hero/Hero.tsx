import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { useBanners } from '@/hooks/useBanners';
import { useGeneral } from '@/hooks/useGeneral';
import { stripHtmlRegex, sanitizeHtml } from '@/utils/htmlUtils';
import type { Banner } from '@/types';
import HeroSkeleton from './HeroSkeleton';
import BannerBackground from './BannerBackground';
import OrganizationBadge from './OrganizationBadge';
import VerticalSlideSelector from './VerticalSlideSelector';
import MobileDots from './MobileDots';
import ScrollIndicator from './ScrollIndicator';

const AUTOPLAY_INTERVAL = 5000;

const Hero: React.FC = () => {
  const { data, loading, error } = useBanners({ per_page: 10 });
  const { data: generalData } = useGeneral();
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  const banners: Banner[] = data?.results || [];

  const organizationName = generalData?.organization_short_name
    ? stripHtmlRegex(generalData.organization_name)
    : null;

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, AUTOPLAY_INTERVAL);
  }, [banners.length]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      startAutoplay();
    },
    [startAutoplay]
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
    <div className="relative h-screen overflow-hidden">
      {/* Fullscreen banner backgrounds */}
      {banners.map((banner, index) => (
        <BannerBackground
          key={banner.id || index}
          banner={banner}
          isActive={index === currentIndex}
          isFirst={index === 0}
        />
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-linear-to-r from-black/40 via-black/15 to-transparent"></div>
      <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 h-screen flex items-center">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            {organizationName && (
              <div>
                <OrganizationBadge
                  name={organizationName}
                  logo={generalData?.organization_logo}
                  slideKey={currentIndex}
                />
              </div>
            )}

            {currentBanner.title && (
              <h1
                key={`title-${currentIndex}`}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 animate-slide-up"
                style={{ animationDelay: '100ms' }}
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(currentBanner.title) }}
              />
            )}

            {currentBanner.description && (
              <p
                key={`desc-${currentIndex}`}
                className="text-lg md:text-xl text-white/50 leading-relaxed max-w-xl mb-10 line-clamp-3 animate-slide-up"
                style={{ animationDelay: '200ms' }}
              >
                {stripHtmlRegex(currentBanner.description)}
              </p>
            )}
          </div>
        </div>
      </div>

      {hasMultipleSlides && (
        <>
          <div>
            <VerticalSlideSelector
              total={banners.length}
              currentIndex={currentIndex}
              onSelect={goToSlide}
            />
          </div>
          <div>
            <MobileDots total={banners.length} currentIndex={currentIndex} onSelect={goToSlide} />
          </div>
        </>
      )}

      <div>
        <ScrollIndicator />
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent z-10"></div>
    </div>
  );
};

export default memo(Hero);
