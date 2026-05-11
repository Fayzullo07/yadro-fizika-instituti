import { useApi } from './useApi';
import { statsApi } from '@/services/api';

export const useStats = () => {
  const { data, loading, error } = useApi(() => statsApi.getAll());
  return { data: data?.data ?? [], loading, error };
};
