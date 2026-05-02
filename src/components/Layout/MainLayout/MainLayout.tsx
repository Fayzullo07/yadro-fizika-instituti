import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar, { shouldShowSidebar as checkShouldShowSidebar } from '../Sidebar/Sidebar';
import Breadcrumb from '@/components/shared/Breadcrumb/Breadcrumb';
import ScrollToTop from '@/components/shared/ScrollToTop/ScrollToTop';
import TextToSpeech from '@/components/shared/TextToSpeech/TextToSpeech';
import { trackPageView } from '@/utils/analytics';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    trackPageView(location.pathname);
  }, [location.pathname]);

  // Check if sidebar should be shown using the same logic as Sidebar component
  const shouldShowSidebar: boolean = checkShouldShowSidebar(location.pathname, t);
  const isHomePage: boolean = location.pathname === '/';

  return (
    <div className="min-h-screen  flex flex-col">
      <Header />
      <div className={`flex relative ${isHomePage ? '' : 'container mx-auto'}`}>
        <main
          className={`flex-grow border-gray-200 transition-all ${shouldShowSidebar && !isHomePage ? '' : ''} ${!shouldShowSidebar ? 'w-full' : ''}`}
        >
          <div>
            <Breadcrumb />
            <Outlet />
          </div>
        </main>
        {shouldShowSidebar && (
          <div className="w-80! hidden sm:block">
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
