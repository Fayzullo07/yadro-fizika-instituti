import { useApi, useMutation } from './useApi';
import { applicationApi } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';
import { ApplicationData } from '@/types';

export const useVacancies = () => {
  const { language } = useLanguage();
  return useApi(() => applicationApi.getVacancies(language), [language]);
};

export const useVacancy = (id: number | string) => {
  const { language } = useLanguage();
  return useApi(() => applicationApi.getVacancyById(id, language), [id, language]);
};

export const useCreateApplication = () => {
  const { language } = useLanguage();
  return useMutation<FormData | ApplicationData, unknown>((data) =>
    applicationApi.create(data, language)
  );
};
