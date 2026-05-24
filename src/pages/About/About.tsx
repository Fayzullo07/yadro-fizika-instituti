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
      <section className="pb-16">
        <div className="px-3 mt-8 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-[#013d8c] rounded-full shrink-0" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
              {'Institut haqida'}
            </h1>
          </div>
          <div className="h-px bg-gray-200 mt-4" />
        </div>

        {loading && <p className="mt-6 text-lg text-gray-600">{t('common.loading')}</p>}

        {error && <p className="mt-6 text-lg text-red-600">{t('common.error')}</p>}

        {!loading && !error && aboutData && (
          <div className="">
            {aboutData.image && (
              <img
                src={aboutData.image}
                alt={t('about.heroTitle')}
                loading="lazy"
                className="w-full max-h-[460px] object-cover"
              />
            )}

            {aboutData.content && (
              <div
                className="mt-8 px-3 text-gray-700 leading-relaxed space-y-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_p]:mt-4"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(aboutData.content) }}
              />
            )}
          </div>
        )}
      </section>

      <section className=" px-4 py-20 border-t border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-900">
          {t('about.ctaTitle') || 'Bog‘lanish'}
        </h2>

        <p className="mt-3 text-gray-600">
          {t('about.ctaText') || 'Savollaringiz bo‘lsa, biz bilan bog‘laning.'}
        </p>

        <Link
          to={CONTACT_PATH}
          className="inline-block mt-6 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
        >
          {t('about.ctaButton') || 'Bog‘lanish'}
        </Link>
      </section>
    </div>
  );
};

export default About;
