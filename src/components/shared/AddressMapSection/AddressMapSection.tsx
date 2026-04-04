import React from 'react';
import { useGeneral } from '@/hooks/useGeneral';
import { useLanguage } from '@/contexts/LanguageContext';

const AddressMapSection: React.FC = () => {
  const { data: generalData } = useGeneral();
  const { t } = useLanguage();

  // Manzil
  const address = "100194, Yangishahar ko'chasi 9A-uy, Toshkent shahar, Yunusobod tumani";
  const phone = generalData?.phone || '+998 (71) 203-32-31';

  // 🔴 ANIQ LOKATSIYA (Yangishahar 9A)
  const latitude = '41.364664';
  const longitude = '69.287714';
  const mapZoom = '16';
  // 41.364664, 69.287714
  return (
    <div className="bg-gray-100 my-8 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          {/* Map */}
          <div className="relative h-[500px] lg:col-span-5 lg:h-[300px] rounded overflow-hidden">
            <iframe
              src={`https://yandex.com/map-widget/v1/?ll=${longitude},${latitude}&z=${mapZoom}&pt=${longitude},${latitude},pm2rdm`}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ position: 'absolute', inset: 0 }}
              title="Manzil xaritasi"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center lg:col-span-2 space-y-6 text-[#013d8c]">
            {/* Address */}
            <div>
              <h3 className="text-lg font-semibold mb-2">{t('contact.address') || 'Manzil:'}</h3>
              <p className="text-sm leading-relaxed">{address}</p>
            </div>

            {/* Working hours */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {t('contact.workingDays') || 'Ish kunlari:'}
              </h3>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg px-4 py-3 border border-[#013d8c]">
                  <p>
                    {t('contact.weekdays') || 'Du-Ju:'}{' '}
                    <span className="font-semibold">9:00 – 18:00</span>
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg px-4 py-3 border border-[#013d8c]">
                  <p>
                    {t('contact.lunch') || 'Tushlik:'}{' '}
                    <span className="font-semibold">13:00 – 14:00</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            {/* <div>
              <h3 className="text-lg font-semibold mb-4">
                {t('nav.boglanish.hotline') || 'Ishonch telefoni:'}
              </h3>
              <div className="bg-white/10 rounded-lg px-4 py-3 border border-[#013d8c]">
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="font-semibold text-lg hover:text-blue-600 transition"
                >
                  {phone}
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressMapSection;
