import NavMenuItem from './NavMenuItem';
import type { MenuItem } from '@/types';

interface DesktopNavigationProps {
  menuItems: MenuItem[];
  openDropdown: string | null;
  setOpenDropdown: (id: string | null) => void;
  isScrolled?: boolean;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  menuItems,
  openDropdown,
  setOpenDropdown,
  isScrolled = true,
}) => {
  return (
    <div className="hidden lg:flex items-center">
      <nav>
        <ul className="flex items-center gap-1">
          {menuItems.map((item) => (
            <NavMenuItem
              key={item.id}
              item={item}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              isScrolled={isScrolled}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default DesktopNavigation;
