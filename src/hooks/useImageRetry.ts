import { useState } from 'react';

export const useImageRetry = (maxRetries = 3, retryDelayMs = 1000) => {
  const [retryKey, setRetryKey] = useState(0);

  const handleError = () => {
    setTimeout(() => {
      setRetryKey((prev) => (prev < maxRetries ? prev + 1 : prev));
    }, retryDelayMs);
  };

  return { retryKey, handleError };
};
