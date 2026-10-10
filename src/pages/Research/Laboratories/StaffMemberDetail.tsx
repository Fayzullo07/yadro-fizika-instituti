import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLaboratoryTeamMember, useWorkActivity } from '@/hooks/useDepartment';
import { useLanguage } from '@/contexts/LanguageContext';
import Loading from '@/components/shared/Loading/Loading';
import { sanitizeHtmlRich } from '@/utils/htmlUtils';
import { AcademicLinksRow } from '@/components/shared/AcademicLinks/AcademicLinks';
import PageTitle from '@/components/shared/PageTitle/PageTitle';

const TABS = [{ key: 'mehnat', label: 'Mehnat faoliyati' }] as const;
type TabKey = (typeof TABS)[number]['key'];

const StaffMemberDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('mehnat');
  const [photoFailed, setPhotoFailed] = useState(false);
  const { t } = useLanguage();
  const { memberId } = useParams<{ labId: string; memberId: string }>();
  const { data, loading, error } = useLaboratoryTeamMember(memberId || '');
  const { data: workData, loading: workLoading } = useWorkActivity(memberId || '');

  if (loading) return <Loading />;
  if (error || !data?.data) {
    return (
      <div className="text-center py-16 text-[var(--color-neutral-500)]">
        {error ? t('common.error') : t('common.notAvailable')}
      </div>
    );
  }

  const member = data.data;

  const initials = member.full_name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <div className="pb-10">
      <PageTitle>{member.full_name}</PageTitle>

      {/* Profile card */}
      <div className="mb-[var(--space-6)] flex flex-col gap-[var(--space-6)] rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-6 shadow-[var(--shadow-card)] sm:flex-row sm:items-start sm:p-8">
        <div className="relative flex h-40 w-40 shrink-0 items-center justify-center self-center overflow-hidden rounded-[var(--radius-full)] bg-[var(--color-brand-100)] text-4xl font-extrabold text-[var(--color-brand-700)] sm:self-start">
          {member.image && !photoFailed ? (
            <img
              src={member.image}
              alt={member.full_name}
              onError={() => setPhotoFailed(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            initials
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-[var(--space-4)]">
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[var(--color-accent-600)]">
              {t('nav.laboratoriyalar.position')}
            </p>
            <p className="text-lg font-bold leading-snug text-[var(--color-neutral-900)]">
              {member.position}
            </p>
          </div>
          {member.degree && member.degree !== "Yo'q" && (
            <div>
              <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-[var(--color-accent-600)]">
                {t('nav.laboratoriyalar.degree')}
              </p>
              <p className="text-base text-[var(--color-neutral-700)]">{member.degree}</p>
            </div>
          )}
          <AcademicLinksRow data={member} className="mt-1" />
        </div>
      </div>

      {/* Tabs */}
      <div className="overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] shadow-[var(--shadow-card)]">
        <div className="flex overflow-x-auto scrollbar-hide border-b border-[var(--color-neutral-300)]">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`shrink-0 px-4 sm:px-6 py-3 text-sm font-semibold border-b-[3px] -mb-px transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none whitespace-nowrap ${
                activeTab === tab.key
                  ? 'border-[var(--color-accent-500)] text-[var(--color-brand-700)]'
                  : 'border-transparent text-[var(--color-neutral-500)] hover:text-[var(--color-brand-700)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div
          className={`transition-opacity duration-200 ${workLoading ? 'opacity-50' : 'opacity-100'}`}
        >
          {workData?.data?.details ? (
            <div
              className="p-4 sm:p-6 w-full max-w-none text-sm sm:text-base [&_table]:w-full [&_img]:max-w-full overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: sanitizeHtmlRich(workData.data.details) }}
            />
          ) : (
            !workLoading && (
              <p className="p-4 sm:p-6 text-[var(--color-neutral-500)] text-sm">
                {t('common.notAvailable')}
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffMemberDetail;
