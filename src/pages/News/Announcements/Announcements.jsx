import { useLanguage } from '@/contexts/LanguageContext';
import EmptyStatePage from '@/components/shared/EmptyStatePage/EmptyStatePage';

const Announcements = () => {
  const { t } = useLanguage();

  return (
    <EmptyStatePage
      title={t('nav.media.announcements') || "E'lonlar"}
      comingSoonText={t('pages.announcements.comingSoon') || "Tez orada qo'shiladi"}
      message={
        t('pages.announcements.comingSoonDescription') ||
        "E'lonlar bo'limi hozircha tayyorlanmoqda. Tez orada bu bo'limda barcha e'lonlar bilan tanishishingiz mumkin bo'ladi."
      }
    />
  );
};

export default Announcements;
