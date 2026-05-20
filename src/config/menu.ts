import {
  MAP_PATH,
  STRUCTURE_PATH,
  TEAM_PATH,
  TEACHERS_PATH,
  COUNCIL_PATH,
  COUNCIL_COMPOSITION_PATH,
  COUNCIL_ACTIVITIES_PATH,
  DEPARTMENTS_PATH,
  LABORATORIES_PATH,
  DOCTORATE_PATH,
  NEWS_PATH,
  CONFERENCES_PATH,
  CONTACT_PATH,
  HOTLINE_PATH,
  ANNOUNCEMENTS_PATH,
  GALLERY_PATH,
  VIDEO_GALLERY_PATH,
  INSTITUTE_HISTORY_PATH,
  INSTITUTE_DIRECTORS_PATH,
  INSTITUTE_CHARTER_PATH,
  RESEARCH_SCIENTISTS_PATH,
  RESEARCH_DEGREES_PATH,
  RESEARCH_DIRECTIONS_PATH,
  SPECIALTIES_PATH,
  ARTICLES_PATH,
  ABSTRACTS_PATH,
} from '@/routes/path';
import type { MenuItem } from '@/types';

export const getMenuItems = (t: (key: string) => string): MenuItem[] => [
  {
    id: 'institut',
    label: t('nav.institut.title') || 'Institut haqida',
    links: [
      { label: t('nav.institut.structure') || 'Institut tuzilmasi', path: STRUCTURE_PATH },
      { label: t('nav.institut.history') || 'Institut tarixi', path: INSTITUTE_HISTORY_PATH },
      {
        label: t('nav.institut.directors') || 'Institut direktorlari',
        path: INSTITUTE_DIRECTORS_PATH,
      },
      { label: t('nav.institut.charter') || 'Institut nizomi', path: INSTITUTE_CHARTER_PATH },
      { label: t('nav.institute.leadership') || 'Rahbariyat', path: TEAM_PATH },
      { label: t('nav.institute.services') || 'Tuzilma', path: DEPARTMENTS_PATH },
    ],
  },
  {
    id: 'laboratoriyalar',
    label: t('nav.laboratoriyalar.title') || 'Laboratoriyalar',
    links: [
      { label: t('nav.laboratoriyalar.about') || 'Laboratoriya haqida', path: LABORATORIES_PATH },
      { label: t('nav.laboratoriyalar.staff') || 'Xodimlar profili', path: TEACHERS_PATH },
      {
        label: t('nav.laboratoriyalar.scientists') || 'Ilmiy xodimlar',
        path: RESEARCH_SCIENTISTS_PATH,
      },
      { label: t('nav.laboratoriyalar.degrees') || 'Ilmiy darajalar', path: RESEARCH_DEGREES_PATH },
      {
        label: t('nav.laboratoriyalar.directions') || "Ilmiy yo'nalishlar",
        path: RESEARCH_DIRECTIONS_PATH,
      },
    ],
  },
  {
    id: 'ilmiy-faoliyat',
    label: t('nav.ilmiyFaoliyat.title') || 'Ilmiy faoliyat',
    links: [
      {
        label: t('nav.ilmiyFaoliyat.councilAddress') || 'Ilmiy kengash manzili',
        path: COUNCIL_PATH,
      },
      {
        label: t('nav.ilmiyFaoliyat.councilComposition') || 'Ilmiy kengash tarkibi',
        path: COUNCIL_COMPOSITION_PATH,
      },
      {
        label: t('nav.ilmiyFaoliyat.councilActivities') || 'Ilmiy kengash faoliyati',
        path: COUNCIL_ACTIVITIES_PATH,
      },
      {
        label: t('nav.ilmiyFaoliyat.specialties') || 'Ixtisosliklar pasportlari',
        path: SPECIALTIES_PATH,
      },
      { label: t('nav.ilmiyFaoliyat.articles') || 'Ilmiy maqolalar', path: ARTICLES_PATH },
      { label: t('nav.ilmiyFaoliyat.abstracts') || 'Avtoreferatlar', path: ABSTRACTS_PATH },
      { label: t('nav.ilmiyFaoliyat.dissertations') || 'Dissertatsiyalar', path: DOCTORATE_PATH },
    ],
  },
  {
    id: 'media',
    label: t('nav.media.title') || "Yangilik va E'lonlar",
    links: [
      { label: t('nav.media.news') || 'Yangiliklar', path: NEWS_PATH },
      { label: t('nav.media.announcements') || "E'lonlar", path: ANNOUNCEMENTS_PATH },
      { label: t('nav.media.conferences') || 'Konferensiyalar', path: CONFERENCES_PATH },
      { label: t('nav.media.gallery') || 'Fotogalereya', path: GALLERY_PATH },
      { label: t('nav.media.videoGallery') || 'Video Galereya', path: VIDEO_GALLERY_PATH },
    ],
  },
  {
    id: 'boglanish',
    label: t('nav.boglanish.title') || "Bog'lanish",
    links: [
      { label: t('nav.boglanish.map') || 'Xarita', path: MAP_PATH },
      { label: t('nav.boglanish.address') || 'Manzil', path: CONTACT_PATH },
      { label: t('nav.boglanish.workingHours') || 'Ish kunlari', path: HOTLINE_PATH },
    ],
  },
];
