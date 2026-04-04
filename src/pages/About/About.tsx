import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApi } from '@/hooks/useApi';
import { generalApi } from '@/services/api';
import { CONTACT_PATH } from '@/routes/path';
import type { AboutData } from '@/types';

const About: React.FC = () => {
  const { t, language } = useLanguage();
  const { data: aboutData, loading, error } = useApi<AboutData>(
    () => generalApi.getAbout(language),
    [language]
  );

  return (
    <div className="bg-white">

      <section className="max-w-5xl mx-auto  pb-16">

        {loading && (
          <p className="mt-6 text-lg text-gray-600">
            {t('common.loading')}
          </p>
        )}

        {error && (
          <p className="mt-6 text-lg text-red-600">
            {t('common.error') || 'Xatolik yuz berdi'}
          </p>
        )}

        {!loading && !error && (
          <div className="mt-8">
            {aboutData?.image && (
              <img
                src={aboutData.image}
                alt={t('about.heroTitle') || 'About image'}
                className="w-full max-h-[460px] object-cover"
              />
            )}

            {aboutData?.content && (
              <div
                className="mt-8 text-gray-700 leading-relaxed space-y-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_p]:mt-4"
                dangerouslySetInnerHTML={{ __html: aboutData.content }}
              />
            )}
          </div>
        )}
      </section>

      <section className="max-w-5xl mx-auto px-4 py-20 border-t border-gray-100">

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