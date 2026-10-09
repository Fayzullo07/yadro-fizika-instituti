import { useLanguage } from '@/contexts/LanguageContext';
import { usePartners } from '@/hooks/usePartners';
import visitech from '@/assets/visitech.png';
import galgotias from '@/assets/galgotias.png';
import ordena from '@/assets/ordena.png';
import mia from '@/assets/mia.png';
import tuyafed from '@/assets/tuyafed.png';

interface Logo {
  id: string | number;
  name: string;
  src: string;
  link?: string;
}

/** Shown only while the partners API has nothing to offer. */
const FALLBACK_LOGOS: Logo[] = [
  { id: 'visitech', name: 'Visitech', src: visitech },
  { id: 'galgotias', name: 'Galgotias', src: galgotias },
  { id: 'ordena', name: 'Ordena', src: ordena },
  { id: 'mia', name: 'MIA', src: mia },
  { id: 'tuyafed', name: 'Tuyafed', src: tuyafed },
];

const PartnersStrip: React.FC = () => {
  const { t } = useLanguage();
  const { data, loading } = usePartners();

  const fromApi: Logo[] = (data?.data ?? [])
    .filter((p) => p.image)
    .map((p) => ({ id: p.id, name: p.name, src: p.image, link: p.link }));

  if (loading) return null;
  const logos = fromApi.length ? fromApi : FALLBACK_LOGOS;

  return (
    <section className="flex flex-col items-center gap-[var(--space-6)] bg-[var(--color-neutral-0)] px-[var(--space-6)] py-[var(--space-12)] lg:px-[var(--space-24)]">
      <p className="text-[12px] font-semibold leading-4 text-[var(--color-neutral-500)]">
        {t('landing.partners.title')}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-[var(--space-12)] gap-y-[var(--space-4)]">
        {logos.map(({ id, name, src, link }) => {
          const img = <img src={src} alt={name} className="h-20 w-40 object-contain" />;
          return link ? (
            <a key={id} href={link} target="_blank" rel="noopener noreferrer" title={name}>
              {img}
            </a>
          ) : (
            <span key={id}>{img}</span>
          );
        })}
      </div>
    </section>
  );
};

export default PartnersStrip;
