import { memo } from 'react';
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
    const src = banner.image || img1;

    return (
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${src})`,
          transform: isDrag ? `translateX(${offset}px)` : undefined,
          animation: animationName
            ? `${animationName} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards`
            : undefined,
          zIndex: 1,
        }}
      />
    );
  }
);

export default BannerBackground;
