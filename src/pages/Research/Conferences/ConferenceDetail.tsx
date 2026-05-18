import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useConferenceById } from '@/hooks/useConferences';
import { sanitizeHtml } from '@/utils/htmlUtils';
import { formatDate } from '@/utils/dateUtils';
import Loading from '@/components/shared/Loading/Loading';
import BackButton from '@/components/shared/BackButton/BackButton';
import { CONFERENCES_PATH } from '@/routes/path';

const ConferenceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { data: detailRes, loading, error } = useConferenceById(id!);

  const item = detailRes?.data;

  if (loading) return <Loading />;

  if (error || !item) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">{t('common.error') || 'Konferensiya topilmadi'}</p>
        <Link to={CONFERENCES_PATH} className="text-[#013d8c] hover:underline font-medium">
          ← {t('pages.conferences.backToList') || "Konferensiyalar ro'yxatiga qaytish"}
        </Link>
      </div>
    );
  }

  const isSameDay = item.start_date === item.end_date;
  const dateRange = isSameDay
    ? formatDate(item.start_date, language)
    : `${formatDate(item.start_date, language)} – ${formatDate(item.end_date, language)}`;

  return (
    <div className="pb-10">
      <BackButton
        to={CONFERENCES_PATH}
        label={t('pages.conferences.backToList') || "Konferensiyalar ro'yxatiga qaytish"}
      />

      <article className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-[#013d8c] px-6 py-5">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-3">
            <span className="inline-flex items-center gap-1.5 text-white/70 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {dateRange}
            </span>
            {item.location && (
              <span className="inline-flex items-center gap-1.5 text-white/70 text-sm">
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
                {item.location}
              </span>
            )}
          </div>
          <h1 className="text-white text-xl md:text-2xl font-bold leading-snug">{item.title}</h1>
        </div>

        {item.image && (
          <div className="overflow-hidden max-h-80">
            <img src={item.image} alt={item.title} loading="lazy" className="w-full object-cover" />
          </div>
        )}

        {item.file && (
          <div className="px-6 pt-5">
            <a
              href={item.file}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#013d8c] bg-[#013d8c]/8 hover:bg-[#013d8c]/15 px-4 py-2 rounded-lg transition-colors"
            >
              <svg
                className="w-4 h-4 shrink-0"
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
              {t('common.downloadPdf') || 'PDF yuklab olish'}
            </a>
          </div>
        )}

        <div
          className="
            px-6 py-6 text-gray-700 text-[15px] leading-relaxed
            [&_a]:text-blue-600 [&_a]:underline [&_a]:break-all [&_a:hover]:text-blue-800
            [&_blockquote]:border-l-4 [&_blockquote]:border-[#013d8c]/30
            [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-500 [&_blockquote]:my-4
            [&_b]:font-semibold [&_strong]:font-semibold
            [&_div]:leading-relaxed
            [&_p]:mb-3
            [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-gray-200 [&_td]:px-3 [&_td]:py-2
            [&_th]:border [&_th]:border-gray-200 [&_th]:px-3 [&_th]:py-2 [&_th]:bg-gray-50 [&_th]:font-semibold
          "
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.description) }}
        />
      </article>
    </div>
  );
};

export default ConferenceDetail;
