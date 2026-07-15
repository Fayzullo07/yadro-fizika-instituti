import { useApi } from './useApi';
import { eventsApi } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';
import { PaginationParams } from '@/types';

export const useEvents = (params: PaginationParams = {}) => {
  const { language } = useLanguage();
  return useApi(() => eventsApi.getAll(params, language), [language, params.page, params.per_page]);
};

export const useEventById = (id: number | string) => {
  const { language } = useLanguage();
  return useApi(() => eventsApi.getById(id, language), [id, language]);
};
