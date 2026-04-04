import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';
import { getStoredLanguage } from '@/config/i18n';

// Helper function for API requests
export const apiRequest = async (endpoint, options = {}, language = null) => {
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
  create: async (data, language = null) => {
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
  
  getVacancies: (language = null) => apiRequest(API_ENDPOINTS.APPLICATION_VACANCY, {}, language),
  
  getVacancyById: (id, language = null) => apiRequest(API_ENDPOINTS.APPLICATION_VACANCY_BY_ID(id), {}, language),
};

// Banners API
export const bannersApi = {
  getAll: (params = {}, language = null) => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page);
    if (params.per_page) queryParams.append('per_page', params.per_page);
    if (params.search) queryParams.append('search', params.search);
    
    const endpoint = queryParams.toString() 
      ? `${API_ENDPOINTS.BANNERS}?${queryParams.toString()}`
      : API_ENDPOINTS.BANNERS;
    
    return apiRequest(endpoint, {}, language);
  },
  
  getById: (id, language = null) => apiRequest(API_ENDPOINTS.BANNERS_BY_ID(id), {}, language),
};

// Council API
export const councilApi = {
  getCouncilMembers: (language = null) => apiRequest(API_ENDPOINTS.COUNCIL_MEMBERS, {}, language),
  
  getCouncilMemberById: (id, language = null) => apiRequest(API_ENDPOINTS.COUNCIL_MEMBERS_BY_ID(id), {}, language),
  
  getScientificCouncil: (language = null) => apiRequest(API_ENDPOINTS.SCIENTIFIC_COUNCIL, {}, language),
  
  getScientificCouncilById: (id, language = null) => apiRequest(API_ENDPOINTS.SCIENTIFIC_COUNCIL_BY_ID(id), {}, language),
};

// Department API
export const departmentApi = {
  getAll: (language = null) => apiRequest(API_ENDPOINTS.DEPARTMENT, {}, language),
  
  getById: (id, language = null) => apiRequest(API_ENDPOINTS.DEPARTMENT_BY_ID(id), {}, language),
  
  getLaboratory: (language = null) => apiRequest(API_ENDPOINTS.DEPARTMENT_LABORATORY, {}, language),
  
  getLaboratoryById: (id, language = null) => apiRequest(API_ENDPOINTS.DEPARTMENT_LABORATORY_BY_ID(id), {}, language),
  
  getLeadership: (language = null) => apiRequest(API_ENDPOINTS.DEPARTMENT_LEADERSHIP, {}, language),
  
  getLeadershipById: (id, language = null) => apiRequest(API_ENDPOINTS.DEPARTMENT_LEADERSHIP_BY_ID(id), {}, language),
};

// General API
export const generalApi = {
  getGeneral: (language = null) => apiRequest(API_ENDPOINTS.GENERAL, {}, language),
  getAbout: (language = null) => apiRequest(API_ENDPOINTS.ABOUT, {}, language),
  
  contactUs: (data, language = null) => apiRequest(API_ENDPOINTS.CONTACT_US, {
    method: 'POST',
    body: JSON.stringify(data),
  }, language),
};

// News API
export const newsApi = {
  getAll: (params = {}, language = null) => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page);
    if (params.per_page) queryParams.append('per_page', params.per_page);
    if (params.search) queryParams.append('search', params.search);
    
    const endpoint = queryParams.toString() 
      ? `${API_ENDPOINTS.NEWS}?${queryParams.toString()}`
      : API_ENDPOINTS.NEWS;
    
    return apiRequest(endpoint, {}, language);
  },
  
  getById: (id, language = null) => apiRequest(API_ENDPOINTS.NEWS_BY_ID(id), {}, language),
};

// Teams API
export const teamsApi = {
  getAll: (params = {}, language = null) => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page);
    if (params.per_page) queryParams.append('per_page', params.per_page);
    if (params.search) queryParams.append('search', params.search);
    
    const endpoint = queryParams.toString() 
      ? `${API_ENDPOINTS.TEAMS}?${queryParams.toString()}`
      : API_ENDPOINTS.TEAMS;
    
    return apiRequest(endpoint, {}, language);
  },
  
  getById: (id, language = null) => apiRequest(API_ENDPOINTS.TEAMS_BY_ID(id), {}, language),
};
