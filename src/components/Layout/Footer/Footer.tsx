import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useGeneral } from '@/hooks/useGeneral';
import { stripHtmlRegex, sanitizeHtml } from '@/utils/htmlUtils';
import { useLanguage } from '@/contexts/LanguageContext';
import { EmailIcon, PhoneIcon, LocationIcon } from './FooterIcons';
import { SOCIAL_LINKS, QUICK_LINKS } from './FooterData';
import FooterSkeleton from './FooterSkeleton';
import logoFallback from '@/assets/logo.jpg';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { data: generalData, loading } = useGeneral();

  const organizationName = useMemo(() => {
    const shortName = generalData?.organization_short_name
      ? stripHtmlRegex(generalData.organization_short_name).trim()
      : '';
    const fullName = generalData?.organization_name
      ? stripHtmlRegex(generalData.organization_name).trim()
      : '';
    return shortName || fullName || 'Yadro fizika instituti';
  }, [generalData]);

  return (
    <footer className="bg-[#0f1b3d] text-gray-300 mt-auto">
      <div className="container mx-auto py-14">
        {/* Top row: branding + social */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-10 border-b border-white/10">
          <div className="flex items-center gap-4">
            <img
              src={logoFallback}
              alt={organizationName}
              loading="lazy"
              className="h-11 w-11 object-contain rounded-lg"
            />
            <div>
              <h3 className="text-white font-bold text-lg leading-snug">
                O'z Res FA YADRO FIZIKASI INSTITUTI
              </h3>
              {generalData?.organization_desc && (
                <p className="text-blue-200/40 text-xs mt-1 max-w-sm line-clamp-1">
                  {stripHtmlRegex(generalData.organization_desc)}
                </p>
              )}
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
            {loading ? (
              <FooterSkeleton />
            ) : (
              generalData?.organization_desc && (
                <div
                  className="text-blue-200/50 text-sm leading-relaxed line-clamp-4"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(generalData.organization_desc),
                  }}
                />
              )
            )}
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
              {generalData?.email && (
                <li>
                  <a
                    href={`mailto:${generalData.email}`}
                    className="flex items-center gap-3 text-blue-200/50 hover:text-white transition-colors duration-200"
                  >
                    <EmailIcon />
                    <span className="text-sm">{generalData.email}</span>
                  </a>
                </li>
              )}
              {generalData?.phone && (
                <li>
                  <a
                    href={`tel:${generalData.phone}`}
                    className="flex items-center gap-3 text-blue-200/50 hover:text-white transition-colors duration-200"
                  >
                    <PhoneIcon />
                    <span className="text-sm">{generalData.phone}</span>
                  </a>
                </li>
              )}
              {generalData?.address && (
                <li className="flex items-start gap-3 text-blue-200/50">
                  <LocationIcon />
                  <span className="text-sm leading-relaxed">{generalData.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5 bg-[#0a1330]">
        <div className="container mx-auto py-5">
          <p className="text-center text-blue-200/30 text-xs">
            © {new Date().getFullYear()} {organizationName}.{' '}
            {t('footer.rights') || 'Barcha huquqlar himoyalangan.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
