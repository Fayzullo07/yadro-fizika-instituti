import { Link } from 'react-router-dom';
import Reveal from './Reveal';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  to?: string;
  viewAllLabel?: string;
  /** light text for dark sections */
  dark?: boolean;
  centered?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  to,
  viewAllLabel,
  dark = false,
  centered = false,
}) => (
  <Reveal
    className={`flex flex-col gap-[var(--space-4)] ${
      centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'
    }`}
  >
    <div className={`flex flex-col gap-[var(--space-3)] ${centered ? 'items-center' : ''}`}>
      {eyebrow && (
        <span className="flex items-center gap-[var(--space-3)] text-[12px] font-bold uppercase leading-4 tracking-[0.14em] text-[var(--color-accent-500)]">
          <span className="h-[3px] w-8 rounded-[var(--radius-full)] bg-[var(--color-accent-500)]" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-[32px] font-extrabold leading-[1.1] tracking-tight md:text-[48px] ${
          dark ? 'text-[var(--color-neutral-0)]' : 'text-[var(--color-neutral-900)]'
        }`}
      >
        {title}
      </h2>
    </div>
    {to && viewAllLabel && (
      <Link
        to={to}
        className={`group inline-flex shrink-0 items-center gap-[var(--space-2)] text-[16px] font-semibold leading-6 ${
          dark ? 'text-[var(--color-accent-500)]' : 'text-[var(--color-brand-700)]'
        }`}
      >
        {viewAllLabel}
        <span
          aria-hidden
          className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    )}
  </Reveal>
);

export default SectionHeader;
