import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useGeneral } from '@/hooks/useGeneral';
import { stripHtmlRegex, sanitizeHtml } from '@/utils/htmlUtils';
import { useLanguage } from '@/contexts/LanguageContext';
import { EmailIcon, PhoneIcon, LocationIcon } from './FooterIcons';
import { SOCIAL_LINKS, QUICK_LINKS } from './FooterData';
import FooterSkeleton from './FooterSkeleton';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { data: generalData, loading } = useGeneral();

  const organizationName = useMemo(() => {
    if (generalData?.organization_short_name)
      return stripHtmlRegex(generalData.organization_short_name);
    if (generalData?.organization_name) return stripHtmlRegex(generalData.organization_name);
    return 'Yadro fizika instituti';
  }, [generalData]);

  return (
    <footer className="bg-[#013d8c] z-50 text-white py-10 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-10">
          {/* Organization Info */}
          <div className="col-span-3">
            {loading ? (
              <FooterSkeleton />
            ) : (
              <>
                <div className="flex items-center gap-2">
                  {generalData?.organization_logo && (
                    <img
                      src={generalData.organization_logo}
                      alt={organizationName}
                      loading="lazy"
                      className="h-14 mb-4 object-contain"
                    />
                  )}
                  <h3 className="text-xl font-bold mb-4">{organizationName}</h3>
                </div>
                {generalData?.organization_desc && (
                  <div
                    className="text-gray-400 text-sm line-clamp-4"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(
                        generalData.organization_desc.length > 150
                          ? generalData.organization_desc.substring(0, 150) + '...'
                          : generalData.organization_desc
                      ),
                    }}
                  />
                )}
              </>
            )}
          </div>

          {/* Quick Links */}
          <div className="col-span-2">
            <h4 className="text-lg font-semibold mb-2">
              {t('footer.quickLinks') || 'Tezkor havolalar'}
            </h4>
            <ul className="space-y-2 text-gray-400">
              {QUICK_LINKS.map(({ pathKey, labelKey, fallback }) => (
                <li key={pathKey}>
                  <Link to={pathKey} className="hover:text-white transition">
                    {t(labelKey) || fallback}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2">
            <h4 className="text-lg font-semibold mb-2">{t('footer.contact') || 'Aloqa'}</h4>
            <ul className="space-y-2 text-gray-400">
              {generalData?.email && (
                <li className="flex items-center gap-2">
                  <EmailIcon />
                  <a href={`mailto:${generalData.email}`} className="hover:text-white transition">
                    {generalData.email}
                  </a>
                </li>
              )}
              {generalData?.phone && (
                <li className="flex items-center gap-2">
                  <PhoneIcon />
                  <a href={`tel:${generalData.phone}`} className="hover:text-white transition">
                    {generalData.phone}
                  </a>
                </li>
              )}
              {generalData?.address && (
                <li className="flex items-start gap-2">
                  <LocationIcon />
                  <span>{generalData.address}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-span-3">
            <h3 className="text-lg font-bold text-white mb-2">
              {t('footer.socialMedia') || 'Ijtimoiy tarmoqlar'}
            </h3>
            <p className="text-gray-400 mb-6 text-sm">
              {t('footer.followUs') || 'Bizni ijtimoiy tarmoqlarda kuzatib boring'}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border-2 border-white flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label={social.name}
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>

            <div className="flex mt-3 gap-4">
              <div className="bg-white px-4 h-12 py-2 rounded flex items-center gap-2">
                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">UZ</span>
                </div>
                <div>
                  <div className="text-black text-xs font-bold">UZ-CERTIFIED</div>
                  <div className="text-gray-600 text-[10px]">SECURE YOUR SITE</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-400 mt-8 pt-8 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} {organizationName}.{' '}
            {t('footer.rights') || 'Barcha huquqlar himoyalangan.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
