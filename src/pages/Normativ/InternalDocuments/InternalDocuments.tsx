import EmptyStatePage from '@/components/shared/EmptyStatePage/EmptyStatePage';
import { useLanguage } from '@/contexts/LanguageContext';

const InternalDocuments: React.FC = () => {
  const { t } = useLanguage();

  return (
    <EmptyStatePage
      title={t('nav.normativ.ichki') || 'Institut ichki hujjatlari'}
      comingSoonText={t('pages.announcements.comingSoon') || "Tez orada qo'shiladi"}
      message={t('pages.comingSoonMessage')}
    />
  );
};

export default InternalDocuments;
