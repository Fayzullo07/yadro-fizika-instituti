import { useApi } from './useApi';
import { charterApi } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';

export const useCharter = () => {
  const { language } = useLanguage();
  return useApi(() => charterApi.get(language), [language]);
};
