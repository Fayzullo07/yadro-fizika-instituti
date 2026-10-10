import { useApi } from './useApi';
import { bannersApi } from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';

export interface HeroImages {
  /** full-bleed backdrop */
  background?: string;
  /** one photo per orbiting satellite, in order */
  satellites: (string | undefined)[];
}

const SATELLITE_COUNT = 4;
const BANNER_LIMIT = 8;

/**
 * The hero imagery is the site's own banner photos: the newest banner is the
 * backdrop and the satellites cycle through the banners after it. Every field
 * stays optional so the hero can fall back to its bundled artwork.
 */
export const useHeroImages = () => {
  const { language } = useLanguage();

  return useApi<HeroImages>(async () => {
    const response = await bannersApi.getAll({ per_page: BANNER_LIMIT }, language);
    const images = (response?.data ?? []).map((banner) => banner.image).filter(Boolean);

    return {
      background: images[0],
      satellites: Array.from({ length: SATELLITE_COUNT }, (_, i) =>
        images.length ? images[(i + 1) % images.length] : undefined
      ),
    };
  }, [language]);
};
