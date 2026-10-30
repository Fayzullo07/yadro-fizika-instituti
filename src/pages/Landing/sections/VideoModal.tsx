import { useEffect } from 'react';
import type { VideoGalleryItem } from '@/types';
import { getYouTubeId } from './videoUtils';

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

export default VideoModal;
