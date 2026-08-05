import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAnnouncementById } from '@/hooks/useAnnouncements';
import { sanitizeHtml } from '@/utils/htmlUtils';
import Loading from '@/components/shared/Loading/Loading';
import BackButton from '@/components/shared/BackButton/BackButton';

const AnnouncementDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const { data: detailRes, loading, error } = useAnnouncementById(id!);

  const item = detailRes?.data;

  if (loading) return <Loading />;

  if (error || !item) {
    return (
      <div className="text-center py-16 sm:py-20">
        <p className="text-gray-500 mb-4 text-sm sm:text-base">{t('common.error')}</p>
        <Link
          to="/news/announcements"
          className="text-[#013d8c] hover:underline font-medium text-sm sm:text-base"
        >
          ← {t('backToList')}
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <BackButton to="/news/announcements" label={t('backToList')} />

      <article className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-[#013d8c] px-4 sm:px-6 py-4 sm:py-5">
          <h1 className="text-white text-base sm:text-xl md:text-2xl font-bold leading-snug">
            {item.title}
          </h1>
        </div>

        <div
          className="
            px-4 sm:px-6 py-4 sm:py-6 text-gray-700 text-sm sm:text-[15px] leading-relaxed
            [&_a]:text-blue-600 [&_a]:underline [&_a]:break-all [&_a:hover]:text-blue-800
            [&_blockquote]:border-l-4 [&_blockquote]:border-[#013d8c]/30
            [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-500 [&_blockquote]:my-4
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
