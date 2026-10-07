import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Image } from 'antd';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEventById } from '@/hooks/useEvents';
import { useImageRetry } from '@/hooks/useImageRetry';
import { formatDate } from '@/utils/dateUtils';
import { sanitizeDocumentHtml } from '@/utils/htmlUtils';
import Loading from '@/components/shared/Loading/Loading';
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
        <p className="text-gray-500 mb-4 text-sm sm:text-base">{t('common.error')}</p>
        <Link
          to="/news/events"
          className="text-[#013d8c] hover:underline font-medium text-sm sm:text-base"
        >
          ← {t('backToList')}
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <BackButton to="/news/events" label={t('backToList')} />

      <article className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {item.image && (
          <div className="relative w-full h-96 sm:h-120 md:h-160 overflow-hidden bg-gray-100">
            {!imageLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
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
                      className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-black/55 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-black/75"
                    >
                      <FullscreenIcon />
                    </span>
                  ),
                }}
              />
            </div>
          </div>
        )}

        <div className="px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <svg
              className="w-4 h-4 text-[#013d8c]/70"
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
            <span className="text-gray-400 text-xs sm:text-sm">
              {formatDate(item.created_at, language)}
            </span>
          </div>
          <h1 className="text-gray-900 text-base sm:text-xl md:text-2xl font-bold leading-snug">
            {item.title}
          </h1>
        </div>

        {item.duties && (
          <div
            className="
              px-4 sm:px-6 pb-4 sm:pb-6 text-gray-700 text-sm sm:text-[15px] leading-relaxed
              [&_a]:text-blue-600 [&_a]:underline [&_a]:break-all [&_a:hover]:text-blue-800
              [&_blockquote]:border-l-4 [&_blockquote]:border-[#013d8c]/30
              [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-500 [&_blockquote]:my-4
              [&_b]:font-semibold [&_strong]:font-semibold
              [&_div]:leading-relaxed
              [&_p]:mb-3 [&_p:empty]:hidden
              [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1
              [&_img]:max-w-full
              [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-gray-200 [&_td]:px-2 sm:[&_td]:px-3 [&_td]:py-2
              [&_th]:border [&_th]:border-gray-200 [&_th]:px-2 sm:[&_th]:px-3 [&_th]:py-2 [&_th]:bg-gray-50 [&_th]:font-semibold
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
