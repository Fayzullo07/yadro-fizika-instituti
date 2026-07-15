import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEvents } from '@/hooks/useEvents';
import { getDayMonth } from '@/utils/dateUtils';
import { EVENTS_PATH } from '@/routes/path';
import type { EventApiItem } from '@/types';

const ArrowIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

const DateBadge: React.FC<{ day: string; month: string; className?: string }> = ({
  day,
  month,
  className = '',
}) => (
  <div
    className={`flex flex-col items-center justify-center leading-none rounded-lg bg-[#013d8c]/8 text-[#013d8c] px-2.5 py-2 shrink-0 ${className}`}
  >
    <span className="text-lg sm:text-xl font-bold">{day}</span>
    <span className="text-[10px] uppercase tracking-wide mt-0.5">{month}</span>
  </div>
);

const FeaturedEventCard: React.FC<{ item: EventApiItem; language: string }> = ({
  item,
  language,
}) => {
  const { day, month } = getDayMonth(item.created_at, language);
  return (
    <Link
      to={`/news/events/${item.id}`}
      className="group flex bg-white border border-gray-100 overflow-hidden transition-colors duration-300"
    >
      {item.image && (
        <div className="relative w-28 sm:w-40 shrink-0 overflow-hidden">
          <img
            src={item.image}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
        </div>
      )}
      <div className="flex-1 flex gap-3 p-3 sm:p-4 items-start">
        <DateBadge day={day} month={month} />
        <div className="min-w-0 pt-0.5">
          <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-3 group-hover:text-[#013d8c] transition-colors">
            {item.title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

const EventListRow: React.FC<{ item: EventApiItem; language: string }> = ({ item, language }) => {
  const { day, month } = getDayMonth(item.created_at, language);
  return (
    <Link
      to={`/news/events/${item.id}`}
      className="group flex items-center gap-4 bg-white p-3.5 sm:p-4 rounded-xl border border-gray-100 hover:border-[#013d8c]/20 transition-colors duration-300"
    >
      <DateBadge day={day} month={month} />
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 uppercase leading-snug line-clamp-2 group-hover:text-[#013d8c] transition-colors">
          {item.title}
        </h3>
      </div>
      <span className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 group-hover:bg-amber-100 group-hover:translate-x-0.5 transition-all">
        <ArrowIcon />
      </span>
    </Link>
  );
};

const SkeletonBlock: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-gray-200 rounded-xl animate-pulse ${className}`} />
);

const EventsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { data, loading } = useEvents({ per_page: 6 });
  const items: EventApiItem[] = Array.isArray(data?.data) ? data.data.slice(0, 6) : [];

  if (loading && !items.length) {
    return (
      <section className="py-10 md:py-14 bg-linear-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="mb-8 sm:mb-10">
            <div className="h-4 w-28 bg-gray-200 rounded animate-pulse mb-3" />
            <div className="h-9 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            <div className="flex flex-col gap-4 sm:gap-5">
              <SkeletonBlock className="h-28 sm:h-32" />
              <SkeletonBlock className="h-28 sm:h-32" />
            </div>
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4].map((i) => (
                <SkeletonBlock key={i} className="h-16" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!items.length) return null;

  const featured = items.slice(0, 2);
  const list = items.slice(2, 6);

  return (
    <section className="py-10 md:py-14 bg-linear-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <span className="text-sm font-medium text-gray-400 tracking-widest uppercase mb-3 block">
              {t('events.subtitle') || 'Kutilayotgan'}
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              {t('events.title') || 'Tadbirlar'}
            </h2>
          </div>
          <Link
            to={EVENTS_PATH}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-500 hover:text-gray-900 hover:border-gray-400 rounded-full text-sm font-medium"
            style={{ transition: 'color 0.5s ease, border-color 0.5s ease' }}
          >
            {t('events.viewAll') || 'Barcha tadbirlar'}
            <ArrowIcon />
          </Link>
        </div>

        {list.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            <div className="flex flex-col gap-4 sm:gap-5">
              {featured.map((item) => (
                <FeaturedEventCard key={item.id} item={item} language={language} />
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {list.map((item) => (
                <EventListRow key={item.id} item={item} language={language} />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {featured.map((item) => (
              <FeaturedEventCard key={item.id} item={item} language={language} />
            ))}
          </div>
        )}

        <div className="text-center mt-8 md:hidden">
          <Link
            to={EVENTS_PATH}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800"
          >
            {t('events.viewAll') || 'Barcha tadbirlar'}
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
