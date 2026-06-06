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
              <img
                src={aboutData.image}
                alt={t('about.heroTitle')}
                loading="lazy"
                className="w-full max-h-[260px] sm:max-h-[360px] md:max-h-[460px] object-cover"
              />
            )}

            {aboutData.content && (
              <div
                className="mt-5 sm:mt-8 px-3 sm:px-4 text-gray-700 leading-relaxed space-y-3 sm:space-y-4 text-sm sm:text-base [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-6 sm:[&_h2]:mt-8 [&_p]:mt-3 sm:[&_p]:mt-4 [&_img]:max-w-full [&_table]:w-full [&_table]:overflow-x-auto"
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
