import { useState } from 'react';

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
  const [prevSrc, setPrevSrc] = useState(imgProps.src);

  // Reset the retry count when the image src changes, without a
  // render -> effect -> setState -> re-render round trip.
  if (imgProps.src !== prevSrc) {
    setPrevSrc(imgProps.src);
    setAttempt(0);
  }

  const handleError = () => {
    if (attempt >= maxRetries) return;
    setTimeout(() => setAttempt((prev) => prev + 1), retryDelayMs);
  };

  return <img key={attempt} {...imgProps} onError={handleError} />;
};

export default RetryImage;
