import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScientificCouncil, useCouncilMembers } from '@/hooks/useCouncil';
import { sanitizeHtml } from '@/utils/htmlUtils';
import Loading from '@/components/shared/Loading/Loading';
import type { ScientificCouncil, CouncilMember } from '@/types';
import PageTitle from '@/components/shared/PageTitle/PageTitle';

const initialsOf = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

const Avatar: React.FC<{ photo?: string; name: string; size: number; className?: string }> = ({
  photo,
  name,
  size,
  className = '',
}) => {
  const [failed, setFailed] = useState(false);
  return (
    <div
      style={{ width: size, height: size }}
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-full)] font-bold ${className}`}
    >
      {photo && !failed ? (
        <img
          src={photo}
          alt={name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-105 motion-reduce:transition-none"
        />
      ) : (
        <span style={{ fontSize: size / 3 }}>{initialsOf(name)}</span>
      )}
    </div>
  );
};

const SpotlightCard: React.FC<{ member: CouncilMember }> = ({ member }) => (
  <div className="group flex flex-col items-center gap-[var(--space-6)] rounded-[var(--radius-lg)] bg-[var(--color-brand-950)] p-8 text-center shadow-[var(--shadow-card)] sm:flex-row sm:p-10 sm:text-left">
    <Avatar
      photo={member.photo}
      name={member.fullname}
      size={180}
      className="bg-[var(--color-brand-700)] text-[var(--color-neutral-0)]"
    />
    <div className="min-w-0">
      {member.position && (
        <p className="mb-[var(--space-2)] text-sm font-semibold uppercase tracking-wide text-[var(--color-accent-500)]">
          {member.position}
        </p>
      )}
      <h2 className="text-3xl font-extrabold leading-tight text-[var(--color-neutral-0)] sm:text-4xl">
        {member.fullname}
      </h2>
      {member.degree && (
        <p className="mt-[var(--space-3)] text-base leading-relaxed text-[var(--color-neutral-300)]">
          {member.degree}
        </p>
      )}
    </div>
  </div>
);

const PersonCard: React.FC<{ member: CouncilMember }> = ({ member }) => (
  <div className="group flex items-start gap-[var(--space-4)] rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-5 shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0">
    <Avatar
      photo={member.photo}
      name={member.fullname}
      size={72}
      className="bg-[var(--color-brand-100)] text-[var(--color-brand-700)]"
    />
    <div className="min-w-0">
      <h4 className="text-base font-bold leading-snug text-[var(--color-neutral-900)] break-words">
        {member.fullname}
      </h4>
      {member.position && (
        <p className="mt-1 text-sm text-[var(--color-neutral-500)] break-words">
          {member.position}
        </p>
      )}
      {member.degree && (
        <p className="mt-1 text-sm text-[var(--color-neutral-500)] break-words">{member.degree}</p>
      )}
    </div>
  </div>
);

const MembersBlock: React.FC<{ members: CouncilMember[] }> = ({ members }) => {
  const [first, ...rest] = members;
  if (!first) return null;
  return (
    <div className="flex flex-col gap-[var(--space-6)]">
      <SpotlightCard member={first} />
      {rest.length > 0 && (
        <div className="grid grid-cols-1 gap-[var(--space-4)] md:grid-cols-2 lg:grid-cols-3">
          {rest.map((m) => (
            <PersonCard key={m.id} member={m} />
          ))}
        </div>
      )}
    </div>
  );
};

const Council: React.FC = () => {
  const { t } = useLanguage();
  const { data: scientificCouncilData, loading: councilLoading } = useScientificCouncil();
  const { data: membersData, loading: membersLoading } = useCouncilMembers();

  const loading: boolean = councilLoading || membersLoading;
  const scientificCouncil: ScientificCouncil | undefined = scientificCouncilData?.data;
  const members: CouncilMember[] = membersData?.data || [];

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="pb-8 md:pb-12">
        <PageTitle>
          {scientificCouncil?.title ? (
            <span dangerouslySetInnerHTML={{ __html: sanitizeHtml(scientificCouncil.title) }} />
          ) : (
            t('nav.institute.council') || 'ILMIY KENGASH'
          )}
        </PageTitle>

        {/* Header Image */}
        {scientificCouncil?.image && (
          <div className="mb-[var(--space-6)] overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-card)]">
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
          <div className="mb-[var(--space-8)] rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-6 shadow-[var(--shadow-card)] sm:p-8">
            <div
              className="prose prose-lg max-w-none text-[var(--color-neutral-700)] leading-relaxed [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-[var(--color-neutral-900)] [&_h3]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:text-base [&_li]:md:text-lg [&_em]:not-italic"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(scientificCouncil.council_duties) }}
            />
          </div>
        )}

        {/* Council Members Section */}
        {members.length > 0 && <MembersBlock members={members} />}
      </div>
    </div>
  );
};

export default Council;
