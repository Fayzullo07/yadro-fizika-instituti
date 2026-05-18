import { useLanguage } from '@/contexts/LanguageContext';
import { useConferences } from '@/hooks/useConferences';
import { formatDate } from '@/utils/dateUtils';
import { stripHtmlAndDecode } from '@/utils/htmlUtils';
import Loading from '@/components/shared/Loading/Loading';
import type { ConferenceItem } from '@/types';

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
);

const ConferenceCard: React.FC<{
  item: ConferenceItem;
  language: string;
  t: (k: string) => string;
}> = ({ item, language, t }) => {
  const preview = stripHtmlAndDecode(item.description).slice(0, 200).trim();
  const dateRange =
    item.start_date === item.end_date
      ? formatDate(item.start_date, language)
      : `${formatDate(item.start_date, language)} – ${formatDate(item.end_date, language)}`;

  return (
    <article className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-[#013d8c]/40 transition-all duration-300 flex flex-col">
      {item.image && (
        <div className="h-44 overflow-hidden shrink-0">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1.5 text-[#013d8c] bg-[#013d8c]/8 px-2.5 py-1 rounded-full font-medium">
            <CalendarIcon />
            {dateRange}
          </span>
          {item.location && (
            <span className="inline-flex items-center gap-1.5">
              <LocationIcon />
              {item.location}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-base font-semibold text-gray-900 group-hover:text-[#013d8c] transition-colors leading-snug">
          {item.title}
        </h2>

        {/* Preview */}
        {preview && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
            {preview}
            {preview.length >= 200 ? '…' : ''}
          </p>
        )}

        {/* PDF download */}
        {item.file && (
          <a
            href={item.file}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-[#013d8c] hover:underline"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            {t('common.downloadPdf') || 'PDF yuklab olish'}
          </a>
        )}
      </div>
    </article>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <ConferenceCard key={item.id} item={item} language={language} t={t} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Conferences;
