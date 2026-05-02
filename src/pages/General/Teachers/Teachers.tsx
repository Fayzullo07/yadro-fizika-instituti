import { useLanguage } from '@/contexts/LanguageContext';
import { useTeams } from '@/hooks/useDepartment';
import Loading from '@/components/shared/Loading/Loading';
import type { TeamMember } from '@/types';
import PageTitle from '@/components/shared/PageTitle/PageTitle';

const Teachers: React.FC = () => {
  const { t } = useLanguage();
  const { data: teamsData, loading, error } = useTeams();

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

  const teams: TeamMember[] = teamsData?.results || [];

  return (
    <div className="min-h-screen">
      <div>
        {/* Title */}
        <PageTitle>{t('nav.umumiy.teachers') || 'Institut jamoasi'}</PageTitle>

        {/* Team Members List */}
        {teams.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-1 gap-4">
            {teams.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-gray-300 rounded-[1px] p-7 flex items-center gap-6"
              >
                {/* Photo - Left Side */}
                <div className="flex-shrink-0">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.fullname}
                      loading="lazy"
                      className="w-26 h-26 md:w-32 md:h-32 object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-24 h-24 md:w-28 md:h-28 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg
                        className="w-12 h-12 md:w-16 md:h-16 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Center - Name, Position, and Button */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 break-words">
                    {member.fullname}
                  </h3>
                  {member.position && (
                    <p className="text-sm md:text-base text-gray-600 mb-3 break-words">
                      {member.position}
                    </p>
                  )}
                  <button className="bg-[#013d8c] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#0152a3] transition-colors">
                    {t('leadership.responsibilities') || 'Vazifalari'}
                  </button>
                </div>

                {/* Right Side - Contact Info */}
                <div className="flex-shrink-0 flex flex-col gap-3 text-sm">
                  {/* Phone */}
                  {member.phone && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <svg
                        className="w-5 h-5 text-[#013d8c]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <a
                        href={`tel:${member.phone.replace(/\s/g, '')}`}
                        className="hover:text-[#013d8c] transition-colors"
                      >
                        {member.phone}
                      </a>
                    </div>
                  )}

                  {/* Email */}
                  {member.email && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <svg
                        className="w-5 h-5 text-[#013d8c]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <a
                        href={`mailto:${member.email}`}
                        className="hover:text-[#013d8c] transition-colors"
                      >
                        {member.email}
                      </a>
                    </div>
                  )}

                  {/* LinkedIn */}
                  {member.linkedin && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <svg
                        className="w-5 h-5 text-[#013d8c]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#013d8c] transition-colors"
                      >
                        LinkedIn
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            <p>{t('pages.team.noMembers') || "Jamoasi a'zolari topilmadi"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teachers;
