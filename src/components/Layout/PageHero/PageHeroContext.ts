import { createContext } from 'react';

/**
 * The element inside the hero band that `PageTitle` portals its heading into,
 * so existing pages keep rendering `<PageTitle>` and get the dark hero for free.
 */
export const PageHeroContext = createContext<HTMLElement | null>(null);
