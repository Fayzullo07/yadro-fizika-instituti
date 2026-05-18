import { useApi } from './useApi';
import { instituteHistoryApi } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';

export const useInstituteHistory = () => {
  const { language } = useLanguage();
  return useApi(() => instituteHistoryApi.get(language), [language]);
};
