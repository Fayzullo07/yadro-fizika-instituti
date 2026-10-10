import { useLanguage } from '@/contexts/LanguageContext';
import {
  CONTACT_FAX,
  CONTACT_PHONES,
  MAP_LATITUDE,
  MAP_LONGITUDE,
  MAP_ZOOM,
} from '@/config/contactData';
import { CONTAINER, SECTION_PAD } from './layout';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const Item: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex flex-col gap-[var(--space-1)]">
    <span className="text-[12px] font-bold uppercase leading-4 tracking-[0.14em] text-[var(--color-accent-600)]">
      {label}
    </span>
    <div className="text-[16px] leading-6 text-[var(--color-neutral-900)]">{children}</div>
  </div>
);

const LocationGlass: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className={`bg-[var(--color-neutral-0)] ${SECTION_PAD}`}>
      <div className={`${CONTAINER} flex flex-col gap-[var(--space-12)]`}>
        <SectionHeader eyebrow={t('contact.location')} title={t('contact.findUs')} />
        <Reveal className="relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-brand-100)] shadow-[var(--shadow-card)]">
          <iframe
            src={`https://www.google.com/maps?q=${MAP_LATITUDE},${MAP_LONGITUDE}&z=${MAP_ZOOM}&output=embed`}
            title={t('contact.findUs')}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block h-[320px] w-full border-0 lg:h-[520px]"
          />
          <div className="flex flex-col gap-[var(--space-6)] bg-white/85 p-[var(--space-6)] backdrop-blur-md lg:absolute lg:left-[var(--space-8)] lg:top-[var(--space-8)] lg:w-[360px] lg:rounded-[var(--radius-lg)] lg:shadow-[var(--shadow-card)]">
            <Item label={t('contact.address')}>{t('contact.addressValue')}</Item>
            <Item label={t('contact.phone')}>
              {CONTACT_PHONES.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/\s/g, '')}`}
                  className="block transition-colors duration-300 hover:text-[var(--color-brand-700)]"
                >
                  {p}
                </a>
              ))}
            </Item>
            <Item label={t('contact.fax')}>{CONTACT_FAX}</Item>
            <Item label={t('contact.workingDays')}>
              <p>{t('contact.weekdays')} 9:00 – 18:00</p>
              <p>{t('contact.lunch')} 13:00 – 14:00</p>
            </Item>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default LocationGlass;
