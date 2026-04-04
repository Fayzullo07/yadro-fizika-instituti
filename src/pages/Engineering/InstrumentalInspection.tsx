import EmptyStatePage from '@/components/shared/EmptyStatePage/EmptyStatePage';
import { useLanguage } from '@/contexts/LanguageContext';

const InstrumentalInspection = () => {
  const { t } = useLanguage();

  return (
    <EmptyStatePage
      title={
        t('nav.xizmatlar.Instrumentaltexniktekshiruvniotkazish') ||
        "Instrumental texnik tekshiruvni o'tkazish"
      }
      comingSoonText={t('pages.announcements.comingSoon') || "Tez orada qo'shiladi"}
      message="Ushbu bo'lim hozircha tayyorlanmoqda. Tez orada bu bo'limda barcha ma'lumotlar bilan tanishishingiz mumkin bo'ladi."
    />
  );
};

export default InstrumentalInspection;
