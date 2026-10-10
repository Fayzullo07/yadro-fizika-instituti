import { useLanguage } from '@/contexts/LanguageContext';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import { MAP_LATITUDE, MAP_LONGITUDE, MAP_ZOOM, CONTACT_PHONES } from '@/config/contactData';

const Map: React.FC = () => {
  const { t } = useLanguage();

  const tiles = [
    {
      label: t('contact.address') || 'Manzil',
      body: (
        <p className="text-[18px] font-bold leading-7 text-[var(--color-neutral-0)]">
          {t('contact.addressValue') ||
            "Toshkent shahar, Ulug'bek tumani, Movarounnahar ko'chasi, 1-uy"}
        </p>
      ),
    },
    {
      label: t('contact.phone') || 'Telefon',
      body: (
        <>
          {CONTACT_PHONES.map((p) => (
            <a
              key={p}
              href={`tel:${p.replace(/\s/g, '')}`}
              className="block text-[18px] font-bold leading-7 text-[var(--color-neutral-0)] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[var(--color-accent-500)] motion-reduce:transition-none"
            >
              {p}
            </a>
          ))}
        </>
      ),
    },
    {
      label: t('contact.workingDays') || 'Ish kunlari',
      body: (
        <>
          <p className="text-[18px] font-bold leading-7 text-[var(--color-neutral-0)]">
            {t('contact.weekdays') || 'Du–Ju:'} 9:00 – 18:00
          </p>
          <p className="text-[16px] leading-6 text-[var(--color-neutral-300)]">
            {t('contact.lunch') || 'Tushlik:'} 13:00 – 14:00
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="pb-10">
      <PageTitle>{t('nav.boglanish.map') || 'Xarita'}</PageTitle>

      <div className="grid grid-cols-1 gap-[var(--space-4)] md:grid-cols-3">
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-brand-700)] bg-[var(--color-brand-950)] p-[var(--space-6)]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-16 size-[200px] rounded-full bg-[var(--color-brand-600)] opacity-40 blur-[80px]"
            />
            <div className="relative flex flex-col gap-[var(--space-2)]">
              <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent-500)]">
                {tile.label}
              </span>
              {tile.body}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[var(--space-6)] h-80 overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] shadow-[var(--shadow-card)] sm:h-[420px] lg:h-[560px]">
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

      <div className="mt-[var(--space-6)] flex flex-col gap-[var(--space-4)] rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-[var(--space-6)] shadow-[var(--shadow-card)] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-col gap-[var(--space-1)]">
          <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent-600)]">
            {t('contact.location') || 'Lokatsiya'}
          </span>
          <p className="text-[16px] font-semibold leading-6 text-[var(--color-neutral-900)]">
            {t('contact.addressValue') ||
              "Toshkent shahar, Ulug'bek tumani, Movarounnahar ko'chasi, 1-uy"}
          </p>
        </div>
        <a
          href={`https://www.google.com/maps?q=${MAP_LATITUDE},${MAP_LONGITUDE}&z=${MAP_ZOOM}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-[var(--space-2)] rounded-[var(--radius-md)] bg-[var(--color-accent-500)] px-[var(--space-6)] py-[var(--space-3)] text-[16px] font-semibold leading-6 text-[var(--color-brand-950)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[var(--color-accent-600)] hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          {t('contact.openMap') || 'Xaritada ochish'} →
        </a>
      </div>
    </div>
  );
};

export default Map;
