import { useBanners } from '@/hooks/useBanners';
import { useGeneral } from '@/hooks/useGeneral';
import { stripHtmlRegex } from '@/utils/htmlUtils';
import { useState, useEffect, useRef } from 'react';
import institutImage from '@/assets/institut.png';
import type { Banner } from '@/types';

const Hero: React.FC = () => {
  const { data, loading, error } = useBanners({ per_page: 10 });
  const { data: generalData, loading: generalLoading } = useGeneral();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const banners: Banner[] = data?.results || [];

  const organizationName: string | null = generalData?.organization_short_name
    ? stripHtmlRegex(generalData.organization_name)
    : null;

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
        if (sliderRef.current) {
          const nextIndex = (currentIndex + 1) % banners.length;
          sliderRef.current.scrollTo({
            left: nextIndex * sliderRef.current.offsetWidth,
            behavior: 'smooth',
          });
        }
      }, 5000); // 5 soniyada bir o'zgaradi

      return () => clearInterval(interval);
    }
  }, [banners.length, currentIndex]);

  // Update currentIndex based on scroll position
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || banners.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = slider.scrollLeft;
      const itemWidth = slider.offsetWidth;
      const newIndex = Math.round(scrollPosition / itemWidth);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < banners.length) {
        setCurrentIndex(newIndex);
      }
    };

    slider.addEventListener('scroll', handleScroll);
    return () => {
      if (slider) {
        slider.removeEventListener('scroll', handleScroll);
      }
    };
  }, [banners.length, currentIndex]);

  // Slider drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = (): void => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !sliderRef.current) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = (): void => {
    setIsDragging(false);
  };

  if (loading) {
    return (
      <div className="relative h-[600px] overflow-hidden bg-gray-200">
        {/* Background skeleton */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
        
        {/* Content skeleton */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              {/* Title skeleton */}
              <div className="mb-6 space-y-3">
                <div className="h-8 md:h-10 bg-white/30 rounded-lg w-3/4 animate-pulse"></div>
                <div className="h-8 md:h-10 bg-white/30 rounded-lg w-2/3 animate-pulse"></div>
              </div>
              
              {/* Description skeleton */}
              <div className="space-y-2">
                <div className="h-4 bg-white/30 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-white/30 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-white/30 rounded w-4/6 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dots skeleton */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          <div className="w-3 h-3 rounded-full bg-white/50 animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-white/50 animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-white/50 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error || !banners.length) {
    return null;
  }

  const currentBanner: Banner = banners[currentIndex];

  return (
    <div className="relative  h-[650px] overflow-hidden">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${institutImage})`,
          filter: 'blur(15px)',
          transform: 'scale(1.1)',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Text Content */}
            <div className="text-white">
              {/* Organization Name */}
              {organizationName && (
                <div className="mb-6 flex items-center gap-3">
                  <h2 
                    className="text-white line-clamp-5"
                    style={{
                      fontSize: '56px',
                      lineHeight: '120%',
                      fontWeight: '600',
                      fontFamily: 'Arial, Helvetica, sans-serif'
                    }}
                  >
                    {organizationName}
                  </h2>
                </div>
              )}
              
              {/* {currentBanner.title && (
                <h1
                  className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6"
                  dangerouslySetInnerHTML={{ __html: currentBanner.title }}
                />
              )} */}
              {/* {currentBanner.description && (
                <div
                  className="text-md md:text-lg mb-8 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: currentBanner.description }}
                />
              )} */}
            </div>

            {/* Right Side - Slider */}
            {banners.length > 0 && (
              <div className="relative w-full">
                {/* Navigation Arrows */}
                {banners.length > 1 && (
                  <>
                    <button
                      onClick={() => {
                        const newIndex = (currentIndex - 1 + banners.length) % banners.length;
                        setCurrentIndex(newIndex);
                        if (sliderRef.current) {
                          sliderRef.current.scrollTo({
                            left: newIndex * sliderRef.current.offsetWidth,
                            behavior: 'smooth',
                          });
                        }
                      }}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-all shadow-lg"
                      aria-label="Previous slide"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => {
                        const newIndex = (currentIndex + 1) % banners.length;
                        setCurrentIndex(newIndex);
                        if (sliderRef.current) {
                          sliderRef.current.scrollTo({
                            left: newIndex * sliderRef.current.offsetWidth,
                            behavior: 'smooth',
                          });
                        }
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full transition-all shadow-lg"
                      aria-label="Next slide"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}
                
                <div
                  ref={sliderRef}
                  className="relative overflow-x-auto overflow-y-hidden scrollbar-hide"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  style={{
                    cursor: isDragging ? 'grabbing' : 'grab',
                    scrollSnapType: 'x mandatory',
                    WebkitOverflowScrolling: 'touch',
                  }}
                >
                  <div className="flex gap-4">
                    {banners.map((banner, index) => (
                      <div
                        key={banner.id || index}
                        className="flex-shrink-0 w-full"
                        style={{ scrollSnapAlign: 'start' }}
                      >
                        <div className="relative rounded-lg overflow-hidden shadow-xl">
                          {banner.image && (
                            <img
                              src={banner.image}
                              alt={stripHtmlRegex(banner.title || 'Banner')}
                              className="w-full h-[400px] object-cover"
                            />
                          )}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            {banner.title && (
                              <h3
                                className="text-white text-lg font-semibold mb-2"
                                dangerouslySetInnerHTML={{ __html: banner.title }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      {banners.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                if (sliderRef.current) {
                  sliderRef.current.scrollTo({
                    left: index * sliderRef.current.offsetWidth,
                    behavior: 'smooth',
                  });
                }
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;

