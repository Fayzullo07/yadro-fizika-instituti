import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLeadership, useTeams } from '@/hooks/useDepartment';
import Loading from '@/components/shared/Loading/Loading';
import MemberCardList from '@/components/shared/MemberCardList/MemberCardList';

type AccordionKey = 'rahbariyat' | 'institutJamoasi' | null;

const Markaziyapparat = () => {
  const { t } = useLanguage();
  const [openSection, setOpenSection] = useState<AccordionKey>(null);

  const { data: leadershipData, loading: leadershipLoading, error: leadershipError } = useLeadership();
  const { data: teamsData, loading: teamsLoading, error: teamsError } = useTeams();

  const loading = leadershipLoading || teamsLoading;
  const error = leadershipError || teamsError;

  const leadership = (leadershipData as unknown as { results?: unknown[] })?.results ?? [];
  const teams = (teamsData as unknown as { results?: unknown[] })?.results ?? [];

  const toggleSection = (key: AccordionKey) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          {t('common.error') || 'Xatolik yuz berdi'}
        </div>
      </div>
    );
  }

  const accordionSections: { key: AccordionKey; labelKey: string; members: unknown[]; showReceptionHours: boolean }[] = [
    { key: 'rahbariyat', labelKey: 'pages.markaziyApparat.rahbariyat', members: leadership, showReceptionHours: true },
    { key: 'institutJamoasi', labelKey: 'pages.markaziyApparat.institutJamoasi', members: teams, showReceptionHours: false },
  ];

  return (
    <div className="min-h-[calc(100vh-208px)] mt-6 bg-white pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-start justify-between gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#013d8c] uppercase">
            {t('pages.markaziyApparat.title') || 'MARKAZIY APPARAT'}
          </h1>
          <button
            type="button"
            onClick={handlePrint}
            className="flex-shrink-0 p-2 text-gray-600 hover:text-[#013d8c] hover:bg-gray-100 rounded transition-colors print:hidden"
            aria-label={t('common.print') || 'Chop etish'}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
          </button>
        </div>

        <div className="">
          {accordionSections.map(({ key, labelKey, members, showReceptionHours }) => {
            const isOpen = openSection === key;
            return (
              <div key={key} className="">
                <button
                  type="button"
                  onClick={() => toggleSection(key)}
                  className="w-full flex items-center justify-between py-4 px-5 text-left bg-[#f9f9f9]"
                >
                  <span className="text-base md:text-lg font-semibold text-gray-900 uppercase">
                    {t(labelKey)}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-600 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-2 !py-4 pt-0 bg-gray-50/50">
                    <MemberCardList
                      members={members as never[]}
                      showReceptionHours={showReceptionHours}
                      emptyMessage={t('pages.markaziyApparat.noMembers')}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Markaziyapparat;
