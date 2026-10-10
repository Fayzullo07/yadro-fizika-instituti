import { useLanguage } from '@/contexts/LanguageContext';
import { useUniqueObjects } from '@/hooks/useDepartment';
import Loading from '@/components/shared/Loading/Loading';
import { Link } from 'react-router-dom';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import Reveal from '@/pages/Landing/sections/Reveal';
import { UNIQUE_OBJECTS_PATH } from '@/routes/path';

const UniqueObjects: React.FC = () => {
  const { t } = useLanguage();
  const { data, loading, error } = useUniqueObjects();

  const items = data?.data ?? [];

  return (
    <div className="pb-10">
      <PageTitle>{t('nav.laboratoriyalar.uniqueObjects') || 'Noyob obyektlar'}</PageTitle>

      {loading && <Loading />}
      {error && (
        <p className="text-center py-16 text-[var(--color-neutral-500)]">{t('common.error')}</p>
      )}
      {!loading && !error && items.length === 0 && (
        <p className="text-center py-16 text-[var(--color-neutral-500)]">
          {t('common.notAvailable')}
        </p>
      )}
      {!loading && !error && items.length > 0 && (
        <div className="grid grid-cols-1 gap-[var(--space-4)] md:grid-cols-2 md:gap-[var(--space-6)]">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={Math.min(index, 5) * 60}>
              <Link
                to={`${UNIQUE_OBJECTS_PATH}/${item.id}`}
                className="group flex h-full items-center gap-[var(--space-6)] rounded-[var(--radius-lg)] bg-gradient-to-br from-[var(--color-brand-700)] to-[var(--color-brand-950)] p-6 text-[var(--color-neutral-0)] shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8"
              >
                <span className="shrink-0 select-none text-5xl font-extrabold leading-none text-[var(--color-accent-500)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100 sm:text-6xl">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="flex min-w-0 flex-col gap-[var(--space-3)]">
                  <h3 className="text-lg font-bold leading-snug text-[var(--color-neutral-0)] sm:text-xl">
                    {item.name}
                  </h3>
                  <span className="text-sm font-semibold text-[var(--color-accent-500)]">
                    {t('news.detail')} →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
};

export default UniqueObjects;
