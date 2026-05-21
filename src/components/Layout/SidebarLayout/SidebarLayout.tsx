import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Breadcrumb from '@/components/shared/Breadcrumb/Breadcrumb';

const SidebarLayout: React.FC = () => {
  return (
    <div className="  px-10 flex relative">
      <main className="grow min-w-0 border-gray-200 transition-all">
        <div>
          <Breadcrumb />
          <Outlet />
        </div>
      </main>
      <div className="w-80 hidden sm:block">
        <Sidebar />
      </div>
    </div>
  );
};

export default SidebarLayout;
