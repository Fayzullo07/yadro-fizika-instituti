import { useApi } from './useApi';
import { adsApi } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';

export const useAnnouncements = (page = 1, per_page = 10) => {
  const { language } = useLanguage();
  return useApi(() => adsApi.getAll({ page, per_page }, language), [page, per_page, language]);
};

export const useAnnouncementById = (id: string) => {
  const { language } = useLanguage();
  return useApi(() => adsApi.getById(id, language), [id, language]);
};
