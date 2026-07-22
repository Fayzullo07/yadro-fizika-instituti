import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import { useLanguage } from '@/contexts/LanguageContext';
import { stripHtmlAndDecode } from '@/utils/htmlUtils';
import { formatDate } from '@/utils/dateUtils';
import type { AnnouncementItem } from '@/types';

const AnnouncementCard: React.FC<{ item: AnnouncementItem; language: string }> = ({
  item,
  language,
}) => {
  const { t } = useLanguage();
  const preview = stripHtmlAndDecode(item.description).slice(0, 160).trim();

  return (
    <Link
      to={`/news/announcements/${item.id}`}
      className="group flex gap-0 bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md hover:border-[#013d8c]/30 transition-all duration-300"
    >
      <div className="w-1 bg-[#013d8c] shrink-0" />
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3 className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-[#013d8c] transition-colors leading-snug line-clamp-2">
          {item.title}
        </h3>
        {preview && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
            {preview}
            {preview.length >= 160 ? '…' : ''}
          </p>
        )}
        <span className="mt-auto text-xs font-medium text-[#013d8c] group-hover:underline">
          {t('news.readMore') || 'Batafsil'} →
        </span>
      </div>
    </Link>
  );
};

const SkeletonCard: React.FC = () => (
  <div className="flex gap-0 bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse">
    <div className="w-1 bg-gray-200 shrink-0" />
    <div className="flex flex-col flex-1 p-4 gap-2">
      <div className="h-5 w-24 bg-gray-200 rounded-full" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2 mt-1" />
    </div>
  </div>
);

const AnnouncementsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { data, loading } = useAnnouncements();
  const items: AnnouncementItem[] = Array.isArray(data?.data) ? data.data.slice(0, 4) : [];

  if (loading && !items.length) {
    return (
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <div className="h-4 w-28 bg-gray-200 rounded animate-pulse mb-3" />
            <div className="h-9 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!items.length) return null;

  return (
    <section className="py-8 md:py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-sm font-medium text-gray-400 tracking-widest uppercase mb-3 block">
              {t('pages.announcements.subtitle') || "So'nggi e'lonlar"}
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              {t('nav.media.announcements') || "E'lonlar"}
            </h2>
          </div>
          <Link
            to="/news/announcements"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-500 hover:text-gray-900 hover:border-gray-400 rounded-full text-sm font-medium"
          >
            {t('pages.announcements.viewAll') || "Barcha e'lonlar"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <AnnouncementCard key={item.id} item={item} language={language} />
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link
            to="/news/announcements"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800"
          >
            {t('pages.announcements.viewAll') || "Barcha e'lonlar"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default memo(AnnouncementsSection);
