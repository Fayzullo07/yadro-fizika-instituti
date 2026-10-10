import React from 'react';

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ children, className = '' }) => {
  return (
    <div className={`mt-[var(--space-4)] mb-[var(--space-6)] sm:mb-[var(--space-8)] ${className}`}>
      <span className="mb-[var(--space-3)] block h-[3px] w-10 rounded-[var(--radius-full)] bg-[var(--color-accent-500)]" />
      <h1 className="text-[28px] font-extrabold leading-[1.15] tracking-tight text-[var(--color-neutral-900)] sm:text-[36px] md:text-[44px]">
        {children}
      </h1>
    </div>
  );
};

export default PageTitle;
