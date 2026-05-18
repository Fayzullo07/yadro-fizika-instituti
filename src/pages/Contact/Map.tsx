import { useLanguage } from '@/contexts/LanguageContext';
import AddressMapSection from '@/components/shared/AddressMapSection/AddressMapSection';
import PageTitle from '@/components/shared/PageTitle/PageTitle';

const Map: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div>
      <PageTitle>{t('nav.boglanish.map') || 'Xarita'}</PageTitle>
      <AddressMapSection />
    </div>
  );
};

export default Map;
