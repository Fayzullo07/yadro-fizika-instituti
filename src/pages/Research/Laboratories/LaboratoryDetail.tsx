import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { UNIQUE_OBJECTS_PATH } from '@/routes/path';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLaboratoryItem } from '@/hooks/useDepartment';
import Loading from '@/components/shared/Loading/Loading';
import { TABS, type TabKey } from './tabs/tabsConfig';
import AboutTab from './tabs/AboutTab';
import StaffTab from './tabs/StaffTab';
import ScienceTab from './tabs/ScienceTab';
import InternationalTab from './tabs/InternationalTab';

const LaboratoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { pathname } = useLocation();
  const isUniqueObject = pathname.startsWith(UNIQUE_OBJECTS_PATH);
  const { data, loading, error } = useLaboratoryItem(id || '');
  const [activeTab, setActiveTab] = useState<TabKey>('about');

  if (loading) return <Loading />;

  const lab = data?.data;

  if (error || !lab) {
    return (
      <div className="text-center py-16 text-gray-500">
        {error ? 'Xatolik yuz berdi' : "Ma'lumot topilmadi"}
      </div>
    );
  }

  const tabLabel = (tab: (typeof TABS)[0]) => {
    if (tab.key === 'about' && isUniqueObject) {
      return language === 'ru'
        ? 'О уникальном объекте'
        : language === 'en'
          ? 'About Unique Object'
          : 'Noyob obyekt haqida';
    }
    return language === 'ru' ? tab.ru : language === 'en' ? tab.en : tab.uz;
  };

  return (
    <div className="pb-10">
      {/* Hero banner */}
      <div
        className="relative overflow-hidden mb-2 min-h-20 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #0f1b3d 0%, #013d8c 60%, #1a5fb4 100%)' }}
      >
        <h1 className="relative z-10 text-base sm:text-xl md:text-2xl font-bold text-white text-center px-4 sm:px-8 py-5 sm:py-6 max-w-3xl mx-auto leading-snug">
          {lab.name}
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4 sm:mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 sm:px-5 py-3 text-xs sm:text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap ${
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
      <div className={activeTab === 'about' ? '' : 'hidden'}>
        <AboutTab lab={lab} />
      </div>
      <div className={activeTab === 'staff' ? '' : 'hidden'}>
        <StaffTab laboratoryId={lab.id} />
      </div>
      <div className={activeTab === 'science' ? '' : 'hidden'}>
        <ScienceTab laboratoryId={lab.id} />
      </div>
      <div className={activeTab === 'international' ? '' : 'hidden'}>
        <InternationalTab laboratoryId={lab.id} />
      </div>
    </div>
  );
};

export default LaboratoryDetail;
