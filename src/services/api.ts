import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';
import { getStoredLanguage } from '@/config/i18n';
import type { PaginationParams, PaginatedResponse, ContactUsData, ApplicationData, GeneralData, AboutData, Banner, ScientificCouncil, CouncilMember, Department, Laboratory, LeadershipMember, NewsItem, TeamMember, Vacancy } from '@/types';

// Helper function for API requests
export const apiRequest = async <T = unknown>(endpoint: string, options: RequestInit = {}, language: string | null = null): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const lang = language || getStoredLanguage();
  
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
    console.error('API Request Error:', error);
    throw error;
  }
};

// Applications API
export const applicationApi = {
  create: async (data: FormData | ApplicationData, language: string | null = null) => {
    const url = `${API_BASE_URL}${API_ENDPOINTS.APPLICATION}`;
    const lang = language || getStoredLanguage();
    
    // Check if data is FormData
    const isFormData = data instanceof FormData;
    
    const config = {
      method: 'POST',
      headers: {
        'Accept-Language': lang,
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      },
      body: isFormData ? data : JSON.stringify(data),
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.resume?.[0] || errorData.detail || `API Error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  },
  
  getVacancies: (language: string | null = null) => apiRequest<PaginatedResponse<Vacancy>>(API_ENDPOINTS.APPLICATION_VACANCY, {}, language),

  getVacancyById: (id: number | string, language: string | null = null) => apiRequest<Vacancy>(API_ENDPOINTS.APPLICATION_VACANCY_BY_ID(id), {}, language),
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

  getById: (id: number | string, language: string | null = null) => apiRequest<Banner>(API_ENDPOINTS.BANNERS_BY_ID(id), {}, language),
};

// Council API
export const councilApi = {
  getCouncilMembers: (language: string | null = null) => apiRequest<PaginatedResponse<CouncilMember>>(API_ENDPOINTS.COUNCIL_MEMBERS, {}, language),

  getCouncilMemberById: (id: number | string, language: string | null = null) => apiRequest<CouncilMember>(API_ENDPOINTS.COUNCIL_MEMBERS_BY_ID(id), {}, language),

  getScientificCouncil: (language: string | null = null) => apiRequest<PaginatedResponse<ScientificCouncil>>(API_ENDPOINTS.SCIENTIFIC_COUNCIL, {}, language),

  getScientificCouncilById: (id: number | string, language: string | null = null) => apiRequest<ScientificCouncil>(API_ENDPOINTS.SCIENTIFIC_COUNCIL_BY_ID(id), {}, language),
};

// Department API
export const departmentApi = {
  getAll: (language: string | null = null) => apiRequest<PaginatedResponse<Department>>(API_ENDPOINTS.DEPARTMENT, {}, language),

  getById: (id: number | string, language: string | null = null) => apiRequest<Department>(API_ENDPOINTS.DEPARTMENT_BY_ID(id), {}, language),

  getLaboratory: (language: string | null = null) => apiRequest<PaginatedResponse<Laboratory>>(API_ENDPOINTS.DEPARTMENT_LABORATORY, {}, language),

  getLaboratoryById: (id: number | string, language: string | null = null) => apiRequest<Laboratory>(API_ENDPOINTS.DEPARTMENT_LABORATORY_BY_ID(id), {}, language),

  getLeadership: (language: string | null = null) => apiRequest<PaginatedResponse<LeadershipMember>>(API_ENDPOINTS.DEPARTMENT_LEADERSHIP, {}, language),

  getLeadershipById: (id: number | string, language: string | null = null) => apiRequest<LeadershipMember>(API_ENDPOINTS.DEPARTMENT_LEADERSHIP_BY_ID(id), {}, language),
};

// General API
export const generalApi = {
  getGeneral: (language: string | null = null) => apiRequest<GeneralData>(API_ENDPOINTS.GENERAL, {}, language),
  getAbout: (language: string | null = null) => apiRequest<AboutData>(API_ENDPOINTS.ABOUT, {}, language),

  contactUs: (data: ContactUsData, language: string | null = null) => apiRequest<unknown>(API_ENDPOINTS.CONTACT_US, {
    method: 'POST',
    body: JSON.stringify(data),
  }, language),
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

  getById: (id: number | string, language: string | null = null) => apiRequest<NewsItem>(API_ENDPOINTS.NEWS_BY_ID(id), {}, language),
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

  getById: (id: number | string, language: string | null = null) => apiRequest<TeamMember>(API_ENDPOINTS.TEAMS_BY_ID(id), {}, language),
};
