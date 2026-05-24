import { Link } from 'react-router-dom';
import { Image } from 'antd';
import { useLaboratoryTeams } from '@/hooks/useDepartment';
import type { LaboratoryTeamMember } from '@/types';

const MemberCard: React.FC<{ member: LaboratoryTeamMember; labId: number }> = ({
  member,
  labId,
}) => (
  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
    <div className="relative overflow-hidden bg-gray-100" style={{ blockSize: 220 }}>
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
          <div className="relative z-10 flex items-center justify-center h-full">
            <Image
              src={member.image}
              alt={member.full_name}
              style={{ blockSize: 220, inlineSize: '100%', objectFit: 'contain' }}
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
    <div className="p-4 flex flex-col gap-1 flex-1">
      <p className="font-semibold text-gray-800 text-sm leading-snug">{member.full_name}</p>
      <p className="text-xs text-[#013d8c]">{member.position}</p>
      {member.degree && member.degree !== "Yo'q" && (
        <p className="text-xs text-gray-500">{member.degree}</p>
      )}
      <Link
        to={`/research/laboratories/${labId}/staff/${member.id}`}
        className="mt-auto pt-2 text-xs font-medium text-[#013d8c] hover:underline cursor-pointer"
      >
        Batafsil →
      </Link>
    </div>
  </div>
);

const StaffTab: React.FC<{ laboratoryId: number }> = ({ laboratoryId }) => {
  const { data, loading, error } = useLaboratoryTeams(laboratoryId);

  const members = data?.data ?? [];

  return (
    <div
      className={`transition-opacity duration-200 ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
    >
      {error && <p className="text-center py-16 text-gray-500">Xatolik yuz berdi</p>}
      {!error && !loading && members.length === 0 && (
        <p className="text-center py-16 text-gray-400">Ma'lumot mavjud emas</p>
      )}
      {members.length > 0 && (
        <div className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} labId={laboratoryId} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffTab;
