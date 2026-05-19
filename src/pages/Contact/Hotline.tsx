import { useLanguage } from '@/contexts/LanguageContext';
import PageTitle from '@/components/shared/PageTitle/PageTitle';

interface SocialMediaLink {
  name: string;
  url: string;
}

const PHONES = ['(+998 71) 289-31-18', '(+998 71) 289-31-60'];
const FAX = '(+998 71) 289-36-65';
const WEBSITE = 'https://test.inp.uz';
const EMAIL = 'inp@gmail.com';

const SOCIAL_LINKS: SocialMediaLink[] = [
  { name: 'youtube', url: '#' },
  { name: 'telegram', url: '#' },
  { name: 'instagram', url: '#' },
  { name: 'facebook', url: '#' },
];

const ICON_COLORS: Record<string, string> = {
  youtube: 'bg-red-600 hover:bg-red-700',
  telegram: 'bg-blue-500 hover:bg-blue-600',
  instagram: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
  facebook: 'bg-blue-600 hover:bg-blue-700',
};

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  youtube: (
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  ),
  telegram: (
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.56 8.16-1.27 8.45c-.15.84-.44 1.12-.73 1.15-.61.05-1.07-.4-1.66-.79l-2.33-1.6c-1.03-.66-.36-1.01.22-1.6l2.9-2.83c.01-.02.01-.13-.05-.19-.06-.06-.15-.04-.21-.02-.09.02-1.51.96-4.26 2.82-.4.27-.77.4-1.1.39-.36-.01-.99-.19-1.48-.35-.6-.19-1.07-.29-1.03-.62.02-.17.13-.34.36-.52 1.38-1.08 3.31-2.59 4.4-3.48 1.98-1.68 3.74-2.54 4.18-2.37.09.03.16.11.2.22.04.11.05.23.03.35z" />
  ),
  instagram: (
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.26.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.67 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.26-.07-1.64-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92 1.27-.06 1.64-.07 4.85-.07z" />
  ),
  facebook: (
    <path d="M24 12c0-6.63-5.37-12-12-12S0 5.37 0 12c0 6 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3 1.79-4.67 4.53-4.67 1.31 0 2.69.23 2.69.23v2.95H15.83c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 22.95 24 18 24 12z" />
  ),
};

const ADDRESS_BY_LANG: Record<string, string> = {
  uz: "100214, Toshkent sh., Ulug'bek shaharchasi, U.G'ulomov ko'chasi, 1",
  ru: 'г. Ташкент, п. Улугбек, ул. У. Гулямова, 1, 100214',
  en: '100214, Tashkent, Ulugbek settlement, 1 U.Gulomov St',
};

const WORKING_HOURS_BY_LANG: Record<string, string> = {
  uz: 'Dushanba – Juma: 9:00 – 18:00 | Tushlik: 13:00 – 14:00',
  ru: 'Пн–Пт: 9:00 – 18:00 | Обед: 13:00 – 14:00',
  en: 'Mon–Fri: 9:00 AM – 6:00 PM | Lunch: 1:00 PM – 2:00 PM',
};

const LABELS_BY_LANG: Record<string, Record<string, string>> = {
  uz: {
    phone: 'Telefon',
    fax: 'Faks',
    website: 'Veb-sayt',
    email: 'Elektron pochta',
    social: 'Ijtimoiy tarmoqlar',
    address: 'Manzil',
    workingHours: 'Ish vaqti',
    map: "Yo'l xaritasi",
  },
  ru: {
    phone: 'Телефон',
    fax: 'Факс',
    website: 'Веб-сайт',
    email: 'Электронная почта',
    social: 'Социальные сети',
    address: 'Адрес',
    workingHours: 'Режим работы',
    map: 'Карта',
  },
  en: {
    phone: 'Phone',
    fax: 'Fax',
    website: 'Website',
    email: 'Email',
    social: 'Social media',
    address: 'Address',
    workingHours: 'Working hours',
    map: 'Map',
  },
};

const Hotline: React.FC = () => {
  const { language } = useLanguage();
  const L = LABELS_BY_LANG[language] ?? LABELS_BY_LANG['uz'];

  const rows: { label: string; content: React.ReactNode }[] = [
    {
      label: L.phone,
      content: (
        <>
          {PHONES.map((phone) => (
            <a
              key={phone}
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="text-blue-600 hover:text-blue-800 transition-colors block"
            >
              {phone}
            </a>
          ))}
        </>
      ),
    },
    {
      label: L.fax,
      content: (
        <a
          href={`tel:${FAX.replace(/\s/g, '')}`}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          {FAX}
        </a>
      ),
    },
    {
      label: L.website,
      content: (
        <a
          href={WEBSITE}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline transition-colors"
        >
          {WEBSITE}
        </a>
      ),
    },
    {
      label: L.email,
      content: (
        <a
          href={`mailto:${EMAIL}`}
          className="text-blue-600 hover:text-blue-800 underline transition-colors"
        >
          {EMAIL}
        </a>
      ),
    },
    {
      label: L.social,
      content: (
        <div className="flex gap-3">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 rounded-full ${ICON_COLORS[s.name] ?? 'bg-blue-600 hover:bg-blue-700'} flex items-center justify-center transition-colors`}
              title={s.name}
            >
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                {SOCIAL_ICONS[s.name]}
              </svg>
            </a>
          ))}
        </div>
      ),
    },
    {
      label: L.address,
      content: (
        <span className="text-gray-700">{ADDRESS_BY_LANG[language] ?? ADDRESS_BY_LANG['uz']}</span>
      ),
    },
    {
      label: L.workingHours,
      content: (
        <span className="text-gray-700">
          {WORKING_HOURS_BY_LANG[language] ?? WORKING_HOURS_BY_LANG['uz']}
        </span>
      ),
    },
    {
      label: L.map,
      content: (
        <iframe
          src="https://yandex.com/map-widget/v1/?ll=69.45051876464483,41.41320805594981&z=16&pt=69.45051876464483,41.41320805594981,pm2rdm"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-md"
          title="Manzil xaritasi"
        />
      ),
    },
  ];

  return (
    <div className="py-4">
      <PageTitle>Ishonch telefoni</PageTitle>

      <div className="border border-[#e9ecef] overflow-hidden">
        <table className="w-full">
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={`border-b border-[#e9ecef] last:border-b-0 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-[#f8f9fa]'}`}
              >
                <td className="w-1/3 px-6 py-4 font-semibold align-top text-gray-800">
                  {row.label}
                </td>
                <td className="px-6 py-4 text-gray-700">{row.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hotline;
