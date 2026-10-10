import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import type { LaboratoryTeamMember } from '@/types';

const initialsOf = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

const MemberCard: React.FC<{
  member: LaboratoryTeamMember;
  labId: number;
  detailLabel: string;
}> = ({ member, labId, detailLabel }) => {
  const [failed, setFailed] = useState(false);
  const showPhoto = !!member.image && !failed;

  return (
    <Link
      to={`/research/laboratories/${labId}/staff/${member.id}`}
      className="group flex items-start gap-[var(--space-4)] rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-5 shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-full)] bg-[var(--color-brand-100)] text-xl font-bold text-[var(--color-brand-700)]">
        {showPhoto ? (
          <img
            src={member.image}
            alt={member.full_name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-105 motion-reduce:transition-none"
          />
        ) : (
          initialsOf(member.full_name)
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h4 className="text-base font-bold leading-snug text-[var(--color-neutral-900)]">
          {member.full_name}
        </h4>
        <p className="text-sm text-[var(--color-neutral-500)]">{member.position}</p>
        {member.degree && member.degree !== "Yo'q" && (
          <p className="text-sm text-[var(--color-neutral-500)]">{member.degree}</p>
        )}
        <span className="mt-1 text-sm font-semibold text-[var(--color-brand-700)]">
          {detailLabel} →
        </span>
      </div>
    </Link>
  );
};

const StaffTab: React.FC<{
  laboratoryId: number;
  members: LaboratoryTeamMember[];
  loading: boolean;
  error: boolean;
}> = ({ laboratoryId, members, loading, error }) => {
  const { t } = useLanguage();

  return (
    <div
      className={`transition-opacity duration-200 ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
    >
      {error && (
        <p className="text-center py-16 text-[var(--color-neutral-500)]">{t('common.error')}</p>
      )}
      {!error && !loading && members.length === 0 && (
        <p className="text-center py-16 text-[var(--color-neutral-500)]">
          {t('common.notAvailable')}
        </p>
      )}
      {members.length > 0 && (
        <div className="grid grid-cols-1 gap-[var(--space-4)] md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              labId={laboratoryId}
              detailLabel={t('news.detail')}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StaffTab;
