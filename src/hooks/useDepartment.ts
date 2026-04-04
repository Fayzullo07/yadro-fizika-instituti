import { useApi } from './useApi';
import { departmentApi, teamsApi } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';
import { PaginationParams } from '@/types';

export const useDepartments = () => {
  const { language } = useLanguage();
  return useApi(() => departmentApi.getAll(language), [language]);
};

export const useDepartment = (id: number | string) => {
  const { language } = useLanguage();
  return useApi(() => departmentApi.getById(id, language), [id, language]);
};

export const useLaboratory = () => {
  const { language } = useLanguage();
  return useApi(() => departmentApi.getLaboratory(language), [language]);
};

export const useLaboratoryById = (id: number | string) => {
  const { language } = useLanguage();
  return useApi(() => departmentApi.getLaboratoryById(id, language), [id, language]);
};

export const useLeadership = () => {
  const { language } = useLanguage();
  return useApi(() => departmentApi.getLeadership(language), [language]);
};

export const useLeadershipById = (id: number | string) => {
  const { language } = useLanguage();
  return useApi(() => departmentApi.getLeadershipById(id, language), [id, language]);
};

export const useTeams = (params: PaginationParams = {}) => {
  const { language } = useLanguage();
  return useApi(() => teamsApi.getAll(params, language), [language, params.page, params.per_page, params.search]);
};

export const useTeamById = (id: number | string) => {
  const { language } = useLanguage();
  return useApi(() => teamsApi.getById(id, language), [id, language]);
};
