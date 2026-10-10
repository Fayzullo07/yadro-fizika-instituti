import { useLanguage } from '@/contexts/LanguageContext';
import { formatDate } from '@/utils/dateUtils';

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

  return (
    <div className="min-h-screen bg-[var(--color-neutral-50)]">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-[var(--color-brand-700)] rounded-full shrink-0" />
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-neutral-900)] uppercase tracking-wide">
              {t('nav.institute.documents') || 'Ichki hujjatlar'}
            </h1>
          </div>
          <div className="h-px bg-[var(--color-neutral-100)] mt-4" />
        </div>

        <div className="mt-8 space-y-6">
          {documentCategories.map((category) => (
            <div
              key={category.id}
              className="bg-[var(--color-neutral-0)] rounded-[var(--radius-md)] shadow-[var(--shadow-card)] border border-[var(--color-neutral-100)] overflow-hidden"
            >
              <div className="bg-[var(--color-brand-700)] text-[var(--color-neutral-0)] px-6 py-4">
                <h2 className="text-xl font-semibold">{category.title}</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {category.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 bg-[var(--color-neutral-50)] rounded-[var(--radius-md)] hover:bg-[var(--color-neutral-100)] transition-colors border border-[var(--color-neutral-100)]"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="bg-[var(--color-brand-100)] p-3 rounded-[var(--radius-md)]">
                          <svg
                            className="w-6 h-6 text-[var(--color-brand-600)]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-[var(--color-neutral-900)] mb-1">
                            {doc.name}
                          </h3>
                          <p className="text-sm text-[var(--color-neutral-500)]">
                            {formatDate(doc.date, language)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)] px-2 py-1 rounded uppercase">
                          {doc.type}
                        </span>
                        <button className="p-2 text-[var(--color-brand-600)] hover:bg-[var(--color-brand-50)] rounded-[var(--radius-md)] transition-colors">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documents;
