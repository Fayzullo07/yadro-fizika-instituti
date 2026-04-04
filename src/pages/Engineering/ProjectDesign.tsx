import EmptyStatePage from '@/components/shared/EmptyStatePage/EmptyStatePage';
import { useLanguage } from '@/contexts/LanguageContext';

const ProjectDesign = () => {
  const { t } = useLanguage();

  return (
    <EmptyStatePage
      title={t('nav.xizmatlar.Loyihalash') || 'Loyihalash'}
      comingSoonText={t('pages.announcements.comingSoon') || "Tez orada qo'shiladi"}
      message="Loyihalash bo'limi hozircha tayyorlanmoqda. Tez orada bu bo'limda barcha ma'lumotlar bilan tanishishingiz mumkin bo'ladi."
    />
  );
};

export default ProjectDesign;
