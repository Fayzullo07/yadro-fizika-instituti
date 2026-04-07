import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApi } from '@/hooks/useApi';
import { generalApi } from '@/services/api';
import { stripHtmlRegex, stripHtmlAndDecode } from '@/utils/htmlUtils';
import { ABOUT_PATH } from '@/routes/path';
import type { AboutData } from '@/types';

const AboutSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { data, loading, error } = useApi<AboutData>(
    () => generalApi.getAbout(language),
    [language]
  );

  if (loading) return <AboutSkeleton />;
  if (error || !data) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <div>
            <span className="text-sm font-medium text-gray-400 tracking-widest uppercase mb-3 block">
              {t('about.sectionSubtitle')}
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              {data.title || t('about.heroTitle')}
            </h2>

            {(data.content || data.description) && (
              <p className="text-gray-500 leading-relaxed text-sm md:text-base line-clamp-4 md:line-clamp-6 mb-6 md:mb-8">
                {stripHtmlAndDecode(data.content || data.description)}
              </p>
            )}

            <Link
              to={ABOUT_PATH}
              className="inline-flex items-center gap-2 px-5 md:px-7 py-3 md:py-3.5 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 text-xs md:text-sm"
              style={{ transition: 'background-color 0.5s ease' }}
            >
              {t('about.sectionReadMore')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {/* Right — Image */}
          {data.image && (
            <div className="relative">
              <img
                src={data.image}
                alt={stripHtmlRegex(data.title)}
                loading="lazy"
                className="w-full h-56 md:h-80 lg:h-112 object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-(--primary-blue)"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const AboutSkeleton: React.FC = () => (
  <section className="py-16 md:py-24 bg-white">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <div className="h-4 w-28 bg-gray-200 rounded animate-pulse mb-3"></div>
          <div className="h-9 w-64 bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="space-y-3 mb-8">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
          </div>
          <div className="h-12 w-40 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        <div className="h-56 md:h-80 lg:h-112 bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  </section>
);

export default AboutSection;
