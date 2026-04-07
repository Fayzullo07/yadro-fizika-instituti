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
  state: 'enter' | 'exit' | 'idle';
  direction: 'next' | 'prev';
}

const BannerBackground: React.FC<BannerBackgroundProps> = memo(
  ({ banner, index = 0, state, direction }) => {
    if (state === 'idle') return null;

    const getTransform = () => {
      if (state === 'enter') return 'translateX(0) scale(1)';
      return direction === 'next' ? 'translateX(-8%) scale(0.95)' : 'translateX(8%) scale(0.95)';
    };

    return (
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]})`,
          transform: getTransform(),
          opacity: state === 'exit' ? 0 : 1,
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease',
          zIndex: state === 'enter' ? 2 : 1,
        }}
      ></div>
    );
  }
);

export default BannerBackground;
