import { useLanguage } from '@/contexts/LanguageContext';
import { useGeneral } from '@/hooks/useGeneral';
import {
  CONTACT_PHONES,
  CONTACT_FAX,
  CONTACT_WEBSITE,
  MAP_LATITUDE,
  MAP_LONGITUDE,
  MAP_ZOOM,
  CONTACT_ADDRESS,
  CONTACT_HOURS,
  SOCIAL_LINKS,
} from '@/config/contactData';

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
  const address = CONTACT_ADDRESS[language] ?? CONTACT_ADDRESS.uz;
  const hours = CONTACT_HOURS[language] ?? CONTACT_HOURS.uz;

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
            {CONTACT_PHONES.map((p) => (
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
              href={`tel:${CONTACT_FAX.replace(/\s/g, '')}`}
              className="text-sm font-semibold text-[#013d8c] hover:underline"
            >
              {CONTACT_FAX}
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
              href={CONTACT_WEBSITE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#013d8c] hover:underline"
            >
              {CONTACT_WEBSITE}
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
                  href={s.href}
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
            href={`https://yandex.com/maps/?ll=${MAP_LONGITUDE},${MAP_LATITUDE}&z=${MAP_ZOOM}&pt=${MAP_LONGITUDE},${MAP_LATITUDE}`}
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
            src={`https://yandex.com/map-widget/v1/?ll=${MAP_LONGITUDE},${MAP_LATITUDE}&z=${MAP_ZOOM}&pt=${MAP_LONGITUDE},${MAP_LATITUDE},pm2rdm&l=sat,skl`}
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
