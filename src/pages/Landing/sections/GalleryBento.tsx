import { Link } from 'react-router-dom';
import { useGalleries } from '@/hooks/useGalleries';
import { useLanguage } from '@/contexts/LanguageContext';
import { GALLERY_PATH } from '@/routes/path';
import { CONTAINER, SECTION_PAD } from './layout';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const GalleryBento: React.FC = () => {
  const { t } = useLanguage();
  const { data, loading } = useGalleries({ per_page: 5 });
  const items = (data?.data ?? []).slice(0, 5);

  if (!loading && !items.length) return null;

  return (
    <section className={`bg-[var(--color-neutral-50)] ${SECTION_PAD}`}>
      <div className={`${CONTAINER} flex flex-col gap-[var(--space-12)]`}>
        <SectionHeader
          eyebrow={t('gallery.subtitle')}
          title={t('gallery.title')}
          to={GALLERY_PATH}
          viewAllLabel={t('gallery.viewAll')}
        />
        <div className="grid auto-rows-[180px] grid-cols-2 gap-[var(--space-4)] md:auto-rows-[240px] lg:grid-cols-4">
          {loading && !items.length
            ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`animate-pulse rounded-[var(--radius-lg)] bg-[var(--color-neutral-100)] ${
                    i === 0 ? 'col-span-2 row-span-2' : ''
                  }`}
                />
              ))
            : items.map((item, i) => (
                <Reveal
                  key={item.id}
                  delay={i * 90}
                  className={i === 0 ? 'col-span-2 row-span-2' : ''}
                >
                  <Link
                    to={`${GALLERY_PATH}/${item.id}`}
                    className="group relative block size-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-neutral-100)]"
                  >
                    <img
                      src={item.image}
                      alt={item.title ?? ''}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-110"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-[rgba(10,19,48,0.85)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    {item.title && (
                      <span className="absolute inset-x-0 bottom-0 translate-y-3 p-[var(--space-4)] text-[16px] font-semibold leading-6 text-[var(--color-neutral-0)] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        {item.title}
                      </span>
                    )}
                  </Link>
                </Reveal>
              ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryBento;
