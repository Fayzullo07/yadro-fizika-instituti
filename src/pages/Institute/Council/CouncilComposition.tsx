import { Image } from 'antd';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApi } from '@/hooks/useApi';
import { councilApi } from '@/services/api';
import Loading from '@/components/shared/Loading/Loading';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import type { CouncilMember, PaginatedResponse } from '@/types';

const PREVIEW_LABEL: Record<string, string> = {
  uz: "Ko'rish",
  ru: 'Просмотр',
  en: 'Preview',
};

const CouncilComposition: React.FC = () => {
  const { t, language } = useLanguage();
  const { data, loading, error } = useApi<PaginatedResponse<CouncilMember>>(
    () => councilApi.getCouncilMembers({ per_page: 50 }, language),
    [language]
  );

  const members = data?.data ?? [];

  return (
    <div className="pb-10">
      <PageTitle>{t('nav.ilmiyFaoliyat.councilComposition') || 'Ilmiy kengash tarkibi'}</PageTitle>

      {loading && <Loading />}

      {error && (
        <p className="text-center py-16 text-gray-500">
          {t('common.error') || 'Xatolik yuz berdi'}
        </p>
      )}

      {!loading && !error && members.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex gap-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
            >
              <div className="w-20 h-20 rounded-lg shrink-0 overflow-hidden relative flex items-center justify-center bg-gray-100">
                <div
                  className="absolute inset-0 bg-cover bg-center scale-110 blur-sm opacity-60"
                  style={{ backgroundImage: `url(${member.photo})` }}
                />
                <div className="relative z-10 w-full h-full [&_.ant-image]:w-full [&_.ant-image]:h-full [&_.ant-image-img]:w-full [&_.ant-image-img]:h-full [&_.ant-image-img]:object-contain">
                  <Image
                    src={member.photo}
                    alt={member.fullname}
                    fallback=""
                    placeholder={false}
                    preview={{
                      mask: (
                        <span className="text-white text-[10px] text-center leading-tight px-1">
                          {PREVIEW_LABEL[language] ?? PREVIEW_LABEL.uz}
                        </span>
                      ),
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm leading-snug">
                  {member.fullname}
                </h3>
                <p className="text-[#013d8c] text-xs mt-1 leading-snug">{member.position}</p>
                <p className="text-gray-500 text-xs mt-1 leading-snug">{member.degree}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CouncilComposition;
