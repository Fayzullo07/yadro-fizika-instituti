import { useLanguage } from '@/contexts/LanguageContext';
import { useGeneral } from '@/hooks/useGeneral';

const LATITUDE = '41.41320805594981';
const LONGITUDE = '69.45051876464483';
const MAP_ZOOM = '14';

const PHONES = ['(+998 71) 289-31-18', '(+998 71) 289-31-60'];
const FAX = '(+998 71) 289-36-65';
const WEBSITE = 'https://inp.uz';

const SOCIAL_LINKS = [
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@yadrofizikainstituti',
    color: 'bg-red-600 hover:bg-red-700',
    icon: (
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    ),
  },
  {
    name: 'Telegram',
    url: 'https://t.me/yadrofizikainstituti',
    color: 'bg-sky-500 hover:bg-sky-600',
    icon: (
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.56 8.16-1.27 8.45c-.15.84-.44 1.12-.73 1.15-.61.05-1.07-.4-1.66-.79l-2.33-1.6c-1.03-.66-.36-1.01.22-1.6l2.9-2.83c.01-.02.01-.13-.05-.19-.06-.06-.15-.04-.21-.02-.09.02-1.51.96-4.26 2.82-.4.27-.77.4-1.1.39-.36-.01-.99-.19-1.48-.35-.6-.19-1.07-.29-1.03-.62.02-.17.13-.34.36-.52 1.38-1.08 3.31-2.59 4.4-3.48 1.98-1.68 3.74-2.54 4.18-2.37.09.03.16.11.2.22.04.11.05.23.03.35z" />
    ),
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/yadrofizikainstituti',
    color: 'bg-gradient-to-br from-purple-500 to-pink-500',
    icon: (
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.26.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.67 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24c3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95C23.73 2.71 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32A6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
    ),
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/yadrofizikainstituti',
    color: 'bg-blue-700 hover:bg-blue-800',
    icon: (
      <path d="M24 12c0-6.63-5.37-12-12-12S0 5.37 0 12c0 6 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3 1.79-4.67 4.53-4.67 1.31 0 2.69.23 2.69.23v2.95H15.83c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 22.95 24 18 24 12z" />
    ),
  },
];

const ADDRESS_BY_LANG: Record<string, string> = {
  uz: "100214, Toshkent sh., Ulug'bek shaharchasi, U.G'ulomov ko'chasi, 1",
  ru: 'г. Ташкент, п. Улугбек, ул. У. Гулямова, 1, 100214',
  en: '100214, Tashkent, Ulugbek, 1 U.Gulomov St',
};

const HOURS: Record<string, string[]> = {
  uz: ['Du – Ju: 9:00 – 18:00', 'Tushlik: 13:00 – 14:00'],
  ru: ['Пн – Пт: 9:00 – 18:00', 'Обед: 13:00 – 14:00'],
  en: ['Mon – Fri: 9:00 AM – 6:00 PM', 'Lunch: 1:00 PM – 2:00 PM'],
};

const Card: React.FC<{ icon: React.ReactNode; label: string; children: React.ReactNode }> = ({
  icon,
  label,
  children,
}) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-3.5">
    <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1">
        {label}
      </p>
      {children}
    </div>
  </div>
);

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const { data: generalData } = useGeneral();

  const email = generalData?.email || 'info@inp.uz';
  const address = ADDRESS_BY_LANG[language] ?? ADDRESS_BY_LANG.uz;
  const hours = HOURS[language] ?? HOURS.uz;

  return (
    <div className="pb-10">
      <div className="mt-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-[#013d8c] rounded-full shrink-0" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
            {t('nav.boglanish.contact') || "Bog'lanish"}
          </h1>
        </div>
        <div className="h-px bg-gray-200 mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Cards column */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {/* Phone */}
          <Card
            label={t('contact.phone') || 'Telefon'}
            icon={
              <svg className="w-4 h-4 text-[#013d8c]" fill="currentColor" viewBox="0 0 17.2 17.2">
                <path d="M15.82 11.29a9.8 9.8 0 0 1-3.067-.488 1.4 1.4 0 0 0-1.363.287l-1.934 1.46a10.7 10.7 0 0 1-4.805-4.8l1.416-1.888a1.39 1.39 0 0 0 .342-1.409 9.8 9.8 0 0 1-.49-3.072A1.38 1.38 0 0 0 4.539 0H1.38A1.38 1.38 0 0 0 0 1.38 15.84 15.84 0 0 0 15.82 17.2a1.38 1.38 0 0 0 1.38-1.38v-3.15a1.38 1.38 0 0 0-1.38-1.38" />
              </svg>
            }
          >
            {PHONES.map((p) => (
              <a
                key={p}
                href={`tel:${p.replace(/\s/g, '')}`}
                className="text-sm font-semibold text-[#013d8c] hover:underline block"
              >
                {p}
              </a>
            ))}
          </Card>

          {/* Fax */}
          <Card
            label={t('contact.fax') || 'Faks'}
            icon={
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
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
            }
          >
            <a
              href={`tel:${FAX.replace(/\s/g, '')}`}
              className="text-sm font-semibold text-[#013d8c] hover:underline"
            >
              {FAX}
            </a>
          </Card>

          {/* Email */}
          <Card
            label="Email"
            icon={
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            }
          >
            <a
              href={`mailto:${email}`}
              className="text-sm font-semibold text-[#013d8c] hover:underline break-all"
            >
              {email}
            </a>
          </Card>

          {/* Website */}
          <Card
            label="Veb-sayt"
            icon={
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
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            }
          >
            <a
              href={WEBSITE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#013d8c] hover:underline"
            >
              {WEBSITE}
            </a>
          </Card>

          {/* Address */}
          <Card
            label={t('contact.address') || 'Manzil'}
            icon={
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
            }
          >
            <p className="text-sm text-gray-700 leading-relaxed">{address}</p>
          </Card>

          {/* Working hours */}
          <Card
            label={t('contact.workingDays') || 'Ish vaqti'}
            icon={
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
            }
          >
            {hours.map((h) => (
              <p key={h} className="text-sm text-gray-700">
                {h}
              </p>
            ))}
          </Card>

          {/* Social links */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Ijtimoiy tarmoqlar
            </p>
            <div className="flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.name}
                  className={`w-9 h-9 rounded-full ${s.color} flex items-center justify-center transition-colors`}
                >
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Open map button */}
          <a
            href={`https://yandex.com/maps/?ll=${LONGITUDE},${LATITUDE}&z=${MAP_ZOOM}&pt=${LONGITUDE},${LATITUDE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#013d8c] hover:bg-[#012d6a] text-white text-sm font-medium rounded-xl transition-colors"
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

        {/* Map */}
        <div className="lg:col-span-3 min-h-105 rounded-xl overflow-hidden shadow-sm border border-gray-100">
          <iframe
            src={`https://yandex.com/map-widget/v1/?ll=${LONGITUDE},${LATITUDE}&z=${MAP_ZOOM}&pt=${LONGITUDE},${LATITUDE},pm2rdm&l=sat,skl`}
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full min-h-105 border-0 block"
            title="Manzil xaritasi"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
