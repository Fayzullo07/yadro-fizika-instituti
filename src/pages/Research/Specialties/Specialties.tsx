import { useLanguage } from '@/contexts/LanguageContext';
import EmptyStatePage from '@/components/shared/EmptyStatePage/EmptyStatePage';

const Specialties: React.FC = () => {
  const { t } = useLanguage();
  return (
    <EmptyStatePage
      title={t('nav.ilmiyFaoliyat.specialties') || 'Ixtisosliklar pasportlari'}
      message={t('pages.comingSoonMessage') || "Ushbu bo'lim hozircha tayyorlanmoqda."}
    />
  );
};

export default Specialties;
