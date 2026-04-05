import { useState, useCallback, useEffect, useRef } from 'react';
import institutImage from '@/assets/institut.png';
import SectionHeader from '@/components/shared/SectionHeader/SectionHeader';
import SliderControls from './SliderControls';
import { LABORATORY_TASKS } from './TasksData';

const TOTAL = LABORATORY_TASKS.length;
const AUTOPLAY_INTERVAL = 3000;

const LaboratoriesTasks: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % TOTAL);
    }, AUTOPLAY_INTERVAL);
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide(index);
      startAutoplay();
    },
    [startAutoplay]
  );

  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + TOTAL) % TOTAL);
    startAutoplay();
  }, [startAutoplay]);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % TOTAL);
    startAutoplay();
  }, [startAutoplay]);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoplay]);

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <SectionHeader
            title="Seysmik xavfsizlik va barqaror qurilish"
            subtitle="Milliy tadqiqot instituti laboratoriyalarining asosiy vazifalari"
          />
        </div>

        <div className="relative overflow-hidden min-h-96 md:min-h-110">
          {/* Background */}
          <img
            src={institutImage}
            alt="Laboratoriya"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/20"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between min-h-96 md:min-h-110 p-8 md:p-14">
            <div className="max-w-2xl w-full flex-1">
              {/* Task number */}
              <div className="flex items-center gap-4 mb-6">
                <span
                  key={currentSlide}
                  className="text-6xl md:text-7xl font-bold text-white/20 animate-slide-up"
                >
                  {String(currentSlide + 1).padStart(2, '0')}
                </span>
                <div className="h-px flex-1 max-w-24 bg-white/20"></div>
              </div>

              {/* Task text */}
              <div className="relative overflow-hidden">
                {LABORATORY_TASKS.map((task, index) => (
                  <div
                    key={index}
                    className="pr-8"
                    style={{
                      display: index === currentSlide ? 'block' : 'none',
                      animation: index === currentSlide ? 'fade-in 0.5s ease-out' : 'none',
                    }}
                  >
                    <p className="text-white/90 text-base md:text-lg leading-relaxed">{task}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="max-w-2xl w-full">
              <SliderControls
                total={TOTAL}
                currentIndex={currentSlide}
                onSelect={goToSlide}
                onPrev={goToPrev}
                onNext={goToNext}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LaboratoriesTasks;
