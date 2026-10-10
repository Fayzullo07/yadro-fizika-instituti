import { useLanguage } from '@/contexts/LanguageContext';
import PageTitle from '@/components/shared/PageTitle/PageTitle';

const Constitution: React.FC = () => {
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
    <div className="pb-10">
      <PageTitle>Oʻzbekiston Respublikasi Konstitutsiyasi</PageTitle>

      <div className="max-w-4xl">
        {/* MUQADDIMA */}
        <section className="rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-[var(--space-6)] shadow-[var(--shadow-card)] md:p-[var(--space-10)]">
          <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-brand-700)]">
            I-BO‘LIM
          </span>

          <h2 className="mb-[var(--space-6)] mt-[var(--space-2)] text-[24px] font-bold leading-8 text-[var(--color-neutral-900)] md:text-[32px] md:leading-10">
            Muqaddima
          </h2>

          <p className="whitespace-pre-line text-[16px] leading-[1.9] text-[var(--color-neutral-700)] md:text-lg">
            {muqaddima}
          </p>
        </section>

        {/* LINK BLOCK */}
        <a
          href="https://lex.uz/docs/-6445145"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-[var(--space-6)] flex items-center gap-[var(--space-4)] rounded-[var(--radius-lg)] bg-[var(--color-neutral-0)] p-[var(--space-4)] shadow-[var(--shadow-card)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-1 hover:bg-[var(--color-brand-50)] motion-reduce:transition-none motion-reduce:hover:translate-x-0"
        >
          <span className="flex size-14 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-brand-50)] text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-brand-700)]">
            LEX
          </span>
          <div className="min-w-0 flex-1">
            <h4 className="text-[16px] font-bold leading-6 text-[var(--color-neutral-900)]">
              {t('pages.constitution.fullText') || 'To‘liq matn'}
            </h4>
            <p className="text-[14px] leading-5 text-[var(--color-neutral-500)]">
              {t('pages.constitution.fullTextDescription') ||
                'Konstitutsiyaning rasmiy va to‘liq matni bilan tanishish'}
            </p>
          </div>
          <span
            aria-hidden
            className="shrink-0 text-[24px] font-bold leading-none text-[var(--color-brand-700)]"
          >
            ↗
          </span>
        </a>
      </div>
    </div>
  );
};

export default Constitution;
