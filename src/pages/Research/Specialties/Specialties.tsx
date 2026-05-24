import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSpecialties } from '@/hooks/useSpecialties';
import type { SpecialtyItem } from '@/types';

const PER_PAGE = 9;

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
        {/* Modal header */}
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

        {/* PDF viewer via Google Docs */}
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

const SpecialtyCard: React.FC<{ item: SpecialtyItem; index: number }> = ({ item, index }) => {
  const { t } = useLanguage();
  const [showPreview, setShowPreview] = useState(false);
  const [fileSize, setFileSize] = useState<string | null>(null);

  useEffect(() => {
    if (!item.file) return;
    const controller = new AbortController();
    fetch(item.file, {
      method: 'GET',
      headers: { Range: 'bytes=0-0' },
      signal: controller.signal,
    })
      .then((res) => {
        let bytes = 0;
        const cl = res.headers.get('content-length');
        if (cl) bytes = parseInt(cl, 10);
        const cr = res.headers.get('content-range');
        if (!bytes && cr) {
          const m = cr.match(/\/(\d+)$/);
          if (m) bytes = parseInt(m[1], 10);
        }
        controller.abort();
        if (bytes > 0) {
          setFileSize(
            bytes >= 1024 * 1024
              ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
              : `${Math.round(bytes / 1024)} KB`
          );
        }
      })
      .catch(() => {});
    return () => controller.abort();
  }, [item.file]);

  const fileName = 'Fayl';

  return (
    <>
      <div className="group flex flex-col bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
        <div className="flex items-start justify-between mb-4">
          {item.code && (
            <span className="text-xs font-semibold text-[#013d8c] bg-[#013d8c]/8 px-2.5 py-1 rounded-full">
              {item.code}
            </span>
          )}
          <span className="text-2xl font-black text-gray-100 leading-none select-none ml-auto">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <p className="flex-1 text-sm md:text-[15px] text-gray-700 leading-relaxed font-medium mb-5">
          {item.name}
        </p>

        {item.file ? (
          <div className="self-stretch flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200">
            {/* PDF icon + filename + size */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="shrink-0 flex flex-col items-center justify-center w-8 h-9 rounded bg-red-50 border border-red-100">
                <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                  <path fill="white" d="M14 2v6h6" />
                </svg>
                <span className="text-[7px] font-black text-red-400 tracking-wider leading-none">
                  PDF
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-medium text-gray-700 truncate leading-tight">
                  {fileName}
                </span>
                {fileSize && (
                  <span className="text-[11px] text-gray-400 leading-tight">{fileSize}</span>
                )}
              </div>
            </div>

            {/* icon-only buttons */}
            <div className="flex items-center gap-0.5 shrink-0">
              <button
                onClick={() => setShowPreview(true)}
                title={t('pages.specialties.preview') || "Ko'rish"}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-[#013d8c] hover:bg-[#013d8c]/8 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                download
                title={t('pages.specialties.download') || 'Yuklab olish'}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </a>
            </div>
          </div>
        ) : (
          <div className="self-stretch flex items-center gap-3 px-3.5 py-2.5 rounded-lg border border-dashed border-gray-200">
            <div className="shrink-0 flex flex-col items-center justify-center w-8 h-9 rounded bg-gray-50 border border-gray-100">
              <svg
                className="w-4 h-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-[7px] font-black text-gray-300 tracking-wider leading-none">
                PDF
              </span>
            </div>
            <p className="text-xs text-gray-300">
              {t('pages.specialties.fileNotAvailable') || 'Fayl mavjud emas'}
            </p>
          </div>
        )}
      </div>

      {showPreview && item.file && (
        <PdfModal url={item.file} title={item.name} onClose={() => setShowPreview(false)} />
      )}
    </>
  );
};

const SkeletonCard: React.FC = () => (
  <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm animate-pulse">
    <div className="flex justify-between mb-4">
      <div className="h-6 w-20 bg-gray-100 rounded-full" />
      <div className="h-6 w-8 bg-gray-100 rounded" />
    </div>
    <div className="space-y-2 mb-5">
      <div className="h-4 bg-gray-100 rounded w-full" />
      <div className="h-4 bg-gray-100 rounded w-5/6" />
      <div className="h-4 bg-gray-100 rounded w-2/3" />
    </div>
    <div className="h-20 bg-gray-100 rounded-lg" />
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
    <div className="flex items-center justify-center gap-1.5 mt-10">
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
  const total = data?.meta?.total ?? 0;
  const lastPage = data?.meta?.last_page ?? 1;

  const handlePageChange = (p: number) => {
    setSearchParams({ page: String(p) });
    window.scrollTo(0, 0);
  };

  return (
    <div className="pb-10">
      <div className="mt-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-[#013d8c] rounded-full shrink-0" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
            {t('nav.ilmiyFaoliyat.specialties') || 'Ixtisosliklar pasportlari'}
          </h1>
        </div>
        <div className="h-px bg-gray-200 mt-4" />
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, index) => (
              <SpecialtyCard key={item.id} item={item} index={(page - 1) * PER_PAGE + index} />
            ))}
          </div>
          <Pagination page={page} lastPage={lastPage} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
};

export default Specialties;
