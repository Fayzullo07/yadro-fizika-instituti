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
      message={t('pages.comingSoonMessage')}
    />
  );
};

export default InstrumentalInspection;
