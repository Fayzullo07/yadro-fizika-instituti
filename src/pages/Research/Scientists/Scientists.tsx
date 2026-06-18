import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'antd';
import { useLaboratoryTeamsList } from '@/hooks/useDepartment';
import { useLanguage } from '@/contexts/LanguageContext';
import type { LaboratoryTeamMember } from '@/types';
import Loading from '@/components/shared/Loading/Loading';

const MemberCard: React.FC<{ member: LaboratoryTeamMember; detailLabel: string }> = ({
  member,
  detailLabel,
}) => (
  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-row sm:flex-col">
    <div className="relative overflow-hidden bg-gray-100 w-28 shrink-0 sm:w-auto sm:h-60">
      {member.image ? (
        <>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${member.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(12px)',
              transform: 'scale(1.1)',
            }}
          />
          <div className="relative z-10 flex items-center justify-center h-full w-full">
            <Image
              src={member.image}
              alt={member.full_name}
              width="100%"
              height="100%"
              style={{ inlineSize: '100%', blockSize: '100%', objectFit: 'contain' }}
            />
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-blue-50">
          <svg
            className="w-12 h-12 sm:w-16 sm:h-16 text-blue-200"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </div>
      )}
    </div>
    <div className="p-3 sm:p-4 flex flex-col gap-1 flex-1 min-w-0">
      <p className="font-semibold text-gray-800 text-xs sm:text-sm leading-snug">
        {member.full_name}
      </p>
      <p className="text-xs text-[#013d8c]">{member.position}</p>
      {member.degree && member.degree !== "Yo'q" && (
        <p className="text-xs text-gray-500">{member.degree}</p>
      )}
      <Link
        to={`/research/laboratories/${member.laboratory_id}/staff/${member.id}`}
        className="mt-auto pt-2 text-xs font-medium text-[#013d8c] hover:underline cursor-pointer"
      >
        {detailLabel} →
      </Link>
    </div>
  </div>
);

const Scientists: React.FC = () => {
  const { t } = useLanguage();
  const [page, setPage] = useState(1);
  const { data, loading, error } = useLaboratoryTeamsList({ page });

  const members = data?.data ?? [];
  const lastPage = data?.meta?.last_page ?? 1;

  return (
    <div className="pb-10">
      {loading && <Loading />}
      {error && <p className="text-center py-16 text-gray-500">{t('common.error')}</p>}
      {!loading && !error && members.length === 0 && (
        <p className="text-center py-16 text-gray-400">{t('common.notAvailable')}</p>
      )}
      {!loading && members.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 p-3 sm:p-4">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} detailLabel={t('news.detail')} />
            ))}
          </div>

          {/* Pagination */}
          {lastPage > 1 && (
            <div className="flex items-center justify-center gap-1 mt-6 flex-wrap">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {Array.from({ length: lastPage }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    p === page
                      ? 'bg-[#013d8c] text-white'
                      : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
                disabled={page === lastPage}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Scientists;
