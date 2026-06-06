import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGalleries } from '@/hooks/useGalleries';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatDate } from '@/utils/dateUtils';
import Loading from '@/components/shared/Loading/Loading';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import type { GalleryItem } from '@/types';

const PER_PAGE = 12;

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChevronIcon = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d={dir === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
    />
  </svg>
);

const Lightbox: React.FC<{
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNav: (i: number) => void;
}> = ({ items, index, onClose, onNav }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
    onClick={onClose}
  >
    <button
      className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
      onClick={onClose}
    >
      <CloseIcon />
    </button>

    {items.length > 1 && (
      <button
        className="absolute left-2 sm:left-4 text-white/70 hover:text-white p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
        onClick={(e) => {
          e.stopPropagation();
          onNav((index - 1 + items.length) % items.length);
        }}
      >
        <ChevronIcon dir="left" />
      </button>
    )}

    <div className="max-w-5xl max-h-[85vh] mx-10 sm:mx-16" onClick={(e) => e.stopPropagation()}>
      <img
        src={items[index].image}
        alt=""
        className="max-h-[82vh] max-w-full object-contain rounded-lg shadow-2xl"
      />
    </div>

    {items.length > 1 && (
      <button
        className="absolute right-2 sm:right-4 text-white/70 hover:text-white p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
        onClick={(e) => {
          e.stopPropagation();
          onNav((index + 1) % items.length);
        }}
      >
        <ChevronIcon dir="right" />
      </button>
    )}

    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 flex-wrap justify-center max-w-xs">
      {items.map((_, i) => (
        <button
          key={i}
          onClick={(e) => {
            e.stopPropagation();
            onNav(i);
          }}
          className={`rounded-full transition-all duration-300 ${
            i === index ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
          }`}
        />
      ))}
    </div>
  </div>
);

const GalleryCard: React.FC<{
  item: GalleryItem;
  index: number;
  language: string;
  label: string;
  onClick: (i: number) => void;
}> = ({ item, index, language, label, onClick }) => (
  <button
    onClick={() => onClick(index)}
    className="group text-left bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 focus:outline-none"
  >
    <div className="relative overflow-hidden aspect-video">
      <img src={item.image} alt="" className="w-full h-full object-cover gallery-card-img" />
    </div>
    <div className="p-3 sm:p-4 flex flex-col gap-1.5 sm:gap-2">
      <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">{label}</span>
      <div className="flex items-center justify-between mt-auto pt-1">
        <span className="text-xs sm:text-sm text-gray-400">
          {formatDate(item.created_at, language)}
        </span>
        <span className="text-gray-400 group-hover:text-gray-700 transition-colors text-base leading-none">
          →
        </span>
      </div>
    </div>
  </button>
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

const Gallery: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const { data, loading, error } = useGalleries({ page, per_page: PER_PAGE });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lastPage = data?.meta?.last_page ?? 1;

  const handlePageChange = (p: number) => {
    setSearchParams({ page: String(p) });
    window.scrollTo(0, 0);
  };

  const items: GalleryItem[] = data?.data ?? [];

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const navLightbox = useCallback((i: number) => setLightboxIndex(i), []);

  const label = t('gallery.title');

  return (
    <div className="pb-10">
      <PageTitle>{label}</PageTitle>

      {loading && <Loading />}
      {error && <p className="text-center py-16 text-gray-500">{t('common.error')}</p>}
      {!loading && !error && items.length === 0 && (
        <p className="text-center py-16 text-gray-500">{t('common.notAvailable')}</p>
      )}

      {items.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {items.map((item, i) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={i}
                language={language}
                label={label}
                onClick={openLightbox}
              />
            ))}
          </div>
          <Pagination page={page} lastPage={lastPage} onPageChange={handlePageChange} />
        </>
      )}

      {lightboxIndex !== null && (
        <Lightbox items={items} index={lightboxIndex} onClose={closeLightbox} onNav={navLightbox} />
      )}
    </div>
  );
};

export default Gallery;
