import { memo } from 'react';
import type { Banner } from '@/types';
import img1 from '@/assets/institut.png';
import img2 from '@/assets/bb.webp';
import img3 from '@/assets/cc.webp';
import img4 from '@/assets/dd.webp';
import img5 from '@/assets/ee.webp';

const FALLBACK_IMAGES = [img1, img2, img3, img4, img5];

interface BannerBackgroundProps {
  banner: Banner;
  index?: number;
  offset?: number;
  animate?: boolean;
  animationName?: string;
}

const BannerBackground: React.FC<BannerBackgroundProps> = memo(
  ({ index = 0, offset, animate, animationName }) => {
    const isDrag = offset !== undefined && offset !== 0;

    return (
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${FALLBACK_IMAGES[0]})`,
          transform: isDrag ? `translateX(${offset}px)` : undefined,
          transition: isDrag && animate ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          animation: animationName
            ? `${animationName} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards`
            : undefined,
          zIndex: 1,
        }}
      ></div>
    );
  }
);

export default BannerBackground;
