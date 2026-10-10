const Services: React.FC = () => {
  return (
    <div className="pb-10">
      <div className="mt-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-[var(--color-brand-700)] rounded-full shrink-0" />
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-neutral-900)] uppercase tracking-wide">
            Xizmatlar
          </h1>
        </div>
        <div className="h-px bg-[var(--color-neutral-100)] mt-4" />
      </div>
      <p className="text-lg text-[var(--color-neutral-700)]">
        Xizmatlar bo'limi hozircha tayyorlanmoqda.
      </p>
    </div>
  );
};

export default Services;
