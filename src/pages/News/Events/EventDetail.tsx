import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Image } from 'antd';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEventById } from '@/hooks/useEvents';
import { useImageRetry } from '@/hooks/useImageRetry';
import { formatDate } from '@/utils/dateUtils';
import { sanitizeDocumentHtml } from '@/utils/htmlUtils';
import Loading from '@/components/shared/Loading/Loading';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import BackButton from '@/components/shared/BackButton/BackButton';

const PREVIEW_LABEL: Record<string, string> = {
  uz: "Ko'rish",
  ru: 'Просмотр',
  en: 'Preview',
};

const FullscreenIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 9V5a1 1 0 011-1h4M15 4h4a1 1 0 011 1v4M20 15v4a1 1 0 01-1 1h-4M9 20H5a1 1 0 01-1-1v-4"
    />
  </svg>
);

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { data: detailRes, loading, error } = useEventById(id!);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { retryKey, handleError } = useImageRetry();

  const item = detailRes?.data;

  if (loading) return <Loading />;

  if (error || !item) {
    return (
      <div className="text-center py-16 sm:py-20">
        <p className="text-[var(--color-neutral-500)] mb-4 text-sm sm:text-base">
          {t('common.error')}
        </p>
        <Link
          to="/news/events"
          className="text-[var(--color-brand-700)] hover:underline font-medium text-sm sm:text-base"
        >
          ← {t('backToList')}
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <PageTitle>{item.title}</PageTitle>
      <BackButton to="/news/events" label={t('backToList')} />

      <article className="overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] shadow-[var(--shadow-card)]">
        {item.image && (
          <div className="relative w-full h-96 sm:h-120 md:h-160 overflow-hidden bg-[var(--color-neutral-100)]">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-[var(--color-neutral-100)] animate-pulse" />
            )}
            <div
              aria-hidden
              className="absolute inset-0 bg-cover bg-center scale-110 blur-md opacity-40"
              style={{ backgroundImage: `url(${item.image})` }}
            />
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <Image
                key={retryKey}
                src={item.image}
                alt={item.title}
                height="100%"
                onLoad={() => setImageLoaded(true)}
                onError={handleError}
                rootClassName="[&_.ant-image-mask]:bg-transparent [&_.ant-image-mask]:opacity-100"
                style={{
                  opacity: imageLoaded ? 1 : 0,
                  transition: 'opacity 300ms',
                  inlineSize: 'auto',
                  maxInlineSize: '100%',
                  objectFit: 'contain',
                }}
                preview={{
                  mask: (
                    <span
                      title={PREVIEW_LABEL[language] ?? PREVIEW_LABEL.uz}
                      aria-label={PREVIEW_LABEL[language] ?? PREVIEW_LABEL.uz}
                      className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-[var(--radius-md)] bg-black/55 text-[var(--color-neutral-0)] shadow-[var(--shadow-card)] backdrop-blur-sm transition-colors hover:bg-black/75"
                    >
                      <FullscreenIcon />
                    </span>
                  ),
                }}
              />
            </div>
          </div>
        )}

        <div className="px-4 py-4 sm:px-6 sm:py-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-600)]">
            {formatDate(item.created_at, language)}
          </span>
        </div>

        {item.duties && (
          <div
            className="
              px-4 sm:px-6 pb-4 sm:pb-6 text-[var(--color-neutral-700)] text-sm sm:text-base leading-7
              [&_a]:text-[var(--color-brand-600)] [&_a]:underline [&_a]:break-all [&_a:hover]:text-[var(--color-brand-700)]
              [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--color-brand-700)]/30
              [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[var(--color-neutral-500)] [&_blockquote]:my-4
              [&_b]:font-semibold [&_strong]:font-semibold
              [&_div]:leading-relaxed
              [&_p]:mb-3 [&_p:empty]:hidden
              [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1
              [&_img]:max-w-full
              [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-[var(--color-neutral-100)] [&_td]:px-2 sm:[&_td]:px-3 [&_td]:py-2
              [&_th]:border [&_th]:border-[var(--color-neutral-100)] [&_th]:px-2 sm:[&_th]:px-3 [&_th]:py-2 [&_th]:bg-[var(--color-neutral-50)] [&_th]:font-semibold
              overflow-x-auto
            "
            dangerouslySetInnerHTML={{ __html: sanitizeDocumentHtml(item.duties) }}
          />
        )}
      </article>
    </div>
  );
};

export default EventDetail;
