import { useApi } from './useApi';
import { partnersApi } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';

export const usePartners = () => {
  const { language } = useLanguage();
  return useApi(() => partnersApi.getAll(language), [language]);
};
