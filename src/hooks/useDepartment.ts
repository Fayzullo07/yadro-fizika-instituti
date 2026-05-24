import { useApi } from './useApi';
import {
  departmentApi,
  internationalCollaborationsApi,
  laboratoriesApi,
  laboratoryTeamsApi,
  scientificActivitiesApi,
  teamsApi,
} from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';
import { PaginationParams } from '@/types';

export const useScientificActivity = (laboratoryId: number | string) => {
  const { language } = useLanguage();
  return useApi(
    () => scientificActivitiesApi.getByLaboratory(laboratoryId, language),
    [laboratoryId, language]
  );
};

export const useLaboratoryTeams = (laboratoryId: number | string) => {
  const { language } = useLanguage();
  return useApi(
    () => laboratoryTeamsApi.getByLaboratory(laboratoryId, language),
    [laboratoryId, language]
  );
};

export const useLaboratoryTeamMember = (id: number | string) => {
  const { language } = useLanguage();
  return useApi(() => laboratoryTeamsApi.getById(id, language), [id, language]);
};

export const useInternationalCollaboration = (laboratoryId: number | string) => {
  const { language } = useLanguage();
  return useApi(
    () => internationalCollaborationsApi.getByLaboratory(laboratoryId, language),
    [laboratoryId, language]
  );
};

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

export const useLaboratories = () => {
  const { language } = useLanguage();
  return useApi(() => laboratoriesApi.getAll(language), [language]);
};

export const useLaboratoryItem = (id: number | string) => {
  const { language } = useLanguage();
  return useApi(() => laboratoriesApi.getById(id, language), [id, language]);
};

export const useLaboratoryById = (id: number | string) => {
  const { language } = useLanguage();
  return useApi(() => departmentApi.getLaboratoryById(id, language), [id, language]);
};

export const useLeadership = (type?: string) => {
  const { language } = useLanguage();
  return useApi(() => departmentApi.getLeadership(type, language), [type, language]);
};

export const useLeadershipById = (id: number | string) => {
  const { language } = useLanguage();
  return useApi(() => departmentApi.getLeadershipById(id, language), [id, language]);
};

export const useTeams = (params: PaginationParams = {}) => {
  const { language } = useLanguage();
  return useApi(
    () => teamsApi.getAll(params, language),
    [language, params.page, params.per_page, params.search]
  );
};

export const useTeamById = (id: number | string) => {
  const { language } = useLanguage();
  return useApi(() => teamsApi.getById(id, language), [id, language]);
};
