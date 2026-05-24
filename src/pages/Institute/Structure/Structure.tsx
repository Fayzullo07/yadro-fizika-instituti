import PageTitle from '@/components/shared/PageTitle/PageTitle';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStructure } from '@/hooks/useStructure';

const Structure: React.FC = () => {
  const { t } = useLanguage();
  const { data, loading, error } = useStructure();

  const imageUrl = data?.data?.image;

  return (
    <div className="min-h-screen">
      <PageTitle>{t('nav.institut.structure') || 'Institut tuzilmasi'}</PageTitle>
      <article>
        {loading && <div className="w-full aspect-4/3 bg-gray-100 animate-pulse rounded" />}
        {!loading && (error || !imageUrl) && null}
        {!loading && imageUrl && (
          <img src={imageUrl} alt="Institut tuzilmasi" loading="lazy" className="w-full h-auto" />
        )}
      </article>
    </div>
  );
};

export default Structure;
