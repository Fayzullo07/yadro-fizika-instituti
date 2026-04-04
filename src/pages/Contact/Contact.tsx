import SectionHeader from '@/components/shared/SectionHeader/SectionHeader';
import { useGeneral } from '@/hooks/useGeneral';
import { useLanguage } from '@/contexts/LanguageContext';
import AddressMapSection from '@/components/shared/AddressMapSection/AddressMapSection2';
import Loading from '@/components/shared/Loading/Loading';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const { data: generalData, loading } = useGeneral();

  if (loading) {
    return <Loading />;
  }

  const email = generalData?.email || '';
  const phone = generalData?.phone || '';
  const address =
    generalData?.address || "100194, Yangishahar ko'chasi 9A-uy, Toshkent shahar, Yunusobod tumani";

  return (
    <div className="min-h-screen py-4 bg-gray-50">
      <div className="">
        {/* Sarlavha */}
        <SectionHeader
          title={t('nav.contact') || 'Aloqa'}
          subtitle={t('contact.subtitle') || "Biz bilan bog'laning, savollaringizga javob beramiz"}
        />

        {/* Asosiy kontent */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Aloqa ma'lumotlari */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-md p-6 mb-6 border border-gray-100">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                  {t('footer.contact') || "Bog'lanish"}
                </h2>

                <div className="space-y-6">
                  {email && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-50 p-3 rounded-lg mr-4">
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">Email</h3>
                        <a
                          href={`mailto:${email}`}
                          className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          {email}
                        </a>
                      </div>
                    </div>
                  )}

                  {phone && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-50 p-3 rounded-lg mr-4">
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">Telefon</h3>
                        <a
                          href={`tel:${phone.replace(/\s/g, '')}`}
                          className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          {phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {address && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-blue-50 p-3 rounded-lg mr-4">
                        {address.includes('@') ? (
                          // Email icon agar address email ko'rinishida bo'lsa
                          <svg
                            className="w-6 h-6 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            ></path>
                          </svg>
                        ) : (
                          // Manzil icon
                          <svg
                            className="w-6 h-6 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                          </svg>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">
                          {address.includes('@') ? 'Email' : 'Manzil'}
                        </h3>
                        {address.includes('@') ? (
                          <a
                            href={`mailto:${address}`}
                            className="text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            {address}
                          </a>
                        ) : (
                          <p className="text-gray-600">{address}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Xarita */}
            <div className="lg:w-2/3">
              <AddressMapSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
