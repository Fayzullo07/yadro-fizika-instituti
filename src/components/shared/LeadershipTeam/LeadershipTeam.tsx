import { useState } from 'react';
import { Image } from 'antd';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLeadership } from '@/hooks/useDepartment';
import PageTitle from '@/components/shared/PageTitle/PageTitle';

type DepartmentType = 'leaders' | 'department' | 'division';

const TYPES: { key: DepartmentType; uz: string; ru: string; en: string }[] = [
  { key: 'leaders', uz: 'Rahbariyat', ru: 'Руководство', en: 'Leadership' },
  { key: 'division', uz: 'Boshqarma', ru: 'Управление', en: 'Directorate' },
  { key: 'department', uz: "Bo'lim", ru: 'Отдел', en: 'Department' },
];

const LeadershipTeam: React.FC<{ title: string }> = ({ title }) => {
  const { language } = useLanguage();
  const [activeType, setActiveType] = useState<DepartmentType>('leaders');
  const { data, loading, error } = useLeadership(activeType);

  const members = data?.data ?? [];

  return (
    <div className="pb-10">
      <PageTitle>{title}</PageTitle>

      <div className="flex gap-6">
        <aside className="w-52 shrink-0">
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
                {language === 'ru' ? type.ru : language === 'en' ? type.en : type.uz}
              </button>
            ))}
          </nav>
        </aside>

        <div
          className={`flex-1 min-w-0 transition-opacity duration-200 ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
        >
          {error && <p className="text-center py-16 text-gray-500">Xatolik yuz berdi</p>}
          {!error && members.length === 0 && !loading && (
            <p className="text-center py-16 text-gray-500">Ma'lumot topilmadi</p>
          )}
          {!error && members.length > 0 && (
            <div className="flex flex-col gap-4">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex gap-6 bg-white border border-gray-100 rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-44 h-52 rounded-xl shrink-0 overflow-hidden relative bg-gray-100 flex items-center justify-center [&_.ant-image]:w-full [&_.ant-image]:h-full [&_.ant-image-img]:w-full [&_.ant-image-img]:h-full [&_.ant-image-img]:object-contain">
                    <div
                      className="absolute inset-0 bg-cover bg-center scale-110 blur-sm opacity-50"
                      style={{ backgroundImage: `url(${member.photo || member.image})` }}
                    />
                    <div className="relative z-10 w-full h-full">
                      <Image
                        src={member.photo || member.image}
                        alt={member.full_name}
                        fallback=""
                        placeholder={false}
                        preview={{
                          mask: <span className="text-white text-xs">Ko'rish</span>,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-start gap-2 pt-2">
                    {member.department_name && (
                      <span className="text-xl font-semibold text-blue-900 w-fit">
                        {member.department_name}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-gray-900 leading-snug">
                      {member.full_name}
                    </h3>
                    <p className="text-black text-sm">{member.position}</p>
                    <div className="flex flex-col gap-1 mt-1">
                      {member.phone && (
                        <a
                          href={`tel:${member.phone.replace(/\s/g, '')}`}
                          className="text-sm text-gray-500 hover:text-[#013d8c]"
                        >
                          📞 {member.phone}
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="text-sm text-gray-500 hover:text-[#013d8c]"
                        >
                          ✉️ {member.email}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadershipTeam;
