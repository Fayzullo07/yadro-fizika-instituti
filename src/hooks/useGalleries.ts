import { useApi } from './useApi';
import { galleriesApi } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';
import type { PaginationParams } from '@/types';

export const useGalleries = (params: PaginationParams = {}) => {
  const { language } = useLanguage();
  return useApi(
    () => galleriesApi.getAll(params, language),
    [language, params.page, params.per_page]
  );
};

export const useGalleryById = (id: string) => {
  const { language } = useLanguage();
  return useApi(() => galleriesApi.getById(id, language), [id, language]);
};
