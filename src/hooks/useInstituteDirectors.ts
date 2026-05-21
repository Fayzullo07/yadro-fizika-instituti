import { useApi } from './useApi';
import { instituteDirectorApi } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';

export const useInstituteDirectors = () => {
  const { language } = useLanguage();
  return useApi(() => instituteDirectorApi.get(language), [language]);
};
