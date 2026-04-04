import { useApi } from './useApi';
import { newsApi } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';
import { PaginationParams } from '@/types';

export const useNews = (params: PaginationParams = {}) => {
  const { language } = useLanguage();
  return useApi(() => newsApi.getAll(params, language), [language, params.page, params.per_page, params.search]);
};

export const useNewsById = (id: number | string) => {
  const { language } = useLanguage();
  return useApi(() => newsApi.getById(id, language), [id, language]);
};

