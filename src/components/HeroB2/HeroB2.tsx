import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'antd';
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
  ATOM_RING,
  circleOrbit,
  circleRestPoint,
  type CircleOrbit,
  continuousSpin,
  entrance,
  fade,
  pulse,
  ringSpin,
  satelliteOrbit,
  starOrbit,
  starRestPoint,
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
    src: satelliteLaboratories,
    size: 132,
    left: 52.6,
    top: 181.65,
    phase: 200,
  },
  {
    src: satelliteConferences,
    size: 108,
    left: 884.89,
    top: 32.28,
    phase: 290,
  },
  {
    src: satellitePartners,
    size: 96,
    left: 1273.4,
    top: 384.35,
    phase: 20,
  },
  {
    src: satelliteResearch,
    size: 84,
    left: 459.11,
    top: 551.72,
    phase: 110,
  },
].map((s) => ({
  ...s,
  motion: [satelliteOrbit(s.phase), appear(1.6, 2.8)],
}));

/**
 * Whole turns per 40s loop. A 4-point star looks identical every 90°, so the
 * spin has to be quick (4s per turn) to read as rotation next to its glow.
 */
const STAR_SPIN_TURNS = 10;

// Every star rides an orbit line: six on the tilted atom rings, eight on the
// round orbit circles of the design (two per circle, on opposite sides).
const orbitStart = (orbit: number) => {
  const [x, y] = starRestPoint(orbit);
  return { left: x - 32, top: y - 32 };
};

const onCircle = (circle: CircleOrbit) => {
  const [x, y] = circleRestPoint(circle);
  return { left: x - 32, top: y - 32, circle };
};

interface StarSpec {
  left: number;
  top: number;
  /** twinkle period in s; must split the 40s loop into whole half-periods (2, 2.5, 4, 5, 8, 10) */
  period: number;
  orbit?: number;
  circle?: CircleOrbit;
}

const STAR_SPECS: StarSpec[] = [
  { ...orbitStart(0), period: 5, orbit: 0 },
  { ...orbitStart(1), period: 4, orbit: 1 },
  { ...orbitStart(2), period: 8, orbit: 2 },
  { ...onCircle({ radius: 260, start: 0.8, turns: 1 }), period: 2.5 },
  { ...onCircle({ radius: 260, start: 0.8 + Math.PI, turns: 1 }), period: 4 },
  { ...orbitStart(3), period: 10, orbit: 3 },
  { ...orbitStart(4), period: 2.5, orbit: 4 },
  { ...orbitStart(5), period: 5, orbit: 5 },
  { ...onCircle({ radius: 390, start: 2.4, turns: -1 }), period: 4 },
  { ...onCircle({ radius: 390, start: 2.4 + Math.PI, turns: -1 }), period: 5 },
  { ...onCircle({ radius: 520, start: 4.0, turns: 1 }), period: 2.5 },
  { ...onCircle({ radius: 520, start: 4.0 + Math.PI, turns: 1 }), period: 8 },
  { ...onCircle({ radius: 650, start: 5.4, turns: -1 }), period: 2 },
  { ...onCircle({ radius: 650, start: 5.4 + Math.PI, turns: -1 }), period: 10 },
];

const STARS = STAR_SPECS.map((s, i) => {
  const startHigh = i % 2 === 1;
  return {
    ...s,
    travel: s.circle ? [circleOrbit(s.circle)] : s.orbit === undefined ? [] : [starOrbit(s.orbit)],
    glow: [pulse(s.period, startHigh, [0.15, 0.95], [0.7, 1.5])],
    star: [
      pulse(s.period, startHigh, [0.45, 1], [0.6, 1.2]),
      continuousSpin(startHigh ? STAR_SPIN_TURNS : -STAR_SPIN_TURNS),
    ],
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
}> = ({ size, src, fallback }) => {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      // click opens antd's animated lightbox (zoom-in from the photo); the
      // surrounding <Image.PreviewGroup> lets it page through all hero photos.
      <div className="pointer-events-auto size-full cursor-zoom-in [&_.ant-image]:block [&_.ant-image]:size-full">
        <Image
          src={src}
          alt=""
          preview={{ mask: false }}
          onError={() => setFailed(true)}
          // antd injects `.ant-image .ant-image-img { height: auto }` at runtime,
          // so the img is sized inline (same clash GalleryImageTile works around).
          style={{
            inlineSize: '100%',
            blockSize: '100%',
            objectFit: 'cover',
            borderRadius: '9999px',
            background: 'var(--color-neutral-0)',
            boxShadow: '0 0 0 4px var(--color-neutral-0)',
          }}
        />
      </div>
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
            className="absolute"
            style={{
              left: 720 - ATOM_RING.rx,
              top: 340 - ATOM_RING.ry,
              width: 2 * ATOM_RING.rx,
              height: 2 * ATOM_RING.ry,
            }}
          >
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={atom} />
          </Animated>
        ))}

        {ORBIT_RINGS.map(({ src, className }) => (
          <div key={src} className={`absolute ${className}`}>
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={src} />
          </div>
        ))}

        {!imagesLoading && (
          <Image.PreviewGroup>
            {SATELLITES.map((s, i) => (
              <Animated
                key={i}
                animations={s.motion}
                className="absolute"
                style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
              >
                <SatelliteImage size={s.size} src={images?.satellites[i]} fallback={s.src} />
              </Animated>
            ))}
          </Image.PreviewGroup>
        )}

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
