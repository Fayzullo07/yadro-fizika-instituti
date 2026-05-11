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
const Doctorate = lazy(() => import('@/pages/Research/Doctorate/Doctorate'));
const Conferences = lazy(() => import('@/pages/Research/Conferences/Conferences'));
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

import {
  HOME_PATH,
  ABOUT_PATH,
  SERVICES_PATH,
  CONTACT_PATH,
  HOTLINE_PATH,
  INTERNATIONAL_PATH,
  COUNCIL_PATH,
  STRUCTURE_PATH,
  DOCUMENTS_PATH,
  TEAM_PATH,
  CALENDAR_PATH,
  LABORATORIES_PATH,
  LABORATORY_DETAIL_PATH,
  DOCTORATE_PATH,
  CONFERENCES_PATH,
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
              path: LABORATORY_DETAIL_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <LaboratoryDetail />
                </Suspense>
              ),
            },
            {
              path: NEWS_DETAIL_PATH,
              element: (
                <Suspense fallback={<Loading />}>
                  <NewsDetail />
                </Suspense>
              ),
            },
            {
              path: '*',
              element: (
                <Suspense fallback={<Loading />}>
                  <NotFound />
                </Suspense>
              ),
            },
          ],
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
            // Research routes
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
            // Contact routes
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
