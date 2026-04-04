import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  HOME_PATH,
  ABOUT_PATH,
  STRUCTURE_PATH,
  TEAM_PATH,
  TEACHERS_PATH,
  COUNCIL_PATH,
  LABORATORIES_PATH,
  DOCTORATE_PATH,
  INTERNATIONAL_PATH,
  VACANCIES_PATH,
  NEWS_PATH,
  CALENDAR_PATH,
  CONFERENCES_PATH,
  DOCUMENTS_PATH,
  CONTACT_PATH,
  MARKAZIY_APPARAT_PATH,
} from '@/routes/path';

interface BreadcrumbItem {
  label: string;
  path: string;
  isCurrent?: boolean;
}

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();

  // Don't show breadcrumb on home page
  if (location.pathname === HOME_PATH) {
    return null;
  }

  // Map paths to their labels
  const pathLabels: Record<string, string> = {
    [ABOUT_PATH]: t('nav.institute.about') || 'Institut haqida',
    [STRUCTURE_PATH]: t('nav.institute.services') || 'Tashkilot tuzilmasi',
    [TEAM_PATH]: t('nav.institute.leadership') || 'Rahbariyat',
    [TEACHERS_PATH]: t('nav.institute.team') || 'Institut jamoasi',
    [COUNCIL_PATH]: t('nav.tadqiqot.council') || 'Ilmiy kengash',
    [LABORATORIES_PATH]: t('nav.tadqiqot.laboratories') || 'Laboratoriyalar',
    [DOCTORATE_PATH]: t('nav.tadqiqot.doctorate') || 'Doktarontura',
    [INTERNATIONAL_PATH]: t('nav.institute.international') || 'Xalqaro hamkorlik',
    [VACANCIES_PATH]: t('nav.tadqiqot.vacancies') || 'Bo\'sh ish o\'rinlari',
    [NEWS_PATH]: t('nav.media.news') || 'Yangiliklar',
    [CALENDAR_PATH]: t('nav.media.calendar') || 'Voqaelar taqvimi',
    [CONFERENCES_PATH]: t('nav.media.conferences') || 'Anjumanlar',
    [DOCUMENTS_PATH]: t('nav.normativ.title') || 'Normativ huquqiy-hujjatlar',
    [CONTACT_PATH]: t('nav.boglanish.contact') || 'Kontaklar',
    [MARKAZIY_APPARAT_PATH]: t('nav.institute.markaziyapparat') || 'Markaziy apparat',
  };

  // Build breadcrumb items
  const buildBreadcrumbs = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [
      {
        label: t('nav.home') || 'Bosh sahifa',
        path: HOME_PATH,
      },
    ];

    // Find the current page label
    const currentPath = location.pathname;
    const currentLabel = pathLabels[currentPath];

    if (currentLabel) {
      // Check if current page is under a parent category
      // For example, if on /institut/structure, we might want to show "Institut haqida" as parent
      const parentPaths: Record<string, string | null> = {
        [STRUCTURE_PATH]: ABOUT_PATH,
        [TEAM_PATH]: ABOUT_PATH,
        [TEACHERS_PATH]: ABOUT_PATH,
        [COUNCIL_PATH]: null, // Can add parent if needed
        [LABORATORIES_PATH]: null,
        [DOCTORATE_PATH]: null,
        [INTERNATIONAL_PATH]: ABOUT_PATH,
        [VACANCIES_PATH]: null,
        [NEWS_PATH]: null,
        [CALENDAR_PATH]: null,
        [CONFERENCES_PATH]: null,
        [DOCUMENTS_PATH]: null,
        [CONTACT_PATH]: null,
        [MARKAZIY_APPARAT_PATH]: ABOUT_PATH,
      };

      const parentPath = parentPaths[currentPath];
      if (parentPath && parentPath !== HOME_PATH) {
        items.push({
          label: pathLabels[parentPath],
          path: parentPath,
        });
      }

      // Add current page
      items.push({
        label: currentLabel,
        path: currentPath,
        isCurrent: true,
      });
    }

    return items;
  };

  const breadcrumbs = buildBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="bg-white py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-[#013d8c] font-bold">›</span>
              )}
              {item.isCurrent ? (
                <span className="text-gray-600 font-normal">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="text-[#013d8c] font-bold hover:underline"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumb;
