import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAnnouncementById } from '@/hooks/useAnnouncements';
import { sanitizeHtml } from '@/utils/htmlUtils';
import Loading from '@/components/shared/Loading/Loading';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import { formatDate } from '@/utils/dateUtils';
import BackButton from '@/components/shared/BackButton/BackButton';

const fileExt = (name: string) => (name.split('.').pop() || 'FILE').toUpperCase().slice(0, 4);

const AnnouncementDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { data: detailRes, loading, error } = useAnnouncementById(id!);

  const item = detailRes?.data;

  if (loading) return <Loading />;

  if (error || !item) {
    return (
      <div className="text-center py-16 sm:py-20">
        <p className="text-[var(--color-neutral-500)] mb-4 text-sm sm:text-base">
          {t('common.error')}
        </p>
        <Link
          to="/news/announcements"
          className="text-[var(--color-brand-700)] hover:underline font-medium text-sm sm:text-base"
        >
          ← {t('backToList')}
        </Link>
      </div>
    );
  }

  const files = item.files ?? [];

  return (
    <div className="pb-10">
      <PageTitle>{item.title}</PageTitle>
      <BackButton to="/news/announcements" label={t('backToList')} />

      <article className="overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] shadow-[var(--shadow-card)]">
        {item.created_at && (
          <div className="border-b border-[var(--color-neutral-100)] px-4 py-4 sm:px-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-600)]">
              {formatDate(item.created_at, language)}
            </span>
          </div>
        )}

        {files.length > 0 && (
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-[var(--color-neutral-100)]">
            <p className="text-xs font-semibold tracking-wide text-[var(--color-neutral-500)] uppercase mb-2.5">
              {t('conferences.attachments')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {files.map((file) => (
                <a
                  key={file.id}
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 rounded-[var(--radius-md)] border border-[var(--color-neutral-100)] hover:border-[var(--color-brand-700)]/40 hover:bg-[var(--color-brand-700)]/[0.03] pl-2.5 pr-3 sm:pr-3.5 py-2 transition-colors duration-300 min-w-0"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-[var(--radius-md)] bg-[var(--color-brand-700)]/8 text-[var(--color-brand-700)] text-[10px] font-mono font-bold shrink-0">
                    {fileExt(file.name)}
                  </span>
                  <span className="flex-1 min-w-0 truncate text-xs sm:text-sm font-medium text-[var(--color-neutral-700)] group-hover:text-[var(--color-brand-700)]">
                    {file.name}
                  </span>
                  <svg
                    className="w-3.5 h-3.5 shrink-0 ml-auto text-[var(--color-neutral-500)] group-hover:text-[var(--color-brand-700)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}

        <div
          className="
            px-4 sm:px-6 py-4 sm:py-6 text-[var(--color-neutral-700)] text-sm sm:text-base leading-7
            [&_a]:text-[var(--color-brand-600)] [&_a]:underline [&_a]:break-all [&_a:hover]:text-[var(--color-brand-700)]
            [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--color-brand-700)]/30
            [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[var(--color-neutral-500)] [&_blockquote]:my-4
            [&_b]:font-semibold [&_strong]:font-semibold
            [&_div]:leading-relaxed
            [&_p]:mb-3
            [&_img]:max-w-full [&_table]:w-full overflow-x-auto
          "
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.description) }}
        />
      </article>
    </div>
  );
};

export default AnnouncementDetail;
