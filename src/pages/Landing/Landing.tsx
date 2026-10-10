import HeroB2 from '@/components/HeroB2';
import StatsBand from './sections/StatsBand';
import AboutBlock from './sections/AboutBlock';
import NewsBento from './sections/NewsBento';
import AnnouncementsList from './sections/AnnouncementsList';
import EventsTimeline from './sections/EventsTimeline';
import GalleryBento from './sections/GalleryBento';
import VideoCinema from './sections/VideoCinema';
import PartnersLanes from './sections/PartnersLanes';
import LocationGlass from './sections/LocationGlass';

const Landing: React.FC = () => (
  <div className="w-full">
    <HeroB2 />
    <StatsBand />
    <AboutBlock />
    <PartnersLanes />
    <NewsBento />
    <AnnouncementsList />
    <EventsTimeline />
    <GalleryBento />
    <VideoCinema />
    <LocationGlass />
  </div>
);

export default Landing;
