import { Link } from 'react-router-dom';
import { useNews } from '@/hooks/useNews';
import { useLanguage } from '@/contexts/LanguageContext';
import { NEWS_PATH } from '@/routes/path';
import { getDayMonth } from '@/utils/dateUtils';
import { stripHtmlAndDecode } from '@/utils/htmlUtils';
import type { NewsItem } from '@/types';
import SectionHeader from './SectionHeader';

const CARD =
  'flex flex-col overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] shadow-[var(--shadow-card)]';

const NewsCard: React.FC<{ item: NewsItem; readMore: string; language: string }> = ({
  item,
  readMore,
  language,
}) => {
  const { day, month } = getDayMonth(item.created_at, language);
  const image = item.images?.[0]?.url || item.images?.[0]?.image || item.image;

  return (
    <Link to={`${NEWS_PATH}/${item.id}`} className={`group ${CARD}`}>
      <div className="h-[202px] w-full shrink-0 bg-[var(--color-neutral-100)]">
        {image && <img src={image} alt="" loading="lazy" className="size-full object-cover" />}
      </div>
      <div className="flex flex-1 flex-col items-start gap-[var(--space-3)] p-[var(--space-6)]">
        <span className="rounded-[var(--radius-full)] bg-[var(--color-brand-100)] px-[var(--space-3)] py-[var(--space-1)] text-[12px] font-semibold uppercase leading-4 text-[var(--color-brand-700)]">
          {day} {month}
        </span>
        <h3 className="line-clamp-3 text-[20px] font-semibold leading-7 text-[var(--color-neutral-900)]">
          {stripHtmlAndDecode(item.title)}
        </h3>
        <p className="line-clamp-3 text-[14px] leading-5 text-[var(--color-neutral-500)]">
          {stripHtmlAndDecode(item.description)}
        </p>
        <span className="mt-auto px-[var(--space-4)] py-[var(--space-2)] text-[16px] font-semibold leading-6 text-[var(--color-brand-700)] group-hover:underline">
          {readMore}
        </span>
      </div>
    </Link>
  );
};

const NewsCards: React.FC = () => {
  const { t, language } = useLanguage();
  const { data, loading } = useNews({ per_page: 3 });
  const news: NewsItem[] = Array.isArray(data?.data) ? data.data : [];

  if (!loading && !news.length) return null;

  return (
    <section className="flex flex-col gap-[var(--space-12)] bg-[var(--color-neutral-0)] px-[var(--space-6)] py-[var(--space-16)] lg:p-[var(--space-24)]">
      <SectionHeader
        title={t('landing.news.title')}
        to={NEWS_PATH}
        viewAllLabel={t('landing.viewAll')}
      />
      <div className="grid grid-cols-1 gap-[var(--space-8)] md:grid-cols-2 lg:grid-cols-3">
        {loading && !news.length
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={`${CARD} h-[420px] animate-pulse`}>
                <div className="h-[202px] bg-[var(--color-neutral-100)]" />
              </div>
            ))
          : news.map((item) => (
              <NewsCard
                key={item.id}
                item={item}
                readMore={t('news.readMore')}
                language={language}
              />
            ))}
      </div>
    </section>
  );
};

export default NewsCards;
