import { useState } from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import PageHero from '../PageHero/PageHero';
import { PageHeroContext } from '../PageHero/PageHeroContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getMenuItems } from '@/config/menu';

const MobileNav: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const menuItems = getMenuItems(t);

  const activeMenu = menuItems.find((item) =>
    item.links.some(
      (link) =>
        location.pathname === link.path ||
        (link.path !== '/' && location.pathname.startsWith(link.path + '/'))
    )
  );

  if (!activeMenu) return null;

  return (
    <div className="lg:hidden border-b border-[var(--color-neutral-100)] bg-[var(--color-neutral-0)] sticky top-[81px] z-30">
      <div className="flex overflow-x-auto scrollbar-hide">
        {activeMenu.links.map((link, index) => {
          const isActive =
            location.pathname === link.path ||
            (link.path !== '/' && location.pathname.startsWith(link.path + '/'));
          return (
            <Link
              key={index}
              to={link.path}
              className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                isActive
                  ? 'border-[var(--color-brand-700)] text-[var(--color-brand-700)]'
                  : 'border-transparent text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-900)]'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const SidebarLayout: React.FC = () => {
  const location = useLocation();
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  return (
    <PageHeroContext.Provider value={slot}>
      <PageHero slotRef={setSlot} />
      <div className="relative flex bg-[var(--color-neutral-50)]">
        <main className="min-w-0 grow">
          <MobileNav />
          <div className="px-3 py-[var(--space-8)] sm:px-5 md:px-8 lg:px-10">
            <div key={location.pathname} className="page-enter">
              <Outlet />
            </div>
          </div>
        </main>
        <div className="hidden w-80 shrink-0 lg:block">
          <Sidebar />
        </div>
      </div>
    </PageHeroContext.Provider>
  );
};

export default SidebarLayout;
