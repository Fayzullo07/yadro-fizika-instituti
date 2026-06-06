import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image } from 'antd';
import { useLaboratoryTeamMember, useWorkActivity } from '@/hooks/useDepartment';
import { useLanguage } from '@/contexts/LanguageContext';
import Loading from '@/components/shared/Loading/Loading';
import { sanitizeHtmlRich } from '@/utils/htmlUtils';

const TABS = [{ key: 'mehnat', label: 'Mehnat faoliyati' }] as const;
type TabKey = (typeof TABS)[number]['key'];

type AcademicKey = 'google_scholar' | 'web_of_science' | 'scopus' | 'researchgate' | 'orcid';
const academicLinks: { key: AcademicKey; label: string; color: string; bg: string }[] = [
  { key: 'google_scholar', label: 'Google Scholar', color: '#4285F4', bg: '#EAF1FB' },
  { key: 'web_of_science', label: 'Web of Science', color: '#CC0000', bg: '#FDEAEA' },
  { key: 'scopus', label: 'Scopus', color: '#E9711C', bg: '#FEF0E6' },
  { key: 'researchgate', label: 'ResearchGate', color: '#00CCBB', bg: '#E6FAF8' },
  { key: 'orcid', label: 'ORCID', color: '#A6CE39', bg: '#F4FAE6' },
];

const StaffMemberDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('mehnat');
  const { t } = useLanguage();
  const { memberId } = useParams<{ labId: string; memberId: string }>();
  const { data, loading, error } = useLaboratoryTeamMember(memberId || '');
  const { data: workData, loading: workLoading } = useWorkActivity(memberId || '');

  if (loading) return <Loading />;
  if (error || !data?.data) {
    return (
      <div className="text-center py-16 text-gray-500">
        {error ? t('common.error') : t('common.notAvailable')}
      </div>
    );
  }

  const member = data.data;
  const links = academicLinks.filter((l) => member[l.key as keyof typeof member]);

  return (
    <div className="pb-10">
      {/* Profile card */}
      <div className="bg-white shadow-sm mb-4 p-4 sm:p-6">
        <div className="border border-gray-200 flex flex-col sm:flex-row overflow-hidden">
          {/* Photo */}
          <div className="w-full h-56 sm:w-55 sm:h-65 shrink-0 overflow-hidden relative bg-gray-100 flex items-center justify-center [&_.ant-image]:w-full [&_.ant-image]:h-full [&_.ant-image-img]:w-full [&_.ant-image-img]:h-full [&_.ant-image-img]:object-contain">
            {member.image ? (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center scale-110 blur-md opacity-40"
                  style={{ backgroundImage: `url(${member.image})` }}
                />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <Image
                    src={member.image}
                    alt={member.full_name}
                    style={{ inlineSize: '100%', blockSize: '100%', objectFit: 'contain' }}
                  />
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-50">
                <svg className="w-16 h-16 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-1 p-4 sm:p-6 gap-4 sm:gap-8">
            <div className="flex flex-col gap-3 flex-1">
              <p className="font-bold text-gray-900 text-base sm:text-lg leading-snug">
                {member.full_name}
              </p>
              {member.degree && member.degree !== "Yo'q" && (
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-0.5">
                    {t('nav.laboratoriyalar.degree')}:
                  </p>
                  <p className="text-sm text-gray-600">{member.degree}</p>
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-0.5">
                  {t('nav.laboratoriyalar.position')}:
                </p>
                <p className="text-sm text-gray-600">{member.position}</p>
              </div>
              {links.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {links.map((l) => (
                    <a
                      key={l.key}
                      href={member[l.key as keyof typeof member] as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block border px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-80"
                      style={{ borderColor: l.color, color: l.color, background: l.bg }}
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow-sm">
        <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`shrink-0 px-4 sm:px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? 'border-[#013d8c] text-[#013d8c]'
                  : 'border-transparent text-gray-500 hover:text-[#013d8c]'
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
              <p className="p-4 sm:p-6 text-gray-400 text-sm">{t('common.notAvailable')}</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffMemberDetail;
