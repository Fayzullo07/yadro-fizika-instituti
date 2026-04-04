import { useApi } from './useApi';
import { councilApi } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';

export const useCouncilMembers = () => {
  const { language } = useLanguage();
  return useApi(() => councilApi.getCouncilMembers(language), [language]);
};

export const useCouncilMember = (id: number | string) => {
  const { language } = useLanguage();
  return useApi(() => councilApi.getCouncilMemberById(id, language), [id, language]);
};

export const useScientificCouncil = () => {
  const { language } = useLanguage();
  return useApi(() => councilApi.getScientificCouncil(language), [language]);
};

export const useScientificCouncilById = (id: number | string) => {
  const { language } = useLanguage();
  return useApi(() => councilApi.getScientificCouncilById(id, language), [id, language]);
};
