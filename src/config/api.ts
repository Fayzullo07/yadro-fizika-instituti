export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  // Applications
  APPLICATION: '/api/application/',
  APPLICATION_VACANCY: '/api/application/vacancy/',
  APPLICATION_VACANCY_BY_ID: (id: number | string) => `/api/application/vacancy/${id}/`,

  // Banners
  BANNERS: '/api/banners',
  BANNERS_BY_ID: (id: number | string) => `/api/banners/${id}`,

  // Council
  COUNCIL_MEMBERS: '/api/council-members',
  COUNCIL_MEMBERS_BY_ID: (id: number | string) => `/api/council-members/${id}`,
  SCIENTIFIC_COUNCIL: '/api/scientific-council',
  SCIENTIFIC_COUNCIL_BY_ID: (id: number | string) => `/api/council/scientific-council/${id}/`,

  // Department
  DEPARTMENT: '/api/departments',
  DEPARTMENT_BY_ID: (id: number | string) => `/api/departments/${id}`,
  DEPARTMENT_LABORATORY: '/api/department/laboratory/',
  DEPARTMENT_LABORATORY_BY_ID: (id: number | string) => `/api/department/laboratory/${id}/`,
  DEPARTMENT_LEADERSHIP: '/api/department/leadership/',
  DEPARTMENT_LEADERSHIP_BY_ID: (id: number | string) => `/api/department/leadership/${id}/`,
  LEADERSHIP: '/api/leadership',

  // General
  GENERAL: '/api/general/',
  ABOUT: '/api/about',
  CONTACT_US: '/api/general/contact-us/',

  // News
  NEWS: '/api/news',
  NEWS_BY_ID: (id: number | string) => `/api/news/${id}`,

  // Teams
  TEAMS: '/api/teams/',
  TEAMS_BY_ID: (id: number | string) => `/api/teams/${id}/`,

  // Stats
  STATS: '/api/stats',

  // Galleries
  GALLERIES: '/api/galleries',

  // Video Gallery
  VIDEO_GALLERY: '/api/video-gallery',

  // Partners
  PARTNERS: '/api/partners',

  // Structure
  STRUCTURE: '/api/structure',

  // Institute history
  INSTITUTE_HISTORY: '/api/institute-history',
  INSTITUTE_DIRECTOR: '/api/institute-director',

  // Announcements (ads)
  ADS: '/api/ads',
  ADS_BY_ID: (id: number | string) => `/api/ads/${id}`,

  // Conferences
  CONFERENCES: '/api/conferences',
  CONFERENCES_BY_ID: (id: number | string) => `/api/conferences/${id}`,

  // Doctorals (Specialties)
  DOCTORALS: '/api/doctorals',

  // Charter
  CHARTER: '/api/charter',
};
