import { useApi } from './useApi';
import { bannersApi } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';
import { PaginationParams } from '@/types';

export const useBanners = (params: PaginationParams = {}) => {
  const { language } = useLanguage();
  return useApi(
    () => bannersApi.getAll(params, language),
    [language, params.page, params.per_page, params.search]
  );
};

export const useBanner = (id: number | string) => {
  const { language } = useLanguage();
  return useApi(() => bannersApi.getById(id, language), [id, language]);
};
