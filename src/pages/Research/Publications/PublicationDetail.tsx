import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePublicationById } from '@/hooks/usePublications';
import { formatDate } from '@/utils/dateUtils';
import Loading from '@/components/shared/Loading/Loading';
import BackButton from '@/components/shared/BackButton/BackButton';
import { PublicationType } from '@/services/api';
import { ARTICLES_PATH, ABSTRACTS_PATH, DOCTORATE_PATH } from '@/routes/path';

const backPathByType: Record<string, string> = {
  [PublicationType.ScientificArticle]: ARTICLES_PATH,
  [PublicationType.Abstract]: ABSTRACTS_PATH,
  [PublicationType.Dissertation]: DOCTORATE_PATH,
};

const PublicationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { data, loading, error } = usePublicationById(id || '');

  const item = data?.data;

  if (loading) return <Loading />;

  const backPath = (item && backPathByType[item.type]) || DOCTORATE_PATH;

  if (error || !item) {
    return (
      <div className="text-center py-16 sm:py-20">
        <p className="text-gray-500 mb-4 text-sm sm:text-base">{t('common.error')}</p>
        <Link
          to={backPath}
          className="text-[#013d8c] hover:underline font-medium text-sm sm:text-base"
        >
          ← {t('backToList')}
        </Link>
      </div>
    );
  }

  const viewerSrc = `https://docs.google.com/viewer?url=${encodeURIComponent(item.file)}&embedded=true`;

  return (
    <div className="pb-10">
      <BackButton to={backPath} label={t('backToList')} />

      <article className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#013d8c] px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 mb-2 sm:mb-3">
            <span className="inline-flex items-center gap-1.5 text-white/70 text-xs sm:text-sm">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {item.type_label}
            </span>
            <span className="inline-flex items-center gap-1.5 text-white/70 text-xs sm:text-sm">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
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
              {formatDate(item.created_at, language)}
            </span>
          </div>
          <h1 className="text-white font-bold text-lg sm:text-2xl leading-snug">{item.title}</h1>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6">
          {/* Toolbar */}
          <div className="flex items-center justify-end gap-2 mb-4">
            <a
              href={item.file}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 h-10 rounded-lg text-sm font-medium text-[#013d8c] bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <span className="hidden sm:inline">{t('news.detail') || 'Yangi oynada'}</span>
            </a>
            <a
              href={item.file}
              download
              className="inline-flex items-center gap-1.5 px-4 h-10 rounded-lg text-sm font-medium text-white bg-[#013d8c] hover:bg-[#012d6a] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              {t('common.download') || 'Yuklab olish'}
            </a>
          </div>

          {/* Document viewer */}
          <div
            className="w-full rounded-lg overflow-hidden border border-gray-200 bg-[#f5f5f5]"
            style={{ blockSize: '78vh' }}
          >
            <iframe src={viewerSrc} className="w-full h-full border-0" title={item.title} />
          </div>
        </div>
      </article>
    </div>
  );
};

export default PublicationDetail;
