import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLeadership } from '@/hooks/useDepartment';
import Loading from '@/components/shared/Loading/Loading';
import MemberCardList from '@/components/shared/MemberCardList/MemberCardList';
import PageTitle from '@/components/shared/PageTitle/PageTitle';

interface LeadershipTeamProps {
  title: string;
  emptyMessage?: string;
}

const LeadershipTeam: React.FC<LeadershipTeamProps> = ({ title, emptyMessage }) => {
  const { t } = useLanguage();
  const { data: leadershipData, loading, error } = useLeadership();

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

  const leadership = (leadershipData?.results || []).map((member) => ({
    ...member,
    fullname: member.full_name,
    photo: member.image,
  }));

  return (
    <div className="min-h-screen">
      <div>
        <PageTitle>{title}</PageTitle>
        <MemberCardList
          members={leadership}
          showReceptionHours
          emptyMessage={emptyMessage || "Jamoasi a'zolari topilmadi"}
        />
      </div>
    </div>
  );
};

export default LeadershipTeam;
