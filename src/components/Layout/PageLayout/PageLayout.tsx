import { Outlet, useLocation } from 'react-router-dom';
import Breadcrumb from '@/components/shared/Breadcrumb/Breadcrumb';

const PageLayout: React.FC = () => {
  const location = useLocation();
  return (
    <div className="px-3 sm:px-5 md:px-8 lg:px-10 flex relative">
      <main className="flex-grow min-w-0 w-full py-2 sm:py-4">
        <Breadcrumb />
        <div key={location.pathname} className="page-enter">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
