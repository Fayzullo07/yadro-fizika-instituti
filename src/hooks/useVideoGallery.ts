import { useApi } from './useApi';
import { videoGalleryApi } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';
import type { PaginationParams } from '@/types';

export const useVideoGallery = (params: PaginationParams = {}) => {
  const { language } = useLanguage();
  return useApi(
    () => videoGalleryApi.getAll(params, language),
    [language, params.page, params.per_page]
  );
};
