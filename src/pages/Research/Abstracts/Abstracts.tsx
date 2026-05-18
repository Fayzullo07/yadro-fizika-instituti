import { useLanguage } from '@/contexts/LanguageContext';
import EmptyStatePage from '@/components/shared/EmptyStatePage/EmptyStatePage';

const Abstracts: React.FC = () => {
  const { t } = useLanguage();
  return (
    <EmptyStatePage
      title={t('nav.ilmiyFaoliyat.abstracts') || 'Avtoreferatlar'}
      message={t('pages.comingSoonMessage') || "Ushbu bo'lim hozircha tayyorlanmoqda."}
    />
  );
};

export default Abstracts;
