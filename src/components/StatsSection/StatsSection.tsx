import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface StatItem {
  id: number;
  target: number;
  suffix: string;
  labelKey: string;
  fallback: string;
}

const STATS: StatItem[] = [
  { id: 1, target: 7, suffix: '', labelKey: 'stats.academics', fallback: 'Akademiklar' },
  { id: 2, target: 17, suffix: '', labelKey: 'stats.professors', fallback: 'Professorlar' },
  { id: 3, target: 43, suffix: '', labelKey: 'stats.doctoralStudents', fallback: 'Doktorantlar' },
  { id: 4, target: 207, suffix: '+', labelKey: 'stats.staff', fallback: 'Xodimlar' },
];

const useCountUp = (target: number, inView: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target, inView]);

  return count;
};

const StatCard: React.FC<{ stat: StatItem; inView: boolean; index: number }> = ({
  stat,
  inView,
  index,
}) => {
  const { t } = useLanguage();
  const count = useCountUp(stat.target, inView);

  // Mobile: 2 cols — odd index (1,3) has no right border; even (0,2) has right border
  // Desktop: 4 cols — last item (3) has no right border
  return (
    <div
      className={`flex items-center ${
        index % 2 === 0 ? 'border-r border-white/10' : ''
      } ${index < 2 ? 'border-b lg:border-b-0 border-white/10' : ''} ${
        index !== 3 ? 'lg:border-r lg:border-white/10' : ''
      }`}
    >
      <div className="px-4 md:px-8 py-3 md:py-4 text-center w-full">
        <span className="text-xl md:text-3xl font-bold text-white tabular-nums">
          {count}
          {stat.suffix}
        </span>
        <p className="text-[10px] md:text-sm text-blue-200/50 mt-0.5 md:mt-1 tracking-wide">
          {t(stat.labelKey) || stat.fallback}
        </p>
      </div>
    </div>
  );
};

const StatsSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#0f1b3d]" ref={ref}>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} inView={inView} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
