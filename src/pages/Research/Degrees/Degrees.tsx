import { useLanguage } from '@/contexts/LanguageContext';
import EmptyStatePage from '@/components/shared/EmptyStatePage/EmptyStatePage';

const Degrees: React.FC = () => {
  const { t } = useLanguage();
  return (
    <EmptyStatePage
      title={t('nav.laboratoriyalar.degrees') || 'Ilmiy darajalar'}
      message={t('pages.comingSoonMessage') || "Ushbu bo'lim hozircha tayyorlanmoqda."}
    />
  );
};

export default Degrees;
