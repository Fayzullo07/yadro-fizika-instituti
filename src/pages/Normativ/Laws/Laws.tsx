import { useLanguage } from '@/contexts/LanguageContext';
import PageTitle from '@/components/shared/PageTitle/PageTitle';

const Laws: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pb-10">
      <PageTitle>{t('nav.normativ.laws') || 'Qonunlar'}</PageTitle>

      <section className="rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] py-[var(--space-16)] text-center shadow-[var(--shadow-card)]">
        <div className="flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-[var(--color-brand-700)]/10 flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-[var(--color-brand-700)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-neutral-900)] mb-4">
            {t('pages.laws.comingSoon') || "Tez orada qo'shiladi"}
          </h2>
          <p className="text-[var(--color-neutral-700)] text-lg max-w-md">
            {t('pages.laws.comingSoonDescription') ||
              "Qonunlar bo'limi hozircha tayyorlanmoqda. Tez orada bu bo'limda barcha qonunlar bilan tanishishingiz mumkin bo'ladi."}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Laws;
