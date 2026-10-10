import { useEffect, useState } from 'react';
import { useVideoGallery } from '@/hooks/useVideoGallery';
import { useLanguage } from '@/contexts/LanguageContext';
import { VIDEO_GALLERY_PATH } from '@/routes/path';
import type { VideoGalleryItem } from '@/types';
import { CONTAINER, SECTION_PAD } from './layout';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const getYouTubeId = (url: string): string | null =>
  url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/))([^?&/#]+)/
  )?.[1] ?? null;

const thumbOf = (item: VideoGalleryItem, quality: 'hqdefault' | 'mqdefault') => {
  const id = getYouTubeId(item.url);
  return id ? `https://img.youtube.com/vi/${id}/${quality}.jpg` : undefined;
};

const PlayButton: React.FC<{ size: string }> = ({ size }) => (
  <span
    aria-hidden
    className={`flex ${size} items-center justify-center rounded-[var(--radius-full)] bg-[var(--color-accent-500)] text-[var(--color-brand-950)] shadow-lg transition-transform duration-300 group-hover:scale-110`}
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
  const id = getYouTubeId(item.url);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-[var(--space-4)]"
      onClick={onClose}
    >
      <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        {id ? (
          <div className="relative aspect-video overflow-hidden rounded-[var(--radius-lg)] shadow-2xl">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
              title={item.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 size-full border-0"
            />
          </div>
        ) : (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-[var(--radius-lg)] bg-[var(--color-brand-900)] p-[var(--space-8)] text-center text-[var(--color-neutral-0)]"
          >
            {item.title} →
          </a>
        )}
        <p className="mt-[var(--space-3)] text-center text-[14px] text-[var(--color-neutral-300)]">
          {item.title}
        </p>
      </div>
    </div>
  );
};

const VideoCinema: React.FC = () => {
  const { t } = useLanguage();
  const { data, loading } = useVideoGallery({ per_page: 4 });
  const [active, setActive] = useState<VideoGalleryItem | null>(null);
  const items = (data?.data ?? []).slice(0, 4);

  if (!loading && !items.length) return null;

  const [lead, ...rest] = items;

  return (
    <section className={`bg-[var(--color-brand-950)] ${SECTION_PAD}`}>
      <div className={`${CONTAINER} flex flex-col gap-[var(--space-12)]`}>
        <SectionHeader
          dark
          eyebrow={t('videoGallery.subtitle')}
          title={t('videoGallery.title')}
          to={VIDEO_GALLERY_PATH}
          viewAllLabel={t('videoGallery.viewAll')}
        />

        {loading && !lead ? (
          <div className="aspect-video animate-pulse rounded-[var(--radius-lg)] bg-white/10" />
        ) : (
          <div className="grid gap-[var(--space-6)] lg:grid-cols-3">
            {lead && (
              <Reveal className="lg:col-span-2">
                <button
                  type="button"
                  onClick={() => setActive(lead)}
                  className="group relative block aspect-video w-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-brand-900)] text-left"
                >
                  {thumbOf(lead, 'hqdefault') && (
                    <img
                      src={thumbOf(lead, 'hqdefault')}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 size-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-105"
                    />
                  )}
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[rgba(10,19,48,0.9)] via-[rgba(10,19,48,0.15)] to-transparent"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <PlayButton size="size-20" />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 p-[var(--space-6)] text-[18px] font-bold leading-7 text-[var(--color-neutral-0)] md:text-[22px]">
                    <span className="mb-[var(--space-1)] block text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent-500)]">
                      {t('landing.video.now')}
                    </span>
                    <span className="line-clamp-2">{lead.title}</span>
                  </span>
                </button>
              </Reveal>
            )}

            <div className="flex flex-col gap-[var(--space-4)]">
              {rest.map((item, i) => (
                <Reveal key={item.id} delay={(i + 1) * 120}>
                  <button
                    type="button"
                    onClick={() => setActive(item)}
                    className="group flex w-full items-center gap-[var(--space-4)] rounded-[var(--radius-lg)] bg-[var(--color-brand-900)] p-[var(--space-3)] text-left transition-colors duration-300 hover:bg-[var(--color-brand-700)]"
                  >
                    <span className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-brand-950)]">
                      {thumbOf(item, 'mqdefault') && (
                        <img
                          src={thumbOf(item, 'mqdefault')}
                          alt=""
                          loading="lazy"
                          className="size-full object-cover"
                        />
                      )}
                      <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                        <PlayButton size="size-8" />
                      </span>
                    </span>
                    <span className="line-clamp-3 text-[14px] font-semibold leading-5 text-[var(--color-neutral-0)]">
                      {item.title}
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>

      {active && <VideoModal item={active} onClose={() => setActive(null)} />}
    </section>
  );
};

export default VideoCinema;
