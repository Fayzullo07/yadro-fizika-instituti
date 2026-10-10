import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { formatDate } from '@/utils/dateUtils';
import PageTitle from '@/components/shared/PageTitle/PageTitle';

interface DocumentItem {
  id: number;
  name: string;
  date: string;
  type: string;
}

interface DocumentCategory {
  id: number;
  title: string;
  documents: DocumentItem[];
}

const Documents: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  // Mock data - keyinroq API dan olinadi
  const documentCategories: DocumentCategory[] = [
    {
      id: 1,
      title: t('nav.normativ.constitution') || 'Konstitutsiya',
      documents: [
        {
          id: 1,
          name: "O'zbekiston Respublikasi Konstitutsiyasi",
          date: '2023-01-15',
          type: 'pdf',
        },
        { id: 2, name: "Konstitutsiyaga o'zgartirishlar", date: '2023-06-20', type: 'pdf' },
      ],
    },
    {
      id: 2,
      title: t('nav.normativ.laws') || 'Qonunlar',
      documents: [
        { id: 3, name: "Ta'lim to'g'risidagi qonun", date: '2023-02-10', type: 'pdf' },
        { id: 4, name: "Ilmiy faoliyat to'g'risidagi qonun", date: '2023-03-05', type: 'pdf' },
      ],
    },
    {
      id: 3,
      title: t('nav.normativ.decrees') || 'Prezident farmon va qarorlari',
      documents: [
        {
          id: 5,
          name: "Ta'lim sohasini rivojlantirish to'g'risida",
          date: '2023-04-12',
          type: 'pdf',
        },
        { id: 6, name: "Ilmiy tadqiqotlarni qo'llab-quvvatlash", date: '2023-05-18', type: 'pdf' },
      ],
    },
  ];

  const rows = documentCategories
    .filter((category) => activeCategory === null || category.id === activeCategory)
    .flatMap((category) => category.documents.map((doc) => ({ ...doc, category: category.title })));

  const groups = Object.entries(
    rows.reduce<Record<string, typeof rows>>((acc, doc) => {
      const year = doc.date ? doc.date.slice(0, 4) : '';
      (acc[year] ||= []).push(doc);
      return acc;
    }, {})
  ).sort(([a], [b]) => b.localeCompare(a));

  const chipBase =
    'rounded-[var(--radius-full)] px-[var(--space-4)] py-[var(--space-2)] text-[14px] font-semibold transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none';

  return (
    <div className="pb-10">
      <PageTitle>{t('nav.institute.documents') || 'Ichki hujjatlar'}</PageTitle>

      <div className="mb-[var(--space-8)] flex flex-wrap gap-[var(--space-2)]">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          aria-pressed={activeCategory === null}
          className={`${chipBase} ${
            activeCategory === null
              ? 'bg-[var(--color-brand-700)] text-[var(--color-neutral-0)]'
              : 'bg-[var(--color-neutral-0)] text-[var(--color-neutral-700)] hover:bg-[var(--color-brand-50)]'
          }`}
        >
          {t('common.all')}
        </button>
        {documentCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setActiveCategory(category.id)}
            aria-pressed={activeCategory === category.id}
            className={`${chipBase} ${
              activeCategory === category.id
                ? 'bg-[var(--color-brand-700)] text-[var(--color-neutral-0)]'
                : 'bg-[var(--color-neutral-0)] text-[var(--color-neutral-700)] hover:bg-[var(--color-brand-50)]'
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-[var(--space-10)]">
        {groups.map(([year, docs]) => (
          <section
            key={year || 'none'}
            className="flex flex-col gap-[var(--space-4)] md:flex-row md:gap-[var(--space-8)]"
          >
            {year && (
              <div className="md:w-[220px] md:shrink-0">
                <span
                  aria-label={year}
                  className="block text-[56px] font-extrabold leading-none text-transparent [-webkit-text-stroke:2px_var(--color-brand-700)] md:text-[72px]"
                >
                  {year}
                </span>
              </div>
            )}
            <div className="flex min-w-0 flex-1 flex-col gap-[var(--space-3)]">
              {docs.map((doc) => (
                <div
                  key={doc.id}
                  className="group flex items-center gap-[var(--space-4)] rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-[var(--space-4)] shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-1 hover:bg-[var(--color-brand-50)] motion-reduce:transition-none motion-reduce:hover:translate-x-0"
                >
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-brand-50)] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-brand-700)]">
                    {doc.type}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[16px] font-bold leading-6 text-[var(--color-neutral-900)]">
                      {doc.name}
                    </h4>
                    <p className="text-[14px] leading-5 text-[var(--color-neutral-500)]">
                      {doc.category} · {formatDate(doc.date, language)}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={t('common.download')}
                    className="shrink-0 text-[24px] font-bold leading-none text-[var(--color-brand-700)]"
                  >
                    ↓
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Documents;
