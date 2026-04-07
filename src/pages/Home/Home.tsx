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
      {/* Header + Hero + Stats = full screen on desktop */}
      <div className="flex flex-col md:h-[calc(100vh-120px)]">
        <div className="h-[60vh] md:flex-1 md:h-auto md:min-h-0">
          <Hero />
        </div>
        <StatsSection />
      </div>
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
