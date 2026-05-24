import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLaboratoryItem } from '@/hooks/useDepartment';
import Loading from '@/components/shared/Loading/Loading';
import { sanitizeHtml } from '@/utils/htmlUtils';
import logoFallback from '@/assets/logo.jpg';

const TABS = [
  {
    key: 'about',
    uz: 'Laboratoriya haqida',
    ru: 'О лаборатории',
    en: 'About Laboratory',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
  },
  {
    key: 'staff',
    uz: 'Laboratoriya tarkibi',
    ru: 'Состав лаборатории',
    en: 'Laboratory Staff',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
  },
  {
    key: 'science',
    uz: 'Ilmiy faoliyat',
    ru: 'Научная деятельность',
    en: 'Scientific Activity',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M9 3v7.5L6 17.5A2 2 0 008 20h8a2 2 0 002-1.5L15 10.5V3M9 3h6M9 3H7m8 0h2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    key: 'international',
    uz: 'Xalqaro hamkorlik',
    ru: 'Международное сотрудничество',
    en: 'International Cooperation',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
  },
];

const LaboratoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { data, loading, error } = useLaboratoryItem(id || '');
  const [activeTab, setActiveTab] = useState('about');

  const lab = data?.data;

  if (loading) return <Loading />;

  if (error || !lab) {
    return (
      <div className="text-center py-16 text-gray-500">
        {error ? 'Xatolik yuz berdi' : "Ma'lumot topilmadi"}
      </div>
    );
  }

  const tabLabel = (tab: (typeof TABS)[0]) =>
    language === 'ru' ? tab.ru : language === 'en' ? tab.en : tab.uz;

  return (
    <div className="pb-10">
      {/* Hero banner */}
      <div
        className="relative overflow-hidden mb-2 min-h-20 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #0f1b3d 0%, #013d8c 60%, #1a5fb4 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, #4a6fa5 0%, transparent 50%), radial-gradient(circle at 80% 20%, #1a3a6b 0%, transparent 40%)',
          }}
        />
        <div className="relative z-10 text-center px-8 py-0">
          <h1 className="text-xl md:text-2xl font-bold text-white leading-snug max-w-2xl mx-auto">
            {lab.name}
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab.key
                ? 'border-[#013d8c] bg-[#013d8c] text-white'
                : 'border-transparent text-gray-600 hover:text-[#013d8c] hover:bg-gray-50'
            }`}
          >
            {tab.icon}
            {tabLabel(tab)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'about' &&
        (lab.content ? (
          <div
            className="bg-white rounded-2xl shadow-sm p-6 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(lab.content) }}
          />
        ) : (
          <p className="text-center py-16 text-gray-400">Kontent mavjud emas</p>
        ))}

      {activeTab !== 'about' && (
        <p className="text-center py-16 text-gray-400">Ma'lumot mavjud emas</p>
      )}
    </div>
  );
};

export default LaboratoryDetail;
