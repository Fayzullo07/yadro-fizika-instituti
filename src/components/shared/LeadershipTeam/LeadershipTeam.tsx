import { useState } from 'react';
import { Image } from 'antd';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLeadership } from '@/hooks/useDepartment';
import { useImageRetry } from '@/hooks/useImageRetry';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import type { LeadershipMember } from '@/types';

type DepartmentType = 'leaders' | 'department' | 'division';

const TYPES: { key: DepartmentType; uz: string; ru: string; en: string }[] = [
  { key: 'leaders', uz: 'Rahbariyat', ru: 'Руководство', en: 'Leadership' },
  { key: 'division', uz: 'Boshqarma', ru: 'Управление', en: 'Directorate' },
  { key: 'department', uz: "Bo'lim", ru: 'Отдел', en: 'Department' },
];

const PREVIEW_LABEL: Record<string, string> = {
  uz: "Ko'rish",
  ru: 'Просмотр',
  en: 'Preview',
};

const LeaderCard: React.FC<{ member: LeadershipMember; language: string }> = ({
  member,
  language,
}) => {
  const { retryKey, handleError } = useImageRetry();
  const photo = member.photo || member.image;

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white border border-gray-100 rounded-2xl shadow-sm p-3 sm:p-4 hover:shadow-md transition-shadow">
      {/* Photo */}
      <div className="w-full h-56 sm:w-44 sm:h-52 rounded-xl shrink-0 overflow-hidden relative bg-gray-100 flex items-center justify-center [&_.ant-image]:w-full [&_.ant-image]:h-full [&_.ant-image-img]:w-full [&_.ant-image-img]:h-full [&_.ant-image-img]:object-contain">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 blur-md opacity-40"
          style={{ backgroundImage: `url(${photo})` }}
        />
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <Image
            key={retryKey}
            src={photo}
            alt={member.full_name}
            fallback=""
            placeholder={<div className="absolute inset-0 bg-gray-200 animate-pulse" />}
            style={{ inlineSize: '100%', blockSize: '100%', objectFit: 'contain' }}
            onError={handleError}
            preview={{
              mask: (
                <span className="text-white text-xs">
                  {PREVIEW_LABEL[language] ?? PREVIEW_LABEL.uz}
                </span>
              ),
            }}
          />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-start gap-1.5 sm:gap-2 sm:pt-2">
        {member.department_name && (
          <span className="text-base sm:text-xl font-semibold text-blue-900">
            {member.department_name}
          </span>
        )}
        <h3 className="text-base sm:text-xl font-bold text-gray-900 leading-snug">
          {member.full_name}
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm">{member.position}</p>
        <div className="flex flex-col gap-1 mt-1">
          {member.phone && (
            <a
              href={`tel:${member.phone.replace(/\s/g, '')}`}
              className="text-xs sm:text-sm text-gray-500 hover:text-[#013d8c]"
            >
              📞 {member.phone}
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="text-xs sm:text-sm text-gray-500 hover:text-[#013d8c]"
            >
              ✉️ {member.email}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const LeadershipTeam: React.FC<{ title: string }> = ({ title }) => {
  const { language, t } = useLanguage();
  const [activeType, setActiveType] = useState<DepartmentType>('leaders');
  const { data, loading, error } = useLeadership(activeType);

  const members = data?.data ?? [];

  const label = (type: (typeof TYPES)[number]) =>
    language === 'ru' ? type.ru : language === 'en' ? type.en : type.uz;

  return (
    <div className="pb-10">
      <PageTitle>{title}</PageTitle>

      {/* Mobile: horizontal scroll tabs */}
      <div className="md:hidden flex overflow-x-auto scrollbar-hide border-b border-gray-200 mb-4">
        {TYPES.map((type) => (
          <button
            key={type.key}
            onClick={() => setActiveType(type.key)}
            className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeType === type.key
                ? 'border-[#013d8c] text-[#013d8c]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {label(type)}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Desktop: vertical sidebar */}
        <aside className="hidden md:block w-52 shrink-0">
          <nav className="flex flex-col gap-1">
            {TYPES.map((type) => (
              <button
                key={type.key}
                onClick={() => setActiveType(type.key)}
                className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeType === type.key
                    ? 'bg-[#013d8c] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {label(type)}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div
          className={`flex-1 min-w-0 transition-opacity duration-200 ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
        >
          {error && <p className="text-center py-16 text-gray-500">{t('common.error')}</p>}
          {!error && members.length === 0 && !loading && (
            <p className="text-center py-16 text-gray-500">{t('common.notAvailable')}</p>
          )}
          {!error && members.length > 0 && (
            <div className="flex flex-col gap-3 sm:gap-4">
              {members.map((member) => (
                <LeaderCard key={member.id} member={member} language={language} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadershipTeam;
