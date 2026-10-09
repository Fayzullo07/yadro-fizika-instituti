import HeroB2 from '@/components/HeroB2';
import PartnersStrip from './sections/PartnersStrip';
import NewsCards from './sections/NewsCards';
import GalleryTiles from './sections/GalleryTiles';

const Landing: React.FC = () => (
  <div className="w-full">
    <HeroB2 />
    <PartnersStrip />
    <NewsCards />
    <GalleryTiles />
  </div>
);

export default Landing;
