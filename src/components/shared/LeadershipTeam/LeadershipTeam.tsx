import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLeadership } from '@/hooks/useDepartment';
import Loading from '@/components/shared/Loading/Loading';
import MemberCardList from '@/components/shared/MemberCardList/MemberCardList';

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

  const leadership = leadershipData?.results || [];

  return (
    <div className="min-h-[calc(100vh-208px)] mt-10 bg-white">
      <div className="max-w-[900px] mx-auto px-4">
        <h1 className="text-2xl md:text-5xl font-semibold text-gray-900 mb-8 text-center">
          {title}
        </h1>
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
