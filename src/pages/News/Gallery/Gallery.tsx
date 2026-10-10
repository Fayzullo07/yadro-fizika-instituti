import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGalleries } from '@/hooks/useGalleries';
import { useLanguage } from '@/contexts/LanguageContext';
import Loading from '@/components/shared/Loading/Loading';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import RetryImage from '@/components/shared/RetryImage/RetryImage';
import { formatDate } from '@/utils/dateUtils';
import Reveal from '@/pages/Landing/sections/Reveal';
import type { GalleryItem, Language } from '@/types';

const PER_PAGE = 12;

const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)]';

const NEW_ALBUM_LABEL: Record<Language, string> = {
  uz: 'Yangi albom',
  ru: 'Новый альбом',
  en: 'New album',
};

const VIEW_LABEL: Record<Language, string> = {
  uz: "Ko'rish",
  ru: 'Смотреть',
  en: 'View',
};

const GalleryCard: React.FC<{
  item: GalleryItem;
  language: string;
}> = ({ item, language }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link to={`/news/gallery/${item.id}`} className="group flex flex-col gap-[var(--space-3)]">
      <div className="relative h-[200px] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-neutral-100)]">
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-[var(--color-neutral-100)]" />
        )}
        <RetryImage
          src={item.image}
          alt=""
          onLoad={() => setLoaded(true)}
          className={`size-full object-cover transition-[transform,opacity] duration-[900ms] ${EASE} will-change-transform group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
      <div className="flex flex-col gap-[var(--space-1)]">
        <h3 className="line-clamp-2 text-[16px] font-semibold leading-6 text-[var(--color-neutral-900)] transition-colors duration-500 group-hover:text-[var(--color-brand-700)]">
          {item.title || '-'}
        </h3>
        <span className="text-[13px] text-[var(--color-neutral-500)]">
          {formatDate(item.created_at, language)}
        </span>
      </div>
    </Link>
  );
};

const FeaturedAlbum: React.FC<{ item: GalleryItem; language: Language }> = ({ item, language }) => (
  <div className="relative isolate grid items-center gap-[var(--space-8)] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-brand-950)] p-[var(--space-6)] md:p-[var(--space-8)] lg:grid-cols-[1.3fr_1fr]">
    <span
      aria-hidden
      className="pointer-events-none absolute -right-24 -top-24 -z-10 size-[420px] rounded-[var(--radius-full)] bg-[var(--color-accent-500)] opacity-20 blur-[120px]"
    />
    <Link
      to={`/news/gallery/${item.id}`}
      className="group relative block aspect-video overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-brand-900)]"
    >
      <RetryImage
        src={item.image}
        alt={item.title ?? ''}
        className={`size-full object-cover transition-transform duration-[900ms] ${EASE} will-change-transform group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
      />
    </Link>
    <div className="flex flex-col items-start gap-[var(--space-4)]">
      <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent-500)]">
        {NEW_ALBUM_LABEL[language] ?? NEW_ALBUM_LABEL.uz} · {formatDate(item.created_at, language)}
      </span>
      <h2 className="line-clamp-4 text-[24px] font-bold leading-8 text-[var(--color-neutral-0)] md:text-[32px] md:leading-10">
        {item.title}
      </h2>
      <Link
        to={`/news/gallery/${item.id}`}
        className={`inline-flex items-center gap-[var(--space-2)] rounded-[var(--radius-md)] bg-[var(--color-accent-500)] px-[var(--space-6)] py-[var(--space-3)] text-[15px] font-semibold text-[var(--color-brand-950)] transition-[transform,background-color] duration-500 ${EASE} hover:-translate-y-0.5 hover:bg-[var(--color-accent-600)] motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
      >
        {VIEW_LABEL[language] ?? VIEW_LABEL.uz}
        <span aria-hidden>→</span>
      </Link>
    </div>
  </div>
);

const Gallery: React.FC = () => {
  const { t, language } = useLanguage();
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const prevLanguageRef = useRef(language);

  const { data, loading, error } = useGalleries({ page, per_page: PER_PAGE });
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

  return (
    <div className="pb-10">
      <PageTitle>{t('gallery.title')}</PageTitle>

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
            <FeaturedAlbum item={items[0]} language={language as Language} />
          </Reveal>
          {items.length > 1 && (
            <div className="grid grid-cols-1 gap-x-[var(--space-5)] gap-y-[var(--space-8)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.slice(1).map((item, i) => (
                <Reveal key={item.id} delay={(i % 4) * 80}>
                  <GalleryCard item={item} language={language} />
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
    </div>
  );
};

export default Gallery;
