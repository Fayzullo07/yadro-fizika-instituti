import { useState, useEffect } from 'react';
import prezyidentImage from '@/assets/77200eb7-47ca-e586-f031-19d1a952f3f0_menu-links_487.webp';
import oliymajlisImage from '@/assets/bb.webp';
import hukumatImage from '@/assets/cc.webp';
import portalImage from '@/assets/dd.webp';
import milliyhukquqiImage from '@/assets/ee.webp';

const PartnersMarquee = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Load images - user will provide images
    // For now, using placeholder structure
    const partners = [
      {
        id: 1,
        name: "O'ZBEKISTON RESPUBLIKASI PREZIDENTI",
        subtitle: "MATBUOT XIZMATI",
        image: prezyidentImage,
        link: "https://www.president.uz/uz",
      },
      {
        id: 2,
        name: "O'ZBEKISTON RESPUBLIKASI OLIY",
        subtitle: "MAJLISI QONUNCHILIK PALATASI",
        image: oliymajlisImage,
        link: "https://parliament.gov.uz/",
      },
      {
        id: 3,
        name: "O'ZBEKISTON RESPUBLIKASI OLIY",
        subtitle: "MAJLISINING SENATI",
        image: hukumatImage,
        link: "https://senat.gov.uz/",
      },
      {
        id: 4,
        name: "O'ZBEKISTON RESPUBLIKASI HUKUMATI",
        subtitle: "PORTALI",
        image: portalImage,
        link: "https://gov.uz/uz",
      },
      {
        id: 5,
        name: "MILLIY HUQUQIY",
        subtitle: "INTERNET PORTALI",
        image: milliyhukquqiImage,
        link: "https://huquqiyportal.uz/",
      },
    ];
    setImages(partners);
  }, []);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-100 py-8 overflow-hidden">
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {/* First set */}
          {images.map((partner) => (
            <a
              key={partner.id}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 mx-8 flex flex-col items-center justify-center  !cursor-pointer transition-opacity"
            >
              {partner.image ? (
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="!h-16 !cursor-pointer !w-16 w-auto mb-2 object-contain"
                />
              ) : (
                <div className="h-16 w-24 bg-blue-200 rounded mb-2 flex items-center justify-center">
                  <span className="text-blue-600 text-xs">Icon</span>
                </div>
              )}
              <div className="text-center">
                <p className="text-[#013d8c] font-semibold text-sm">
                  {partner.name}
                </p>
                {partner.subtitle && (
                  <p className="text-[#013d8c] font-semibold text-sm">
                    {partner.subtitle}
                  </p>
                )}
              </div>
            </a>
          ))}
          {/* Duplicate for seamless loop */}
          {images.map((partner) => (
            <a
              key={`${partner.id}-dup`}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 mx-8 flex flex-col items-center justify-center !cursor-pointer transition-opacity cursor-pointer"
            >
              {partner.image ? (
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="!h-16 !w-16 w-auto mb-2 object-contain"
                />
              ) : (
                <div className="h-16 w-24 bg-blue-200 rounded mb-2 flex items-center justify-center">
                  <span className="text-[#013d8c] text-xs">Icon</span>
                </div>
              )}
              <div className="text-center">
                <p className="text-[#013d8c] font-semibold text-sm">
                  {partner.name}
                </p>
                {partner.subtitle && (
                  <p className="text-[#013d8c] font-semibold text-sm">
                    {partner.subtitle}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnersMarquee;
