import { RouterProvider, createBrowserRouter, type RouteObject } from 'react-router-dom';
import { Suspense, lazy, type ComponentType } from 'react';
import Loading from '@/components/shared/Loading/Loading';
import MainLayout from '@/components/Layout/MainLayout/MainLayout';
import SidebarLayout from '@/components/Layout/SidebarLayout/SidebarLayout';
import PageLayout from '@/components/Layout/PageLayout/PageLayout';

// Lazy-loaded pages
const Home = lazy(() => import('@/pages/Home/Home'));
const About = lazy(() => import('@/pages/About/About'));
const Services = lazy(() => import('@/pages/Services/Services'));
const Contact = lazy(() => import('@/pages/Contact/Contact'));
const Hotline = lazy(() => import('@/pages/Contact/Hotline'));
const Map = lazy(() => import('@/pages/Contact/Map'));
const International = lazy(() => import('@/pages/Institute/International/International'));
const Council = lazy(() => import('@/pages/Institute/Council/Council'));
const Structure = lazy(() => import('@/pages/Institute/Structure/Structure'));
const Departments = lazy(() => import('@/pages/Institute/Departments/Departments'));
const Documents = lazy(() => import('@/pages/Institute/Documents/Documents'));
const Team = lazy(() => import('@/pages/Institute/Team/Team'));
const Calendar = lazy(() => import('@/pages/Institute/Calendar/Calendar'));
const CentralOffice = lazy(() => import('@/pages/Institute/CentralOffice/CentralOffice'));
const Laboratories = lazy(() => import('@/pages/Research/Laboratories/Laboratories'));
const LaboratoryDetail = lazy(() => import('@/pages/Research/Laboratories/LaboratoryDetail'));
const StaffMemberDetail = lazy(() => import('@/pages/Research/Laboratories/StaffMemberDetail'));
const Doctorate = lazy(() => import('@/pages/Research/Doctorate/Doctorate'));
const Conferences = lazy(() => import('@/pages/Research/Conferences/Conferences'));
const ConferenceDetail = lazy(() => import('@/pages/Research/Conferences/ConferenceDetail'));
const Teachers = lazy(() => import('@/pages/General/Teachers/Teachers'));
const Talented = lazy(() => import('@/pages/General/Talented/Talented'));
const Symbols = lazy(() => import('@/pages/General/Symbols/Symbols'));
const Graduates = lazy(() => import('@/pages/General/Graduates/Graduates'));
const Requisites = lazy(() => import('@/pages/OpenData/Requisites/Requisites'));
const Reception = lazy(() => import('@/pages/OpenData/Reception/Reception'));
const Vacancies = lazy(() => import('@/pages/OpenData/Vacancies/Vacancies'));
const NewsList = lazy(() => import('@/pages/News/NewsList/NewsList'));
const NewsDetail = lazy(() => import('@/pages/News/NewsDetail/NewsDetail'));
const Announcements = lazy(() => import('@/pages/News/Announcements/Announcements'));
const AnnouncementDetail = lazy(() => import('@/pages/News/Announcements/AnnouncementDetail'));
const Gallery = lazy(() => import('@/pages/News/Gallery/Gallery'));
const GalleryDetail = lazy(() => import('@/pages/News/Gallery/GalleryDetail'));
const VideoGallery = lazy(() => import('@/pages/News/VideoGallery/VideoGallery'));
const Events = lazy(() => import('@/pages/News/Events/Events'));
const EventDetail = lazy(() => import('@/pages/News/Events/EventDetail'));
const Constitution = lazy(() => import('@/pages/Normativ/Constitution/Constitution'));
const Decrees = lazy(() => import('@/pages/Normativ/Decrees/Decrees'));
const Laws = lazy(() => import('@/pages/Normativ/Laws/Laws'));
const Legislation = lazy(() => import('@/pages/Normativ/Legislation/Legislation'));
const GovernmentDocuments = lazy(
  () => import('@/pages/Normativ/GovernmentDocuments/GovernmentDocuments')
);
const InternalDocuments = lazy(
  () => import('@/pages/Normativ/InternalDocuments/InternalDocuments')
);
const ProjectDesign = lazy(() => import('@/pages/Engineering/ProjectDesign'));
const InstrumentalInspection = lazy(() => import('@/pages/Engineering/InstrumentalInspection'));
const SeismicConclusion = lazy(() => import('@/pages/Engineering/SeismicConclusion'));
const NotFound = lazy(() => import('@/pages/NotFound/NotFound'));
// New institute pages
const History = lazy(() => import('@/pages/Institute/History/History'));
const Directors = lazy(() => import('@/pages/Institute/Directors/Directors'));
const Charter = lazy(() => import('@/pages/Institute/Charter/Charter'));
const CouncilComposition = lazy(() => import('@/pages/Institute/Council/CouncilComposition'));
const CouncilActivities = lazy(() => import('@/pages/Institute/Council/CouncilActivities'));
// New research pages
const Scientists = lazy(() => import('@/pages/Research/Scientists/Scientists'));
const Degrees = lazy(() => import('@/pages/Research/Degrees/Degrees'));
const Directions = lazy(() => import('@/pages/Research/Directions/Directions'));
const Specialties = lazy(() => import('@/pages/Research/Specialties/Specialties'));
const Articles = lazy(() => import('@/pages/Research/Articles/Articles'));
const Abstracts = lazy(() => import('@/pages/Research/Abstracts/Abstracts'));
const UniqueObjects = lazy(() => import('@/pages/Research/UniqueObjects/UniqueObjects'));
const PublicationDetail = lazy(() => import('@/pages/Research/Publications/PublicationDetail'));

import {
  HOME_PATH,
  ABOUT_PATH,
  SERVICES_PATH,
  CONTACT_PATH,
  HOTLINE_PATH,
  MAP_PATH,
  INTERNATIONAL_PATH,
  COUNCIL_PATH,
  STRUCTURE_PATH,
  DOCUMENTS_PATH,
  TEAM_PATH,
  CALENDAR_PATH,
  LABORATORIES_PATH,
  UNIQUE_OBJECTS_PATH,
  UNIQUE_OBJECT_DETAIL_PATH,
  LABORATORY_DETAIL_PATH,
  LABORATORY_STAFF_DETAIL_PATH,
  DOCTORATE_PATH,
  CONFERENCES_PATH,
  CONFERENCE_DETAIL_PATH,
  TEACHERS_PATH,
  TALENTED_PATH,
  SYMBOLS_PATH,
  GRADUATES_PATH,
  REQUISITES_PATH,
  RECEPTION_PATH,
  VACANCIES_PATH,
  NEWS_PATH,
  NEWS_DETAIL_PATH,
  ANNOUNCEMENTS_PATH,
  ANNOUNCEMENT_DETAIL_PATH,
  GALLERY_PATH,
  GALLERY_DETAIL_PATH,
  VIDEO_GALLERY_PATH,
  EVENTS_PATH,
  EVENT_DETAIL_PATH,
  CONSTITUTION_PATH,
  DECREES_PATH,
  LAWS_PATH,
  LEGISLATION_PATH,
  GOVERNMENT_DOCUMENTS_PATH,
  INTERNAL_DOCUMENTS_PATH,
  CENTRAL_OFFICE_PATH,
  PROJECT_DESIGN_PATH,
  INSTRUMENTAL_INSPECTION_PATH,
  SEISMIC_CONCLUSION_PATH,
  DEPARTMENTS_PATH,
  INSTITUTE_HISTORY_PATH,
  INSTITUTE_DIRECTORS_PATH,
  INSTITUTE_CHARTER_PATH,
  COUNCIL_COMPOSITION_PATH,
  COUNCIL_ACTIVITIES_PATH,
  RESEARCH_SCIENTISTS_PATH,
  RESEARCH_DEGREES_PATH,
  RESEARCH_DIRECTIONS_PATH,
  SPECIALTIES_PATH,
  ARTICLES_PATH,
  ARTICLE_DETAIL_PATH,
  ABSTRACTS_PATH,
  ABSTRACT_DETAIL_PATH,
  DOCTORATE_DETAIL_PATH,
} from './path';

// Wraps a lazy page in its Suspense boundary so each route entry stays a one-liner.
const page = (path: string, Component: ComponentType): RouteObject => ({
  path,
  element: (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  ),
});

const Routers = () => {
  const router = createBrowserRouter([
    {
      path: HOME_PATH,
      element: <MainLayout />,
      children: [
        page(HOME_PATH, Home),
        {
          element: <PageLayout />,
          children: [page(SERVICES_PATH, Services), page(GALLERY_DETAIL_PATH, GalleryDetail)],
        },
        page('*', NotFound),
        {
          element: <SidebarLayout />,
          children: [
            page(ABOUT_PATH, About),
            page(CONTACT_PATH, Contact),
            // Institute routes
            page(INTERNATIONAL_PATH, International),
            page(COUNCIL_PATH, Council),
            page(STRUCTURE_PATH, Structure),
            page(DOCUMENTS_PATH, Documents),
            page(TEAM_PATH, Team),
            page(CALENDAR_PATH, Calendar),
            page(CENTRAL_OFFICE_PATH, CentralOffice),
            page(DEPARTMENTS_PATH, Departments),
            // New institute pages
            page(INSTITUTE_HISTORY_PATH, History),
            page(INSTITUTE_DIRECTORS_PATH, Directors),
            page(INSTITUTE_CHARTER_PATH, Charter),
            page(COUNCIL_COMPOSITION_PATH, CouncilComposition),
            page(COUNCIL_ACTIVITIES_PATH, CouncilActivities),
            // Research routes
            page(LABORATORY_DETAIL_PATH, LaboratoryDetail),
            page(UNIQUE_OBJECT_DETAIL_PATH, LaboratoryDetail),
            page(LABORATORY_STAFF_DETAIL_PATH, StaffMemberDetail),
            page(UNIQUE_OBJECTS_PATH, UniqueObjects),
            page(LABORATORIES_PATH, Laboratories),
            page(DOCTORATE_PATH, Doctorate),
            page(CONFERENCES_PATH, Conferences),
            page(CONFERENCE_DETAIL_PATH, ConferenceDetail),
            // New research pages
            page(RESEARCH_SCIENTISTS_PATH, Scientists),
            page(RESEARCH_DEGREES_PATH, Degrees),
            page(RESEARCH_DIRECTIONS_PATH, Directions),
            page(SPECIALTIES_PATH, Specialties),
            page(ARTICLES_PATH, Articles),
            page(ARTICLE_DETAIL_PATH, PublicationDetail),
            page(ABSTRACTS_PATH, Abstracts),
            page(ABSTRACT_DETAIL_PATH, PublicationDetail),
            page(DOCTORATE_DETAIL_PATH, PublicationDetail),
            // Engineering routes
            page(PROJECT_DESIGN_PATH, ProjectDesign),
            page(INSTRUMENTAL_INSPECTION_PATH, InstrumentalInspection),
            page(SEISMIC_CONCLUSION_PATH, SeismicConclusion),
            // General Information routes
            page(TEACHERS_PATH, Teachers),
            page(TALENTED_PATH, Talented),
            page(SYMBOLS_PATH, Symbols),
            page(GRADUATES_PATH, Graduates),
            // Open Data routes
            page(REQUISITES_PATH, Requisites),
            page(VACANCIES_PATH, Vacancies),
            page(RECEPTION_PATH, Reception),
            // News routes
            page(NEWS_DETAIL_PATH, NewsDetail),
            page(NEWS_PATH, NewsList),
            page(ANNOUNCEMENTS_PATH, Announcements),
            page(ANNOUNCEMENT_DETAIL_PATH, AnnouncementDetail),
            page(GALLERY_PATH, Gallery),
            page(VIDEO_GALLERY_PATH, VideoGallery),
            page(EVENTS_PATH, Events),
            page(EVENT_DETAIL_PATH, EventDetail),
            // Contact routes
            page(MAP_PATH, Map),
            page(HOTLINE_PATH, Hotline),
            // Normativ routes
            page(CONSTITUTION_PATH, Constitution),
            page(LAWS_PATH, Laws),
            page(DECREES_PATH, Decrees),
            page(LEGISLATION_PATH, Legislation),
            page(GOVERNMENT_DOCUMENTS_PATH, GovernmentDocuments),
            page(INTERNAL_DOCUMENTS_PATH, InternalDocuments),
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routers;
