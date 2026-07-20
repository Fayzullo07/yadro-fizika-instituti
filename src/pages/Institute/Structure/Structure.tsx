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
      <article>
        {(loading || (imageUrl && !imageLoaded)) && (
          <div className="w-full aspect-4/3 bg-gray-100 animate-pulse rounded" />
        )}
        {!loading && (error || !imageUrl) && null}
        {!loading && imageUrl && (
          <RetryImage
            src={imageUrl}
            alt={t('nav.institut.structure')}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-auto ${imageLoaded ? '' : 'hidden'}`}
          />
        )}
      </article>
    </div>
  );
};

export default Structure;
