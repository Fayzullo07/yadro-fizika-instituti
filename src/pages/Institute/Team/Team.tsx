import { useLanguage } from '@/contexts/LanguageContext';
import LeadershipTeam from '@/components/shared/LeadershipTeam/LeadershipTeam';

const Team: React.FC = () => {
  const { t } = useLanguage();

  return (
    <LeadershipTeam
      title={t('nav.institute.leadership') || 'JAMOA'}
      emptyMessage={t('pages.team.noMembers') || 'Jamoasi a\'zolari topilmadi'}
    />
  );
};

export default Team;

