import { Link } from 'react-router-dom';

interface SectionHeaderProps {
  title: string;
  to: string;
  viewAllLabel: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, to, viewAllLabel }) => (
  <div className="flex items-end justify-between gap-[var(--space-4)]">
    <div className="flex flex-col gap-[var(--space-3)]">
      <h2 className="text-3xl font-bold leading-tight text-[var(--color-neutral-900)] md:text-[40px] md:leading-[48px]">
        {title}
      </h2>
      <div className="h-1 w-12 rounded-[var(--radius-full)] bg-[var(--color-accent-500)]" />
    </div>
    <Link
      to={to}
      className="shrink-0 rounded-[var(--radius-md)] border border-[var(--color-brand-700)] px-[var(--space-4)] py-[var(--space-2)] text-[16px] font-semibold leading-6 text-[var(--color-brand-700)] hover:bg-[var(--color-brand-50)]"
    >
      {viewAllLabel}
    </Link>
  </div>
);

export default SectionHeader;
