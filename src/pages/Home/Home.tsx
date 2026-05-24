import Hero from '@/components/Hero/Hero';
import AboutSection from '@/components/AboutSection/AboutSection';
import StatsSection from '@/components/StatsSection/StatsSection';
import FeaturesSection from '@/components/FeaturesSection/FeaturesSection';
import NewsSection from '@/components/NewsSection/NewsSection';
import AnnouncementsSection from '@/components/AnnouncementsSection/AnnouncementsSection';
import PartnersMarquee from '@/components/shared/PartnersMarquee/PartnersMarquee';
import AddressMapSection from '@/components/shared/AddressMapSection/AddressMapSection';
import GallerySection from '@/components/GallerySection/GallerySection';
import VideoGallerySection from '@/components/VideoGallerySection/VideoGallerySection';

const Home: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col">
        <div className="flex-1 min-h-0">
          <Hero />
        </div>
        <StatsSection />
        <PartnersMarquee />
      </div>
      <AboutSection />
      <NewsSection />
      <AnnouncementsSection />
      {/* <LaboratoriesTasks /> */}
      <FeaturesSection />
      <GallerySection />
      <VideoGallerySection />
      <AddressMapSection />
    </div>
  );
};

export default Home;
