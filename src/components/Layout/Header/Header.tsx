import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HOME_PATH,
  ABOUT_PATH,
  COUNCIL_PATH,
  STRUCTURE_PATH,
  TEAM_PATH,
  LABORATORIES_PATH,
  DOCTORATE_PATH,
  CONFERENCES_PATH,
  TEACHERS_PATH,
  CONTACT_PATH,
  HOTLINE_PATH,
  NEWS_PATH,
  ANNOUNCEMENTS_PATH,
  CONSTITUTION_PATH,
  LAWS_PATH,
  DECREES_PATH,
  QONUNCHILIK_PATH,
  HUKUMAT_HUJJATLARI_PATH,
  ICHKI_HUJJATLAR_PATH,
  LOYIHALASH_PATH,
  INSTRUMENTAL_TEKSHIRUV_PATH,
  ZILZILABARDOSHLIK_XULOSA_PATH,
} from "@/routes/path";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGeneral } from "@/hooks/useGeneral";
import { stripHtmlRegex } from "@/utils/htmlUtils";
import DesktopNavigation from "./DesktopNavigation";
import MobileMenu from "./MobileMenu";
import MobileMenuButton from "./MobileMenuButton";
import LanguageSwitcher from "./LanguageSwitcher";
import TickerBanner from "@/components/shared/TickerBanner/TickerBanner";

const Header = () => {
  const { t } = useLanguage();
  const { data: generalData, loading: generalLoading } = useGeneral();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const organizationName = generalData?.organization_short_name
    ? stripHtmlRegex(generalData.organization_name)
    : generalData?.organization_name
      ? stripHtmlRegex(generalData.organization_name)
      : null;

  const splitTextIntoTwoLines = (text) => {
    if (!text) return { firstLine: '', secondLine: '' };

    const words = text.split(' ');
    const midPoint = Math.ceil(words.length / 2);
    const firstLine = words.slice(0, midPoint).join(' ');
    const secondLine = words.slice(midPoint).join(' ');

    return { firstLine, secondLine };
  };

  const { firstLine, secondLine } = splitTextIntoTwoLines(organizationName);

  const socialMediaLinks = [
    {
      id: 'telegram',
      name: 'Telegram',
      href: '#',
      icon: (
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.17 1.858-.896 6.375-1.268 8.451-.15.84-.445 1.12-.73 1.147-.61.055-1.072-.403-1.662-.79-.92-.617-1.44-.999-2.332-1.602-1.03-.654-.363-1.014.225-1.601.155-.153 2.84-2.604 2.895-2.826.006-.027.01-.13-.05-.192-.06-.062-.147-.041-.211-.024-.09.024-1.51.96-4.26 2.82-.404.27-.77.401-1.1.394-.36-.008-.995-.192-1.482-.35-.598-.193-1.074-.294-1.033-.62.022-.17.13-.343.36-.52 1.38-1.08 3.31-2.59 4.4-3.48 1.98-1.68 3.74-2.54 4.18-2.37.09.034.16.11.198.22.04.11.05.23.03.35z" />
      ),
    },
    {
      id: 'facebook',
      name: 'Facebook',
      href: '#',
      icon: (
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      ),
    },
    {
      id: 'instagram',
      name: 'Instagram',
      href: '#',
      icon: (
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      ),
    },
    {
      id: 'youtube',
      name: 'YouTube',
      href: '#',
      icon: (
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      ),
    },
  ];

  const menuItems = [
    {
      id: 'institut',
      label: t('nav.institute.title') || 'INSTITUT',
      links: [
        { label: t('nav.institute.about') || 'Institut haqida', path: ABOUT_PATH },
        { label: t('nav.institute.services') || 'Tashkilot tuzilmasi', path: STRUCTURE_PATH },
        { label: t('nav.institute.leadership') || 'Rahbariyat', path: TEAM_PATH },
        { label: t('nav.institute.team') || 'Institut jamoasi', path: TEACHERS_PATH },
      ],
    },
    {
      id: 'tadqiqot',
      label: t('nav.tadqiqot.title') || 'TADQIQOT',
      links: [
        { label: t('nav.tadqiqot.council') || 'Ilmiy kengash', path: COUNCIL_PATH },
        { label: t('nav.tadqiqot.laboratories') || 'Laboratoriyalar', path: LABORATORIES_PATH },
        { label: t('nav.tadqiqot.doctorate') || 'Doktarontura', path: DOCTORATE_PATH },
      ],
    },
    {
      id: 'xizmatlar',
      label: t('nav.xizmatlar.title') || 'XIZMATLAR',
      links: [
        { label: t('nav.xizmatlar.Loyihalash') || 'Konferensiyalar', path: LOYIHALASH_PATH },
        { label: t('nav.xizmatlar.Instrumentaltexniktekshiruvniotkazish') || 'Instrumental texnik tekshiruvni otkazish', path: INSTRUMENTAL_TEKSHIRUV_PATH },
        { label: t('nav.xizmatlar.Zilzilabardoshlikboʻyichailmiyxulosaberish') || 'Zilzilabardoshlik boʻyicha ilmiy xulosa berish', path: ZILZILABARDOSHLIK_XULOSA_PATH },
      ],
    },
    {
      id: 'media',
      label: t('nav.media.title') || 'MEDIA',
      links: [
        { label: t('nav.media.news') || 'Yangiliklar', path: NEWS_PATH },
        // { label: t('nav.media.calendar') || 'Voqaelar taqvimi', path: CALENDAR_PATH },
        { label: t('nav.media.conferences') || 'Anjumanlar', path: CONFERENCES_PATH },
        { label: t('nav.media.announcements') || 'E\'lonlar', path: ANNOUNCEMENTS_PATH },
      ],
    },
    {
      id: 'normativ',
      label: t('nav.normativ.title') || 'NORMATIV HUQUQIY-HUJJATLAR',
      links: [
        { label: t('nav.normativ.constitution') || 'Konstitutsiya', path: CONSTITUTION_PATH },
        { label: t('nav.normativ.laws') || 'Qonunlar', path: LAWS_PATH },
        { label: t('nav.normativ.decrees') || 'Prezident farmon va qarorlari', path: DECREES_PATH },
        { label: t('nav.normativ.qonunchilik') || 'Institut faoliyat sohasiga oid miliy  konunchilik ', path: QONUNCHILIK_PATH },
        { label: t('nav.normativ.hukumat') || 'Prezident va Hukumat hujjatlari', path: HUKUMAT_HUJJATLARI_PATH },
        { label: t('nav.normativ.ichki') || 'Institut ichki hujjatlari', path: ICHKI_HUJJATLAR_PATH },

      ],
    },
    {
      id: 'boglanish',
      label: t('nav.boglanish.title') || 'BOG\'LANISH',
      links: [
        { label: t('nav.boglanish.contact') || 'Kontaklar', path: CONTACT_PATH },
      ],
    },
  ];

  return (
    <>
      {/* Test Mode Banner */}
      <div className="bg-white text-red-500 pt-2 text-center text-sm font-semibold sticky top-0 z-[60]">
        <div className="shadow">
          <marquee direction="left">
            {t('header.testMode') || 'Sayt test rejimida ishlamoqda'}
          </marquee>
        </div>
      </div>

      <header className="bg-white shadow sticky top-[33px] z-50">
        <div className="py-2">
          <div className="container mx-auto px-4 pt-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {generalLoading ? (
                  <>
                    <div className="w-12 h-12 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
                  </>
                ) : (
                  <Link to={HOME_PATH} className="flex items-center gap-3 cursor-pointer transition-opacity">
                    {generalData?.organization_logo && (
                      <img
                        src={generalData.organization_logo}
                        alt={organizationName || 'Logo'}
                        className="h-12 w-auto object-contain"
                      />
                    )}
                    {organizationName && (
                      <h1
                        className="text-lg md:text-xl !font-[600] font-bold text-[#013d8c] cursor-pointer leading-tight"
                        style={{ fontFamily: 'var(--default-font)' }}
                      >
                        <div className="block">{firstLine}</div>
                        {secondLine && <div className="block lin">{secondLine}</div>}
                      </h1>
                    )}
                  </Link>
                )}
              </div>

              <div className="flex  items-center gap-4">
                {generalData?.phone && (
                  <div className="flex items-center gap-3 px-4 py-2.5 transition-colors">
                    <div className="flex items-center justify-center rounded-full">
                      <svg
                        className="w-6 h-6 text-[#013d8c]"
                        fill="currentColor"
                        viewBox="0 0 17.2 17.2"
                      >
                        <path
                          d="M15.82 11.29a9.8 9.8 0 0 1-3.067-.488 1.4 1.4 0 0 0-1.363.287l-1.934 1.46a10.7 10.7 0 0 1-4.805-4.8l1.416-1.888a1.39 1.39 0 0 0 .342-1.409 9.8 9.8 0 0 1-.49-3.072A1.38 1.38 0 0 0 4.539 0H1.38A1.38 1.38 0 0 0 0 1.38 15.84 15.84 0 0 0 15.82 17.2a1.38 1.38 0 0 0 1.38-1.38v-3.15a1.38 1.38 0 0 0-1.38-1.38"
                          data-name="telephone"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <Link
                        to={HOTLINE_PATH}
                        className="text-xs md:!text-sm text-[#013d8c] font-semibold mb-1 uppercase tracking-wide font-sans hover:text-blue-700 transition-colors"
                      >
                        {t('nav.boglanish.hotline') || 'Ishonch telefoni'}
                      </Link>
                      <a
                        href={`tel:${generalData.phone}`}
                        className="text-[#013d8c] hover:text-blue-700 font-bold text-base md:text-lg transition-colors leading-tight font-sans"
                      >
                        {generalData.phone}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex flex-col  gap-2 border-l border-gray-300 pl-4">
                  <span className="text-sm text-[#013d8c] font-semibold uppercase hidden md:inline">
                    {t('footer.socialMedia') || 'Ijtimoiy tarmoqlar'}:
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {socialMediaLinks.map((social) => (
                      <a
                        key={social.id}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center  transition-colors"
                        aria-label={social.name}
                        title={social.name}
                      >
                        <svg className="w-5 h-5 text-[#013d8c] hover:text-blue-700 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          {social.icon}
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav className="container mx-auto px-4 py-3">
          <div className="flex bg-gray-100/90  px-2 py-2.5 items-center justify-between gap-4">
            {!isMobileMenuOpen && (
              <DesktopNavigation
                menuItems={menuItems}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
              />
            )}

            <div className="flex items-center gap-3">
              {!isMobileMenuOpen && <LanguageSwitcher variant="desktop" />}
              <MobileMenuButton
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </div>

          <MobileMenu
            menuItems={menuItems}
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        </nav>

        <div className="!mb-3">
          <TickerBanner />
        </div>
      </header>
    </>
  );
};

export default Header;
