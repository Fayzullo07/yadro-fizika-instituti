import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { HOME_PATH, HOTLINE_PATH } from '@/routes/path';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGeneral } from '@/hooks/useGeneral';
import { stripHtmlRegex } from '@/utils/htmlUtils';
import { getMenuItems } from '@/config/menu';
import DesktopNavigation from './DesktopNavigation';
import MobileMenu from './MobileMenu';
import MobileMenuButton from './MobileMenuButton';
import LanguageSwitcher from './LanguageSwitcher';
import { SOCIAL_LINKS } from '../Footer/FooterData';
import logoFallback from '@/assets/logo.jpg';

const Header: React.FC = () => {
  const { t } = useLanguage();
  const { data: generalData, loading: generalLoading } = useGeneral();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const organizationName = generalData?.organization_short_name
    ? stripHtmlRegex(generalData.organization_short_name).trim()
    : generalData?.organization_name
      ? stripHtmlRegex(generalData.organization_name).trim()
      : null;

  const menuItems = useMemo(() => getMenuItems(t), [t]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-2">
          {/* Logo + Name */}
          <div className="flex items-center gap-3">
            {generalLoading ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg animate-pulse bg-gray-200"></div>
                <div className="h-5 rounded w-40 animate-pulse bg-gray-200"></div>
              </div>
            ) : (
              <Link to={HOME_PATH} className="flex items-center gap-3 group">
                <img
                  src={logoFallback}
                  alt={organizationName || 'Logo'}
                  className="h-10 w-10 object-contain rounded-lg"
                />
                <span className="text-sm md:text-base font-bold leading-tight text-gray-900">
                  O'z Res FA YADRO FIZIKASI INSTITUTI
                </span>
              </Link>
            )}
          </div>

          {/* Right side: phone, social, language */}
          <div className="flex items-center gap-4">
            {/* Phone */}
            {generalData?.phone && (
              <div className="hidden md:flex items-center gap-2.5">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 17.2 17.2">
                  <path d="M15.82 11.29a9.8 9.8 0 0 1-3.067-.488 1.4 1.4 0 0 0-1.363.287l-1.934 1.46a10.7 10.7 0 0 1-4.805-4.8l1.416-1.888a1.39 1.39 0 0 0 .342-1.409 9.8 9.8 0 0 1-.49-3.072A1.38 1.38 0 0 0 4.539 0H1.38A1.38 1.38 0 0 0 0 1.38 15.84 15.84 0 0 0 15.82 17.2a1.38 1.38 0 0 0 1.38-1.38v-3.15a1.38 1.38 0 0 0-1.38-1.38" />
                </svg>
                <div className="flex flex-col">
                  <Link
                    to={HOTLINE_PATH}
                    className="text-[10px] uppercase tracking-wider font-semibold text-gray-400"
                  >
                    {t('nav.boglanish.hotline') || 'Ishonch telefoni'}
                  </Link>
                  <a
                    href={`tel:${generalData.phone}`}
                    className="text-sm font-bold text-gray-900 hover:text-blue-600"
                  >
                    {generalData.phone}
                  </a>
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-gray-200"></div>

            {/* Social links */}
            <div className="hidden md:flex items-center gap-1.5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                  aria-label={social.name}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-gray-200"></div>

            {/* Language */}
            {!isMobileMenuOpen && <LanguageSwitcher variant="desktop" isScrolled />}

            {/* Mobile menu button */}
            <MobileMenuButton
              isOpen={isMobileMenuOpen}
              isScrolled
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <div className="border-t bg-[#0f1b3d] border-gray-100">
        <div className="container mx-auto">
          <div className="flex items-center justify-center py-2">
            {!isMobileMenuOpen && (
              <DesktopNavigation
                menuItems={menuItems}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                isScrolled={false}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu
        menuItems={menuItems}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Header;
