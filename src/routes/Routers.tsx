import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
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

const Routers = () => {
  const router = createBrowserRouter([
    {
      path: HOME_PATH,
      element: <MainLayout />,
      children: [
        {
          path: HOME_PATH,
          element: (
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          ),
        },
        {
          element: <PageLayout />,
          children: [
            {
              path: SERVICES_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Services />
                </Suspense>
              ),
            },
            {
              path: GALLERY_DETAIL_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <GalleryDetail />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: '*',
          element: (
            <Suspense fallback={<Loading />}>
              <NotFound />
            </Suspense>
          ),
        },
        {
          element: <SidebarLayout />,
          children: [
            {
              path: ABOUT_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <About />
                </Suspense>
              ),
            },
            {
              path: CONTACT_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Contact />
                </Suspense>
              ),
            },
            // Institute routes
            {
              path: INTERNATIONAL_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <International />
                </Suspense>
              ),
            },
            {
              path: COUNCIL_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Council />
                </Suspense>
              ),
            },
            {
              path: STRUCTURE_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Structure />
                </Suspense>
              ),
            },
            {
              path: DOCUMENTS_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Documents />
                </Suspense>
              ),
            },
            {
              path: TEAM_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Team />
                </Suspense>
              ),
            },
            {
              path: CALENDAR_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Calendar />
                </Suspense>
              ),
            },
            {
              path: CENTRAL_OFFICE_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <CentralOffice />
                </Suspense>
              ),
            },
            {
              path: DEPARTMENTS_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Departments />
                </Suspense>
              ),
            },
            // New institute pages
            {
              path: INSTITUTE_HISTORY_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <History />
                </Suspense>
              ),
            },
            {
              path: INSTITUTE_DIRECTORS_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Directors />
                </Suspense>
              ),
            },
            {
              path: INSTITUTE_CHARTER_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Charter />
                </Suspense>
              ),
            },
            {
              path: COUNCIL_COMPOSITION_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <CouncilComposition />
                </Suspense>
              ),
            },
            {
              path: COUNCIL_ACTIVITIES_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <CouncilActivities />
                </Suspense>
              ),
            },
            // Research routes
            {
              path: LABORATORY_DETAIL_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <LaboratoryDetail />
                </Suspense>
              ),
            },
            {
              path: UNIQUE_OBJECT_DETAIL_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <LaboratoryDetail />
                </Suspense>
              ),
            },
            {
              path: LABORATORY_STAFF_DETAIL_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <StaffMemberDetail />
                </Suspense>
              ),
            },
            {
              path: UNIQUE_OBJECTS_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <UniqueObjects />
                </Suspense>
              ),
            },
            {
              path: LABORATORIES_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Laboratories />
                </Suspense>
              ),
            },
            {
              path: DOCTORATE_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Doctorate />
                </Suspense>
              ),
            },
            {
              path: CONFERENCES_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Conferences />
                </Suspense>
              ),
            },
            {
              path: CONFERENCE_DETAIL_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <ConferenceDetail />
                </Suspense>
              ),
            },
            // New research pages
            {
              path: RESEARCH_SCIENTISTS_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Scientists />
                </Suspense>
              ),
            },
            {
              path: RESEARCH_DEGREES_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Degrees />
                </Suspense>
              ),
            },
            {
              path: RESEARCH_DIRECTIONS_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Directions />
                </Suspense>
              ),
            },
            {
              path: SPECIALTIES_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Specialties />
                </Suspense>
              ),
            },
            {
              path: ARTICLES_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Articles />
                </Suspense>
              ),
            },
            {
              path: ARTICLE_DETAIL_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <PublicationDetail />
                </Suspense>
              ),
            },
            {
              path: ABSTRACTS_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Abstracts />
                </Suspense>
              ),
            },
            {
              path: ABSTRACT_DETAIL_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <PublicationDetail />
                </Suspense>
              ),
            },
            {
              path: DOCTORATE_DETAIL_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <PublicationDetail />
                </Suspense>
              ),
            },
            // Engineering routes
            {
              path: PROJECT_DESIGN_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <ProjectDesign />
                </Suspense>
              ),
            },
            {
              path: INSTRUMENTAL_INSPECTION_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <InstrumentalInspection />
                </Suspense>
              ),
            },
            {
              path: SEISMIC_CONCLUSION_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <SeismicConclusion />
                </Suspense>
              ),
            },
            // General Information routes
            {
              path: TEACHERS_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Teachers />
                </Suspense>
              ),
            },
            {
              path: TALENTED_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Talented />
                </Suspense>
              ),
            },
            {
              path: SYMBOLS_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Symbols />
                </Suspense>
              ),
            },
            {
              path: GRADUATES_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Graduates />
                </Suspense>
              ),
            },
            // Open Data routes
            {
              path: REQUISITES_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Requisites />
                </Suspense>
              ),
            },
            {
              path: VACANCIES_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Vacancies />
                </Suspense>
              ),
            },
            {
              path: RECEPTION_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Reception />
                </Suspense>
              ),
            },
            // News routes
            {
              path: NEWS_DETAIL_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <NewsDetail />
                </Suspense>
              ),
            },
            {
              path: NEWS_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <NewsList />
                </Suspense>
              ),
            },
            {
              path: ANNOUNCEMENTS_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Announcements />
                </Suspense>
              ),
            },
            {
              path: ANNOUNCEMENT_DETAIL_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <AnnouncementDetail />
                </Suspense>
              ),
            },
            {
              path: GALLERY_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Gallery />
                </Suspense>
              ),
            },
            {
              path: VIDEO_GALLERY_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <VideoGallery />
                </Suspense>
              ),
            },
            // Contact routes
            {
              path: MAP_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Map />
                </Suspense>
              ),
            },
            {
              path: HOTLINE_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Hotline />
                </Suspense>
              ),
            },
            // Normativ routes
            {
              path: CONSTITUTION_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Constitution />
                </Suspense>
              ),
            },
            {
              path: LAWS_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Laws />
                </Suspense>
              ),
            },
            {
              path: DECREES_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Decrees />
                </Suspense>
              ),
            },
            {
              path: LEGISLATION_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <Legislation />
                </Suspense>
              ),
            },
            {
              path: GOVERNMENT_DOCUMENTS_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <GovernmentDocuments />
                </Suspense>
              ),
            },
            {
              path: INTERNAL_DOCUMENTS_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <InternalDocuments />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routers;
