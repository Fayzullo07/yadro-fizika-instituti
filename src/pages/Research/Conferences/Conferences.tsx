import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeader from '@/components/shared/SectionHeader/SectionHeader';

interface Conference {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
}

const Conferences: React.FC = () => {
  const { t } = useLanguage();

  const conferences: Conference[] = [
    {
      id: 1,
      title: 'Xalqaro ilmiy konferensiya',
      date: '2024-03-15',
      location: 'Toshkent',
      description:
        "Sun'iy intellekt va raqamli texnologiyalar bo'yicha xalqaro ilmiy konferensiya",
    },
    {
      id: 2,
      title: 'Innovatsion yechimlar konferensiyasi',
      date: '2024-05-20',
      location: 'Toshkent',
      description:
        'Qurilish va infratuzilma sohasidagi innovatsion yechimlar',
    },
  ];

  return (
    <section className="bg-gray-50 min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4">

        <SectionHeader
          title={t('nav.tadqiqot.conferences') || 'Konferensiyalar'}
          subtitle={
            t('pages.conferences.subtitle') ||
            'Ilmiy konferensiyalar va ilmiy-amaliy anjumanlar'
          }
        />

        {conferences.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {conferences.map((conference) => (
              <article
                key={conference.id}
                className="group bg-white border border-gray-200 rounded-xl p-7 
                transition-all duration-300 hover:border-[#013d8c] hover:shadow-md"
              >
                {/* META */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-5">

                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#013d8c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(conference.date).toLocaleDateString('uz-UZ')}
                  </div>

                  <span className="hidden sm:block w-px h-4 bg-gray-300"></span>

                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#013d8c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {conference.location}
                  </div>

                </div>

                {/* TITLE */}
                <h3 className="text-lg font-semibold text-gray-900 leading-snug mb-3 group-hover:text-[#013d8c] transition">
                  {conference.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {conference.description}
                </p>

                {/* ACTION */}
                <button
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#013d8c] 
                  hover:gap-3 transition-all"
                >
                  Batafsil
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 5l7 7-7 7" />
                  </svg>
                </button>

              </article>
            ))}

          </div>
        ) : (
          <div className="mt-16 bg-white border border-gray-200 rounded-xl p-10 text-center">
            <p className="text-gray-500 text-lg">
              {t('pages.conferences.noConferences') ||
                'Hozirda konferensiyalar mavjud emas'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Conferences;
