import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const BackButton = ({ to, label, className = '' }) => {
  const { t } = useLanguage();

  return (
    <Link
      to={to}
      className={`inline-flex items-center text-blue-600 hover:text-blue-800 font-medium my-3 transition-colors ${className}`}
    >
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      {label || t('news.backToList') || 'Orqaga qaytish'}
    </Link>
  );
};

export default BackButton;

