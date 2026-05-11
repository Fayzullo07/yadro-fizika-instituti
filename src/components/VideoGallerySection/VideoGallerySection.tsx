import { useState, useCallback } from 'react';
import { useVideoGallery } from '@/hooks/useVideoGallery';
import { useLanguage } from '@/contexts/LanguageContext';
import type { VideoGalleryItem } from '@/types';

const getYouTubeId = (url: string): string | null =>
  url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/))([^?&/#]+)/
  )?.[1] ?? null;

const PlayIcon = () => (
  <svg className="w-10 h-10 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const VideoCard: React.FC<{ item: VideoGalleryItem; onClick: () => void }> = ({
  item,
  onClick,
}) => {
  const ytId = getYouTubeId(item.url);
  const thumb = ytId ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg` : null;

  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-left"
    >
      <div className="relative w-full aspect-video overflow-hidden bg-gray-800">
        {thumb ? (
          <img
            src={thumb}
            alt={item.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />
        )}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <PlayIcon />
          </div>
        </div>
      </div>
      <div className="p-3">
        <p className="text-sm font-medium text-white line-clamp-2 leading-snug">{item.title}</p>
      </div>
    </button>
  );
};

const VideoModal: React.FC<{ item: VideoGalleryItem; onClose: () => void }> = ({
  item,
  onClose,
}) => {
  const ytId = getYouTubeId(item.url);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
        onClick={onClose}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        {ytId ? (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${ytId}?rel=0&modestbranding=1`}
              title={item.title}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        ) : (
          <div className="bg-gray-900 rounded-xl p-8 text-center">
            <p className="text-white mb-4">{item.title}</p>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Open Link
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        )}
        <p className="mt-3 text-white/80 text-sm text-center">{item.title}</p>
      </div>
    </div>
  );
};

const VideoGallerySection: React.FC = () => {
  const { t } = useLanguage();
  const { data, loading } = useVideoGallery({ per_page: 8 });
  const [activeItem, setActiveItem] = useState<VideoGalleryItem | null>(null);

  const items = data?.data ?? [];

  const openModal = useCallback((item: VideoGalleryItem) => setActiveItem(item), []);
  const closeModal = useCallback(() => setActiveItem(null), []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <div className="h-3 w-24 bg-gray-800 rounded animate-pulse mb-3" />
            <div className="h-8 w-56 bg-gray-800 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden bg-gray-800 animate-pulse">
                <div className="aspect-video" />
                <div className="p-3">
                  <div className="h-3 bg-gray-700 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!items.length) return null;

  return (
    <>
      <section className="py-16 md:py-24 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <span className="text-sm font-medium text-blue-400 tracking-widest uppercase mb-3 block">
              {t('videoGallery.subtitle')}
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              {t('videoGallery.title')}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.slice(0, 8).map((item) => (
              <VideoCard key={item.id} item={item} onClick={() => openModal(item)} />
            ))}
          </div>
        </div>
      </section>

      {activeItem && <VideoModal item={activeItem} onClose={closeModal} />}
    </>
  );
};

export default VideoGallerySection;
