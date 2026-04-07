import { Link } from 'react-router-dom';
import type { MenuLink } from '@/types';

interface DropdownMenuProps {
  links: MenuLink[];
  onClose: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ links, onClose }) => {
  return (
    <div className="absolute top-full left-0 mt-3 w-64 bg-white rounded-xl shadow-lg shadow-black/8 border border-gray-100 z-20 overflow-hidden animate-fade-in">
      <div className="py-2">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            onClick={onClose}
            className="group/link flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-150"
          >
            <span className="w-1 h-1 rounded-full bg-gray-300 group-hover/link:bg-blue-500 group-hover/link:scale-150 transition-all duration-150"></span>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
