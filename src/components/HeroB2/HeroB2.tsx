import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useHeroImages } from '@/hooks/useHeroImages';
import {
  ABOUT_PATH,
  CONTACT_PATH,
  DOCTORATE_PATH,
  DOCUMENTS_PATH,
  LABORATORIES_PATH,
  NEWS_PATH,
} from '@/routes/path';
import Animated from './Animated';
import {
  appear,
  continuousSpin,
  entrance,
  fade,
  pulse,
  ringSpin,
  satelliteOrbit,
  starOrbit,
  type AnimationSpec,
} from './motion';
import photo from '@/assets/landing-b2/photo.jpg';
import glow from '@/assets/landing-b2/glow.svg';
import atom from '@/assets/landing-b2/atom.svg';
import orbitSatellites from '@/assets/landing-b2/orbit-satellites.svg';
import orbit520 from '@/assets/landing-b2/orbit-520.svg';
import orbit780 from '@/assets/landing-b2/orbit-780.svg';
import orbit1040 from '@/assets/landing-b2/orbit-1040.svg';
import orbit1300 from '@/assets/landing-b2/orbit-1300.svg';
import star from '@/assets/landing-b2/star.svg';
import starGlow from '@/assets/landing-b2/star-glow.svg';
import core from '@/assets/landing-b2/core.svg';
import satelliteLaboratories from '@/assets/landing-b2/satellite-laboratoriyalar.png';
import satelliteConferences from '@/assets/landing-b2/satellite-konferensiyalar.png';
import satellitePartners from '@/assets/landing-b2/satellite-hamkorlar.png';
import satelliteResearch from '@/assets/landing-b2/satellite-tadqiqotlar.png';

/* ---------- static design data (1440 × 680 stage coordinates) ---------- */

const ORBIT_RINGS = [
  { src: orbit520, className: 'left-[460px] top-[80px] size-[520px]' },
  { src: orbit780, className: 'left-[330px] top-[-50px] size-[780px]' },
  { src: orbit1040, className: 'left-[200px] top-[-180px] size-[1040px]' },
  { src: orbit1300, className: 'left-[70px] top-[-310px] size-[1300px]' },
];

const ATOM_RINGS: AnimationSpec[] = [ringSpin(0, -180), ringSpin(60, 240), ringSpin(-60, -240)];

const SATELLITES = [
  {
    imageKey: 'laboratories' as const,
    labelKey: 'landing.satellites.laboratories',
    src: satelliteLaboratories,
    size: 132,
    left: 52.6,
    top: 181.65,
    chipLeft: 64.6,
    chipTop: 325.65,
    phase: 200,
  },
  {
    imageKey: 'conferences' as const,
    labelKey: 'landing.satellites.conferences',
    src: satelliteConferences,
    size: 108,
    left: 884.89,
    top: 32.28,
    chipLeft: 883.89,
    chipTop: 152.28,
    phase: 290,
  },
  {
    imageKey: 'partners' as const,
    labelKey: 'landing.satellites.partners',
    src: satellitePartners,
    size: 96,
    left: 1273.4,
    top: 384.35,
    chipLeft: 1280.4,
    chipTop: 492.35,
    phase: 20,
  },
  {
    imageKey: 'research' as const,
    labelKey: 'landing.satellites.research',
    src: satelliteResearch,
    size: 84,
    left: 459.11,
    top: 551.72,
    chipLeft: 457.61,
    chipTop: 647.72,
    phase: 110,
  },
].map((s) => ({
  ...s,
  // the chip travels with its satellite, so both share one motion
  motion: [satelliteOrbit(s.phase), appear(1.6, 2.8)],
}));

/** Orbiting stars follow a rotating atom ring; still stars only twinkle in place. */
const STARS = [
  { left: 1205.77, top: 403.89, period: 5, orbit: 0 },
  { left: 374.36, top: 88.15, period: 4, orbit: 1 },
  { left: 376.7, top: 519.88, period: 8, orbit: 2 },
  { left: 849.62, top: 104.34, period: 2.5 },
  { left: 400.42, top: 571.43, period: 4 },
].map((s, i) => {
  const startHigh = i % 2 === 1;
  return {
    ...s,
    travel: s.orbit === undefined ? [] : [starOrbit(s.orbit)],
    glow: [pulse(s.period, startHigh, [0.15, 0.95], [0.7, 1.5])],
    star: [pulse(s.period, startHigh, [0.45, 1], [0.6, 1.2]), continuousSpin(startHigh ? 4 : -4)],
    core: [fade(s.period, startHigh, 0.5, 1)],
  };
});

const HERO_GLOW: AnimationSpec[] = [pulse(5, false, [0.45, 0.9], [1, 1.25])];

const COPY = {
  badge: [entrance(0.3, 0.9)],
  title: [entrance(0.5, 1.4)],
  subtitle: [entrance(0.9, 1.7)],
  buttons: [entrance(1.2, 2.0)],
  quickLinks: [entrance(1.5, 2.3)],
};

const QUICK_LINKS = [
  { labelKey: 'landing.quick.doctorate', to: DOCTORATE_PATH },
  { labelKey: 'landing.quick.news', to: NEWS_PATH },
  { labelKey: 'landing.quick.documents', to: DOCUMENTS_PATH },
  { labelKey: 'landing.quick.contact', to: CONTACT_PATH },
];

const SHADOW_CARD = 'shadow-[var(--shadow-card)]';
const MIN_HERO_HEIGHT = 600;

/**
 * Height that makes the sticky site header + the hero exactly one viewport:
 * viewport minus whatever sits above the section (measured, so it follows the
 * header's responsive height).
 */
const useViewportFillHeight = () => {
  const ref = useRef<HTMLElement>(null);
  const [height, setHeight] = useState<number>();

  useLayoutEffect(() => {
    const update = () => {
      const top = ref.current ? ref.current.getBoundingClientRect().top + window.scrollY : 0;
      setHeight(Math.max(window.innerHeight - top, MIN_HERO_HEIGHT));
    };
    update();

    const header = document.querySelector('header');
    const observer = new ResizeObserver(update);
    if (header) observer.observe(header);
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  return { ref, height };
};

/**
 * Round satellite photo with the white ring from the design. Shows the real
 * API image; if there is none (or it fails to load) the bundled artwork is used.
 */
const SatelliteImage: React.FC<{
  size: number;
  src?: string;
  fallback: string;
  contain?: boolean;
}> = ({ size, src, fallback, contain }) => {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt=""
        onError={() => setFailed(true)}
        className={`size-full rounded-full bg-[var(--color-neutral-0)] ring-4 ring-[var(--color-neutral-0)] ${
          contain ? 'object-contain p-2' : 'object-cover'
        }`}
      />
    );
  }

  return (
    <div className="absolute" style={{ inset: `-${(4 / size) * 100}%` }}>
      <img alt="" className="block size-full max-w-none" src={fallback} />
    </div>
  );
};

/* ---------- component ---------- */

const HeroB2: React.FC = () => {
  const { t } = useLanguage();
  const { ref, height } = useViewportFillHeight();
  const { data: images, loading: imagesLoading } = useHeroImages();

  return (
    <section
      ref={ref}
      style={{ height }}
      className="relative flex min-h-[600px] flex-col items-center justify-center gap-[var(--space-6)] overflow-hidden bg-[var(--color-brand-950)] px-[var(--space-6)] py-[var(--space-16)] text-center"
    >
      {!imagesLoading && (
        <img
          src={images?.background ?? photo}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 size-full object-cover opacity-16"
        />
      )}

      {/* 1440px-wide decorative stage, centred; hidden where it cannot fit */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[680px] w-[1440px] -translate-x-1/2 -translate-y-1/2 lg:block"
      >
        <Animated animations={HERO_GLOW} className="absolute left-[420px] top-[40px] size-[600px]">
          <div className="absolute inset-[-26.67%]">
            <img alt="" className="block size-full max-w-none" src={glow} />
          </div>
        </Animated>

        <div className="absolute left-[80px] top-[70px] h-[540px] w-[1280px]">
          <img
            alt=""
            className="absolute inset-0 block size-full max-w-none"
            src={orbitSatellites}
          />
        </div>

        {ATOM_RINGS.map((spec, i) => (
          <Animated
            key={i}
            animations={[spec]}
            className="absolute left-[130px] top-[140px] h-[400px] w-[1180px]"
          >
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={atom} />
          </Animated>
        ))}

        {ORBIT_RINGS.map(({ src, className }) => (
          <div key={src} className={`absolute ${className}`}>
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={src} />
          </div>
        ))}

        {!imagesLoading &&
          SATELLITES.map((s) => (
            <Animated
              key={s.labelKey}
              animations={s.motion}
              className="absolute"
              style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
            >
              <SatelliteImage
                size={s.size}
                src={images?.[s.imageKey]}
                fallback={s.src}
                contain={s.imageKey === 'partners'}
              />
            </Animated>
          ))}
        {SATELLITES.map((s) => (
          <Animated
            key={`chip-${s.labelKey}`}
            animations={s.motion}
            className={`absolute flex rounded-[var(--radius-full)] bg-[var(--color-neutral-0)] px-[var(--space-3)] py-[var(--space-1)] ${SHADOW_CARD}`}
            style={{ left: s.chipLeft, top: s.chipTop }}
          >
            <span className="whitespace-nowrap text-[12px] font-semibold leading-4 text-[var(--color-neutral-900)]">
              {t(s.labelKey)}
            </span>
          </Animated>
        ))}

        {STARS.map((s) => (
          <Animated
            key={`${s.left}-${s.top}`}
            animations={s.travel}
            className="absolute size-[64px]"
            style={{ left: s.left, top: s.top }}
          >
            <Animated animations={s.glow} className="absolute left-[12px] top-[12px] size-[40px]">
              <div className="absolute inset-[-22.5%]">
                <img alt="" className="block size-full max-w-none" src={starGlow} />
              </div>
            </Animated>
            <Animated animations={s.star} className="absolute left-[9px] top-[9px] size-[46px]">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={star} />
            </Animated>
            <Animated
              animations={s.core}
              className="absolute left-[27.5px] top-[27.5px] size-[9px]"
            >
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={core} />
            </Animated>
          </Animated>
        ))}
      </div>

      <Animated
        animations={COPY.badge}
        className="relative inline-flex items-center rounded-[var(--radius-full)] bg-[var(--color-accent-100)] px-[var(--space-3)] py-[var(--space-1)]"
      >
        <span className="whitespace-nowrap text-[12px] font-semibold leading-4 text-[var(--color-accent-600)]">
          {t('landing.hero.eyebrow')}
        </span>
      </Animated>

      <Animated
        as="h1"
        animations={COPY.title}
        className="relative w-[900px] max-w-full text-4xl font-bold leading-tight text-[var(--color-neutral-0)] md:text-[56px] md:leading-[64px]"
      >
        {t('landing.hero.title')}
      </Animated>

      <Animated
        as="p"
        animations={COPY.subtitle}
        className="relative w-[720px] max-w-full text-base leading-7 text-[var(--color-neutral-300)] md:text-[18px]"
      >
        {t('landing.hero.subtitle')}
      </Animated>

      <Animated
        animations={COPY.buttons}
        className="relative flex flex-wrap justify-center gap-[var(--space-4)]"
      >
        <Link
          to={ABOUT_PATH}
          className="rounded-[var(--radius-md)] bg-[var(--color-accent-500)] px-[var(--space-6)] py-[var(--space-3)] text-[16px] font-semibold leading-6 text-[var(--color-neutral-900)] hover:bg-[var(--color-accent-600)]"
        >
          {t('landing.hero.ctaAbout')}
        </Link>
        <Link
          to={LABORATORIES_PATH}
          className="rounded-[var(--radius-md)] bg-[var(--color-brand-700)] px-[var(--space-6)] py-[var(--space-3)] text-[16px] font-semibold leading-6 text-[var(--color-neutral-0)] hover:bg-[var(--color-brand-600)]"
        >
          {t('landing.hero.ctaLabs')}
        </Link>
      </Animated>

      <Animated
        as="nav"
        animations={COPY.quickLinks}
        className="relative flex flex-wrap justify-center gap-[var(--space-3)] pt-[var(--space-6)]"
      >
        {QUICK_LINKS.map(({ labelKey, to }) => (
          <Link
            key={to}
            to={to}
            className="rounded-[var(--radius-full)] border border-[var(--color-brand-700)] bg-[var(--color-brand-900)] px-[var(--space-6)] py-[var(--space-2)] text-[14px] leading-5 text-[var(--color-neutral-0)] hover:bg-[var(--color-brand-700)]"
          >
            {t(labelKey)}
          </Link>
        ))}
      </Animated>
    </section>
  );
};

export default HeroB2;
