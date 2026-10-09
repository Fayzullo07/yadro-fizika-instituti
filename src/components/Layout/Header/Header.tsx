import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { HOME_PATH } from '@/routes/path';
import { useLanguage } from '@/contexts/LanguageContext';
import { getMenuItems } from '@/config/menu';
import DesktopNavigation from './DesktopNavigation';
import MobileMenu from './MobileMenu';
import MobileMenuButton from './MobileMenuButton';
import LanguageSwitcher from './LanguageSwitcher';
import { SOCIAL_LINKS, CONTACT_PHONES } from '@/config/contactData';
import logoFallback from '@/assets/logo/logo_70_trimmed.png';

interface HeaderProps {
  /** `compact` = a single white bar (logo, navigation, language) instead of the three-tier header. */
  variant?: 'default' | 'compact';
}

const Header: React.FC<HeaderProps> = ({ variant = 'default' }) => {
  const { t } = useLanguage();
  const orgAcademy = t('org.academy');
  const orgInstitute = t('org.institute');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = useMemo(() => getMenuItems(t), [t]);

  const compact = variant === 'compact';
  const brand = (
    <div className={`flex items-center ${compact ? 'shrink-0' : 'min-w-0'}`}>
      <Link
        to={HOME_PATH}
        className={`flex items-center gap-2 sm:gap-3 group ${compact ? '' : 'min-w-0'}`}
      >
        <img
          src={logoFallback}
          alt={`${orgAcademy} ${orgInstitute}`}
          className="h-10 sm:h-12 md:h-14 w-auto object-contain shrink-0"
        />
        <span className={`flex flex-col ${compact ? '' : 'min-w-0 overflow-hidden'}`}>
          <span
            className={`hidden ${compact ? '2xl:block' : 'md:block'} text-[9px] lg:text-[10px] font-semibold text-gray-400 tracking-wide leading-tight uppercase truncate`}
          >
            {orgAcademy}
          </span>
          <span
            className={`text-[10px] sm:text-xs md:text-sm lg:text-base font-bold text-gray-900 leading-snug uppercase tracking-wide ${compact ? 'whitespace-nowrap' : ''}`}
          >
            {orgInstitute}
          </span>
        </span>
      </Link>
    </div>
  );

  if (compact) {
    return (
      <header className="sticky top-0 z-50 border-b border-[var(--color-neutral-100)] bg-white">
        <div className="container mx-auto">
          <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
            {brand}
            {/* tighter item padding keeps one row on laptop widths */}
            <div className="min-w-0 [&_button]:px-2 2xl:[&_button]:px-3">
              <DesktopNavigation
                menuItems={menuItems}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                isScrolled
              />
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-4">
              {!isMobileMenuOpen && <LanguageSwitcher variant="desktop" isScrolled />}
              <MobileMenuButton
                isOpen={isMobileMenuOpen}
                isScrolled
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </div>
        </div>
        <MobileMenu
          menuItems={menuItems}
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Test mode banner */}
      <div className="bg-red-50 text-red-500 text-sm font-meduim overflow-hidden whitespace-nowrap">
        <div className="animate-marquee-rtl inline-block py-1">
          {Array.from({ length: 1 }).map((_, i) => (
            <span key={i} className="mx-8">
              {t('common.testModeBanner')}
            </span>
          ))}
        </div>
      </div>
      {/* Top bar */}
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-2 sm:py-3">
          {/* Logo + Name */}
          {brand}

          {/* Right side: phone, social, language */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Phone */}
            <div className="hidden md:flex items-center gap-2.5">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 17.2 17.2">
                <path d="M15.82 11.29a9.8 9.8 0 0 1-3.067-.488 1.4 1.4 0 0 0-1.363.287l-1.934 1.46a10.7 10.7 0 0 1-4.805-4.8l1.416-1.888a1.39 1.39 0 0 0 .342-1.409 9.8 9.8 0 0 1-.49-3.072A1.38 1.38 0 0 0 4.539 0H1.38A1.38 1.38 0 0 0 0 1.38 15.84 15.84 0 0 0 15.82 17.2a1.38 1.38 0 0 0 1.38-1.38v-3.15a1.38 1.38 0 0 0-1.38-1.38" />
              </svg>
              <a
                href={`tel:${CONTACT_PHONES[1].replace(/\s/g, '')}`}
                className="text-sm font-bold text-gray-900 hover:text-blue-600"
              >
                {CONTACT_PHONES[1]}
              </a>
            </div>

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
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-opacity duration-200 hover:opacity-80 ${social.color}`}
                  aria-label={social.name}
                >
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
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

      {/* Navigation bar — desktop only */}
      <div className="hidden lg:block border-t bg-[#0f1b3d] border-gray-100">
        <div className="container mx-auto">
          <div className="flex items-center justify-center py-2.5">
            <DesktopNavigation
              menuItems={menuItems}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              isScrolled={false}
            />
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
