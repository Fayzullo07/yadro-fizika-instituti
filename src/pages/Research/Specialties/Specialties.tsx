import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSpecialties } from '@/hooks/useSpecialties';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import type { SpecialtyItem } from '@/types';

const PER_PAGE = 10;

const PdfModal: React.FC<{ url: string; title: string; onClose: () => void }> = ({
  url,
  title,
  onClose,
}) => {
  const { t } = useLanguage();
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl flex flex-col w-full max-w-4xl h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="shrink-0 flex flex-col items-center justify-center w-8 h-9 rounded bg-red-50 border border-red-100">
              <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                <path fill="white" d="M14 2v6h6" />
              </svg>
              <span className="text-[7px] font-black text-red-400 tracking-wider leading-none">
                PDF
              </span>
            </div>
            <p className="text-sm font-semibold text-gray-800 truncate">{title}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-3">
            <a
              href={url}
              download
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#013d8c] border border-[#013d8c]/25 px-3 py-1.5 rounded-lg hover:bg-[#013d8c] hover:text-white transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              {t('pages.specialties.download') || 'Yuklab olish'}
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden rounded-b-2xl">
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
            className="w-full h-full"
            title={title}
          />
        </div>
      </div>
    </div>
  );
};

const SpecialtyRow: React.FC<{ item: SpecialtyItem; index: number }> = ({ item, index }) => {
  const { t } = useLanguage();
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <div className="bg-white border border-gray-300 rounded-lg p-3 sm:p-5 hover:border-gray-400 transition-colors duration-200">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
            <span className="text-sm sm:text-base font-semibold text-gray-900 shrink-0">
              {index + 1})
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2 flex-wrap">
                {item.code && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#013d8c]/8 text-xs font-bold text-[#013d8c] tracking-wide shrink-0 mt-0.5">
                    {item.code}
                  </span>
                )}
                <span className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  "{item.name}"
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {item.file ? (
              <>
                <button
                  onClick={() => setShowPreview(true)}
                  title={t('pages.specialties.preview') || "Ko'rish"}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-[#013d8c] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                </button>
                <a
                  href={item.file}
                  target="_blank"
                  download
                  title={t('pages.specialties.download') || 'Yuklab olish'}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </a>
              </>
            ) : (
              <span className="text-xs text-gray-300">
                {t('pages.specialties.fileNotAvailable') || "Fayl yo'q"}
              </span>
            )}
          </div>
        </div>
      </div>

      {showPreview && item.file && (
        <PdfModal url={item.file} title={item.name} onClose={() => setShowPreview(false)} />
      )}
    </>
  );
};

const SkeletonRow: React.FC = () => (
  <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-5 animate-pulse">
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-start gap-4 flex-1">
        <div className="h-5 w-6 bg-gray-100 rounded shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-3/4" />
        </div>
      </div>
      <div className="flex gap-2 shrink-0">
        <div className="w-8 h-8 bg-gray-100 rounded" />
        <div className="w-8 h-8 bg-gray-100 rounded" />
      </div>
    </div>
  </div>
);

const Pagination: React.FC<{
  page: number;
  lastPage: number;
  onPageChange: (p: number) => void;
}> = ({ page, lastPage, onPageChange }) => {
  if (lastPage <= 1) return null;
  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 mt-6 sm:mt-10">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-[#013d8c] hover:text-[#013d8c] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold border transition-colors ${
            p === page
              ? 'bg-[#013d8c] text-white border-[#013d8c]'
              : 'border-gray-200 text-gray-600 hover:border-[#013d8c] hover:text-[#013d8c]'
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === lastPage}
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-[#013d8c] hover:text-[#013d8c] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

const Specialties: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const { data, loading, error } = useSpecialties({ page, per_page: PER_PAGE });
  const items: SpecialtyItem[] = Array.isArray(data?.data) ? data.data : [];
  const lastPage = data?.meta?.last_page ?? 1;

  const handlePageChange = (p: number) => {
    setSearchParams({ page: String(p) });
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen">
      <div className="pb-8 md:pb-12">
        <PageTitle>{t('nav.ilmiyFaoliyat.specialties') || 'Ixtisosliklar pasportlari'}</PageTitle>

        {loading && (
          <div className="space-y-3 sm:space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <SkeletonRow key={i} />
            ))}
          </div>
        )}

        {error && (
          <p className="text-center py-20 text-sm text-gray-400">
            {t('common.error') || 'Xatolik yuz berdi'}
          </p>
        )}

        {!loading && !error && items.length === 0 && (
          <p className="text-center py-20 text-sm text-gray-400">
            {t('pages.specialties.emptyMessage') || "Ma'lumot topilmadi"}
          </p>
        )}

        {items.length > 0 && (
          <>
            <div className="space-y-3 sm:space-y-4">
              {items.map((item, index) => (
                <SpecialtyRow key={item.id} item={item} index={(page - 1) * PER_PAGE + index} />
              ))}
            </div>
            <Pagination page={page} lastPage={lastPage} onPageChange={handlePageChange} />
          </>
        )}
      </div>
    </div>
  );
};

export default Specialties;
