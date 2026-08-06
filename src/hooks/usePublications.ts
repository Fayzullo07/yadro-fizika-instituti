import { useApi } from './useApi';
import { publicationsApi, PublicationType } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';
import type { PaginationParams } from '@/types';

export const usePublications = (type: PublicationType, params: PaginationParams = {}) => {
  const { language } = useLanguage();
  return useApi(
    () => publicationsApi.getAll(type, params, language),
    [type, params.page, params.per_page, language]
  );
};

export const useDissertations = (params: PaginationParams = {}) =>
  usePublications(PublicationType.Dissertation, params);
export const useAbstracts = (params: PaginationParams = {}) =>
  usePublications(PublicationType.Abstract, params);
export const useScientificArticles = (params: PaginationParams = {}) =>
  usePublications(PublicationType.ScientificArticle, params);

export const usePublicationById = (id: number | string) => {
  const { language } = useLanguage();
  return useApi(() => publicationsApi.getById(id, language), [id, language]);
};
