import React from 'react';

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ children, className = '' }) => {
  return (
    <h1
      className={`text-2xl md:text-4xl font-semibold text-[#013d8c] mb-3 text-center ${className}`}
    >
      {children}
    </h1>
  );
};

export default PageTitle;
