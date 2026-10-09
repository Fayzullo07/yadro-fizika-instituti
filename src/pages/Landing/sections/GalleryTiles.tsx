import { Link } from 'react-router-dom';
import { useGalleries } from '@/hooks/useGalleries';
import { useLanguage } from '@/contexts/LanguageContext';
import { GALLERY_PATH } from '@/routes/path';
import SectionHeader from './SectionHeader';

const GalleryTiles: React.FC = () => {
  const { t } = useLanguage();
  const { data, loading } = useGalleries({ per_page: 6 });
  const items = data?.data ?? [];

  if (!loading && !items.length) return null;

  return (
    <section className="flex flex-col gap-[var(--space-8)] bg-[var(--color-neutral-50)] px-[var(--space-6)] py-[var(--space-16)] lg:p-[var(--space-24)]">
      <SectionHeader
        title={t('landing.gallery.title')}
        to={GALLERY_PATH}
        viewAllLabel={t('landing.viewAll')}
      />
      <div className="grid grid-cols-1 gap-[var(--space-8)] sm:grid-cols-2 lg:grid-cols-3">
        {loading && !items.length
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-[240px] animate-pulse rounded-[var(--radius-lg)] bg-[var(--color-neutral-100)]"
              />
            ))
          : items.slice(0, 6).map((item) => (
              <Link
                key={item.id}
                to={`${GALLERY_PATH}/${item.id}`}
                className="group relative block h-[240px] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-neutral-100)]"
              >
                <img
                  src={item.image}
                  alt={item.title ?? ''}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
            ))}
      </div>
    </section>
  );
};

export default GalleryTiles;
