import { useState } from 'react';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import { useLanguage } from '@/contexts/LanguageContext';
import { useStructure } from '@/hooks/useStructure';
import RetryImage from '@/components/shared/RetryImage/RetryImage';

const Structure: React.FC = () => {
  const { t } = useLanguage();
  const { data, loading, error } = useStructure();
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageUrl = data?.data?.image;

  return (
    <div className="min-h-screen">
      <PageTitle>{t('nav.institut.structure') || 'Institut tuzilmasi'}</PageTitle>
      <article className="relative">
        {(loading || (imageUrl && !imageLoaded)) && (
          <div className="w-full aspect-4/3 bg-gray-100 animate-pulse rounded absolute inset-0" />
        )}
        {!loading && (error || !imageUrl) && null}
        {!loading && imageUrl && (
          <RetryImage
            src={imageUrl}
            alt={t('nav.institut.structure')}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-auto transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
      </article>
    </div>
  );
};

export default Structure;
