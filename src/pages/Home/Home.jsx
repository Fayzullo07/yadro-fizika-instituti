import Hero from '@/components/Hero/Hero';
import FeaturesSection from '@/components/FeaturesSection/FeaturesSection';
import NewsSection from '@/components/NewsSection/NewsSection';
import PartnersMarquee from '@/components/shared/PartnersMarquee/PartnersMarquee';
import AddressMapSection from '@/components/shared/AddressMapSection/AddressMapSection';
import LaboratoriesTasks from '@/components/LaboratoriesTasks/LaboratoriesTasks';

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <LaboratoriesTasks />
      <NewsSection />
      <FeaturesSection />
      <PartnersMarquee />
      <AddressMapSection />
    </div>
  );
};

export default Home;

