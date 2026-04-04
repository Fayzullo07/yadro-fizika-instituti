import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar, { shouldShowSidebar as checkShouldShowSidebar } from '../Sidebar/Sidebar';
import Breadcrumb from '@/components/shared/Breadcrumb/Breadcrumb';
import ScrollToTop from '@/components/shared/ScrollToTop/ScrollToTop';
import TextToSpeech from '@/components/shared/TextToSpeech/TextToSpeech';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [location.pathname]);

  // Check if sidebar should be shown using the same logic as Sidebar component
  const shouldShowSidebar: boolean = checkShouldShowSidebar(location.pathname, t);
  const isHomePage: boolean = location.pathname === '/';

  return (
    <div className="min-h-screen  flex flex-col">
      <Header />
      <div className={`flex relative ${isHomePage ? '' : 'container mx-auto'}`}>
        <main
          className={`flex-grow border-gray-200 transition-all ${shouldShowSidebar && !isHomePage ? 'border m-6 shadow-lg py-4 px-2' : ''} ${!shouldShowSidebar ? 'w-full' : ''}`}
        >
          <div className="">
            <Breadcrumb />
            <Outlet />
          </div>
        </main>
        {shouldShowSidebar && (
          <div className="!w-80 hidden sm:block">
            <Sidebar />
          </div>
        )}
      </div>
      <Footer />
      <ScrollToTop />
      <TextToSpeech />
    </div>
  );
};

export default MainLayout;
