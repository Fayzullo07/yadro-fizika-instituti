import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';
import { getStoredLanguage } from '@/config/i18n';
import type {
  SingleResponse,
  PaginationParams,
  PaginatedResponse,
  ContactUsData,
  ApplicationData,
  GeneralData,
  AboutData,
  InstituteHistoryData,
  AnnouncementItem,
  ConferenceItem,
  Banner,
  ScientificCouncil,
  CouncilMember,
  Department,
  Laboratory,
  LaboratoryItem,
  LeadershipMember,
  NewsItem,
  TeamMember,
  Vacancy,
  StatData,
  GalleryItem,
  VideoGalleryItem,
  PartnerItem,
  StructureData,
  SpecialtyItem,
  CharterData,
} from '@/types';

// Helper function for API requests
export const apiRequest = async <T = unknown>(
  endpoint: string,
  options: RequestInit = {},
  language: string | null = null
): Promise<T> => {
  const lang = language || getStoredLanguage();
  const separator = endpoint.includes('?') ? '&' : '?';
  const url = `${API_BASE_URL}${endpoint}${separator}lang=${lang}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': lang,
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (import.meta.env.DEV) console.error('API Request Error:', error);
    throw error;
  }
};

// Applications API
export const applicationApi = {
  create: async (
    data: FormData | ApplicationData,
    language: string | null = null
  ): Promise<unknown> => {
    const url = `${API_BASE_URL}${API_ENDPOINTS.APPLICATION}`;
    const lang = language || getStoredLanguage();

    // Check if data is FormData
    const isFormData = data instanceof FormData;

    const config = {
      method: 'POST',
      headers: {
        'Accept-Language': lang,
        ...(import.meta.env.DEV && { 'ngrok-skip-browser-warning': 'true' }),
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      },
      body: isFormData ? data : JSON.stringify(data),
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.resume?.[0] ||
            errorData.detail ||
            `API Error: ${response.status} ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      if (import.meta.env.DEV) console.error('API Request Error:', error);
      throw error;
    }
  },

  getVacancies: (language: string | null = null) =>
    apiRequest<PaginatedResponse<Vacancy>>(API_ENDPOINTS.APPLICATION_VACANCY, {}, language),

  getVacancyById: (id: number | string, language: string | null = null) =>
    apiRequest<SingleResponse<Vacancy>>(API_ENDPOINTS.APPLICATION_VACANCY_BY_ID(id), {}, language),
};

// Banners API
export const bannersApi = {
  getAll: (params: PaginationParams = {}, language: string | null = null) => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', String(params.page));
    if (params.per_page) queryParams.append('per_page', String(params.per_page));
    if (params.search) queryParams.append('search', params.search);

    const endpoint = queryParams.toString()
      ? `${API_ENDPOINTS.BANNERS}?${queryParams.toString()}`
      : API_ENDPOINTS.BANNERS;

    return apiRequest<PaginatedResponse<Banner>>(endpoint, {}, language);
  },

  getById: (id: number | string, language: string | null = null) =>
    apiRequest<SingleResponse<Banner>>(API_ENDPOINTS.BANNERS_BY_ID(id), {}, language),
};

// Council API
export const councilApi = {
  getCouncilMembers: (params: PaginationParams = {}, language: string | null = null) => {
    const query = new URLSearchParams();
    if (params.page) query.append('page', String(params.page));
    if (params.per_page) query.append('per_page', String(params.per_page));
    const endpoint = query.toString()
      ? `${API_ENDPOINTS.COUNCIL_MEMBERS}?${query.toString()}`
      : API_ENDPOINTS.COUNCIL_MEMBERS;
    return apiRequest<PaginatedResponse<CouncilMember>>(endpoint, {}, language);
  },

  getCouncilMemberById: (id: number | string, language: string | null = null) =>
    apiRequest<SingleResponse<CouncilMember>>(
      API_ENDPOINTS.COUNCIL_MEMBERS_BY_ID(id),
      {},
      language
    ),

  getScientificCouncil: (language: string | null = null) =>
    apiRequest<SingleResponse<ScientificCouncil>>(API_ENDPOINTS.SCIENTIFIC_COUNCIL, {}, language),

  getScientificCouncilById: (id: number | string, language: string | null = null) =>
    apiRequest<SingleResponse<ScientificCouncil>>(
      API_ENDPOINTS.SCIENTIFIC_COUNCIL_BY_ID(id),
      {},
      language
    ),
};

// Laboratories API
export const laboratoriesApi = {
  getAll: (language: string | null = null) =>
    apiRequest<PaginatedResponse<LaboratoryItem>>(API_ENDPOINTS.LABORATORIES, {}, language),

  getById: (id: number | string, language: string | null = null) =>
    apiRequest<SingleResponse<LaboratoryItem>>(API_ENDPOINTS.LABORATORIES_BY_ID(id), {}, language),
};

// Department API
export const departmentApi = {
  getAll: (language: string | null = null) =>
    apiRequest<PaginatedResponse<Department>>(API_ENDPOINTS.DEPARTMENT, {}, language),

  getById: (id: number | string, language: string | null = null) =>
    apiRequest<SingleResponse<Department>>(API_ENDPOINTS.DEPARTMENT_BY_ID(id), {}, language),

  getLaboratory: (language: string | null = null) =>
    apiRequest<PaginatedResponse<Laboratory>>(API_ENDPOINTS.DEPARTMENT_LABORATORY, {}, language),

  getLaboratoryById: (id: number | string, language: string | null = null) =>
    apiRequest<SingleResponse<Laboratory>>(
      API_ENDPOINTS.DEPARTMENT_LABORATORY_BY_ID(id),
      {},
      language
    ),

  getLeadership: (type?: string, language: string | null = null) => {
    const query = new URLSearchParams();
    if (type) query.append('type', type);
    const endpoint = query.toString()
      ? `${API_ENDPOINTS.LEADERSHIP}?${query}`
      : API_ENDPOINTS.LEADERSHIP;
    return apiRequest<PaginatedResponse<LeadershipMember>>(endpoint, {}, language);
  },

  getLeadershipById: (id: number | string, language: string | null = null) =>
    apiRequest<SingleResponse<LeadershipMember>>(
      API_ENDPOINTS.DEPARTMENT_LEADERSHIP_BY_ID(id),
      {},
      language
    ),
};

// General API
export const generalApi = {
  getGeneral: (language: string | null = null) =>
    apiRequest<SingleResponse<GeneralData>>(API_ENDPOINTS.GENERAL, {}, language),
  getAbout: (language: string | null = null) =>
    apiRequest<SingleResponse<AboutData>>(API_ENDPOINTS.ABOUT, {}, language),

  contactUs: (data: ContactUsData, language: string | null = null) =>
    apiRequest<unknown>(
      API_ENDPOINTS.CONTACT_US,
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
      language
    ),
};

// News API
export const newsApi = {
  getAll: (params: PaginationParams = {}, language: string | null = null) => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', String(params.page));
    if (params.per_page) queryParams.append('per_page', String(params.per_page));
    if (params.search) queryParams.append('search', params.search);

    const endpoint = queryParams.toString()
      ? `${API_ENDPOINTS.NEWS}?${queryParams.toString()}`
      : API_ENDPOINTS.NEWS;

    return apiRequest<PaginatedResponse<NewsItem>>(endpoint, {}, language);
  },

  getById: (id: number | string, language: string | null = null) =>
    apiRequest<SingleResponse<NewsItem>>(API_ENDPOINTS.NEWS_BY_ID(id), {}, language),
};

// Video Gallery API
export const videoGalleryApi = {
  getAll: (params: PaginationParams = {}, language: string | null = null) => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', String(params.page));
    if (params.per_page) queryParams.append('per_page', String(params.per_page));
    const endpoint = queryParams.toString()
      ? `${API_ENDPOINTS.VIDEO_GALLERY}?${queryParams.toString()}`
      : API_ENDPOINTS.VIDEO_GALLERY;
    return apiRequest<PaginatedResponse<VideoGalleryItem>>(endpoint, {}, language);
  },
};

// Galleries API
export const galleriesApi = {
  getAll: (params: PaginationParams = {}, language: string | null = null) => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', String(params.page));
    if (params.per_page) queryParams.append('per_page', String(params.per_page));
    const endpoint = queryParams.toString()
      ? `${API_ENDPOINTS.GALLERIES}?${queryParams.toString()}`
      : API_ENDPOINTS.GALLERIES;
    return apiRequest<PaginatedResponse<GalleryItem>>(endpoint, {}, language);
  },
};

// Stats API
export const statsApi = {
  getAll: (language: string | null = null) =>
    apiRequest<PaginatedResponse<StatData>>(API_ENDPOINTS.STATS, {}, language),
};

// Partners API
export const partnersApi = {
  getAll: (language: string | null = null) =>
    apiRequest<PaginatedResponse<PartnerItem>>(API_ENDPOINTS.PARTNERS, {}, language),
};

// Structure API
export const structureApi = {
  get: (language: string | null = null) =>
    apiRequest<SingleResponse<StructureData>>(API_ENDPOINTS.STRUCTURE, {}, language),
};

// Institute History API
export const instituteHistoryApi = {
  get: (language: string | null = null) =>
    apiRequest<SingleResponse<InstituteHistoryData>>(API_ENDPOINTS.INSTITUTE_HISTORY, {}, language),
};

// Charter API
export const charterApi = {
  get: (language: string | null = null) =>
    apiRequest<SingleResponse<CharterData>>(API_ENDPOINTS.CHARTER, {}, language),
};

// Institute Director API
export const instituteDirectorApi = {
  get: (language: string | null = null) =>
    apiRequest<SingleResponse<InstituteHistoryData>>(
      API_ENDPOINTS.INSTITUTE_DIRECTOR,
      {},
      language
    ),
};

// Announcements (Ads) API
export const adsApi = {
  getAll: (params: PaginationParams = {}, language: string | null = null) => {
    const query = new URLSearchParams();
    if (params.page) query.append('page', String(params.page));
    if (params.per_page) query.append('per_page', String(params.per_page));
    const endpoint = query.toString() ? `${API_ENDPOINTS.ADS}?${query}` : API_ENDPOINTS.ADS;
    return apiRequest<PaginatedResponse<AnnouncementItem>>(endpoint, {}, language);
  },
  getById: (id: number | string, language: string | null = null) =>
    apiRequest<SingleResponse<AnnouncementItem>>(API_ENDPOINTS.ADS_BY_ID(id), {}, language),
};

// Doctorals (Specialties) API
export const doctoralsApi = {
  getAll: (params: PaginationParams = {}, language: string | null = null) => {
    const query = new URLSearchParams();
    if (params.page) query.append('page', String(params.page));
    if (params.per_page) query.append('per_page', String(params.per_page));
    const endpoint = query.toString()
      ? `${API_ENDPOINTS.DOCTORALS}?${query.toString()}`
      : API_ENDPOINTS.DOCTORALS;
    return apiRequest<PaginatedResponse<SpecialtyItem>>(endpoint, {}, language);
  },
};

// Conferences API
export const conferencesApi = {
  getAll: (params: PaginationParams = {}, language: string | null = null) => {
    const query = new URLSearchParams();
    if (params.page) query.append('page', String(params.page));
    if (params.per_page) query.append('per_page', String(params.per_page));
    const endpoint = query.toString()
      ? `${API_ENDPOINTS.CONFERENCES}?${query}`
      : API_ENDPOINTS.CONFERENCES;
    return apiRequest<PaginatedResponse<ConferenceItem>>(endpoint, {}, language);
  },
  getById: (id: number | string, language: string | null = null) =>
    apiRequest<SingleResponse<ConferenceItem>>(API_ENDPOINTS.CONFERENCES_BY_ID(id), {}, language),
};

// Teams API
export const teamsApi = {
  getAll: (params: PaginationParams = {}, language: string | null = null) => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', String(params.page));
    if (params.per_page) queryParams.append('per_page', String(params.per_page));
    if (params.search) queryParams.append('search', params.search);

    const endpoint = queryParams.toString()
      ? `${API_ENDPOINTS.TEAMS}?${queryParams.toString()}`
      : API_ENDPOINTS.TEAMS;

    return apiRequest<PaginatedResponse<TeamMember>>(endpoint, {}, language);
  },

  getById: (id: number | string, language: string | null = null) =>
    apiRequest<SingleResponse<TeamMember>>(API_ENDPOINTS.TEAMS_BY_ID(id), {}, language),
};
