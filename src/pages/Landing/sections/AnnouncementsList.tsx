import { Link } from 'react-router-dom';
import { useAnnouncements } from '@/hooks/useAnnouncements';
import { useLanguage } from '@/contexts/LanguageContext';
import { ANNOUNCEMENTS_PATH } from '@/routes/path';
import { stripHtmlAndDecode } from '@/utils/htmlUtils';
import type { AnnouncementItem } from '@/types';
import { CONTAINER, SECTION_PAD } from './layout';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const AnnouncementsList: React.FC = () => {
  const { t } = useLanguage();
  const { data, loading } = useAnnouncements(1, 4);
  const items: AnnouncementItem[] = Array.isArray(data?.data) ? data.data.slice(0, 4) : [];

  if (!loading && !items.length) return null;

  return (
    <section className={`bg-[var(--color-brand-950)] ${SECTION_PAD}`}>
      <div className={`${CONTAINER} flex flex-col gap-[var(--space-12)]`}>
        <SectionHeader
          dark
          eyebrow={t('pages.announcements.subtitle')}
          title={t('nav.media.announcements')}
          to={ANNOUNCEMENTS_PATH}
          viewAllLabel={t('pages.announcements.viewAll')}
        />
        <ol className="flex flex-col">
          {loading && !items.length
            ? Array.from({ length: 4 }).map((_, i) => (
                <li
                  key={i}
                  className="h-24 animate-pulse border-t border-[var(--color-brand-700)]"
                />
              ))
            : items.map((item, i) => (
                <Reveal as="li" key={item.id} delay={i * 100}>
                  <Link
                    to={`${ANNOUNCEMENTS_PATH}/${item.id}`}
                    className="group grid grid-cols-[56px_1fr_auto] items-center gap-[var(--space-4)] border-t border-[var(--color-brand-700)] py-[var(--space-6)] last:border-b md:grid-cols-[96px_1fr_auto]"
                  >
                    <span className="text-[28px] font-extrabold leading-none text-[var(--color-accent-500)] md:text-[40px]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex flex-col gap-[var(--space-1)] transition-transform duration-300 group-hover:translate-x-2">
                      <span className="line-clamp-2 text-[18px] font-semibold leading-7 text-[var(--color-neutral-0)] md:text-[22px]">
                        {stripHtmlAndDecode(item.title)}
                      </span>
                      <span className="line-clamp-1 text-[14px] leading-5 text-[var(--color-neutral-300)]">
                        {stripHtmlAndDecode(item.description)}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="flex size-11 items-center justify-center rounded-[var(--radius-full)] border border-[var(--color-brand-600)] text-[var(--color-neutral-0)] transition-colors duration-300 group-hover:border-[var(--color-accent-500)] group-hover:bg-[var(--color-accent-500)] group-hover:text-[var(--color-brand-950)]"
                    >
                      →
                    </span>
                  </Link>
                </Reveal>
              ))}
        </ol>
      </div>
    </section>
  );
};

export default AnnouncementsList;
