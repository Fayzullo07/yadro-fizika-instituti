import { HOME_PATH, ABOUT_PATH, CONTACT_PATH } from '@/routes/path';

export const QUICK_LINKS = [
  { pathKey: HOME_PATH, labelKey: 'nav.home', fallback: 'Bosh sahifa' },
  { pathKey: ABOUT_PATH, labelKey: 'nav.institute.about', fallback: 'Biz haqimizda' },
  { pathKey: CONTACT_PATH, labelKey: 'nav.contact', fallback: 'Aloqa' },
] as const;
