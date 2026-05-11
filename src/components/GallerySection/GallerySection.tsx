import { useState, useCallback } from 'react';
import { useGalleries } from '@/hooks/useGalleries';
import { useLanguage } from '@/contexts/LanguageContext';
import type { GalleryItem } from '@/types';

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
      className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
      onClick={onClose}
    >
      <CloseIcon />
    </button>

    {items.length > 1 && (
      <button
        className="absolute left-4 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
        onClick={(e) => {
          e.stopPropagation();
          onNav((index - 1 + items.length) % items.length);
        }}
      >
        <ChevronIcon dir="left" />
      </button>
    )}

    <div className="max-w-5xl max-h-[85vh] mx-16" onClick={(e) => e.stopPropagation()}>
      <img
        src={items[index].image}
        alt=""
        className="max-h-[82vh] max-w-full object-contain rounded-lg shadow-2xl"
      />
    </div>

    {items.length > 1 && (
      <button
        className="absolute right-4 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
        onClick={(e) => {
          e.stopPropagation();
          onNav((index + 1) % items.length);
        }}
      >
        <ChevronIcon dir="right" />
      </button>
    )}

    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
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

const GallerySection: React.FC = () => {
  const { t } = useLanguage();
  const { data, loading } = useGalleries({ per_page: 7 });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items = data?.data ?? [];

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const navLightbox = useCallback((i: number) => setLightboxIndex(i), []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <div className="h-3 w-24 bg-gray-100 rounded animate-pulse mb-3" />
            <div className="h-8 w-48 bg-gray-100 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[200px]">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className={`bg-gray-100 rounded-xl animate-pulse ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!items.length) return null;

  return (
    <>
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <span className="text-sm font-medium text-gray-400 tracking-widest uppercase mb-3 block">
              {t('gallery.subtitle')}
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              {t('gallery.title')}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[200px]">
            {items.slice(0, 7).map((item, i) => (
              <button
                key={item.id}
                onClick={() => openLightbox(i)}
                className={`group relative overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  i === 0 ? 'col-span-2 row-span-2' : ''
                }`}
              >
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          items={items.slice(0, 7)}
          index={lightboxIndex}
          onClose={closeLightbox}
          onNav={navLightbox}
        />
      )}
    </>
  );
};

export default GallerySection;
