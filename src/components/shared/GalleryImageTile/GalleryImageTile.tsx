import { Image } from 'antd';
import { useImageRetry } from '@/hooks/useImageRetry';

interface GalleryImageTileProps {
  src: string;
  alt?: string;
  previewLabel: string;
}

// One tile of a photo-gallery grid: a fixed 16:9 crop that opens in the
// surrounding <Image.PreviewGroup> lightbox when clicked.
const GalleryImageTile: React.FC<GalleryImageTileProps> = ({ src, alt = '', previewLabel }) => {
  const { retryKey, handleError } = useImageRetry();

  return (
    <div className="overflow-hidden aspect-video bg-gray-100 relative [&_.ant-image]:w-full [&_.ant-image]:h-full">
      <Image
        key={retryKey}
        src={src}
        alt={alt}
        placeholder={<div className="absolute inset-0 bg-gray-200 animate-pulse" />}
        onError={handleError}
        preview={{ mask: <span className="text-xs">{previewLabel}</span> }}
        // antd injects `.ant-image .ant-image-img { height: auto }` at runtime, after
        // Tailwind's sheet and at equal specificity, so utility classes lose. Sizing
        // the img inline is how the gallery hero solves the same clash.
        style={{ inlineSize: '100%', blockSize: '100%', objectFit: 'cover' }}
      />
    </div>
  );
};

export default GalleryImageTile;
