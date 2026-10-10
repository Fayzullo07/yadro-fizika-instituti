import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface BackButtonProps {
  to: string;
  label?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ to, label, className = '' }) => {
  const { t } = useLanguage();

  return (
    <Link
      to={to}
      className={`group my-[var(--space-3)] inline-flex items-center gap-[var(--space-2)] font-semibold text-[var(--color-brand-700)] transition-colors duration-300 hover:text-[var(--color-brand-600)] ${className}`}
    >
      <svg
        className="size-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      {label || t('news.backToList') || 'Orqaga qaytish'}
    </Link>
  );
};

export default BackButton;
