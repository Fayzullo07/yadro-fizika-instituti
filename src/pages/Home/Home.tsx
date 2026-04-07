import Hero from '@/components/Hero/Hero';
import AboutSection from '@/components/AboutSection/AboutSection';
import StatsSection from '@/components/StatsSection/StatsSection';
import FeaturesSection from '@/components/FeaturesSection/FeaturesSection';
import NewsSection from '@/components/NewsSection/NewsSection';
import PartnersMarquee from '@/components/shared/PartnersMarquee/PartnersMarquee';
import AddressMapSection from '@/components/shared/AddressMapSection/AddressMapSection';
import LaboratoriesTasks from '@/components/LaboratoriesTasks/LaboratoriesTasks';

const Home: React.FC = () => {
  return (
    <div className="w-full">
      <div className="h-[60vh] md:h-[calc(100dvh-90px)]">
        <Hero />
      </div>
      <StatsSection />
      <AboutSection />
      <LaboratoriesTasks />
      <NewsSection />
      <FeaturesSection />
      <PartnersMarquee />
      <AddressMapSection />
    </div>
  );
};

export default Home;
