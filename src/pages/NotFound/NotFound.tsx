import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { HOME_PATH } from '@/routes/path';

const NotFound: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-8xl font-bold text-gray-300 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">{t('notFound.title')}</h2>
      <p className="text-gray-500 mb-8 max-w-md">{t('notFound.description')}</p>
      <Link
        to={HOME_PATH}
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"
          />
        </svg>
        {t('notFound.backHome')}
      </Link>
    </div>
  );
};

export default NotFound;
