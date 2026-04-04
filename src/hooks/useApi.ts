import { useState, useEffect } from 'react';

// Generic hook for GET requests
export const useApi = <T>(apiFunction: () => Promise<T>, dependencies: React.DependencyList = []) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction();
        setData(result);
      } catch (err: unknown) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, loading, error };
};

// Hook for POST requests
export const useMutation = <T, R = unknown>(apiFunction: (data: T) => Promise<R>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (data: T): Promise<R> => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(data);
      return result;
    } catch (err: unknown) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};

