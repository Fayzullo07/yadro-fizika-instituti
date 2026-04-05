import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import institutImage from '@/assets/institut.png';

interface StatItem {
  id: number;
  target: number;
  suffix: string;
  labelKey: string;
  fallback: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
}

const STATS: StatItem[] = [
  {
    id: 1,
    target: 7,
    suffix: '',
    labelKey: 'stats.academics',
    fallback: 'Akademiklar',
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
        />
      </svg>
    ),
    color: 'text-blue-600',
    borderColor: 'border-blue-500',
  },
  {
    id: 2,
    target: 17,
    suffix: '',
    labelKey: 'stats.professors',
    fallback: 'Professorlar',
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
        />
      </svg>
    ),
    color: 'text-orange-500',
    borderColor: 'border-orange-400',
  },
  {
    id: 3,
    target: 43,
    suffix: '',
    labelKey: 'stats.doctoralStudents',
    fallback: 'Doktorantlar',
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
    color: 'text-emerald-500',
    borderColor: 'border-emerald-400',
  },
  {
    id: 4,
    target: 207,
    suffix: '+',
    labelKey: 'stats.staff',
    fallback: 'Xodimlar',
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
        />
      </svg>
    ),
    color: 'text-rose-500',
    borderColor: 'border-rose-400',
  },
];

// Raqamni animatsiya qilish
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

const StatCard: React.FC<{ stat: StatItem; inView: boolean }> = ({ stat, inView }) => {
  const { t } = useLanguage();
  const count = useCountUp(stat.target, inView);

  return (
    <div className={`relative border-t-2 ${stat.borderColor} bg-white p-6 md:p-8`}>
      <div className="flex items-start justify-between mb-5">
        <div className={`${stat.color}`}>{stat.icon}</div>
        <span className="text-gray-200 text-xs font-bold tracking-widest">
          {String(stat.id).padStart(2, '0')}
        </span>
      </div>
      <span className="text-4xl md:text-5xl font-bold text-gray-900 tabular-nums">
        {count}
        {stat.suffix}
      </span>
      <p className="text-gray-400 text-sm mt-2 font-medium">{t(stat.labelKey) || stat.fallback}</p>
    </div>
  );
};

const StatsSection: React.FC = () => {
  const { t } = useLanguage();
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
    <section className="relative py-16 md:py-20" ref={ref}>
      {/* Fixed background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${institutImage})` }}
      ></div>
      <div className="absolute inset-0 bg-white/50"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-semibold text-(--primary-blue) tracking-widest uppercase px-6 py-2.5 border border-(--primary-blue)/20 rounded-full">
            {t('stats.title')}
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat) => (
            <StatCard key={stat.id} stat={stat} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
