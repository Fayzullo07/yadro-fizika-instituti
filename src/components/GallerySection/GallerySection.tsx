import { Link } from 'react-router-dom';
import { useGalleries } from '@/hooks/useGalleries';
import { useLanguage } from '@/contexts/LanguageContext';
import { GALLERY_PATH } from '@/routes/path';

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

const GallerySection: React.FC = () => {
  const { t } = useLanguage();
  const { data, loading } = useGalleries({ per_page: 9 });

  const items = data?.data ?? [];

  if (loading) {
    return (
      <section className="py-8 md:py-12 bg-linear-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <div className="h-3 w-24 bg-gray-200 rounded animate-pulse mb-3" />
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 auto-rows-[130px] sm:auto-rows-[160px] md:auto-rows-[200px]">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className={`bg-gray-100 rounded-none animate-pulse ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!items.length) return null;

  return (
    <>
      <section className="py-8 md:py-12 bg-linear-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-6 md:mb-10">
            <div>
              <span className="text-xs sm:text-sm font-medium text-gray-400 tracking-widest uppercase mb-2 sm:mb-3 block">
                {t('gallery.subtitle')}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                {t('gallery.title')}
              </h2>
            </div>
            <Link
              to={GALLERY_PATH}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-500 hover:text-gray-900 hover:border-gray-400 rounded-full text-sm font-medium"
              style={{ transition: 'color 0.5s ease, border-color 0.5s ease' }}
            >
              {t('gallery.viewAll') || 'Barcha rasmlar'}
              <ArrowIcon />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 auto-rows-[130px] sm:auto-rows-[160px] md:auto-rows-[200px]">
            {items.slice(0, 9).map((item, i) => (
              <Link
                key={item.id}
                to={`/news/gallery/${item.id}`}
                className={`group relative overflow-hidden rounded-none ${
                  i === 0 ? 'col-span-2 row-span-2' : ''
                }`}
              >
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
              </Link>
            ))}
          </div>
          <div className="text-center mt-10 md:hidden">
            <Link
              to={GALLERY_PATH}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800"
              style={{ transition: 'background-color 0.5s ease' }}
            >
              {t('gallery.viewAll') || 'Barcha rasmlar'}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default GallerySection;
