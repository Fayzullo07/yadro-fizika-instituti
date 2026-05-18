import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { EmailIcon, PhoneIcon, LocationIcon } from './FooterIcons';
import { SOCIAL_LINKS, QUICK_LINKS } from './FooterData';
import logoFallback from '@/assets/logo.jpg';

const ORG_NAME = 'Yadro fizika instituti';
const ORG_DESC = "O'zbekiston Fanlar akademiyasining ilmiy-tadqiqot muassasasi";
const CONTACT = {
  email: 'yfi@yfi.uz',
  phones: ['+998 71 289-31-18', '+998 71 289-31-60'],
  fax: '+998 71 289-36-65',
  address: "100214, Toshkent sh., Ulug'bek shaharchasi, U.G'ulomov ko'chasi, 1",
};

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0f1b3d] text-gray-300 mt-auto">
      <div className="container mx-auto py-14">
        {/* Top row: branding + social */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-10 border-b border-white/10">
          <div className="flex items-center gap-4">
            <img
              src={logoFallback}
              alt={ORG_NAME}
              loading="lazy"
              className="h-11 w-11 object-contain rounded-lg"
            />
            <div>
              <h3 className="text-white font-bold text-lg leading-snug">{ORG_NAME}</h3>
              <p className="text-blue-200/40 text-xs mt-1 max-w-sm line-clamp-1">{ORG_DESC}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-blue-200/50 hover:text-white hover:bg-blue-500 hover:border-blue-500 transition-all duration-200"
                aria-label={social.name}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  {social.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pt-10">
          {/* About */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">
              {t('nav.institute.about') || 'Biz haqimizda'}
            </h4>
            <p className="text-blue-200/50 text-sm leading-relaxed">{ORG_DESC}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">
              {t('footer.quickLinks') || 'Havolalar'}
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ pathKey, labelKey, fallback }) => (
                <li key={pathKey}>
                  <Link
                    to={pathKey}
                    className="group flex items-center gap-2 text-blue-200/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {t(labelKey) || fallback}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">
              {t('footer.contact') || 'Aloqa'}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-3 text-blue-200/50 hover:text-white transition-colors duration-200"
                >
                  <EmailIcon />
                  <span className="text-sm">{CONTACT.email}</span>
                </a>
              </li>
              {CONTACT.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 text-blue-200/50 hover:text-white transition-colors duration-200"
                  >
                    <PhoneIcon />
                    <span className="text-sm">{phone}</span>
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-3 text-blue-200/50">
                <LocationIcon />
                <span className="text-sm leading-relaxed">{CONTACT.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5 bg-[#0a1330]">
        <div className="container mx-auto py-5">
          <p className="text-center text-blue-200/30 text-xs">
            © {new Date().getFullYear()} {ORG_NAME}.{' '}
            {t('footer.rights') || 'Barcha huquqlar himoyalangan.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
