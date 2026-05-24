import EmptyStatePage from '@/components/shared/EmptyStatePage';
import { useLanguage } from '@/contexts/LanguageContext';

const Doctorate: React.FC = () => {
  const { t } = useLanguage();

  return (
    <EmptyStatePage
      title={t('nav.laboratoriyalar.disertatsiya') || 'Dissertatsiyalar'}
      message={t('pages.comingSoonMessage') || "Ushbu bo'lim hozircha tayyorlanmoqda."}
    />
  );
};

export default Doctorate;
