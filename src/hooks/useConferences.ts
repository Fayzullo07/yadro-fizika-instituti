import { useApi } from '@/hooks/useApi';
import { conferencesApi } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';

export const useConferences = () => {
  const { language } = useLanguage();
  return useApi(() => conferencesApi.getAll(language), [language]);
};
