import EmptyStatePage from '@/components/shared/EmptyStatePage/EmptyStatePage';
import { useLanguage } from '@/contexts/LanguageContext';

const ZilzilabardoshlikXulosa = () => {
  const { t } = useLanguage();

  return (
    <EmptyStatePage
      title={
        t('nav.xizmatlar.Zilzilabardoshlikboʻyichailmiyxulosaberish') ||
        "Zilzilabardoshlik bo'yicha ilmiy xulosa berish"
      }
      comingSoonText={t('pages.announcements.comingSoon') || "Tez orada qo'shiladi"}
      message="Ushbu bo'lim hozircha tayyorlanmoqda. Tez orada bu bo'limda barcha ma'lumotlar bilan tanishishingiz mumkin bo'ladi."
    />
  );
};

export default ZilzilabardoshlikXulosa;
