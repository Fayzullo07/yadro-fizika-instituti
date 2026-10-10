import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { UNIQUE_OBJECTS_PATH } from '@/routes/path';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLaboratoryItem, useLaboratoryTeams } from '@/hooks/useDepartment';
import Loading from '@/components/shared/Loading/Loading';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
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
  const teams = useLaboratoryTeams(id || '');
  const [activeTab, setActiveTab] = useState<TabKey>('about');

  if (loading) return <Loading />;

  const lab = data?.data;

  if (error || !lab) {
    return (
      <div className="text-center py-16 text-[var(--color-neutral-500)]">
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
    if (tab.key === 'staff' && isUniqueObject) {
      return language === 'ru'
        ? 'Состав службы'
        : language === 'en'
          ? 'Service Staff'
          : "Xizmat bo'limi tarkibi";
    }
    return language === 'ru' ? tab.ru : language === 'en' ? tab.en : tab.uz;
  };

  const staffCount = teams.data?.data?.length ?? 0;
  const stats: { value: number; label: string }[] = [];
  if (staffCount > 0) {
    stats.push({
      value: staffCount,
      label: tabLabel(TABS.find((tb) => tb.key === 'staff') as (typeof TABS)[0]),
    });
  }
  if (lab.images && lab.images.length > 0) {
    stats.push({
      value: lab.images.length,
      label: language === 'ru' ? 'Фото' : language === 'en' ? 'Photos' : 'Rasmlar',
    });
  }

  return (
    <div className="pb-10">
      <PageTitle>{lab.name}</PageTitle>

      {stats.length > 0 && (
        <div className="mb-[var(--space-6)] grid grid-cols-2 gap-[var(--space-4)] sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-[var(--space-4)] rounded-[var(--radius-lg)] bg-[var(--color-brand-950)] p-5 shadow-[var(--shadow-card)]"
            >
              <span className="text-4xl font-extrabold leading-none text-[var(--color-accent-500)]">
                {s.value}
              </span>
              <span className="text-sm font-medium text-[var(--color-neutral-300)]">{s.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div
        role="tablist"
        className="mb-[var(--space-6)] flex overflow-x-auto border-b border-[var(--color-neutral-300)] scrollbar-hide"
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`-mb-px flex shrink-0 items-center gap-2 whitespace-nowrap border-b-[3px] px-4 py-3 text-sm font-semibold transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:px-6 ${
              activeTab === tab.key
                ? 'border-[var(--color-accent-500)] text-[var(--color-brand-700)]'
                : 'border-transparent text-[var(--color-neutral-500)] hover:text-[var(--color-brand-700)]'
            }`}
          >
            {tab.icon}
            {tabLabel(tab)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className={activeTab === 'about' ? '' : 'hidden'}>
        <AboutTab lab={lab} isUniqueObject={isUniqueObject} />
      </div>
      <div className={activeTab === 'staff' ? '' : 'hidden'}>
        <StaffTab
          laboratoryId={lab.id}
          members={teams.data?.data ?? []}
          loading={teams.loading}
          error={!!teams.error}
        />
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
