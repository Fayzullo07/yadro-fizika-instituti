import { useLanguage } from '@/contexts/LanguageContext';
import { useGeneral } from '@/hooks/useGeneral';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import {
  CONTACT_PHONES,
  CONTACT_FAX,
  CONTACT_WEBSITE,
  MAP_LATITUDE,
  MAP_LONGITUDE,
  MAP_ZOOM,
  CONTACT_ADDRESS,
  CONTACT_HOURS,
  SOCIAL_LINKS,
} from '@/config/contactData';

const Tile: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-brand-700)] bg-[var(--color-brand-950)] p-[var(--space-6)]">
    <div
      aria-hidden
      className="pointer-events-none absolute -right-10 -top-16 size-[200px] rounded-full bg-[var(--color-brand-600)] opacity-40 blur-[80px]"
    />
    <div className="relative flex flex-col gap-[var(--space-2)]">
      <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent-500)]">
        {label}
      </span>
      {children}
    </div>
  </div>
);

const tileLink =
  'block text-[18px] font-bold leading-7 text-[var(--color-neutral-0)] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[var(--color-accent-500)] motion-reduce:transition-none break-words';

const InfoItem: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex min-w-0 flex-col gap-[var(--space-1)]">
    <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent-600)]">
      {label}
    </span>
    {children}
  </div>
);

const valueCls = 'text-[16px] font-semibold leading-6 text-[var(--color-neutral-900)] break-words';

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const { data: generalData } = useGeneral();

  const email = generalData?.email || 'info@inp.uz';
  const address = CONTACT_ADDRESS[language] ?? CONTACT_ADDRESS.uz;
  const hours = CONTACT_HOURS[language] ?? CONTACT_HOURS.uz;

  return (
    <div className="pb-10">
      <PageTitle>{t('nav.boglanish.contact')}</PageTitle>

      <div className="grid grid-cols-1 gap-[var(--space-4)] md:grid-cols-3">
        <Tile label={t('contact.phone')}>
          {CONTACT_PHONES.map((p) => (
            <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className={tileLink}>
              {p}
            </a>
          ))}
        </Tile>

        <Tile label="Email">
          <a href={`mailto:${email}`} className={tileLink}>
            {email}
          </a>
        </Tile>

        <Tile label={t('contact.workingDays')}>
          {hours.map((h) => (
            <p key={h} className="text-[18px] font-bold leading-7 text-[var(--color-neutral-0)]">
              {h}
            </p>
          ))}
        </Tile>
      </div>

      {/* Map */}
      <div className="mt-[var(--space-6)] h-80 overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] shadow-[var(--shadow-card)] sm:h-[420px] lg:h-[520px]">
        <iframe
          src={`https://www.google.com/maps?q=${MAP_LATITUDE},${MAP_LONGITUDE}&z=${MAP_ZOOM}&t=h&output=embed`}
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-full w-full border-0"
          title="Manzil xaritasi"
        />
      </div>

      {/* Address row */}
      <div className="mt-[var(--space-6)] grid grid-cols-1 items-start gap-[var(--space-6)] rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-[var(--space-6)] shadow-[var(--shadow-card)] md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_auto]">
        <InfoItem label={t('contact.address')}>
          <p className={valueCls}>{address}</p>
        </InfoItem>

        <InfoItem label={t('contact.fax')}>
          <a
            href={`tel:${CONTACT_FAX.replace(/\s/g, '')}`}
            className={`${valueCls} hover:text-[var(--color-brand-700)]`}
          >
            {CONTACT_FAX}
          </a>
        </InfoItem>

        <InfoItem label="Veb-sayt">
          <a
            href={CONTACT_WEBSITE}
            target="_blank"
            rel="noopener noreferrer"
            className={`${valueCls} hover:text-[var(--color-brand-700)]`}
          >
            {CONTACT_WEBSITE}
          </a>
        </InfoItem>

        <a
          href={`https://www.google.com/maps?q=${MAP_LATITUDE},${MAP_LONGITUDE}&z=${MAP_ZOOM}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-[var(--space-2)] self-center rounded-[var(--radius-md)] bg-[var(--color-accent-500)] px-[var(--space-6)] py-[var(--space-3)] text-[16px] font-semibold leading-6 text-[var(--color-brand-950)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[var(--color-accent-600)] hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          {t('contact.openMap')} →
        </a>
      </div>

      {/* Social links */}
      <div className="mt-[var(--space-4)] flex flex-wrap items-center gap-[var(--space-4)] rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-[var(--space-6)] shadow-[var(--shadow-card)]">
        <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent-600)]">
          {t('contact.socialNetworks') || 'Ijtimoiy tarmoqlar'}
        </span>
        <div className="flex flex-wrap gap-[var(--space-2)]">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              title={s.name}
              className={`flex size-9 items-center justify-center rounded-full ${s.color} transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none`}
            >
              <svg
                className="size-4 text-[var(--color-neutral-0)]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                {s.icon}
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
