import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLeadership, useTeams } from '@/hooks/useDepartment';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import Loading from '@/components/shared/Loading/Loading';
import MemberCardList from '@/components/shared/MemberCardList/MemberCardList';

type AccordionKey = 'rahbariyat' | 'institutJamoasi' | null;

const CentralOffice = () => {
  const { t } = useLanguage();
  const [openSection, setOpenSection] = useState<AccordionKey>(null);

  const {
    data: leadershipData,
    loading: leadershipLoading,
    error: leadershipError,
  } = useLeadership();
  const { data: teamsData, loading: teamsLoading, error: teamsError } = useTeams();

  const loading = leadershipLoading || teamsLoading;
  const error = leadershipError || teamsError;

  const leadership = (leadershipData as unknown as { data?: unknown[] })?.data ?? [];
  const teams = (teamsData as unknown as { data?: unknown[] })?.data ?? [];

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
        <div className="text-center text-red-600">{t('common.error') || 'Xatolik yuz berdi'}</div>
      </div>
    );
  }

  const accordionSections: {
    key: AccordionKey;
    labelKey: string;
    members: unknown[];
    showReceptionHours: boolean;
  }[] = [
    {
      key: 'rahbariyat',
      labelKey: 'pages.markaziyApparat.rahbariyat',
      members: leadership,
      showReceptionHours: true,
    },
    {
      key: 'institutJamoasi',
      labelKey: 'pages.markaziyApparat.institutJamoasi',
      members: teams,
      showReceptionHours: false,
    },
  ];

  return (
    <div className="pb-12">
      <PageTitle>{t('pages.markaziyApparat.title') || 'MARKAZIY APPARAT'}</PageTitle>
      <div>
        <div className="mb-[var(--space-4)] flex justify-end">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-shrink-0 rounded-[var(--radius-md)] p-2 text-[var(--color-neutral-700)] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-brand-700)] motion-reduce:transition-none print:hidden"
            aria-label={t('common.print') || 'Chop etish'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-[var(--space-4)]">
          {accordionSections.map(({ key, labelKey, members, showReceptionHours }) => {
            const isOpen = openSection === key;
            return (
              <div
                key={key}
                className="overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] shadow-[var(--shadow-card)]"
              >
                <button
                  type="button"
                  onClick={() => toggleSection(key)}
                  className="w-full flex items-center justify-between py-4 px-5 text-left transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[var(--color-neutral-50)] motion-reduce:transition-none"
                >
                  <span className="text-base md:text-lg font-semibold text-[var(--color-neutral-900)] uppercase">
                    {t(labelKey)}
                  </span>
                  <svg
                    className={`w-5 h-5 text-[var(--color-neutral-700)] flex-shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'rotate-180' : ''}`}
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
                  <div className="px-2 !py-4 pt-0 border-t border-[var(--color-neutral-100)]">
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

export default CentralOffice;
