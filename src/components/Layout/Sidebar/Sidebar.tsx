import { useLocation, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  ABOUT_PATH,
  STRUCTURE_PATH,
  TEAM_PATH,
  TEACHERS_PATH,
  COUNCIL_PATH,
  LABORATORIES_PATH,
  DOCTORATE_PATH,
  NEWS_PATH,
  CONFERENCES_PATH,
  CONTACT_PATH,
  HOTLINE_PATH,
  ANNOUNCEMENTS_PATH,
  CONSTITUTION_PATH,
  LAWS_PATH,
  DECREES_PATH,
  QONUNCHILIK_PATH,
  HUKUMAT_HUJJATLARI_PATH,
  ICHKI_HUJJATLAR_PATH,
  LOYIHALASH_PATH,
  INSTRUMENTAL_TEKSHIRUV_PATH,
  ZILZILABARDOSHLIK_XULOSA_PATH,
  LABORATORY_DETAIL_PATH,
} from '@/routes/path';
import type { MenuItem } from '@/types';

// Menu items structure - shared between component and helper function
const getMenuItems = (t: (key: string) => string): MenuItem[] => [
    {
      id: 'institut',
      label: t('nav.institute.title') || 'INSTITUT',
      links: [
        { label: t('nav.institute.about') || 'Institut haqida', path: ABOUT_PATH },
        { label: t('nav.institute.services') || 'Tashkilot tuzilmasi', path: STRUCTURE_PATH },
        { label: t('nav.institute.leadership') || 'Rahbariyat', path: TEAM_PATH },
        { label: t('nav.institute.team') || 'Institut jamoasi', path: TEACHERS_PATH },
      ],
    },
    {
      id: 'tadqiqot',
      label: t('nav.tadqiqot.title') || 'TADQIQOT',
      links: [
        { label: t('nav.tadqiqot.council') || 'Ilmiy kengash', path: COUNCIL_PATH },
        { label: t('nav.tadqiqot.laboratories') || 'Laboratoriyalar', path: LABORATORIES_PATH },
        { label: t('nav.tadqiqot.doctorate') || 'Doktarontura', path: DOCTORATE_PATH },
      ],
    },
    {
      id: 'xizmatlar',
      label: t('nav.xizmatlar.title') || 'XIZMATLAR',
      links: [
        { label: t('nav.xizmatlar.Loyihalash') || 'Konferensiyalar', path: LOYIHALASH_PATH },
        { label: t('nav.xizmatlar.Instrumentaltexniktekshiruvniotkazish') || 'Instrumental texnik tekshiruvni otkazish', path: INSTRUMENTAL_TEKSHIRUV_PATH },
        { label: t('nav.xizmatlar.Zilzilabardoshlikboʻyichailmiyxulosaberish') || 'Zilzilabardoshlik boʻyicha ilmiy xulosa berish', path: ZILZILABARDOSHLIK_XULOSA_PATH },
      ],
    },
    {
      id: 'media',
      label: t('nav.media.title') || 'MEDIA',
      links: [
        { label: t('nav.media.news') || 'Yangiliklar', path: NEWS_PATH },
        // { label: t('nav.media.calendar') || 'Voqaelar taqvimi', path: CALENDAR_PATH },
        { label: t('nav.media.conferences') || 'Anjumanlar', path: CONFERENCES_PATH },
        { label: t('nav.media.announcements') || 'E\'lonlar', path: ANNOUNCEMENTS_PATH },
      ],
    },
    {
      id: 'normativ',
      label: t('nav.normativ.title') || 'NORMATIV HUQUQIY-HUJJATLAR',
      links: [
        { label: t('nav.normativ.constitution') || 'Konstitutsiya', path: CONSTITUTION_PATH },
        { label: t('nav.normativ.laws') || 'Qonunlar', path: LAWS_PATH },
        { label: t('nav.normativ.decrees') || 'Prezident farmon va qarorlari', path: DECREES_PATH },
        { label: t('nav.normativ.qonunchilik') || 'Institut faoliyat sohasiga oid miliy  konunchilik ', path: QONUNCHILIK_PATH },
        { label: t('nav.normativ.hukumat') || 'Prezident va Hukumat hujjatlari', path: HUKUMAT_HUJJATLARI_PATH },
        { label: t('nav.normativ.ichki') || 'Institut ichki hujjatlari', path: ICHKI_HUJJATLAR_PATH },
      ],
    },
    {
      id: 'boglanish',
      label: t('nav.boglanish.title') || 'BOG\'LANISH',
      links: [
        { label: t('nav.boglanish.contact') || 'Kontaklar', path: CONTACT_PATH },
        { label: t('nav.boglanish.hotline') || 'Ishonch telefoni', path: HOTLINE_PATH },
      ],
    },
];

export const shouldShowSidebar = (pathname: string, t: (key: string) => string): boolean => {
  if (pathname === '/') return false;
  const menuItems = getMenuItems(t);
  for (const menuItem of menuItems) {
    const hasActiveLink = menuItem.links.some(link => link.path === pathname);
    if (hasActiveLink) {
      return true;
    }
  }
  return false;
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const menuItems: MenuItem[] = getMenuItems(t);

  const findActiveMenu = (): MenuItem | null => {
    for (const menuItem of menuItems) {
      const hasActiveLink = menuItem.links.some(link => link.path === location.pathname);
      if (hasActiveLink) {
        return menuItem;
      }
    }
    return null;
  };

  const activeMenu = findActiveMenu();

  if (location.pathname === '/' || !activeMenu) {
    return null;
  }

  return (
    <aside className="sticky right-0 top-52 pt-[10px] w-80 min-h-[calc(100vh-208px)] max-h-[calc(100vh-208px)] overflow-y-auto z-40">
      <div className="p-4">
        {/* Active Menu Header */}
        {/* <div className="bg-[#013d8c] text-white px-4 py-3 mb-2 rounded">
          <h3 className="font-semibold text-sm uppercase">{activeMenu.label}</h3>
        </div> */}

        <div className="">
          {activeMenu.links.map((link, index) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={index}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-3  transition-colors ${
                  isActive
                    ? 'bg-[#013d8c] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <svg
                  className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-600'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <span className="text-base font-medium">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
