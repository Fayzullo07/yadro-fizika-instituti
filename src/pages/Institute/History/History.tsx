import { useLanguage } from '@/contexts/LanguageContext';
import { useInstituteHistory } from '@/hooks/useInstituteHistory';
import Loading from '@/components/shared/Loading/Loading';
import DOMPurify from 'dompurify';

const cleanContent = (html: string): string =>
  DOMPurify.sanitize(html, {
    FORBID_ATTR: ['style', 'class'],
    ADD_TAGS: ['h3', 'p', 'span', 'br', 'strong', 'b'],
  });

const History: React.FC = () => {
  const { t } = useLanguage();
  const { data, loading, error } = useInstituteHistory();

  const content = data?.data?.content;

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="mt-4 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-[#013d8c] rounded-full shrink-0" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
            {t('nav.institut.history') || 'Institut tarixi'}
          </h1>
        </div>
        <div className="h-px bg-gray-200 mt-4" />
      </div>

      {loading && <Loading />}

      {error && (
        <p className="text-center py-16 text-gray-500">
          {t('common.error') || 'Xatolik yuz berdi'}
        </p>
      )}

      {content && (
        <div className="relative">
          {/* vertical timeline line */}
          <div className="absolute top-0 bottom-0 left-2.5 w-0.5 bg-[#013d8c]/15 hidden md:block" />

          <div
            className="
              md:pl-10
              [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#013d8c]
              [&_h3]:mb-6 [&_h3]:mt-0 [&_h3]:text-center
              [&_p]:relative [&_p]:mb-5 [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:text-[15px]
              [&_p]:pl-0
              [&_b]:text-[#013d8c] [&_b]:font-bold [&_b]:text-base
              [&_strong]:text-[#013d8c] [&_strong]:font-bold
              [&_span]:font-bold [&_span]:text-[#013d8c]
            "
            dangerouslySetInnerHTML={{ __html: cleanContent(content) }}
          />
        </div>
      )}
    </div>
  );
};

export default History;
