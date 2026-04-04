import { useLanguage } from '@/contexts/LanguageContext';
import { useScientificCouncil, useCouncilMembers } from '@/hooks/useCouncil';
import { sanitizeHtml } from '@/utils/htmlUtils';
import Loading from '@/components/shared/Loading/Loading';
import SectionHeader from '@/components/shared/SectionHeader/SectionHeader';
import type { ScientificCouncil, CouncilMember } from '@/types';

const Council: React.FC = () => {
  const { t } = useLanguage();
  const { data: scientificCouncilData, loading: councilLoading } = useScientificCouncil();
  const { data: membersData, loading: membersLoading } = useCouncilMembers();

  const loading: boolean = councilLoading || membersLoading;
  const scientificCouncil: ScientificCouncil | undefined = scientificCouncilData?.results?.[0];
  const members: CouncilMember[] = membersData?.results || [];

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase">
            {scientificCouncil?.title ? (
              <div
                className=""
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(scientificCouncil.title) }}
              />
            ) : (
              t('nav.institute.council') || 'ILMIY KENGASH'
            )}
          </h1>
        </div>

        {/* Header Image */}
        {scientificCouncil?.image && (
          <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
            <img
              src={scientificCouncil.image}
              alt="Ilmiy kengash"
              loading="lazy"
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Council Description */}
        {scientificCouncil?.council_duties && (
          <div className="max-w-4xl mx-auto mb-12">
            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:text-base [&_li]:md:text-lg [&_em]:not-italic"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(scientificCouncil.council_duties) }}
            />
          </div>
        )}

        {/* Council Members Section */}
        {members.length > 0 && (
          <div className="mt-16">
            {/* <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              {t('pages.council.members') || 'Ilmiy kengash tarkibi:'}
            </h2> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
              {members.map((member) => (
                <div key={member.id} className="">
                  <div className="flex items-center gap-4">
                    {/* Photo */}
                    <div className="flex-shrink-0">
                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={member.fullname}
                          loading="lazy"
                          className="w-32 h-32 md:w-36 md:h-36 object-cover rounded"
                        />
                      ) : (
                        <div className="w-28 h-28 md:w-32 md:h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-16 h-16 text-gray-400"
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

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-2xl font-semibold text-gray-900 mb-2 break-words">
                        {member.fullname}
                      </h3>
                      {member.degree && (
                        <p className="text-sm md:text-base text-gray-700 mb-2 break-words">
                          {member.degree}
                        </p>
                      )}
                      {member.position && (
                        <p className="text-sm md:text-base text-blue-600 font-semibold break-words">
                          {member.position}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Council;
