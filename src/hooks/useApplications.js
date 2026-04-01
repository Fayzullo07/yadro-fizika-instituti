import { useApi, useMutation } from './useApi';
import { applicationApi } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';

export const useVacancies = () => {
  const { language } = useLanguage();
  return useApi(() => applicationApi.getVacancies(language), [language]);
};

export const useVacancy = (id) => {
  const { language } = useLanguage();
  return useApi(() => applicationApi.getVacancyById(id, language), [id, language]);
};

export const useCreateApplication = () => {
  const { language } = useLanguage();
  return useMutation((data) => applicationApi.create(data, language));
};

