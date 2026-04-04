import { useApi } from './useApi';
import { newsApi } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';

export const useNews = (params = {}) => {
  const { language } = useLanguage();
  return useApi(() => newsApi.getAll(params, language), [language, params.page, params.per_page, params.search]);
};

export const useNewsById = (id) => {
  const { language } = useLanguage();
  return useApi(() => newsApi.getById(id, language), [id, language]);
};

