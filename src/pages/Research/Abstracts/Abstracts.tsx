import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAbstracts } from '@/hooks/usePublications';
import Loading from '@/components/shared/Loading/Loading';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import { ABSTRACTS_PATH } from '@/routes/path';

const Abstracts: React.FC = () => {
  const { t } = useLanguage();
  const { data, loading, error } = useAbstracts();

  const items = data?.data ?? [];

  return (
    <div className="pb-10">
      <PageTitle>{t('nav.ilmiyFaoliyat.abstracts') || 'Avtoreferatlar'}</PageTitle>

      {loading && <Loading />}
      {error && <p className="text-center py-16 text-gray-500">{t('common.error')}</p>}
      {!loading && !error && items.length === 0 && (
        <p className="text-center py-16 text-gray-500">{t('common.notAvailable')}</p>
      )}
      {!loading && !error && items.length > 0 && (
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <Link
              key={item.id}
              to={`${ABSTRACTS_PATH}/${item.id}`}
              className="group relative flex items-center gap-4 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden pl-5 pr-4 sm:pr-5 py-4"
            >
              {/* Left accent bar */}
              <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-linear-to-b from-[#013d8c] to-[#60a5fa] group-hover:w-2 transition-all duration-300" />

              {/* Document badge */}
              <div className="relative shrink-0">
                <div className="w-12 h-14 rounded-md bg-linear-to-br from-red-50 to-red-100 border border-red-100 flex items-end justify-center pb-1.5 relative overflow-hidden">
                  {/* folded corner */}
                  <span className="absolute top-0 right-0 w-3 h-3 bg-white border-b border-l border-red-100" />
                  <span className="text-[9px] font-bold text-red-500 tracking-wide">PDF</span>
                </div>
              </div>

              {/* Title + meta */}
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-[#013d8c] transition-colors leading-snug line-clamp-2">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-gray-400">{item.type_label}</p>
              </div>

              {/* Actions */}
              <div className="shrink-0 flex items-center gap-2">
                <a
                  href={item.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center w-10 h-10 rounded-full text-[#013d8c] bg-blue-50 hover:bg-blue-100 transition-colors"
                  title={t('news.detail') || "Ko'rish"}
                >
                  <svg
                    className="w-4.5 h-4.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </a>
                <a
                  href={item.file}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="hidden sm:flex items-center gap-1.5 px-4 h-10 rounded-full text-sm font-medium text-white bg-linear-to-r from-[#013d8c] to-[#1a5fb4] hover:opacity-90 shadow-sm transition-opacity"
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
                <a
                  href={item.file}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="sm:hidden flex items-center justify-center w-10 h-10 rounded-full text-white bg-linear-to-r from-[#013d8c] to-[#1a5fb4] shadow-sm"
                >
                  <svg
                    className="w-4.5 h-4.5"
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
                </a>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Abstracts;
