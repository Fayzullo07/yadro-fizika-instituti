import { useLanguage } from '@/contexts/LanguageContext';

const LATITUDE = '41.41320805594981';
const LONGITUDE = '69.45051876464483';
const MAP_ZOOM = '15';

const Map: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pb-10">
      {/* Page title */}
      <div className="mt-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-[#013d8c] rounded-full shrink-0" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
            {t('nav.boglanish.map') || 'Xarita'}
          </h1>
        </div>
        <div className="h-px bg-gray-200 mt-4" />
      </div>

      {/* Map + Info */}
      <div className="relative w-full min-h-130 rounded-xl overflow-hidden shadow-md">
        {/* Full map */}
        <iframe
          src={`https://yandex.com/map-widget/v1/?ll=${LONGITUDE},${LATITUDE}&z=${MAP_ZOOM}&pt=${LONGITUDE},${LATITUDE},pm2rdm&l=sat,skl`}
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full min-h-130 border-0"
          title="Manzil xaritasi"
        />

        {/* Info card overlay */}
        <div className="absolute  left-4 bottom-4 w-72 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl flex flex-col overflow-hidden z-10 hidden sm:flex">
          {/* Card header */}
          <div className="bg-[#013d8c] px-5 py-4">
            <p className="text-xs font-semibold text-blue-200 uppercase tracking-widest mb-1">
              {t('contact.location') || 'Lokatsiya'}
            </p>
          </div>

          {/* Info items */}
          <div className="flex flex-col gap-5 p-5 flex-1 overflow-y-auto">
            {/* Address */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  className="w-4 h-4 text-[#013d8c]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  {t('contact.address') || 'Manzil'}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {t('contact.addressValue') ||
                    "Toshkent shahar, Ulug'bek tumani, Movarounnahar ko'chasi, 1-uy"}
                </p>
              </div>
            </div>
          </div>

          {/* Footer link */}
          <div className="px-5 py-4 border-t border-gray-100">
            <a
              href={`https://yandex.com/maps/?ll=${LONGITUDE},${LATITUDE}&z=${MAP_ZOOM}&pt=${LONGITUDE},${LATITUDE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#013d8c] hover:bg-[#012d6a] text-white text-sm font-medium rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              {t('contact.openMap') || 'Xaritada ochish'}
            </a>
          </div>
        </div>
      </div>

      {/* Mobile info cards */}
      <div className="mt-6 grid grid-cols-1 sm:hidden gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <svg
              className="w-4 h-4 text-[#013d8c]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
              {t('contact.address') || 'Manzil'}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {t('contact.addressValue') ||
                "Toshkent shahar, Ulug'bek tumani, Movarounnahar ko'chasi, 1-uy"}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-[#013d8c]" fill="currentColor" viewBox="0 0 17.2 17.2">
              <path d="M15.82 11.29a9.8 9.8 0 0 1-3.067-.488 1.4 1.4 0 0 0-1.363.287l-1.934 1.46a10.7 10.7 0 0 1-4.805-4.8l1.416-1.888a1.39 1.39 0 0 0 .342-1.409 9.8 9.8 0 0 1-.49-3.072A1.38 1.38 0 0 0 4.539 0H1.38A1.38 1.38 0 0 0 0 1.38 15.84 15.84 0 0 0 15.82 17.2a1.38 1.38 0 0 0 1.38-1.38v-3.15a1.38 1.38 0 0 0-1.38-1.38" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
              {t('contact.phone') || 'Telefon'}
            </p>
            <a href="tel:+998712893118" className="text-sm text-gray-700 font-medium block">
              +(998 71) 289-31-18
            </a>
            <a href="tel:+998712893160" className="text-sm text-gray-700 font-medium block">
              +(998 71) 289-31-60
            </a>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <svg
              className="w-4 h-4 text-[#013d8c]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
              {t('contact.workingDays') || 'Ish kunlari'}
            </p>
            <p className="text-sm text-gray-700">
              {t('contact.weekdays') || 'Du–Ju:'}{' '}
              <span className="font-semibold">9:00 – 18:00</span>
            </p>
            <p className="text-sm text-gray-500">
              {t('contact.lunch') || 'Tushlik:'}{' '}
              <span className="font-medium text-gray-700">13:00 – 14:00</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
