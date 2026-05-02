import { Outlet } from 'react-router-dom';
import Breadcrumb from '@/components/shared/Breadcrumb/Breadcrumb';

const PageLayout: React.FC = () => {
  return (
    <div className="container mx-auto flex relative">
      <main className="flex-grow border-gray-200 transition-all w-full">
        <div>
          <Breadcrumb />
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
