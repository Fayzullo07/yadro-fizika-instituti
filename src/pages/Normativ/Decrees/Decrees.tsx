import { useLanguage } from '@/contexts/LanguageContext';

const Decrees: React.FC = () => {
  const { t } = useLanguage();

  const decreeText = `Seysmik xavfsizlikni taʼminlash sohasida ilmiy tadqiqotlarni qoʻllab-quvvatlash va kadrlar tayyorlash, qurilishda sunʼiy intellekt texnologiyalaridan foydalanish va raqamli qurilishni rivojlantirish, barqaror konstruktiv yechimlar, yerosti va yerusti shaharsozligi, "yashil" qurilish, geotexnika va qurilish materiallari yoʻnalishlarida zarur ilmiy yechimlarni ishlab chiqish maqsadida qaror qilaman:`;

  return (
    <div className="pb-10">
      <div className="mt-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-[#013d8c] rounded-full shrink-0" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
              Oʻzbekiston Respublikasi Prezidentining
            </h1>
            <p className="text-lg font-bold text-[#013d8c] uppercase tracking-wide">Qarori</p>
          </div>
        </div>
        <div className="h-px bg-gray-200 mt-4" />
      </div>

      <div className="max-w-4xl">
        {/* SUBTITLE */}
        <section className="mb-8">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6 text-center">
            Toshkent arxitektura-qurilish universiteti huzurida Seysmik xavfsizlik va barqaror
            qurilish milliy tadqiqot instituti faoliyatini tashkil etish chora-tadbirlari
            toʻgʻrisida
          </h3>

          <p className="text-gray-700 text-[16px] md:text-lg leading-[1.9] tracking-wide whitespace-pre-line">
            {decreeText}
          </p>
        </section>

        {/* LINK BLOCK */}
        <section className="border-t border-gray-200 pt-8">
          <div className="bg-gray-50 flex justify-between items-center border border-gray-200 rounded p-4 md:p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#013d8c]/10 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[#013d8c]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {t('pages.decrees.fullText') || "To'liq matn"}
                </h4>
                <p className="text-gray-600 text-sm">
                  {t('pages.decrees.fullTextDescription') ||
                    "Qarorning rasmiy va to'liq matni bilan tanishish"}
                </p>
              </div>
            </div>

            <a
              href="https://www.lex.uz/docs/-7777579"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-lg
                  bg-[#013d8c] text-white font-medium
                  hover:bg-[#012f6c] transition"
            >
              {t('pages.decrees.viewFullText') || "To'liq matnni ochish"}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 3h7m0 0v7m0-7L10 14"
                />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Decrees;
