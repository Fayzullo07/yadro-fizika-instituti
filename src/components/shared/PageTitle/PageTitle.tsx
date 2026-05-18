import React from 'react';

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ children, className = '' }) => {
  return (
    <div className={`mt-4 mb-8 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-[#013d8c] rounded-full shrink-0" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
          {children}
        </h1>
      </div>
      <div className="h-px bg-gray-200 mt-4" />
    </div>
  );
};

export default PageTitle;
