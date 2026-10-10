import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApi } from '@/hooks/useApi';
import { councilApi } from '@/services/api';
import Loading from '@/components/shared/Loading/Loading';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import type { CouncilMember, PaginatedResponse } from '@/types';

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
        <p className="text-center py-16 text-[var(--color-neutral-500)]">
          {t('common.error') || 'Xatolik yuz berdi'}
        </p>
      )}

      {!loading && !error && members.length > 0 && <MembersBlock members={members} />}
    </div>
  );
};

export default CouncilComposition;
