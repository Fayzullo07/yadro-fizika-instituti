import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import { useLanguage } from '@/contexts/LanguageContext';
import { ANNOUNCEMENTS_PATH } from '@/routes/path';
import { stripHtmlAndDecode } from '@/utils/htmlUtils';
import type { AnnouncementItem } from '@/types';
import { CONTAINER, SECTION_PAD } from './layout';
import Odometer from './Odometer';
import SectionHeader from './SectionHeader';
import { EASE } from './motion';

const STARS: Array<[number, number, number, number]> = [
  [5, 14, 2, 0],
  [14, 78, 3, 1.3],
  [23, 40, 2, 2.4],
  [34, 90, 2, 0.7],
  [46, 10, 3, 1.9],
  [57, 70, 2, 3.0],
  [66, 24, 2, 0.4],
  [75, 86, 3, 1.6],
  [84, 18, 2, 2.7],
  [92, 58, 2, 1.0],
  [97, 88, 3, 2.2],
  [40, 52, 2, 3.3],
];

const AnnouncementsList: React.FC = () => {
  const { t } = useLanguage();
  const { data, loading } = useAnnouncements(1, 4);
  const items: AnnouncementItem[] = Array.isArray(data?.data) ? data.data.slice(0, 4) : [];

  const wrapRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  const hasItems = items.length > 0;

  // start once the list scrolls into view
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStarted(true);
        io.disconnect();
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasItems]);

  // scroll-driven rail: the amber line fills and lights each row as it passes
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = wrap.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (window.innerHeight * 0.68 - r.top) / r.height));
      wrap.style.setProperty('--lp', p.toFixed(3));
      wrap.querySelectorAll<HTMLElement>('[data-row]').forEach((row) => {
        const mid = (row.offsetTop + row.offsetHeight / 2) / r.height;
        row.dataset.lit = String(mid <= p + 0.04);
      });
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

  const onRowMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--rx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--ry', `${e.clientY - r.top}px`);
  };

  if (!loading && !items.length) return null;

  return (
    <section
      className={`relative isolate overflow-hidden bg-[var(--color-brand-950)] ${SECTION_PAD}`}
    >
      {/* ambient: drifting aurora, faint grid, stars */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="an-aurora-a absolute -left-[10%] top-[8%] size-[520px] rounded-full bg-[var(--color-brand-600)] opacity-40 blur-[130px]" />
        <div className="an-aurora-b absolute -right-[8%] bottom-[4%] size-[460px] rounded-full bg-[var(--color-accent-500)] opacity-[0.12] blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
        {STARS.map(([x, y, s, d], i) => (
          <span
            key={i}
            className="st-star absolute rounded-full bg-white"
            style={{ left: `${x}%`, top: `${y}%`, width: s, height: s, animationDelay: `${d}s` }}
          />
        ))}
      </div>

      <div className={`${CONTAINER} flex flex-col gap-[var(--space-12)]`}>
        <SectionHeader
          dark
          eyebrow={t('pages.announcements.subtitle')}
          title={t('nav.media.announcements')}
          to={ANNOUNCEMENTS_PATH}
          viewAllLabel={t('pages.announcements.viewAll')}
        />

        <div
          ref={wrapRef}
          className="relative pl-[var(--space-6)] md:pl-[var(--space-10)]"
          style={{ '--lp': 0 } as CSSProperties}
        >
          {/* scroll rail */}
          <div aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-white/15">
            <span
              className="absolute inset-x-0 top-0 h-full origin-top bg-[var(--color-accent-500)] shadow-[0_0_12px_rgba(245,158,11,0.8)]"
              style={{ transform: 'scaleY(var(--lp))' }}
            />
            <span
              className="absolute -left-[4px] size-[9px] rounded-full bg-[var(--color-accent-500)] shadow-[0_0_18px_6px_rgba(245,158,11,0.75)]"
              style={{ top: 'calc(var(--lp) * 100%)' }}
            />
          </div>

          <ol className="flex flex-col">
            {loading && !items.length
              ? Array.from({ length: 4 }).map((_, i) => (
                  <li
                    key={i}
                    className="h-24 animate-pulse border-t border-[var(--color-brand-700)]"
                  />
                ))
              : items.map((item, i) => (
                  <li
                    key={item.id}
                    data-row
                    data-lit="false"
                    className="group/row ab-anim relative"
                    style={{
                      opacity: started ? 1 : 0,
                      translate: started ? '0 0' : '0 36px',
                      filter: started ? 'blur(0px)' : 'blur(10px)',
                      transition: `opacity 900ms ${EASE} ${i * 160}ms, translate 1100ms ${EASE} ${i * 160}ms, filter 900ms ${EASE} ${i * 160}ms`,
                    }}
                  >
                    {/* hairlines that draw themselves */}
                    <span
                      aria-hidden
                      className="ab-anim absolute inset-x-0 top-0 h-px origin-left bg-[var(--color-brand-700)]"
                      style={{
                        transform: started ? 'scaleX(1)' : 'scaleX(0)',
                        transition: `transform 1400ms ${EASE} ${i * 160 + 200}ms`,
                      }}
                    />
                    {i === items.length - 1 && (
                      <span
                        aria-hidden
                        className="ab-anim absolute inset-x-0 bottom-0 h-px origin-left bg-[var(--color-brand-700)]"
                        style={{
                          transform: started ? 'scaleX(1)' : 'scaleX(0)',
                          transition: `transform 1400ms ${EASE} ${i * 160 + 500}ms`,
                        }}
                      />
                    )}

                    <Link
                      to={`${ANNOUNCEMENTS_PATH}/${item.id}`}
                      onPointerMove={onRowMove}
                      className="group relative grid grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-[var(--space-4)] overflow-hidden py-[var(--space-6)] md:grid-cols-[96px_minmax(0,1fr)_auto]"
                    >
                      {/* hover: amber wave from the left + cursor spotlight */}
                      <span
                        aria-hidden
                        className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[rgba(245,158,11,0.2)] via-[rgba(245,158,11,0.05)] to-transparent transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background:
                            'radial-gradient(320px circle at var(--rx, 50%) var(--ry, 50%), rgba(255,255,255,0.09), transparent 60%)',
                        }}
                      />

                      <span className="relative origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
                        <Odometer
                          text={String(i + 1).padStart(2, '0')}
                          active={started}
                          delay={i * 160 + 300}
                          className="text-[28px] font-extrabold text-white/30 transition-[color,text-shadow] duration-700 group-data-[lit=true]/row:text-[var(--color-accent-500)] group-hover:[text-shadow:0_0_26px_rgba(245,158,11,0.7)] md:text-[40px]"
                        />
                      </span>

                      <span className="relative flex flex-col gap-[var(--space-1)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                        <span className="overflow-hidden">
                          <span
                            className="ab-anim relative block overflow-hidden"
                            style={{
                              transform: started ? 'none' : 'translateY(110%)',
                              transition: `transform 1100ms ${EASE} ${i * 160 + 450}ms`,
                            }}
                          >
                            <span className="line-clamp-2 text-[18px] font-semibold leading-7 text-[var(--color-neutral-0)] md:text-[22px]">
                              {stripHtmlAndDecode(item.title)}
                            </span>
                            {/* shine sweeping across the title on hover */}
                            <span
                              aria-hidden
                              className="absolute inset-y-0 -left-1/3 w-1/4 -skew-x-[18deg] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:left-[120%] group-hover:opacity-100"
                            />
                          </span>
                        </span>
                        <span className="line-clamp-1 text-[14px] leading-5 text-[var(--color-neutral-300)]">
                          {stripHtmlAndDecode(item.description)}
                        </span>
                      </span>

                      <span
                        aria-hidden
                        className="relative flex size-11 items-center justify-center rounded-[var(--radius-full)] border border-[var(--color-brand-600)] text-[var(--color-neutral-0)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-45 group-hover:scale-110 group-hover:border-[var(--color-accent-500)] group-hover:bg-[var(--color-accent-500)] group-hover:text-[var(--color-brand-950)] group-hover:shadow-[0_0_30px_rgba(245,158,11,0.6)]"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementsList;
