import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import { stripHtmlAndDecode } from '@/utils/htmlUtils';
import { formatDate } from '@/utils/dateUtils';
import Loading from '@/components/shared/Loading/Loading';
import Breadcrumb from '@/components/shared/Breadcrumb/Breadcrumb';
import type { AnnouncementItem } from '@/types';

const AnnouncementCard: React.FC<{
  item: AnnouncementItem;
  language: string;
  t: (k: string) => string;
}> = ({ item, language, t }) => {
  const preview = stripHtmlAndDecode(item.description).slice(0, 180).trim();

  return (
    <article className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-[#013d8c]/30 transition-all duration-300">
      <div className="flex flex-col sm:flex-row">
        {/* Left accent bar */}
        <div className="w-full sm:w-1 bg-[#013d8c] shrink-0 sm:rounded-l-xl rounded-t-xl sm:rounded-t-none min-h-1 sm:min-h-0" />

        <div className="flex flex-col flex-1 p-5 gap-3">
          {/* Date badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs text-[#013d8c] bg-[#013d8c]/8 px-2.5 py-1 rounded-full font-medium">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {formatDate(item.created_at, language)}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-base md:text-lg font-semibold text-gray-900 group-hover:text-[#013d8c] transition-colors leading-snug">
            {item.title}
          </h2>

          {/* Preview text */}
          {preview && (
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
              {preview}
              {preview.length >= 180 ? '…' : ''}
            </p>
          )}

          {/* Read more */}
          <div className="mt-auto pt-2">
            <Link
              to={`/news/announcements/${item.id}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#013d8c] hover:gap-2.5 transition-all duration-200"
            >
              {t('news.readMore') || 'Batafsil'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

const Announcements: React.FC = () => {
  const { t, language } = useLanguage();
  const { data, loading, error } = useAnnouncements();

  const items = data?.data ?? [];

  return (
    <div className="pb-10">
      <Breadcrumb />

      <div className="mt-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-[#013d8c] rounded-full shrink-0" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
            {t('nav.media.announcements') || "E'lonlar"}
          </h1>
        </div>
        <div className="h-px bg-gray-200 mt-4" />
      </div>

      {loading && <Loading />}

      {error && (
        <p className="text-center py-16 text-gray-500">
          {t('common.error') || 'Xatolik yuz berdi'}
        </p>
      )}

      {!loading && !error && items.length === 0 && (
        <p className="text-center py-16 text-gray-500">
          {t('pages.announcements.comingSoon') || "E'lonlar topilmadi"}
        </p>
      )}

      {items.length > 0 && (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <AnnouncementCard key={item.id} item={item} language={language} t={t} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;
