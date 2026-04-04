export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  // Applications
  APPLICATION: '/api/v1/application/',
  APPLICATION_VACANCY: '/api/v1/application/vacancy/',
  APPLICATION_VACANCY_BY_ID: (id: number | string) => `/api/v1/application/vacancy/${id}/`,

  // Banners
  BANNERS: '/api/v1/banners/',
  BANNERS_BY_ID: (id: number | string) => `/api/v1/banners/${id}/`,

  // Council
  COUNCIL_MEMBERS: '/api/v1/council/council-members/',
  COUNCIL_MEMBERS_BY_ID: (id: number | string) => `/api/v1/council/council-members/${id}/`,
  SCIENTIFIC_COUNCIL: '/api/v1/council/scientific-council/',
  SCIENTIFIC_COUNCIL_BY_ID: (id: number | string) => `/api/v1/council/scientific-council/${id}/`,

  // Department
  DEPARTMENT: '/api/v1/department/',
  DEPARTMENT_BY_ID: (id: number | string) => `/api/v1/department/${id}/`,
  DEPARTMENT_LABORATORY: '/api/v1/department/laboratory/',
  DEPARTMENT_LABORATORY_BY_ID: (id: number | string) => `/api/v1/department/laboratory/${id}/`,
  DEPARTMENT_LEADERSHIP: '/api/v1/department/leadership/',
  DEPARTMENT_LEADERSHIP_BY_ID: (id: number | string) => `/api/v1/department/leadership/${id}/`,

  // General
  GENERAL: '/api/v1/general/',
  ABOUT: '/api/v1/general/about/',
  CONTACT_US: '/api/v1/general/contact-us/',

  // News
  NEWS: '/api/v1/news/',
  NEWS_BY_ID: (id: number | string) => `/api/v1/news/${id}/`,

  // Teams
  TEAMS: '/api/v1/teams/',
  TEAMS_BY_ID: (id: number | string) => `/api/v1/teams/${id}/`,
};
