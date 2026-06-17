import { useApi } from './useApi';
import { publicationsApi, PublicationType } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';

export const usePublications = (type: PublicationType) => {
  const { language } = useLanguage();
  return useApi(() => publicationsApi.getAll(type, language), [type, language]);
};

export const useDissertations = () => usePublications(PublicationType.Dissertation);
export const useAbstracts = () => usePublications(PublicationType.Abstract);
export const useScientificArticles = () => usePublications(PublicationType.ScientificArticle);

export const usePublicationById = (id: number | string) => {
  const { language } = useLanguage();
  return useApi(() => publicationsApi.getById(id, language), [id, language]);
};
