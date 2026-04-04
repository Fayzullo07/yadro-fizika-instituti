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
} from '@/routes/path';
import type { MenuItem } from '@/types';

export const getMenuItems = (t: (key: string) => string): MenuItem[] => [
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
