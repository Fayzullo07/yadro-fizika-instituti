import PageTitle from '@/components/shared/PageTitle/PageTitle';
import { useLanguage } from '@/contexts/LanguageContext';

const Field: React.FC<{
  label: string;
  mono?: boolean;
  className?: string;
  children: React.ReactNode;
}> = ({ label, mono, className = '', children }) => (
  <section
    className={`rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-[var(--space-6)] shadow-[var(--shadow-card)] ${className}`}
  >
    <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent-600)]">
      {label}
    </span>
    <p
      className={`mt-[var(--space-2)] text-[16px] font-semibold leading-7 text-[var(--color-neutral-900)] md:text-[18px] ${
        mono ? 'font-mono text-[var(--color-brand-700)]' : ''
      }`}
    >
      {children}
    </p>
  </section>
);

const Requisites: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pb-10">
      <PageTitle>{t('nav.ochiq.requisites') || 'Institut rekvizitlari'}</PageTitle>

      <div className="grid grid-cols-1 gap-[var(--space-4)] md:grid-cols-2">
        <Field label="Institut nomi" className="md:col-span-2">
          O'zbekiston Respublikasi Raqamli texnologiyalar vazirligi huzuridagi Raqamli
          texnologiyalar va sun'iy intellektni rivojlantirish ilmiy-tadqiqot instituti
        </Field>

        <Field label="Manzil" className="md:col-span-2">
          100125, Toshkent sh., Mirzo Ulug'bek tumani, Bo'z-2, 17A
        </Field>

        <Field label="STIR" mono>
          308927120
        </Field>

        <Field label="OKONX" mono>
          95120
        </Field>

        <Field label="IFUT" mono>
          72190{' '}
          <span className="font-sans text-[14px] font-normal leading-5 text-[var(--color-neutral-500)]">
            (Tabiiy fanlar va injeneriya sohasidagi boshqa tadqiqotlar va ishlanmalar)
          </span>
        </Field>

        <Field label="KTUT" mono>
          31222444
        </Field>
      </div>
    </div>
  );
};

export default Requisites;
