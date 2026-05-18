import { useApi } from './useApi';
import { adsApi } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';

export const useAnnouncements = () => {
  const { language } = useLanguage();
  return useApi(() => adsApi.getAll(language), [language]);
};

export const useAnnouncementById = (id: string) => {
  const { language } = useLanguage();
  return useApi(() => adsApi.getById(id, language), [id, language]);
};
