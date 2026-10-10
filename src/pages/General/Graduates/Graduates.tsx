import { useLanguage } from '@/contexts/LanguageContext';

const Graduates: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pb-10">
      <div className="mt-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-[var(--color-brand-700)] rounded-full shrink-0" />
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-neutral-900)] uppercase tracking-wide">
            {t('nav.umumiy.graduates') || 'Bitiruvchilar'}
          </h1>
        </div>
        <div className="h-px bg-[var(--color-neutral-100)] mt-4" />
      </div>
      <div className="bg-[var(--color-neutral-0)] rounded-[var(--radius-md)] shadow-[var(--shadow-card)] p-8">
        <p className="text-lg text-[var(--color-neutral-700)]">
          {t('pages.graduates.content') || "Bitiruvchilar ma'lumotlari..."}
        </p>
      </div>
    </div>
  );
};

export default Graduates;
