import { useLocation, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getMenuItems } from '@/config/menu';
import type { MenuItem } from '@/types';

export const shouldShowSidebar = (pathname: string, t: (key: string) => string): boolean => {
  if (pathname === '/') return false;
  const menuItems = getMenuItems(t);
  for (const menuItem of menuItems) {
    const hasActiveLink = menuItem.links.some((link) => link.path === pathname);
    if (hasActiveLink) {
      return true;
    }
  }
  return false;
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const menuItems: MenuItem[] = getMenuItems(t);

  const findActiveMenu = (): MenuItem | null => {
    for (const menuItem of menuItems) {
      const hasActiveLink = menuItem.links.some((link) => link.path === location.pathname);
      if (hasActiveLink) {
        return menuItem;
      }
    }
    return null;
  };

  const activeMenu = findActiveMenu();

  if (location.pathname === '/' || !activeMenu) {
    return null;
  }

  return (
    <aside className="sticky right-0 top-52 pt-[10px] w-80 min-h-[calc(100vh-208px)] max-h-[calc(100vh-208px)] overflow-y-auto z-40">
      <div className="p-4">
        {/* Active Menu Header */}
        {/* <div className="bg-[#013d8c] text-white px-4 py-3 mb-2 rounded">
          <h3 className="font-semibold text-sm uppercase">{activeMenu.label}</h3>
        </div> */}

        <div className="">
          {activeMenu.links.map((link, index) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={index}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-3  transition-colors ${
                  isActive
                    ? 'bg-[#013d8c] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <svg
                  className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-600'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <span className="text-base font-medium">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
