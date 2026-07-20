import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEventById } from '@/hooks/useEvents';
import { formatDate } from '@/utils/dateUtils';
import Loading from '@/components/shared/Loading/Loading';
import BackButton from '@/components/shared/BackButton/BackButton';
import RetryImage from '@/components/shared/RetryImage/RetryImage';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { data: detailRes, loading, error } = useEventById(id!);
  const [imageLoaded, setImageLoaded] = useState(false);

  const item = detailRes?.data;

  if (loading) return <Loading />;

  if (error || !item) {
    return (
      <div className="text-center py-16 sm:py-20">
        <p className="text-gray-500 mb-4 text-sm sm:text-base">{t('common.error')}</p>
        <Link
          to="/news/events"
          className="text-[#013d8c] hover:underline font-medium text-sm sm:text-base"
        >
          ← {t('backToList')}
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <BackButton to="/news/events" label={t('backToList')} />

      <article className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {item.image && (
          <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
            {!imageLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
            <RetryImage
              src={item.image}
              alt=""
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
        )}

        <div className="px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <svg
              className="w-4 h-4 text-[#013d8c]/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-gray-400 text-xs sm:text-sm">
              {formatDate(item.created_at, language)}
            </span>
          </div>
          <h1 className="text-gray-900 text-base sm:text-xl md:text-2xl font-bold leading-snug">
            {item.title}
          </h1>
        </div>
      </article>
    </div>
  );
};

export default EventDetail;
