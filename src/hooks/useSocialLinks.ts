import { useEffect, useMemo } from 'react';
import { SOCIAL_LINKS } from '@/config/contactData';
import useSocialLinksStore from '@/store/useSocialLinksStore';
import type { SocialLinksData } from '@/types';

type SocialLink = (typeof SOCIAL_LINKS)[number];

const URL_FIELD: Record<string, keyof SocialLinksData> = {
  youtube: 'youtube_url',
  telegram: 'telegram_url',
  instagram: 'instagram_url',
  facebook: 'facebook_url',
};

/**
 * Social network links from `GET /api/social-links`. Networks without a URL are
 * left out; if the request fails, the built-in links are used instead.
 */
export const useSocialLinks = (): SocialLink[] => {
  const data = useSocialLinksStore((s) => s.data);
  const settled = useSocialLinksStore((s) => s.settled);
  const load = useSocialLinksStore((s) => s.fetch);

  useEffect(() => {
    load();
  }, [load]);

  return useMemo(() => {
    if (!settled) return [];
    if (!data) return SOCIAL_LINKS.filter((s) => s.href && s.href !== '#');
    return SOCIAL_LINKS.flatMap((s) => {
      const url = data[URL_FIELD[s.id]];
      return typeof url === 'string' && url.trim() ? [{ ...s, href: url.trim() }] : [];
    });
  }, [data, settled]);
};
