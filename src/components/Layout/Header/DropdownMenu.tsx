import { Link, useLocation } from 'react-router-dom';
import type { MenuLink } from '@/types';

interface DropdownMenuProps {
  links: MenuLink[];
  onClose: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ links, onClose }) => {
  const location = useLocation();

  return (
    <div className="absolute top-full left-0 mt-3 w-64 bg-white rounded-xl shadow-lg shadow-black/8 border border-gray-100 z-20 overflow-hidden animate-fade-in">
      <div className="py-2">
        {links.map((link, index) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={index}
              to={link.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150 ${
                isActive
                  ? 'bg-blue-50 text-[#013d8c] font-semibold'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-150 ${
                  isActive ? 'bg-[#013d8c] scale-150' : 'bg-gray-300'
                }`}
              />
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DropdownMenu;
