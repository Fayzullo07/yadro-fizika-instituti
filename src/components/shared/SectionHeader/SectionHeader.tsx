import React from 'react';
import PageTitle from '../PageTitle/PageTitle';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`text-center mb-8 ${className}`}>
      <PageTitle>{title}</PageTitle>
      {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
