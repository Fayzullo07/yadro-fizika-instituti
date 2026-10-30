import type { VideoGalleryItem } from '@/types';

export const getYouTubeId = (url: string): string | null =>
  url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/))([^?&/#]+)/
  )?.[1] ?? null;

export const thumbOf = (item: VideoGalleryItem, quality: 'hqdefault' | 'mqdefault') => {
  const id = getYouTubeId(item.url);
  return id ? `https://img.youtube.com/vi/${id}/${quality}.jpg` : undefined;
};
