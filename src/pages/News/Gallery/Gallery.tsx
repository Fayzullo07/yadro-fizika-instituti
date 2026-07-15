import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGalleries } from '@/hooks/useGalleries';
import { useLanguage } from '@/contexts/LanguageContext';
import Loading from '@/components/shared/Loading/Loading';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import type { GalleryItem } from '@/types';

const PER_PAGE = 12;

const GalleryCard: React.FC<{
  item: GalleryItem;
  label: string;
}> = ({ item, label }) => (
  <Link
    to={`/news/gallery/${item.id}`}
    className="group text-left bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
  >
    <div className="relative overflow-hidden aspect-video">
      <img src={item.image} alt="" className="w-full h-full object-cover gallery-card-img" />
    </div>
    <div className="p-3 sm:p-4 flex flex-col gap-1.5 sm:gap-2">
      <div className="flex items-center justify-between mt-auto pt-1">
        <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">
          {label ? label : '-'}
        </span>
        <span className="text-gray-400 group-hover:text-gray-700 transition-colors text-base leading-none">
          →
        </span>
      </div>
    </div>
  </Link>
);

const Gallery: React.FC = () => {
  const { t, language } = useLanguage();
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const prevLanguageRef = useRef(language);

  const { data, loading, error } = useGalleries({ page, per_page: PER_PAGE });

  const lastPage = data?.meta?.last_page ?? 1;
  const hasMore = page < lastPage;

  useEffect(() => {
    if (prevLanguageRef.current !== language) {
      prevLanguageRef.current = language;
      setPage(1);
      setItems([]);
    }
  }, [language]);

  useEffect(() => {
    if (!data?.data) return;
    setItems((prev) => (page === 1 ? data.data : [...prev, ...data.data]));
  }, [data]);

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

  return (
    <div className="pb-10">
      <PageTitle>{t('gallery.title')}</PageTitle>

      {error && <p className="text-center py-16 text-gray-500">{t('common.error')}</p>}
      {!loading && !error && items.length === 0 && (
        <p className="text-center py-16 text-gray-500">{t('common.notAvailable')}</p>
      )}

      {items.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
          {items.map((item) => (
            <GalleryCard key={item.id} item={item} label={item.title} />
          ))}
        </div>
      )}

      {loading && items.length === 0 && <Loading />}

      <div ref={sentinelRef} className="h-1" />
      {loading && items.length > 0 && (
        <div className="flex justify-center py-6">
          <div className="w-6 h-6 border-2 border-[#013d8c] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default Gallery;
