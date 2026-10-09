import { useApi } from './useApi';
import {
  bannersApi,
  conferencesApi,
  galleriesApi,
  laboratoriesApi,
  LaboratoryType,
  partnersApi,
} from '@/services/api';
import { useLanguage } from '@/contexts/LanguageContext';

export interface HeroImages {
  background?: string;
  laboratories?: string;
  conferences?: string;
  partners?: string;
  research?: string;
}

const settle = async <T>(promise: Promise<T>): Promise<T | undefined> => {
  try {
    return await promise;
  } catch {
    return undefined;
  }
};

/** First photo of the first laboratory-like item (images only exist on the detail endpoint). */
const firstLaboratoryImage = async (type: LaboratoryType, language: string) => {
  const list = await settle(laboratoriesApi.getAll(language, type));
  const id = list?.data?.[0]?.id;
  if (id === undefined) return undefined;
  const detail = await settle(laboratoriesApi.getById(id, language));
  return detail?.data?.images?.[0]?.url;
};

/** Newest conference that has a photo; its list endpoint carries none, so look at the details. */
const firstConferenceImage = async (language: string) => {
  const list = await settle(conferencesApi.getAll({ per_page: 5 }, language));
  for (const item of list?.data ?? []) {
    const detail = await settle(conferencesApi.getById(item.id, language));
    const url = detail?.data?.images?.[0]?.url;
    if (url) return url;
  }
  return undefined;
};

/**
 * Real imagery for the landing hero, one source per satellite plus the backdrop.
 * Every field is optional: the hero falls back to its bundled artwork for any
 * source that is empty or fails.
 */
export const useHeroImages = () => {
  const { language } = useLanguage();

  return useApi<HeroImages>(async () => {
    const [banners, labs, objects, conferences, partners, galleries] = await Promise.all([
      settle(bannersApi.getAll({ per_page: 1 }, language)),
      firstLaboratoryImage(LaboratoryType.Laboratory, language),
      firstLaboratoryImage(LaboratoryType.UniqueObject, language),
      firstConferenceImage(language),
      settle(partnersApi.getAll(language)),
      settle(galleriesApi.getAll({ per_page: 1 }, language)),
    ]);

    return {
      background: banners?.data?.[0]?.image,
      laboratories: labs,
      // no conference photo yet -> newest gallery photo keeps the slot real
      conferences: conferences ?? galleries?.data?.[0]?.image,
      partners: partners?.data?.[0]?.image,
      research: objects,
    };
  }, [language]);
};
