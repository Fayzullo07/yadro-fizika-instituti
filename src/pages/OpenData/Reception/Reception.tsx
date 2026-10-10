import PageTitle from '@/components/shared/PageTitle/PageTitle';
import { useLanguage } from '@/contexts/LanguageContext';

const Reception: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pb-10">
      <PageTitle>{t('nav.ochiq.reception') || 'Rahbariyat qabul kunlari'}</PageTitle>
      <section className="rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-[var(--space-6)] shadow-[var(--shadow-card)] md:p-[var(--space-10)]">
        <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent-600)]">
          {t('contact.workingDays') || 'Qabul kunlari'}
        </span>
        <p className="mt-[var(--space-2)] text-[18px] leading-8 text-[var(--color-neutral-700)]">
          {t('pages.reception.content') || "Rahbariyat qabul kunlari ma'lumotlari..."}
        </p>
      </section>
    </div>
  );
};

export default Reception;
