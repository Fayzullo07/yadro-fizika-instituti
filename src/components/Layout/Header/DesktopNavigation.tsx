import { useRef, useCallback } from 'react';
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
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleMenuEnter = useCallback(
    (id: string) => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      setOpenDropdown(id);
    },
    [setOpenDropdown]
  );

  const handleMenuLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  }, [setOpenDropdown]);

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
              onMouseEnter={handleMenuEnter}
              onMouseLeave={handleMenuLeave}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default DesktopNavigation;
