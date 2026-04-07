import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useNews } from '@/hooks/useNews';
import { useLanguage } from '@/contexts/LanguageContext';
import type { NewsItem } from '@/types';
import NewsCard from './NewsCard';
import NewsSkeleton from './NewsSkeleton';

const ArrowIcon: React.FC = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

const NewsSection: React.FC = () => {
  const { data, loading, error } = useNews({ per_page: 4 });
  const { t } = useLanguage();
  const news: NewsItem[] = data?.results || [];

  if (loading) return <NewsSkeleton />;
  if (error || !news.length) return null;

  const showViewAll = (data?.count ?? 0) > 4;

  return (
    <section className="py-16 md:py-24 bg-linear-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-sm font-medium text-gray-400 tracking-widest uppercase mb-3 block">
              {t('news.subtitle') || "So'nggi yangiliklar"}
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              {t('news.title') || 'Yangiliklar'}
            </h2>
          </div>
          {showViewAll && (
            <Link
              to="/news"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-500 hover:text-gray-900 hover:border-gray-400 rounded-full text-sm font-medium"
              style={{ transition: 'color 0.5s ease, border-color 0.5s ease' }}
            >
              {t('news.viewAll') || 'Barchasi'}
              <ArrowIcon />
            </Link>
          )}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {news.map((item) => (
            <div key={item.id}>
              <NewsCard item={item} />
            </div>
          ))}
        </div>

        {/* Mobile view all */}
        {showViewAll && (
          <div className="text-center mt-10 md:hidden">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800"
              style={{ transition: 'background-color 0.5s ease' }}
            >
              {t('news.viewAll') || 'Barchasi'}
              <ArrowIcon />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(NewsSection);
