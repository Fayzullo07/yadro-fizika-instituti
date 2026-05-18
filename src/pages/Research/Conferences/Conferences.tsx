import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useConferences } from '@/hooks/useConferences';
import { formatDate } from '@/utils/dateUtils';
import { stripHtmlAndDecode } from '@/utils/htmlUtils';
import Loading from '@/components/shared/Loading/Loading';
import type { ConferenceItem } from '@/types';

const ConferenceCard: React.FC<{
  item: ConferenceItem;
  language: string;
  t: (k: string) => string;
  index: number;
}> = ({ item, language, t, index }) => {
  const preview = stripHtmlAndDecode(item.description).slice(0, 200).trim();
  const isSameDay = item.start_date === item.end_date;
  const dateLabel = isSameDay
    ? formatDate(item.start_date, language)
    : `${formatDate(item.start_date, language)} — ${formatDate(item.end_date, language)}`;

  return (
    <div className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-[#013d8c]/30 transition-all duration-300">
      {/* Top accent bar */}
      <div className="h-1 bg-[#013d8c]" />

      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Date + number row */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#013d8c] bg-[#013d8c]/8 px-3 py-1.5 rounded-full">
            <svg
              className="w-3.5 h-3.5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {dateLabel}
          </span>
          <span className="shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-400 text-xs font-bold flex items-center justify-center">
            {index + 1}
          </span>
        </div>

        {/* Title */}
        <Link
          to={`/research/conferences/${item.id}`}
          className="text-base font-semibold text-gray-900 group-hover:text-[#013d8c] transition-colors leading-snug hover:underline decoration-[#013d8c]/40"
        >
          {item.title}
        </Link>

        {/* Location */}
        {item.location && (
          <div className="flex items-start gap-1.5 text-sm text-gray-500">
            <svg
              className="w-4 h-4 mt-0.5 shrink-0 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="leading-snug">{item.location}</span>
          </div>
        )}

        {/* Description */}
        {preview && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1">
            {preview}
            {preview.length >= 200 ? '…' : ''}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 pt-1 mt-auto border-t border-gray-100">
          <Link
            to={`/research/conferences/${item.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#013d8c] hover:underline"
          >
            {t('pages.conferences.readMore') || 'Batafsil'}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          {item.file && (
            <a
              href={item.file}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#013d8c] transition-colors"
            >
              <svg
                className="w-3.5 h-3.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              PDF
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Conferences: React.FC = () => {
  const { t, language } = useLanguage();
  const { data, loading, error } = useConferences();

  const items = data?.data ?? [];

  return (
    <div className="pb-10">
      <div className="mt-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-[#013d8c] rounded-full shrink-0" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
            {t('nav.media.conferences') || 'Konferensiyalar'}
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
          {t('pages.conferences.noConferences') || 'Hozirda konferensiyalar mavjud emas'}
        </p>
      )}

      {items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, index) => (
            <ConferenceCard key={item.id} item={item} language={language} t={t} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Conferences;
