import { useLocation, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getMenuItems } from '@/config/menu';
import type { MenuItem } from '@/types';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const menuItems: MenuItem[] = getMenuItems(t);

  const findActiveMenu = (): MenuItem | null => {
    for (const menuItem of menuItems) {
      const hasActiveLink = menuItem.links.some((link) => {
        if (location.pathname === link.path) return true;
        // Allows nested routes (like /research/laboratories/1) to keep the parent menu active
        if (link.path !== '/' && location.pathname.startsWith(link.path + '/')) return true;
        return false;
      });
      if (hasActiveLink) {
        return menuItem;
      }
    }
    return null;
  };

  const activeMenu = findActiveMenu();

  if (!activeMenu) {
    return null;
  }

  return (
    <aside className="sticky right-0 top-[97px] z-40 max-h-[calc(100vh-113px)] w-80 overflow-y-auto">
      <nav className="flex flex-col gap-[var(--space-1)] p-[var(--space-4)]">
        {activeMenu.links.map((link, index) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={index}
              to={link.path}
              className={`group flex items-center gap-[var(--space-3)] rounded-[var(--radius-md)] border-l-[3px] px-[var(--space-4)] py-[var(--space-3)] text-[15px] font-semibold transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActive
                  ? 'border-[var(--color-accent-500)] bg-[var(--color-brand-700)] text-[var(--color-neutral-0)]'
                  : 'border-transparent bg-[var(--color-neutral-50)] text-[var(--color-neutral-700)] hover:translate-x-1 hover:bg-[var(--color-brand-50)] hover:text-[var(--color-brand-700)]'
              }`}
            >
              <svg
                className="size-4 shrink-0 transition-transform duration-500 group-hover:translate-x-0.5"
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
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
