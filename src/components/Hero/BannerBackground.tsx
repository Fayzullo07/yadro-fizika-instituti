import { memo } from 'react';
import type { Banner } from '@/types';

interface BannerBackgroundProps {
  banner: Banner;
  state: 'enter' | 'exit' | 'idle';
  direction: 'next' | 'prev';
}

const BannerBackground: React.FC<BannerBackgroundProps> = memo(({ banner, state, direction }) => {
  if (state === 'idle') return null;

  const getTransform = () => {
    if (state === 'enter') return 'translateX(0) scale(1)';
    return direction === 'next' ? 'translateX(-8%) scale(0.95)' : 'translateX(8%) scale(0.95)';
  };

  return (
    <div
      className="absolute inset-y-0 left-0 md:left-[25%] right-0 border border-gray-100 bg-cover md:bg-contain bg-center bg-no-repeat"
      style={{
        backgroundImage: banner.image ? `url(${banner.image})` : undefined,
        transform: getTransform(),
        opacity: state === 'exit' ? 0 : 1,
        transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease',
        zIndex: state === 'enter' ? 2 : 1,
      }}
    ></div>
  );
});

export default BannerBackground;
