import { useApi } from './useApi';
import { structureApi } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';

export const useStructure = () => {
  const { language } = useLanguage();
  return useApi(() => structureApi.get(language), [language]);
};
