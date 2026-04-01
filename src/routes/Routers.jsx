import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import Loading from "@/components/shared/Loading/Loading";
import PublicRoute from "./PublicRoute";
import MainLayout from "@/components/Layout/MainLayout/MainLayout";
import Home from "@/pages/Home/Home";
import About from "@/pages/About/About";
import Services from "@/pages/Services/Services";
import Contact from "@/pages/Contact/Contact";
import Hotline from "@/pages/Contact/Hotline";
import International from "@/pages/Institute/International/International";
import Council from "@/pages/Institute/Council/Council";
import Structure from "@/pages/Institute/Structure/Structure";
import Documents from "@/pages/Institute/Documents/Documents";
import Team from "@/pages/Institute/Team/Team";
import Calendar from "@/pages/Institute/Calendar/Calendar";
import Laboratories from "@/pages/Research/Laboratories/Laboratories";
import LaboratoryDetail from "@/pages/Research/Laboratories/LaboratoryDetail";
import Doctorate from "@/pages/Research/Doctorate/Doctorate";
import Conferences from "@/pages/Research/Conferences/Conferences";
import Teachers from "@/pages/General/Teachers/Teachers";
import Talented from "@/pages/General/Talented/Talented";
import Symbols from "@/pages/General/Symbols/Symbols";
import Graduates from "@/pages/General/Graduates/Graduates";
import Requisites from "@/pages/OpenData/Requisites/Requisites";
import Reception from "@/pages/OpenData/Reception/Reception";
import Vacancies from "@/pages/OpenData/Vacancies/Vacancies";
import NewsList from "@/pages/News/NewsList/NewsList";
import NewsDetail from "@/pages/News/NewsDetail/NewsDetail";
import Announcements from "@/pages/News/Announcements/Announcements";
import Constitution from "@/pages/Normativ/Constitution/Constitution";
import Decrees from "@/pages/Normativ/Decrees/Decrees";
import Laws from "@/pages/Normativ/Laws/Laws";
import Qonunchilik from "@/pages/Normativ/Qonunchilik/Qonunchilik";
import HukumatHujjatlari from "@/pages/Normativ/HukumatHujjatlari/HukumatHujjatlari";
import IchkiHujjatlar from "@/pages/Normativ/IchkiHujjatlar/IchkiHujjatlar";
import Markaziyapparat from "@/pages/Institute/Markaziyapparat/Markaziyapparat";
import Loyihalash from "@/pages/Xizmatlar/Loyihalash";
import InstrumentalTekhiruv from "@/pages/Xizmatlar/InstrumentalTekshiruv";
import ZilzilabardoshlikXulosa from "@/pages/Xizmatlar/ZilzilabardoshlikXulosa";

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
} from "./path";

const Routers = () => {
  const router = createBrowserRouter([
    {
      path: HOME_PATH,
      element: (
        <PublicRoute>
          <Suspense fallback={<Loading />}>
            <MainLayout />
          </Suspense>
        </PublicRoute>
      ),
      children: [
        { path: HOME_PATH, element: <Home /> },
        { path: ABOUT_PATH, element: <About /> },
        { path: SERVICES_PATH, element: <Services /> },
        { path: CONTACT_PATH, element: <Contact /> },
        // Institute routes
        { path: INTERNATIONAL_PATH, element: <International /> },
        { path: COUNCIL_PATH, element: <Council /> },
        { path: STRUCTURE_PATH, element: <Structure /> },
        { path: DOCUMENTS_PATH, element: <Documents /> },
        { path: TEAM_PATH, element: <Team /> },
        { path: CALENDAR_PATH, element: <Calendar /> },
        { path: MARKAZIY_APPARAT_PATH, element: <Markaziyapparat/> },
        // Research routes
        { path: LABORATORIES_PATH, element: <Laboratories /> },
        { path: LABORATORY_DETAIL_PATH, element: <LaboratoryDetail /> },
        { path: DOCTORATE_PATH, element: <Doctorate /> },
        { path: CONFERENCES_PATH, element: <Conferences /> },
        // Xizmatlar routes
        { path: LOYIHALASH_PATH, element: <Loyihalash /> },
        { path: INSTRUMENTAL_TEKSHIRUV_PATH, element: <InstrumentalTekhiruv /> },
        { path: ZILZILABARDOSHLIK_XULOSA_PATH, element: <ZilzilabardoshlikXulosa /> },
        // General Information routes
        { path: TEACHERS_PATH, element: <Teachers /> },
        { path: TALENTED_PATH, element: <Talented /> },
        { path: SYMBOLS_PATH, element: <Symbols /> },
        { path: GRADUATES_PATH, element: <Graduates /> },
        // Open Data routes
        { path: REQUISITES_PATH, element: <Requisites /> },
        { path: VACANCIES_PATH, element: <Vacancies /> },
        { path: RECEPTION_PATH, element: <Reception /> },
        // News routes
        { path: NEWS_PATH, element: <NewsList /> },
        { path: NEWS_DETAIL_PATH, element: <NewsDetail /> },
        { path: ANNOUNCEMENTS_PATH, element: <Announcements /> },
        // Contact routes
        { path: CONTACT_PATH, element: <Contact /> },
        { path: HOTLINE_PATH, element: <Hotline /> },
        // Normativ routes
        { path: CONSTITUTION_PATH, element: <Constitution /> },
        { path: LAWS_PATH, element: <Laws /> },
        { path: DECREES_PATH, element: <Decrees /> },
        { path: QONUNCHILIK_PATH, element: <Qonunchilik /> },
        { path: HUKUMAT_HUJJATLARI_PATH, element: <HukumatHujjatlari /> },
        { path: ICHKI_HUJJATLAR_PATH, element: <IchkiHujjatlar /> },
        { path: "*", element: <Navigate to={HOME_PATH} /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routers;
