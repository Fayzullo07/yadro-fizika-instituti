import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { EmailIcon, PhoneIcon, LocationIcon } from './FooterIcons';
import { SOCIAL_LINKS, QUICK_LINKS } from './FooterData';
import { CONTACT_EMAIL, CONTACT_PHONES, CONTACT_ADDRESS } from '@/config/contactData';
import logoFallback from '@/assets/logo/logo_70_trimmed.png';

const ORG_LINE1 = "O'ZBEKISTON RESPUBLIKASI FANLAR AKADEMIYASI";
const ORG_LINE2 = 'YADRO FIZIKASI INSTITUTI';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-[#0f1b3d] text-gray-300 mt-auto">
      <div className="container mx-auto py-14">
        {/* Top row: branding + social */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-10 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src={logoFallback}
              alt={`${ORG_LINE1} ${ORG_LINE2}`}
              loading="lazy"
              className="h-11 w-auto object-contain rounded-lg bg-white p-1 shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-[9px] font-semibold text-blue-200/40 tracking-wide leading-tight uppercase">
                {ORG_LINE1}
              </span>
              <span className="text-sm font-bold text-white leading-tight uppercase tracking-wide">
                {ORG_LINE2}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-opacity duration-200 hover:opacity-80 ${social.color}`}
                aria-label={social.name}
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
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
            <p className="text-blue-200/50 text-sm leading-relaxed">{ORG_LINE1}</p>
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
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-3 text-blue-200/50 hover:text-white transition-colors duration-200"
                >
                  <EmailIcon />
                  <span className="text-sm">{CONTACT_EMAIL}</span>
                </a>
              </li>
              {CONTACT_PHONES.map((phone) => (
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
                <span className="text-sm leading-relaxed">
                  {CONTACT_ADDRESS[language] ?? CONTACT_ADDRESS.uz}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5 bg-[#0a1330]">
        <div className="container mx-auto py-5">
          <p className="text-center text-blue-200/30 text-xs">
            © {new Date().getFullYear()} {ORG_LINE2}.{' '}
            {t('footer.rights') || 'Barcha huquqlar himoyalangan.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
