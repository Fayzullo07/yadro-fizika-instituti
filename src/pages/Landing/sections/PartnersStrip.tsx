import { useLanguage } from '@/contexts/LanguageContext';
import visitech from '@/assets/visitech.png';
import galgotias from '@/assets/galgotias.png';
import ordena from '@/assets/ordena.png';
import mia from '@/assets/mia.png';
import tuyafed from '@/assets/tuyafed.png';

const PARTNERS = [
  { name: 'Visitech', src: visitech },
  { name: 'Galgotias', src: galgotias },
  { name: 'Ordena', src: ordena },
  { name: 'MIA', src: mia },
  { name: 'Tuyafed', src: tuyafed },
];

const PartnersStrip: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="flex flex-col items-center gap-[var(--space-6)] bg-[var(--color-neutral-0)] px-[var(--space-6)] py-[var(--space-12)] lg:px-[var(--space-24)]">
      <p className="text-[12px] font-semibold leading-4 text-[var(--color-neutral-500)]">
        {t('landing.partners.title')}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-[var(--space-12)] gap-y-[var(--space-4)]">
        {PARTNERS.map(({ name, src }) => (
          <img key={name} src={src} alt={name} className="h-20 w-40 object-contain" />
        ))}
      </div>
    </section>
  );
};

export default PartnersStrip;
