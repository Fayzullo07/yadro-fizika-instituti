import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useGalleries } from '@/hooks/useGalleries';
import { useLanguage } from '@/contexts/LanguageContext';
import { GALLERY_PATH } from '@/routes/path';
import { CONTAINER, SECTION_PAD } from './layout';
import SectionHeader from './SectionHeader';
import { EASE } from './motion';

const TILT = 7;

/** Where each tile flies in from: [x px, y px, rotate deg]. */
const FROM: Array<[number, number, number]> = [
  [-90, 40, -6],
  [0, -80, 4],
  [90, 40, 6],
  [-60, 80, -4],
  [60, 80, 4],
];

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const GalleryBento: React.FC = () => {
  const { t } = useLanguage();
  const { data, loading } = useGalleries({ per_page: 5 });
  const items = (data?.data ?? []).slice(0, 5);

  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  const hasItems = items.length > 0;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStarted(true);
        io.disconnect();
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasItems]);

  // scroll parallax variable (-1…1) for the photos, the giant word and the blobs
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reduced()) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = ((vh - r.top) / (vh + r.height)) * 2 - 1;
      el.style.setProperty('--sp', Math.max(-1, Math.min(1, p)).toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [hasItems]);

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduced() || e.pointerType !== 'mouse') return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transition = 'transform 120ms linear';
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * TILT}deg) rotateY(${(px - 0.5) * TILT * 1.6}deg) scale(1.02)`;
    el.style.setProperty('--gx', `${px * 100}%`);
    el.style.setProperty('--gy', `${py * 100}%`);
  };
  const onLeave = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.transition = `transform 800ms ${EASE}`;
    el.style.transform = '';
  };

  if (!loading && !items.length) return null;

  return (
    <section
      ref={sectionRef}
      className={`relative isolate overflow-hidden bg-[var(--color-neutral-50)] ${SECTION_PAD}`}
      style={{ '--sp': 0 } as CSSProperties}
    >
      {/* ambient: drifting colour blobs and a giant outlined word that slides with scroll */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="an-aurora-a absolute -left-[6%] top-[8%] size-[420px] rounded-full bg-[var(--color-brand-100)] opacity-90 blur-[110px]" />
        <div className="an-aurora-b absolute -right-[6%] bottom-[2%] size-[380px] rounded-full bg-[var(--color-accent-100)] opacity-90 blur-[110px]" />
        <span
          className="absolute left-0 top-[34%] block whitespace-nowrap text-[220px] font-extrabold uppercase leading-none text-transparent [-webkit-text-stroke:2px_var(--color-brand-700)] opacity-[0.08] md:text-[320px]"
          style={{ transform: 'translateX(calc(var(--sp) * -22%))' }}
        >
          {t('gallery.title')} · {t('gallery.title')}
        </span>
      </div>

      <div className={`${CONTAINER} flex flex-col gap-[var(--space-12)]`}>
        <SectionHeader
          eyebrow={t('gallery.subtitle')}
          title={t('gallery.title')}
          to={GALLERY_PATH}
          viewAllLabel={t('gallery.viewAll')}
        />

        <div className="group/grid grid auto-rows-[180px] grid-cols-2 gap-[var(--space-4)] md:auto-rows-[240px] lg:grid-cols-4">
          {loading && !items.length
            ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`animate-pulse rounded-[var(--radius-lg)] bg-[var(--color-neutral-100)] ${
                    i === 0 ? 'col-span-2 row-span-2' : ''
                  }`}
                />
              ))
            : items.map((item, i) => {
                const [fx, fy, fr] = FROM[i % FROM.length];
                const delay = 150 + i * 140;
                return (
                  <div
                    key={item.id}
                    className={`ab-anim transition-opacity duration-500 group-hover/grid:opacity-60 hover:!opacity-100 ${
                      i === 0 ? 'col-span-2 row-span-2' : ''
                    }`}
                    style={{
                      clipPath: started
                        ? 'inset(0% 0% 0% 0% round 20px)'
                        : 'inset(50% 50% 50% 50% round 20px)',
                      opacity: started ? undefined : 0,
                      transform: started
                        ? 'none'
                        : `translate(${fx}px, ${fy}px) rotate(${fr}deg) scale(0.8)`,
                      filter: started ? 'blur(0px)' : 'blur(12px)',
                      transition: `clip-path 1300ms ${EASE} ${delay}ms, transform 1500ms ${EASE} ${delay}ms, filter 1000ms ${EASE} ${delay}ms, opacity 500ms`,
                    }}
                  >
                    <Link
                      to={`${GALLERY_PATH}/${item.id}`}
                      onPointerMove={onMove}
                      onPointerLeave={onLeave}
                      className="group relative block size-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-neutral-100)] shadow-[var(--shadow-card)] will-change-transform hover:shadow-[0_24px_60px_rgba(1,61,140,0.28)]"
                      style={{ transition: `transform 800ms ${EASE}, box-shadow 600ms` }}
                    >
                      <img
                        src={item.image}
                        alt={item.title ?? ''}
                        loading="lazy"
                        className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover transition-[scale,filter] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.12] group-hover:saturate-[1.15]"
                        style={{ translate: `0 calc(var(--sp) * ${i === 0 ? -5 : -3}%)` }}
                      />
                      {/* cursor spotlight */}
                      <span
                        aria-hidden
                        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background:
                            'radial-gradient(260px circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.28), transparent 60%)',
                          mixBlendMode: 'overlay',
                        }}
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-[rgba(10,19,48,0.88)] via-[rgba(10,19,48,0.15)] to-transparent opacity-40 transition-opacity duration-700 group-hover:opacity-100"
                      />
                      {/* sheen sweeping across on hover */}
                      <span
                        aria-hidden
                        className="absolute inset-y-0 -left-1/3 w-1/4 -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:left-[120%] group-hover:opacity-100"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[12px] font-bold tabular-nums text-[var(--color-brand-700)] backdrop-blur-md transition-all duration-500 group-hover:bg-[var(--color-accent-500)] group-hover:text-[var(--color-brand-950)]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="absolute right-4 top-4 flex size-10 translate-y-2 items-center justify-center rounded-full bg-[var(--color-accent-500)] text-[var(--color-brand-950)] opacity-0 shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:-rotate-45 group-hover:opacity-100">
                        →
                      </span>
                      {item.title && (
                        <span className="absolute inset-x-0 bottom-0 p-[var(--space-4)]">
                          <span className="block overflow-hidden">
                            <span
                              className={`block translate-y-[110%] font-semibold leading-6 text-[var(--color-neutral-0)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 ${
                                i === 0 ? 'text-[22px] leading-8' : 'text-[16px]'
                              }`}
                            >
                              {item.title}
                            </span>
                          </span>
                        </span>
                      )}
                    </Link>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default GalleryBento;
