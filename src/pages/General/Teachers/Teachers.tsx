import { useLanguage } from '@/contexts/LanguageContext';
import EmptyStatePage from '@/components/shared/EmptyStatePage/EmptyStatePage';

const Teachers: React.FC = () => {
  const { t } = useLanguage();
  return (
    <EmptyStatePage
      title={t('nav.umumiy.teachers') || 'Xodimlar profili'}
      message={t('pages.comingSoonMessage') || "Ushbu bo'lim hozircha tayyorlanmoqda."}
    />
  );
};

export default Teachers;
