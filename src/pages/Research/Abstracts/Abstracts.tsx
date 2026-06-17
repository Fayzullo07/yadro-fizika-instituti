import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAbstracts } from '@/hooks/usePublications';
import Loading from '@/components/shared/Loading/Loading';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import { ABSTRACTS_PATH } from '@/routes/path';

const Abstracts: React.FC = () => {
  const { t } = useLanguage();
  const { data, loading, error } = useAbstracts();

  const items = data?.data ?? [];

  return (
    <div className="pb-10">
      <PageTitle>{t('nav.ilmiyFaoliyat.abstracts') || 'Avtoreferatlar'}</PageTitle>

      {loading && <Loading />}
      {error && <p className="text-center py-16 text-gray-500">{t('common.error')}</p>}
      {!loading && !error && items.length === 0 && (
        <p className="text-center py-16 text-gray-500">{t('common.notAvailable')}</p>
      )}
      {!loading && !error && items.length > 0 && (
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <Link
              key={item.id}
              to={`${ABSTRACTS_PATH}/${item.id}`}
              className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-4"
            >
              <div className="shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <span
                  className="text-base font-black leading-none"
                  style={{
                    background: 'linear-gradient(135deg, #013d8c, #60a5fa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {String(item.order).padStart(2, '0')}
                </span>
              </div>

              <div className="shrink-0 w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z" />
                </svg>
              </div>

              <p className="flex-1 text-sm sm:text-base font-medium text-gray-800 leading-snug">
                {item.title}
              </p>

              <div className="shrink-0 flex items-center gap-2">
                <a
                  href={item.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#013d8c] bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span className="hidden sm:inline">{t('news.detail') || "Ko'rish"}</span>
                </a>
                <a
                  href={item.file}
                  download
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-[#013d8c] hover:bg-[#012d6a] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span className="hidden sm:inline">{t('common.download') || 'Yuklab olish'}</span>
                </a>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Abstracts;
