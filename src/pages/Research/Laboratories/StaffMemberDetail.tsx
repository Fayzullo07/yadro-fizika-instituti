import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLaboratoryTeamMember, useWorkActivity } from '@/hooks/useDepartment';
import { useLanguage } from '@/contexts/LanguageContext';
import Loading from '@/components/shared/Loading/Loading';
import { sanitizeHtmlRich } from '@/utils/htmlUtils';
import { AcademicLinksRow } from '@/components/shared/AcademicLinks/AcademicLinks';
import RetryImage from '@/components/shared/RetryImage/RetryImage';

const TABS = [{ key: 'mehnat', label: 'Mehnat faoliyati' }] as const;
type TabKey = (typeof TABS)[number]['key'];

const StaffMemberDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('mehnat');
  const [photoLoaded, setPhotoLoaded] = useState(false);
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

  return (
    <div className="pb-10">
      {/* Profile card */}
      <div className="bg-[var(--color-neutral-0)] shadow-[var(--shadow-card)] mb-4 p-4 sm:p-6">
        <div className="border border-[var(--color-neutral-100)] flex flex-col sm:flex-row overflow-hidden">
          {/* Photo */}
          <div className="w-full h-56 sm:w-55 sm:h-65 shrink-0 overflow-hidden relative bg-[var(--color-neutral-100)] flex items-center justify-center [&_.ant-image]:w-full [&_.ant-image]:h-full [&_.ant-image-img]:w-full [&_.ant-image-img]:h-full [&_.ant-image-img]:object-contain">
            {member.image ? (
              <>
                {!photoLoaded && (
                  <div className="absolute inset-0 bg-[var(--color-neutral-100)] animate-pulse" />
                )}
                {photoLoaded && (
                  <div
                    className="absolute inset-0 bg-cover bg-center scale-110 blur-md opacity-40"
                    style={{ backgroundImage: `url(${member.image})` }}
                  />
                )}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <RetryImage
                    src={member.image}
                    alt={member.full_name}
                    onLoad={() => setPhotoLoaded(true)}
                    className={`w-full h-full object-contain transition-opacity duration-300 ${photoLoaded ? 'opacity-100' : 'opacity-0'}`}
                  />
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[var(--color-brand-50)]">
                <svg
                  className="w-16 h-16 text-[var(--color-brand-100)]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-1 p-4 sm:p-6 gap-4 sm:gap-8">
            <div className="flex flex-col gap-3 flex-1">
              <p className="font-bold text-[var(--color-neutral-900)] text-base sm:text-lg leading-snug">
                {member.full_name}
              </p>
              {member.degree && member.degree !== "Yo'q" && (
                <div>
                  <p className="text-sm font-semibold text-[var(--color-neutral-900)] mb-0.5">
                    {t('nav.laboratoriyalar.degree')}:
                  </p>
                  <p className="text-sm text-[var(--color-neutral-700)]">{member.degree}</p>
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-[var(--color-neutral-900)] mb-0.5">
                  {t('nav.laboratoriyalar.position')}:
                </p>
                <p className="text-sm text-[var(--color-neutral-700)]">{member.position}</p>
              </div>
              <AcademicLinksRow data={member} className="mt-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[var(--color-neutral-0)] shadow-[var(--shadow-card)]">
        <div className="flex overflow-x-auto scrollbar-hide border-b border-[var(--color-neutral-100)]">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`shrink-0 px-4 sm:px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? 'border-[var(--color-brand-700)] text-[var(--color-brand-700)]'
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
