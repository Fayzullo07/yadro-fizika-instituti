import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
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

  return (
    <div className="min-h-screen  flex flex-col">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
      <ScrollToTop />
      <TextToSpeech />
    </div>
  );
};

export default MainLayout;
