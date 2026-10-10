import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Carousel, Image } from 'antd';
import { useLanguage } from '@/contexts/LanguageContext';
import { useConferenceById } from '@/hooks/useConferences';
import { sanitizeHtml } from '@/utils/htmlUtils';
import { formatDate } from '@/utils/dateUtils';
import { useImageRetry } from '@/hooks/useImageRetry';
import Loading from '@/components/shared/Loading/Loading';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import BackButton from '@/components/shared/BackButton/BackButton';
import { CONFERENCES_PATH } from '@/routes/path';
import type { ConferenceImage } from '@/types';

const PREVIEW_LABEL: Record<string, string> = {
  uz: "Ko'rish",
  ru: 'Просмотр',
  en: 'Preview',
};

const ZoomIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16zM11 8v6M8 11h6"
    />
  </svg>
);

const CarouselArrow: React.FC<{
  direction: 'left' | 'right';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
}> = ({ direction, onClick, style }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={direction === 'left' ? 'Previous' : 'Next'}
    style={{ ...style, display: 'flex', top: '50%', transform: 'translateY(-50%)' }}
    className={`absolute! items-center! justify-center! w-10! h-10! rounded-full bg-black/45 hover:bg-black/65 backdrop-blur-sm transition-colors z-20 ${
      direction === 'left' ? 'left-3!' : 'right-3!'
    }`}
  >
    <svg
      className="w-5 h-5 text-[var(--color-neutral-0)]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={direction === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
      />
    </svg>
  </button>
);

const CarouselSlide: React.FC<{ image: ConferenceImage; alt: string; label: string }> = ({
  image,
  alt,
  label,
}) => {
  const [loaded, setLoaded] = useState(false);
  const { retryKey, handleError } = useImageRetry();

  return (
    <div className="relative w-full aspect-video sm:aspect-[21/9] bg-[var(--color-neutral-900)] overflow-hidden">
      {!loaded && <div className="absolute inset-0 bg-[var(--color-neutral-100)] animate-pulse" />}
      {loaded && (
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 blur-xl opacity-60"
          style={{ backgroundImage: `url(${image.url})` }}
        />
      )}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <Image
          key={retryKey}
          src={image.url}
          alt={alt}
          height="100%"
          onLoad={() => setLoaded(true)}
          onError={handleError}
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 300ms',
            width: 'auto',
            maxWidth: '100%',
          }}
          preview={{
            mask: (
              <span className="flex items-center gap-1.5 text-[var(--color-neutral-0)] text-xs sm:text-sm">
                <ZoomIcon />
                {label}
              </span>
            ),
          }}
        />
      </div>
    </div>
  );
};

const fileExt = (name: string) => (name.split('.').pop() || 'FILE').toUpperCase().slice(0, 4);

const ConferenceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { data: detailRes, loading, error } = useConferenceById(id!);

  const item = detailRes?.data;

  if (loading) return <Loading />;

  if (error || !item) {
    return (
      <div className="text-center py-16 sm:py-20">
        <p className="text-[var(--color-neutral-500)] mb-4 text-sm sm:text-base">
          {t('common.error')}
        </p>
        <Link
          to={CONFERENCES_PATH}
          className="text-[var(--color-brand-700)] hover:underline font-medium text-sm sm:text-base"
        >
          ← {t('backToList')}
        </Link>
      </div>
    );
  }

  const images = item.images ?? [];
  const files = item.files ?? [];
  const isSameDay = item.start_date === item.end_date;
  const dateRange = isSameDay
    ? formatDate(item.start_date, language)
    : `${formatDate(item.start_date, language)} – ${formatDate(item.end_date, language)}`;

  return (
    <div className="pb-10">
      <BackButton to={CONFERENCES_PATH} label={t('backToList')} />

      <PageTitle>{item.title}</PageTitle>

      <div className="flex flex-col gap-[var(--space-6)]">
        <section className="flex flex-wrap gap-x-[var(--space-8)] gap-y-[var(--space-3)] rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-[var(--space-6)] shadow-[var(--shadow-card)]">
          <div className="flex flex-col gap-[var(--space-1)]">
            <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent-600)]">
              {t('conferences.detail')}
            </span>
            <span className="text-[18px] font-bold leading-7 text-[var(--color-brand-700)]">
              {dateRange}
            </span>
          </div>
          {item.location && (
            <div className="flex flex-col gap-[var(--space-1)]">
              <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent-600)]">
                {t('contact.location')}
              </span>
              <span className="text-[18px] font-bold leading-7 text-[var(--color-neutral-900)]">
                {item.location}
              </span>
            </div>
          )}
        </section>

        {images.length > 0 && (
          <section className="overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] shadow-[var(--shadow-card)]">
            <Image.PreviewGroup>
              <Carousel
                arrows={images.length > 1}
                dots={images.length > 1}
                infinite
                prevArrow={<CarouselArrow direction="left" />}
                nextArrow={<CarouselArrow direction="right" />}
                className="[&_.slick-dots]:bottom-4 [&_.slick-dots_li]:w-2 [&_.slick-dots_li]:h-2 [&_.slick-dots_li]:mx-1
                  [&_.slick-dots_li_button]:w-2 [&_.slick-dots_li_button]:h-2 [&_.slick-dots_li_button]:rounded-full
                  [&_.slick-dots_li_button]:bg-[var(--color-neutral-0)] [&_.slick-dots_li_button]:opacity-60
                  [&_.slick-dots_li.slick-active_button]:opacity-100 [&_.slick-dots_li.slick-active_button]:w-6
                  [&_.slick-dots_li.slick-active_button]:rounded-full [&_.slick-dots_li_button]:transition-all"
              >
                {images.map((image, index) => (
                  <CarouselSlide
                    key={image.id ?? index}
                    image={image}
                    alt={`${item.title} - ${index + 1}`}
                    label={PREVIEW_LABEL[language] ?? PREVIEW_LABEL.uz}
                  />
                ))}
              </Carousel>
            </Image.PreviewGroup>
          </section>
        )}

        {files.length > 0 && (
          <section className="rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-[var(--space-6)] shadow-[var(--shadow-card)]">
            <p className="mb-[var(--space-3)] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent-600)]">
              {t('conferences.attachments')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {files.map((file) => (
                <a
                  key={file.id}
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 rounded-[var(--radius-md)] border border-[var(--color-neutral-100)] hover:border-[var(--color-brand-700)]/40 hover:bg-[var(--color-brand-700)]/[0.03] pl-2.5 pr-3 sm:pr-3.5 py-2 transition-colors min-w-0"
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
          </section>
        )}

        <section
          className="
            rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] shadow-[var(--shadow-card)] p-[var(--space-6)] text-[var(--color-neutral-700)] text-sm sm:text-[15px] leading-relaxed
            [&_a]:text-[var(--color-brand-600)] [&_a]:underline [&_a]:break-all [&_a:hover]:text-[var(--color-brand-700)]
            [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--color-brand-700)]/30
            [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[var(--color-neutral-500)] [&_blockquote]:my-4
            [&_b]:font-semibold [&_strong]:font-semibold
            [&_div]:leading-relaxed
            [&_p]:mb-3
            [&_img]:max-w-full
            [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-[var(--color-neutral-100)] [&_td]:px-2 sm:[&_td]:px-3 [&_td]:py-2
            [&_th]:border [&_th]:border-[var(--color-neutral-100)] [&_th]:px-2 sm:[&_th]:px-3 [&_th]:py-2 [&_th]:bg-[var(--color-neutral-50)] [&_th]:font-semibold
            overflow-x-auto
          "
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.description) }}
        />
      </div>
    </div>
  );
};

export default ConferenceDetail;
