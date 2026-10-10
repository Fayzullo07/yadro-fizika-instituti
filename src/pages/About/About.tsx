import { Image } from 'antd';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApi } from '@/hooks/useApi';
import { useImageRetry } from '@/hooks/useImageRetry';
import { generalApi } from '@/services/api';
import { CONTACT_PATH } from '@/routes/path';
import { sanitizeHtml, stripHtmlAndDecode } from '@/utils/htmlUtils';
import { useStats } from '@/hooks/useStats';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import type { AboutData, SingleResponse } from '@/types';

const Stats: React.FC = () => {
  const { data: stats } = useStats();
  const items = stats.slice(0, 4);
  if (!items.length) return null;

  return (
    <div className="grid grid-cols-2 gap-[var(--space-4)] lg:grid-cols-4">
      {items.map((stat) => (
        <div
          key={stat.id}
          className="flex flex-col gap-[var(--space-2)] rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-[var(--space-6)] shadow-[var(--shadow-card)]"
        >
          <span className="text-[40px] font-extrabold leading-none tabular-nums text-[var(--color-brand-700)] md:text-[56px]">
            {stat.value}
            {stat.suffix}
          </span>
          <span className="text-[14px] leading-5 text-[var(--color-neutral-500)]">
            {stat.title}
          </span>
        </div>
      ))}
    </div>
  );
};

/** Pulls the first paragraph out of the rich-text body to use as the lead. */
const splitLead = (html: string): { lead: string; rest: string } => {
  for (const match of html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
    const lead = stripHtmlAndDecode(match[1])
      .replace(/\u00a0/g, ' ')
      .trim();
    if (lead) return { lead, rest: html.replace(match[0], '') };
  }
  return { lead: '', rest: html };
};

const IntroPanel: React.FC<{ lead: string }> = ({ lead }) => (
  <section className="relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-brand-950)] p-[var(--space-6)] md:p-[var(--space-12)]">
    <div
      aria-hidden
      className="pointer-events-none absolute -right-20 -top-32 size-[520px] rounded-full bg-[var(--color-brand-600)] opacity-45 blur-[140px]"
    />
    <div className="relative grid items-center gap-[var(--space-6)] lg:grid-cols-[auto_1fr] lg:gap-[var(--space-12)]">
      <span
        aria-label="1956"
        className="block text-[88px] font-extrabold leading-none text-transparent [-webkit-text-stroke:2px_var(--color-accent-500)] md:text-[140px]"
      >
        1956
      </span>
      {lead && (
        <p className="text-[18px] leading-8 text-[var(--color-neutral-0)] md:text-[20px] md:leading-9">
          {lead}
        </p>
      )}
    </div>
  </section>
);

const CONTENT_CLS =
  'rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-[var(--space-6)] shadow-[var(--shadow-card)] md:p-[var(--space-10)] text-sm sm:text-base text-[var(--color-neutral-700)] leading-relaxed sm:leading-loose [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-[var(--color-neutral-900)] [&_h2]:mt-6 sm:[&_h2]:mt-8 [&_p]:mt-3 sm:[&_p]:mt-4 [&_img]:max-w-full [&_img]:rounded-[var(--radius-md)] [&_table]:w-full [&_table]:overflow-x-auto';

const About: React.FC = () => {
  const { t, language } = useLanguage();
  const {
    data: aboutResponse,
    loading,
    error,
  } = useApi<SingleResponse<AboutData>>(() => generalApi.getAbout(language), [language]);
  const { retryKey, handleError } = useImageRetry();

  const aboutData = aboutResponse?.data;

  const { lead, rest } = aboutData?.content ? splitLead(aboutData.content) : { lead: '', rest: '' };

  return (
    <div className="flex flex-col gap-[var(--space-6)] pb-10">
      <PageTitle>{t('nav.institute.about')}</PageTitle>

      {loading && (
        <p className="text-base sm:text-lg text-[var(--color-neutral-700)]">
          {t('common.loading')}
        </p>
      )}

      {error && <p className="text-base sm:text-lg text-red-600">{t('common.error')}</p>}

      {!loading && !error && aboutData && (
        <>
          <IntroPanel lead={lead} />
          <Stats />

          {aboutData.image && (
            <div className="group relative w-full h-65 sm:h-90 md:h-115 overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] [&_.ant-image]:w-full [&_.ant-image]:h-full [&_.ant-image-img]:w-full [&_.ant-image-img]:h-full [&_.ant-image-img]:object-contain [&_.ant-image-mask]:bg-transparent [&_.ant-image-mask]:items-end [&_.ant-image-mask]:justify-end [&_.ant-image-mask]:p-3">
              <div
                className="absolute inset-0 bg-cover bg-center scale-110 blur-xl"
                style={{ backgroundImage: `url(${aboutData.image})` }}
                aria-hidden="true"
              />
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <Image
                  key={retryKey}
                  src={aboutData.image}
                  alt={t('about.heroTitle')}
                  width="100%"
                  height="100%"
                  placeholder={
                    <div className="absolute inset-0 bg-[var(--color-neutral-100)] animate-pulse" />
                  }
                  style={{ inlineSize: '100%', blockSize: '100%', objectFit: 'contain' }}
                  onError={handleError}
                  preview={{
                    mask: (
                      <span className="flex items-center justify-center w-9 h-9 rounded-full bg-black/60 text-[var(--color-neutral-0)]">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                          />
                        </svg>
                      </span>
                    ),
                  }}
                />
              </div>
            </div>
          )}

          {rest.trim() && (
            <div className={CONTENT_CLS} dangerouslySetInnerHTML={{ __html: sanitizeHtml(rest) }} />
          )}
        </>
      )}

      <section className="rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-[var(--space-6)] shadow-[var(--shadow-card)] md:p-[var(--space-10)]">
        <h2 className="text-[24px] font-bold leading-8 text-[var(--color-neutral-900)]">
          {t('about.ctaTitle') || "Bog'lanish"}
        </h2>

        <p className="mt-[var(--space-2)] text-[16px] leading-6 text-[var(--color-neutral-700)]">
          {t('about.ctaText') || "Savollaringiz bo'lsa, biz bilan bog'laning."}
        </p>

        <Link
          to={CONTACT_PATH}
          className="mt-[var(--space-6)] inline-flex items-center gap-[var(--space-2)] rounded-[var(--radius-md)] bg-[var(--color-accent-500)] px-[var(--space-6)] py-[var(--space-3)] text-[16px] font-semibold leading-6 text-[var(--color-brand-950)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[var(--color-accent-600)] hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          {t('about.ctaButton') || "Bog'lanish"} →
        </Link>
      </section>
    </div>
  );
};

export default About;
