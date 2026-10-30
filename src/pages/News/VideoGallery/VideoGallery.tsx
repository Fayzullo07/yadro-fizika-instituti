import { useState, useCallback, useEffect, useRef } from 'react';
import { useVideoGallery } from '@/hooks/useVideoGallery';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatDate } from '@/utils/dateUtils';
import Loading from '@/components/shared/Loading/Loading';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import Reveal from '@/pages/Landing/sections/Reveal';
import RetryImage from '@/components/shared/RetryImage/RetryImage';
import type { VideoGalleryItem } from '@/types';

const PER_PAGE = 12;

const getYouTubeId = (url: string): string | null =>
  url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/))([^?&/#]+)/
  )?.[1] ?? null;

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

const PlayButton: React.FC<{ size: string }> = ({ size }) => (
  <span
    aria-hidden
    className={`flex ${size} items-center justify-center rounded-[var(--radius-full)] bg-[var(--color-accent-500)] text-[var(--color-brand-950)] shadow-lg transition-transform duration-500 ${EASE} group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
  >
    <svg viewBox="0 0 24 24" className="size-1/2 translate-x-[8%]" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  </span>
);

const VideoModal: React.FC<{ item: VideoGalleryItem; onClose: () => void }> = ({
  item,
  onClose,
}) => {
  const ytId = getYouTubeId(item.url);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-3 sm:p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[var(--color-neutral-0)]/70 hover:text-[var(--color-neutral-0)] p-2 rounded-full bg-[var(--color-neutral-0)]/10 hover:bg-[var(--color-neutral-0)]/20 transition-colors z-10"
        onClick={onClose}
      >
        <CloseIcon />
      </button>

      <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        {ytId ? (
          <div className="relative w-full aspect-video rounded-[var(--radius-md)] overflow-hidden shadow-2xl">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${ytId}?rel=0&modestbranding=1&autoplay=1`}
              title={item.title}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        ) : (
          <div className="bg-[var(--color-neutral-900)] rounded-[var(--radius-md)] p-6 sm:p-8 text-center">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-brand-600)] hover:bg-[var(--color-brand-700)] text-[var(--color-neutral-0)] rounded-[var(--radius-md)] transition-colors"
            >
              {item.title}
            </a>
          </div>
        )}
        <p className="mt-3 text-[var(--color-neutral-0)]/70 text-xs sm:text-sm text-center line-clamp-2">
          {item.title}
        </p>
      </div>
    </div>
  );
};

const VideoThumb: React.FC<{ item: VideoGalleryItem; quality: string }> = ({ item, quality }) => {
  const ytId = getYouTubeId(item.url);
  const thumb = ytId ? `https://img.youtube.com/vi/${ytId}/${quality}.jpg` : null;
  const [loaded, setLoaded] = useState(false);

  if (!thumb) return null;
  return (
    <>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-[var(--color-neutral-100)]" />}
      <RetryImage
        src={thumb}
        alt=""
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 size-full object-cover transition-[transform,opacity] duration-[900ms] ${EASE} will-change-transform group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </>
  );
};

const FeaturedVideo: React.FC<{
  item: VideoGalleryItem;
  language: string;
  label: string;
  onClick: () => void;
}> = ({ item, language, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`group relative isolate grid w-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-brand-950)] text-left shadow-[var(--shadow-card)] focus:outline-none lg:grid-cols-[1.55fr_1fr]`}
  >
    <span
      aria-hidden
      className="pointer-events-none absolute -bottom-32 -right-24 -z-10 size-[380px] rounded-[var(--radius-full)] bg-[var(--color-brand-600)] opacity-50 blur-[110px]"
    />
    <span className="relative block aspect-video w-full overflow-hidden lg:aspect-auto lg:min-h-[340px]">
      <VideoThumb item={item} quality="hqdefault" />
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[rgba(10,19,48,0.5)] to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[rgba(10,19,48,0.6)]"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="relative">
          <span className="st-ping absolute inset-0 rounded-[var(--radius-full)] border-2 border-[var(--color-accent-500)]" />
          <PlayButton size="size-16 md:size-20" />
        </span>
      </span>
    </span>
    <span className="flex flex-col justify-center gap-[var(--space-3)] p-[var(--space-6)] md:p-[var(--space-8)]">
      <span className="flex items-center gap-[var(--space-3)] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent-500)]">
        <span className="h-[3px] w-8 rounded-[var(--radius-full)] bg-[var(--color-accent-500)]" />
        {label}
      </span>
      <span className="line-clamp-4 text-[22px] font-bold leading-8 text-[var(--color-neutral-0)] md:text-[26px] md:leading-9">
        {item.title}
      </span>
      <span className="text-[14px] text-[var(--color-neutral-300)]">
        {formatDate(item.created_at, language)}
      </span>
    </span>
  </button>
);

const VideoCard: React.FC<{
  item: VideoGalleryItem;
  language: string;
  onClick: () => void;
}> = ({ item, language, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`group flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] text-left shadow-[var(--shadow-card)] transition-all duration-500 ${EASE} hover:-translate-y-1 hover:shadow-lg focus:outline-none motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
  >
    <span className="relative block aspect-video w-full overflow-hidden bg-[var(--color-neutral-100)]">
      <VideoThumb item={item} quality="mqdefault" />
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[rgba(10,19,48,0.55)] via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="scale-90 opacity-90 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100">
          <PlayButton size="size-12" />
        </span>
      </span>
    </span>
    <span className="flex flex-1 flex-col gap-[var(--space-2)] p-[var(--space-4)]">
      <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--color-accent-600)]">
        {formatDate(item.created_at, language)}
      </span>
      <span className="line-clamp-2 text-[16px] font-semibold leading-6 text-[var(--color-neutral-900)] transition-colors duration-500 group-hover:text-[var(--color-brand-700)]">
        {item.title}
      </span>
    </span>
  </button>
);

const VideoGallery: React.FC = () => {
  const { t, language } = useLanguage();
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<VideoGalleryItem[]>([]);
  const [activeItem, setActiveItem] = useState<VideoGalleryItem | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const prevLanguageRef = useRef(language);

  const { data, loading, error } = useVideoGallery({ page, per_page: PER_PAGE });
  const [prevData, setPrevData] = useState(data);

  const lastPage = data?.meta?.last_page ?? 1;
  const hasMore = page < lastPage;

  useEffect(() => {
    if (prevLanguageRef.current !== language) {
      prevLanguageRef.current = language;
      setPage(1);
      setItems([]);
    }
  }, [language]);

  // Accumulate each new page's items as `data` arrives, adjusting state
  // during render instead of an effect + setState round trip.
  if (data !== prevData) {
    setPrevData(data);
    if (data?.data) {
      setItems((prev) => (data.meta.current_page === 1 ? data.data : [...prev, ...data.data]));
    }
  }

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  const openModal = useCallback((item: VideoGalleryItem) => setActiveItem(item), []);
  const closeModal = useCallback(() => setActiveItem(null), []);

  const label = t('nav.media.videoGallery');

  return (
    <div className="pb-10">
      <PageTitle>{label}</PageTitle>

      {error && (
        <p className="text-center py-16 text-[var(--color-neutral-500)]">{t('common.error')}</p>
      )}
      {!loading && !error && items.length === 0 && (
        <p className="text-center py-16 text-[var(--color-neutral-500)]">
          {t('common.notAvailable')}
        </p>
      )}

      {items.length > 0 && (
        <div className="flex flex-col gap-[var(--space-10)] pt-[var(--space-6)]">
          <Reveal>
            <FeaturedVideo
              item={items[0]}
              language={language}
              label={t('landing.video.now')}
              onClick={() => openModal(items[0])}
            />
          </Reveal>
          {items.length > 1 && (
            <div className="grid grid-cols-1 gap-[var(--space-6)] sm:grid-cols-2 lg:grid-cols-3">
              {items.slice(1).map((item, i) => (
                <Reveal key={item.id} delay={(i % 3) * 80}>
                  <VideoCard item={item} language={language} onClick={() => openModal(item)} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      )}

      {loading && items.length === 0 && <Loading />}

      <div ref={sentinelRef} className="h-1" />
      {loading && items.length > 0 && (
        <div className="flex justify-center py-6">
          <div className="w-6 h-6 border-2 border-[var(--color-brand-700)] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {activeItem && <VideoModal item={activeItem} onClose={closeModal} />}
    </div>
  );
};

export default VideoGallery;
