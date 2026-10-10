import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { PageHeroContext } from '@/components/Layout/PageHero/PageHeroContext';

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Inside a page layout the heading is portalled into the dark hero band;
 * elsewhere it falls back to an inline heading.
 */
const PageTitle: React.FC<PageTitleProps> = ({ children, className = '' }) => {
  const slot = useContext(PageHeroContext);

  if (slot) {
    return createPortal(
      <div className="flex flex-col gap-[var(--space-3)]">
        <span className="block h-[3px] w-10 rounded-[var(--radius-full)] bg-[var(--color-accent-500)]" />
        <h1 className="text-[28px] font-extrabold leading-[1.15] tracking-tight text-[var(--color-neutral-0)] sm:text-[36px] md:text-[48px]">
          {children}
        </h1>
      </div>,
      slot
    );
  }

  return (
    <div className={`mt-[var(--space-4)] mb-[var(--space-6)] ${className}`}>
      <span className="mb-[var(--space-3)] block h-[3px] w-10 rounded-[var(--radius-full)] bg-[var(--color-accent-500)]" />
      <h1 className="text-[28px] font-extrabold leading-[1.15] tracking-tight text-[var(--color-neutral-900)] sm:text-[36px] md:text-[44px]">
        {children}
      </h1>
    </div>
  );
};

export default PageTitle;
