import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import galgotiasLogo from '@/assets/galgotias.png';
import visitechLogo from '@/assets/visitech.png';
import ordenaLogo from '@/assets/ordena.png';
import miaLogo from '@/assets/mia.png';
import tuyafedLogo from '@/assets/tuyafed.png';
import accelerationLogo from '@/assets/acceleration.jpg';
import SectionHeader from '@/components/shared/SectionHeader/SectionHeader';

const International = () => {
  const { t } = useLanguage();
  const [selectedPartner, setSelectedPartner] = useState(null);

  const partners = [
    {
      id: 1,
      name: 'GALGOTIAS EDUCATIONAL INSTITUTIONS',
      logo: galgotiasLogo,
    },
    {
      id: 2,
      name: 'VISITECH',
      logo: visitechLogo,
    },
    {
      id: 3,
      name: 'ORDENA LENINA im. M.V.KELDYША RAN',
      logo: ordenaLogo,
    },
    {
      id: 4,
      name: 'MIA TEKNOLOJI',
      logo: miaLogo,
    },
    {
      id: 5,
      name: 'TUYAFED YAZILIMCILAR FEDERASYONU',
      logo: tuyafedLogo,
    },
    {
      id: 6,
      name: 'ACCELERATION',
      logo: accelerationLogo,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 py-5 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <SectionHeader
          title={t('pages.international.title') || 'XALQARO HAMKORLIK ALOQALARI'}
          subtitle={t('pages.international.description') || "Institut raqamli texnologiyalar va sun'iy intellekt sohasidagi tashkilotlar bilan hamkorlik uchun ochiq. Quyida keltirilgan tashkilotlar bilan tuzilgan hamkorlik to'g'risidagi hujjatlar bilan tanishishingiz mumkin, buning uchun ularning tegishli logotiplari ustiga bosing."}
        />

        {/* Partners Grid */}
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6">
            {partners.map((partner) => (
              <div
                key={partner.id}
                onClick={() => setSelectedPartner(partner)}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 md:p-8 cursor-pointer transform hover:scale-103 border border-gray-200 hover:border-blue-300"
              >
                <div className="flex items-center justify-center h-32 md:h-40 mb-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200x100?text=' + encodeURIComponent(partner.name);
                    }}
                  />
                </div>
                <p className="text-center text-sm md:text-base text-gray-600 font-medium mt-4">
                  {partner.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Partner Details */}
        {selectedPartner && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPartner(null)}
          >
            <div
              className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {selectedPartner.name}
                </h2>
                <button
                  onClick={() => setSelectedPartner(null)}
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex justify-center mb-6">
                <img
                  src={selectedPartner.logo}
                  alt={selectedPartner.name}
                  className="max-w-full max-h-48 object-contain"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x150?text=' + encodeURIComponent(selectedPartner.name);
                  }}
                />
              </div>
              <div className="text-gray-700">
                <p className="mb-4">
                  {t('pages.international.partnerInfo') || 
                    'Hamkorlik to\'g\'risidagi hujjatlar va ma\'lumotlar...'}
                </p>
                <a
                  href="#"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('pages.international.viewDocuments') || 'Hujjatlarni ko\'rish'}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default International;

