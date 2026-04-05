import DropdownMenu from './DropdownMenu';
import type { MenuItem } from '@/types';

interface NavMenuItemProps {
  item: MenuItem;
  openDropdown: string | null;
  setOpenDropdown: (id: string | null) => void;
  isScrolled?: boolean;
}

const NavMenuItem: React.FC<NavMenuItemProps> = ({
  item,
  openDropdown,
  setOpenDropdown,
  isScrolled = true,
}) => {
  const isOpen = openDropdown === item.id;

  return (
    <li className="relative">
      <button
        type="button"
        onClick={() => setOpenDropdown(isOpen ? null : item.id)}
        className={`flex items-center gap-1.5 uppercase text-xs xl:text-sm font-semibold tracking-wide px-3 py-2 rounded-lg transition-all duration-200 ${
          isScrolled
            ? isOpen
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
            : isOpen
              ? 'text-white bg-white/15'
              : 'text-white/80 hover:text-white hover:bg-white/10'
        }`}
      >
        {item.label}
        <svg
          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)} aria-hidden />
          <DropdownMenu links={item.links} onClose={() => setOpenDropdown(null)} />
        </>
      )}
    </li>
  );
};

export default NavMenuItem;
