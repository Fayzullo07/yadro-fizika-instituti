import { useLanguage } from '@/contexts/LanguageContext';
import { CONTACT_PHONES, CONTACT_FAX } from '@/config/contactData';
import MapEmbed from './MapEmbed';
import InfoItem from './InfoItem';
import { LocationIcon, PhoneIcon, ClockIcon, FaxIcon } from './Icons';

const AddressMapSection: React.FC = () => {
  const { t } = useLanguage();

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
            <InfoItem icon={<LocationIcon />} title={t('contact.address') || 'Manzil'}>
              <p className="text-gray-500 text-sm leading-relaxed">{t('contact.addressValue')}</p>
            </InfoItem>

            <InfoItem icon={<PhoneIcon />} title={t('contact.phone') || 'Telefon'}>
              {CONTACT_PHONES.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/\s/g, '')}`}
                  className="text-gray-500 hover:text-gray-900 text-sm font-medium block transition-colors duration-500"
                >
                  {p}
                </a>
              ))}
            </InfoItem>

            <InfoItem icon={<FaxIcon />} title={t('contact.fax') || 'Faks'}>
              <p className="text-gray-500 text-sm font-medium">{CONTACT_FAX}</p>
            </InfoItem>

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
    </section>
  );
};

export default AddressMapSection;
