import { memo } from 'react';
import type { Banner } from '@/types';

interface BannerBackgroundProps {
  banner: Banner;
  isActive: boolean;
  isFirst: boolean;
}

const BannerBackground: React.FC<BannerBackgroundProps> = memo(({ banner, isActive }) => (
  <div
    className="absolute inset-0 bg-cover bg-center bg-fixed"
    style={{
      backgroundImage: banner.image ? `url(${banner.image})` : undefined,
      opacity: isActive ? 1 : 0,
      transition: 'opacity 1.5s ease-in-out',
    }}
  ></div>
));

export default BannerBackground;
