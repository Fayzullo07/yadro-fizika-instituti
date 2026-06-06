import { Outlet } from 'react-router-dom';
import Breadcrumb from '@/components/shared/Breadcrumb/Breadcrumb';

const PageLayout: React.FC = () => {
  return (
    <div className="px-3 sm:px-5 md:px-8 lg:px-10 flex relative">
      <main className="flex-grow min-w-0 w-full py-2 sm:py-4">
        <Breadcrumb />
        <Outlet />
      </main>
    </div>
  );
};

export default PageLayout;
