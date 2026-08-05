import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useVideoGallery } from '@/hooks/useVideoGallery';
import { useLanguage } from '@/contexts/LanguageContext';
import { getDayMonth } from '@/utils/dateUtils';
import { VIDEO_GALLERY_PATH } from '@/routes/path';
import type { VideoGalleryItem } from '@/types';

const ArrowIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const getYouTubeId = (url: string): string | null =>
  url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/))([^?&/#]+)/
  )?.[1] ?? null;

// "12 IYUN '26" — a stamped, monospaced recording date rather than a
// fabricated duration (the API gives us no runtime metadata).
const stamp = (dateStr: string, language: string): string => {
  const { day, month } = getDayMonth(dateStr, language);
  const yy = String(new Date(dateStr).getFullYear()).slice(-2);
  return `${day} ${month.toUpperCase()} '${yy}`;
};

const FeaturedReel: React.FC<{
  item: VideoGalleryItem;
  language: string;
  label: string;
  watchLabel: string;
  onClick: () => void;
}> = ({ item, language, label, watchLabel, onClick }) => {
  const ytId = getYouTubeId(item.url);
  const thumb = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null;

  return (
    <button
      onClick={onClick}
      aria-label={`${watchLabel}: ${item.title}`}
      className="group relative flex flex-col w-full overflow-hidden rounded-lg text-left focus:outline-none"
    >
      <div className="relative w-full aspect-video overflow-hidden bg-[#081a38]">
        {thumb ? (
          <img
            src={thumb}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover video-card-img"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-[#0a2050] to-[#04122b]" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-[#020a1a]/95 via-[#020a1a]/10 to-transparent" />
        <div className="video-scan-line" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/25 flex items-center justify-center group-hover:scale-105 group-hover:border-white/50 group-hover:bg-white/15 transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-[#2f6fed]">
            <PlayIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white translate-x-0.5" />
          </div>
        </div>

        <div className="absolute left-4 right-4 bottom-4 sm:left-5 sm:right-5 sm:bottom-5">
          <span className="inline-flex items-center gap-1.5 mb-2 text-[11px] font-mono tracking-wider text-amber-300/90">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {label}
            <span className="text-white/40">/ {stamp(item.created_at, language)}</span>
          </span>
          <h3 className="text-base sm:text-xl font-bold text-white leading-snug line-clamp-2">
            {item.title}
          </h3>
        </div>
      </div>
    </button>
  );
};

const RailItem: React.FC<{
  item: VideoGalleryItem;
  language: string;
  watchLabel: string;
  onClick: () => void;
}> = ({ item, language, watchLabel, onClick }) => {
  const ytId = getYouTubeId(item.url);
  const thumb = ytId ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg` : null;

  return (
    <button
      onClick={onClick}
      aria-label={`${watchLabel}: ${item.title}`}
      className="group flex items-center gap-3 w-56 lg:w-full shrink-0 text-left p-2 rounded-md border-l-2 border-transparent hover:border-[#2f6fed] hover:bg-white/5 focus:outline-none focus-visible:border-[#2f6fed] focus-visible:bg-white/5 transition-colors duration-200"
    >
      <div className="relative w-20 sm:w-24 shrink-0 aspect-video overflow-hidden rounded bg-[#081a38]">
        {thumb ? (
          <img
            src={thumb}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-[#0a2050] to-[#04122b]" />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
          <PlayIcon className="w-4 h-4 text-white/90" />
        </div>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-white/90 line-clamp-2 leading-snug mb-1">
          {item.title}
        </p>
        <span className="text-[11px] font-mono tracking-wide text-white/40">
          {stamp(item.created_at, language)}
        </span>
      </div>
    </button>
  );
};

const VideoModal: React.FC<{
  item: VideoGalleryItem;
  openLinkLabel: string;
  onClose: () => void;
}> = ({ item, openLinkLabel, onClose }) => {
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
              {openLinkLabel}
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
  const { t, language } = useLanguage();
  const { data, loading } = useVideoGallery({ per_page: 8 });
  const [activeItem, setActiveItem] = useState<VideoGalleryItem | null>(null);

  const items = data?.data ?? [];
  const [featured, ...rest] = items;

  const openModal = useCallback((item: VideoGalleryItem) => setActiveItem(item), []);
  const closeModal = useCallback(() => setActiveItem(null), []);

  if (loading) {
    return (
      <section className="py-8 md:py-12 bg-[#04122b]">
        <div className="container mx-auto px-4">
          <div className="mb-6 md:mb-10">
            <div className="h-3 w-24 bg-white/10 rounded animate-pulse mb-3" />
            <div className="h-8 w-56 bg-white/10 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4 lg:gap-6">
            <div className="aspect-video rounded-lg bg-white/5 animate-pulse" />
            <div className="flex flex-col gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-3 p-2">
                  <div className="w-24 aspect-video rounded bg-white/5 animate-pulse shrink-0" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-3 bg-white/5 rounded w-full animate-pulse" />
                    <div className="h-3 bg-white/5 rounded w-2/3 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!items.length || !featured) return null;

  return (
    <>
      <section className="relative py-8 md:py-12 bg-[#04122b] overflow-hidden">
        <div
          className="pointer-events-none absolute -top-24 right-0 w-[36rem] h-[36rem] rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #2f6fed 0%, transparent 70%)' }}
        />
        <div className="relative container mx-auto px-4">
          <div className="flex items-end justify-between mb-6 md:mb-10">
            <div>
              <span className="text-xs sm:text-sm font-medium text-amber-400/90 tracking-widest uppercase mb-2 sm:mb-3 block">
                {t('videoGallery.subtitle')}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                {t('videoGallery.title')}
              </h2>
            </div>
            <Link
              to={VIDEO_GALLERY_PATH}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white/60 hover:text-white hover:border-white/40 rounded-full text-sm font-medium"
              style={{ transition: 'color 0.5s ease, border-color 0.5s ease' }}
            >
              {t('videoGallery.viewAll')}
              <ArrowIcon />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4 lg:gap-6">
            <FeaturedReel
              item={featured}
              language={language}
              label={t('videoGallery.featured')}
              watchLabel={t('videoGallery.watch')}
              onClick={() => openModal(featured)}
            />

            {rest.length > 0 && (
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0 lg:border-l lg:border-white/10 lg:pl-4">
                {rest.slice(0, 6).map((item) => (
                  <RailItem
                    key={item.id}
                    item={item}
                    language={language}
                    watchLabel={t('videoGallery.watch')}
                    onClick={() => openModal(item)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Link
              to={VIDEO_GALLERY_PATH}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#04122b] rounded-full text-sm font-medium hover:bg-gray-100"
              style={{ transition: 'background-color 0.5s ease' }}
            >
              {t('videoGallery.viewAll')}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {activeItem && (
        <VideoModal
          item={activeItem}
          openLinkLabel={t('videoGallery.openLink')}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default VideoGallerySection;
