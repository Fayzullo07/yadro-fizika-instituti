import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { EmailIcon, PhoneIcon, LocationIcon } from './FooterIcons';
import { SOCIAL_LINKS, QUICK_LINKS } from './FooterData';
import { CONTACT_EMAIL, CONTACT_PHONES, CONTACT_ADDRESS } from '@/config/contactData';
import logoFallback from '@/assets/logo/logo_70_trimmed.png';
import logo from '@/assets/logo.png';
import { ABOUT_PATH, CONTACT_PATH, HOME_PATH, LABORATORIES_PATH, NEWS_PATH } from '@/routes/path';

interface FooterProps {
  /** `landing` = the single dark block from the Figma landing design. */
  variant?: 'default' | 'landing';
}

const LANDING_LINKS = [
  { to: HOME_PATH, labelKey: 'nav.home' },
  { to: ABOUT_PATH, labelKey: 'nav.about' },
  { to: LABORATORIES_PATH, labelKey: 'nav.laboratoriyalar.title' },
  { to: NEWS_PATH, labelKey: 'nav.media.title' },
  { to: CONTACT_PATH, labelKey: 'nav.contact' },
];

/** Social networks listed (in this order) by the landing design. */
const LANDING_SOCIALS = ['telegram', 'youtube', 'facebook', 'instagram'];

const FOOTER_LINK =
  'text-[14px] leading-5 text-[var(--color-neutral-300)] hover:text-[var(--color-neutral-0)]';
const FOOTER_HEADING = 'text-[20px] font-semibold leading-7 text-[var(--color-neutral-0)]';

const Footer: React.FC<FooterProps> = ({ variant = 'default' }) => {
  const { t, language } = useLanguage();
  const orgAcademy = t('org.academy');
  const orgInstitute = t('org.institute');

  if (variant === 'landing') {
    const socials = LANDING_SOCIALS.map((id) => SOCIAL_LINKS.find((s) => s.id === id)).filter(
      (s): s is (typeof SOCIAL_LINKS)[number] => Boolean(s)
    );
    const name = t('landing.footer.name');

    return (
      <footer className="mt-auto bg-[var(--color-brand-950)] px-[var(--space-6)] pb-[var(--space-8)] pt-[var(--space-16)] lg:px-[var(--space-24)]">
        <div className="flex flex-col gap-[var(--space-12)]">
          <div className="grid grid-cols-1 gap-[var(--space-8)] sm:grid-cols-2 lg:grid-cols-4 lg:gap-[var(--space-16)]">
            <div className="flex flex-col gap-[var(--space-4)]">
              <Link to={HOME_PATH} className="flex items-center gap-[var(--space-3)]">
                <img src={logo} alt="" className="h-[50px] w-12 object-contain" />
                <span className={FOOTER_HEADING}>{name}</span>
              </Link>
              <p className={FOOTER_LINK}>{t('landing.footer.description')}</p>
            </div>

            <div className="flex flex-col gap-[var(--space-3)]">
              <h4 className={FOOTER_HEADING}>{t('footer.quickLinks')}</h4>
              {LANDING_LINKS.map(({ to, labelKey }) => (
                <Link key={to} to={to} className={FOOTER_LINK}>
                  {t(labelKey)}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-[var(--space-3)]">
              <h4 className={FOOTER_HEADING}>{t('footer.contact')}</h4>
              <p className={FOOTER_LINK}>{CONTACT_ADDRESS[language] ?? CONTACT_ADDRESS.uz}</p>
              <a href={`tel:${CONTACT_PHONES[0].replace(/\s/g, '')}`} className={FOOTER_LINK}>
                {CONTACT_PHONES[0]}
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className={FOOTER_LINK}>
                {CONTACT_EMAIL}
              </a>
            </div>

            <div className="flex flex-col gap-[var(--space-3)]">
              <h4 className={FOOTER_HEADING}>{t('footer.socialMedia')}</h4>
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={FOOTER_LINK}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-[var(--color-brand-900)] py-[var(--space-6)]">
            <p className="text-[12px] font-semibold leading-4 text-[var(--color-neutral-300)]">
              © {new Date().getFullYear()} {name}. {t('footer.rights')}
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-[#0f1b3d] text-gray-300 mt-auto">
      <div className="container mx-auto py-14">
        {/* Top row: branding + social */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-10 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src={logoFallback}
              alt={`${orgAcademy} ${orgInstitute}`}
              loading="lazy"
              className="h-11 w-auto object-contain rounded-lg bg-white p-1 shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-[9px] font-semibold text-blue-200/40 tracking-wide leading-tight uppercase">
                {orgAcademy}
              </span>
              <span className="text-sm font-bold text-white leading-tight uppercase tracking-wide">
                {orgInstitute}
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
            <p className="text-blue-200/50 text-sm leading-relaxed">{orgAcademy}</p>
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
            © {new Date().getFullYear()} {orgInstitute}.{' '}
            {t('footer.rights') || 'Barcha huquqlar himoyalangan.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
