import { useLocation, Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Breadcrumb from '@/components/shared/Breadcrumb/Breadcrumb';
import { useLanguage } from '@/contexts/LanguageContext';
import { getMenuItems } from '@/config/menu';

const MobileNav: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const menuItems = getMenuItems(t);

  const activeMenu = menuItems.find((item) =>
    item.links.some(
      (link) =>
        location.pathname === link.path ||
        (link.path !== '/' && location.pathname.startsWith(link.path + '/'))
    )
  );

  if (!activeMenu) return null;

  return (
    <div className="lg:hidden border-b border-gray-200 bg-white sticky top-0 z-30">
      <div className="flex overflow-x-auto scrollbar-hide">
        {activeMenu.links.map((link, index) => {
          const isActive =
            location.pathname === link.path ||
            (link.path !== '/' && location.pathname.startsWith(link.path + '/'));
          return (
            <Link
              key={index}
              to={link.path}
              className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                isActive
                  ? 'border-[#013d8c] text-[#013d8c]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const SidebarLayout: React.FC = () => {
  return (
    <div className="flex relative">
      <main className="grow min-w-0 transition-all">
        <MobileNav />
        <div className="px-3 sm:px-5 md:px-8 lg:px-10">
          <Breadcrumb />
          <Outlet />
        </div>
      </main>
      <div className="hidden lg:block w-80 shrink-0">
        <Sidebar />
      </div>
    </div>
  );
};

export default SidebarLayout;
