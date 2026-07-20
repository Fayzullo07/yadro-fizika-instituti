import { useEffect, useState } from 'react';

interface RetryImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  maxRetries?: number;
  retryDelayMs?: number;
}

const RetryImage: React.FC<RetryImageProps> = ({
  maxRetries = 3,
  retryDelayMs = 1000,
  ...imgProps
}) => {
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setAttempt(0);
  }, [imgProps.src]);

  const handleError = () => {
    if (attempt >= maxRetries) return;
    setTimeout(() => setAttempt((prev) => prev + 1), retryDelayMs);
  };

  return <img key={attempt} {...imgProps} onError={handleError} />;
};

export default RetryImage;
