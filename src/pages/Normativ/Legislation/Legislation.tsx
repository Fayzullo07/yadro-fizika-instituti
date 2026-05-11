import EmptyStatePage from '@/components/shared/EmptyStatePage/EmptyStatePage';
import { useLanguage } from '@/contexts/LanguageContext';

const Legislation: React.FC = () => {
  const { t } = useLanguage();

  return (
    <EmptyStatePage
      title={t('nav.normativ.qonunchilik') || 'Institut faoliyat sohasiga oid milliy qonunchilik'}
      comingSoonText={t('pages.announcements.comingSoon') || "Tez orada qo'shiladi"}
      message={t('pages.comingSoonMessage')}
    />
  );
};

export default Legislation;
