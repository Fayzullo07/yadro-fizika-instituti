import { useLanguage } from '@/contexts/LanguageContext';
import { usePartners } from '@/hooks/usePartners';
import visitech from '@/assets/visitech.png';
import galgotias from '@/assets/galgotias.png';
import ordena from '@/assets/ordena.png';
import mia from '@/assets/mia.png';
import tuyafed from '@/assets/tuyafed.png';
import { CONTAINER, SECTION_PAD } from './layout';
import SectionHeader from './SectionHeader';

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

const MIN_PER_HALF = 8;

const LogoCard: React.FC<{ logo: Logo }> = ({ logo }) => {
  const body = (
    <>
      <img src={logo.src} alt="" loading="lazy" className="h-14 w-full object-contain" />
      <span className="line-clamp-1 text-[12px] font-semibold leading-4 text-[var(--color-neutral-700)]">
        {logo.name}
      </span>
    </>
  );
  const cls =
    'flex h-36 w-52 shrink-0 flex-col items-center justify-center gap-[var(--space-3)] rounded-[var(--radius-lg)] border border-[var(--color-neutral-100)] bg-[var(--color-neutral-0)] p-[var(--space-4)] shadow-[var(--shadow-card)] md:w-60';
  return logo.link ? (
    <a href={logo.link} target="_blank" rel="noopener noreferrer" title={logo.name} className={cls}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
};

const Lane: React.FC<{ logos: Logo[]; reverse?: boolean }> = ({ logos, reverse = false }) => {
  // Two identical halves so the -50% keyframe loops seamlessly.
  const half = Array.from({ length: Math.ceil(MIN_PER_HALF / logos.length) }).flatMap(() => logos);
  return (
    <div className="lp-lane-wrap overflow-hidden">
      <div className={`lp-lane flex w-max ${reverse ? 'lp-lane-reverse' : ''}`}>
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 gap-[var(--space-4)] pr-[var(--space-4)]"
          >
            {half.map((logo, i) => (
              <LogoCard key={`${logo.id}-${i}`} logo={logo} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const PartnersLanes: React.FC = () => {
  const { t } = useLanguage();
  const { data, loading } = usePartners();

  if (loading) return null;

  const fromApi: Logo[] = (data?.data ?? [])
    .filter((p) => p.image)
    .map((p) => ({ id: p.id, name: p.name, src: p.image, link: p.link }));
  const logos = fromApi.length ? fromApi : FALLBACK_LOGOS;

  return (
    <section className={`overflow-hidden bg-[var(--color-neutral-50)] ${SECTION_PAD}`}>
      <div className="flex flex-col gap-[var(--space-12)]">
        <div className={CONTAINER}>
          <SectionHeader
            centered
            eyebrow={t('landing.partners.eyebrow')}
            title={t('landing.partners.heading')}
          />
        </div>
        <div className="flex flex-col gap-[var(--space-4)]">
          <Lane logos={logos} />
          <Lane logos={[...logos].reverse()} reverse />
        </div>
      </div>
    </section>
  );
};

export default PartnersLanes;
