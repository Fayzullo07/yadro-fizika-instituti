import Breadcrumb from '@/components/shared/Breadcrumb/Breadcrumb';

interface PageHeroProps {
  slotRef: (el: HTMLDivElement | null) => void;
}

/** Dark full-bleed band with breadcrumb and page title, shared by inner pages. */
const PageHero: React.FC<PageHeroProps> = ({ slotRef }) => (
  <section className="relative overflow-hidden bg-[var(--color-brand-950)]">
    <div
      aria-hidden
      className="pointer-events-none absolute -right-20 -top-32 size-[520px] rounded-full bg-[var(--color-brand-600)] opacity-45 blur-[140px]"
    />
    <div className="relative mx-auto flex w-full max-w-[1540px] flex-col gap-[var(--space-3)] px-3 pb-[var(--space-8)] pt-[var(--space-2)] sm:px-5 md:px-8 lg:px-10">
      <Breadcrumb tone="dark" />
      <div ref={slotRef} className="min-h-3" />
    </div>
  </section>
);

export default PageHero;
