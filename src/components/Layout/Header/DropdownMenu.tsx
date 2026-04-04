import { Link } from 'react-router-dom';
import type { MenuLink } from '@/types';

interface DropdownMenuProps {
  links: MenuLink[];
  onClose: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ links, onClose }) => {
  return (
    <div className="absolute top-full left-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-gray-100 z-20 overflow-hidden">
      <div className="py-1">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            onClick={onClose}
            className="block px-4 py-2.5 text-sm text-gray-700 transition-colors duration-150"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
