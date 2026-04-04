import { useLanguage } from '@/contexts/LanguageContext';
import Breadcrumb from '@/components/shared/Breadcrumb/Breadcrumb';

const Constitution = () => {
    const { t } = useLanguage();

    const muqaddima = `Biz, Oʻzbekistonning yagona xalqi,
inson huquq va erkinliklariga, milliy va umuminsoniy qadriyatlarga, davlat suvereniteti prinsiplariga sodiqligimizni tantanali ravishda eʼlon qilib,
demokratiya, erkinlik va tenglik, ijtimoiy adolat va birdamlik gʻoyalariga sadoqatimizni namoyon qilib,
inson, uning hayoti, erkinligi, shaʼni va qadr-qimmati oliy qadriyat hisoblanadigan insonparvar demokratik davlatni, ochiq va adolatli jamiyatni barpo etish borasida hozirgi va kelajak avlodlar oldidagi yuksak masʼuliyatimizni anglagan holda,
davlatchiligimiz rivojining uch ming yildan ziyod tarixiy tajribasiga, shuningdek jahon sivilizatsiyasiga beqiyos hissa qoʻshgan buyuk ajdodlarimizning ilmiy, madaniy va maʼnaviy merosiga tayanib,
mamlakatimizning bebaho tabiiy boyliklarini koʻpaytirishga hamda hozirgi va kelajak avlodlar uchun asrab-avaylashga hamda atrof-muhit musaffoligini saqlashga astoydil ahd qilib,
xalqaro huquqning umumeʼtirof etilgan prinsip va normalariga asoslangan holda,
Oʻzbekistonning jahon hamjamiyati, eng avvalo, qoʻshni davlatlar bilan doʻstona munosabatlarini hamkorlik, oʻzaro qoʻllab-quvvatlash, tinchlik va totuvlik asosida mustahkamlash hamda rivojlantirishga intilib,
fuqarolarning munosib hayot kechirishini, millatlararo va konfessiyalararo totuvlikni, koʻp millatli jonajon Oʻzbekistonimizning farovonligini va gullab-yashnashini taʼminlashni maqsad qilgan holda,
ushbu Konstitutsiyani qabul qilamiz va eʼlon qilamiz.`;

    return (
        <section className="">
            <div className="container mx-auto px-4 py-10 md:py-16">

                <Breadcrumb />

                <div className="max-w-4xl mx-auto mt-10">

                    {/* MAIN CARD */}
                    <div className="">

                        {/* TITLE */}
                        <header className="text-center mb-14">
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-1 bg-[#013d8c] rounded-full"></div>
                            </div>

                            <h1 className="text-2xl md:text-3xl font-semibold tracking-[0.15em] text-gray-900 uppercase">
                                Oʻzbekiston Respublikasi
                            </h1>

                            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-[#013d8c] uppercase">
                                Konstitutsiyasi
                            </h2>
                        </header>

                        {/* MUQADDIMA */}
                        <section className="mb-8">

                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-sm font-semibold tracking-widest text-[#013d8c]">
                                    I-BO‘LIM
                                </span>
                                <div className="flex-1 h-px bg-gray-300"></div>
                            </div>

                            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
                                Muqaddima
                            </h3>

                            <p className="text-gray-700 text-[16px] md:text-lg leading-[1.9] tracking-wide whitespace-pre-line">
                                {muqaddima}
                            </p>
                        </section>

                        {/* LINK BLOCK */}
                        <section className="border-t border-gray-200 pt-8">

                            <div className="bg-gray-50 flex justify-between items-center border border-gray-200 rounded p-4 md:p-6">

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#013d8c]/10 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-[#013d8c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900">
                                            {t('pages.constitution.fullText') || 'To‘liq matn'}
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            {t('pages.constitution.fullTextDescription') ||
                                                'Konstitutsiyaning rasmiy va to‘liq matni bilan tanishish'}
                                        </p>
                                    </div>
                                </div>

                                <a
                                    href="https://lex.uz/docs/-6445145"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-lg
                  bg-[#013d8c] text-white font-medium
                  hover:bg-[#012f6c] transition"
                                >
                                    To‘liq matnni ochish
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7m0 0v7m0-7L10 14" />
                                    </svg>
                                </a>

                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Constitution;
