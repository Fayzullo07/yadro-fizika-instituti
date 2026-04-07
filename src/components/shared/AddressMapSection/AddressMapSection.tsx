import { useGeneral } from '@/hooks/useGeneral';
import { useLanguage } from '@/contexts/LanguageContext';
import MapEmbed from './MapEmbed';
import InfoItem from './InfoItem';
import { LocationIcon, PhoneIcon, ClockIcon } from './Icons';

const ADDRESS = "100194, Yangishahar ko'chasi 9A-uy, Toshkent shahar, Yunusobod tumani";

const AddressMapSection: React.FC = () => {
  const { data: generalData } = useGeneral();
  const { t } = useLanguage();

  const phone = generalData?.phone || '+998 (71) 203-32-31';

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <span className="text-sm font-medium text-gray-400 tracking-widest uppercase mb-3 block">
            {t('contact.location') || 'Lokatsiya'}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            {t('contact.findUs') || 'Bizni toping'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-gray-200 rounded-2xl overflow-hidden">
          <MapEmbed />

          {/* Info */}
          <div className="flex flex-col justify-center gap-6 md:gap-8 p-6 md:p-8 lg:p-10 bg-gray-50">
            <div>
              <InfoItem icon={<LocationIcon />} title={t('contact.address') || 'Manzil'}>
                <p className="text-gray-500 text-sm leading-relaxed">{ADDRESS}</p>
              </InfoItem>
            </div>

            <div>
              <InfoItem icon={<PhoneIcon />} title={t('contact.phone') || 'Telefon'}>
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="text-gray-500 hover:text-gray-900 text-sm font-medium"
                  style={{ transition: 'color 0.5s ease' }}
                >
                  {phone}
                </a>
              </InfoItem>
            </div>

            <div>
              <InfoItem icon={<ClockIcon />} title={t('contact.workingDays') || 'Ish kunlari'}>
                <p className="text-gray-500 text-sm">
                  {t('contact.weekdays') || 'Du-Ju:'}{' '}
                  <span className="font-medium text-gray-700">9:00 – 18:00</span>
                </p>
                <p className="text-gray-500 text-sm">
                  {t('contact.lunch') || 'Tushlik:'}{' '}
                  <span className="font-medium text-gray-700">13:00 – 14:00</span>
                </p>
              </InfoItem>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddressMapSection;
