import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from '@/components/shared/Loading/Loading';
import MainLayout from '@/components/Layout/MainLayout/MainLayout';

// Lazy-loaded pages
const Home = lazy(() => import('@/pages/Home/Home'));
const About = lazy(() => import('@/pages/About/About'));
const Services = lazy(() => import('@/pages/Services/Services'));
const Contact = lazy(() => import('@/pages/Contact/Contact'));
const Hotline = lazy(() => import('@/pages/Contact/Hotline'));
const International = lazy(() => import('@/pages/Institute/International/International'));
const Council = lazy(() => import('@/pages/Institute/Council/Council'));
const Structure = lazy(() => import('@/pages/Institute/Structure/Structure'));
const Documents = lazy(() => import('@/pages/Institute/Documents/Documents'));
const Team = lazy(() => import('@/pages/Institute/Team/Team'));
const Calendar = lazy(() => import('@/pages/Institute/Calendar/Calendar'));
const Markaziyapparat = lazy(() => import('@/pages/Institute/Markaziyapparat/Markaziyapparat'));
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
const Qonunchilik = lazy(() => import('@/pages/Normativ/Qonunchilik/Qonunchilik'));
const HukumatHujjatlari = lazy(
  () => import('@/pages/Normativ/HukumatHujjatlari/HukumatHujjatlari')
);
const IchkiHujjatlar = lazy(() => import('@/pages/Normativ/IchkiHujjatlar/IchkiHujjatlar'));
const Loyihalash = lazy(() => import('@/pages/Xizmatlar/Loyihalash'));
const InstrumentalTekhiruv = lazy(() => import('@/pages/Xizmatlar/InstrumentalTekshiruv'));
const ZilzilabardoshlikXulosa = lazy(() => import('@/pages/Xizmatlar/ZilzilabardoshlikXulosa'));
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
  QONUNCHILIK_PATH,
  HUKUMAT_HUJJATLARI_PATH,
  ICHKI_HUJJATLAR_PATH,
  MARKAZIY_APPARAT_PATH,
  LOYIHALASH_PATH,
  INSTRUMENTAL_TEKSHIRUV_PATH,
  ZILZILABARDOSHLIK_XULOSA_PATH,
} from './path';

const PageSkeleton = <Loading variant="page" />;
const CardsSkeleton = <Loading variant="cards" />;
const DetailSkeleton = <Loading variant="detail" />;

const Routers = () => {
  const router = createBrowserRouter([
    {
      path: HOME_PATH,
      element: <MainLayout />,
      children: [
        {
          path: HOME_PATH,
          element: (
            <Suspense fallback={PageSkeleton}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: ABOUT_PATH,
          element: (
            <Suspense fallback={DetailSkeleton}>
              <About />
            </Suspense>
          ),
        },
        {
          path: SERVICES_PATH,
          element: (
            <Suspense fallback={CardsSkeleton}>
              <Services />
            </Suspense>
          ),
        },
        {
          path: CONTACT_PATH,
          element: (
            <Suspense fallback={PageSkeleton}>
              <Contact />
            </Suspense>
          ),
        },
        // Institute routes
        {
          path: INTERNATIONAL_PATH,
          element: (
            <Suspense fallback={CardsSkeleton}>
              <International />
            </Suspense>
          ),
        },
        {
          path: COUNCIL_PATH,
          element: (
            <Suspense fallback={CardsSkeleton}>
              <Council />
            </Suspense>
          ),
        },
        {
          path: STRUCTURE_PATH,
          element: (
            <Suspense fallback={DetailSkeleton}>
              <Structure />
            </Suspense>
          ),
        },
        {
          path: DOCUMENTS_PATH,
          element: (
            <Suspense fallback={PageSkeleton}>
              <Documents />
            </Suspense>
          ),
        },
        {
          path: TEAM_PATH,
          element: (
            <Suspense fallback={CardsSkeleton}>
              <Team />
            </Suspense>
          ),
        },
        {
          path: CALENDAR_PATH,
          element: (
            <Suspense fallback={PageSkeleton}>
              <Calendar />
            </Suspense>
          ),
        },
        {
          path: MARKAZIY_APPARAT_PATH,
          element: (
            <Suspense fallback={CardsSkeleton}>
              <Markaziyapparat />
            </Suspense>
          ),
        },
        // Research routes
        {
          path: LABORATORIES_PATH,
          element: (
            <Suspense fallback={CardsSkeleton}>
              <Laboratories />
            </Suspense>
          ),
        },
        {
          path: LABORATORY_DETAIL_PATH,
          element: (
            <Suspense fallback={DetailSkeleton}>
              <LaboratoryDetail />
            </Suspense>
          ),
        },
        {
          path: DOCTORATE_PATH,
          element: (
            <Suspense fallback={PageSkeleton}>
              <Doctorate />
            </Suspense>
          ),
        },
        {
          path: CONFERENCES_PATH,
          element: (
            <Suspense fallback={CardsSkeleton}>
              <Conferences />
            </Suspense>
          ),
        },
        // Xizmatlar routes
        {
          path: LOYIHALASH_PATH,
          element: (
            <Suspense fallback={DetailSkeleton}>
              <Loyihalash />
            </Suspense>
          ),
        },
        {
          path: INSTRUMENTAL_TEKSHIRUV_PATH,
          element: (
            <Suspense fallback={DetailSkeleton}>
              <InstrumentalTekhiruv />
            </Suspense>
          ),
        },
        {
          path: ZILZILABARDOSHLIK_XULOSA_PATH,
          element: (
            <Suspense fallback={DetailSkeleton}>
              <ZilzilabardoshlikXulosa />
            </Suspense>
          ),
        },
        // General Information routes
        {
          path: TEACHERS_PATH,
          element: (
            <Suspense fallback={CardsSkeleton}>
              <Teachers />
            </Suspense>
          ),
        },
        {
          path: TALENTED_PATH,
          element: (
            <Suspense fallback={CardsSkeleton}>
              <Talented />
            </Suspense>
          ),
        },
        {
          path: SYMBOLS_PATH,
          element: (
            <Suspense fallback={PageSkeleton}>
              <Symbols />
            </Suspense>
          ),
        },
        {
          path: GRADUATES_PATH,
          element: (
            <Suspense fallback={CardsSkeleton}>
              <Graduates />
            </Suspense>
          ),
        },
        // Open Data routes
        {
          path: REQUISITES_PATH,
          element: (
            <Suspense fallback={PageSkeleton}>
              <Requisites />
            </Suspense>
          ),
        },
        {
          path: VACANCIES_PATH,
          element: (
            <Suspense fallback={CardsSkeleton}>
              <Vacancies />
            </Suspense>
          ),
        },
        {
          path: RECEPTION_PATH,
          element: (
            <Suspense fallback={PageSkeleton}>
              <Reception />
            </Suspense>
          ),
        },
        // News routes
        {
          path: NEWS_PATH,
          element: (
            <Suspense fallback={CardsSkeleton}>
              <NewsList />
            </Suspense>
          ),
        },
        {
          path: NEWS_DETAIL_PATH,
          element: (
            <Suspense fallback={DetailSkeleton}>
              <NewsDetail />
            </Suspense>
          ),
        },
        {
          path: ANNOUNCEMENTS_PATH,
          element: (
            <Suspense fallback={CardsSkeleton}>
              <Announcements />
            </Suspense>
          ),
        },
        // Contact routes
        {
          path: HOTLINE_PATH,
          element: (
            <Suspense fallback={PageSkeleton}>
              <Hotline />
            </Suspense>
          ),
        },
        // Normativ routes
        {
          path: CONSTITUTION_PATH,
          element: (
            <Suspense fallback={DetailSkeleton}>
              <Constitution />
            </Suspense>
          ),
        },
        {
          path: LAWS_PATH,
          element: (
            <Suspense fallback={PageSkeleton}>
              <Laws />
            </Suspense>
          ),
        },
        {
          path: DECREES_PATH,
          element: (
            <Suspense fallback={PageSkeleton}>
              <Decrees />
            </Suspense>
          ),
        },
        {
          path: QONUNCHILIK_PATH,
          element: (
            <Suspense fallback={PageSkeleton}>
              <Qonunchilik />
            </Suspense>
          ),
        },
        {
          path: HUKUMAT_HUJJATLARI_PATH,
          element: (
            <Suspense fallback={PageSkeleton}>
              <HukumatHujjatlari />
            </Suspense>
          ),
        },
        {
          path: ICHKI_HUJJATLAR_PATH,
          element: (
            <Suspense fallback={PageSkeleton}>
              <IchkiHujjatlar />
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
  ]);

  return <RouterProvider router={router} />;
};

export default Routers;
