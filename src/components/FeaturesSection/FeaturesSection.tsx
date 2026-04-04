import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ABOUT_PATH } from '@/routes/path';
import SectionHeader from '@/components/shared/SectionHeader/SectionHeader';

interface Feature {
  id: number;
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
}

const FeaturesSection: React.FC = () => {
  const { t } = useLanguage();

  const features: Feature[] = [
    {
      id: 1,
      title: t('features.research.title') || 'TADQIQOT',
      description:
        t('features.research.description') ||
        "Biz sun'iy intellekt bo'yicha fundamental va amaliy tadqiqotlar olib boramiz. Tadqiqot loyihalarni boshqarish orqali amalga oshiriladi.",
      link: '/research',
      icon: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="40" stroke="#0ea5e9" strokeWidth="2" fill="none" />
          <circle cx="35" cy="35" r="6" fill="#0ea5e9" />
          <circle cx="65" cy="35" r="6" fill="#0ea5e9" />
          <circle cx="35" cy="65" r="6" fill="#0ea5e9" />
          <circle cx="65" cy="65" r="6" fill="#0ea5e9" />
          <line x1="35" y1="35" x2="65" y2="35" stroke="#0ea5e9" strokeWidth="2" />
          <line x1="35" y1="35" x2="35" y2="65" stroke="#0ea5e9" strokeWidth="2" />
          <line x1="65" y1="35" x2="65" y2="65" stroke="#0ea5e9" strokeWidth="2" />
          <line x1="35" y1="65" x2="65" y2="65" stroke="#0ea5e9" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: 2,
      title: t('features.about.title') || 'BIZ HAQIMIZDA',
      description:
        t('features.about.description') ||
        "Bizning maqsadimiz murakkab iqtisodiy, ijtimoiy va ilmiy muammolarni hal qilish uchun sun'iy intellekt va raqamli texnologiyalardan foydalanish imkoniyatlarini topishdir.",
      link: ABOUT_PATH,
      icon: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="40" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <circle cx="50" cy="50" r="20" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <line
            x1="50"
            y1="30"
            x2="50"
            y2="40"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="50"
            y1="60"
            x2="50"
            y2="70"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="60"
            y1="50"
            x2="70"
            y2="50"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="30"
            y1="50"
            x2="40"
            y2="50"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="50" cy="50" r="6" fill="#3b82f6" />
        </svg>
      ),
    },
    {
      id: 3,
      title: t('features.projects.title') || 'LOYIHALAR',
      description:
        t('features.projects.description') ||
        "Sun'iy intellekt texnologiyalari asosida boshqaruv va ishlab chiqarish jarayonlarini avtomatlashtirish bo'yicha dasturiy mahsulotlarni ishlab chiqish.",
      link: '/projects',
      icon: (
        <svg
          className="w-12 h-12"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="30"
            y="30"
            width="40"
            height="40"
            rx="4"
            stroke="#0ea5e9"
            strokeWidth="2"
            fill="none"
          />
          <rect x="35" y="40" width="30" height="4" rx="2" fill="#0ea5e9" />
          <rect x="35" y="50" width="20" height="4" rx="2" fill="#0ea5e9" />
          <rect x="35" y="60" width="25" height="4" rx="2" fill="#0ea5e9" />
          <circle cx="70" cy="45" r="5" stroke="#0ea5e9" strokeWidth="2" fill="none" />
          <line
            x1="70"
            y1="45"
            x2="70"
            y2="45"
            stroke="#0ea5e9"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        {/* Section Header - Simple */}
        <SectionHeader
          title={t('features.title') || "ASOSIY YO'NALISHLAR"}
          subtitle={t('features.intro') || 'Innovatsion yechimlar va zamonaviy texnologiyalar'}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group bg-white border border-gray-200 rounded-xl p-6 flex flex-col transition-all duration-300"
            >
              <div className="mb-6 p-3 bg-blue-50 w-fit rounded-lg">{feature.icon}</div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>

              <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{feature.description}</p>

              <div className="mt-auto">
                <Link
                  to={feature.link}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  {t('features.readMore') || 'BATAFSIL'}
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 bg-[#013d8c] text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('features.contact') || "BOG'LANISH"}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
