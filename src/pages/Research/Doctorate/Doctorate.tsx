import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDissertations } from '@/hooks/usePublications';
import Loading from '@/components/shared/Loading/Loading';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import Pagination from '@/components/shared/Pagination';
import PublicationCards from '@/components/shared/PublicationCards/PublicationCards';
import { DOCTORATE_PATH } from '@/routes/path';

const PER_PAGE = 10;

const Doctorate: React.FC = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { data, loading, error } = useDissertations({ page, per_page: PER_PAGE });
  const items = data?.data ?? [];
  const lastPage = data?.meta?.last_page ?? 1;

  const handlePageChange = (p: number) => {
    setSearchParams({ page: String(p) });
    window.scrollTo(0, 0);
  };

  return (
    <div
      className={`pb-10 transition-opacity duration-200 ${loading && items.length > 0 ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}
    >
      <PageTitle>{t('nav.laboratoriyalar.disertatsiya') || 'Dissertatsiyalar'}</PageTitle>

      {loading && items.length === 0 && <Loading />}
      {error && (
        <p className="text-center py-16 text-[var(--color-neutral-500)]">{t('common.error')}</p>
      )}
      {!loading && !error && items.length === 0 && (
        <p className="text-center py-16 text-[var(--color-neutral-500)]">
          {t('common.notAvailable')}
        </p>
      )}
      {items.length > 0 && (
        <>
          <PublicationCards
            items={items}
            basePath={DOCTORATE_PATH}
            startIndex={(page - 1) * PER_PAGE}
            pageKey={page}
          />
          <Pagination page={page} lastPage={lastPage} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
};

export default Doctorate;
