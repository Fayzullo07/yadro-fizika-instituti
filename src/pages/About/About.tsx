import { Image } from 'antd';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApi } from '@/hooks/useApi';
import { generalApi } from '@/services/api';
import { CONTACT_PATH } from '@/routes/path';
import { sanitizeHtml } from '@/utils/htmlUtils';
import type { AboutData, SingleResponse } from '@/types';

const About: React.FC = () => {
  const { t, language } = useLanguage();
  const {
    data: aboutResponse,
    loading,
    error,
  } = useApi<SingleResponse<AboutData>>(() => generalApi.getAbout(language), [language]);

  const aboutData = aboutResponse?.data;

  return (
    <div className="bg-white shadow-lg">
      <section className="pb-10 md:pb-16">
        <div className="px-3 sm:px-4 mt-5 sm:mt-8 mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-7 sm:h-8 bg-[#013d8c] rounded-full shrink-0" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
              {t('nav.institute.about')}
            </h1>
          </div>
          <div className="h-px bg-gray-200 mt-3 sm:mt-4" />
        </div>

        {loading && (
          <p className="mt-6 px-3 sm:px-4 text-base sm:text-lg text-gray-600">
            {t('common.loading')}
          </p>
        )}

        {error && (
          <p className="mt-6 px-3 sm:px-4 text-base sm:text-lg text-red-600">{t('common.error')}</p>
        )}

        {!loading && !error && aboutData && (
          <div>
            {aboutData.image && (
              <div className="group relative w-full h-65 sm:h-90 md:h-115 overflow-hidden [&_.ant-image]:w-full [&_.ant-image]:h-full [&_.ant-image-img]:w-full [&_.ant-image-img]:h-full [&_.ant-image-img]:object-contain [&_.ant-image-mask]:bg-transparent [&_.ant-image-mask]:items-end [&_.ant-image-mask]:justify-end [&_.ant-image-mask]:p-3">
                <div
                  className="absolute inset-0 bg-cover bg-center scale-110 blur-xl"
                  style={{ backgroundImage: `url(${aboutData.image})` }}
                  aria-hidden="true"
                />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <Image
                    src={aboutData.image}
                    alt={t('about.heroTitle')}
                    width="100%"
                    height="100%"
                    style={{ inlineSize: '100%', blockSize: '100%', objectFit: 'contain' }}
                    preview={{
                      mask: (
                        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-black/60 text-white">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                            />
                          </svg>
                        </span>
                      ),
                    }}
                  />
                </div>
              </div>
            )}

            {aboutData.content && (
              <div
                className="mt-5 sm:mt-8 px-3 sm:px-6 text-gray-700 leading-relaxed sm:leading-loose text-sm sm:text-base [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-6 sm:[&_h2]:mt-8 [&_p]:mt-3 sm:[&_p]:mt-4 [&_img]:max-w-full [&_table]:w-full [&_table]:overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(aboutData.content) }}
              />
            )}
          </div>
        )}
      </section>

      <section className="px-4 py-10 sm:py-16 md:py-20 border-t border-gray-100">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
          {t('about.ctaTitle') || "Bog'lanish"}
        </h2>

        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600">
          {t('about.ctaText') || "Savollaringiz bo'lsa, biz bilan bog'laning."}
        </p>

        <Link
          to={CONTACT_PATH}
          className="inline-block mt-4 sm:mt-6 px-5 sm:px-6 py-2.5 sm:py-3 bg-gray-900 text-white text-sm sm:text-base rounded-lg hover:bg-gray-800 transition"
        >
          {t('about.ctaButton') || "Bog'lanish"}
        </Link>
      </section>
    </div>
  );
};

export default About;
