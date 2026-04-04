import { useEffect } from 'react';
import { useMutation } from './useApi';
import { generalApi } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';
import useGeneralStore from '@/store/useGeneralStore';
import { ContactUsData } from '@/types';

export const useGeneral = () => {
  const { language } = useLanguage();
  const { generalData, loading, error, fetchGeneral } = useGeneralStore();

  useEffect(() => {
    fetchGeneral(language);
  }, [language, fetchGeneral]);

  return { data: generalData, loading, error };
};

export const useContactUs = () => {
  const { language } = useLanguage();
  return useMutation<ContactUsData, unknown>((data) => generalApi.contactUs(data, language));
};
