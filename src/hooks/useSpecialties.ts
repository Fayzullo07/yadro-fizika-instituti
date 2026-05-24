import { useApi } from './useApi';
import { doctoralsApi } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';
import type { PaginationParams } from '@/types';

export const useSpecialties = (params: PaginationParams = {}) => {
  const { language } = useLanguage();
  return useApi(
    () => doctoralsApi.getAll(params, language),
    [language, params.page, params.per_page]
  );
};
