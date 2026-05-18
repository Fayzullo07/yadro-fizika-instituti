import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getMenuItems } from '@/config/menu';
import { HOME_PATH } from '@/routes/path';
import {
  ABOUT_PATH,
  VACANCIES_PATH,
  REQUISITES_PATH,
  RECEPTION_PATH,
  CONSTITUTION_PATH,
  LAWS_PATH,
  DECREES_PATH,
  LEGISLATION_PATH,
  GOVERNMENT_DOCUMENTS_PATH,
  INTERNAL_DOCUMENTS_PATH,
  SYMBOLS_PATH,
  TALENTED_PATH,
  GRADUATES_PATH,
  CALENDAR_PATH,
  DOCUMENTS_PATH,
  INTERNATIONAL_PATH,
  CENTRAL_OFFICE_PATH,
} from '@/routes/path';

interface BreadcrumbItem {
  label: string;
  path?: string;
  isCurrent?: boolean;
}

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();

  if (location.pathname === HOME_PATH) return null;

  const menuItems = getMenuItems(t);

  // Build lookup from menu: path → { label, sectionLabel }
  const menuMap: Record<string, { label: string; sectionLabel: string }> = {};
  for (const section of menuItems) {
    for (const link of section.links) {
      menuMap[link.path] = { label: link.label, sectionLabel: section.label };
    }
  }

  // Extra paths not in menu
  const extraMap: Record<string, { label: string; sectionLabel?: string }> = {
    [ABOUT_PATH]: { label: t('nav.institut.title') || 'Institut haqida' },
    [CALENDAR_PATH]: { label: t('nav.institute.calendar') || 'Voqealar taqvimi' },
    [DOCUMENTS_PATH]: { label: t('nav.institute.documents') || 'Hujjatlar' },
    [INTERNATIONAL_PATH]: { label: t('nav.institute.international') || 'Xalqaro hamkorlik' },
    [CENTRAL_OFFICE_PATH]: { label: t('nav.institute.markaziyapparat') || 'Markaziy apparat' },
    [VACANCIES_PATH]: { label: t('nav.ochiq.vacancies') || 'Vakansiyalar' },
    [REQUISITES_PATH]: { label: t('nav.ochiq.requisites') || 'Rekvizitlar' },
    [RECEPTION_PATH]: { label: t('nav.ochiq.reception') || 'Qabul kunlari' },
    [SYMBOLS_PATH]: { label: t('nav.umumiy.symbols') || 'Davlat ramzlari' },
    [TALENTED_PATH]: { label: t('nav.umumiy.talented') || 'Iqtidorli yoshlar' },
    [GRADUATES_PATH]: { label: t('nav.umumiy.graduates') || 'Bitiruvchilar' },
    [CONSTITUTION_PATH]: {
      label: t('nav.normativ.constitution') || 'Konstitutsiya',
      sectionLabel: t('nav.normativ.title') || 'Normativ hujjatlar',
    },
    [LAWS_PATH]: {
      label: t('nav.normativ.laws') || 'Qonunlar',
      sectionLabel: t('nav.normativ.title') || 'Normativ hujjatlar',
    },
    [DECREES_PATH]: {
      label: t('nav.normativ.decrees') || 'Farmon va qarorlar',
      sectionLabel: t('nav.normativ.title') || 'Normativ hujjatlar',
    },
    [LEGISLATION_PATH]: {
      label: t('nav.normativ.qonunchilik') || 'Qonunchilik',
      sectionLabel: t('nav.normativ.title') || 'Normativ hujjatlar',
    },
    [GOVERNMENT_DOCUMENTS_PATH]: {
      label: t('nav.normativ.hukumat') || 'Hukumat hujjatlari',
      sectionLabel: t('nav.normativ.title') || 'Normativ hujjatlar',
    },
    [INTERNAL_DOCUMENTS_PATH]: {
      label: t('nav.normativ.ichki') || 'Ichki hujjatlar',
      sectionLabel: t('nav.normativ.title') || 'Normativ hujjatlar',
    },
  };

  // Dynamic routes: match by prefix (longest first)
  const dynamicRoutes: Array<{ prefix: string; label: string; sectionLabel?: string }> = [
    {
      prefix: '/news/announcements/',
      label: t('news.detail') || 'Batafsil',
      sectionLabel: t('nav.media.title') || "Yangilik va E'lonlar",
    },
    {
      prefix: '/news/',
      label: t('news.detail') || 'Batafsil',
      sectionLabel: t('nav.media.title') || "Yangilik va E'lonlar",
    },
    {
      prefix: '/research/laboratories/',
      label: t('labs.detail') || 'Laboratoriya',
      sectionLabel: t('nav.laboratoriyalar.title') || 'Laboratoriyalar',
    },
    {
      prefix: '/research/conferences/',
      label: t('conferences.detail') || 'Konferensiya',
      sectionLabel: t('nav.media.conferences') || 'Konferensiyalar',
    },
  ];

  // Resolve current page info
  const allPaths = { ...extraMap, ...menuMap };
  let info: { label: string; sectionLabel?: string } | undefined = allPaths[location.pathname];

  if (!info) {
    for (const route of dynamicRoutes) {
      if (location.pathname.startsWith(route.prefix)) {
        info = { label: route.label, sectionLabel: route.sectionLabel };
        break;
      }
    }
  }

  if (!info) return null;

  const crumbs: BreadcrumbItem[] = [{ label: t('nav.home') || 'Bosh sahifa', path: HOME_PATH }];

  if (info.sectionLabel) {
    crumbs.push({ label: info.sectionLabel });
  }

  crumbs.push({ label: info.label, isCurrent: true });

  return (
    <nav className="py-3">
      <div className="flex items-center gap-2 text-sm">
        {crumbs.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-[#013d8c] font-bold">›</span>}
            {item.path && !item.isCurrent ? (
              <Link to={item.path} className="text-[#013d8c] font-bold hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className={item.isCurrent ? 'text-gray-600' : 'text-gray-500'}>
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Breadcrumb;
