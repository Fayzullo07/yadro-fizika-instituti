import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApi } from '@/hooks/useApi';
import { generalApi } from '@/services/api';
import { stripHtmlAndDecode } from '@/utils/htmlUtils';
import { ABOUT_PATH } from '@/routes/path';
import type { AboutData, SingleResponse } from '@/types';
import { CONTAINER, SECTION_PAD } from './layout';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const AboutBlock: React.FC = () => {
  const { t, language } = useLanguage();
  const { data: response, loading } = useApi<SingleResponse<AboutData>>(
    () => generalApi.getAbout(language),
    [language]
  );
  const about = response?.data;

  if (!loading && !about) return null;

  const text = about ? stripHtmlAndDecode(about.content || about.description) : '';

  return (
    <section className={`bg-[var(--color-neutral-0)] ${SECTION_PAD}`}>
      <div
        className={`${CONTAINER} grid items-center gap-[var(--space-12)] lg:grid-cols-2 lg:gap-[var(--space-16)]`}
      >
        <div className="flex flex-col items-start gap-[var(--space-6)]">
          <SectionHeader
            eyebrow={t('about.sectionSubtitle')}
            title={about?.title || t('about.heroTitle')}
          />
          <Reveal delay={120} className="flex items-center gap-[var(--space-6)]">
            <span className="text-[56px] font-extrabold leading-none text-[var(--color-brand-700)] md:text-[72px]">
              {t('landing.about.year')}
            </span>
            <span className="flex flex-col text-[16px] leading-6 text-[var(--color-neutral-500)]">
              {t('landing.about.yearLabel')}
              <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent-600)]">
                {t('landing.about.anniversary')}
              </span>
            </span>
          </Reveal>
          {loading && !about ? (
            <div className="h-32 w-full animate-pulse rounded-[var(--radius-md)] bg-[var(--color-neutral-100)]" />
          ) : (
            <Reveal delay={200}>
              <p className="line-clamp-6 text-[16px] leading-7 text-[var(--color-neutral-700)]">
                {text}
              </p>
            </Reveal>
          )}
          <Reveal delay={280}>
            <Link
              to={ABOUT_PATH}
              className="inline-flex items-center gap-[var(--space-2)] rounded-[var(--radius-md)] bg-[var(--color-brand-700)] px-[var(--space-6)] py-[var(--space-3)] text-[16px] font-semibold leading-6 text-[var(--color-neutral-0)] hover:bg-[var(--color-brand-600)]"
            >
              {t('about.sectionReadMore')} →
            </Link>
          </Reveal>
        </div>

        <Reveal delay={160} className="relative">
          <span
            aria-hidden
            className="absolute -bottom-4 -right-4 size-full rounded-[var(--radius-lg)] bg-[var(--color-accent-100)]"
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-neutral-100)] shadow-[var(--shadow-card)]">
            {about?.image && (
              <img
                src={about.image}
                alt=""
                loading="lazy"
                className="size-full object-cover transition-transform duration-[1500ms] ease-out hover:scale-105"
              />
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutBlock;
