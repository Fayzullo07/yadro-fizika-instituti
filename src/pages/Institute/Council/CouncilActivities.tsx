import { useLanguage } from '@/contexts/LanguageContext';
import EmptyStatePage from '@/components/shared/EmptyStatePage/EmptyStatePage';

const CouncilActivities: React.FC = () => {
  const { t } = useLanguage();
  return (
    <EmptyStatePage
      title={t('nav.ilmiyFaoliyat.councilActivities') || 'Ilmiy kengash faoliyati'}
      message={t('pages.comingSoonMessage') || "Ushbu bo'lim hozircha tayyorlanmoqda."}
    />
  );
};

export default CouncilActivities;
