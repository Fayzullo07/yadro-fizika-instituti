import HeroB2 from '@/components/HeroB2';
import StatsBand from './sections/StatsBand';
import AboutBlock from './sections/AboutBlock';
import NewsBento from './sections/NewsBento';
import AnnouncementsList from './sections/AnnouncementsList';
import EventsTimeline from './sections/EventsTimeline';
import GalleryBento from './sections/GalleryBento';
import VideoCoverflow from './sections/VideoCoverflow';
import PartnersLanes from './sections/PartnersLanes';
import LocationGlass from './sections/LocationGlass';

const Landing: React.FC = () => (
  <div className="w-full">
    <HeroB2 />
    <PartnersLanes />
    <AboutBlock />
    <StatsBand />
    <EventsTimeline />
    <NewsBento />
    <AnnouncementsList />
    <GalleryBento />
    <VideoCoverflow />
    <LocationGlass />
  </div>
);

export default Landing;
