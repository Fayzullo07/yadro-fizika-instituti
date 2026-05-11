import EmptyStatePage from '@/components/shared/EmptyStatePage/EmptyStatePage';
import { useLanguage } from '@/contexts/LanguageContext';

const SeismicConclusion = () => {
  const { t } = useLanguage();

  return (
    <EmptyStatePage
      title={
        t('nav.xizmatlar.Zilzilabardoshlikboʻyichailmiyxulosaberish') ||
        "Zilzilabardoshlik bo'yicha ilmiy xulosa berish"
      }
      comingSoonText={t('pages.announcements.comingSoon') || "Tez orada qo'shiladi"}
      message={t('pages.comingSoonMessage')}
    />
  );
};

export default SeismicConclusion;
