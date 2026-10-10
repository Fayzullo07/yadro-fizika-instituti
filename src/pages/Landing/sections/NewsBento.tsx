import { Link } from 'react-router-dom';
import { useNews } from '@/hooks/useNews';
import { useLanguage } from '@/contexts/LanguageContext';
import { NEWS_PATH } from '@/routes/path';
import { getDayMonth } from '@/utils/dateUtils';
import { stripHtmlAndDecode } from '@/utils/htmlUtils';
import type { NewsItem } from '@/types';
import { CONTAINER, SECTION_PAD } from './layout';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const imageOf = (item: NewsItem) => item.images?.[0]?.url || item.images?.[0]?.image || item.image;

const NewsBento: React.FC = () => {
  const { t, language } = useLanguage();
  const { data, loading } = useNews({ per_page: 4 });
  const news: NewsItem[] = Array.isArray(data?.data) ? data.data.slice(0, 4) : [];

  if (!loading && !news.length) return null;

  const [lead, ...rest] = news;
  const date = (item: NewsItem) => {
    const { day, month } = getDayMonth(item.created_at, language);
    return `${day} ${month}`;
  };

  return (
    <section className={`bg-[var(--color-neutral-50)] ${SECTION_PAD}`}>
      <div className={`${CONTAINER} flex flex-col gap-[var(--space-12)]`}>
        <SectionHeader
          eyebrow={t('news.subtitle')}
          title={t('news.title')}
          to={NEWS_PATH}
          viewAllLabel={t('news.viewAll')}
        />

        {loading && !lead ? (
          <div className="h-[460px] animate-pulse rounded-[var(--radius-lg)] bg-[var(--color-neutral-100)]" />
        ) : (
          <div className="grid gap-[var(--space-6)] lg:grid-cols-5">
            {lead && (
              <Reveal className="lg:col-span-3">
                <Link
                  to={`${NEWS_PATH}/${lead.id}`}
                  className="group relative flex h-full min-h-[360px] flex-col justify-end overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-brand-950)] lg:min-h-[520px]"
                >
                  {imageOf(lead) && (
                    <img
                      src={imageOf(lead)}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 size-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-105"
                    />
                  )}
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[rgba(10,19,48,0.92)] via-[rgba(10,19,48,0.35)] to-transparent"
                  />
                  <span className="relative flex flex-col items-start gap-[var(--space-3)] p-[var(--space-6)] md:p-[var(--space-8)]">
                    <span className="rounded-[var(--radius-full)] bg-[var(--color-accent-500)] px-[var(--space-3)] py-[var(--space-1)] text-[12px] font-bold uppercase leading-4 text-[var(--color-brand-950)]">
                      {date(lead)}
                    </span>
                    <h3 className="line-clamp-4 text-[24px] font-bold leading-8 text-[var(--color-neutral-0)] md:text-[32px] md:leading-10">
                      {stripHtmlAndDecode(lead.title)}
                    </h3>
                  </span>
                </Link>
              </Reveal>
            )}

            <div className="flex flex-col gap-[var(--space-4)] lg:col-span-2">
              {rest.map((item, i) => (
                <Reveal key={item.id} delay={(i + 1) * 120} className="flex-1">
                  <Link
                    to={`${NEWS_PATH}/${item.id}`}
                    className="group flex h-full items-center gap-[var(--space-4)] rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-[var(--space-3)] shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span className="size-24 shrink-0 overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-neutral-100)] md:size-28">
                      {imageOf(item) && (
                        <img
                          src={imageOf(item)}
                          alt=""
                          loading="lazy"
                          className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                    </span>
                    <span className="flex min-w-0 flex-col gap-[var(--space-1)]">
                      <span className="text-[12px] font-bold uppercase leading-4 text-[var(--color-accent-600)]">
                        {date(item)}
                      </span>
                      <span className="line-clamp-3 text-[16px] font-semibold leading-6 text-[var(--color-neutral-900)] group-hover:text-[var(--color-brand-700)]">
                        {stripHtmlAndDecode(item.title)}
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsBento;
