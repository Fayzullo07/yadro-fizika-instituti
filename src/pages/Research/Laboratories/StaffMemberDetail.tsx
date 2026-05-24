import { useParams } from 'react-router-dom';
import { Image } from 'antd';
import { useLaboratoryTeamMember } from '@/hooks/useDepartment';
import Loading from '@/components/shared/Loading/Loading';

const academicLinks = [
  {
    key: 'google_scholar' as const,
    label: 'Google Scholar',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5h3.6v7.8c0 .9.7 1.7 1.6 1.7h13.6c.9 0 1.6-.8 1.6-1.7V9.5H24L12 0z" />
      </svg>
    ),
    color: '#4285F4',
    bg: '#EAF1FB',
  },
  {
    key: 'web_of_science' as const,
    label: 'Web of Science',
    icon: <span className="text-sm font-bold">WoS</span>,
    color: '#CC0000',
    bg: '#FDEAEA',
  },
  {
    key: 'scopus' as const,
    label: 'Scopus',
    icon: <span className="text-sm font-bold">SC</span>,
    color: '#E9711C',
    bg: '#FEF0E6',
  },
  {
    key: 'researchgate' as const,
    label: 'ResearchGate',
    icon: <span className="text-sm font-bold">Rg</span>,
    color: '#00CCBB',
    bg: '#E6FAF8',
  },
  {
    key: 'orcid' as const,
    label: 'ORCID',
    icon: <span className="text-sm font-bold">iD</span>,
    color: '#A6CE39',
    bg: '#F4FAE6',
  },
] as const;

const StaffMemberDetail: React.FC = () => {
  const { memberId } = useParams<{ labId: string; memberId: string }>();
  const { data, loading, error } = useLaboratoryTeamMember(memberId || '');

  if (loading) return <Loading />;
  if (error || !data?.data) {
    return (
      <div className="text-center py-16 text-gray-500">
        {error ? 'Xatolik yuz berdi' : "Ma'lumot topilmadi"}
      </div>
    );
  }

  const member = data.data;
  const links = academicLinks.filter((l) => member[l.key]);

  return (
    <div className="pb-10">
      {/* Profile card */}
      <div className="bg-white shadow-sm mb-4">
        <div className="p-6 flex flex-col sm:flex-row gap-6">
          {/* Photo */}
          <div className="shrink-0 self-start">
            <div
              className="relative overflow-hidden bg-gray-100 border border-gray-200"
              style={{ inlineSize: 160, blockSize: 200 }}
            >
              {member.image ? (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${member.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'blur(10px)',
                      transform: 'scale(1.1)',
                    }}
                  />
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <Image
                      src={member.image}
                      alt={member.full_name}
                      style={{ inlineSize: 160, blockSize: 200, objectFit: 'contain' }}
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
          </div>

          {/* Info */}
          <div className="flex flex-col gap-3 flex-1">
            <h1 className="text-xl font-bold text-gray-900 leading-snug">{member.full_name}</h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              {member.position && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 6h-2.18c.07-.44.18-.88.18-1.34C18 2.54 15.96.5 13.5.5c-1.3 0-2.48.56-3.33 1.45L9 3.17l-1.17-1.2C6.98 1.06 5.8.5 4.5.5 2.04.5 0 2.54 0 4.66c0 .46.11.9.18 1.34H0C0 6 0 20 0 20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" />
                  </svg>
                  {member.position}
                </span>
              )}
              {member.degree && member.degree !== "Yo'q" && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm-4 9.5v4L12 19l4-2.5v-4L12 15l-4-2.5z" />
                  </svg>
                  {member.degree}
                </span>
              )}
            </div>

            {/* Academic links */}
            {links.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {links.map((l) => (
                  <a
                    key={l.key}
                    href={member[l.key]!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 border rounded text-sm font-medium transition-opacity hover:opacity-80"
                    style={{ borderColor: l.color, color: l.color, background: l.bg }}
                  >
                    {l.icon}
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffMemberDetail;
