import { useLanguage } from '@/contexts/LanguageContext';
import PageTitle from '@/components/shared/PageTitle/PageTitle';

const Decrees: React.FC = () => {
  const { t } = useLanguage();

  const decreeText = `Seysmik xavfsizlikni taʼminlash sohasida ilmiy tadqiqotlarni qoʻllab-quvvatlash va kadrlar tayyorlash, qurilishda sunʼiy intellekt texnologiyalaridan foydalanish va raqamli qurilishni rivojlantirish, barqaror konstruktiv yechimlar, yerosti va yerusti shaharsozligi, "yashil" qurilish, geotexnika va qurilish materiallari yoʻnalishlarida zarur ilmiy yechimlarni ishlab chiqish maqsadida qaror qilaman:`;

  return (
    <div className="pb-10">
      <PageTitle>Oʻzbekiston Respublikasi Prezidentining Qarori</PageTitle>

      <div className="max-w-4xl">
        {/* SUBTITLE */}
        <section className="rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-[var(--space-6)] shadow-[var(--shadow-card)] md:p-[var(--space-10)]">
          <h2 className="mb-[var(--space-6)] text-[20px] font-bold leading-7 text-[var(--color-neutral-900)] md:text-[24px] md:leading-8">
            Toshkent arxitektura-qurilish universiteti huzurida Seysmik xavfsizlik va barqaror
            qurilish milliy tadqiqot instituti faoliyatini tashkil etish chora-tadbirlari
            toʻgʻrisida
          </h2>

          <p className="whitespace-pre-line text-[16px] leading-[1.9] text-[var(--color-neutral-700)] md:text-lg">
            {decreeText}
          </p>
        </section>

        {/* LINK BLOCK */}
        <a
          href="https://www.lex.uz/docs/-7777579"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-[var(--space-6)] flex items-center gap-[var(--space-4)] rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-[var(--space-4)] shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-1 hover:bg-[var(--color-brand-50)] motion-reduce:transition-none motion-reduce:hover:translate-x-0"
        >
          <span className="flex size-14 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-brand-50)] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-brand-700)]">
            LEX
          </span>
          <div className="min-w-0 flex-1">
            <h4 className="text-[16px] font-bold leading-6 text-[var(--color-neutral-900)]">
              {t('pages.decrees.fullText') || "To'liq matn"}
            </h4>
            <p className="text-[14px] leading-5 text-[var(--color-neutral-500)]">
              {t('pages.decrees.fullTextDescription') ||
                "Qarorning rasmiy va to'liq matni bilan tanishish"}
            </p>
          </div>
          <span
            aria-hidden
            className="shrink-0 text-[24px] font-bold leading-none text-[var(--color-brand-700)]"
          >
            ↗
          </span>
        </a>
      </div>
    </div>
  );
};

export default Decrees;
