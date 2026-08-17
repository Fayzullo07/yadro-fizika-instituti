import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Carousel, Image } from 'antd';
import { useLanguage } from '@/contexts/LanguageContext';
import { useConferenceById } from '@/hooks/useConferences';
import { sanitizeHtml } from '@/utils/htmlUtils';
import { formatDate } from '@/utils/dateUtils';
import { useImageRetry } from '@/hooks/useImageRetry';
import Loading from '@/components/shared/Loading/Loading';
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
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <div className="relative w-full aspect-video sm:aspect-[21/9] bg-gray-900 overflow-hidden">
      {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
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
              <span className="flex items-center gap-1.5 text-white text-xs sm:text-sm">
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
        <p className="text-gray-500 mb-4 text-sm sm:text-base">{t('common.error')}</p>
        <Link
          to={CONFERENCES_PATH}
          className="text-[#013d8c] hover:underline font-medium text-sm sm:text-base"
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

      <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <header className="relative overflow-hidden bg-[#013d8c] px-5 sm:px-8 py-7 sm:py-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '18px 18px',
            }}
          />

          <div className="relative">
            <h1 className="font-serif text-base sm:text-xl md:text-2xl font-semibold leading-tight tracking-tight text-white max-w-3xl">
              {item.title}
            </h1>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs sm:text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {dateRange}
              </span>
              {item.location && (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {item.location}
                </span>
              )}
            </div>
          </div>
        </header>

        {images.length > 0 && (
          <div className="border-t border-gray-100">
            <Image.PreviewGroup>
              <Carousel
                arrows={images.length > 1}
                dots={images.length > 1}
                infinite
                prevArrow={<CarouselArrow direction="left" />}
                nextArrow={<CarouselArrow direction="right" />}
                className="[&_.slick-dots]:bottom-4 [&_.slick-dots_li]:w-2 [&_.slick-dots_li]:h-2 [&_.slick-dots_li]:mx-1
                  [&_.slick-dots_li_button]:w-2 [&_.slick-dots_li_button]:h-2 [&_.slick-dots_li_button]:rounded-full
                  [&_.slick-dots_li_button]:bg-white [&_.slick-dots_li_button]:opacity-60
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
          </div>
        )}

        {files.length > 0 && (
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-t border-gray-100">
            <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase mb-2.5">
              {t('conferences.attachments')}
            </p>
            <div className="flex flex-wrap gap-2">
              {files.map((file, i) => (
                <a
                  key={file.id}
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-lg border border-gray-200 hover:border-[#013d8c]/40 hover:bg-[#013d8c]/[0.03] pl-2.5 pr-3.5 py-2 transition-colors"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-[#013d8c]/8 text-[#013d8c] text-[10px] font-mono font-bold shrink-0">
                    {fileExt(file.name)}
                  </span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#013d8c]">
                    {t('common.download')}
                    {files.length > 1 ? ` ${i + 1}` : ''}
                  </span>
                  <svg
                    className="w-3.5 h-3.5 shrink-0 text-gray-400 group-hover:text-[#013d8c]"
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
            px-4 sm:px-6 py-4 sm:py-6 text-gray-700 text-sm sm:text-[15px] leading-relaxed
            [&_a]:text-blue-600 [&_a]:underline [&_a]:break-all [&_a:hover]:text-blue-800
            [&_blockquote]:border-l-4 [&_blockquote]:border-[#013d8c]/30
            [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-500 [&_blockquote]:my-4
            [&_b]:font-semibold [&_strong]:font-semibold
            [&_div]:leading-relaxed
            [&_p]:mb-3
            [&_img]:max-w-full
            [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-gray-200 [&_td]:px-2 sm:[&_td]:px-3 [&_td]:py-2
            [&_th]:border [&_th]:border-gray-200 [&_th]:px-2 sm:[&_th]:px-3 [&_th]:py-2 [&_th]:bg-gray-50 [&_th]:font-semibold
            overflow-x-auto
          "
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.description) }}
        />
      </article>
    </div>
  );
};

export default ConferenceDetail;
