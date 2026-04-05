import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getFeatures } from './FeaturesData';
import FeatureCard from './FeatureCard';

const FeaturesSection: React.FC = () => {
  const { t } = useLanguage();
  const features = getFeatures(t);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-sm font-medium text-gray-400 tracking-widest uppercase mb-3 block">
            {t('features.intro') || 'Innovatsion yechimlar va zamonaviy texnologiyalar'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {t('features.title') || "ASOSIY YO'NALISHLAR"}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200">
          {features.map((feature, index) => (
            <div key={feature.id}>
              <FeatureCard feature={feature} readMoreText={t('features.readMore') || 'Batafsil'} />
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 text-sm"
            style={{ transition: 'background-color 0.5s ease' }}
          >
            {t('features.contact') || "BOG'LANISH"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
