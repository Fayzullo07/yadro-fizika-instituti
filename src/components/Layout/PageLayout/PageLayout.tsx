import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PageHero from '../PageHero/PageHero';
import { PageHeroContext } from '../PageHero/PageHeroContext';

const PageLayout: React.FC = () => {
  const location = useLocation();
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  return (
    <PageHeroContext.Provider value={slot}>
      <PageHero slotRef={setSlot} />
      <div className="relative flex bg-[var(--color-neutral-50)] px-3 sm:px-5 md:px-8 lg:px-10">
        <main className="w-full min-w-0 flex-grow py-[var(--space-8)]">
          <div key={location.pathname} className="page-enter">
            <Outlet />
          </div>
        </main>
      </div>
    </PageHeroContext.Provider>
  );
};

export default PageLayout;
