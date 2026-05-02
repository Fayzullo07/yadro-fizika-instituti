import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Breadcrumb from '@/components/shared/Breadcrumb/Breadcrumb';

const SidebarLayout: React.FC = () => {
  return (
    <div className="container mx-auto flex relative">
      <main className="flex-grow border-gray-200 transition-all">
        <div>
          <Breadcrumb />
          <Outlet />
        </div>
      </main>
      <div className="w-80! hidden sm:block">
        <Sidebar />
      </div>
    </div>
  );
};

export default SidebarLayout;
