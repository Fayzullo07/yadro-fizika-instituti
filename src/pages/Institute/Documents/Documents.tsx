import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeader from '@/components/shared/SectionHeader/SectionHeader';

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
  const { t } = useLanguage();

  // Mock data - keyinroq API dan olinadi
  const documentCategories: DocumentCategory[] = [
    {
      id: 1,
      title: t('nav.normativ.constitution') || 'Konstitutsiya',
      documents: [
        { id: 1, name: 'O\'zbekiston Respublikasi Konstitutsiyasi', date: '2023-01-15', type: 'pdf' },
        { id: 2, name: 'Konstitutsiyaga o\'zgartirishlar', date: '2023-06-20', type: 'pdf' },
      ],
    },
    {
      id: 2,
      title: t('nav.normativ.laws') || 'Qonunlar',
      documents: [
        { id: 3, name: 'Ta\'lim to\'g\'risidagi qonun', date: '2023-02-10', type: 'pdf' },
        { id: 4, name: 'Ilmiy faoliyat to\'g\'risidagi qonun', date: '2023-03-05', type: 'pdf' },
      ],
    },
    {
      id: 3,
      title: t('nav.normativ.decrees') || 'Prezident farmon va qarorlari',
      documents: [
        { id: 5, name: 'Ta\'lim sohasini rivojlantirish to\'g\'risida', date: '2023-04-12', type: 'pdf' },
        { id: 6, name: 'Ilmiy tadqiqotlarni qo\'llab-quvvatlash', date: '2023-05-18', type: 'pdf' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <SectionHeader
          title={t('nav.institute.documents') || 'Ichki hujjatlar'}
          subtitle={t('pages.documents.subtitle') || 'Normativ-huquqiy hujjatlar va ichki hujjatlar'}
        />

        <div className="mt-8 space-y-6">
          {documentCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="bg-[#013d8c] text-white px-6 py-4">
                <h2 className="text-xl font-semibold">{category.title}</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {category.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{doc.name}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(doc.date).toLocaleDateString('uz-UZ')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded uppercase">
                          {doc.type}
                        </span>
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
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

