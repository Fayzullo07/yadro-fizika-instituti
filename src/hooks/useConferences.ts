import { useApi } from '@/hooks/useApi';
import { conferencesApi } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';

export const useConferences = (page = 1, per_page = 10) => {
  const { language } = useLanguage();
  return useApi(
    () => conferencesApi.getAll({ page, per_page }, language),
    [page, per_page, language]
  );
};

export const useConferenceById = (id: string) => {
  const { language } = useLanguage();
  return useApi(() => conferencesApi.getById(id, language), [id, language]);
};
