import { Image } from 'antd';
import { sanitizeHtmlRich } from '@/utils/htmlUtils';
import type { LaboratoryItem } from '@/types';

const AboutTab: React.FC<{ lab: LaboratoryItem }> = ({ lab }) => {
  if (!lab.content && !lab.images?.length)
    return <p className="text-center py-16 text-gray-400">Kontent mavjud emas</p>;

  return (
    <div className="bg-white shadow-sm">
      {lab.content && (
        <div
          className="p-6 w-full max-w-none [&_table]:w-full [&_img]:max-w-full"
          dangerouslySetInnerHTML={{ __html: sanitizeHtmlRich(lab.content) }}
        />
      )}
      {lab.images && lab.images.length > 0 && (
        <div className="p-6 pt-0">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-base font-semibold text-[#013d8c] tracking-wide uppercase">
              Rasmlar
            </span>
            <div className="flex-1 h-px bg-linear-to-r from-[#013d8c33] to-transparent" />
          </div>
          <Image.PreviewGroup>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {lab.images.map((img) => (
                <div
                  key={img.id}
                  className="relative overflow-hidden rounded-lg shadow-sm"
                  style={{ blockSize: 160 }}
                >
                  {/* blurred background */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${img.url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'blur(12px)',
                      transform: 'scale(1.1)',
                    }}
                  />
                  {/* foreground image */}
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <Image
                      src={img.url}
                      alt=""
                      style={{ maxBlockSize: 160, maxInlineSize: '100%', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Image.PreviewGroup>
        </div>
      )}
    </div>
  );
};

export default AboutTab;
