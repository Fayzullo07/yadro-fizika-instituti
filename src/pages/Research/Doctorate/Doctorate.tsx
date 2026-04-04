import { useLanguage } from '@/contexts/LanguageContext';

const Doctorate = () => {
  const { t } = useLanguage();

  // Static data - can be replaced with API call later
  const specialties = [
    {
      id: 1,
      code: '05.01.11',
      title: 'Raqamli texnologiya va sun\'iy intellekt ixtisosligi bo\'yicha kirish imtihon savollari',
      fileUrl: '#',
    },
    {
      id: 2,
      code: '05.01.03',
      title: '"Informatikaning nazariy asoslari" ixtisosligi bo\'yicha kirish imtihon savollari',
      fileUrl: '#',
    },
    {
      id: 3,
      code: '05.01.02',
      title: '"Tizimli tahlil, boshqaruv va axbarotni qayta ishlash" ixtisosligi bo\'yicha kirish imtihon savollari',
      fileUrl: '#',
    },
    {
      id: 4,
      code: '05.01.07',
      title: '"Matematik modellashtirish. Sonli usullar va dasturlar majmui" ixtisosligi bo\'yicha kirish imtihon savollari',
      fileUrl: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-5xl font-semibold text-gray-900 mb-12 text-center">
          {t('nav.tadqiqot.doctorate') || 'DOKTORANTURA'}
        </h1>

        {/* Specialties List */}
        <div className="space-y-4">
          {specialties.map((specialty) => (
            <div
              key={specialty.id}
              className="bg-white border border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors duration-200"
            >
              <div className="flex items-center justify-between gap-4">
                {/* Left side: Number, Code, and Title */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <span className="text-lg font-semibold text-gray-900 flex-shrink-0">
                    {specialty.id})
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <span className="text-lg font-semibold text-gray-900">
                        {specialty.code}
                      </span>
                      <span className="text-gray-500">-</span>
                    </div>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                      "{specialty.title}"
                    </p>
                  </div>
                </div>

                {/* Right side: Action Icons */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  {/* Share/Refresh Icon */}
                  <button
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                    title="Ulashish"
                  >
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
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                  </button>

                  {/* Download Icon */}
                  <a
                    href={specialty.fileUrl}
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                    title="Yuklab olish"
                    download
                  >
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
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctorate;

