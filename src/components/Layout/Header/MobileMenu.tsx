import { Link } from 'react-router-dom';
import type { MenuItem } from '@/types';

interface MobileMenuProps {
  menuItems: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ menuItems, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 bg-opacity-50 z-30" onClick={onClose} />
      <div className="fixed inset-0 bg-white shadow-xl z-40 overflow-y-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Sayt xaritasi</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {menuItems.map((item) => (
              <div key={item.id} className=" rounded-lg transition-shadow">
                <h3 className="uppercase text-base font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                  {item.label}
                </h3>
                <div className="space-y-1">
                  {item.links.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      onClick={onClose}
                      className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
