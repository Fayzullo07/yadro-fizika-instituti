import { memo, useEffect, useState } from 'react';
import type { Banner } from '@/types';
import img1 from '@/assets/institut.png';

interface BannerBackgroundProps {
  banner: Banner;
  index?: number;
  offset?: number;
  animationName?: string;
}

const BannerBackground: React.FC<BannerBackgroundProps> = memo(
  ({ banner, offset, animationName }) => {
    const isDrag = offset !== undefined && offset !== 0;
    const [retryKey, setRetryKey] = useState(0);
    const src = banner.image || img1;
    const bgSrc =
      banner.image && retryKey > 0
        ? `${src}${src.includes('?') ? '&' : '?'}_retry=${retryKey}`
        : src;

    useEffect(() => {
      setRetryKey(0);
    }, [banner.image]);

    const handleError = () => {
      setTimeout(() => setRetryKey((k) => (k < 3 ? k + 1 : k)), 1000);
    };

    return (
      <>
        {banner.image && (
          <img src={bgSrc} alt="" onError={handleError} style={{ display: 'none' }} />
        )}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${bgSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#0f1b3d',
            transform: isDrag ? `translateX(${offset}px)` : undefined,
            animation: animationName
              ? `${animationName} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards`
              : undefined,
            zIndex: 1,
          }}
        />
      </>
    );
  }
);

export default BannerBackground;
