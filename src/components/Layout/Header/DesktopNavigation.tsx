import NavMenuItem from './NavMenuItem';
import type { MenuItem } from '@/types';

interface DesktopNavigationProps {
  menuItems: MenuItem[];
  openDropdown: string | null;
  setOpenDropdown: (id: string | null) => void;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  menuItems,
  openDropdown,
  setOpenDropdown,
}) => {
  return (
    <div className="hidden lg:flex items-center justify-between gap-4">
      <nav>
        <ul className="flex items-center justify-between gap-3 xl:gap-3">
          {menuItems.map((item) => (
            <NavMenuItem
              key={item.id}
              item={item}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default DesktopNavigation;
