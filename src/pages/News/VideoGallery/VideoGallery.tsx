import { useState, useCallback } from 'react';
import { useVideoGallery } from '@/hooks/useVideoGallery';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatDate } from '@/utils/dateUtils';
import Loading from '@/components/shared/Loading/Loading';
import type { VideoGalleryItem } from '@/types';

const getYouTubeId = (url: string): string | null =>
  url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/))([^?&/#]+)/
  )?.[1] ?? null;

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const PlayOverlay = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
    <div className="w-12 h-12 rounded-full bg-white/80 group-hover:bg-white transition-colors duration-300 flex items-center justify-center shadow-lg">
      <svg className="w-5 h-5 text-gray-800 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  </div>
);

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
        <CloseIcon />
      </button>

      <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        {ytId ? (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${ytId}?rel=0&modestbranding=1&autoplay=1`}
              title={item.title}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        ) : (
          <div className="bg-gray-900 rounded-lg p-8 text-center">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {item.title}
            </a>
          </div>
        )}
        <p className="mt-3 text-white/70 text-sm text-center line-clamp-2">{item.title}</p>
      </div>
    </div>
  );
};

const VideoCard: React.FC<{
  item: VideoGalleryItem;
  language: string;
  label: string;
  onClick: () => void;
}> = ({ item, language, label, onClick }) => {
  const ytId = getYouTubeId(item.url);
  const thumb = ytId ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg` : null;

  return (
    <button
      onClick={onClick}
      className="group text-left bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 focus:outline-none"
    >
      <div className="relative overflow-hidden aspect-video bg-gray-100">
        {thumb ? (
          <img src={thumb} alt="" className="w-full h-full object-cover video-card-img" />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
        <PlayOverlay />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">{label}</span>
        <p className="text-sm text-gray-700 font-medium line-clamp-2 leading-snug h-10.5 overflow-hidden">
          {item.title}
        </p>
        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="text-sm text-gray-400">{formatDate(item.created_at, language)}</span>
          <span className="text-gray-400 group-hover:text-gray-700 transition-colors text-base leading-none">
            →
          </span>
        </div>
      </div>
    </button>
  );
};

const VideoGallery: React.FC = () => {
  const { t, language } = useLanguage();
  const { data, loading, error } = useVideoGallery({ per_page: 50 });
  const [activeItem, setActiveItem] = useState<VideoGalleryItem | null>(null);

  const items: VideoGalleryItem[] = data?.data ?? [];

  const openModal = useCallback((item: VideoGalleryItem) => setActiveItem(item), []);
  const closeModal = useCallback(() => setActiveItem(null), []);

  const label = t('nav.media.videoGallery') || 'Video Galereya';

  return (
    <div className="pb-10">
      <div className="mt-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-[#013d8c] rounded-full shrink-0" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
            {label}
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
          {t('common.noData') || "Ma'lumot topilmadi"}
        </p>
      )}

      {items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((item) => (
            <VideoCard
              key={item.id}
              item={item}
              language={language}
              label={label}
              onClick={() => openModal(item)}
            />
          ))}
        </div>
      )}

      {activeItem && <VideoModal item={activeItem} onClose={closeModal} />}
    </div>
  );
};

export default VideoGallery;
